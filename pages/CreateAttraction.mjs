import SelectInvitees from "../components/SelectInvitees.mjs";
import TextInput from "../components/TextInput.mjs";
import { MAPBOX_KEY } from "../services/config.mjs";
import { html } from "../services/render.mjs";


export default function CreateAttraction() {
  return html`<div classList="ignore">
  <div id="map"></div>
  <script>
    mapboxgl.accessToken = "${MAPBOX_KEY}";
    navigator.geolocation.getCurrentPosition((position) => {
      position = position.coords;
      const map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v11",
        center: [position.longitude, position.latitude],
        zoom:13,
      });
    });
  </script>
  <form>
    ${TextInput({ label: "Event Name", id: "event-name", name: "event-name", })}
    ${TextInput({
    label: "Event Location", id: "event-location", name:
      "event-location",
  })}
    <button classList="flat" type="button">Use my location</button>
    ${SelectInvitees()}
    <button id="submit-button" classList="primary">Create attraction</button>
  </form>
</div>
`;
}
async function onMapLoad() {
  console.log(this);

};