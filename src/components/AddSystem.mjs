import {
  addDoc,
  afterUpdate,
  getCurrUserData,
  push,
  systems,
  update,
} from "../services/firebase/db.mjs";
import { getIcon } from "../services/firebase/storage.mjs";
import { append, jsx, renderPage } from "../services/render.mjs";
import Input from "./Input.mjs";
import Modal from "./Modal.mjs";
import { FriendSelectTemplate } from "./templates/FriendSelectTemplate.mjs";

export default function AddSystem() {
  let { ref, dataDocRef } = getCurrUserData();
  let members = new Set();
  let name, icon;

  members.add(ref);

  const modal = Modal({
    contents: jsx`<form>
  <h1>Add a system</h1>
  ${Input({
    label: "Name",
    required: true,
    oninput: (e) => (name = e.target.value),
  })}
  ${Input({
    label: "Icon",
    required: true,
    pattern: ".",
    oninput: (e) => (icon = e.target.value),
  })}
  <aside>
    Icons are single characters, such as an emoji or a letter. Some emoji may not be supported.
  </aside>
  <h2>Select members</h2>
  <ul class="user-list">${getCurrUserData().friends.map((friend) =>
    FriendSelectTemplate(friend, {
      name: "added-systems",
      onchange: function (e) {
        if (e.target.checked) {
          members.add(user.ref);
        } else {
          members.delete(user.ref);
        }
      },
    })
  )}</ul>
  <button class="primary" onclick="${addSystem}">
    Add system
  </button>
</form>
`,
    id: "add-system",
  });

  return modal;

  async function addSystem(e) {
    e.preventDefault();
    let docRef = await addDoc(systems, {
      name,
      icon,
      members: Array.from(members),
    });
    await update(dataDocRef, {
      systems: push(docRef),
    });
    afterUpdate(() => renderPage(window.location.pathname));
    modal.close();
  }
}
