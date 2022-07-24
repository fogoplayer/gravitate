import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "../../lib/firebase/9.7.0/firebase-storage.js";
import { html } from "../render.mjs";
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
  const HTTP = "http";

  if (icon?.substring(0, HTTP.length) === HTTP) {
    return html`<img class="contact-icon pfp" src="${icon}" alt="User icon" />`;
  } else if (icon?.length) {
    return html`<span class="contact-icon noto">${icon}</span>`;
  } else {
    return html`<span class="contact-icon">🟣</span>`;
  }
}
