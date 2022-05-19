import { jsx, renderPage } from "../services/render.mjs";

export default function Tip({
  target,
  contents = "",
  prev,
  prevLabel = "",
  next,
  nextLabel = "",
}) {
  return jsx`<dialog class="tip modal ${target ? "targeted" : ""}">
  <section>
  ${
    prev
      ? jsx`<button class="flat" onclick=${prev}>
    <span>
      <span class="material-symbols-sharp"> arrow_back</span>
      ${prevLabel}
    </span>
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
    <span>
      <span class="material-symbols-sharp"> arrow_forward</span> 
      ${nextLabel} 
    </span>
  </button>
  </section>
</dialog>
`;
}
