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
    let options = users.map((user) => {
      return jsx`<label classList="contact-header-container">
  <input
    type="checkbox"
    name="added-friends"
    id="${user.name}"
    value="${user.name}"
    tabindex="0"
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
`;
    });
    append(document.querySelector("#friend-search-results"), options);
  }
}
