import { html, renderPage } from "../services/render.mjs";

export default function Tip({
  target,
  contents = "",
  prev,
  prevLabel = "",
  next,
  nextLabel = "",
}) {
  let VW,
    VH,
    TARGET_CENTER_H,
    TARGET_CENTER_V,
    TARGET_LEFT,
    TARGET_RIGHT,
    direction;

  if (target) {
    VW = document.documentElement.clientWidth;
    VH = document.documentElement.clientHeight;
    TARGET_CENTER_H = target.offsetLeft + target.offsetWidth / 2;
    TARGET_CENTER_V = target.offsetTop + target.offsetHeight / 2;
    TARGET_LEFT = target.offsetLeft;
    TARGET_RIGHT = target.offsetLeft + target.offsetWidth;
    direction = TARGET_CENTER_H < VW / 2 + 100 ? "left" : "right";
  }

  let modal = html`<dialog
    class="tip modal ${target ? "targeted" : ""} ${direction ? direction : ""}"
  >
    <section>
      ${prev
        ? html`<button class="flat" onclick=${prev}>
            <span>
              <span class="material-symbols-sharp"> arrow_back</span>
              ${prevLabel}
            </span>
          </button>`
        : ""}
      <img class="float" src="../../images/cosmo.svg" alt="Cosmo" />
      <main>${contents}</main>
      <button
        class="flat"
        ...${next
          ? { onclick: next }
          : { onclick: () => renderPage("/view-attractions") }}
      >
        <span>
          <span class="material-symbols-sharp"> arrow_forward</span>
          ${nextLabel}
        </span>
      </button>
    </section>
  </dialog>`;
  positionToTarget();
  modal.addEventListener("cancel", (e) => {
    e.preventDefault();
  });

  return modal;

  function positionToTarget() {
    if (!target) return;

    Object.assign(modal.style, {
      inset: "unset",
      maxHeight: VH - TARGET_CENTER_H - 32 + "px",
      right: "32px",
      left: "32px",
    });

    console.log(direction);

    if (direction === "left") {
      modal.style.left = TARGET_RIGHT + "px";
      modal.style.top = TARGET_CENTER_V + "px";
      modal.style.maxWidth = VW - TARGET_RIGHT - 32 + "px";
    } else {
      modal.style.right = VW - TARGET_LEFT + "px"; //"32px";
      modal.style.top = TARGET_CENTER_V + "px";
      modal.style.maxWidth = TARGET_LEFT - 32 + "px";
    }
  }
}
