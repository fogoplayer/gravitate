import ContactsList from "../components/ContactsList.mjs";
import { getCurrentUser, getCurrUserData } from "../services/firebase.mjs";
import { html } from "../services/render.mjs";

export default async function Contacts() {
  let { orbits, systems, friends, ...rest } = await getCurrUserData(await getCurrentUser());

  return html`<ul classList="interaction-list contacts-list" >
  <li classList="orbits-wrapper">
    <h2>
      <img src="./images/orbit.svg" alt="Orbit icon" classList="header-icon" />
      <span classList="header-text">Orbits</span>
    </h2>
    ${html`${await ContactsList(orbits)}`}
  </li >
  <li classList="systems-wrapper">
    <h2>
      <img src="./images/system.svg" alt="Systems icon" classList="header-icon" />
      <span classList="header-text">Systems</span>
    </h2>
    ${html`${await ContactsList(systems)}`}
  </li>
  <li classList="friends-wrapper">
    <h2>
      <img src="./images/friend.svg" alt="Friends icon" classList="header-icon" />
      <span classList="header-text">Friends</span>
    </h2>
    ${html`${await ContactsList(friends)}`}
  </li>
</ul >
  `;

  return html`< ul classList = "interaction-list contacts-list" >
  <li classList="orbits-wrapper">
    <h2>
      <img src="./images/orbit.svg" alt="Orbit icon" classList="header-icon" />
      <span classList="header-text">Orbits</span>
    </h2>
    ${html`${await ContactsList(orbits)}`}
  </li>
  <li classList="systems-wrapper">
    <h2>
      <img src="./images/system.svg" alt="Systems icon" classList="header-icon" />
      <span classList="header-text">Systems</span>
    </h2>
    ${html`${await ContactsList(systems)}`}
    <ul classList="orbits">
      <li>Friends</li>
      <li>Family</li>
      <li>School</li>
    </ul>
  </li>
  <li classList="friends-wrapper">
    <h2>
      <img src="./images/friend.svg" alt="Friends icon" classList="header-icon" />
      <span classList="header-text">Friends</span>
    </h2>
    <ul class="friends">
      <li>John Doe</li>
      <li>Sarah Jane</li>
    </ul>
  </li>
</ul >
  `;
};;;;;;