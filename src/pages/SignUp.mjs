import Spinner from "../components/Spinner.mjs";
import Input from "../components/Input.mjs";
import { createAccount } from "../services/firebase/auth.mjs";
import { html, renderPage } from "../services/render.mjs";
import { setPageTitle } from "../components/AppShell.mjs";

export default function SignUp() {
  setPageTitle("Sign Up");

  return html`<main class="main-bubble modal login">
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
      Sign up ${Spinner()}
    </button>
  </form>
  <div>
    <a href="login" class="button flat inline small">Log in</button>
  </div>
</main>`;
  async function submit(e) {
    e.preventDefault();
    try {
      e.submitter.classList.add("loading");
      await createAccount(
        document.querySelector("#email").value,
        document.querySelector("#password").value
      );
      renderPage("onboarding/create-profile");
    } catch (error) {
      e.submitter.classList.remove("loading");
    }
  }
}
