import { jsx } from "../../services/render.mjs";

export default function Welcome() {
  return jsx`<main class="main-bubble modal">
  <img src="../../images/cosmo.svg" class="cosmo-img" alt="Cosmo waving" />
  <h1>Welcome to Gravitate!</h1>
  <p>
    Hi! My name's Cosmo, and I'd like to personally welcome you to Gravitate!
  </p>
  <p>
    My job is to help you get started, and to show you the ropes around here.</p>
  <p>
    It might feel like a lot, but I promise--you'll get the hang of it before too
    long!
  </p>
  <p>
    First, let's create a username and profile so that your friends can connect
    with you!
  </p>
  <a class="button primary" href="create-profile">Continue</a>
</main>
`;
}
