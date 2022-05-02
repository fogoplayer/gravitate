import ContactsList from "../components/ContactsList.mjs";
import TextInput from "../components/TextInput.mjs";
import { MAPBOX_KEY } from "../services/config.mjs";
import { getDocData } from "../services/firebase/db.mjs";
import { html } from "../services/render.mjs";


export default function CreateAttraction() {
  return html`<div classList="ignore">
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
  <form onsubmit=${onSubmit}>
    ${TextInput({ label: "Event Name", id: "event-name", name: "event-name", })}
    <div classList="inline-inputs">
      ${TextInput({
    label: "Event Location", id: "event-location", name:
      "event-location",
  })}
      <button classList="flat" type="button">Use my location</button>
    </div>
    ${TextInput({
    label: "Expiration Time", id: "expiration-time", name:
      "expiration-time", type: "time"
  })}
  ${ContactsList(ContactTemplate)}
    <button id="submit-button" classList="primary">Create attraction</button>
  </form>
</div>
`;
}

async function ContactTemplate(contacts) {
  const jsx = html`<ul></ul>`;
  contacts.forEach(async (contact) => {
    if (contact.type === "document") {
      contact = await getDocData(contact);
    }
    jsx.append(html`<li>
  <label>
    <input type="checkbox" name="${contact.name}" id="${contact.name}" />
    ${(contact.icon && contact.icon[0]) === "/" ? "" : html`<span classList="contact-icon">${contact.icon || "🟣"}</span>`}
    <span classList="contact-name">${contact.name}</span>
  </label>
</li>
`);
  });
  return jsx;
}

function onSubmit(e) {
  e.preventDefault();
  console.log(e.target);
  console.log(new FormData(e.target));
}