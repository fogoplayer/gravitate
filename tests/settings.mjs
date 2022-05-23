const { querySelectorWait, driver, hardTimer } = require("./driver.mjs");

function settingsTest() {
  describe("Settings", () => {
    test("/settings loads", async () => {
      await driver.get("http://localhost:5000/settings");
      await querySelectorWait(".settings");
    });
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
}

exports.settingsTest = settingsTest;
