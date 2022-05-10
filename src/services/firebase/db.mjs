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

let currUserData = {};

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

export async function loadUserData(user) {
  if (!user) {
    return false;
  }

  const ref = doc(db, "users", user.uid);
  currUserData = await getDocData(ref);
  Object.assign(currUserData, {
    ref: ref,
    attractions: [],
    invitations: [],
    orbits: [],
    friends: [],
    systems: [],
  });

  // Convert references to objects

  // Attractions
  let attractions = currUserData.attractions;
  attractions = await getDocs(collection(db, `users/${user.uid}/attractions`));
  currUserData.attractions = attractions.docs.map((doc) => doc.data());
  // for (let attraction = 0; attraction < attractions.length; attraction++) {
  //   for (let member = 0; member < attractions[attraction].members.length; member++) {
  //     const ref = attractions[attraction].members[member];
  //     attractions[attraction].members[member] = await getDocData(
  //       attractions[attraction].members[member]
  //     );
  //     attractions[attraction].members[member].ref = ref;
  //   }
  // }

  // Invitations
  let invitations = currUserData.invitations;
  invitations = await getDocs(collection(db, `users/${user.uid}/invitations`));
  invitations = invitations.docs.map((doc) => doc.data());
  // for (let invitation = 0; invitation < invitations.length; invitation++) {
  //   for (let member = 0; member < invitations[invitation].members.length; member++) {
  //     const ref = invitations[invitation].members[member];
  //     invitations[invitation].members[member] = await getDocData(
  //       invitations[invitation].members[member]
  //     );
  //     invitations[invitation].members[member].ref = ref;
  //   }
  // }

  // Orbits
  let orbits = currUserData.orbits;
  orbits = await getDocs(collection(db, `users/${user.uid}/orbits`));
  orbits = orbits.docs.map((doc) => doc.data());
  for (let orbit = 0; orbit < orbits.length; orbit++) {
    for (let member = 0; member < orbits[orbit].members.length; member++) {
      const ref = orbits[orbit].members[member];
      orbits[orbit].members[member] = await getDocData(
        orbits[orbit].members[member]
      );
      orbits[orbit].members[member].ref = ref;
    }
  }

  // Data
  let userDataDoc = await getDocData(doc(db, `users/${user.uid}/data`, "data"));

  // Friends
  let friends = currUserData.friends;
  friends = userDataDoc.friends;

  for (let friend = 0; friend < friends.length; friend++) {
    const ref = friends[friend];
    friends[friend] = await getDocData(ref);
    friends[friend].ref = ref;
  }

  // Systems
  let systems = currUserData.systems;
  systems = userDataDoc.systems;
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

  console.log(currUserData);
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

export async function usernameSearch(username) {
  const q = query(users, where("name", "==", username));
  let docs = await getDocs(q);
  return docs.docs.map((doc) => doc.data());
}
