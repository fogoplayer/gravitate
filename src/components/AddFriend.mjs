import { usernameSearch } from "../services/firebase/db.mjs";
import { append, jsx } from "../services/render.mjs";
import Input from "./Input.mjs";
import Modal from "./Modal.mjs";

export default function AddFriend() {
  return Modal({
    contents: jsx`<h1>Add a Friend</h1>
<div classList="inline-inputs">
  ${Input({ label: "Username", id: "friend-search-value" })}
  <button classList="flat inline" onclick="${searchForFriends}">
    <span classList="material-symbols-sharp">search</span>
  </button>
</div>
<aside>You need to know a user's precise username to add them as a friend. If you don't know their username, ask them to send you a share code.</aside>
<ul id="friend-search-results" classList="search-results"></ul>`,
    id: "add-friend",
  });

  async function searchForFriends(e) {
    e.preventDefault();
    let users = await usernameSearch(
      document.querySelector("#friend-search-value").value
    );
    console.log(users);
    users = users.map((user) => jsx`<li>${user.name}</li>`);
    append(document.querySelector("#friend-search-results"), users);
  }
}
