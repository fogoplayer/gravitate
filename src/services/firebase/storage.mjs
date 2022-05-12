import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "https://www.gstatic.com/firebasejs/9.7.0/firebase-storage.js";
import { jsx } from "../render.mjs";
import { app } from "./app.mjs";
import { getCurrUserData, update } from "./db.mjs";

const storage = getStorage(app);

export async function uploadPFP(file) {
  if (!file) {
    return false;
  }
  const extension = file.name.split(".").at(-1);
  const fileRef = ref(
    storage,
    "users/" + getCurrUserData().uid + "/pfp." + extension
  );
  await uploadBytes(fileRef, file);
  update(getCurrUserData().ref, { icon: await getDownloadURL(fileRef) });
}

export function getIcon(icon) {
  const HTTPS = "https://";

  if (icon?.length) {
    return jsx`<span class="contact-icon">${icon}</span>`;
  } else if (icon?.substring(0, HTTPS.length) === HTTPS) {
    return jsx`<img src="${icon}" alt="User icon" />`;
  } else {
    return jsx`<span class="contact-icon">🟣</span>`;
  }
}
