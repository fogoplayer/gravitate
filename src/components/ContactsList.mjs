import { getCurrentUser } from "../services/firebase/auth.mjs";
import { getCurrUserData } from "../services/firebase/db.mjs";
import { append, html } from "../services/render.mjs";

export default function ContactsList(Template) {
  let { orbits, systems, friends, ...rest } = getCurrUserData();
  let page = html`<ul class="contacts-list contacts-list">
  <li class="orbits-wrapper">
    <h2>
      <img src="./images/orbit.svg" alt="Orbit icon" class="header-icon" />
      <span class="header-text">Orbits</span>
    </h2>
    ${Template(orbits, "orbits")}
  </li>
  <li class="systems-wrapper">
    <h2>
      <img
        src="./images/system.svg"
        alt="Systems icon"
        class="header-icon"
      />
      <span class="header-text">Systems</span>
    </h2>
    ${Template(systems, "systems")}
  </li>
  <li class="friends-wrapper">
    <h2>
      <img
        src="./images/friend.svg"
        alt="Friends icon"
        class="header-icon"
      />
      <span class="header-text">Friends</span>
    </h2>
    ${Template(friends, "friends")}
  </li>
</ul>
`;
  return page;
}
