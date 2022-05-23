const { querySelectorWait, driver } = require("./driver.mjs");

function loginTest() {
  describe("Login", () => {
    test("/login loads", async () => {
      await driver.get("http://localhost:5000/login");
      let h1 = await querySelectorWait(".main-bubble h1");
      expect(await h1.getText()).toContain("Gravitate");
    });

    test("Logs in successfully", async () => {
      let email = await querySelectorWait("#email");
      let password = await querySelectorWait("#password");
      let submit = await querySelectorWait(".primary");

      await email.sendKeys("zarinloosli+testing@gmail.com");
      await password.sendKeys("Testing123!");
      await submit.click();

      await querySelectorWait("#map");
    }, 10000);
  });
}

exports.loginTest = loginTest;
