import SelectInvitees from "../components/SelectInvitees.mjs";
import TextInput from "../components/TextInput.mjs";
import { MAPBOX_KEY } from "../services/config.mjs";
import { getCurrUserData } from "../services/firebase/db.mjs";
import { html } from "../services/render.mjs";


export default function CreateAttraction() {
  let { attractions, systems, friends, ...rest } = getCurrUserData();

  return html`<div classList="ignore view-attractions">
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
      ${Template(systems)}
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
      ${Template(friends)}
    </li>
  </ul>
</div>
`;

  function Template(attractions) {
    const jsx = html`<ul></ul>`;
    attractions.forEach(async (attraction) => {
      jsx.append(html`<li>
    <h3 classList="contact-header-container">
      ${(attraction.icon && attraction.icon[0]) === "/" ? "" : html`<span classList="contact-icon">${attraction.icon || "🟣"}</span>`}
      <span classList="contact-name">${attraction.name}</span>
    </h3>
  </li>`);
    });
    return jsx;
  }
}