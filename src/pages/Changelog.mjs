import { jsx } from "../services/render.mjs";

export default function Changelog() {
  return jsx`<div class="changelog">
  <h2>Changelog</h2>
  <section>
    <h3>Alpha Release</h3>
    <h4>1.3.0</h4>
    <ul>
      <li>Move navigation into button on profile picture.</li>
    </ul>
    <h4>1.2.0</h4>
    <ul>
      <li>Added settings page</li>
    </ul>
    <h4>1.1.1</h4>
    <ul>
      <li>Create an end-to-end testing suite to validate future releases</li>
      <li>Run tests when pull requests are opened</li>
    </ul>
    <h4>1.1.0</h4>
    <ul>
      <li>Add changelog</li>
    </ul>

    <h4>1.0.0</h4>
    <ul>
      <li>Alpha release</li>
    </ul>
  </section>
</div>
`;
}
