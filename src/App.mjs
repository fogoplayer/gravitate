import { append, html } from "./services/render.mjs";
import Contacts from "./pages/Contacts.mjs";
import CreateAttraction from "./pages/CreateAttraction.mjs";
import ViewAttractions from "./pages/ViewAttractions.mjs";
import { signIn, authStateChanged } from "./services/firebase/auth.mjs";
import { initUserData } from "./services/firebase/db.mjs";
import { getCurrUserData } from "./services/firebase/db.mjs";
import { logOut } from "./services/firebase/auth.mjs";
import Login from "./pages/Login.mjs";
import AppShell from "./components/AppShell.mjs";

authStateChanged(async (user) => {
  if (user) {
    await initUserData(user);
    page("/create-attraction", (context) => showAppPage(CreateAttraction(), context));
    page("/view-attractions", (context) => showAppPage(ViewAttractions(), context));
    page("/contacts", (context) => showAppPage(Contacts(), context));
  }
  page("/login", () => showExternalPage(Login()));
  page("/*", () => {
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
  setActiveLinks(context);
  hideAppDrawer();
}

function showAppShell() {
  if (!document.querySelector(".app-header")) {
    document.body.innerHTML = ``;
    append(document.body, AppShell(hideAppDrawer, showAppDrawer, logOut));
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