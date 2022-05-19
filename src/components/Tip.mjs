import { jsx, renderPage } from "../services/render.mjs";

export default function Tip({ target, contents, prev, next }) {
  return jsx`<dialog class="tip modal ${target ? "targeted" : ""}">
  <section>
  ${
    prev
      ? jsx`<button class="flat" onclick=${prev}>
    <span class="material-symbols-sharp"> arrow_back</span>
  </button>`
      : ""
  }
  <img class="float" src="../../images/cosmo.svg" alt="Cosmo" />
  <main>
    
    ${contents}
  </main>
  <button class="flat" ...${
    next
      ? { onclick: next }
      : { onclick: () => renderPage("/view-attractions") }
  }>
    <span class="material-symbols-sharp"> arrow_forward</span>
  </button>
  </section>
</dialog>
`;
}
