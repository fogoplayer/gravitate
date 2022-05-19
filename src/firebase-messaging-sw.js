importScripts("./lib/firebase/7.14.6/firebase-app.js");
importScripts("./lib/firebase/7.14.6/firebase-messaging.js");

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDi2qWTznKlE8woT-ire6Sza5QEOQ6S4uY",
  authDomain: "gravitate-43a9a.firebaseapp.com",
  projectId: "gravitate-43a9a",
  storageBucket: "gravitate-43a9a.appspot.com",
  messagingSenderId: "143251031284",
  appId: "1:143251031284:web:754f925a26adbf25d4caa1",
  measurementId: "G-J60CGEV2MD",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
  console.log(payload);
  const notification = JSON.parse(payload);
  const notificationOption = {
    body: notification.body,
    icon: notification.icon,
  };
  return self.registration.showNotification(
    payload.notification.title,
    notificationOption
  );
});
