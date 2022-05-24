import { setPageTitle } from "../components/AppShell.mjs";
import { jsx } from "../services/render.mjs";

export default function Changelog() {
  setPageTitle("Changelog");
  return jsx`<div class="changelog">
  <section>
    <h2>Alpha Release</h2>
    <h3>1.4.1</h3>
    <ul>
      <li>PFP full screen popup</li>
      <li>Button to add system members as friends</li>
      <li>Make icon inputs noto</li>
      <li>Remove member picker from system creator</li>
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
</div>
`;
}
