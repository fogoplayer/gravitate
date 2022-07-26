import { setPageTitle } from "../components/AppShell.mjs";
import Input from "../components/Input.mjs";
import Spinner from "../components/Spinner.mjs";
import { resetPassword } from "../services/firebase/auth.mjs";
import { html } from "../services/render.mjs";

export default function ResetPassword() {
  setPageTitle("Reset password");

  let email = "";
  return html`<main class="modal main-bubble reset-password">
    <h1>Reset Password</h1>
    <p>
      Enter your email address and a password reset link will be sent to you
    </p>
    <form onsubmit=${submit}>
      ${Input({
        label: "Email",
        id: "email",
        required: true,
        oninput(e) {
          email = e.target.value;
        },
      })}
      <button class="primary">Reset password ${Spinner()}</button>
    </form>
    <aside class="confirmation hidden">
      Reset email sent <br />
      Not seeing it? Check your spam folder
    </aside>
    <div>
      <button class="flat small" onclick="${() => history.back()}">Back</button>
    </div>
  </main>`;
  async function submit(e) {
    e.preventDefault();
    try {
      e.submitter.classList.add("loading");
      await resetPassword(email);
      document.querySelector(".confirmation").classList.remove("hidden");
      e.submitter.classList.remove("loading");
    } catch (error) {
      e.submitter.classList.remove("loading");
    }
  }
}
