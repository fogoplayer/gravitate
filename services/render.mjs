export default function render(type, props, ...children) {
  const newEl = document.createElement(type);
  Object.assign(newEl, props);
  if (children) {
    newEl.append(children);
  }
  return newEl;
}