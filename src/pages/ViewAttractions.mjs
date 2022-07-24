import { MAPBOX_KEY } from "../services/config.mjs";
import { getCurrUserData } from "../services/firebase/db.mjs";
import { html } from "../services/render.mjs";
import { mapboxAPI } from "../services/mapbox.js";
import { setPageTitle } from "../components/AppShell.mjs";
import { AttractionsTemplate } from "../components/templates/AttractionsTemplate.mjs";
import MapIcon from "../components/MapIcon.mjs";

export default function ViewAttractions() {
  setPageTitle("Attractions");
  let { attractions, systems, friends, invitations, ...rest } =
    getCurrUserData();
  let friendInvites = [];
  let systemInvites = [];

  invitations.forEach((invite) => {
    if (invite.origin) systemInvites.push(invite);
    else friendInvites.push(invite);
  });

  loadMap();

  return html`<div class="ignore view-attractions">
    <div id="map">Loading map...</div>
    <ul class="contacts-list contacts-list">
      <li class="attractions-wrapper">
        <h2>
          <img
            src="/images/your-attractions.svg"
            alt="Your attractions icon"
            class="header-icon"
          />
          <span class="header-text">Your Attractions</span>
        </h2>
        ${AttractionsTemplate(attractions)}
      </li>
      <li class="systems-wrapper">
        <h2>
          <img
            src="/images/system.svg"
            alt="Systems icon"
            class="header-icon"
          />
          <span class="header-text">Systems</span>
        </h2>
        ${AttractionsTemplate(systemInvites)}
      </li>
      <li class="friends-wrapper">
        <h2>
          <img
            src="/images/friend.svg"
            alt="Friends icon"
            class="header-icon"
          />
          <span class="header-text">Friends</span>
        </h2>
        ${AttractionsTemplate(friendInvites)}
      </li>
    </ul>
  </div>`;

  async function loadMap() {
    const interval = setInterval(() => {
      if (document.querySelector("#map")) {
        try {
          mapboxgl.accessToken = MAPBOX_KEY;
          navigator.geolocation.getCurrentPosition((position) => {
            position = position.coords;
            const map = new mapboxgl.Map({
              container: "map",
              style: "mapbox://styles/mapbox/streets-v11",
              center: [position.longitude, position.latitude],
              zoom: 13,
            });

            invitations.forEach((invitation) =>
              mapboxAPI(invitation.location).then((location) => {
                console.log(location[0].geometry.coordinates);
                new mapboxgl.Marker(MapIcon(invitation))
                  .setLngLat(location[0].geometry.coordinates)
                  .addTo(map);
              })
            );
            const marker = new mapboxgl.Marker()
              .setLngLat([position.longitude, position.latitude])
              .addTo(map);
          });
        } catch {}
        clearInterval(interval);
      }
    }, 10);
  }
}
