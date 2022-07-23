import { html } from "../../services/render.mjs";
import CreateProfile from "./CreateProfile.mjs";
import Tour from "./Tour.mjs";
import TourOffer from "./TourOffer.mjs";
import Welcome from "./Welcome.mjs";

export default function Onboarding(context) {
  switch (context.params.page) {
    case "welcome":
      return Welcome();
      break;

    case "create-profile":
      return CreateProfile();
      break;

    case "tour-offer":
      return TourOffer();
      break;

    case "tour":
      return Tour();
      break;

    default:
      return "";
      break;
  }
}
