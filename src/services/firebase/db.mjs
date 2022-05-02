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
  currUserData = await getDocData(doc(db, "users", user.uid));

  // Convert references to objects
  const systems = currUserData.systems;
  for (let i = 0; i < systems.length; i++) {
    const system = systems[i];
    systems[i] = await getDocData(system);
  }

  const friends = currUserData.friends;
  for (let i = 0; i < friends.length; i++) {
    const friend = friends[i];
    friends[i] = await getDocData(friend);
  }
}

export function getCurrUserData() {
  return currUserData;
}

export async function getDocData(ref) {
  const snap = await getDoc(ref);
  return snap.data();
}