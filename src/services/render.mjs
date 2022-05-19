import htm from "../lib/htm.mjs";
export const jsx = htm.bind(render);

export function render(type, props, ...children) {
  this[0] = 3;
  const newEl = document.createElement(type);
  for (const prop in props) {
    if (prop.substring(0, 2) === "on") {
      Object.assign(newEl, { [prop]: props[prop] });
    } else {
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

export function renderPage(url) {
  let link = document.querySelector(`[href="${url}"]`);
  if (link) {
    link.click();
  } else {
    page(url);
  }
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
