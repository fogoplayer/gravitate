const { querySelectorWait, driver } = require("./driver.mjs");

function signupTest() {
  describe("Signup", () => {
    test("/signup loads", async () => {
      await driver.get("http://localhost:5000/signup");
      let h1 = await querySelectorWait("h1");
      expect(await h1.getText()).toContain("Gravitate");
    });
  });
}

exports.signupTest = signupTest;
