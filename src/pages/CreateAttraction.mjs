import ContactsList from "../components/ContactsList.mjs";
import TextInput from "../components/TextInput.mjs";
import createAttraction from "../services/attractions.mjs";
import { MAPBOX_KEY } from "../services/config.mjs";
import { getCurrUserData } from "../services/firebase/db.mjs";
import { getDocData } from "../services/firebase/db.mjs";
import { map } from "../services/mapbox.js";
import { mapboxAPI } from "../services/mapbox.js";
import { html } from "../services/render.mjs";
import { Attraction } from "../services/structures.mjs";

const newAttraction = { orbits: new Set(), systems: new Set(), friends: new Set() };
let timer;

export default function CreateAttraction() {
  return html`<div class="ignore">
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
        globalSetMap(map)
      });
    }catch{}
  </script>
  <form onsubmit=${onSubmit}>
    ${TextInput({
    label: "Event Name",
    id: "event-name",
    name: "event-name",
    required: true,
    oninput: (e) => { newAttraction.name = e.target.value; },
  })}
    <div class="inline-inputs">
      ${TextInput({
    label: "Event Location",
    id: "event-location",
    name: "event-location",
    required: true,
    list: "location-options",
    oninput: (e) => {
      // locationSearch(e.target.value);
      newAttraction.location = e.target.value;
      navigator.geolocation.getCurrentPosition(async ({ coords }) => {
        map?.panTo([coords.longitude, coords.latitude]);
      }
      );
    }
  })}
    <datalist id="location-options"></datalist>
    <button class="flat inline small" type="button" onclick=${useMyLocation}>Use my location</button>
  </div>
  ${TextInput({
    label: "Expiration Time",
    id: "expiration-time",
    name: "expiration-time",
    type: "time",
    required: true,
    oninput: (e) => { newAttraction.expiration = e.target.value; }
  })}
  ${ContactsList(ContactTemplate)}
    <button id="submit-button" class="primary">Create attraction</button>
  </form>
</div>
`;
}

function ContactTemplate(contacts, name) {
  const jsx = html`<ul></ul>`;
  contacts.forEach(async (contact) => {
    jsx.append(html`<li>
  <label class="contact-header-container">
    <input type="checkbox" name="${name}" id="${contact.name}" value="${contact.name}" oninput=${onCheckboxInput} tabIndex=0/>
    ${(contact.icon && contact.icon[0]) === "/" ? "" : html`<span class="contact-icon">${contact.icon || "🟣"}</span>`}
    <span class="contact-name">${contact.name}</span>
  </label>
</li>
`);
  });
  return jsx;
}

async function useMyLocation() {
  const getAddress = async () => {
    await navigator.geolocation.getCurrentPosition(async ({ coords }) => {
      let [address] = await mapboxAPI(`${coords.longitude},${coords.latitude}`);
      document.querySelector("#event-location").value = address.place_name;
    });
  };

  clearTimeout(timer);
  const newTimer = setTimeout(getAddress, 500);
  timer = newTimer;
}

async function locationSearch(searchTerm) {
  const getAddress = async () => {
    let addresses = await mapboxAPI(encodeURIComponent(searchTerm), 5);
    // document.querySelector("#location-options").append(
    //   addresses.map(address =>
    //     html`<option value=${address.place_name}>${address.place_name}</option>`
    //   ));
    console.log(addresses);
    console.log(map);
  };

  clearTimeout(timer);
  const newTimer = setTimeout(getAddress, 500);
  timer = newTimer;
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
};