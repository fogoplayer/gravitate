import { showAppPage, showAppShell, showRefreshPage } from "../../App.mjs";
import { setPageTitle } from "../../components/AppShell.mjs";
import { reactions } from "../../components/EventDetails.mjs";
import Tip from "../../components/Tip.mjs";
import {
  dangerousSetCurrUserData,
  getCurrUserData,
} from "../../services/firebase/db.mjs";
import { append, html, renderPage } from "../../services/render.mjs";
import Contacts from "../Contacts.mjs";
import FriendPage from "../contacts/FriendPage.mjs";
import OrbitPage from "../contacts/OrbitPage.mjs";
import SystemPage from "../contacts/SystemPage.mjs";
import CreateAttraction from "../CreateAttraction.mjs";
import ViewAttractions from "../ViewAttractions.mjs";

const tour = [
  permissionsExplanation,
  permissionsRequest,
  contactsOverview,
  orbits,
  orbitDetails,
  orbitMembers,
  systems,
  systemDetails,
  systemMembers,
  friends,
  friendDetails,
  attractions,
  invitations,
  navigation,
  refresh,
];
let currTip = 0;

export default function Tour() {
  setPageTitle("Tour");
  setTourUserData();

  currTip = 0;

  showAppShell();
  showTourTip(currTip);
  return "";
}

function setTourUserData() {
  const cachedUserData = getCurrUserData();

  dangerousSetCurrUserData({
    icon: "/images/cosmo.svg",
    name: "Cosmo",
    ref: "",
    dataDocRef: "",
    attractionsRef: "",
    invitationsRef: "",
    orbitsRef: "",
    uid: "xIN98sxVcyRygMVDZ2NWfJ35Sm83",
    attractions: [],
    invitations: [],
    orbits: [
      {
        name: "Cosmo's Orbit",
        members: [
          {
            icon: cachedUserData.icon,
            name: cachedUserData.name,
            ref: "",
          },
        ],
        icon: "🪐",
        ref: { id: 0 },
      },
    ],
    friends: [
      {
        icon: cachedUserData.icon,
        name: cachedUserData.name,
        ref: { id: 0 },
      },
    ],
    systems: [
      {
        members: [
          {
            icon: window.location.origin + "/images/cosmo.svg",
            name: "Cosmette",
            ref: { id: 1 },
          },
          {
            icon: cachedUserData.icon,
            name: cachedUserData.name,
            ref: "",
          },
          {
            icon: window.location.origin + "/images/cosmo.svg",
            name: "Cosmo",
            ref: "",
          },
        ],
        icon: "☀",
        name: "Cosmo's System",
        ref: { id: 0 },
      },
    ],
  });

  page.exit("/onboarding/tour", () => {
    dangerousSetCurrUserData(cachedUserData);
    window.location.href = "/contacts";
  });
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

function permissionsExplanation() {
  showAppPage(Contacts, { pathname: "/contacts" });
  return Tip({
    contents: html`<p>
        First, we need you to grant a couple of permissions so that you can have
        access to all of our features:
      </p>
      <ul>
        <li>
          Location access lets us show you which events are closest to you
        </li>
        <li>Notification access lets us notify you when an event is created</li>
      </ul>
      <p>
        If you refuse either of these permissions, the rest of the app will
        still work.
      </p>`,
    next: nextTip,
    nextLabel: "Continue",
  });
}

function permissionsRequest() {
  const notificationNeeded = Notification.permission === "default";
  navigator?.permissions
    ?.query({ name: "geolocation" })
    .then((needLocation) => {
      if (notificationNeeded || needLocation.state === "prompt") {
        navigator.geolocation.getCurrentPosition(() => {}); // location permission
        Notification.requestPermission(); // notification permission
      } else {
        nextTip();
      }
    });

  return permissionsExplanation();
}

function contactsOverview() {
  showAppPage(Contacts, { pathname: "/contacts" });
  return Tip({
    contents: html`<p>
        Gravitate exists to help you organize spur-of-the-moment events with
        your friends and family members.
      </p>
      <p>Let's look at how those friends and family members are organized!</p>`,
    prev: prevTip,
    prevLabel: "Permissions",
    next: nextTip,
    nextLabel: "Orbits",
  });
}

function orbits() {
  showAppPage(Contacts, { pathname: "/contacts" });
  return Tip({
    contents: html`<h2>Orbits</h2>
      <p>
        Orbits function like a mass text, inviting multiple people as if they
        were all individuals.
      </p>
      <p>
        It's for groups of people who don't know each other, but share two
        things:
      </p>
      <ol>
        <li>A common interest</li>
        <li><b>You!</b></li>
      </ol>
      <p>
        That's why we call it an "orbit": they're all "orbiting" around you.
      </p>
      <p>For example, you might want to have an orbit for friends who:</p>
      <ul>
        <li>are Planet Fitness members</li>
        <li>share your major</li>
        <li>also like a local band</li>
        <li>are karaoke divas</li>
      </ul>
      <p>Click on an orbit to view more details</p>`,
    target: document.querySelector(".orbits-wrapper .contact-icon"),
    prev: prevTip,
    prevLabel: "Overview",
    next: nextTip,
    nextLabel: "Orbit Details Page",
  });
}

function orbitDetails() {
  showAppPage(() => html`<div class="contact-page">${OrbitPage(0)}</div>`, {
    pathname: "/contacts/orbits/0",
  });
  return Tip({
    contents: html`<h2>Orbit Details Page</h2>
      <p>
        The orbit details page lets you see the name, icon, and members of the
        orbit.
      </p>
      <p>Click on the orbit name or icon to change it.</p>`,
    prev: prevTip,
    prevLabel: "Orbits",
    next: nextTip,
    nextLabel: "Orbit Members",
  });
}

function orbitMembers() {
  showAppPage(() => html`<div class="contact-page">${OrbitPage(0)}</div>`, {
    pathname: "/contacts/orbits/0",
  });
  return Tip({
    contents: html`<h2>Orbit Members</h2>
      <p>
        Use the + to add friends to the orbit or the - to remove them. Click on
        a friend to be taken to their details page. (I'll show you those later)
      </p>`,
    target: document.querySelector(".contact-header-container button.flat"),
    prev: prevTip,
    prevLabel: "Orbit Details Page",
    next: nextTip,
    nextLabel: "Systems",
  });
}

function systems() {
  showAppPage(Contacts, { pathname: "/contacts" });
  return Tip({
    contents: html`<h2>Systems</h2>
      <p>
        Systems function like a group text: it's a bunch of people who can all
        send invites to each other.
      </p>
      <p>
        We call it a "system" because it's like a solar system, with everyone
        revolving around a shared interest.
      </p>
      <p>For example, you might want to have an system for:</p>
      <ul>
        <li>a book group that meets sporadically</li>
        <li>an intramural ultimate frisbee team</li>
        <li>extended family members who live near each other</li>
      </ul>
      <p>
        To join a system, a system member will need to send you an invite link.
      </p>
      <aside>
        Not sure about the difference between orbits and systems? Learn more
        <a
          onclick="${() => {
            closeAll();
            const el = orbitSystemExamples();
            append(document.body, el);
            el.showModal();
          }}"
          ><u>here</u></a
        >
      </aside>`,
    target: document.querySelector(".systems-wrapper .header-icon"),
    prev: prevTip,
    prevLabel: "Orbit Members",
    next: nextTip,
    nextLabel: "System Details Page",
  });
}

function orbitSystemExamples() {
  return Tip({
    contents: html`<h2>Orbits vs Systems</h2>
      <table>
        <tr>
          <th></th>
          <th>Orbit</th>
          <th>System</th>
        </tr>
        <tr>
          <th>Group invitations</th>
          <td>Members all recieve an invitation</td>
          <td>Members all recieve an invitation</td>
        </tr>
        <tr>
          <th>Invitation appearance</th>
          <td>An individual invitation from a friend</td>
          <td>A group invitation to the entire system</td>
        </tr>
        <tr>
          <th>Attraction Creation</th>
          <td>Only the orbit creator can create an attraction</td>
          <td>Any member can create an attraction</td>
        </tr>
      </table>`,
    prev: () => showTourTip(currTip),
    prevLabel: "Ststems",
    next: nextTip,
    nextLabel: "System Details Page",
  });
}

function systemDetails() {
  showAppPage(() => html`<div class="contact-page">${SystemPage(0)}</div>`, {
    pathname: "/contacts/orbits/0",
  });
  return Tip({
    contents: html`<h2>System Details Page</h2>
      <p>
        The system details page lets you see the name, icon, and members of the
        system.
      </p>
      <p>Click on the system name or icon to change it.</p>`,
    prev: prevTip,
    prevLabel: "Systems",
    next: nextTip,
    nextLabel: "System Members",
  });
}

function systemMembers() {
  showAppPage(() => html`<div class="contact-page">${SystemPage(0)}</div>`, {
    pathname: "/contacts/orbits/0",
  });
  return Tip({
    contents: html`<h2>System Members</h2>
      <p>
        The first button next to a system members' name let you add them as a
        friend, if you're not friends already.
      </p>
      <p>The second button removes them from the system.</p>`,
    target: document.querySelector(".contact-header-container button.flat"),
    prev: prevTip,
    prevLabel: "System Details",
    next: nextTip,
    nextLabel: "Friends",
  });
}

function friends() {
  showAppPage(Contacts, { pathname: "/contacts" });
  return Tip({
    contents: html`<h2>Friends</h2>
      <p>Friends can send invitations to each other individually.</p>
      <p>
        <b>You will only recieve invitations from people you have friended.</b>
      </p>
      <p>
        To add someone as a friend, you will need to know their username or have
        them send you an add link.
      </p>`,
    target: document.querySelector(".friends-wrapper .contact-icon"),
    prev: prevTip,
    prevLabel: "Systems",
    next: nextTip,
    nextLabel: "Friend Details",
  });
}

function friendDetails() {
  showAppPage(() => html`<div class="contact-page">${FriendPage(0)}</div>`, {
    pathname: "/contacts/orbits/0",
  });
  return Tip({
    contents: html`<h2>Friend Details Page</h2>
      <p>
        The friend details page lets you see the name and icon of your friend,
        any attractions they are hosting, and the orbits they are a member of
        and the systems you have both joined.
      </p>
      <p>
        Click on their name to view it in full screen, then click again to close
        it.
      </p>
      <p>Click on an orbit or system to go to its details page.</p>`,
    target: document.querySelector(".systems-wrapper .header-icon"),
    prev: prevTip,
    prevLabel: "Friends",
    next: nextTip,
    nextLabel: "Attractions",
  });
}

function attractions() {
  showAppPage(CreateAttraction, { pathname: "/create-attraction" });
  let modal = Tip({
    contents: html`<h2>Attractions</h2>
      <p>
        This page is for creating an event, which we call an "Attraction." You
        get to it by clicking the plus in the bottom bar.
      </p>
      <p>
        After putting in a title, location, and end time for the attraction, you
        can send it to any combination of your orbits, attractions, and friends
        by clicking on their name.
      </p>
      <p>They'll recieve a notification with the attraction details.</p>`,
    target: document.querySelector(".menu-button"),
    prev: prevTip,
    prevLabel: "Friends",
    next: nextTip,
    nextLabel: "Invitations",
  });
  return modal;
}

function invitations() {
  showAppPage(ViewAttractions, { pathname: "/view-attractions" });
  let modal = Tip({
    contents: html`<h2>Invitations</h2>
      <p>This page allows you to view your invitations and attractions.</p>
      <p>
        Clicking on an attraction or invitation lets you see additional details
        and RSVP
      </p>
      <p>There are five responses you can send:</p>
      <ul>
        ${Object.keys(reactions).map((reaction) => {
          return html`<li>
            <span class="noto">${reactions[reaction]}</span>:
            ${reaction.toLowerCase()}
          </li>`;
        })}
      </ul>`,
    prev: prevTip,
    prevLabel: "Attractions",
    next: nextTip,
    nextLabel: "Navigation",
  });

  return modal;
}

function navigation() {
  let modal = Tip({
    contents: html`<h2>Navigation</h2>
      <p>
        Use the bar at the bottom of the screen to access the main pages of the
        app.
      </p>
      <p>
        Click your profile picture for additional pages, such as settings.
      </p>`,
    target: document.querySelector(".app-header #pfp"),
    prev: prevTip,
    prevLabel: "Invitations",
    next: nextTip,
    nextLabel: "Refresh",
  });

  return modal;
}

function refresh() {
  showRefreshPage();
  let modal = Tip({
    contents: html`<h2>Refresh</h2>
      <p>
        When the refresh button appears, that means there are updates that
        aren't being displayed. Click on it to reload the page.
      </p>`,
    target: document.querySelector(".app-header #refresh-page"),
    prev: prevTip,
    prevLabel: "Navigation",
    next: () => {
      closeAll();
      renderPage("/contacts");
    },
    nextLabel: "Let's go!",
  });

  return modal;
}
