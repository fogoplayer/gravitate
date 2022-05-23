const { querySelectorWait, driver, hardTimer } = require("./driver.mjs");

function settingsTest() {
  describe("Settings", () => {
    test("/settings loads", async () => {
      await driver.get("http://localhost:5000/settings");
      let h1 = await querySelectorWait("h1");
      expect(await h1.getText()).toContain("Settings");
    });
  });

  test("Username updates", async () => {
    const save = await querySelectorWait("button.primary.small");
    let input = await querySelectorWait("#username");
    const value = await input.getAttribute("value");
    console.log(JSON.stringify(value));
    const newName = value !== "User1" ? "User1" : "User3";
    console.log(newName);
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
