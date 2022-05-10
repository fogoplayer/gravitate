import { jsx } from "../services/render.mjs";
import Input from "./Input.mjs";
import Modal from "./Modal.mjs";

export default function AddFriend() {
  return Modal({
    contents: jsx`<h1>Add a Friend</h1>
<div classList="inline-inputs">
  ${Input({ label: "Username" })}
  <button classList="flat inline">
    <span classList="material-symbols-sharp">search</span>
  </button>
</div>
`,
    id: "add-friend",
  });
}
