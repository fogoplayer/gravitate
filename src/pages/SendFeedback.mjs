import Input from "../../components/Input.mjs";
import { getCurrentUser } from "../../services/firebase/auth.mjs";
import { getCurrUserData } from "../../services/firebase/db.mjs";
import { html } from "../../services/render.mjs";
import { setPageTitle } from "../components/AppShell.mjs";
import SegmentControl from "../components/SegmentControl.mjs";
import { addDoc } from "../services/firebase/db.mjs";

export default function SendFeedback() {
  setPageTitle("Feedback");

  let type, page, shortDescription, longDescription;
  type = page = shortDescription = longDescription = "";

  return html`<form class="send-feedback" onsubmit="${onSubmit}">
    ${SegmentControl({
      segments: ["Bug Report", "Feature Request", "Other"],
      onchange(e) {
        type = e.target.value;
      },
    })}
    ${Input({
      label: "Relevant Page (Optional)",
      id: "page",
      oninput(e) {
        page = e.target.value;
      },
    })}
    ${Input({
      label: "Short Description",
      id: "short-description",
      oninput(e) {
        shortDescription = e.target.value;
      },
    })}
    <div class="textarea">
      <label class="text-input-component">
        <span class="text-input-label">Detailed Description</span>
        <div class="text-input-wrapper">
          <textarea
            class="text-input"
            id="description"
            oninput="${textAreaMaintainer}"
          ></textarea>
        </div>
      </label>
    </div>
    <button class="primary">Send report</button>
  </form>`;

  async function onSubmit(e) {
    e.preventDefault();

    // Firebase
    const { email } = getCurrentUser();
    let { uid } = getCurrUserData();
    const report = {
      type,
      complete: false,
      uid,
      email,
      userAgent: navigator.userAgent,
      timestamp: new Date(),
      page,
      shortDescription,
      longDescription,
    };
    addDoc("tickets/", report);

    const address = "zarinloosli@gmail.com";
    const subject = "Gravitate Bug Report";
    const body =
      "Report Data:%0D%0A%0D%0A" +
      JSON.stringify(report)
        .replace(/[{}]/g, "") // remove braces
        .replace(/"/g, "") // remove quotes
        .replace(/,/g, "%0D%0A"); // add line breaks
    console.log(body);
    // Email
    window.open(`mailto:${address}?subject=${subject}&body=${body}`, "_blank");
  }

  function textAreaMaintainer(e) {
    const target = e.target;
    longDescription = e.target.value;
    const component = target.parentNode.parentNode;
    if (target.value) {
      component.classList.add("not-empty");
      component.classList.remove("invalid");
    } else target.parentNode.parentNode.classList.remove("not-empty");
  }
}
