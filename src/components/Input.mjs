import { jsx } from "../services/render.mjs";

export default function Input({
  label,
  ref,
  className = "",
  oninput = () => {},
  ...props
}) {
  className = className.concat(" text-input");
  console.log(oninput, onInput);

  const input = jsx`<label class="text-input-component">
    <span class="text-input-label">${label}</span>
    <div class="text-input-wrapper">
      <input oninput="${onInput}" class=${className} type="text" ...${props}/>
      <button class="show-hide-password" type="button" onclick=${showHidePassword}>
        <span class="material-symbols-sharp show-password">visibility</span>
        <span class="material-symbols-sharp hide-password">visibility_off</span>
      </button>
    </div>
  </label>
`;
  onInput({ target: input.querySelector("input") });
  // Pass reference to object up to calling func
  ref = input;
  return input;

  function onInput(e) {
    console.log("oninput");
    const target = e.target;
    if (target.value) target.parentNode.parentNode.classList.add("not-empty");
    else target.parentNode.parentNode.classList.remove("not-empty");
    oninput(e);
  }

  function showHidePassword(e) {
    if (e.target.parentNode.previousSibling.type === "password")
      e.target.parentNode.previousSibling.type = "text";
    else e.target.parentNode.previousSibling.type = "password";
    e.target.parentNode.previousSibling.focus();
  }
}
