import { jsx } from "../../services/render.mjs";
import CreateProfile from "./CreateProfile.mjs";

export default function Onboarding(context) {
  switch (context.params.page) {
    case "create-profile":
      return CreateProfile();
      break;

    default:
      break;
  }
}