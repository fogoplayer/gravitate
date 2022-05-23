import SelectInvitees from "../components/SelectInvitees.mjs";
import Input from "../components/Input.mjs";
import { MAPBOX_KEY } from "../services/config.mjs";
import { getCurrUserData } from "../services/firebase/db.mjs";
import { jsx } from "../services/render.mjs";
import { getIcon } from "../services/firebase/storage.mjs";
import {
  AttractionDetails,
  AttractionInfo,
} from "../components/AttractionDetails.mjs";
import { setPageTitle } from "../components/AppShell.mjs";

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
        <img src="/images/your-attractions.svg" alt="Your attractions icon" class="header-icon" />
        <span class="header-text">Your Attractions</span>
      </h2>
      ${Template(attractions)}
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
      ${Template(systemInvites)}
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
      ${Template(friendInvites)}
    </li>
  </ul>
</div>
`;

  function Template(attractions) {
    const html = jsx`<ul>
  ${attractions.map((attraction) => {
    return jsx`
  <li class="attraction">
    <h3 class="contact-header-container" onclick=${toggleDetails}>
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

  function toggleDetails(e) {
    let sibling = e.currentTarget.nextSibling;
    if (sibling.classList.contains("open")) {
      sibling.classList.replace("open", "transitioning");
      setTimeout(() => sibling.classList.remove("transitioning"), 250);
    } else {
      sibling.classList.add("transitioning");
      setTimeout(() => sibling.classList.replace("transitioning", "open"), 1);
    }
  }
}
