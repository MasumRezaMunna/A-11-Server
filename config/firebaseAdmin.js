const admin = require("firebase-admin");
console.log("--- Firebase Admin Debug ---");
console.log("Env Project ID:", process.env.FIREBASE_PROJECT_ID ? "Found" : "NOT FOUND");
console.log("Env Client Email:", process.env.FIREBASE_CLIENT_EMAIL ? "Found" : "NOT FOUND");
console.log("--- End Debug ---");

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      }),
    });
    console.log("Firebase Admin Initialized Successfully");
  } catch (error) {
    console.error("Firebase Admin Initialization Error:", error.message);
  }
}

module.exports = admin;
