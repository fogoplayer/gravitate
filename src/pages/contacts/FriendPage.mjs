import {
  AttractionDetails,
  AttractionInfo,
} from "../../components/AttractionDetails.mjs";
import { getCurrUserData } from "../../services/firebase/db.mjs";
import { getIcon } from "../../services/firebase/storage.mjs";
import { jsx } from "../../services/render.mjs";

export default function FriendPage(id) {
  let { friends, invitations, orbits, systems } = getCurrUserData();

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
    ${AttractionsTemplate(invitations)}
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
<button class="flat danger">Unfriend</button>`;
}

function AttractionsTemplate(attractions) {
  if (attractions.length > 0) {
    return jsx`<ul>
    ${attractions.map((attraction) => {
      return jsx`
    <li class="attraction">
      <h3 class="contact-header-container" onclick=${toggleDetails}>
        ${getIcon()}
        <span class="contact-name">${attraction.name}</span>
        ${AttractionInfo(attraction)}
      </h3>
      ${AttractionDetails(attraction)}
    </li>
    `;
    })}
    </ul>`;
  } else {
    return "None";
  }
}

function toggleDetails(e) {
  let sibling = e.currentTarget.nextSibling;
  if (sibling.classList.contains("open")) {
    sibling.classList.replace("open", "transitioning");
    setTimeout(() => sibling.classList.remove("transitioning"), 250);
  } else {
    sibling.classList.add("transitioning");
    setTimeout(() => sibling.classList.replace("transitioning", "open"), 1);
  }
}

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
