import { setPageTitle } from "../../components/AppShell.mjs";
import { jsx } from "../../services/render.mjs";
import FriendPage from "./FriendPage.mjs";
import OrbitPage from "./OrbitPage.mjs";
import SystemPage from "./SystemPage.mjs";

export default function ContactPage(context) {
  setPageTitle("Contacts");
  const { type, id } = context.params;

  return jsx`<div class="contact-page">${(() => {
    switch (type) {
      case "friends":
        return FriendPage(id);

      case "orbits":
        return OrbitPage(id);

      case "systems":
        return SystemPage(id);

      default:
        return "";
        break;
    }
  })()}</div>`;
}
