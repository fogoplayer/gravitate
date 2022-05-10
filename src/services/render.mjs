import htm from "https://unpkg.com/htm?module";
export const jsx = htm.bind(render);

export function render(type, props, ...children) {
  this[0] = 3;
  const newEl = document.createElement(type);
  for (const prop in props) {
    try {
      Object.assign(newEl, { [prop]: props[prop] });
    } catch {
      newEl.setAttribute(prop, props[prop]);
    }
  }
  if (children) {
    children.forEach((child) => {
      append(newEl, child);
    });
  }
  return newEl;
}

export function append(parent, element) {
  // if array of elements, recurse through array
  if (Array.isArray(element)) {
    for (const el in element) {
      append(parent, element[el]); // contains something other than whitespace
    }
    return;
  }

  // Otherwise just append
  parent.append(element);
}
