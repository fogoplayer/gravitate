import { setPageTitle } from "../../components/AppShell.mjs";
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
import { html, renderPage } from "../../services/render.mjs";

export default function OrbitPage(id) {
  let { friends, orbits } = getCurrUserData();
  let members = new Set();

  // Filter imports
  let [orbit] = orbits.filter((orbit) => orbit.ref.id === id);

  setPageTitle("Contacts", orbit.name);

  return html`<button class="pfp noto" onclick="${showChangeIconModal}">
      ${orbit.icon}
      <div class="pfp-icon material-symbols-sharp">edit</div>
    </button>
    <button class="edit-name" onclick="${showChangeNameModal}">
      <h2>${orbit.name}</h2>
    </button>
    <ul class="contacts-list contacts-list">
      <li class="members-wrapper">
        <h2>
          <img src="/images/orbit.svg" alt="Orbits icon" class="header-icon" />
          <span class="header-text">Members</span>
          <button
            type="button"
            class="header-btn"
            onclick="${showAddMemberModal}"
          >
            <span class="material-symbols-sharp">add</span>
          </button>
        </h2>
        ${GroupTemplate(orbit.members, "friends")}
      </li>
    </ul>
    <button class="flat danger" onclick="${showDeleteModal}">
      Delete Orbit
    </button>
    ${Modal({
      id: "change-icon",
      contents: html` <form onsubmit="${updateIcon}">
        ${Input({
          label: "New Icon",
          id: "new-icon",
          required: true,
          pattern: ".",
        })}
        <aside>
          Icons are single characters, such as an emoji or a letter. Some emoji
          may not be supported.
        </aside>
        <button class="primary">Save icon ${Spinner()}</button>
      </form>`,
    })}
    ${Modal({
      id: "change-name",
      contents: html` <form onsubmit="${updateName}">
        ${Input({
          label: "New Name",
          id: "new-name",
          required: true,
        })}
        <button class="primary">Save name ${Spinner()}</button>
      </form>`,
    })}
    ${Modal({
      id: "delete-modal",
      contents: html`Are you sure you want to delete ${orbit.name}?
        <button class="primary danger" onclick="${deleteOrbit}">
          Yes, delete ${Spinner()}
        </button>`,
    })}
    ${Modal({
      id: "add-members",
      contents: html`
        <form onsubmit="${addMembers}">
          Select friends to add:
          <ul class="user-list">
            ${friends
              .filter(
                (friend) =>
                  !orbit.members.find((el) => el.ref.id === friend.ref.id)
              )
              .map((friend) =>
                FriendSelectTemplate(friend, {
                  name: "added-members",
                  onchange: function (e) {
                    if (e.target.checked) {
                      members.add(friend.ref);
                    } else {
                      members.delete(friend.ref);
                    }
                  },
                })
              )}
          </ul>
          <button class="primary">Add members ${Spinner()}</button>
        </form>
      `,
    })}`;

  // Modals
  function showChangeIconModal() {
    document.querySelector("#change-icon").showModal();
  }

  function showChangeNameModal() {
    document.querySelector("#change-name").showModal();
  }

  function showDeleteModal() {
    document.querySelector("#delete-modal").showModal();
  }

  function showAddMemberModal() {
    document.querySelector("#add-members").showModal();
  }

  function showRemoveMemberModal(e) {
    e.preventDefault();
    e.currentTarget.parentNode.parentNode.nextSibling.showModal();
  }

  // Database
  function updateIcon(e) {
    e.preventDefault();
    e.submitter.classList.add("loading");
    const newIcon = document.querySelector("#new-icon").value;
    update(orbit.ref, { icon: newIcon });
    afterUpdate(() => renderPage(window.location.pathname));
  }

  function updateName(e) {
    e.preventDefault();
    e.submitter.classList.add("loading");
    const newName = document.querySelector("#new-name").value.trim();
    update(orbit.ref, { name: newName });
    afterUpdate(() => renderPage(window.location.pathname));
  }

  function addMembers(e) {
    e.preventDefault();
    e.submitter.classList.add("loading");
    console.log(members);
    update(orbit.ref, {
      members: push(...Array.from(members)),
    });
    afterUpdate(() => renderPage(window.location.pathname));
  }

  function removeMember(e, member) {
    e.target.classList.add("loading");
    update(orbit.ref, {
      members: pop(member),
    });
    afterUpdate(() => renderPage(window.location.pathname));
  }

  function deleteOrbit(e) {
    e.target.classList.add("loading");
    deleteDoc(orbit.ref);
    afterUpdate(() => renderPage("/contacts"));
  }

  // Templates
  function GroupTemplate(contacts, type) {
    if (contacts.length > 0) {
      return html`<ul>
        ${contacts.map(
          (contact) => html`
            <li>
              <a href="/contacts/${type}/${contact.ref.id}">
                <div class="contact-header-container">
                  ${getIcon(contact.icon)}
                  <span class="contact-name">${contact.name}</span>
                  <button
                    type="button"
                    class="flat"
                    onclick="${showRemoveMemberModal}"
                  >
                    <span class="material-symbols-sharp">remove</span>
                  </button>
                </div>
              </a>
              ${Modal({
                contents: html`<center>
                    Are you sure you want to remove <b>${contact.name}</b> from
                    <b>${orbit.name}</b>?
                  </center>
                  <button
                    class="primary danger"
                    onclick=${(e) => removeMember(e, contact.ref)}
                  >
                    Yes, delete ${Spinner()}
                  </button>`,
              })}
            </li>
          `
        )}
      </ul>`;
    } else {
      return html`<div class="empty-message">No members added</div>`;
    }
  }
}
