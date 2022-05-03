import { html } from "../services/render.mjs";

export default function TextInput({ label, ref, oninput = () => { }, ...props }) {

  const input = html`<label classList="text-input-wrapper"
  ><span classList="text-input-label">${label}</span><input oninput=${onInput}classList="text-input" type="text" ...${props}
/></label>
`;
  onInput({ target: input.querySelector("input") });
  // Pass reference to object up to calling func
  ref = input;
  return input;

  function onInput(e) {
    const target = e.target;
    if (target.value) target.parentNode.classList.add("not-empty");
    else target.parentNode.classList.remove("not-empty");
    oninput(e);
  }
}
