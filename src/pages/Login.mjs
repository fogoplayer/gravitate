import Spinner from "../components/Spinner.mjs";
import TextInput from "../components/TextInput.mjs";
import { authStateChanged } from "../services/firebase/auth.mjs";
import { signIn } from "../services/firebase/auth.mjs";
import { html } from "../services/render.mjs";

export default function Login() {
  let email, password;
  return html`<main classList="login-page">
  <h1>Gravitate</h1>
  <form onsubmit=${submit}>
    ${TextInput({ label: "Email", id: "email", required: true })}
    ${TextInput({ label: "Password", type: "password", id: "password", required: true, classList: "password" })}
    <button classList="primary">
    Log in ${Spinner()}
    </button>
  </form>
  <div>
    <button classList="flat small">Forgot password</button>
    <button classList="flat small">Sign up</button>
  </div>
</main>`;
  async function submit(e) {
    e.preventDefault();
    await signIn(document.querySelector("#email").value, document.querySelector("#password").value);
    page.redirect("view-attractions");
    // authStateChanged(() => page.redirect("view-attractions")))
  }
};

