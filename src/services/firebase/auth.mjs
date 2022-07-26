import { app } from "./app.mjs";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  sendPasswordResetEmail,
} from "../../lib/firebase/9.7.0/firebase-auth.js";
import { createUserData } from "./db.mjs";

const auth = getAuth();

export async function createAccount(email, password) {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  await createUserData(userCredential);
}

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
}

export async function logOut() {
  await signOut(auth);
  page.redirect("/login");
}

export async function resetPassword(email) {
  await sendPasswordResetEmail(auth, email);
}
