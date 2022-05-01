import { html } from "../services/render.mjs";

export default function Contacts() {
  return html`<ul classList="contacts-list">
  <li classList="orbits-wrapper">
    <h2>Orbits</h2>
    <ul classList="orbits">
      <li>Friends</li>
      <li>Family</li>
      <li>School</li>
    </ul>
  </li>
  <li classList="friends-wrapper">
    <h2>Friends</h2>
    <ul class="friends">
      <li>John Doe</li>
      <li>Sarah Jane</li>
    </ul>
  </li>
</ul>`;
}