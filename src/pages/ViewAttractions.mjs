import SelectInvitees from "../components/SelectInvitees.mjs";
import Input from "../components/Input.mjs";
import { MAPBOX_KEY } from "../services/config.mjs";
import { getCurrUserData } from "../services/firebase/db.mjs";
import { jsx } from "../services/render.mjs";
import { getIcon } from "../services/firebase/storage.mjs";

const reactions = {
  "ON MY WAY": "🔜",
  "RUNNING LATE": "🕜",
  "CAN'T COME": "😢",
  "BE THERE NEXT TIME": "🗓",
  "NOT INTERESTED": "❌",
};

export default function CreateAttraction() {
  let { attractions, systems, friends, invitations, ...rest } =
    getCurrUserData();
  let friendInvites = [];
  let systemInvites = [];

  invitations.forEach((invite) => {
    if (invite.origin) systemInvites.push(invite);
    else friendInvites.push(invite);
  });

  return jsx`<div class="ignore view-attractions">
  <div id="map">Loading map...</div>
  <script>
    try{
      mapboxgl.accessToken = "${MAPBOX_KEY}";
      navigator.geolocation.getCurrentPosition((position) => {
        position = position.coords;
        const map = new mapboxgl.Map({
          container: "map",
          style: "mapbox://styles/mapbox/streets-v11",
          center: [position.longitude, position.latitude],
          zoom: 13,
        });
        const marker = new mapboxgl.Marker()
          .setLngLat([position.longitude, position.latitude])
          .addTo(map);
      });
    }catch{}
  </script>
  <ul class="contacts-list contacts-list">
    <li class="orbits-wrapper">
      <h2>
        <img src="./images/your-attractions.svg" alt="Your attractions icon" class="header-icon" />
        <span class="header-text">Your Attractions</span>
      </h2>
      ${Template(attractions)}
    </li>
    <li class="systems-wrapper">
      <h2>
        <img
          src="./images/system.svg"
          alt="Systems icon"
          class="header-icon"
        />
        <span class="header-text">Systems</span>
      </h2>
      ${Template(systemInvites)}
    </li>
    <li class="friends-wrapper">
      <h2>
        <img
          src="./images/friend.svg"
          alt="Friends icon"
          class="header-icon"
        />
        <span class="header-text">Friends</span>
      </h2>
      ${Template(friendInvites)}
    </li>
  </ul>
</div>
`;

  function Template(attractions) {
    const html = jsx`<ul>
  ${attractions.map((attraction) => {
    console.log(attraction);
    return jsx`
  <li class="attraction">
    <h3 class="contact-header-container">
      ${getIcon(attraction.icon)}
      <span class="contact-name">${attraction.name}</span>
      ${AttractionInfo(attraction)}
    </h3>
    ${AttractionDetails(attraction)}
  </li>
  `;
  })}
</ul>
`;
    return html;
  }

  function AttractionInfo(attraction) {
    // Show expiration time if an invite
    if (attraction.organizer) {
      return jsx`<span class="attraction-info">until <span class="expiration">${attraction.expiration}</span></span>`;
    } else {
      return jsx`<span class="attraction-info"></span>`;
    }
  }

  function AttractionDetails(attraction) {
    // Invitation
    if (attraction.organizer) {
      return jsx`<section class="attraction-details">
  <h4>RSVP</h4>
  <fieldset class="react">
    <legend>RSVP</legend>
    ${Object.keys(reactions).map(
      (reaction) => jsx`<label>
      <input type="radio" name="reactions" value="${reaction}" />
      <span class="reaction" data-value="${reaction}">${reactions[reaction]}</span> </label
    >`
    )}
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
}
