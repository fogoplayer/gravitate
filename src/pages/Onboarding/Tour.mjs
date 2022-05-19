import { showAppPage, showAppShell } from "../../App.mjs";
import Tip from "../../components/Tip.mjs";
import { append, jsx } from "../../services/render.mjs";
import Contacts from "../Contacts.mjs";

export default function Tour() {
  showAppShell();

  const tour = [contactsOverview()];
  append(document.body, tour);

  showTourTip(tour[0]);
  return "";
}

function showTourTip(tip) {
  closeAll();
  tip.showModal();
}

function closeAll() {
  let openTips = document.querySelectorAll(".tip[open]");
  Array.from(openTips).forEach((dialog) => dialog.close());
}

function contactsOverview() {
  let modal = Tip({
    contents: jsx`<p>Gravitate exists to help you organize spur-of-the-moment events with your friends and family members.</p>
<p>Let's start with how those friends and family members are organized!</p>`,
  });
  modal._showModal = modal.showModal;
  modal.showModal = () => {
    showAppPage(Contacts, { pathname: "/contacts" });
    modal._showModal();
  };
  return modal;
}
