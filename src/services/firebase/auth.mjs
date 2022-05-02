import { app } from "./app.mjs";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.7.0/firebase-auth.js";


const auth = getAuth();

export async function signIn(email, password) {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
}

export function getCurrentUser() {
  return auth.currentUser;
}

export function authStateChanged(callback) {
  onAuthStateChanged(auth, callback);
};