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

export async function uploadPFP(imageFile) {
  // Create reader
  var reader = new FileReader();
  reader.onload = function (e) {
    var img = document.createElement("img");
    img.onload = () => {
      resizeImg(img, imageFile);
    };
    img.src = e.target.result;
  };
  // Run reader
  reader.readAsDataURL(imageFile);
}

export function getIcon(icon) {
  const HTTP = "http";

  if (icon?.substring(0, HTTP.length) === HTTP) {
    return html`<img class="pfp" src="${icon}" alt="User icon" />`;
  } else if (icon?.length) {
    return html`<span class="noto pfp">${icon}</span>`;
  } else {
    return html`<span class="noto pfp">🟣</span>`;
  }
}

function resizeImg(img) {
  // Size limits
  var MAX_WIDTH = 300;
  var MAX_HEIGHT = 300;

  var width = img.width;
  var height = img.height;
  if (width < height) {
    if (width > MAX_WIDTH) {
      height = height * (MAX_WIDTH / width);
      width = MAX_WIDTH;
    }
  } else {
    if (height > MAX_HEIGHT) {
      width = width * (MAX_HEIGHT / height);
      height = MAX_HEIGHT;
    }
  }

  // Shrink to canvas
  var canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  var ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, width, height);
  var dataurl = canvas.toDataURL();

  // Show & upload resized image
  document.querySelector(".pfp").src = dataurl;
  uploadFinalPFP(dataurl);
}

async function uploadFinalPFP(imageFile) {
  if (!imageFile) {
    return false;
  }
  imageFile = imageFile.replace(/.*,/, "");
  const fileRef = ref(storage, "users/" + getCurrUserData().uid + "/pfp.png");
  await uploadString(fileRef, imageFile, "base64", {});
  update(getCurrUserData().ref, { icon: await getDownloadURL(fileRef) });
}
