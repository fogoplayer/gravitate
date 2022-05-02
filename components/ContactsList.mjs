import { html } from "../services/render.mjs";

export default function ContactsList(contacts) {
  const jsx = (html`<ul></ul>`).cloneNode();
  contacts.forEach(contact => jsx.append(html`<li>${contact.name}</li>`));
  return jsx;
}