// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBDp-mA3wJJar1-vMAqu0uH0j7RuDonby8",
  authDomain: "gravitate-43a9a.firebaseapp.com",
  projectId: "gravitate-43a9a",
  storageBucket: "gravitate-43a9a.appspot.com",
  messagingSenderId: "143251031284",
  appId: "1:143251031284:web:754f925a26adbf25d4caa1",
  measurementId: "G-J60CGEV2MD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);