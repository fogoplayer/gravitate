import { Builder, By } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome.js";
import loginTest from "./login.test.mjs";

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
options.addArguments(DESKTOP_DIMENSIONS);
driver = await new Builder()
  .forBrowser("chrome")
  .setChromeOptions(options)
  .build();

////////////////////
// External Pages //
////////////////////
loginTest(driver);

await driver.quit();
