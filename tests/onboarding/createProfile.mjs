const { querySelectorWait, driver } = require("../driver.mjs");

function createProfileTest() {
  describe("Create Profile", () => {
    test("/onboarding/create-profile loads", async () => {
      await driver.get("http://localhost:5000/onboarding/create-profile");
      let h1 = await querySelectorWait(".main-bubble h1");
      expect(await h1.getText()).toContain("Create your profile");
    });
  });
}

exports.createProfileTest = createProfileTest;
