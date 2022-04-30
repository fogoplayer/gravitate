import htm from "https://unpkg.com/htm?module";
import { render, append } from "./services/render.mjs";

const page = ""; // temporary, remove later

const html = htm.bind(render);
append(document.body, html`<header>
  <button classList="open-menu">
    <span classList=material-symbols-sharp> menu </span>
  </button>
  <h1>${document.title}</h1>
</header>
<main>${page}</main>
<footer>
  <nav>
    <button id="view-contacts footer-button">
      <span classList="material-symbols-sharp footer-icon"> person </span>
      <span classList="footer-title">Contacts</span>
    </button>
    <button id="create-event footer-button fab">
      <span classList="material-symbols-sharp footer-icon"> add </span>
    </button>
    <button id="view-contacts footer-button">
      <span classList="material-symbols-sharp footer-icon"> person </span>
      <span classList="footer-title">Your invites</span>
    </button>
  </nav>
</footer>
`);