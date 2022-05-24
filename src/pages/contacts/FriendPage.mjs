import {
  AttractionDetails,
  AttractionInfo,
} from "../../components/AttractionDetails.mjs";
import Modal from "../../components/Modal.mjs";
import { AttractionsTemplate } from "../../components/templates/AttractionsTemplate.mjs";
import {
  afterUpdate,
  getCurrUserData,
  pop,
  update,
} from "../../services/firebase/db.mjs";
import { getIcon } from "../../services/firebase/storage.mjs";
import { jsx, renderPage } from "../../services/render.mjs";

export default function FriendPage(id) {
  let { friends, invitations, orbits, systems, dataDocRef } = getCurrUserData();

  // Filter imports
  let [friend] = friends.filter(
    (friend) => encodeURIComponent(friend.name) === id
  );
  invitations = invitations.filter(
    (invitation) => invitation.organizer.name === friend.name
  );
  orbits = orbits.filter((orbit) => {
    return orbit.members.find((member) => member.name === friend.name);
  });
  systems = systems.filter((system) => {
    return system.members.find((member) => member.name === friend.name);
  });

  // Helpers

  return jsx`<img src="${friend.icon}" alt="${
    friend.name
  }'s profile picture" class="pfp" />
<h2>${friend.name}</h2>
<ul class="contacts-list">
  <li class="attractions-wrapper">
    <h2>
      <img
        src="/images/your-attractions.svg"
        alt="Attractions icon"
        class="header-icon"
      />
      <span class="header-text">Attractions</span>
    </h2>
    ${AttractionsTemplate(invitations, "None")}
  </li>
</ul>
<ul class="contacts-list contacts-list">
  <li class="orbits-wrapper">
    <h2>
      <img src="/images/friend.svg" alt="Orbits icon" class="header-icon" />
      <span class="header-text">Orbits</span>
    </h2>
    ${GroupTemplate(orbits, "orbits")}
  </li>
  <li class="systems-wrapper">
    <h2>
      <img src="/images/system.svg" alt="Systems icon" class="header-icon" />
      <span class="header-text">Mutual Systems</span>
    </h2>
    ${GroupTemplate(systems, "systems")}
  </li>
</ul>
<button class="flat danger" onclick=${showUnfriendModal}>Unfriend</button>
${Modal({
  contents: jsx`Are you sure you want to unfriend ${friend.name}?
  <button class="primary danger" onclick=${unfriend}>Yes, unfriend</button>
`,
  id: "unfriend-confirm",
})}`;

  // Helpers
  function showUnfriendModal() {
    document.querySelector("#unfriend-confirm").showModal();
  }

  function unfriend() {
    update(dataDocRef, {
      friends: pop(friend.ref),
    });
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
