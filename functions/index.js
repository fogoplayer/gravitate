// The Cloud Functions for Firebase SDK to create Cloud Functions and set up triggers.
const functions = require("firebase-functions");

// The Firebase Admin SDK to access Firestore.
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();

exports.sendInviteNotif = functions.firestore
  .document("users/{uid}/invitations/{invitation}")
  .onCreate(async (snap, context) => {
    const uid = context.params.uid;
    const invitation = context.params.invitation;

    const userDoc = await functions.firestore.document("users/" + uid).get();
    const userToken = userDoc.messagingToken;

    const message = { data: userDoc, token: userToken };

    getMessaging()
      .send(message)
      .then((response) => {
        // Response is a message ID string.
        console.log("Successfully sent message:", response);
      })
      .catch((error) => {
        console.log("Error sending message:", error);
      });
  });
