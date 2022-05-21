const { Builder, By } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome.js");
const { loginTest } = require("./login.mjs");

const ROOT_URL = "http://localhost:5000/";
let driver;

// Default User Agent
const IPHONE_WIDTH = 414;
const IPHONE_DIMENSIONS = `--window-size=${IPHONE_WIDTH},${3 * IPHONE_WIDTH}`;

let options = new chrome.Options();
// options.addArguments("--headless");
options.addArguments(IPHONE_DIMENSIONS);
driver = new Builder().forBrowser("chrome").setChromeOptions(options).build();

test("Driver starts", () => {
  return driver.then((d) => (driver = d));
});

loginTest(driver);

// describe("test block", () => {
//   test("jest is running", () => {
//     expect(1 + 1).toEqual(2);
//   });

//   ////////////////////
//   // External Pages //
//   ////////////////////

//   const tests = driver
//     .then(() => driver.get("https://google.com"))
//     .then(() => loginTest(driver));

test("Driver stops", () => {
  return driver.quit();
});

/////////////////
// Global Vars //
/////////////////
