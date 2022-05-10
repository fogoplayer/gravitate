import { usernameSearch } from "../services/firebase/db.mjs";
import { append, jsx } from "../services/render.mjs";
import Input from "./Input.mjs";
import Modal from "./Modal.mjs";

export default function AddFriend() {
  return Modal({
    contents: jsx`<form>
  <h1>Add a Friend</h1>
  <div classList="inline-inputs">
    ${Input({ label: "Username", id: "friend-search-value" })}
    <button classList="flat inline" onclick="${searchForFriends}">
      <span classList="material-symbols-sharp">search</span>
    </button>
  </div>
</form>
<aside>
  You need to know a user's precise username to add them as a friend. If you
  don't know their username, ask them to send you a share code.
</aside>
<form id="friend-search-results-container" classList="search-results empty">
<ul id="friend-search-results" classList="search-results"></ul>
<button disabled classList="primary" id="add-friends">Add friends</button>
</form>`,
    id: "add-friend",
  });

  async function searchForFriends(e) {
    e.preventDefault();
    let users = await usernameSearch(
      document.querySelector("#friend-search-value").value
    );
    console.log(users);
    let options = users.map((user) => {
      return Template(user);
    });
    append(document.querySelector("#friend-search-results"), options);
    document
      .querySelector("#friend-search-results-container")
      .classList.remove("empty");
  }

  function Template(user) {
    return jsx`<li>
  <label classList="contact-header-container">
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
    
</li>`;
  }
}
