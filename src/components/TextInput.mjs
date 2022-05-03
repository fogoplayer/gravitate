import { html } from "../services/render.mjs";

export default function TextInput({ label, oninput = () => { }, ...props }) {

  const input = html`<label class="text-input-wrapper"
  ><span class="text-input-label">${label}</span><input oninput=${onInput}class="text-input" type="text" ...${props}
/></label>
`;
  onInput({ target: input.querySelector("input") });
  return input;

  function onInput(e) {
    const target = e.target;
    if (target.value) target.parentNode.classList.add("not-empty");
    else target.parentNode.classList.remove("not-empty");
    oninput(e);
  }
}
