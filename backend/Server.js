// server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fetch = require("node-fetch"); // for external APIs

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Dummy crime dataset (replace with real API or DB)
const crimeData = [
  { lat: 11.36, lon: 77.72, risk: 70 }, // Example: high-risk zone
  { lat: 11.37, lon: 77.73, risk: 30 }  // Example: safer zone
];

// Calculate safe score based on proximity to crime zones
function calculateSafeScore(lat, lon) {
  let score = 100;
  crimeData.forEach(zone => {
    let distance = Math.sqrt(Math.pow(lat - zone.lat, 2) + Math.pow(lon - zone.lon, 2));
    if (distance < 0.02) { // within ~2km
      score -= zone.risk;
    }
  });
  return Math.max(score, 0);
}

// Safe Route API
app.post("/safe-route", (req, res) => {
  const { latitude, longitude } = req.body;
  const safeScore = calculateSafeScore(latitude, longitude);

  res.json({
    safeScore,
    message: safeScore > 60 ? "This route looks safe ✅" : "Caution: Risk detected ⚠️"
  });
});

// SOS Notification (Firebase Cloud Messaging)
app.post("/sos", async (req, res) => {
  const { userId, location } = req.body;

  // Example Firebase push (replace with real FCM server key)
  await fetch("https://fcm.googleapis.com/fcm/send", {
    method: "POST",
    headers: {
      "Authorization": "key=YOUR_FIREBASE_SERVER_KEY",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      to: "/topics/guardians",
      notification: {
        title: "🚨 SOS Alert",
        body: `User ${userId} triggered SOS at ${location.lat}, ${location.lon}`
      }
    })
  });

  res.json({ message: "SOS alert sent 🚨" });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
