const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome.js");

// Driver
const IPHONE_WIDTH = 414;
const IPHONE_DIMENSIONS = `--window-size=${IPHONE_WIDTH},${3 * IPHONE_WIDTH}`;

let options = new chrome.Options();
// options.addArguments("--headless");
options.addArguments(IPHONE_DIMENSIONS);
driver = new Builder().forBrowser("chrome").setChromeOptions(options).build();

// querySelectorWait
async function querySelectorWait(selector, ms = 5000) {
  const el = await driver.wait(until.elementLocated(By.css(selector)), ms);
  await driver.wait(until.elementIsVisible(el), ms);
  return el;
}

// hardTimer
async function hardTimer(ms) {
  return await new Promise((resolve) => setTimeout(resolve, ms));
}

exports.driver = driver;
exports.querySelectorWait = querySelectorWait;
exports.hardTimer = hardTimer;
