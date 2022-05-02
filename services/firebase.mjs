import { initializeApp } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.7.0/firebase-auth.js";
import {
  getFirestore,
  collection,
  getDoc,
  doc
} from "https://www.gstatic.com/firebasejs/9.7.0/firebase-firestore.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBDp-mA3wJJar1-vMAqu0uH0j7RuDonby8",
  authDomain: "gravitate-43a9a.firebaseapp.com",
  projectId: "gravitate-43a9a",
  storageBucket: "gravitate-43a9a.appspot.com",
  messagingSenderId: "143251031284",
  appId: "1:143251031284:web:754f925a26adbf25d4caa1",
  measurementId: "G-J60CGEV2MD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

let user;

export async function signIn(email, password) {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  user = userCredential.user;
}

onAuthStateChanged(auth, async (user) => {
  console.log("auth changed");

});

export async function getCurrUserData() {
  const docSnap = await getDoc(doc(db, "users", user.uid));
  return docSnap.data();
}