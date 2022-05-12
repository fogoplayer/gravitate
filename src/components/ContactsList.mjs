import { getCurrentUser } from "../services/firebase/auth.mjs";
import { getCurrUserData } from "../services/firebase/db.mjs";
import { append, jsx } from "../services/render.mjs";
import AddFriend from "./AddFriend.mjs";
import AddOrbit from "./AddOrbit.mjs";
import AddSystem from "./AddSystem.mjs";

export default function ContactsList(Template) {
  let { orbits, systems, friends, ...rest } = getCurrUserData();
  let page = jsx`<ul classList="contacts-list contacts-list">
  <li classList="orbits-wrapper">
    <h2>
      <img src="./images/orbit.svg" alt="Orbit icon" classList="header-icon" />
      <span classList="header-text">Orbits</span>
      <button classList="header-btn" onclick="${showAddOrbit}">
        <span classList="material-symbols-sharp">add</span>
      </button>
    </h2>
    ${Template(orbits, "orbits")}
  </li>
  ${AddOrbit()}
  <li classList="systems-wrapper">
    <h2>
      <img
        src="./images/system.svg"
        alt="Systems icon"
        classList="header-icon"
      />
      <span classList="header-text">Systems</span>
      <button classList="header-btn" onclick="${showAddSystem}">
        <span classList="material-symbols-sharp">add</span>
      </button>
    </h2>
    ${AddSystem()}
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
      <button classList="header-btn" onclick="${showAddFriend}">
        <span classList="material-symbols-sharp">add</span>
      </button>
    </h2>
    ${AddFriend()} ${Template(friends, "friends")}
  </li>
</ul>
`;
  return page;

  function showAddFriend() {
    document.querySelector("#add-friend").showModal();
  }

  function showAddOrbit() {
    document.querySelector("#add-orbit").showModal();
  }

  function showAddSystem() {
    document.querySelector("#add-system").showModal();
  }
}
