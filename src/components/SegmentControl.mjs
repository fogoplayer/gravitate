import { jsx, renderPage } from "../services/render.mjs";

export default function SegmentControl({
  segments = [],
  onchange = (e) => {},
  optionProps = {},
  name = "segment-control-" + document.querySelectorAll(".segment-control"),
  ...props
}) {
  return jsx`<ul class="segment-control" ...${props}>
  ${segments.map(
    (segment) =>
      jsx`<li class="segment"><label>
        <input type="radio" name="${name}" ...${optionProps} value="${segment}"/><div>${segment}</div>
      </label></li>`
  )}
  <div class="highlight" />
</ul>`;

  function onChange(e) {
    // clear current

    e.currentTarget.parentElement;
    onchange(e);
  }
}
