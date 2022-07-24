import { setPageTitle } from "../../components/AppShell.mjs";
import { html } from "../../services/render.mjs";

export default function TourOffer() {
  setPageTitle("Tour");
  return html`<main class="main-bubble modal">
    <img src="../../images/cosmo.svg" class="cosmo-img" alt="Cosmo waving" />
    <h1>Would you like a tour?</h1>
    <p>I can explain some of the terms we use here that might be unfamiliar.</p>
    <p>
      I can also show you the different pages in the app and what they're each
      used for!
    </p>
    <p>And you can always take the tour later if you're in a hurry now.</p>
    <p>What do you say?</p>
    <div>
      <a class="button primary" href="tour">Take a Tour</a>
      <a class="button flat" href="/view-attractions">Skip</a>
    </div>
  </main>`;
}
