const { driver, querySelectorWait, hardTimer } = require("../driver.mjs");

function tourTest() {
  describe("Tour", () => {
    test("/onboarding/tour-offer loads", async () => {
      await driver.get("http://localhost:5000/onboarding/tour-offer");
      let h1 = await querySelectorWait(".main-bubble h1");
      expect(await h1.getText()).toBe("Would you like a tour?");
    });

    test("Skip works", async () => {
      let skip = await querySelectorWait(".button.flat");
      await skip.click();
      await querySelectorWait("#map");
    });

    test("Starting tour works", async () => {
      await driver.get("http://localhost:5000/onboarding/tour-offer");
      let takeATour = await querySelectorWait(".button.primary");
      await takeATour.click();
      await querySelectorWait(".tip");
    });

    test("Tips work", async () => {
      while (
        (await driver.getCurrentUrl()) ===
        "http://localhost:5000/onboarding/tour"
      ) {
        let next = await querySelectorWait("dialog[open] main + button.flat");
        await next.click();
      }
      await querySelectorWait(".contacts-list");
      expect(await driver.getCurrentUrl()).toBe(
        "http://localhost:5000/contacts"
      );
    }, 10000);
  });
}

exports.tourTest = tourTest;
