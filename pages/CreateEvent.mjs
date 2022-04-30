import { html } from "../services/render.mjs";

export default function CreateEvent() {
  return html`<form>
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