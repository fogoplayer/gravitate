import { getDocData } from "../services/firebase.mjs";
import { html } from "../services/render.mjs";

export default async function ContactsList(contacts) {
  const jsx = (html`<ul></ul>`).cloneNode();
  contacts.forEach(async (contact) => {
    if (contact.type === "document") {
      contact = await getDocData(contact);
    }
    console.log(contact);
    jsx.append(html`<li>${contact.name}</li>`);
  });
  return jsx;
}