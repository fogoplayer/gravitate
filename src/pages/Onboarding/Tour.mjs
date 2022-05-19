import { showAppPage, showAppShell } from "../../App.mjs";
import Tip from "../../components/Tip.mjs";
import { append, jsx } from "../../services/render.mjs";
import Contacts from "../Contacts.mjs";

const tour = [contactsOverview(), orbits()];
let currTip = 0;

export default function Tour() {
  showAppShell();
  append(document.body, tour);
  showTourTip(0);
  return "";
}

function showTourTip(tip) {
  closeAll();
  tour[tip].showModal();
}

function nextTip() {
  showTourTip(++currTip);
}

function prevTip() {
  showTourTip(--currTip);
}

function closeAll() {
  let openTips = document.querySelectorAll(".tip[open]");
  Array.from(openTips).forEach((dialog) => dialog.close());
}

function contactsOverview() {
  let modal = Tip({
    contents: jsx`<p>Gravitate exists to help you organize spur-of-the-moment events with your friends and family members.</p>
<p>Let's start with how those friends and family members are organized!</p>`,
    next: nextTip,
    nextLabel: "Orbits",
  });
  modal._showModal = modal.showModal;
  modal.showModal = () => {
    showAppPage(Contacts, { pathname: "/contacts" });
    modal._showModal();
  };
  return modal;
}

function orbits() {
  let modal = Tip({
    contents: jsx`<h2>Orbits</h2>
<p>
  Orbits function like a mass text, inviting multiple people as if they were all
  individuals.
</p>
<p>
  It's for groups of people who don't know each other, but share two things:
</p>
<ol>
  <li>A common interest</li>
  <li><b>You!</b></li>
</ol>

<p>For example, you might want to have an orbit for friends who:</p>
<ul>
  <li>are Planet Fitness members</li>
  <li>share your major</li>
  <li>also like a local band</li>
  <li>are karaoke divas</li>
</ul>
`,
    targetSelector: ".orbit-wrapper .header-icon",
    prev: prevTip,
    prevLabel: "Overview",
    next: nextTip,
    nextLabel: "Orbits",
  });
  return modal;
}
