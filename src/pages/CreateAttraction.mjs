import { setPageTitle } from "../components/AppShell.mjs";
import ContactsList from "../components/ContactsList.mjs";
import Input from "../components/Input.mjs";
import Spinner from "../components/Spinner.mjs";
import createAttraction from "../services/attractions.mjs";
import { MAPBOX_KEY } from "../services/config.mjs";
import { getExpirationDate } from "../services/date.mjs";
import { getCurrUserData } from "../services/firebase/db.mjs";
import { afterUpdate } from "../services/firebase/db.mjs";
import { getIcon } from "../services/firebase/storage.mjs";
import { map } from "../services/mapbox.js";
import { mapboxAPI } from "../services/mapbox.js";
import { html, renderPage } from "../services/render.mjs";

export default function CreateAttraction() {
  setPageTitle("Create");
  const newAttraction = {
    orbits: new Set(),
    systems: new Set(),
    friends: new Set(),
  };

  let timer;
  loadMap();

  return html`<div class="ignore">
    <div id="map">Loading map...</div>
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
      <div class="inline-inputs">
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
        <button
          class="flat inline small"
          onclick=${useMyLocation}
          type="button"
        >
          Use my location
        </button>
      </div>
      ${Input({
        label: "Expiration Time",
        id: "expiration-time",
        name: "expiration-time",
        type: "time",
        required: true,
        oninput: (e) =>
          (newAttraction.expiration = getExpirationDate(e.target.value)),
      })}
      ${ContactsList(ContactTemplate)}
      <button id="submit-button" class="primary">
        Create attraction ${Spinner()}
      </button>
    </form>
  </div>`;
  function ContactTemplate(contacts, name) {
    const el = html`<ul></ul>`;
    contacts.forEach(async (contact) => {
      el.append(html`<li>
        <label class="contact-header-container">
          <input
            type="checkbox"
            name="${name}"
            id="${contact.name}"
            value="${contact.name}"
            oninput=${onCheckboxInput}
            tabindex="0"
          />
          ${getIcon(contact.icon)}
          <span class="contact-name">${contact.name}</span>
        </label>
      </li>`);
    });
    return el;
  }

  async function useMyLocation() {
    await navigator.geolocation.getCurrentPosition(async ({ coords }) => {
      let [address] = await mapboxAPI(`${coords.longitude},${coords.latitude}`);
      document.querySelector("#event-location").value = address.place_name;
      document
        .querySelector("#event-location")
        .parentNode.parentNode.classList.add("not-empty");
      map?.panTo([coords.longitude, coords.latitude]);

      newAttraction.location = address.place_name;
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
            html`<option value=${address.place_name}>
              ${address.place_name}
            </option>`
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
      afterUpdate(() => renderPage("/view-attractions"));
      await createAttraction(newAttraction);
    } catch (error) {
      console.error(error);
    }
  }

  async function loadMap() {
    const interval = setInterval(() => {
      if (document.querySelector("#map")) {
        try {
          mapboxgl.accessToken = MAPBOX_KEY;
          navigator.geolocation.getCurrentPosition((position) => {
            position = position.coords;
            const map = new mapboxgl.Map({
              container: "map",
              style: "mapbox://styles/mapbox/streets-v11",
              center: [position.longitude, position.latitude],
              zoom: 13,
              interactive: false,
            });
            const marker = new mapboxgl.Marker(getIcon(getCurrUserData().icon))
              .setLngLat([position.longitude, position.latitude])
              .addTo(map);
            globalSetMap(map);
          });
        } catch {}
        clearInterval(interval);
      }
    }, 10);
  }
}
