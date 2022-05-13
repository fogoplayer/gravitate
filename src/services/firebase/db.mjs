import { app } from "./app.mjs";
import {
  arrayUnion,
  addDoc as addDocToDB,
  setDoc as setDocInDB,
  getFirestore,
  collection,
  getDoc,
  getDocs,
  doc,
  where,
  query,
  updateDoc,
  onSnapshot,
  enableIndexedDbPersistence,
} from "https://www.gstatic.com/firebasejs/9.7.0/firebase-firestore.js";

const db = getFirestore(app);
const users = collection(db, "users");
export const systems = collection(db, "systems");

let currUserData = {};
let funcForAfterUpdate = () => {};

export async function createUserData(userCredential) {
  const uid = userCredential.user.uid;

  const profile = await setDoc(doc(db, "users", uid), {
    name: "",
    icon: "",
  });

  const data = await setDoc(doc(db, `users/${uid}/data`, "data"), {
    systems: [],
    friends: [],
  });
}

export function initDBWatchers() {
  onSnapshot(currUserData.ref, loadUserData);
  onSnapshot(currUserData.dataDocRef, loadUserData);
  onSnapshot(query(currUserData.attractionsRef), loadUserData);
  onSnapshot(query(currUserData.invitationsRef), loadUserData);
  onSnapshot(query(currUserData.orbitsRef), loadUserData);
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
  return Object.assign(snap.data(), { ref: ref });
}

export function setDoc(ref, data) {
  if (typeof ref === "string") {
    ref = doc(db, ref);
  }
  return setDocInDB(ref, data);
}

export function addDoc(path, data) {
  if (typeof path === "string") {
    path = collection(db, path);
  }
  return addDocToDB(path, data);
}

export async function update(ref, data) {
  if (typeof ref === "string") {
    ref = doc(db, ref);
  }
  return await updateDoc(ref, data);
}

export function push(data) {
  return arrayUnion(data);
}

export function afterUpdate(func) {
  funcForAfterUpdate = func;
}

export async function usernameSearch(username) {
  const q = query(users, where("name", "==", username));
  let docs = await getDocs(q);
  let datas = [];
  docs.forEach((doc) => {
    let data = doc.data();
    datas.push({ ...data, ref: doc.ref });
  });
  return datas;
}

export async function loadUserData(user) {
  if (currUserData.uid) {
    user.uid = currUserData.uid;
  } else if (!user) {
    return false;
  }
  const ref = doc(db, "users", user.uid);
  currUserData = await getDocData(ref);

  Object.assign(currUserData, {
    dataDocRef: doc(db, `users/${user.uid}/data`, "data"),
    attractionsRef: collection(db, `users/${user.uid}/attractions`),
    invitationsRef: collection(db, `users/${user.uid}/invitations`),
    orbitsRef: collection(db, `users/${user.uid}/orbits`),
    ref: ref,
    uid: user.uid,
    attractions: [],
    invitations: [],
    orbits: [],
    friends: [],
    systems: [],
  });

  // Convert references to objects
  // Attractions
  let attractions = await getDocs(currUserData.attractionsRef);
  attractions = attractions.docs.map((doc) => doc.data());
  // for (let attraction = 0; attraction < attractions.length; attraction++) {
  //   for (let member = 0; member < attractions[attraction].members.length; member++) {
  //     attractions[attraction].members[member] = await getDocData(
  //       attractions[attraction].members[member]
  //     );
  //   }
  // }
  currUserData.attractions = attractions;

  // Invitations
  let invitations = await getDocs(currUserData.invitationsRef);
  invitations = invitations.docs.map((doc) => doc.data());
  for (let invitation of invitations) {
    invitation.organizer = await getDocData(invitation.organizer);
    invitation.origin = await getDocData(invitation?.origin);
  }
  currUserData.invitations = invitations;

  // Orbits
  let orbits = await getDocs(currUserData.orbitsRef);
  orbits = orbits.docs.map((doc) => doc.data());
  for (let orbit = 0; orbit < orbits.length; orbit++) {
    for (let member = 0; member < orbits[orbit].members.length; member++) {
      orbits[orbit].members[member] = await getDocData(
        orbits[orbit].members[member]
      );
    }
  }
  currUserData.orbits = orbits;

  // Data
  let userDataDoc = await getDocData(currUserData.dataDocRef);

  // Friends
  let friends = userDataDoc.friends;
  for (let friend = 0; friend < friends.length; friend++) {
    friends[friend] = await getDocData(friends[friend]);
  }
  currUserData.friends = friends;

  // Systems
  let systems = userDataDoc.systems;
  for (let system = 0; system < systems.length; system++) {
    systems[system] = await getDocData(systems[system]);
    for (let member = 0; member < systems[system].members.length; member++) {
      systems[system].members[member] = await getDocData(
        systems[system].members[member]
      );
    }
    currUserData.systems = systems;
  }

  funcForAfterUpdate();
  funcForAfterUpdate = () => {};

  return currUserData;
}
