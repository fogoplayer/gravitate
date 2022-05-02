import { html } from "../services/render.mjs";

export default function ContactsList(contacts) {
  const jsx = html`<ul></ul>`;
  contacts.forEach(contact => jsx.append(html`<li>${contact.name}</li>`));
  console.log(jsx);
  return jsx;
}