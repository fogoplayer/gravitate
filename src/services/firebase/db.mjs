import { app } from "./app.mjs";
import {
  getFirestore,
  collection,
  getDoc,
  doc
} from "https://www.gstatic.com/firebasejs/9.7.0/firebase-firestore.js";
import { authStateChanged } from "./auth.mjs";

const db = getFirestore(app);
let currUserData;

export async function initUserData(user) {
  const docSnap = await getDoc(doc(db, "users", user.uid));
  currUserData = docSnap.data();
}

export function getCurrUserData() {
  return currUserData;
}

export async function getDocData(ref) {
  const snap = await getDoc(ref);
  return snap.data();
}