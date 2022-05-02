import SelectInvitees from "../components/SelectInvitees.mjs";
import TextInput from "../components/TextInput.mjs";
import { MAPBOX_KEY } from "../services/config.mjs";
import { html } from "../services/render.mjs";


export default function CreateAttraction() {
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
  <ul classList="contacts-list">
    <li>
      <h2><span classList="header-text">My Attractions</span></h2>
      <ul>
        <li>Library</li>
      </ul>
    </li>
    <li>
      <h2><span classList="header-text">My Invitations</span></h2>
      <ul>
        <li>Study Group | John Doe</li>
        <li>Workout | Sarah Jane</li>
        <li>Family Dinner | Family (Sarah Jane)</li>
        <li>Study Group | John Doe</li>
        <li>Workout | Sarah Jane</li>
        <li>Family Dinner | Family (Sarah Jane)</li>
        <li>Study Group | John Doe</li>
        <li>Workout | Sarah Jane</li>
        <li>Family Dinner | Family (Sarah Jane)</li>
        <li>Study Group | John Doe</li>
        <li>Workout | Sarah Jane</li>
        <li>Family Dinner | Family (Sarah Jane)</li>
        <li>Study Group | John Doe</li>
        <li>Workout | Sarah Jane</li>
        <li>Family Dinner | Family (Sarah Jane)</li>
        <li>Study Group | John Doe</li>
        <li>Workout | Sarah Jane</li>
        <li>Family Dinner | Family (Sarah Jane)</li>
        <li>Study Group | John Doe</li>
        <li>Workout | Sarah Jane</li>
        <li>Family Dinner | Family (Sarah Jane)</li>
        <li>Study Group | John Doe</li>
        <li>Workout | Sarah Jane</li>
        <li>Family Dinner | Family (Sarah Jane)</li>
      </ul>
    </li>
  </ul>
</div>
`;
}