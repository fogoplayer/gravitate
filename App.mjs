import { append, html } from "./services/render.mjs";
import Contacts from "./pages/Contacts.mjs";
import CreateAttraction from "./pages/CreateAttraction.mjs";

console.log(Contacts());

page("/create-attraction", () => showPage(CreateAttraction()));
page("/contacts", () => showPage(Contacts()));
page("/", () => showPage(CreateAttraction()));


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
    <a href="contacts" id="view-contacts" classList="footer-link">
      <span classList="material-symbols-sharp footer-icon"> person </span>
      <span classList="footer-title">Contacts</span>
    </a>
    <a href="./" id="view-create-event" classList="footer-link fab">
      <span classList="material-symbols-sharp footer-icon"> add </span>
    </a>
    <a href="invites" id="view-invites" classList="footer-link">
      <span classList="material-symbols-sharp footer-icon"> person </span>
      <span classList="footer-title">Your invites</span>
    </a>
  </nav>
</footer>
`);
}

