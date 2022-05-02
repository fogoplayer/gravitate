import { append, html } from "./services/render.mjs";
import Contacts from "./pages/Contacts.mjs";
import CreateAttraction from "./pages/CreateAttraction.mjs";
import ViewAttractions from "./pages/ViewAttractions.mjs";
import { signIn, authStateChanged } from "./services/firebase/auth.mjs";

append(document.body, html`
<div id="skip-to-content"><a href="#app-main" tabIndex=1>Skip to content</a></div>
<header classList="app-header">
  <button classList="menu-button" tabIndex=2>
    <div classList="material-symbols-sharp"> menu </div>
  </button>
  <h1 classList="page-title">Gravitate</h1>
</header>
<main id="app-main" classList="app-main"></main>
<footer classList="app-footer">
  <nav>
    <a href="view-attractions" id="view-invites" classList="footer-link" tabIndex=3>
      <span classList="material-symbols-sharp footer-icon">view_list</span>
      <span classList="footer-title">Attractions</span>
    </a>
    <a
      href="create-attraction"
      id="view-create-event"
      classList="footer-link fab"
      tabIndex=4
    >
      <span classList="material-symbols-sharp footer-icon">add</span>
    </a>
    <a href="contacts" id="view-contacts" classList="footer-link"  tabIndex=5>
      <span classList="material-symbols-sharp footer-icon">person</span>
      <span classList="footer-title">Contacts</span>
    </a>
  </nav>
</footer>
`);

authStateChanged(async (user) => {
  if (user) {
    page("/create-attraction", () => showPage(CreateAttraction()));
    page("/view-attractions", () => showPage(ViewAttractions()));
    page("/contacts", () => showPage(Contacts()));
    // page("/", () => showPage(Contacts()));
    page("/", () => showPage(CreateAttraction()));
  }
  if (window.location.hostname === "fogoplayer.github.io") page.base("/gravitate");
  page.start();
});

function showPage(contents) {
  const main = document.querySelector(".app-main");
  main.innerHTML = ``;
  append(main, html`${contents}`);
}

signIn("zarinloosli+testing@gmail.com", "Testing123!");