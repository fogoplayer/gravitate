import { html } from "../services/render.mjs";

export default function Modal({ contents, ...props }) {
  return html`<dialog class="modal" onclick=${onClick} ...${props}>
    <section class="modal-contents">${contents}</section>
  </dialog>`;

  function onClick(e) {
    onclick = (e) => {
      if (e.target.classList.contains("modal")) {
        e.preventDefault();
        e.target.classList.add("closing");
        setTimeout(() => {
          e.target.close();
          e.target.classList.remove("closing");
        }, 250);
      }
    };
  }
}
