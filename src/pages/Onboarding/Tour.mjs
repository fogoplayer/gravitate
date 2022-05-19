import { showAppPage, showAppShell } from "../../App.mjs";
import Contacts from "../Contacts.mjs";

export default function Tour() {
  showAppShell();

  const tour = [contactsOverview];
  tour[0]();
}

function contactsOverview() {
  showAppPage(Contacts);
}
