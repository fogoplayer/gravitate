import ContactsList from "../components/ContactsList.mjs";
import { getDocData } from "../services/firebase/db.mjs";
import { html } from "../services/render.mjs";

export default function Contacts() {
  return ContactsList(ContactsPageContact);
}

function ContactsPageContact(contacts) {
  const jsx = html`<ul></ul>`;
  contacts.forEach(async (contact) => {
    jsx.append(html`<li>${contact.name}</li>`);
  });
  return jsx;
}