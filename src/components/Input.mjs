import { jsx } from "../services/render.mjs";

export default function Input({
  label,
  ref,
  className = "",
  oninput = () => {},
  errorMessage = "",
  ...props
}) {
  className = className.concat(" text-input");

  const input = jsx`<label class="text-input-component">
    <span class="text-input-label">${label}</span>
    <div class="text-input-wrapper">
      <input oninput="${onInput}" class=${className} type="text" ...${props}/>
      <button class="show-hide-password" type="button" onclick=${showHidePassword}>
        <span class="material-symbols-sharp show-password">visibility</span>
        <span class="material-symbols-sharp hide-password">visibility_off</span>
      </button>
    </div>
    ${
      errorMessage
        ? jsx`<span class="error-message">${errorMessage}</span>`
        : ""
    }
  </label>
`;

  onInput({ target: input.querySelector("input") });
  return input;

  function onInput(e) {
    const target = e.target;
    const component = target.parentNode.parentNode;
    if (target.value) {
      component.classList.add("not-empty");
      component.classList.remove("invalid");
    } else target.parentNode.parentNode.classList.remove("not-empty");
    oninput(e);
  }

  function showHidePassword(e) {
    if (e.target.parentNode.previousSibling.type === "password")
      e.target.parentNode.previousSibling.type = "text";
    else e.target.parentNode.previousSibling.type = "password";
    e.target.parentNode.previousSibling.focus();
  }
}
