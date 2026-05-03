require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const twilio = require('twilio');
const { en } = require('@faker-js/faker');

const app = express();
app.use(cors()); // Allows React to talk to this server
app.use(express.json()); // Allows server to understand JSON

// --- TWILIO SETUP ---
const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// --- MONGODB SETUP ---
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ==========================================
// DATABASE SCHEMAS
// ==========================================

// 1. Profile Schema
const profileSchema = new mongoose.Schema({
    deviceId: { type: String, required: true, unique: true }, 
    driverName: String,
    email: String,
    emergencyNumber: String,
    hasCrashed: { type: Boolean, default: false } 
}, { timestamps: true }); // <--- ADD THIS COMMA AND OBJECT

const Profile = mongoose.model('Profile', profileSchema);

// 2. Telemetry Schema (Saves the Live Hardware Data from C++)
const telemetrySchema = new mongoose.Schema({
    deviceId: { type: String, required: true },
    imu: {
        peak_g: Number,
        accel_x: Number,
        accel_y: Number,
        accel_z: Number
    },
    gps: {
        velocity_kmh: Number,
        latitude: Number,
        longitude: Number,
        altitude_m: Number,
        satellites: Number,
        fixed: Boolean
    },
    timestamp: { type: Date, default: Date.now } // Used to calculate latency in React
});
const Telemetry = mongoose.model('Telemetry', telemetrySchema);


// ==========================================
// API: GET RECENT HIGH-G INCIDENTS (For Logs page)
// ==========================================
app.get('/api/telemetry/incidents/:deviceId', async (req, res) => {
    try {
        // Find all events with a G-force > 1.2, sort by newest, limit to 50
        const incidents = await Telemetry.find({ 
            deviceId: req.params.deviceId,
            "imu.peak_g": { $gt: 1.2 } 
        })
        .sort({ timestamp: -1 })
        .limit(50);
            
        res.status(200).json(incidents);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch incidents" });
    }
});

// ==========================================
// API 1: REACT FRONTEND -> GET LATEST PROFILE
// ==========================================
app.get('/api/profile/latest', async (req, res) => {
    try {
        const profile = await Profile.findOne().sort({ _id: -1 });
        if (profile) {
            res.status(200).json(profile);
        } else {
            res.status(404).json({ message: "No profile found" });
        }
    } catch (error) {
        console.error("❌ Error fetching profile:", error);
        res.status(500).json({ error: "Failed to fetch profile" });
    }
});

// This is for your History page (Recent 50 logs total)
app.get('/api/telemetry/history/:deviceId', async (req, res) => {
    try {
        const historyData = await Telemetry.find({ deviceId: req.params.deviceId })
            .sort({ timestamp: -1 }) // Sort newest first
            .limit(50);              // <--- ONLY GRAB THE LAST 50!
            
        res.status(200).json(historyData);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch history" });
    }
});

// ==========================================
// API 2: REACT FRONTEND -> SAVE PROFILE
// ==========================================
app.post('/api/profile', async (req, res) => {
    const { deviceId, driverName, email, emergencyNumber } = req.body;
    console.log("📥 Received Profile Data:", req.body); 

    try {
        let profile = await Profile.findOneAndUpdate(
            { deviceId: deviceId },
            { driverName, email, emergencyNumber }, 
            { new: true, upsert: true } 
        );
        console.log("✅ Profile saved to MongoDB!");
        res.status(200).json({ message: "Profile saved successfully!", profile });
    } catch (error) {
        console.error("❌ Mongoose Error:", error);
        res.status(500).json({ error: "Failed to save profile" });
    }
});

// ==========================================
// API 3: REACT FRONTEND -> GET LATEST TELEMETRY DATA (For Dashboard)
// ==========================================
app.get('/api/telemetry/latest/:deviceId', async (req, res) => {
    try {
        // Find the absolute newest hardware data for this specific car
        const latestData = await Telemetry.findOne({ deviceId: req.params.deviceId }).sort({ timestamp: -1 });
        if (latestData) {
            res.status(200).json(latestData);
        } else {
            res.status(404).json({ message: "No hardware data found yet" });
        }
    } catch (error) {
        console.error("❌ Error fetching telemetry:", error);
        res.status(500).json({ error: "Failed to fetch telemetry" });
    }
});

// ==========================================
// API 4: HARDWARE (C++) -> RECEIVE TELEMETRY & CRASH LOGIC
// ==========================================
app.post('/api/telemetry', async (req, res) => {
    const data = req.body;
    console.log(`📡 [TELEMETRY] Device ${data.device_id} | Peak G: ${data.imu?.peak_g} | Satellites: ${data.gps?.satellites}`);

    try {
        // 1. SAVE THE HARDWARE DATA TO MONGODB FIRST
        const newLog = new Telemetry({
            deviceId: data.device_id,
            imu: data.imu,
            gps: data.gps
        });
        await newLog.save();

        // 2. CHECK FOR CRASH (> 3.4g)
        if (data.imu && data.imu.peak_g > 3.4) {
            
            // Look up the driver's profile
            const profile = await Profile.findOne({ deviceId: data.device_id });

            if (profile && !profile.hasCrashed) {
                console.log(`🚨 [CRASH DETECTED] Calling ${profile.emergencyNumber}...`);
                
                // Mark as crashed so we don't spam call
                profile.hasCrashed = true;
                await profile.save();

                // Make the Twilio Phone Call
                if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
                    await twilioClient.calls.create({
                        twiml: `<Response>
                                  <Say voice="alice">Emergency Alert. Vehicle ${data.device_id} driven by ${profile.driverName} has experienced a severe impact of ${data.imu.peak_g} Gs.</Say>
                                  <Say voice="alice">Last known GPS coordinates are Latitude ${data.gps.latitude}, Longitude ${data.gps.longitude}. Please dispatch help immediately.</Say>
                                </Response>`,
                        to: profile.emergencyNumber,
                        from: process.env.TWILIO_PHONE_NUMBER
                    });
                    console.log(`📞[CALL SUCCESS] Emergency services notified.`);
                } else {
                    console.log(`⚠️ [CALL SKIPPED] Twilio credentials not set in .env file yet.`);
                }
            }
        }

        // Return success to the ESP32/Hardware so it knows the server got it
        res.status(200).json({ status: "success" });

    } catch (error) {
        console.error("❌ Telemetry Error:", error.message);
        res.status(500).json({ error: "Server error" });
    }
});


// ==========================================
// API 5: ADMIN DASHBOARD DATA
// ==========================================

// Get global stats
app.get('/api/admin/stats', async (req, res) => {
    try {
        const totalVehicles = await Profile.countDocuments();
        const totalIncidents = await Telemetry.countDocuments({ "imu.peak_g": { $gt: 1.8 } });
        const criticalAlerts = await Telemetry.countDocuments({ "imu.peak_g": { $gt: 3.4 } });
        
        res.status(200).json({ totalVehicles, totalIncidents, criticalAlerts });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch admin stats" });
    }
});

// Get all registered vehicles
app.get('/api/admin/vehicles', async (req, res) => {
    try {
        const vehicles = await Profile.find().sort({ updatedAt: -1 });
        res.status(200).json(vehicles);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch vehicles" });
    }
});

// Get all fleet incidents > 1.8G
app.get('/api/admin/incidents', async (req, res) => {
    try {
        const incidents = await Telemetry.find({ "imu.peak_g": { $gt: 1.8 } })
            .sort({ timestamp: -1 })
            .limit(50);
        res.status(200).json(incidents);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch fleet incidents" });
    }
});

// --- START SERVER ---
const PORT = env.PORT ;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://127.0.0.1:${PORT}`);
    console.log(`🚀 Also available on http://localhost:${PORT}`);
});