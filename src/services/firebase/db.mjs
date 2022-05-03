import { app } from "./app.mjs";
import {
  arrayUnion,
  getFirestore,
  collection,
  getDoc,
  getDocs,
  doc,
  where,
  query,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/9.7.0/firebase-firestore.js";
import { authStateChanged } from "./auth.mjs";

const db = getFirestore(app);
const users = collection(db, "users");
const systems = collection(db, "systems");

let currUserData;

export async function initUserData(user) {
  currUserData = await getDocData(doc(db, "users", user.uid));

  // Convert references to objects
  const orbits = currUserData.orbits;
  for (let i = 0; i < orbits.length; i++) {
    for (let j = 0; j < orbits[i].members.length; j++) {
      orbits[i].members[j] = await getDocData(orbits[i].members[j]);
    }
  }

  const systems = currUserData.systems;
  for (let i = 0; i < systems.length; i++) {
    const system = systems[i];
    systems[i] = await getDocData(system);
    for (let j = 0; j < systems[i].members.length; j++) {
      systems[i].members[j] = await getDocData(systems[i].members[j]);
    }
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

export async function getUserFromUsername(username) {
  const q = query(users, where("name", "==", username));

  const querySnapshot = await getDocs(q);
  if (querySnapshot.size > 1) throw new Error("Duplicate username exists");
  return querySnapshot.docs[0].ref;
}

export async function update(ref, data) {
  return await updateDoc(ref, data);
}

export function push(data) {
  return arrayUnion(data);
}