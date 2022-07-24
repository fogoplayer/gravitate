import { html } from "../services/render.mjs";

export default function SelectInvitees() {
  return html`<ul class="contacts-list select-invitees">
    <li class="orbits-wrapper">
      <h2>
        <img src="./images/orbit.svg" alt="Orbit icon" class="header-icon" />
        <span class="header-text">Orbits</span>
      </h2>
      <ul class="orbits">
        <li>Friends</li>
        <li>Family</li>
        <li>School</li>
      </ul>
    </li>
    <li class="systems-wrapper">
      <h2>
        <img src="./images/system.svg" alt="Systems icon" class="header-icon" />
        <span class="header-text">Systems</span>
      </h2>
      <ul class="orbits">
        <li>Friends</li>
        <li>Family</li>
        <li>School</li>
      </ul>
    </li>
    <li class="friends-wrapper">
      <h2>
        <img src="./images/friend.svg" alt="Friends icon" class="header-icon" />
        <span class="header-text">Friends</span>
      </h2>
      <ul class="friends">
        <li>John Doe</li>
        <li>Sarah Jane</li>
      </ul>
    </li>
  </ul>`;
}
