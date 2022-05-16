import "https://cdn.jsdelivr.net/npm/@pwabuilder/pwaupdate";

import { append, jsx, renderPage } from "./services/render.mjs";
import Contacts from "./pages/Contacts.mjs";
import CreateAttraction from "./pages/CreateAttraction.mjs";
import ViewAttractions from "./pages/ViewAttractions.mjs";
import { signIn, authStateChanged } from "./services/firebase/auth.mjs";
import { initDBWatchers, loadUserData } from "./services/firebase/db.mjs";
import { getCurrUserData } from "./services/firebase/db.mjs";
import { logOut } from "./services/firebase/auth.mjs";
import Login from "./pages/Login.mjs";
import SignUp from "./pages/SignUp.mjs";
import AppShell from "./components/AppShell.mjs";
import Spinner from "./components/Spinner.mjs";
import Onboarding from "./pages/Onboarding/index.js";

// immediately show loading spinner
append(
  document.body,
  jsx`<div class="login-spinner">
    ${Spinner()}
    <div>Checking login status...</div>
  </div>`
);

authStateChanged(async (user) => {
  let currUserData = await loadUserData(user);
  if (user) {
    initDBWatchers();
    import("./services/firebase/messaging.mjs");
  }

  page("/create-attraction", (context) =>
    showAppPage(CreateAttraction, context)
  );
  page("/view-attractions", (context) => showAppPage(ViewAttractions, context));
  page("/contacts", (context) => showAppPage(Contacts, context));
  page("/login", () => showExternalPage(Login));
  page("/signup", () => showExternalPage(SignUp));
  page("/onboarding/:page", (context) => showExternalPage(Onboarding));
  page("/*", () => {
    if (user) page.redirect("view-attractions");
    else page.redirect("login");
  });

  if (window.location.hostname === "fogoplayer.github.io")
    page.base("/gravitate");
  page.start();
});

function showAppPage(contents, context) {
  console.log(getCurrUserData());
  if (!getCurrUserData()) {
    renderPage("/login");
    return;
  }
  showAppShell();
  const main = document.querySelector(".app-main");
  main.innerHTML = ``;
  append(main, jsx`${contents(context)}`);

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
  Array.from(document.querySelectorAll("a.active")).forEach((link) =>
    link.classList.remove("active")
  );

  // mark new active links
  let activeLinks = Array.from(
    document.querySelectorAll(`[href = "${context.pathname}"]`)
  );
  activeLinks = activeLinks.concat(
    Array.from(
      document.querySelectorAll(`[href = "${context.pathname.substring(1)}"]`)
    )
  );
  activeLinks.forEach((activeLink) => {
    activeLink.classList.add("active");
  });
}

function showExternalPage(contents) {
  document.body.innerHTML = "";
  append(document.body, contents());
}

function showAppDrawer() {
  document.querySelector(".side-nav").showModal();
}

function hideAppDrawer(e) {
  document.querySelector(".side-nav").classList.add("closing");
  setTimeout(() => {
    document.querySelector(".side-nav").close();
    document.querySelector(".side-nav").classList.remove("closing");
  }, 250);
}

export function showRefreshPage() {
  document.querySelector("#refresh-page")?.classList.add("show");
}
export function hideRefreshPage() {
  document.querySelector("#refresh-page")?.classList.remove("show");
}
