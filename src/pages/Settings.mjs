import Input from "../../components/Input.mjs";
import { getCurrentUser } from "../../services/firebase/auth.mjs";
import {
  afterUpdate,
  getCurrUserData,
  update,
  usernameSearch,
} from "../../services/firebase/db.mjs";
import { uploadPFP } from "../../services/firebase/storage.mjs";
import { html, renderPage } from "../../services/render.mjs";
import { setPageTitle } from "../components/AppShell.mjs";
import Modal from "../components/Modal.mjs";
import SegmentControl from "../components/SegmentControl.mjs";
import { setDoc } from "../services/firebase/db.mjs";
import {
  copyInviteLinkToClipboard,
  createNewInviteLinkAt,
  deleteInviteLinkFrom,
  shareInviteLink,
} from "../services/invite-codes.mjs";

export default function Settings() {
  setPageTitle("Settings");

  let { icon, name, code, codeMultiUse, ref, codeDocRef } = getCurrUserData();
  const inviteLink = window.location.origin + "/i/u/" + ref.id + "/" + code;

  return html`<div class="contact-page">
    <form onsubmit="${onSubmit}">
      <label class="image-picker">
        <img class="pfp" src="${icon}" alt="Choose a profile picture" />
        ${Input({
          label: "Profile Picture",
          id: "profile-picture",
          className: "hidden",
          type: "file",
          value: icon,
          oninput: (e) => {
            if (!e.target.files[0]) {
              return;
            }
            uploadPFP(e.target.files[0]);
            afterUpdate(() => {
              document.querySelector(".image-picker img").src =
                getCurrUserData().icon;
            });
          },
        })}
      </label>
      <div class="inline-inputs">
        ${Input({
          label: "Username",
          id: "username",
          value: name,
          errorMessage: "That username is taken. Please try again.",
        })}
        <button class="primary small">Save</button>
      </div>
    </form>
    ${
      !code
        ? html`<button class="flat" onclick="${showNewInviteLinkModal}">
            <span class="material-symbols-sharp"> link </span>Generate invite
            link
          </button>`
        : html`<div class="join-link">
            <span>Invite link:</span>
            <button
              class="link-text"
              onclick="${() => copyInviteLinkToClipboard(inviteLink)}"
            >
              ${inviteLink}
            </button>
            <button id="copy-link" class="flat">
              <span
                class="material-symbols-sharp"
                onclick="${() => copyInviteLinkToClipboard(inviteLink)}"
              >
                content_copy
              </span>
            </button>
            ${navigator.canShare && navigator.canShare({ text: inviteLink })
              ? html`<button
                  class="flat"
                  onclick="${() => shareInviteLink(inviteLink)}"
                >
                  <span class="material-symbols-sharp"> share </span>
                </button>`
              : ""}
            <button
              id="redo-link"
              class="flat"
              onclick="${showNewInviteLinkModal}"
            >
              <span class="material-symbols-sharp"> refresh </span>
            </button>
            <button
              id="delete-link"
              class="flat"
              onclick="${() => deleteInviteLinkFrom(system.ref)}"
            >
              <span class="material-symbols-sharp"> delete </span>
            </button>
          </div>`
    }
   <a href="/onboarding/tour" class="button flat inline">Retake tour</a> 
   ${Modal({
     id: "new-invite-link",
     contents: html`<aside>Note: All friend codes are multi-use!</aside>
       <button
         class="primary"
         onclick="${() => createNewInviteLinkAt(codeDocRef)}"
       >
         Create code
       </button>`,
   })} 
</div class="ignore settings"> 
`;

  async function onSubmit(e) {
    e.preventDefault();
    try {
      e.submitter.classList.add("loading");

      let username = document.querySelector("#username").value;
      let usersWithUsername = await usernameSearch(username);
      if (usersWithUsername.length > 0) {
        throw new Error("username-exists");
      }

      await update(getCurrUserData().ref, {
        name: username,
      });
    } catch (error) {
      console.error(error);
      e.submitter.classList.remove("loading");
      if (error.message === "username-exists") {
        document
          .getElementById("username")
          .parentNode.parentNode.classList.add("invalid");
      }
    }
  }

  function personImage() {
    return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path fill="currentcolor" d="M24 23.95Q20.7 23.95 18.6 21.85Q16.5 19.75 16.5 16.45Q16.5 13.15 18.6 11.05Q20.7 8.95 24 8.95Q27.3 8.95 29.4 11.05Q31.5 13.15 31.5 16.45Q31.5 19.75 29.4 21.85Q27.3 23.95 24 23.95ZM8 40V35.3Q8 33.4 8.95 32.05Q9.9 30.7 11.4 30Q14.75 28.5 17.825 27.75Q20.9 27 24 27Q27.1 27 30.15 27.775Q33.2 28.55 36.55 30Q38.1 30.7 39.05 32.05Q40 33.4 40 35.3V40ZM11 37H37V35.3Q37 34.5 36.525 33.775Q36.05 33.05 35.35 32.7Q32.15 31.15 29.5 30.575Q26.85 30 24 30Q21.15 30 18.45 30.575Q15.75 31.15 12.6 32.7Q11.9 33.05 11.45 33.775Q11 34.5 11 35.3ZM24 20.95Q25.95 20.95 27.225 19.675Q28.5 18.4 28.5 16.45Q28.5 14.5 27.225 13.225Q25.95 11.95 24 11.95Q22.05 11.95 20.775 13.225Q19.5 14.5 19.5 16.45Q19.5 18.4 20.775 19.675Q22.05 20.95 24 20.95ZM24 16.45Q24 16.45 24 16.45Q24 16.45 24 16.45Q24 16.45 24 16.45Q24 16.45 24 16.45Q24 16.45 24 16.45Q24 16.45 24 16.45Q24 16.45 24 16.45Q24 16.45 24 16.45ZM24 37Q24 37 24 37Q24 37 24 37Q24 37 24 37Q24 37 24 37Q24 37 24 37Q24 37 24 37Q24 37 24 37Q24 37 24 37Z"/></svg>`;
  }

  function showNewInviteLinkModal() {
    document.querySelector("#new-invite-link").showModal();
  }
}
