import { getCurrentUser } from "../services/firebase/auth.mjs";
import { getCurrUserData } from "../services/firebase/db.mjs";
import { append, jsx } from "../services/render.mjs";

export default function ContactsList(Template) {
  let { orbits, systems, friends, ...rest } = getCurrUserData();
  let page = jsx`<ul classList="contacts-list contacts-list">
  <li classList="orbits-wrapper">
    <h2>
      <img src="./images/orbit.svg" alt="Orbit icon" classList="header-icon" />
      <span classList="header-text">Orbits</span>
    </h2>
    ${Template(orbits, "orbits")}
  </li>
  <li classList="systems-wrapper">
    <h2>
      <img
        src="./images/system.svg"
        alt="Systems icon"
        classList="header-icon"
      />
      <span classList="header-text">Systems</span>
    </h2>
    ${Template(systems, "systems")}
  </li>
  <li classList="friends-wrapper">
    <h2>
      <img
        src="./images/friend.svg"
        alt="Friends icon"
        classList="header-icon"
      />
      <span classList="header-text">Friends</span>
      <button classList="header-btn">
        <span classList="material-symbols-sharp">add</span>
      </button>
    </h2>
    ${Template(friends, "friends")}
  </li>
</ul>
`;
  return page;

  function showAddFriend() {
    document.getElementById("add-friend").showModal();
  }
}
