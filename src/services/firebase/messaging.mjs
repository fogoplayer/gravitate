import {
  getMessaging,
  getToken,
} from "https://www.gstatic.com/firebasejs/9.7.0/firebase-messaging.js";
import { app } from "./app.mjs";
import { update } from "./db.mjs";
import { getCurrUserData } from "./db.mjs";

// Get registration token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.
const messaging = getMessaging(app);
console.log(messaging);
getToken(messaging, {
  vapidKey:
    "BAl-Ec-obs63FVMmwQrp6QfF7v4DPojx99Ek5BBJMGuTxXFD6GiIYTwJI72JHNGgjIKhrp_NHJo3BdwQhngijhI",
})
  .then((currentToken) => {
    if (currentToken) {
      console.log(currentToken);
      update(getCurrUserData().ref, { messagingToken: currentToken });
    } else {
      // Show permission request UI
      console.log(
        "No registration token available. Request permission to generate one."
      );
      // ...
    }
  })
  .catch((err) => {
    console.log("An error occurred while retrieving token. ", err);
    // ...
  });

// messaging.onMessageHandler = (message) => { console.log("Message received", message); };
// messaging.onBackgroundMessageHandler = (message) => { console.log("BG Message received", message); };
