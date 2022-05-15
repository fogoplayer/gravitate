import { jsx } from "../services/render.mjs";
import { react } from "../services/attractions.mjs";

export const reactions = {
  "ON MY WAY": "🔜",
  "RUNNING LATE": "🕜",
  "CAN'T COME": "😢",
  "BE THERE NEXT TIME": "🗓",
  "NOT INTERESTED": "❌",
};

export function AttractionInfo(attraction) {
  // Show expiration time if an invite
  if (attraction.organizer) {
    return jsx`<span class="attraction-info">until <span class="expiration">${attraction.expiration}</span></span>`;
  } else {
    return jsx`<span class="attraction-info header-reactions">
  ${Object.keys(reactions).map(
    (reaction) =>
      jsx`<span
    class="reaction noto"
    data-value="${attraction.reactions[reaction]?.length || 0}">
      ${reactions[reaction]} 
    </span>`
  )}
</span>`;
  }
}

export function AttractionDetails(attraction) {
  // Invitation
  if (attraction.organizer) {
    return jsx`<section class="attraction-details">
<h4>RSVP</h4>
<fieldset class="react">
  <legend>RSVP</legend>
  ${Object.keys(reactions).map((reaction) => {
    return jsx`<label>
    <input type="radio" name="reactions" value="${reaction}" 
      oninput=${() => react(attraction.attractionRef, reaction)}
      ...${reaction === attraction.reaction ? { checked: true } : ""}
    />
    <span class="reaction" data-value="${reaction}"
      >${reactions[reaction]}</span
    > </label
  >`;
  })}
</fieldset>
<h4>Attraction Details</h4>
<table>
  <tr>
    <th>Organizer:</th>
    <td>${attraction.organizer.name}</td>
  </tr>
  ${
    attraction.origin
      ? jsx`
  <tr>
    <th>System:</th>
    <td>
      <span class="noto">${attraction.origin.icon}</span>
      ${" " + attraction.origin.name}
    </td>
  </tr>
  `
      : ""
  }
  <tr>
    <th>Location:</th>
    <td>
      ${attraction.location + " "}
      <a
        href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          attraction.location
        )}"
        target="_blank"
        >(Open in Google Maps)</a
      >
    </td>
  </tr>
</table>
</section>
`;
    // Attraction
  } else {
    return "";
  }
}
