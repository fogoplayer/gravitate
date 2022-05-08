import Input from "../../components/Input.mjs";
import { getCurrentUser } from "../../services/firebase/auth.mjs";
import { getCurrUserData, update } from "../../services/firebase/db.mjs";
import { jsx } from "../../services/render.mjs";

export default function CreateProfile() {
  return jsx`<main classList="main-bubble">
  <form onsubmit=${onSubmit}>
    <h1>Create your profile</h1>
    ${Input({ label: "Username", id: "username" })}
    <button classList="primary">Save</button>
  </form>
</main>
`;
}

async function onSubmit(e) {
  e.preventDefault();
  try {
    e.submitter.classList.add("loading");
    console.log(getCurrUserData());
    await update(getCurrUserData().ref, {
      username: document.querySelector("#username").value,
    });
    page("/view-attractions");
  } catch (error) {
    e.submitter.classList.remove("loading");
  }
}
