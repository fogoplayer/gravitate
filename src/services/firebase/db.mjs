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
  onSnapshot as onSnapshotDB,
  enableIndexedDbPersistence,
} from "../../lib/firebase/9.7.0/firebase-firestore.js";
export { deleteDoc } from "../../lib/firebase/9.7.0/firebase-firestore.js";
import { parseEvents, parseGroups, parseIndividuals } from "./db-loadData.mjs";
import { hideRefreshPage, showRefreshPage } from "../../App.mjs";

const db = getFirestore(app);
const users = collection(db, "users");
export const systems = collection(db, "systems");

let currUserData = {};
let watched = new Set();
let initingWatchers = false;
let funcForAfterUpdate = () => {};

export function watch(ref) {
  // Might be a ref, might be a string
  if (ref.path) {
    watched.add(ref.path);
  } else {
    watched.add(ref);
  }
}

export function onSnapshot(ref, func) {
  return new Promise((resolve, reject) => {
    var resolveOnce = (doc) => {
      resolveOnce = () => {};
      resolve(doc);
    };
    onSnapshotDB(
      ref,
      (snap) => {
        resolveOnce(func(snap));
      },
      reject
    );
  });
}

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

export async function initDBWatchers() {
  initingWatchers = true;
  const promises = Array.from(watched).map((ref) => {
    const segments = ref.split("/").length;
    const isCollection = segments % 2;
    if (isCollection) {
      return onSnapshot(query(collection(db, ref)), loadUserData);
    } else {
      return onSnapshot(doc(db, ref), loadUserData);
    }
  });
  await Promise.all(promises);
  initingWatchers = false;
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
  if (Object.keys(currUserData).length === 0) return false;
  return currUserData;
}

export async function getDocData(ref) {
  if (typeof ref === "string") {
    ref = doc(db, ref);
  }
  const snap = await getDoc(ref);
  return Object.assign(snap.data(), { ref: ref });
}

export async function getDocsData(ref) {
  if (typeof ref === "string") {
    ref = collection(db, ref);
  }
  const snaps = await getDocs(ref);
  return snaps.docs.map((doc) => Object.assign(doc.data(), { ref: doc.ref }));
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

export async function loadUserData(user = {}) {
  if (initingWatchers) {
    return false;
  } else if (currUserData.uid) {
    user.uid = currUserData.uid;
  } else if (!user) {
    return false;
  }
  const ref = doc(db, "users", user.uid);
  watch(ref);
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
  watch(currUserData.attractionsRef);
  let attractions = await getDocsData(currUserData.attractionsRef);
  // attractions.guestList = parseIndividuals(attractions.guestList);
  currUserData.attractions = await parseEvents(attractions);

  // Invitations
  watch(currUserData.invitationsRef);
  let invitations = await getDocsData(currUserData.invitationsRef);
  invitations = await parseEvents(invitations);
  for (let invitation of invitations) {
    invitation.organizer = await getDocData(invitation.organizer);
    invitation.origin = await getDocData(invitation?.origin);
  }
  currUserData.invitations = invitations;

  // Orbits
  watch(currUserData.orbitsRef);
  let orbits = await getDocsData(currUserData.orbitsRef);
  currUserData.orbits = await parseGroups(orbits);

  // Data
  watch(currUserData.dataDocRef);
  let userDataDoc = await getDocData(currUserData.dataDocRef);

  // Friends
  let friends = userDataDoc.friends;
  currUserData.friends = await parseIndividuals(friends);

  // Systems
  let systems = userDataDoc.systems;
  currUserData.systems = await parseGroups(systems);

  showRefreshPage();

  funcForAfterUpdate();
  funcForAfterUpdate = () => {};

  console.log(currUserData);

  return currUserData;
}
