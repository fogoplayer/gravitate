export function render(type, props, ...children) {
  const newEl = document.createElement(type);
  Object.assign(newEl, props);
  if (children) {
    console.log(children);
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
      console.log(element[el]);
      append(parent, element[el]);
    };
    return;
  }

  // Otherwise just append
  parent.append(element);
};