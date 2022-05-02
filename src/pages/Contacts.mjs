import ContactsList from "../components/ContactsList.mjs";
import { getDocData } from "../services/firebase/db.mjs";
import { html } from "../services/render.mjs";

export default function Contacts() {
  return ContactsList(Contact);
}

async function Contact(contacts) {
  const jsx = html`<ul></ul>`;
  contacts.forEach(async (contact) => {
    if (contact.type === "document") {
      contact = await getDocData(contact);
    }
    console.log(contact);
    jsx.append(html`<li>${contact.name}</li>`);
  });
  return jsx;
}