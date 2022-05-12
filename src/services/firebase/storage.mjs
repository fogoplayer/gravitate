import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "https://www.gstatic.com/firebasejs/9.7.0/firebase-storage.js";
import { app } from "./app.mjs";
import { getCurrUserData, update } from "./db.mjs";

const storage = getStorage(app);

export async function uploadPFP(file) {
  if (!file) {
    return false;
  }
  console.log(file);
  const extension = file.name.split(".").at(-1);
  const fileRef = ref(
    storage,
    "users/" + getCurrUserData().uid + "/pfp." + extension
  );
  await uploadBytes(fileRef, file);
  update(getCurrUserData().ref, { icon: await getDownloadURL(fileRef) });
}
