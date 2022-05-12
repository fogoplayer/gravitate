import {
  getCurrUserData,
  push,
  update,
  usernameSearch,
} from "../services/firebase/db.mjs";
import { append, jsx, renderPage } from "../services/render.mjs";
import Input from "./Input.mjs";
import Modal from "./Modal.mjs";

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
  <ul id="orbit-search-results" classList="search-results">${getCurrUserData().friends.map(
    (friend) => Template(friend)
  )}</ul>
  <button classList="primary" id="add-orbit-button" onclick="${addOrbit}">
    Add orbits
  </button>
</form>
`,
    id: "add-orbit",
  });

  return modal;

  async function addOrbit(e) {
    e.preventDefault();
    console.log({ name, icon, members: Array.from(members) });
    // await update(getCurrUserData().dataDocRef, {
    //   orbits: push(...Array.from(neworbits)),
    // });
    // renderPage(window.location.pathname);
    // modal.close();
  }

  function Template(user) {
    return jsx`<li>
  <label classList="contact-header-container">
    <input
      type="checkbox"
      name="added-orbits"
      id="${user.name}"
      value="${user.ref}"
      onchange="${function (e) {
        if (e.target.checked) {
          members.add(user.ref);
        } else {
          members.delete(user.ref);
        }
      }}"
      tabindex="0"
      required
    />
    ${
      (user.icon && user.icon[0]) === "/"
        ? ""
        : jsx`<span
      classList="contact-icon"
      >${user.icon || "🟣"}</span
    >`
    }<span classList="contact-name">${user.name}</span>
  </label>
</li>`;
  }
}
