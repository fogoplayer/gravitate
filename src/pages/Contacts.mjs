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
  let joining;

  try {
    switch (type) {
      case "systems":
        // Add to member list. Error if code doesn't match
        await update(type + "/" + id, {
          code,
          members: push(ref),
        });

        // Add system to profile
        joining = await getDocData(type + "/" + id);
        update(dataDocRef, {
          systems: push(joining.ref),
        });

        // Remove one-time codes
        if (joining.codeMultiUse === false) {
          update(type + "/" + id, {
            code: "",
          });
        }
        break;

      case "users":
        // Check that code matches
        await update(type + "/" + id + "/data/code", {
          code: code,
        });

        // Not adding the recipient as the link owner's friend

        // Add link owner as friend
        joining = await getDocData(type + "/" + id);
        update(dataDocRef, {
          friends: push(joining.ref),
        });

        // Codes can only be multi-use
        break;

      default:
        throw new Error();
        break;
    }

    // Display confirmation
    const modal = Modal({
      contents: jsx`<h2>You ${type === "systems" ? "joined" : "added"} <b>${
        joining.name
      }</b> ${type === "systems" ? "" : "as a friend"}</h2>
<button class="primary" onclick=${(e) => {
        e.target.closest("dialog").close();
      }}>Ok</button>`,
      onclose: () => renderPage("/contacts"),
    });
    append(document.body, modal);
    modal.showModal();
  } catch (e) {
    console.error(e);

    // Error message
    const modal = Modal({
      contents: jsx`<h2>Unable to ${
        type === "systems" ? "join system" : "add friend"
      }. Please try again.</h2>
  <button class="primary" onclick=${(e) => {
    e.target.closest("dialog").close();
  }}>Ok</button>`,
      onclose: () => renderPage("/contacts"),
    });
    append(document.body, modal);
    modal.showModal();
  }
}
