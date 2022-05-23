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
  modal.addEventListener("cancel", (e) => {
    e.preventDefault();
  });

  return modal;

  function positionToTarget() {
    if (!target) return;

    const VH = document.documentElement.clientHeight;
    const VW = document.documentElement.clientWidth;
    const TARGET_CENTER_H = target.offsetLeft + target.offsetWidth / 2;
    const TARGET_CENTER_V = target.offsetTop + target.offsetHeight / 2;
    const TARGET_LEFT = target.offsetLeft;
    const TARGET_RIGHT = target.offsetLeft + target.offsetWidth;

    console.log(
      "TARGET_CENTER_H",
      target.offsetLeft + target.offsetWidth / 2,
      "TARGET_LEFT",
      target.offsetLeft,
      "TARGET_RIGHT",
      target.offsetLeft + target.offsetWidth,
      "TARGET_CENTER_V",
      target.offsetTop + target.offsetHeight / 2
    );

    let x, y, maxHeight, maxWidth;

    if (TARGET_CENTER_H < VW / 2) {
      x = TARGET_RIGHT + "px";
      y = TARGET_CENTER_V + "px";
      maxWidth = VW - TARGET_RIGHT - 32 + "px";
    } else {
      x = VW - TARGET_LEFT - 32 + "px";
      y = TARGET_CENTER_V + "px";
      maxWidth = TARGET_LEFT - 32 + "px";
    }

    maxHeight = VH - parseInt(y) - 32 + "px";

    Object.assign(modal.style, {
      inset: "unset",
      top: y,
      left: x,
      maxWidth: maxWidth,
      maxHeight: maxHeight,
    });
  }
}
