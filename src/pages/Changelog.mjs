import { jsx } from "../services/render.mjs";

export default function Changelog() {
  return jsx`<div class="changelog">
  <h2>Changelog</h2>
  <section>
    <h3>Alpha Release</h3>
    <h4>1.1.0</h4>
    <ul>
      <li>Add changelog</li>
    </ul>
    
    <h4>1.0.0</h4>
    <ul>
      <li>Alpha release</li>
    </ul>
  </section>
</div>`;
}
