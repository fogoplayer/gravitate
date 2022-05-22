const { createAttractionTest } = require("./create-attractions.mjs");
const { driver } = require("./driver.mjs");
const { loginTest } = require("./login.mjs");
const { viewAttractionsTest } = require("./view-attractions.mjs");

const ROOT_URL = "http://localhost:5000/";

test("Driver starts", () => {
  return driver; //.then((d) => (driver = d));
});

loginTest();
viewAttractionsTest();
createAttractionTest();

test("Driver stops", () => {
  return driver.quit();
});
