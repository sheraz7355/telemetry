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

// --- DATABASE SCHEMA ---
// This tells the database what a "Profile" looks like
// --- DATABASE SCHEMA ---
const profileSchema = new mongoose.Schema({
    deviceId: { type: String, required: true, unique: true }, 
    driverName: String,
    email: String, // <-- ADDED THIS
    emergencyNumber: String,
    hasCrashed: { type: Boolean, default: false } 
});
const Profile = mongoose.model('Profile', profileSchema);


// ==========================================
// API: GET LATEST PROFILE (React calls this on load)
// ==========================================
app.get('/api/profile/latest', async (req, res) => {
    try {
        // Find the absolute most recently saved profile in the database
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
// API 1: REACT FRONTEND -> SAVE PROFILE
// ==========================================
app.post('/api/profile', async (req, res) => {
    // Added email to the request body
    const { deviceId, driverName, email, emergencyNumber } = req.body;
    
    // This will print exactly what the React app sent to the backend terminal
    console.log("📥 Received Profile Data:", req.body); 

    try {
        let profile = await Profile.findOneAndUpdate(
            { deviceId: deviceId },
            { driverName, email, emergencyNumber }, // <-- Added email here
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
// API 2: HARDWARE -> TELEMETRY & CRASH LOGIC
// ==========================================
app.post('/api/telemetry', async (req, res) => {
    const data = req.body;
    console.log(`📡 [TELEMETRY] Device ${data.device_id} | Peak G: ${data.imu.peak_g} | Satellites: ${data.gps.satellites}`);

    try {
        // 1. Check if the G-force is a crash (> 3.4g)
        if (data.imu.peak_g > 3.4) {
            
            // 2. Look up the driver's profile in the database
            const profile = await Profile.findOne({ deviceId: data.device_id });

            if (profile && !profile.hasCrashed) {
                console.log(`🚨 [CRASH DETECTED] Calling ${profile.emergencyNumber}...`);
                
                // 3. Mark as crashed so we don't spam call them every millisecond
                profile.hasCrashed = true;
                await profile.save();

                // 4. Make the Twilio Phone Call
                await twilioClient.calls.create({
                    twiml: `<Response>
                              <Say voice="alice">Emergency Alert. Vehicle ${data.device_id} driven by ${profile.driverName} has experienced a severe impact of ${data.imu.peak_g} Gs.</Say>
                              <Say voice="alice">Last known GPS coordinates are Latitude ${data.gps.latitude}, Longitude ${data.gps.longitude}. Please dispatch help immediately.</Say>
                            </Response>`,
                    to: profile.emergencyNumber,
                    from: process.env.TWILIO_PHONE_NUMBER
                });
                
                console.log(`📞 [CALL SUCCESS] Emergency services notified.`);
            }
        }

        // Return success to the ESP32/Hardware
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