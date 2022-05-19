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
  let modal = Tip({ contents: "Hello world" });
  modal._showModal = modal.showModal;
  modal.showModal = () => {
    showAppPage(Contacts, { pathname: "/contacts" });
    modal._showModal();
  };
  return modal;
}
