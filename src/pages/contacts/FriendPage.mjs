import {
  AttractionDetails,
  AttractionInfo,
} from "../../components/AttractionDetails.mjs";
import { getCurrUserData } from "../../services/firebase/db.mjs";
import { getIcon } from "../../services/firebase/storage.mjs";
import { jsx } from "../../services/render.mjs";

export default function FriendPage(id) {
  let { friends, invitations, orbits, systems } = getCurrUserData();
  let [friend] = friends.filter(
    (friend) => encodeURIComponent(friend.name) === id
  );

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
  <li class="Orbits-wrapper">
    <h2>
      <img src="/images/friend.svg" alt="Orbits icon" class="header-icon" />
      <span class="header-text">Orbits</span>
    </h2>
    ${GroupTemplate(orbits, "orbits")}
  </li>
  <li class="systems-wrapper">
    <h2>
      <img src="/images/system.svg" alt="Systems icon" class="header-icon" />
      <span class="header-text">Systems</span>
    </h2>
    ${GroupTemplate(systems, "system")}
  </li>
</ul>
`;
}

function AttractionsTemplate(attractions) {
  return jsx`<ul>
${attractions.map((attraction) => {
  return jsx`
<li class="attraction">
  <h3 class="contact-header-container" onclick=${toggleDetails}>
    ${getIcon(attraction.icon)}
    <span class="contact-name">${attraction.name}</span>
    ${AttractionInfo(attraction)}
  </h3>
  ${AttractionDetails(attraction)}
</li>
`;
})}
</ul>
`;
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
</ul>
`;
}
