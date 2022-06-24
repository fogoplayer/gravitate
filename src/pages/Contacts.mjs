import { setPageTitle } from "../components/AppShell.mjs";
import ContactsList from "../components/ContactsList.mjs";
import Modal from "../components/Modal.mjs";
import {
  getCurrUserData,
  getDocData,
  push,
  update,
} from "../services/firebase/db.mjs";
import { getIcon } from "../services/firebase/storage.mjs";
import { append, jsx, renderPage } from "../services/render.mjs";

export default function Contacts(context) {
  setPageTitle("Contacts");
  if (context?.params?.code) showJoin(context);
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

async function showJoin(context) {
  const { type, id, code } = context.params;
  const { ref, dataDocRef } = getCurrUserData();
  try {
    // Add to member list. Error if code matches
    await update(type + "/" + id, {
      code,
      members: push(ref),
    });

    // Add system to profile
    const system = await getDocData(type + "/" + id);
    update(dataDocRef, {
      systems: push(system.ref),
    });

    // Remove one-time codes
    if (system.codeMultiUse === false) {
      update(type + "/" + id, {
        code: "",
      });
    }

    // Notify user
    const modal = Modal({
      contents: jsx`<h2>You joined <b>${system.name}</b></h2>
<button class="primary" onclick=${(e) => {
        e.target.closest("dialog").close();
      }}>Ok</button>`,
      onclose: () => renderPage("/contacts"),
    });
    append(document.body, modal);
    modal.showModal();
  } catch (e) {
    // Notify user
    const modal = Modal({
      contents: jsx`<h2>Unable to join system. Please try again.</h2>
  <button class="primary" onclick=${(e) => {
    e.target.closest("dialog").close();
  }}>Ok</button>`,
      onclose: () => renderPage("/contacts"),
    });
    append(document.body, modal);
    modal.showModal();
  }
}
