import { getIcon } from "../../services/firebase/storage.mjs";
import { jsx } from "../../services/render.mjs";
import { AttractionDetails, AttractionInfo } from "../AttractionDetails.mjs";
import Modal from "../Modal.mjs";

export function AttractionsTemplate(attractions, emptyMessage) {
  let details;
  if (attractions.length > 0) {
    details = jsx`<ul>
  ${attractions.map((attraction) => {
    return jsx`
  <li class="attraction">
    <h3 class="contact-header-container" onclick=${toggleAttractionDetails}>
      ${getIcon()}
      <span class="contact-name">${attraction.name}</span>
      ${AttractionInfo(attraction)}
    </h3>
    ${Modal({
      contents: AttractionDetails(attraction),
    })}
  </li>
  `;
  })}
  </ul>`;
  } else {
    details = emptyMessage
      ? jsx`<div class="empty-message">${emptyMessage}</div>`
      : "";
  }
  return details;

  function toggleAttractionDetails(e) {
    details.querySelector("dialog").showModal();
    //   let sibling = e.currentTarget.nextSibling;
    //   if (sibling.classList.contains("open")) {
    //     sibling.classList.replace("open", "transitioning");
    //     setTimeout(() => sibling.classList.remove("transitioning"), 250);
    //   } else {
    //     sibling.classList.add("transitioning");
    //     setTimeout(() => sibling.classList.replace("transitioning", "open"), 1);
    //   }
  }
}
