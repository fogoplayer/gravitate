import { append, html } from "./services/render.mjs";
import Contacts from "./pages/Contacts.mjs";
import CreateAttraction from "./pages/CreateAttraction.mjs";
import ViewAttractions from "./pages/ViewAttractions.mjs";
import { signIn, authStateChanged } from "./services/firebase/auth.mjs";
import { initUserData } from "./services/firebase/db.mjs";
import { getCurrUserData } from "./services/firebase/db.mjs";
import { logOut } from "./services/firebase/auth.mjs";
import Login from "./pages/Login.mjs";

authStateChanged(async (user) => {
  console.log(user);
  if (user) {
    await initUserData(user);
    page("/create-attraction", () => showAppPage(CreateAttraction()));
    page("/view-attractions", () => showAppPage(ViewAttractions()));
    page("/contacts", () => showAppPage(Contacts()));
  }
  page("/login", () => showExternalPage(Login()));
  page("/", () => {
    if (user) { console.log("user"); showAppPage(ViewAttractions()); }
    else { console.log("no user"); showExternalPage(Login()); }
  });

  if (window.location.hostname === "fogoplayer.github.io") page.base("/gravitate");
  page.start();
});

function showAppPage(contents) {
  if (!getCurrUserData()) {
    showExternalPage(Login());
    return;
  }
  showAppShell();
  const main = document.querySelector(".app-main");
  main.innerHTML = ``;
  append(main, html`${contents}`);
  document.activeElement.blur();
}

function showAppShell() {
  if (!document.querySelector(".app-header")) {
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
  }
}

function showExternalPage(contents) {
  document.body.innerHTML = "";
  console.log(document);
  append(document.body, contents);
}