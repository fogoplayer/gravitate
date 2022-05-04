import { html } from "../services/render.mjs";

export default function TextInput({ label, ref, classList = "", oninput = () => { }, ...props }) {
  classList = classList.concat(" text-input");

  const input = html`<label classList="text-input-component">
    <span classList="text-input-label">${label}</span>
    <div classList="text-input-wrapper">
      <input oninput=${onInput} classList=${classList} type="text" ...${props}/>
      <button classList="show-hide-password" type="button" onclick=${showHidePassword}>
        <span classList="material-symbols-sharp show-password">visibility</span>
        <span classList="material-symbols-sharp hide-password">visibility_off</span>
      </button>
    </div>
  </label>
`;
  onInput({ target: input.querySelector("input") });
  // Pass reference to object up to calling func
  ref = input;
  return input;

  function onInput(e) {
    const target = e.target;
    if (target.value) target.parentNode.parentNode.classList.add("not-empty");
    else target.parentNode.parentNode.classList.remove("not-empty");
    oninput(e);
  }

  function showHidePassword(e) {
    if (e.target.parentNode.previousSibling.type === "password")
      e.target.parentNode.previousSibling.type = "text";
    else
      e.target.parentNode.previousSibling.type = "password";
    e.target.parentNode.previousSibling.focus();
  }
}
