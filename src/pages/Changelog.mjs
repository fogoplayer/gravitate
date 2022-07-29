import { setPageTitle } from "../components/AppShell.mjs";
import { html } from "../services/render.mjs";

export default function Changelog() {
  setPageTitle("Changelog");
  return html`<div class="changelog">
    <section>
      <h2>Beta Releases</h2>
      <h3>2.0.0</h3>
      <ul>
        <li>
          Production version of the site is now available at ${""}
          <a href="gravitate.zarinloosli.com">gravitate.zarinloosli.com</a>
        </li>
      </ul>
      <p>
        Thank you to everyone who installed the Gravitate beta! I wanted to
        briefly explain why I'm calling this a "beta":
      </p>
      <p>
        This version of Gravitate should be complete and relatively bug-free. As
        you can see below, I've put a lot of work into patching bugs, as well as
        creating the features necessary for the app to be usable in its current
        state.
      </p>
      <p>
        However, we are still a long way from what I would consider "finished."
        Everything from small tweaks to whole new features.
      </p>
      <p>
        I'm opening this to public beta for two reasons: first, I'm proud of the
        work I've done here and want to be able to use it with my friends and
        family! And second, now that the app's feature set is ready for the
        real-world, I want to make sure it works in the real world before I go
        building anything new.
      </p>
      <p>
        Please submit bugs and ideas for new features using the form in the
        settings page. I'm excited to see what this will become!
      </p>
      <h2>Alpha Releases</h2>
      <h3>1.8.1 <span class="date">7/28/22</span></h3>
      <ul>
        <li>Prepare for beta release</li>
        <li>Explain required permissions in tour</li>
        <li>Require a friend to be selected in Add Friend popup</li>
        <li>Compress profile pictures on upload</li>
        <li>
          Creating an attraction that you are invited to no longer crashes the
          app, though a refresh will be required as the page loads prematurely
        </li>
        <li>Add the profile picture of the creator on the attractions list</li>
      </ul>
      <h3>1.8.0 <span class="date">7/26/22</span></h3>
      <ul>
        <li>Add forgot password page</li>
        <li>Add user feedback page, accessible from settings</li>
      </ul>
      <h3>1.7.1 <span class="date">7/25/22</span></h3>
      <ul>
        <li>Radio labels fill background</li>
        <li>Focus state for contactlist buttons</li>
        <li>Add shadow to overflow menu</li>
        <li>Include dates in changelog entries</li>
      </ul>
      <h3>1.7.0</h3>
      <ul>
        <li>Add map icons for the Attractions and Create Attractions pages</li>
        <li>Self-host all remaining fonts</li>
      </ul>
      <h3>1.6.0</h3>
      <ul>
        <li>Use abbreviated invite links for easier sharing</li>
        <li>Improved loading times by nearly 100%</li>
        <li>
          DevEx improvements:
          <ul>
            <li>
              Added compatibility with tools for syntax highlighting lit-element
            </li>
            <li>Bug fixes for testing suite</li>
          </ul>
        </li>
      </ul>
      <h3>1.5.0</h3>
      <ul>
        <li>
          The settings page lets you generate a link for people to add you as a
          friend
        </li>
        <li>
          System pages let you generate a link for people to join the system
        </li>
        <li>
          Switch attraction details to a popup for a less jarring transition
        </li>
      </ul>
      <h3>1.4.2</h3>
      <ul>
        <li>Self-host more fonts and libraries</li>
        <li>Allow invitations from fellow system members</li>
      </ul>
      <h3>1.4.1</h3>
      <ul>
        <li>
          Clicking on a friend's pfp opens it in full screen. Clicking again
          closes it.
        </li>
        <li>
          System members that aren't your friends now have a button to add them.
        </li>
        <li>
          Remove member selection from system creator. Members now have to add
          themselves to systems.
        </li>
        <li>Add a back button to non-root routes</li>
        <li>Fix tabindexes</li>
        <li>The browser title and header can now be set independently.</li>
        <li>Contact pages now use IDs instead of names for routing</li>
        <li>Add tour for user pages</li>
      </ul>
      <h3>1.4.0</h3>
      <ul>
        <li>Create pages where orbits, systems, and friens can be edited</li>
        <li>Update footer link active state</li>
      </ul>
      <h3>1.3.1</h3>
      <ul>
        <li>Add Roboto Slab theme font</li>
        <li>Add page titles</li>
        <li>Update testing command</li>
      </ul>
      <h3>1.3.0</h3>
      <ul>
        <li>Move navigation into button on profile picture.</li>
        <li>Fix tour on smaller screens</li>
      </ul>
      <h3>1.2.0</h3>
      <ul>
        <li>Add settings page</li>
      </ul>
      <h3>1.1.1</h3>
      <ul>
        <li>Create an end-to-end testing suite to validate future releases</li>
        <li>Run tests when pull requests are opened</li>
      </ul>
      <h3>1.1.0</h3>
      <ul>
        <li>Add changelog</li>
      </ul>

      <h3>1.0.0</h3>
      <ul>
        <li>Alpha release</li>
      </ul>
    </section>
  </div>`;
}
