const { By, Key } = require("selenium-webdriver");
const { querySelectorWait, driver, hardTimer } = require("./driver.mjs");

let currTime;

function createAttractionTest() {
  describe("Create Attractions", () => {
    test("/create-attraction loads", async () => {
      await driver.get("http://localhost:5000/create-attraction");
      let map = await querySelectorWait("#map");
    });

    test("Form submits", async () => {
      let name = await querySelectorWait("#event-name");
      let location = await querySelectorWait("#event-location");
      let expiration = await querySelectorWait("#expiration-time");
      let system = await querySelectorWait(
        ".contacts-list .systems-wrapper > ul .contact-header-container"
      );
      let submit = await querySelectorWait("#submit-button");

      // Fill out form
      currTime = Date.now().toString();
      await name.sendKeys(currTime);
      await location.sendKeys(
        "1600 Amphitheatre Parkway, Mountain View, CA 94043"
      );
      await expiration.sendKeys(
        Key.DOWN,
        Key.TAB,
        Key.DOWN,
        Key.TAB,
        Key.DOWN
        // (new Date().getHours() % 12 < 1 ? 1 : new Date().getHours() % 12) +
        //   ":" +
        //   (new Date().getMinutes().length > 1
        //     ? ""
        //     : "0" + new Date().getMinutes() + 2) +
        //   (new Date().getHours() < 12 ? "AM" : "PM")
      );
      await system.click();

      // Submit
      await submit.click();
      await hardTimer(500);
      await querySelectorWait("#map");
    }, 10000);

    test("Shows up in viewAttractions", async () => {
      await hardTimer(1000);
      await driver.get("http://localhost:5000/view-attractions");
      await querySelectorWait("#map");
      let elements = await driver.findElements(By.css(".contact-name"));
      for (let el = 0; el < elements.length; el++) {
        elements[el] = await elements[el].getText();
      }
      elements = elements.filter((el) => {
        return el === currTime;
      });
      expect(elements.length).toEqual(2);
    }, 15000);
  });
}

exports.createAttractionTest = createAttractionTest;
