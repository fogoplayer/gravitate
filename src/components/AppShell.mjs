import { hideRefreshPage } from "../App.mjs";
import { getCurrUserData } from "../services/firebase/db.mjs";
import { jsx, renderPage } from "../services/render.mjs";

export default function AppShell(hideAppDrawer, showAppDrawer, logOut) {
  return jsx`
<div id="skip-to-content"><a href="#app-main" tabIndex=1>Skip to content</a></div>
<dialog class="drop-nav" onclick=${(e) => {
    if (e.target === document.querySelector(".drop-nav")) {
      e.preventDefault();
      hideAppDrawer();
    }
  }} tabindex=-1>
  <nav>
    <ul>
      <li>
        <a href="/settings" class="nav-link">
          <img class="pfp" src="${
            getCurrUserData().icon
          }" alt="User Profile Picture" />
          ${getCurrUserData().name}
        </a>
      </li>
      <li>
        <a href="/changelog" class="nav-link" tabindex=0>
          <span class="material-symbols-sharp">
            list_alt</span>
          <span class="nav-title">Changelog </span>
        </a>
      </li>
      <li>
        <a href="/settings" class="nav-link" tabindex=0>
          <span class="material-symbols-sharp nav-icon">settings</span>
          <span class="nav-title">Settings</span>
        </a>
      </li>
      <li>
        <a href="" class="nav-link" tabindex=0 onclick=${logOut}>
          <span class="material-symbols-sharp nav-icon">logout</span>
          <span class="nav-title">Log out</span>
        </a>
      </li>
    </ul>
  </nav>
</dialog>
<header class="app-header">
<h1 class="page-title">Gravitate</h1>
  <button id="refresh-page" tabIndex=3 onclick=${(e) => {
    renderPage(window.location.pathname);
    hideRefreshPage();
  }}>
    <div class="material-symbols-sharp"> sync </div>
  </button>  
  <button id="pfp" tabIndex=4 onclick=${showAppDrawer}>
    <img class="pfp" src="${
      getCurrUserData().icon
    }" alt="User Profile Picture" /> 
  </button>
</header>
<main id="app-main" class="app-main"></main>
<footer class="app-footer">
  <nav>
    <a href="/view-attractions" id="view-invites" class="footer-link" tabIndex=5>
      <span class="material-symbols-sharp footer-icon">view_list</span>
      <span class="footer-title">Attractions</span>
    </a>
    <a
      href="/create-attraction"
      id="view-create-event"
      class="footer-link fab"
      tabIndex=6
    >
      <span class="material-symbols-sharp footer-icon">add</span>
    </a>
    <a href="/contacts" id="view-contacts" class="footer-link"  tabIndex=7>
      <span class="material-symbols-sharp footer-icon">person</span>
      <span class="footer-title">Contacts</span>
    </a>
  </nav>
</footer>
<pwa-update/>`;
}

export function setPageTitle(title) {
  if (document.querySelector("h1.page-title")) {
    document.querySelector("h1.page-title").innerText = title;
  }
  document.title = title + " | Gravitate";
}
