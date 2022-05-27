import {
  addDoc,
  afterUpdate,
  getCurrUserData,
  push,
  update,
  usernameSearch,
} from "../services/firebase/db.mjs";
import { getIcon } from "../services/firebase/storage.mjs";
import { append, jsx, renderPage } from "../services/render.mjs";
import Input from "./Input.mjs";
import Modal from "./Modal.mjs";
import { FriendSelectTemplate } from "./templates/FriendSelectTemplate.mjs";

export default function AddOrbit() {
  let members = new Set();
  let name, icon;

  const modal = Modal({
    contents: jsx`<form>
  <h1>Add an orbit</h1>
  ${Input({
    label: "Name",
    id: "new-orbit-name",
    required: true,
    oninput: (e) => (name = e.target.value),
  })}
  ${Input({
    label: "Icon",
    id: "new-orbit-icon",
    required: true,
    pattern: ".",
    oninput: (e) => (icon = e.target.value),
  })}
  <aside>
    Icons are single characters, such as an emoji or a letter. Some emoji may
    not be supported.
  </aside>
  <h2>Select members</h2>
  <ul id="orbit-user-list" class="user-list">${getCurrUserData().friends.map(
    (friend) =>
      FriendSelectTemplate(friend, {
        name: "added-orbits",
        onchange: function (e) {
          if (e.target.checked) {
            members.add(user.ref);
          } else {
            members.delete(user.ref);
          }
        },
      })
  )}</ul>
  <button class="primary" id="add-orbit-button" onclick="${addOrbit}">
    Add orbits
  </button>
</form>
`,
    id: "add-orbit",
  });

  return modal;

  async function addOrbit(e) {
    e.preventDefault();
    await addDoc(getCurrUserData().orbitsRef, {
      name,
      icon,
      members: Array.from(members),
    });
    afterUpdate(() => renderPage(window.location.pathname));
    modal.close();
  }
}
