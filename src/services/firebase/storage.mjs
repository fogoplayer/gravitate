import {
  getDownloadURL,
  getStorage,
  ref,
  uploadString,
} from "../../lib/firebase/9.7.0/firebase-storage.js";
import { html } from "../render.mjs";
import { app } from "./app.mjs";
import { getCurrUserData, update } from "./db.mjs";

const storage = getStorage(app);

export async function uploadPFP(file) {
  if (!file) {
    return false;
  }
  file = file.replace(/.*,/, "");
  const fileRef = ref(storage, "users/" + getCurrUserData().uid + "/pfp.png");
  await uploadString(fileRef, file, "base64", {});
  update(getCurrUserData().ref, { icon: await getDownloadURL(fileRef) });
}

export function getIcon(icon) {
  const HTTP = "http";

  if (icon?.substring(0, HTTP.length) === HTTP) {
    return html`<img class="pfp" src="${icon}" alt="User icon" />`;
  } else if (icon?.length) {
    return html`<span class="noto pfp">${icon}</span>`;
  } else {
    return html`<span class="pfp">🟣</span>`;
  }
}
