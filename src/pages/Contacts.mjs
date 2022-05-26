import { setPageTitle } from "../components/AppShell.mjs";
import ContactsList from "../components/ContactsList.mjs";
import { getDocData } from "../services/firebase/db.mjs";
import { getIcon } from "../services/firebase/storage.mjs";
import { jsx } from "../services/render.mjs";

export default function Contacts() {
  setPageTitle("Contacts");
  return ContactsList(ContactsPageContact);
}

function ContactsPageContact(contacts, type) {
  const html = jsx`<ul>
  ${contacts.map(
    (contact) => jsx`
  <li>
    <a href="/contacts/${type}/${contact.ref.id}">
      <div class="contact-header-container">
        ${getIcon(contact.icon)}
        <span class="contact-name">${contact.name}</span>
      </div>
    </a>
  </li>
  `
  )}
</ul>
`;
  return html;
}
