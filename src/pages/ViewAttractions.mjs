import SelectInvitees from "../components/SelectInvitees.mjs";
import Input from "../components/Input.mjs";
import { MAPBOX_KEY } from "../services/config.mjs";
import { getCurrUserData } from "../services/firebase/db.mjs";
import { jsx } from "../services/render.mjs";
import { getIcon } from "../services/firebase/storage.mjs";

export default function CreateAttraction() {
  let { attractions, systems, friends, invitations, ...rest } =
    getCurrUserData();
  let friendInvites = [];
  let systemInvites = [];

  invitations.forEach((invite) => {
    if (invite.origin) systemInvites.push(invite);
    else friendInvites.push(invite);
  });

  return jsx`<div classList="ignore view-attractions">
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
  <ul classList="contacts-list contacts-list">
    <li classList="orbits-wrapper">
      <h2>
        <img src="./images/your-attractions.svg" alt="Your attractions icon" classList="header-icon" />
        <span classList="header-text">Your Attractions</span>
      </h2>
      ${Template(attractions)}
    </li>
    <li classList="systems-wrapper">
      <h2>
        <img
          src="./images/system.svg"
          alt="Systems icon"
          classList="header-icon"
        />
        <span classList="header-text">Systems</span>
      </h2>
      ${Template(systemInvites)}
    </li>
    <li classList="friends-wrapper">
      <h2>
        <img
          src="./images/friend.svg"
          alt="Friends icon"
          classList="header-icon"
        />
        <span classList="header-text">Friends</span>
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
  <li>
    <h3 classList="contact-header-container">
      ${getIcon(attraction.icon)}
      <span classList="contact-name">${attraction.name}</span>
      ${AttractionDetails(attraction)}
    </h3>
  </li>
  `;
  })}
</ul>
`;
    return html;
  }

  function AttractionDetails(attraction) {
    // Show expiration time if an invite
    if (attraction.organizer) {
      return jsx`<span classList="attraction-details">until <span classList="expiration">${attraction.expiration}</span></span>`;
    } else {
      return jsx`<span classList="attraction-details"></span>`;
    }
  }
}
