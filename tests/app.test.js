const { Builder, By } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome.js");
const loginTest = require("./login.mjs");

describe("test block", () => {
  test("jest is running", () => {
    expect(1 + 1).toEqual(2);
  });
});

(async function () {
  /////////////////
  // Global Vars //
  /////////////////

  const ROOT_URL = "http://localhost:5000/";
  let driver;

  // Default User Agent
  const IPHONE_WIDTH = 414;
  const IPHONE_DIMENSIONS = `--window-size=${IPHONE_WIDTH},${3 * IPHONE_WIDTH}`;

  let options = new chrome.Options();
  options.addArguments("--headless");
  options.addArguments(IPHONE_DIMENSIONS);
  driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();

  ////////////////////
  // External Pages //
  ////////////////////
  await driver.get("google.com");

  await loginTest(driver);

  await driver.quit();
})();
