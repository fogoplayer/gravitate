import {
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

export default function AddFriend() {
  let searchValue;
  let newFriends = new Set();

  const modal = Modal({
    contents: jsx`<form>
  <h1>Add a Friend</h1>
  <div class="inline-inputs">
    ${Input({
      label: "Username",
      oninput: (e) => (searchValue = e.target.value),
    })}
    <button class="flat inline" onclick="${searchForFriends}">
      <span class="material-symbols-sharp">search</span>
    </button>
  </div>
</form>
<aside>
  You need to know a user's precise username to add them as a friend. If you
  don't know their username, ask them to send you a share code.
</aside>
<form id="friend-user-list-container" class="user-list empty">
  <ul id="friend-user-list" class="user-list"></ul>
  <button class="primary" id="add-friends" onclick=${addFriends}>Add friends</button>
</form>
`,
    id: "add-friend",
  });

  return modal;

  async function searchForFriends(e) {
    e.preventDefault();

    let users = await usernameSearch(searchValue);

    let options = users.map((user) => {
      return FriendSelectTemplate(user, {
        name: "added-friends",
        onchange: function (e) {
          if (e.target.checked) {
            newFriends.add(user.ref);
          } else {
            newFriends.delete(user.ref);
          }
        },
      });
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
}
