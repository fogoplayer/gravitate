import { jsx } from "../services/render.mjs";

export default function Tip({ target, contents, prev, next }) {
  return jsx`<dialog class="tip">
  <img src="../../images/cosmo.svg" alt="Cosmo" />
  ${contents}
</dialog>`;
}
