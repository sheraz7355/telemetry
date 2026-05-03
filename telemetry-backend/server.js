require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const twilio = require('twilio');

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

// 1. Profile Schema (Saves the Driver info and Emergency Contact)
const profileSchema = new mongoose.Schema({
    deviceId: { type: String, required: true, unique: true }, 
    driverName: String,
    email: String,
    emergencyNumber: String,
    hasCrashed: { type: Boolean, default: false } 
});
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

// --- START SERVER ---
const PORT = process.env.PORT || 5005;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});