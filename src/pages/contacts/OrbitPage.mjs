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

export default function OrbitPage(id) {
  let { friends, invitations, orbits, systems, dataDocRef } = getCurrUserData();

  // Filter imports
  orbits.forEach((orbit) =>
    console.log(id, encodeURIComponent(orbit.name), id === orbit.name)
  );
  let [orbit] = orbits.filter((orbit) => orbit.name === id);
  orbit = orbit || {};
  // invitations = invitations.filter(
  //   (invitation) => invitation.organizer.name === orbit.name
  // );
  // orbits = orbits.filter((orbit) => {
  //   return orbit.members.find((member) => member.name === orbit.name);
  // });
  // systems = systems.filter((system) => {
  //   return system.members.find((member) => member.name === orbit.name);
  // });

  // Helpers

  return jsx`<img src="${orbit.icon}" alt="${
    orbit.name
  }'s profile picture" class="pfp" />
<h2>${orbit.name}</h2>
<ul class="contacts-list">
  <li class="attractions-wrapper">
    <h2>
      ${orbit.icon}
      <span class="header-text">Attractions</span>
    </h2>
    ${AttractionsTemplate(invitations, "None")}
  </li>
</ul>
<ul class="contacts-list contacts-list">
  <li class="orbits-wrapper">
    <h2>
      <img src="/images/orbit.svg" alt="Orbits icon" class="header-icon" />
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
  contents: jsx`Are you sure you want to unfriend ${orbit.name}?
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
      friends: pop(orbit.ref),
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
