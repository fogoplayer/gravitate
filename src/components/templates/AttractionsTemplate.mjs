import { getIcon } from "../../services/firebase/storage.mjs";
import { html } from "../../services/render.mjs";
import { EventDetails, AttractionInfo } from "../EventDetails.mjs";
import Modal from "../Modal.mjs";

export function AttractionsTemplate(attractions, emptyMessage) {
  let details;
  if (attractions.length > 0) {
    details = html`<ul>
      ${attractions.map((attraction) => {
        return html`
          <li class="attraction">
            <h3
              class="contact-header-container"
              onclick=${toggleAttractionDetails}
            >
              <div class="contact-icon">${getIcon()}</div>
              <span class="contact-name">${attraction.name}</span>
              ${AttractionInfo(attraction)}
            </h3>
            ${Modal({
              id: attraction.ref.id + "-modal",
              contents: EventDetails(attraction),
            })}
          </li>
        `;
      })}
    </ul>`;
  } else {
    details = emptyMessage
      ? html`<div class="empty-message">${emptyMessage}</div>`
      : "";
  }
  return details;

  function toggleAttractionDetails() {
    details.querySelector("dialog").showModal();
  }
}
