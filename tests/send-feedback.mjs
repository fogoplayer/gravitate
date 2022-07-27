const { querySelectorWait, driver, hardTimer } = require("./driver.mjs");

function sendFeedbackTest() {
  describe("Settings", () => {
    test("/settings/send-feedback loads", async () => {
      await driver.get("http://localhost:5000/settings/send-feedback");
      await querySelectorWait(".send-feedback");
      await querySelectorWait(".segment-control");
      await querySelectorWait(".text-input-component");
      await querySelectorWait(".textarea");
      await querySelectorWait("button.primary");
    });
  });
}

exports.sendFeedbackTest = sendFeedbackTest;
