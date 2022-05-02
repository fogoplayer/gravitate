import { append, html } from "./services/render.mjs";
import Contacts from "./pages/Contacts.mjs";
import CreateAttraction from "./pages/CreateAttraction.mjs";
import ViewAttractions from "./pages/ViewAttractions.mjs";

append(document.body, html`<header classList="app-header">
  <button classList="menu-button">
    <span classList="material-symbols-sharp"> menu </span>
  </button>
  <h1 classList="page-title">${document.title}</h1>
</header>
<main classList="app-main"></main>
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

page("/create-attraction", () => showPage(CreateAttraction()));
page("/contacts", () => showPage(Contacts()));
page("/contacts", () => showPage(Contacts()));
page("/", () => showPage(ViewAttractions()));
if (window.location.hostname === "fogoplayer.github.io") page.base("/gravitate");
page.start();

function showPage(contents) {
  const main = document.querySelector(".app-main");
  main.innerHTML = ``;
  append(main, html`${contents}`);
}