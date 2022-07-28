import Spinner from "../components/Spinner.mjs";
import Input from "../components/Input.mjs";
import { authStateChanged } from "../services/firebase/auth.mjs";
import { signIn } from "../services/firebase/auth.mjs";
import { html } from "../services/render.mjs";
import { setPageTitle } from "../components/AppShell.mjs";

export default function Login() {
  setPageTitle("Login");
  return html`<main class="modal main-bubble login">
  <h1>Gravitate</h1>
  <form onsubmit=${submit}>
    ${Input({ label: "Email", id: "email", required: true })}
    ${Input({
      label: "Password",
      type: "password",
      id: "password",
      required: true,
      classList: "password",
    })}
    <button class="primary">
    Log in ${Spinner()}
    </button>
  </form>
  <div class="other-links">
    <a href="reset-password" class="button flat inline small">Forgot password</a>
    <a href="signup" class="button flat inline small">Sign up</button>
  </div>
</main>`;
  async function submit(e) {
    e.preventDefault();
    try {
      e.submitter.classList.add("loading");
      await signIn(
        document.querySelector("#email").value,
        document.querySelector("#password").value
      );
      authStateChanged(() => page("view-attractions"));
    } catch (error) {
      e.submitter.classList.remove("loading");
    }
  }
}
