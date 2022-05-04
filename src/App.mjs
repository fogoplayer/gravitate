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
  if (user) {
    await initUserData(user);
    page("/create-attraction", (context) => showAppPage(CreateAttraction(), context));
    page("/view-attractions", (context) => showAppPage(ViewAttractions(), context));
    page("/contacts", (context) => showAppPage(Contacts(), context));
  }
  page("/login", () => showExternalPage(Login()));
  page("/", () => {
    if (user) page.redirect("view-attractions");
    else page.redirect("login");

  });

  if (window.location.hostname === "fogoplayer.github.io") page.base("/gravitate");
  page.start();
});

function showAppPage(contents, context) {
  if (!getCurrUserData()) {
    showExternalPage(Login());
    return;
  }
  showAppShell();
  const main = document.querySelector(".app-main");
  main.innerHTML = ``;
  append(main, html`${contents}`);

  // Functions for after render
  document.activeElement.blur();
  setActiveLinks(context);
  hideAppDrawer();
}

function showAppShell() {
  if (!document.querySelector(".app-header")) {
    append(document.body, html`
<div id="skip-to-content"><a href="#app-main" tabIndex=1>Skip to content</a></div>
<dialog classList="side-nav" onclick=${(e) => {
        if (e.target === document.querySelector('.side-nav')) {
          e.preventDefault();
          hideAppDrawer();
        }
      }} tabindex = -1 >
    <nav>
      <ol>
        <li>
          <a href="view-attractions" classList="nav-link" tabindex=0>
            <span classList="material-symbols-sharp nav-icon">view_list</span>
            <span classList="nav-title">Attractions</span>
          </a>
        </li>
        <li>
          <a href="create-attraction" classList="nav-link" tabindex=0>
            <span classList="material-symbols-sharp nav-icon">add</span>
            <span classList="nav-title">Create Attraction</span>
          </a>
        </li>
        <li>
          <a href="contacts" id="view-contacts" classList="nav-link" tabindex=0>
            <span classList="material-symbols-sharp nav-icon">person</span>
            <span classList="nav-title">Contacts</span>
          </a>
        </li >
      </ol >
      <ol>
        <li>
          <a href="settings" classList="nav-link" tabindex=0>
            <span classList="material-symbols-sharp nav-icon">settings</span>
            <span classList="nav-title">Settings</span>
          </a>
        </li>
        <li>
          <a href="logout" classList="nav-link" tabindex=0>
            <span classList="material-symbols-sharp nav-icon">logout</span>
            <span classList="nav-title">Log out</span>
          </a>
        </li >
      </ol >
    </nav >
  </dialog >
<header classList="app-header">
  <button classList="menu-button" tabIndex=2 onclick=${showAppDrawer} }>
    <div classList="material-symbols-sharp"> menu </div>
  </button>
  <h1 classList="page-title">Gravitate</h1>
</header >
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
    <a href="contacts" id="view-contacts" classList="footer-link"  tabIndex=5 >
      <span classList="material-symbols-sharp footer-icon">person</span>
      <span classList="footer-title">Contacts</span>
    </a >
  </nav >
</footer >
      `);
  }
}

function setActiveLinks(context) {
  // un-active existing links
  Array.from(document.querySelectorAll("a.active")).forEach(link => link.classList.remove("active"));

  // mark new active links
  let activeLinks = Array.from(document.querySelectorAll(`[href = "${context.pathname}"]`));
  activeLinks = activeLinks.concat(Array.from(document.querySelectorAll(`[href = "${context.pathname.substring(1)}"]`)));
  activeLinks.forEach(activeLink => {
    activeLink.classList.add("active");
  });
}

function showExternalPage(contents) {
  document.body.innerHTML = "";
  append(document.body, contents);
}

function showAppDrawer() {
  document.querySelector('.side-nav').showModal();
}

function hideAppDrawer(e) {
  document.querySelector('.side-nav').classList.add("closing");
  setTimeout(() => {
    document.querySelector('.side-nav').close();
    document.querySelector('.side-nav').classList.remove("closing");
  }, 250);
};;