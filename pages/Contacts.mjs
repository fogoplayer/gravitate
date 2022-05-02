import ContactsList from "../components/ContactsList.mjs";
import { getCurrentUser, getCurrUserData } from "../services/firebase.mjs";
import { append, html } from "../services/render.mjs";

export default function Contacts() {
  let page = html`<ul classList="interaction-list contacts-list">
  <li classList="orbits-wrapper">
    <h2>
      <img src="./images/orbit.svg" alt="Orbit icon" classList="header-icon" />
      <span classList="header-text">Orbits</span>
    </h2>
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
  </li>
  <li classList="friends-wrapper">
    <h2>
      <img
        src="./images/friend.svg"
        alt="Friends icon"
        classList="header-icon"
      />
      <span classList="header-text">Friends</span>
    </h2>
  </li>
</ul>
`;
  console.log(page);
  populate(page);
  return page;
}

async function populate(page) {
  console.log(page);
  let { orbits, systems, friends, ...rest } = await getCurrUserData(await getCurrentUser());
  ContactsList(orbits).then(contactsList => append(page.querySelector(".orbits-wrapper"), contactsList));
  ContactsList(systems).then(contactsList => append(page.querySelector(".systems-wrapper"), contactsList));
  ContactsList(friends).then(contactsList => append(page.querySelector(".friends-wrapper"), contactsList));
}