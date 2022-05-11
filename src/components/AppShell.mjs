import { jsx } from "../services/render.mjs";

export default function AppShell(hideAppDrawer, showAppDrawer, logOut) {
  return jsx`
<div id="skip-to-content"><a href="#app-main" tabIndex=1>Skip to content</a></div>
<dialog classList="side-nav" onclick=${(e) => {
    if (e.target === document.querySelector(".side-nav")) {
      e.preventDefault();
      hideAppDrawer();
    }
  }} tabindex = -1>
    <nav>
      <ol>
        <li>
          <a href="/view-attractions" classList="nav-link" tabindex=0>
            <span classList="material-symbols-sharp nav-icon">view_list</span>
            <span classList="nav-title">Attractions</span>
          </a>
        </li>
        <li>
          <a href="/create-attraction" classList="nav-link" tabindex=0>
            <span classList="material-symbols-sharp nav-icon">add</span>
            <span classList="nav-title">Create Attraction</span>
          </a>
        </li>
        <li>
          <a href="/contacts" id="view-contacts" classList="nav-link" tabindex=0>
            <span classList="material-symbols-sharp nav-icon">person</span>
            <span classList="nav-title">Contacts</span>
          </a>
        </li>
      </ol>
      <ol>
        <li>
          <a href="/settings" classList="nav-link" tabindex=0>
            <span classList="material-symbols-sharp nav-icon">settings</span>
            <span classList="nav-title">Settings</span>
          </a>
        </li>
        <li>
          <a href="" classList="nav-link" tabindex=0 onclick=${logOut}>
            <span classList="material-symbols-sharp nav-icon">logout</span>
            <span classList="nav-title">Log out</span>
          </a>
        </li>
      </ol>
    </nav>
  </dialog>
<header classList="app-header">
  <button classList="menu-button" tabIndex=2 onclick=${showAppDrawer} }>
    <div classList="material-symbols-sharp"> menu </div>
  </button>
  <h1 classList="page-title">Gravitate</h1>
</header>
<main id="app-main" classList="app-main"></main>
<footer classList="app-footer">
  <nav>
    <a href="/view-attractions" id="view-invites" classList="footer-link" tabIndex=3>
      <span classList="material-symbols-sharp footer-icon">view_list</span>
      <span classList="footer-title">Attractions</span>
    </a>
    <a
      href="/create-attraction"
      id="view-create-event"
      classList="footer-link fab"
      tabIndex=4
    >
      <span classList="material-symbols-sharp footer-icon">add</span>
    </a>
    <a href="/contacts" id="view-contacts" classList="footer-link"  tabIndex=5>
      <span classList="material-symbols-sharp footer-icon">person</span>
      <span classList="footer-title">Contacts</span>
    </a>
  </nav>
</footer>
<pwa-update/>
      `;
}
