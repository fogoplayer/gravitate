import { app } from "./app.mjs";
import {
  arrayUnion,
  addDoc as addDocToDB,
  setDoc as setDocInDB,
  deleteDoc as deleteDocInDB,
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
  arrayRemove,
} from "../../lib/firebase/9.7.0/firebase-firestore.js";
import { parseEvents, parseGroups, parseIndividuals } from "./db-loadData.mjs";
import { showRefreshPage } from "../../App.mjs";

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

  // Profile
  await setDoc(doc(db, "users", uid), {
    name: "",
    icon: "",
  });

  // Data
  await setDoc(doc(db, `users/${uid}/data`, "data"), {
    systems: [],
    friends: [],
  });
}

export async function initDBWatchers() {
  initingWatchers = true;
  const promises = Array.from(watched).map((ref) => {
    if (ref.type === "query") {
      return onSnapshot(ref, loadUserData);
    } else {
      const segments = ref.split("/").length;
      const isCollection = segments % 2;
      if (isCollection) {
        return onSnapshot(query(collection(db, ref)), loadUserData);
      } else {
        return onSnapshot(doc(db, ref), loadUserData);
      }
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

export function dangerousSetCurrUserData(obj) {
  currUserData = obj;
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

export async function deleteDoc(ref, data) {
  if (typeof ref === "string") {
    ref = doc(db, ref);
  }
  return await deleteDocInDB(ref, data);
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

export function pop(data) {
  return arrayRemove(data);
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
    codeDocRef: doc(db, `users/${user.uid}/data`, "code"),
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
  let attractions = parseEvents(currUserData.attractionsRef);
  let invitations = parseEvents(currUserData.invitationsRef);

  // Orbits
  watch(currUserData.orbitsRef);
  let orbits = getDocsData(currUserData.orbitsRef).then((orbits) =>
    parseGroups(orbits)
  );

  // Code
  watch(currUserData.codeDocRef);
  let codeDataDoc = getDocData(currUserData.codeDocRef)
    .then((codeData) => {
      currUserData.code = codeData.code;
      currUserData.codeMultiUse = codeData.codeMultiUse;
    })
    .catch(() => ({}));

  // Data
  watch(currUserData.dataDocRef);
  let userDataDoc = await getDocData(currUserData.dataDocRef);

  // Friends
  let friends = userDataDoc.friends;
  friends = parseIndividuals(friends);

  // Systems
  let systems = userDataDoc.systems;
  for (const system of systems) watch(system);
  systems = parseGroups(systems);

  [attractions, invitations, orbits, friends, codeDataDoc, systems] =
    await Promise.all([
      attractions,
      invitations,
      orbits,
      friends,
      codeDataDoc,
      systems,
    ]);
  Object.assign(currUserData, {
    attractions,
    invitations,
    orbits,
    friends /* code data is assigned earlier */,
    systems,
  });

  for (let invitation of invitations) {
    invitation.organizer = await getDocData(invitation.organizer);
    if (invitation.origin) {
      invitation.origin = await getDocData(invitation?.origin);
    }
  }
  currUserData.invitations = invitations;

  showRefreshPage();

  funcForAfterUpdate();
  funcForAfterUpdate = () => {};

  console.log(currUserData);

  return currUserData;
}
