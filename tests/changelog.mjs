const { querySelectorWait, driver } = require("./driver.mjs");

function changelogTest() {
  describe("Changelog", () => {
    test("/changelog loads", async () => {
      await driver.get("http://localhost:5000/changelog");
      await querySelectorWait(".changelog");
    });
  });
}

exports.changelogTest = changelogTest;
