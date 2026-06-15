const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { messaging } = require('./firebaseAdmin'); // Ensure this path is correct

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Safe Route API
app.get('/safe-route', (req, res) => {
  res.json({
    points: [
      { latitude: 11.36, longitude: 77.72 },
      { latitude: 11.37, longitude: 77.73 }
    ]
  });
});

// Combined Check-in and SOS
app.post('/check-in', (req, res) => {
  console.log("Guardian notified!");
  res.json({ status: "Check-in sent" });
});

app.post('/sos', async (req, res) => {
  try {
    const message = {
      notification: {
        title: "SOS Alert!",
        body: "Guardian, immediate help needed!"
      },
      token: req.body.guardianToken
    };
    await messaging.send(message);
    res.json({ status: "SOS alert sent via FCM" });
  } catch (error) {
    console.error("FCM Error:", error);
    res.status(500).json({ status: "Error sending SOS", error: error.message });
  }
});

app.listen(5000, () => console.log("Backend running on port 5000"));