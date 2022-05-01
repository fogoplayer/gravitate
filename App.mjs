import CreateAttraction from "./pages/CreateAttraction.mjs";
import { append, html } from "./services/render.mjs";

page("/", showPage(CreateAttraction()));

function showPage(contents) {
  append(document.body, html`<header classList="app-header">
  <button classList="menu-button">
    <span classList="material-symbols-sharp"> menu </span>
  </button>
  <h1 classList="page-title">${document.title}</h1>
</header>
<main classList="app-main">${contents}</main>
<footer classList="app-footer">
  <nav>
    <button id="view-contacts" classList="footer-button">
      <span classList="material-symbols-sharp footer-icon"> person </span>
      <span classList="footer-title">Contacts</span>
    </button>
    <button id="create-event" classList="footer-button fab">
      <span classList="material-symbols-sharp footer-icon"> add </span>
    </button>
    <button id="view-contacts" classList="footer-button">
      <span classList="material-symbols-sharp footer-icon"> person </span>
      <span classList="footer-title">Your invites</span>
    </button>
  </nav>
</footer>
`);
}

