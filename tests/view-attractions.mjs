const { querySelectorWait, driver } = require("./driver.mjs");

function viewAttractionsTest() {
  describe("View Attractions", () => {
    test("/view-attractions loads", async () => {
      await driver.get("http://localhost:5000/view-attractions");
      let map = await querySelectorWait("#map");
    });
  });
}

exports.viewAttractionsTest = viewAttractionsTest;
