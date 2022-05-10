import { jsx } from "../services/render.mjs";
import Input from "./Input.mjs";
import Modal from "./Modal.mjs";

export default function AddFriend() {
  return Modal({
    contents: jsx`
  <h1>Add a Friend</h1>
  ${Input({ label: "Username" })}
`,
    id: "add-friend",
  });
}
