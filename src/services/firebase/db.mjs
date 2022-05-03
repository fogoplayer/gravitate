import { app } from "./app.mjs";
import {
  getFirestore,
  collection,
  getDoc,
  doc,
  where,
  query
} from "https://www.gstatic.com/firebasejs/9.7.0/firebase-firestore.js";
import { authStateChanged } from "./auth.mjs";

const db = getFirestore(app);
const users = collection(db, "users");
const systems = collection(db, "systems");

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
    console.log(friend);
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

export async function getUserFromUsername(username) {
  const q = query(users, where("name", "==", username));

  const querySnapshot = await getDocs(q);
  if (querySnapshot.length > 1) throw new Error("Duplicate username exists");
  return querySnapshot[0];

  return querySnapshot.map((doc) => {
    console.log(doc.id, " => ", doc.data());
  });
}