import { html } from "../services/render.mjs";

export default function SegmentControl({
  segments = [],
  onchange = () => {},
  optionProps = {},
  name = "segment-control-" + document.querySelectorAll(".segment-control"),
  ...props
}) {
  return html`<ul class="segment-control" ...${props}>
    ${segments.map(
      (segment, index) =>
        html`<li class="segment">
          <label>
            <input
              type="radio"
              name="${name}"
              ...${index === 0
                ? {
                    ...optionProps,
                    checked: true,
                  }
                : optionProps}
              value="${segment}"
              onchange=${onChange}
            />
            <div>${segment}</div>
          </label>
        </li>`
    )}
    <div class="highlight" />
  </ul>`;

  function onChange(e) {
    // clear current

    e.currentTarget.parentElement;
    onchange(e);
  }
}
