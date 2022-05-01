import SelectInvitees from "../components/SelectInvitees.mjs";
import TextInput from "../components/TextInput.mjs";
import { html } from "../services/render.mjs";

export default function CreateEvent() {
  return html`<form>
  ${TextInput({
    label: "Event Name",
    id: "event-name",
    name: "event-name",
  })}
  ${TextInput({
    label: "Event Location",
    id: "event-location",
    name: "event-location",
  })}
  <button classList="flat" type="button">Use my location</button>
  ${SelectInvitees()}
  <button id="submit-button" classList="primary">Create attraction</button>
</form >
  `;
}