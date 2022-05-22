const { querySelectorWait, driver } = require("../driver.mjs");

function createProfileTest() {
  describe("Signup", () => {
    test("/signup loads", async () => {
      await driver.get("http://localhost:5000/onboarding/create-profile");
      let h1 = await querySelectorWait("h1");
      expect(await h1.getText()).toContain("Create your profile");
    });
  });
}

exports.createProfileTest = createProfileTest;
