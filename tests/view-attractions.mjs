const { querySelectorWait, driver } = require("./driver.mjs");

function viewAttractionsTest() {
  describe("View Attractions", () => {
    test("/view-attractions loads", async () => {
      await driver.get("http://localhost:5000/view-attractions");
      let map = await querySelectorWait("#map");
    });

    test("Attraction modal opens and closes", async () => {
      let attraction = await querySelectorWait(
        ".attractions-wrapper .attraction"
      );
      attraction.click();
      let close = await querySelectorWait("dialog[open] button.primary");
      close.click();
    });
    test("Invitation modal opens and closes", async () => {
      let invitation = await querySelectorWait(".systems-wrapper .attraction");
      invitation.click();
      let close = await querySelectorWait("dialog[open] button.primary");
      close.click();
    });
  });
}

exports.viewAttractionsTest = viewAttractionsTest;
