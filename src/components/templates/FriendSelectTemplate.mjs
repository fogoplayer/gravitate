import { getIcon } from "../../services/firebase/storage.mjs";
import { jsx } from "../../services/render.mjs";

export function FriendSelectTemplate(user, props = {}) {
  return jsx`<li>
  <label class="contact-header-container">
    <input
      type="checkbox"
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
