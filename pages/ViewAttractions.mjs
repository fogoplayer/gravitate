import SelectInvitees from "../components/SelectInvitees.mjs";
import TextInput from "../components/TextInput.mjs";
import { MAPBOX_KEY } from "../services/config.mjs";
import { html } from "../services/render.mjs";


export default function CreateAttraction() {
  return html`<div classList="ignore">
  <div id="map">Map goes here</div>
  <script>
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
  </script>
  <ul classList="interaction-list">
    <li>
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
async function onMapLoad() {
  console.log(this);

};