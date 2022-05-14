import { jsx } from "../services/render.mjs";

export default function AppShell(hideAppDrawer, showAppDrawer, logOut) {
  return jsx`
<div id="skip-to-content"><a href="#app-main" tabIndex=1>Skip to content</a></div>
<dialog class="side-nav" onclick=${(e) => {
    if (e.target === document.querySelector(".side-nav")) {
      e.preventDefault();
      hideAppDrawer();
    }
  }} tabindex=-1>
    <nav>
      <ol>
        <li>
          <a href="/view-attractions" class="nav-link" tabindex=0>
            <span class="material-symbols-sharp nav-icon">view_list</span>
            <span class="nav-title">Attractions</span>
          </a>
        </li>
        <li>
          <a href="/create-attraction" class="nav-link" tabindex=0>
            <span class="material-symbols-sharp nav-icon">add</span>
            <span class="nav-title">Create Attraction</span>
          </a>
        </li>
        <li>
          <a href="/contacts" id="view-contacts" class="nav-link" tabindex=0>
            <span class="material-symbols-sharp nav-icon">person</span>
            <span class="nav-title">Contacts</span>
          </a>
        </li>
      </ol>
      <ol>
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
      </ol>
    </nav>
  </dialog>
<header class="app-header">
  <button class="menu-button" tabIndex=2 onclick=${showAppDrawer}>
    <div class="material-symbols-sharp"> menu </div>
  </button>
  <h1 class="page-title">Gravitate</h1>
  <button tabIndex=3 onclick=${showAppDrawer}>
    <div class="material-symbols-sharp"> sync </div>
  </button>
</header>
<main id="app-main" class="app-main"></main>
<footer class="app-footer">
  <nav>
    <a href="/view-attractions" id="view-invites" class="footer-link" tabIndex=4>
      <span class="material-symbols-sharp footer-icon">view_list</span>
      <span class="footer-title">Attractions</span>
    </a>
    <a
      href="/create-attraction"
      id="view-create-event"
      class="footer-link fab"
      tabIndex=5
    >
      <span class="material-symbols-sharp footer-icon">add</span>
    </a>
    <a href="/contacts" id="view-contacts" class="footer-link"  tabIndex=6>
      <span class="material-symbols-sharp footer-icon">person</span>
      <span class="footer-title">Contacts</span>
    </a>
  </nav>
</footer>
<pwa-update/>
      `;
}
