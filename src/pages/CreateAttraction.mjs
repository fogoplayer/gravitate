import ContactsList from "../components/ContactsList.mjs";
import Input from "../components/Input.mjs";
import Spinner from "../components/Spinner.mjs";
import createAttraction from "../services/attractions.mjs";
import { MAPBOX_KEY } from "../services/config.mjs";
import { getCurrUserData } from "../services/firebase/db.mjs";
import { getDocData } from "../services/firebase/db.mjs";
import { map } from "../services/mapbox.js";
import { mapboxAPI } from "../services/mapbox.js";
import { jsx } from "../services/render.mjs";
import { Attraction } from "../services/structures.mjs";

const newAttraction = {
  orbits: new Set(),
  systems: new Set(),
  friends: new Set(),
};
let timer;

export default function CreateAttraction() {
  return jsx`<div classList="ignore">
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
    ${Input({
      label: "Event Name",
      id: "event-name",
      name: "event-name",
      required: true,
      oninput: (e) => {
        newAttraction.name = e.target.value;
      },
    })}
    <div classList="inline-inputs">
  ${Input({
    label: "Event Location",
    id: "event-location",
    name: "event-location",
    required: true,
    list: "location-options",
    oninput: (e) => {
      locationSearch(e.target.value);
      newAttraction.location = e.target.value;
    },
  })}
      <datalist id="location-options"></datalist>
      <button classList="flat inline small" onclick=${useMyLocation} type="button">Use my location</button>
    </div>
    ${Input({
      label: "Expiration Time",
      id: "expiration-time",
      name: "expiration-time",
      type: "time",
      required: true,
      oninput: (e) => (newAttraction.expiration = e.target.value),
    })}
  ${ContactsList(ContactTemplate)}
    <button id="submit-button" classList="primary">
      Create attraction
      ${Spinner()}
    </button>
  </form>
</div>
`;
}

function ContactTemplate(contacts, name) {
  const jsx = jsx`<ul></ul>`;
  contacts.forEach(async (contact) => {
    jsx.append(jsx`<li>
  <label classList="contact-header-container">
    <input type="checkbox" name="${name}" id="${contact.name}" value="${
      contact.name
    }" oninput=${onCheckboxInput} tabIndex=0/>
    ${
      (contact.icon && contact.icon[0]) === "/"
        ? ""
        : jsx`<span classList="contact-icon">${contact.icon || "🟣"}</span>`
    }
    <span classList="contact-name">${contact.name}</span>
  </label>
</li>
`);
  });
  return jsx;
}

async function useMyLocation() {
  await navigator.geolocation.getCurrentPosition(async ({ coords }) => {
    let [address] = await mapboxAPI(`${coords.longitude},${coords.latitude}`);
    document.querySelector("#event-location").value = address.place_name;
    document
      .querySelector("#event-location")
      .parentNode.parentNode.classList.add("not-empty");
    map?.panTo([coords.longitude, coords.latitude]);
  });
}

async function locationSearch(searchTerm) {
  const getAddress = async () => {
    let addresses = await mapboxAPI(searchTerm, 5);
    document.querySelector("#location-options").innerHTML = ``;
    addresses.forEach((address) => {
      document
        .querySelector("#location-options")
        .appendChild(
          jsx`<option value=${address.place_name}>${address.place_name}</option>`
        );
    });

    map?.panTo(addresses[0]?.center);
  };

  clearTimeout(timer);
  const newTimer = setTimeout(getAddress, 500);
  timer = newTimer;
}

function onCheckboxInput(e) {
  const currUserData = getCurrUserData();
  if (e.target.checked) {
    const index = currUserData[e.target.name].findIndex(
      (el) => el.name === e.target.value
    );
    newAttraction[e.target.name].add(currUserData[e.target.name][index]);
  } else {
    const index = currUserData[e.target.name].findIndex(
      (el) => el.name === e.target.value
    );
    newAttraction[e.target.name].delete(currUserData[e.target.name][index]);
  }
}

async function onSubmit(e) {
  try {
    e.preventDefault();
    e.submitter.classList.add("loading");
    await createAttraction(newAttraction);
    page("view-attractions");
  } catch (error) {}
}
