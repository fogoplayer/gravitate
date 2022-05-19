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

    let userDataDoc = await db.doc("users/" + uid + "/data/data").get();
    userDataDoc = userDataDoc.data();
    const userToken = userDataDoc.messagingToken;
    functions.logger.log("userdoc", userDataDoc);
    functions.logger.log("token", userToken);

    let inviteDoc = await db
      .doc("users/" + uid + "/invitations/" + invitation)
      .get();
    inviteDoc = inviteDoc.data();

    const message = {
      notification: {
        title: "You have a new invitation!",
        body: "You have a new invitation!",
      },
      // data: inviteDoc,
      token: userToken,
    };

    functions.logger.log(message);

    admin
      .messaging()
      .send(message)
      .then((response) => {
        // Response is a message ID string.
        console.log("Successfully sent message:", response);
      })
      .catch((error) => {
        console.log("Error sending message:", error);
      });
  });
