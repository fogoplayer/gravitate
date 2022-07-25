import { getCurrUserData } from "../services/firebase/db.mjs";
import { html } from "../services/render.mjs";

export default function MapIcon(event) {
  const { name, icon } = getCurrUserData();
  return html`
    <div
      class="marker"
      onclick=${() => {
        document.querySelector("#" + event.ref.id + "-modal").showModal();
      }}
    >
      ${event.organizer
        ? html`<img
            class="marker-icon pfp"
            src=${event.organizer.icon}
            alt="${event.organizer.name}'s icon"
          />`
        : html`<img
            class="marker-icon pfp"
            src=${icon}
            alt="${name}'s icon"
          />`}

      <div class="marker-text">
        <h2>${event.name}</h2>
        <div>${event.location.split(",")[0]}</div>
        <div>${event.expiration.toLocaleDateString()}</div>
      </div>
    </div>
  `;
}
