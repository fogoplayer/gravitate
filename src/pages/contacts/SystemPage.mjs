import { setPageTitle } from "../../components/AppShell.mjs";
import {
  AttractionDetails,
  AttractionInfo,
} from "../../components/AttractionDetails.mjs";
import Input from "../../components/Input.mjs";
import Modal from "../../components/Modal.mjs";
import Spinner from "../../components/Spinner.mjs";
import SegmentControl from "../../components/SegmentControl.mjs";
import { AttractionsTemplate } from "../../components/templates/AttractionsTemplate.mjs";
import { FriendSelectTemplate } from "../../components/templates/FriendSelectTemplate.mjs";
import {
  afterUpdate,
  deleteDoc,
  getCurrUserData,
  pop,
  push,
  update,
} from "../../services/firebase/db.mjs";
import { getIcon } from "../../services/firebase/storage.mjs";
import { jsx, renderPage } from "../../services/render.mjs";

export default function SystemPage(id) {
  let { friends, systems, dataDocRef, ref } = getCurrUserData();
  let members = new Set();
  let icon;

  // Filter imports
  let [system] = systems.filter((system) => system.ref.id === id);

  setPageTitle("Contacts", system.name);
  const inviteLink =
    window.location.origin +
    "/contacts/invite/systems/" +
    system.ref.id +
    "/" +
    system.invite.code;

  return jsx`<button class="pfp noto" onclick="${showChangeIconModal}">
  ${system.icon}
  <div class="pfp-icon material-symbols-sharp">edit</div>
</button>
<button class="edit-name" onclick="${showChangeNameModal}">
  <h2>${system.name}</h2>
</button>
${
  !system.invite.code
    ? jsx`<button class="flat" onclick="${showNewInviteLinkModal}">
  <span class="material-symbols-sharp"> link </span>Generate invite link</button
>`
    : jsx`
<div class="join-link">
  <span>Invite link:</span>
  <button class="link-text" onclick="${copyInviteLinkToClipboard}">${inviteLink}</button>
  <button class="flat">
    <span class="material-symbols-sharp" onclick="${copyInviteLinkToClipboard}"> content_copy </span>
  </button>
  ${
    navigator.canShare({ text: inviteLink })
      ? jsx`<button class="flat" onclick="${shareInviteLink}">
    <span class="material-symbols-sharp"> share </span>
  </button>`
      : ""
  }
  <button class="flat" onclick="${showNewInviteLinkModal}">
    <span class="material-symbols-sharp"> refresh </span>
  </buttlion>
  <button class="flat" onclick="${deleteInviteLink}">
    <span class="material-symbols-sharp"> delete </span>
  </button>
</div>
`
}
<ul class="contacts-list contacts-list">
  <li class="members-wrapper">
    <h2>
      <img src="/images/system.svg" alt="Systems icon" class="header-icon" />
      <span class="header-text">Members</span>
    </h2>
    ${GroupTemplate(system.members, "friends")}
  </li>
</ul>
<button class="flat danger" onclick="${showLeaveModal}">Leave system</button>
${Modal({
  id: "change-icon",
  contents: jsx`
<form onsubmit="${updateIcon}">
  ${Input({ label: "New Icon", id: "new-icon", required: true, pattern: "." })}
  <aside>
    Icons are single characters, such as an emoji or a letter. Some emoji may
    not be supported.
  </aside>
  <button class="primary">Save icon ${Spinner()}</button>
</form>
`,
})} ${Modal({
    id: "change-name",
    contents: jsx`
<form onsubmit="${updateName}">
  ${Input({ label: "New Name", id: "new-name", required: true })}
  <button class="primary">Save name ${Spinner()}</button>
</form>
`,
  })}${Modal({
    id: "new-invite-link",
    contents: jsx`What kind of code? ${SegmentControl({
      segments: ["Single Use", "Reusable"],
      name: "code-type",
    })}
    <aside>Single use codes are consumed after someone joins the system using the code (more secure).</aside>
     <aside>Reusable codes can be used by as many people as have access to the link, until the link is deleted or changed.</aside>
    <button class="primary" onclick="${createNewInviteLink}">Create code</button>
    `,
  })} ${Modal({
    id: "leave-modal",
    contents: jsx`Are you sure you want to leave
${system.name}?
<button class="primary danger" onclick="${leaveSystem}">Yes, delete
  ${Spinner()}</button>`,
  })}
`;
  // Invite Link
  async function createNewInviteLink() {
    const rand = Array.from(self.crypto.getRandomValues(new Uint32Array(2)));

    const code = rand.reduce((code, cryptoNumber) => {
      return code + parseInt(cryptoNumber).toString(26);
    }, "");
    const oneTimeUse =
      document.querySelector("#new-invite-link :checked").value ===
      "Single Use";
    await update(system.ref, {
      invite: {
        code,
        oneTimeUse,
      },
    });
    renderPage(window.location.pathname);
  }

  function copyInviteLinkToClipboard(e) {
    navigator.clipboard.writeText(inviteLink);
  }

  async function shareInviteLink() {
    await navigator.share({ text: inviteLink });
  }

  async function deleteInviteLink() {
    await update(system.ref, {
      invite: {
        code: "",
        oneTimeUse: false,
      },
    });
    renderPage(window.location.pathname);
  }

  // Modals
  function showChangeIconModal() {
    document.querySelector("#change-icon").showModal();
  }

  function showChangeNameModal() {
    document.querySelector("#change-name").showModal();
  }

  function showNewInviteLinkModal() {
    document.querySelector("#new-invite-link").showModal();
  }

  function showAddFriendModal(e) {
    e.preventDefault();
    e.currentTarget.parentNode.parentNode.nextSibling.showModal();
  }

  function showRemoveMemberModal(e) {
    e.preventDefault();
    e.currentTarget.parentNode.parentNode.nextSibling.nextSibling.showModal();
  }

  function showLeaveModal(e) {
    e.preventDefault();
    document.querySelector("#leave-modal").showModal();
  }

  // Database
  function updateIcon(e) {
    e.preventDefault();
    e.submitter.classList.add("loading");
    const newIcon = document.querySelector("#new-icon").value;
    update(system.ref, { icon: newIcon });
    afterUpdate(() => renderPage(window.location.pathname));
  }

  function updateName(e) {
    e.preventDefault();
    e.submitter.classList.add("loading");
    const newName = document.querySelector("#new-name").value.trim();
    update(system.ref, { name: newName });
    afterUpdate(() => renderPage(window.location.pathname));
  }

  function addFriend(e, friend) {
    e.target.classList.add("loading");
    update(dataDocRef, {
      friends: push(friend),
    });
    afterUpdate(() => renderPage(window.location.pathname));
  }

  function removeMember(e, member) {
    e.target.classList.add("loading");
    update(system.ref, {
      members: pop(member),
    });
    afterUpdate(() => renderPage(window.location.pathname));
  }

  function leaveSystem(e) {
    e.target.classList.add("loading");

    update(dataDocRef, { systems: pop(system.ref) });
    removeMember(e, ref);
    afterUpdate(() => renderPage("/contacts"));
  }

  // Templates
  function GroupTemplate(contacts, type) {
    if (contacts.length > 0) {
      return jsx`<ul>
  ${contacts.map(
    (contact) => jsx`
  <li>
    <a href="${
      friends.find((friend) => contact.ref.id === friend.ref.id)
        ? `/contacts/${type}/${contact.ref.id}`
        : ""
    }">
      <div class="contact-header-container">
        ${getIcon(contact.icon)}
        <span class="contact-name">${contact.name}</span>
        ${
          !(
            contact.ref.id === ref.id ||
            friends.find((friend) => contact.ref.id === friend.ref.id)
          )
            ? jsx`<button type="button" class="flat" onclick="${showAddFriendModal}">
                <span class="material-symbols-sharp">person_add</span>
              </button>`
            : ""
        }
        <button type="button" class="flat" onclick="${
          contact.ref.id === ref.id ? showLeaveModal : showRemoveMemberModal
        }">
          <span class="material-symbols-sharp">remove</span>
        </button>
      </div>
    </a>
    ${Modal({
      contents: jsx`<center>Add <b>${contact.name}</b> as a friend?</center>
      <button class="primary" onclick=${(e) =>
        addFriend(e, contact.ref)}>Yes, add ${Spinner()}</button>`,
    })}
    ${Modal({
      contents: jsx`<center>Are you sure you want to remove <b>${
        contact.name
      }</b> from <b>${system.name}</b>?
    </center>
      <button class="primary danger" onclick=${(e) =>
        removeMember(e, contact.ref)}>Yes, delete ${Spinner()}</button>`,
    })}
  </li>
  `
  )}
</ul>`;
    } else {
      return jsx`<div class="empty-message">No members added</div>`;
    }
  }
}
