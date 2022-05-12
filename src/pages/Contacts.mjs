import ContactsList from "../components/ContactsList.mjs";
import { getDocData } from "../services/firebase/db.mjs";
import { jsx } from "../services/render.mjs";

export default function Contacts() {
  return ContactsList(ContactsPageContact);
}

function ContactsPageContact(contacts) {
  const html = jsx`<ul>
  ${contacts.map(
    (contact) => jsx`
  <li>
    <div classList="contact-header-container">
      ${
        (contact.icon && contact.icon[0]) === "/"
          ? ""
          : jsx`<span
        classList="contact-icon"
        >${contact.icon || "🟣"}</span
      >`
      }
      <span classList="contact-name">${contact.name}</span>
    </div>
  </li>
  `
  )}
</ul>
`;
  return html;
}
