import { html } from "../services/render.mjs";
import { InvitationDetails } from "./InvitationDetails.mjs";
import AttractionDetails from "./AttractionDetails.mjs";

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
    return html`<span class="attraction-info">
      until
      <span class="expiration"
        >${attraction.expiration.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}</span
      ></span
    >`;
  } else {
    return html`<span class="attraction-info header-reactions">
      ${Object.keys(reactions).map(
        (reaction) =>
          html`<span
            class="reaction noto"
            data-value="${attraction.reactions[reaction]?.length || 0}"
          >
            ${reactions[reaction]}
          </span>`
      )}
    </span>`;
  }
}

export function EventDetails(attraction) {
  if (attraction.organizer) {
    return InvitationDetails(attraction, reactions);
  } else {
    return AttractionDetails(attraction, reactions);
  }
}
