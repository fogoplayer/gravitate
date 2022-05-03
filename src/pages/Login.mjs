import TextInput from "../components/TextInput.mjs";
import { signIn } from "../services/firebase/auth.mjs";
import { html } from "../services/render.mjs";

export default function Login() {
  let email, password;
  return html`<main classList="login-page">
  <h1>Gravitate</h1>
  <form>
    ${TextInput({ label: "Email", id: "email" })}
    ${TextInput({ label: "Password", type: "password", id: "password" })}
    <button classList="primary" onclick=${submit}>Log in</button>
  </form>
  <div>
    <button classList="flat small">Forgot password</button>
    <button classList="flat small">Sign up</button>
  </div>
</main>`;
  function submit() { signIn(document.querySelector("#email").value, document.querySelector("#password").value); }
};

