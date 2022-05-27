import { getIcon } from "../../services/firebase/storage.mjs";
import { jsx } from "../../services/render.mjs";
import { AttractionDetails, AttractionInfo } from "../AttractionDetails.mjs";

export function AttractionsTemplate(attractions, emptyMessage) {
  if (attractions.length > 0) {
    return jsx`<ul>
  ${attractions.map((attraction) => {
    return jsx`
  <li class="attraction">
    <h3 class="contact-header-container" onclick=${toggleAttractionDetails}>
      ${getIcon()}
      <span class="contact-name">${attraction.name}</span>
      ${AttractionInfo(attraction)}
    </h3>
    ${AttractionDetails(attraction)}
  </li>
  `;
  })}
  </ul>`;
  } else {
    return emptyMessage
      ? jsx`<div class="empty-message">${emptyMessage}</div>`
      : "";
  }
}

function toggleAttractionDetails(e) {
  let sibling = e.currentTarget.nextSibling;
  if (sibling.classList.contains("open")) {
    sibling.classList.replace("open", "transitioning");
    setTimeout(() => sibling.classList.remove("transitioning"), 250);
  } else {
    sibling.classList.add("transitioning");
    setTimeout(() => sibling.classList.replace("transitioning", "open"), 1);
  }
}
