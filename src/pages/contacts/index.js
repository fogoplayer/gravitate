import { setPageTitle } from "../../components/AppShell.mjs";
import { jsx } from "../../services/render.mjs";
import FriendPage from "./FriendPage.mjs";

export default function ContactPage(context) {
  setPageTitle("Contacts");
  const { type, id } = context.params;

  return jsx`<div class="contact-page">${(() => {
    switch (type) {
      case "friends":
        return FriendPage(id);
        break;

      default:
        return "";
        break;
    }
  })()}</div>`;
}
