import { showAppPage, showAppShell } from "../../App.mjs";
import Tip from "../../components/Tip.mjs";
import { append, jsx } from "../../services/render.mjs";
import Contacts from "../Contacts.mjs";

const tour = [contactsOverview, orbits, systems, friends, attractions()];
let currTip = 0;

export default function Tour() {
  showAppShell();
  showTourTip(0);
  return "";
}

function showTourTip(tip) {
  closeAll();
  const el = tour[tip]();
  append(document.body, el);
  el.showModal();
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
<p>That's why we call it an "orbit": they're all "orbiting" around you.</p>
<p>For example, you might want to have an orbit for friends who:</p>
<ul>
  <li>are Planet Fitness members</li>
  <li>share your major</li>
  <li>also like a local band</li>
  <li>are karaoke divas</li>
</ul>
`,
    target: document.querySelector(".orbits-wrapper .header-icon"),
    prev: prevTip,
    prevLabel: "Overview",
    next: nextTip,
    nextLabel: "Systems",
  });
  return modal;
}

function systems() {
  let modal = Tip({
    contents: jsx`<h2>Systems</h2>
<p>
  Systems function like a group text: it's a bunch of people who can all send
  invites to each other.
</p>
<p>We call it a "system" because it's like a solar system, with everyone revolving around a shared interest.</p>
<p>For example, you might want to have an system for:</p>
<ul>
  <li>a book group that meets sporadically</li>
  <li>an intramural ultimate frisbee team</li>
  <li>extended family members who live near each other</li>
</ul>
<p>To join a system, a system member will need to send you an invite link.</p>`,
    target: document.querySelector(".systems-wrapper .header-icon"),
    prev: prevTip,
    prevLabel: "Orbits",
    next: nextTip,
    nextLabel: "Friends",
  });
  return modal;
}

function friends() {
  let modal = Tip({
    contents: jsx`<h2>Friends</h2>
<p>
  Friends can send invitations to each other individually.
</p>
<p><b>You will only recieve invitations from people you have friended.</b></p>
<p>To add someone as a friend, you will need to know their username or have them send you an add link.</p>`,
    target: document.querySelector(".friends-wrapper .header-icon"),
    prev: prevTip,
    prevLabel: "Systems",
    next: nextTip,
    nextLabel: "Attractions",
  });
  return modal;
}

function attractions() {
  let modal = Tip({
    contents: jsx`<h2>Attractions</h2>
<p>
  In Gravitate, an event is called an "Attraction."
</p>
<p>After putting in a title, location, and end time for the attraction, you can send it to any combination of your orbits, attractions, and friends.</p>
<p>They'll recieve a notification with the attraction details</p>`,
    target: document.querySelector(".friends-wrapper .header-icon"),
    prev: prevTip,
    prevLabel: "Friends",
    next: nextTip,
    nextLabel: "Invitations",
  });
  modal._showModal = modal.showModal;
  modal.showModal = () => {
    showAppPage(Contacts, { pathname: "/create-attraction" });
    modal._showModal();
  };
  return modal;
}
