import ContactsList from "../components/ContactsList.mjs";
import { getDocData } from "../services/firebase/db.mjs";
import { jsx } from "../services/render.mjs";

export default function Contacts() {
  return ContactsList(ContactsPageContact);
}

function ContactsPageContact(contacts) {
  const html = jsx`<ul>${contacts.map(
    (contact) => jsx`<li>${contact.name}</li>`
  )}</ul>`;
  return html;
}
