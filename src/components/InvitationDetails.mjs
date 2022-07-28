import { html } from "../services/render.mjs";
import { react } from "../services/attractions.mjs";

export function InvitationDetails(attraction, reactions) {
  return html`<section class="attraction-details">
    <h4>RSVP</h4>
    <fieldset class="react">
      <legend>RSVP</legend>
      ${Object.keys(reactions).map((reaction) => {
        return html`<label>
          <input
            type="radio"
            name="reactions"
            value="${reaction}"
            oninput=${() => react(attraction.attractionRef, reaction)}
            ...${reaction === attraction.reaction ? { checked: true } : ""}
          />
          <span class="reaction" data-value="${reaction}"
            >${reactions[reaction]}</span
          >
        </label>`;
      })}
    </fieldset>
    <h4>Attraction Details</h4>
    <table>
      <tr>
        <th>Organizer:</th>
        <td>${attraction.organizer.name}</td>
      </tr>
      ${attraction.origin
        ? html`
            <tr>
              <th>System:</th>
              <td>
                <span class="noto">${attraction.origin.icon}</span>
                ${" " + attraction.origin.name}
              </td>
            </tr>
          `
        : ""}
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
    <button
      class="primary"
      onclick="${(e) => e.target.closest("dialog").close()}"
    >
      Close
    </button>
  </section>`;
}
