import { getCurrentUser } from "../services/firebase/auth.mjs";
import { getCurrUserData } from "../services/firebase/db.mjs";
import { append, jsx } from "../services/render.mjs";
import AddFriend from "./AddFriend.mjs";
import AddOrbit from "./AddOrbit.mjs";
import AddSystem from "./AddSystem.mjs";

export default function ContactsList(Template) {
  let { orbits, systems, friends, ...rest } = getCurrUserData();
  let page = jsx`<ul class="contacts-list contacts-list">
  <li class="orbits-wrapper">
    <h2>
      <img src="./images/orbit.svg" alt="Orbit icon" class="header-icon" />
      <span class="header-text">Orbits</span>
      <button type="button" class="header-btn" onclick="${showAddOrbit}">
        <span class="material-symbols-sharp">add</span>
      </button>
    </h2>
    ${Template(orbits, "orbits")}
  </li>
  ${AddOrbit()}
  <li class="systems-wrapper">
    <h2>
      <img
        src="./images/system.svg"
        alt="Systems icon"
        class="header-icon"
      />
      <span class="header-text">Systems</span>
      <button type="button" class="header-btn" onclick="${showAddSystem}">
        <span class="material-symbols-sharp">add</span>
      </button>
    </h2>
    ${AddSystem()}
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
      <button type="button" class="header-btn" onclick="${showAddFriend}">
        <span class="material-symbols-sharp">add</span>
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
