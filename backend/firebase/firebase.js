// backend/firebase.js
const admin = require("firebase-admin");

if (!admin.apps.length) {
  const serviceAccount = require("./lorry-taxi-firebase-adminsdk-fbsvc-9d521c8aa2.json");

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

module.exports = admin;
