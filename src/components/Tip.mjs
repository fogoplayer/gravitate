import { jsx, renderPage } from "../services/render.mjs";

export default function Tip({
  target,
  contents = "",
  prev,
  prevLabel = "",
  next,
  nextLabel = "",
}) {
  console.log(target);
  let modal = jsx`<dialog class="tip modal ${target ? "targeted" : ""}">
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
  positionToTarget();
  return modal;

  function positionToTarget() {
    if (!target) return;

    const VW = document.documentElement.clientWidth;
    const TARGET_CENTER_H = target.offsetLeft + target.offsetWidth / 2;
    const TARGET_CENTER_V = target.offsetTop + target.offsetHeight / 2;
    Object.assign(modal.style, {
      inset: "unset",
      top: TARGET_CENTER_V + "px",
      left: TARGET_CENTER_H + "px",
    });
  }
}
