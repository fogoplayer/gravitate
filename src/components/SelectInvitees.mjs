import { html } from "../services/render.mjs";


export default function SelectInvitees() {
  return html`<ul classList="contacts-list select-invitees">
  <li classList="orbits-wrapper">
    <h2>
      <img src="./images/orbit.svg" alt="Orbit icon" classList="header-icon" />
      <span classList="header-text">Orbits</span>
    </h2>
    <ul classList="orbits">
      <li>Friends</li>
      <li>Family</li>
      <li>School</li>
    </ul>
  </li>
  <li classList="systems-wrapper">
    <h2>
      <img src="./images/system.svg" alt="Systems icon" classList="header-icon" />
      <span classList="header-text">Systems</span>
    </h2>
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
</ul>
`;
}