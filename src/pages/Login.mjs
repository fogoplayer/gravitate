import Spinner from "../components/Spinner.mjs";
import Input from "../components/Input.mjs";
import { authStateChanged } from "../services/firebase/auth.mjs";
import { signIn } from "../services/firebase/auth.mjs";
import { jsx } from "../services/render.mjs";

export default function Login() {
  let email, password;
  return jsx`<main class="modal main-bubble">
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
  <div>
    <button class="flat small">Forgot password</button>
    <a href="signup" class="button flat small">Sign up</button>
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
