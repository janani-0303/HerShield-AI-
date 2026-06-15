const { initializeApp, cert } = require('firebase-admin/app');
const serviceAccount = require('./serviceAccountKey.json');

// Initialize the app using the destructured 'cert' function
const app = initializeApp({
  credential: cert(serviceAccount)
});

// If you need to access messaging specifically
const { getMessaging } = require('firebase-admin/messaging');
const messaging = getMessaging(app);

module.exports = { app, messaging };