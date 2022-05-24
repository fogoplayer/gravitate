import {
  AttractionDetails,
  AttractionInfo,
} from "../../components/AttractionDetails.mjs";
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

export default function OrbitPage(id) {
  let { friends, orbits } = getCurrUserData();
  let members = new Set();

  // Filter imports
  orbits.forEach((orbit) =>
    console.log(id, encodeURIComponent(orbit.name), id === orbit.name)
  );
  let [orbit] = orbits.filter((orbit) => orbit.name === id);

  return jsx`<button class="pfp noto">${orbit.icon}</button>
<h2>${orbit.name}</h2>
<ul class="contacts-list contacts-list">
  <li class="members-wrapper">
    <h2>
      <img src="/images/orbit.svg" alt="Orbits icon" class="header-icon" />
      <span class="header-text">Members</span>
      <button type="button" class="header-btn" onclick="${showAddMemberModal}">
        <span class="material-symbols-sharp">add</span>
      </button>
    </h2>
    ${GroupTemplate(orbit.members, "friends")}
  </li>
</ul>
<button class="flat danger" onclick=${showUnfriendModal}>Delete Orbit</button>
${Modal({
  id: "unfriend-modal",
  contents: jsx`Are you sure you want to delete ${orbit.name}?
  <button class="primary danger" onclick=${deleteOrbit}>Yes, delete</button>`,
})}
${Modal({
  id: "add-members",
  contents: jsx`<form onsubmit="${addMembers}">
    Select friends to add:
    <ul class="user-list">${friends.map((friend) =>
      FriendSelectTemplate(friend, {
        name: "added-members",
        onchange: function (e) {
          if (e.target.checked) {
            members.add(friend.ref);
          } else {
            members.delete(friend.ref);
          }
        },
        required: true,
      })
    )}</ul>
    <button class="primary">Add members ${Spinner()}
    </button>
  </form>`,
})}`;

  // Helpers
  function showUnfriendModal() {
    document.querySelector("#unfriend-modal").showModal();
  }

  function showAddMemberModal() {
    document.querySelector("#add-members").showModal();
  }

  function showRemoveMemberModal(e) {
    e.preventDefault();
    document.querySelector("#remove-member").showModal();
  }

  function addMembers(e) {
    e.preventDefault();
    e.submitter.classList.add("loading");
    update(orbit.ref, {
      members: push(...Array.from(members)),
    });
    afterUpdate(() => renderPage(window.location.pathname));
  }

  function deleteOrbit() {
    deleteDoc(orbit.ref);
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
        <button type="button" class="flat" onclick="${showRemoveMemberModal}">
          <span class="material-symbols-sharp">remove</span>
        </button>
      </div>
    </a>
  </li>
  `
  )}
</ul>`;
    } else {
      return jsx`<div class="empty-message">Not in any of your ${type}</div>`;
    }
  }
}
