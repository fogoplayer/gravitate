import htm from "https://unpkg.com/htm?module";
import { render, append } from "./services/render.mjs";

const page = ""; // temporary, remove later

const html = htm.bind(render);
append(document.body, html`<header>
  <button class="open-menu">
    <span class="material-symbols-sharp"> menu </span>
  </button>
  <h1>${document.title}</h1>
  <main>${page}</main>
  <footer>
    <nav>
      <button id="view-contacts footer-button">
        <span class="material-symbols-sharp footer-icon"> person </span>
        <span class="footer-title">Contacts</span>
      </button>
      <button id="create-event footer-button fab">
        <span class="material-symbols-sharp footer-icon"> add </span>
      </button>
      <button id="view-contacts footer-button">
        <span class="material-symbols-sharp footer-icon"> person </span>
        <span class="footer-title">Your invites</span>
      </button>
    </nav>
  </footer>
</header>
`);