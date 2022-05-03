import { append, html } from "./services/render.mjs";
import Contacts from "./pages/Contacts.mjs";
import CreateAttraction from "./pages/CreateAttraction.mjs";
import ViewAttractions from "./pages/ViewAttractions.mjs";
import { signIn, authStateChanged } from "./services/firebase/auth.mjs";
import { initUserData } from "./services/firebase/db.mjs";
import { getCurrUserData } from "./services/firebase/db.mjs";

append(document.body, html`
<div id="skip-to-content"><a href="#app-main" tabIndex=1>Skip to content</a></div>
<header class="app-header">
  <button class="menu-button" tabIndex=2>
    <div class="material-symbols-sharp"> menu </div>
  </button>
  <h1 class="page-title">Gravitate</h1>
</header>
<main id="app-main" class="app-main"></main>
<footer class="app-footer">
  <nav>
    <a href="view-attractions" id="view-invites" class="footer-link" tabIndex=3>
      <span class="material-symbols-sharp footer-icon">view_list</span>
      <span class="footer-title">Attractions</span>
    </a>
    <a
      href="create-attraction"
      id="view-create-event"
      class="footer-link fab"
      tabIndex=4
    >
      <span class="material-symbols-sharp footer-icon">add</span>
    </a>
    <a href="contacts" id="view-contacts" class="footer-link"  tabIndex=5>
      <span class="material-symbols-sharp footer-icon">person</span>
      <span class="footer-title">Contacts</span>
    </a>
  </nav>
</footer>
`);

authStateChanged(async (user) => {
  await initUserData(user);
  if (user) {
    page("/create-attraction", () => showPage(CreateAttraction()));
    page("/view-attractions", () => showPage(ViewAttractions()));
    page("/contacts", () => showPage(Contacts()));
    page("/", () => showPage(CreateAttraction()));
  }
  if (window.location.hostname === "fogoplayer.github.io") page.base("/gravitate");
  page.start();
});

function showPage(contents) {
  const main = document.querySelector(".app-main");
  main.innerHTML = ``;
  append(main, html`${contents}`);
  document.activeElement.blur();
}

signIn("zarinloosli+testing@gmail.com", "Testing123!");