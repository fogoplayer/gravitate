import { jsx, renderPage } from "../services/render.mjs";

export default function SegmentControl({
  segments = [],
  onchange = () => {},
  optionProps = {},
  name = "segment-control-" + document.querySelectorAll(".segment-control"),
  ...props
}) {
  return jsx`<ul class="segment-control" ...${props}>
  ${segments.map(
    (segment) =>
      jsx`<li class="segment"><input type="radio" name="${name}" ...${optionProps} value="${segment}"/>${segment}</li>`
  )}
</ul>`;
}
