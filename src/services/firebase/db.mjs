import {
  getFirestore,
  collection,
  getDoc,
  doc
} from "https://www.gstatic.com/firebasejs/9.7.0/firebase-firestore.js";

export async function getCurrUserData(user) {
  const docSnap = await getDoc(doc(db, "users", user.uid));
  return docSnap.data();
}

export function getCurrentUser() {
  return auth.currentUser;
}

export async function getDocData(ref) {
  const snap = await getDoc(ref);
  return snap.data();
}