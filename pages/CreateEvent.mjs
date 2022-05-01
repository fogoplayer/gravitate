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
  <button classList="flat small" type="button">Use my location</button>
  ${SelectInvitees()}
  <button classList="primary">Create event</button>
</form >
  `;
}

function SelectInvitees() {
  return html`<ul>Invitee selection here</ul>`;
};