import { html } from "../services/render.mjs";

export default function TextInput({ label, ...props }) {
  return html`<label classList="text-input-wrapper"
  ><span classList="text-input-label">${label}</span><input oninput=${onInput}classList="text-input" type="text" ...${props}
/></label>
`;
}
function onInput(e) {
  const target = e.target;
  if (target.value) target.parentNode.classList.add("not-empty");
  else target.parentNode.classList.remove("not-empty");
}