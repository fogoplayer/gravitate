import { html } from "../services/render.mjs";

export default function MapIcon(event) {
  console.log(event.expiration.toLocaleDateString().split(",")[0]);
  return html`
    <div class="marker">
      <img
        class="marker-icon pfp"
        src=${event.organizer.icon}
        alt="${event.organizer.name}'s icon"
      />
      <div class="marker-text">
        <h2>${event.name}</h2>
        <div>${event.location.split(",")[0]}</div>
        <div>${event.expiration.toLocaleDateString()}</div>
      </div>
    </div>
  `;
}
