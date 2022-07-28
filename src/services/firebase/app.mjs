import { initializeApp } from "../../lib/firebase/9.7.0/firebase-app.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

let appConfig;

if (
  window.location.hostname.includes("alpha") ||
  window.location.hostname.includes("beta") ||
  window.location.hostname.includes("localhost")
) {
  // beta
  console.log("Connecting to beta environment");
  appConfig = {
    apiKey: "AIzaSyDi2qWTznKlE8woT-ire6Sza5QEOQ6S4uY",
    authDomain: "gravitate-43a9a.firebaseapp.com",
    projectId: "gravitate-43a9a",
    storageBucket: "gravitate-43a9a.appspot.com",
    messagingSenderId: "143251031284",
    appId: "1:143251031284:web:754f925a26adbf25d4caa1",
    measurementId: "G-J60CGEV2MD",
  };
} else {
  // prod
  console.log("Connecting to prod environment");
  appConfig = {
    apiKey: "AIzaSyCc-tDofBe12aHxxGXpLn2QuDyQD-OW51A",
    authDomain: "gravitate-prod-53542.firebaseapp.com",
    projectId: "gravitate-prod-53542",
    storageBucket: "gravitate-prod-53542.appspot.com",
    messagingSenderId: "548625272676",
    appId: "1:548625272676:web:442b9f693654ff8574f471",
    measurementId: "G-RKS5EXXTVB",
  };
}

// Initialize Firebase
export const app = initializeApp(appConfig);
