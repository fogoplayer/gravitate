import { app } from "./app.mjs";
import {
  arrayUnion,
  setDoc,
  getFirestore,
  collection,
  getDoc,
  getDocs,
  doc,
  where,
  query,
  updateDoc,
  enableIndexedDbPersistence,
} from "https://www.gstatic.com/firebasejs/9.7.0/firebase-firestore.js";
import { authStateChanged } from "./auth.mjs";

const db = getFirestore(app);
const users = collection(db, "users");
const systems = collection(db, "systems");

let currUserData;

export async function createUserData(userCredential) {
  const uid = userCredential.user.uid;
  const newDoc = await setDoc(doc(db, "users", uid), {
    name: "",
    icon: "",
    orbits: [],
    systems: [],
    friends: [],
    invitations: [],
    attractions: [],
  });
  console.log(newDoc);
}

export async function loadUserData(user) {
  const ref = doc(db, "users", user.uid);
  currUserData = await getDocData(ref);
  currUserData.ref = ref;

  // Convert references to objects
  const orbits = currUserData.orbits;
  for (let orbit = 0; orbit < orbits.length; orbit++) {
    for (let member = 0; member < orbits[orbit].members.length; member++) {
      const ref = orbits[orbit].members[member];
      orbits[orbit].members[member] = await getDocData(
        orbits[orbit].members[member]
      );
      orbits[orbit].members[member].ref = ref;
    }
  }

  const systems = currUserData.systems;
  for (let system = 0; system < systems.length; system++) {
    const systemRef = systems[system];
    systems[system] = await getDocData(systems[system]);
    systems[system].ref = systemRef;
    for (let member = 0; member < systems[system].members.length; member++) {
      const memberRef = systems[system].members[member];
      systems[system].members[member] = await getDocData(
        systems[system].members[member]
      );
      systems[system].members[member].ref = memberRef;
    }
  }

  const friends = currUserData.friends;
  for (let friend = 0; friend < friends.length; friend++) {
    const ref = friends[friend];
    friends[friend] = await getDocData(ref);
    friends[friend].ref = ref;
  }
}

enableIndexedDbPersistence(db).catch((err) => {
  if (err.code == "failed-precondition") {
    // Multiple tabs open, persistence can only be enabled
    // in one tab at a a time.
    // ...
  } else if (err.code == "unimplemented") {
    // The current browser does not support all of the
    // features required to enable persistence
    // ...
  }
});

export function getCurrUserData() {
  return currUserData;
}

export async function getDocData(ref) {
  const snap = await getDoc(ref);
  return snap.data();
}

export async function update(ref, data) {
  return await updateDoc(ref, data);
}

export function push(data) {
  return arrayUnion(data);
}
