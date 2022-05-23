import { jsx } from "../../services/render.mjs";

export default function ContactDetails(context) {
  const { type, id } = context.params;
  switch (type) {
    case "friend":
      return FriendPage(id);
      break;

    default:
      return "";
      break;
  }
}
