import {
  AttractionDetails,
  AttractionInfo,
} from "../../components/AttractionDetails.mjs";
import Input from "../../components/Input.mjs";
import Modal from "../../components/Modal.mjs";
import Spinner from "../../components/Spinner.mjs";
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
  let [system] = systems.filter((system) => system.name === id);

  return jsx`<button class="pfp noto" onclick="${showChangeIconModal}">
  ${system.icon}
  <div class="pfp-edit material-symbols-sharp">edit</div>
</button>
<button onclick="${showChangeNameModal}">
  <h2>${system.name}</h2>
</button>
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
  ${Input({
    label: "New Icon",
    id: "new-icon",
    required: true,
    pattern: ".",
  })}
  <aside>
    Icons are single characters, such as an emoji or a letter. Some emoji may
    not be supported.
  </aside>
  <button class="primary">Save icon ${Spinner()}</button>
  </form>`,
})} 
${Modal({
  id: "change-name",
  contents: jsx`
<form onsubmit="${updateName}">
  ${Input({
    label: "New Name",
    id: "new-name",
    required: true,
  })}
  <button class="primary">Save name ${Spinner()}</button>
</form>`,
})}
${Modal({
  id: "leave-modal",
  contents: jsx`Are you sure you want to
leave ${system.name}?
<button class="primary danger" onclick="${leaveSystem}">Yes, delete ${Spinner()}</button>`,
})}
`;

  // Modals
  function showChangeIconModal() {
    document.querySelector("#change-icon").showModal();
  }

  function showChangeNameModal() {
    document.querySelector("#change-name").showModal();
  }

  function showRemoveMemberModal(e) {
    e.preventDefault();
    e.currentTarget.parentNode.parentNode.nextSibling.showModal();
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
    afterUpdate(() => renderPage("/contacts/systems/" + newName));
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
    <a href="/contacts/${type}/${contact.name}">
      <div class="contact-header-container">
        ${getIcon(contact.icon)}
        <span class="contact-name">${contact.name}</span>
        <button type="button" class="flat" onclick="${
          contact.ref.path === ref.path ? showLeaveModal : showRemoveMemberModal
        }">
          <span class="material-symbols-sharp">remove</span>
        </button>
      </div>
    </a>
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
