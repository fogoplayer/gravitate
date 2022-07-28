import { html } from "../services/render.mjs";

export default function AttractionDetails(attraction, reactions) {
  return html`<section class="attraction-details">
    <h4>Attraction Details</h4>
    <table>
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
      <tr>
        <th>Expiration:</th>
        <td>
          ${attraction.expiration?.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </td>
      </tr>
    </table>
    <h4>Invited</h4>
    <table>
      <tr>
        <th>Orbits:</th>
        <td>
          ${(attraction.orbits?.length &&
            attraction.orbits.map(
              (orbit, index) => (index > 0 ? ", " : "") + orbit.name
            )) ||
          html`<i>None</i>`}
        </td>
      </tr>
      <tr>
        <th>Systems:</th>
        <td>
          ${(attraction.systems?.length &&
            attraction.systems.map(
              (system, index) => (index > 0 ? ", " : "") + system.name
            )) ||
          html`<i>None</i>`}
        </td>
      </tr>
      <tr>
        <th>Friends:</th>
        <td>
          ${(attraction.friends?.length &&
            attraction.friends.map(
              (friend, index) => (index > 0 ? ", " : "") + friend.name
            )) ||
          html`<i>None</i>`}
        </td>
      </tr>
      <tr>
        <th>All invitees:</th>
        <td>
          ${attraction.guestList?.map(
            (guest, index) => (index > 0 ? ", " : "") + guest.name
          )}
        </td>
      </tr>
    </table>
    <h4>Responses</h4>
    <table>
      ${Object.keys(reactions).map((reaction) => {
        return (
          (attraction.reactions[reaction] &&
            html`<tr>
              <th>
                <span class="reaction noto"> ${reactions[reaction]} </span>
              </th>
              <td>
                ${attraction.reactions[reaction]?.map(
                  (reactee, index) => (index > 0 ? ", " : "") + reactee.name
                )}
              </td>
            </tr>`) ||
          ""
        );
      })}
    </table>
    <div class="inline-inputs">
      <button
        class="primary"
        onclick="${(e) => e.target.closest("dialog").close()}"
      >
        Close
      </button>
      <button class="outline danger">Delete</button>
    </div>
  </section>`;
}
