import Spinner from "../components/Spinner.mjs";
import Input from "../components/Input.mjs";
import { authStateChanged } from "../services/firebase/auth.mjs";
import { createAccount } from "../services/firebase/auth.mjs";
import { jsx } from "../services/render.mjs";

export default function SignUp() {
  let email, password;
  return jsx`<main classList="main-bubble modal">
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
    <button classList="primary">
      Sign up ${Spinner()}
    </button>
  </form>
  <div>
    <a href="login" classList="button flat small">Log in</button>
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
      page("onboarding/create-profile");
    } catch (error) {
      e.submitter.classList.remove("loading");
    }
  }
}
