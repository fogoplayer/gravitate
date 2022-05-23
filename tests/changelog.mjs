const { querySelectorWait, driver } = require("./driver.mjs");

function changelogTest() {
  describe("Changelog", () => {
    test("/changelog loads", async () => {
      await driver.get("http://localhost:5000/changelog");
      let h1 = await querySelectorWait("h2");
      expect(await h1.getText()).toContain("Changelog");
    });
  });
}

exports.changelogTest = changelogTest;
