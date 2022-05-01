import TextInput from "../components/TextInput.mjs";
import { html } from "../services/render.mjs";

export default function CreateEvent() {
  return html`<form>
  ${TextInput({
    label: "Event Name",
    id: "event-name",
    name: "event-name",
  })}
  <label
    >Event name <input type="text" name="event-name" id="event-name"
  /></label>
  <label
    >Event location <input type="text" name="event-address" id="event-address"
  /></label>
  <button>Use my location</button>
  ${SelectInvitees()}
</form>
`;
}

function SelectInvitees() {
  return html`<input/>`;
};;