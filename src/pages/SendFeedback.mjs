import Input from "../../components/Input.mjs";
import { getCurrentUser } from "../../services/firebase/auth.mjs";
import {
  afterUpdate,
  getCurrUserData,
  update,
  usernameSearch,
} from "../../services/firebase/db.mjs";
import { uploadPFP } from "../../services/firebase/storage.mjs";
import { html, renderPage } from "../../services/render.mjs";
import { setPageTitle } from "../components/AppShell.mjs";
import Modal from "../components/Modal.mjs";
import SegmentControl from "../components/SegmentControl.mjs";
import { addDoc, setDoc } from "../services/firebase/db.mjs";
import {
  copyInviteLinkToClipboard,
  createNewInviteLinkAt,
  deleteInviteLinkFrom,
  shareInviteLink,
} from "../services/invite-codes.mjs";

export default function SendFeedback() {
  setPageTitle("Send Feedback");

  let page, shortDescription, longDescription;

  return html`<form class="send-feedback" onsubmit="${onSubmit}">
    ${SegmentControl({
      segments: ["Bug Report", "Feature Request", "Other"],
    })}
    ${Input({
      label: "Relevant Page (Optional)",
      oninput(e) {
        page = e.target.value;
      },
    })}
    ${Input({
      label: "Short Description",
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
    const { email, ...user } = getCurrentUser();
    let { uid } = getCurrUserData();
    const report = {
      complete: false,
      uid,
      email,
      userAgent: navigator.userAgent,
      timestamp: new Date(),
      page,
      shortDescription,
      longDescription,
    };
    // addDoc("tickets/", report);

    const address = "zarinloosli@gmail.com";
    const subject = "Gravitate Bug Report";
    const body =
      "Report Data:%0D%0A%0D%0A" +
      JSON.stringify(report)
        .replace(/[\{\}]/g, "") // remove braces
        .replace(/\"/g, "") // remove quotes
        .replace(/\,/g, "%0D%0A"); // add line breaks
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
