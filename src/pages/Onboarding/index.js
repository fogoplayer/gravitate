import { jsx } from "../../services/render.mjs";
import CreateProfile from "./CreateProfile.mjs";
import { Welcome } from "./Welcome.mjs";

export default function Onboarding(context) {
  switch (context.params.page) {
    case "welcome":
      return Welcome();
      break;

    case "create-profile":
      return CreateProfile();
      break;

    default:
      break;
  }
}
