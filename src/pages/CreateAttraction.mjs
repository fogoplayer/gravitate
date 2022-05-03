import ContactsList from "../components/ContactsList.mjs";
import TextInput from "../components/TextInput.mjs";
import createAttraction from "../services/attractions.mjs";
import { MAPBOX_KEY } from "../services/config.mjs";
import { getCurrUserData } from "../services/firebase/db.mjs";
import { getDocData } from "../services/firebase/db.mjs";
import { html } from "../services/render.mjs";
import { Attraction } from "../services/structures.mjs";

const newAttraction = { orbits: new Set(), systems: new Set(), friends: new Set() };

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
          interactive:false,
        });
        const marker = new mapboxgl.Marker()
          .setLngLat([position.longitude, position.latitude])
          .addTo(map);
      });
    }catch{}
  </script>
  <form onsubmit=${onSubmit}>
    ${TextInput({
    label: "Event Name",
    id: "event-name",
    name: "event-name",
    required: true,
    value: "Lorem",
    oninput: (e) => { newAttraction.name = e.target.value; },
  })}
    <div classList="inline-inputs">
      ${TextInput({
    label: "Event Location",
    id: "event-location",
    name: "event-location",
    required: true,
    value: "Ipsum", // TODO remove
    oninput: (e) => newAttraction.location = e.target.value
  })}
      <button classList="flat inline small" type="button">Use my location</button>
    </div>
    ${TextInput({
    label: "Expiration Time",
    id: "expiration-time",
    name: "expiration-time",
    type: "time",
    required: true,
    value: "12:45", // TODO remove
    oninput: (e) => newAttraction.expiration = e.target.value
  })}
  ${ContactsList(ContactTemplate)}
    <button id="submit-button" classList="primary">Create attraction</button>
  </form>
</div>
`;
}

function ContactTemplate(contacts, name) {
  const jsx = html`<ul></ul>`;
  contacts.forEach(async (contact) => {
    jsx.append(html`<li>
  <label>
    <input type="checkbox" name="${name}" id="${contact.name}" value="${contact.name}" oninput=${onCheckboxInput} tabIndex=0/>
    ${(contact.icon && contact.icon[0]) === "/" ? "" : html`<span classList="contact-icon">${contact.icon || "🟣"}</span>`}
    <span classList="contact-name">${contact.name}</span>
  </label>
</li>
`);
  });
  return jsx;
}

function onCheckboxInput(e) {
  const currUserData = getCurrUserData();
  if (e.target.checked) {
    const index = currUserData[e.target.name].findIndex(el => (el.name === e.target.value));
    newAttraction[e.target.name].add(currUserData[e.target.name][index]);
  } else {
    const index = currUserData[e.target.name].findIndex(el => (el.name === e.target.value));
    newAttraction[e.target.name].delete(currUserData[e.target.name][index]);
  }
}

function onSubmit(e) {
  e.preventDefault();
  createAttraction(newAttraction);
}