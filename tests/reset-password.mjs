const { querySelectorWait, driver } = require("./driver.mjs");

function resetPasswordTest() {
  describe("Reset Password", () => {
    test("/reset-password loads", async () => {
      await driver.get("http://localhost:5000/reset-password");
      let h1 = await querySelectorWait(".main-bubble h1");
      expect(await h1.getText()).toContain("Reset Password");
    });
  });
}

exports.resetPasswordTest = resetPasswordTest;
