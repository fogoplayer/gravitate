import {
  afterUpdate,
  getCurrUserData,
  setDoc,
  update,
} from "./firebase/db.mjs";
import { renderPage } from "./render.mjs";

export async function createNewInviteLinkAt(refWhereCodeIsStored) {
  const { codeDocRef } = getCurrUserData();
  const rand = Array.from(self.crypto.getRandomValues(new Uint32Array(2)));

  const code = rand.reduce((code, cryptoNumber) => {
    return code + parseInt(cryptoNumber).toString(26);
  }, "");

  if (refWhereCodeIsStored === codeDocRef) {
    update(refWhereCodeIsStored, {
      code,
      codeMultiUse: true,
    });
  } else {
    const codeMultiUse =
      document.querySelector("#new-invite-link :checked").value !==
      "Single Use";
    setDoc(refWhereCodeIsStored, {
      code,
      codeMultiUse,
    });
  }
  afterUpdate(() => renderPage(window.location.pathname));
}

export function copyInviteLinkToClipboard(inviteLink) {
  navigator.clipboard.writeText(inviteLink);
}

export async function shareInviteLink(inviteLink) {
  await navigator.share({ text: inviteLink });
}

export async function deleteInviteLinkFrom(refWhereCodeIsStored) {
  const { codeDocRef } = getCurrUserData();
  if (refWhereCodeIsStored === codeDocRef) {
    await setDoc(refWhereCodeIsStored, {
      code: "",
      codeMultiUse: false,
    });
  } else {
    await update(refWhereCodeIsStored, {
      code: "",
      codeMultiUse: false,
    });
  }

  renderPage(window.location.pathname);
}
