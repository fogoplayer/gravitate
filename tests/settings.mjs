const { querySelectorWait, driver, hardTimer } = require("./driver.mjs");

function settingsTest() {
  describe("Settings", () => {
    test("/settings loads", async () => {
      await driver.get("http://localhost:5000/settings");
      await querySelectorWait(".contact-page");
    });

    test("Username updates", async () => {
      const save = await querySelectorWait("button.primary.small");
      let input = await querySelectorWait("#username");
      const value = await input.getAttribute("value");
      const newName = value !== "User1" ? "User1" : "User3";
      await input.clear();
      await input.sendKeys(newName);
      await save.click();
      await hardTimer(500);
      await driver.get("http://localhost:5000/settings");
      input = await querySelectorWait("#username");
      expect(await input.getAttribute("value")).toEqual(newName);
    });

    test("Invite link can be generated", async () => {
      let createLink = await querySelectorWait("#create-link");
      await createLink.click();
      const closePopup = await querySelectorWait("#submit-code");
      await closePopup.click();
      await querySelectorWait(".link-text");
    });

    test("Invite link can be deleted", async () => {
      let deleteLink = await querySelectorWait("#delete-link");
      await deleteLink.click();
      await querySelectorWait("#create-link");
    });
  });
}

exports.settingsTest = settingsTest;
