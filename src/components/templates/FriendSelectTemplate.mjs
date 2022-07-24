import { getIcon } from "../../services/firebase/storage.mjs";
import { html } from "../../services/render.mjs";

export function FriendSelectTemplate(user, props = {}) {
  return html`<li>
    <label class="contact-header-container">
      <input
        type="radio"
        id="${user.name}"
        value="${user.ref}"
        tabindex="0"
        ...${props}
      />
      ${getIcon(user.icon)}
      <span class="contact-name">${user.name}</span>
    </label>
  </li>`;
}
