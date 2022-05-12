import {
  getCurrUserData,
  push,
  update,
  usernameSearch,
} from "../services/firebase/db.mjs";
import { append, jsx, renderPage } from "../services/render.mjs";
import Input from "./Input.mjs";
import Modal from "./Modal.mjs";

export default function AddFriend() {
  let searchValue;
  let newFriends = new Set();

  const modal = Modal({
    contents: jsx`<form>
  <h1>Add a Friend</h1>
  <div classList="inline-inputs">
    ${Input({
      label: "Username",
      oninput: (e) => (searchValue = e.target.value),
      required: true,
    })}
    <button classList="flat inline" onclick="${searchForFriends}">
      <span classList="material-symbols-sharp">search</span>
    </button>
  </div>
</form>
<aside>
  You need to know a user's precise username to add them as a friend. If you
  don't know their username, ask them to send you a share code.
</aside>
<form id="friend-user-list-container" classList="user-list empty">
  <ul id="friend-user-list" classList="user-list"></ul>
  <button classList="primary" id="add-friends" onclick=${addFriends}>Add friends</button>
</form>
`,
    id: "add-friend",
  });

  return modal;

  async function searchForFriends(e) {
    e.preventDefault();

    let users = await usernameSearch(searchValue);

    let options = users.map((user) => {
      return Template(user);
    });
    append(document.querySelector("#friend-user-list"), options);
    document
      .querySelector("#friend-user-list-container")
      .classList.remove("empty");
  }

  async function addFriends(e) {
    e.preventDefault();
    await update(getCurrUserData().dataDocRef, {
      friends: push(...Array.from(newFriends)),
    });
    renderPage(window.location.pathname);
    modal.close();
  }

  function Template(user) {
    return jsx`<li>
  <label classList="contact-header-container">
    <input
      type="checkbox"
      name="added-friends"
      id="${user.name}"
      value="${user.ref}"
      onchange="${function (e) {
        if (e.target.checked) {
          newFriends.add(user.ref);
        } else {
          newFriends.delete(user.ref);
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
