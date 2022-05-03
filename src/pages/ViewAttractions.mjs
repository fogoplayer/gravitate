import SelectInvitees from "../components/SelectInvitees.mjs";
import TextInput from "../components/TextInput.mjs";
import { MAPBOX_KEY } from "../services/config.mjs";
import { getCurrUserData } from "../services/firebase/db.mjs";
import { html } from "../services/render.mjs";


export default function CreateAttraction() {
  let { attractions, systems, friends, ...rest } = getCurrUserData();

  return html`<div class="ignore view-attractions">
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
      ${Template(systems)}
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
      ${Template(friends)}
    </li>
  </ul>
</div>
`;

  function Template(attractions) {
    const jsx = html`<ul></ul>`;
    attractions.forEach(async (attraction) => {
      console.log(attraction);
      jsx.append(html`<li>
    <h3 class="contact-header-container">
      ${(attraction.icon && attraction.icon[0]) === "/" ? "" : html`<span class="contact-icon">${attraction.icon || "🟣"}</span>`}
      <span class="contact-name">${attraction.name}</span>
    </h3>
  </li>`);
    });
    return jsx;
  }
}