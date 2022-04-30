export function render(type, props, ...children) {
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
  console.log(element);
  // if array of elements, recurse through array
  if (typeof element === "array") {
    element.forEach(el => {
      append(el, parent);
    });
    return;
  }

  // Otherwise just append
  parent.append(element);
};