import ContactsList from "../components/ContactsList.mjs";
import { getDocData } from "../services/firebase/db.mjs";
import { jsx } from "../services/render.mjs";

export default function Contacts() {
  return ContactsList(ContactsPageContact);
}

function ContactsPageContact(contacts) {
  const jsx = jsx`<ul></ul>`;
  contacts.forEach(async (contact) => {
    jsx.append(jsx`<li>${contact.name}</li>`);
  });
  return jsx;
}