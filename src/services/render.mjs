import htm from "https://unpkg.com/htm?module";
export const html = htm.bind(render);

export function render(type, props, ...children) {
  this[0] = 3;
  const newEl = document.createElement(type);
  Object.assign(newEl, props);
  if (children) {
    children.forEach(child => {
      newEl.append(child);
    });
  }
  return newEl;
}

export function append(parent, element) {
  // if array of elements, recurse through array
  if (element[0]) {
    for (const el in element) {
      append(parent, element[el]);
    };
    return;
  }

  // Otherwise just append
  parent.append(element);
};