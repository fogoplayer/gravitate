const { contactsTest } = require("./contacts.mjs");
const { createAttractionTest } = require("./create-attractions.mjs");
const { driver } = require("./driver.mjs");
const { loginTest } = require("./login.mjs");
const { tourTest } = require("./onboarding/tour.mjs");
const { viewAttractionsTest } = require("./view-attractions.mjs");

const ROOT_URL = "http://localhost:5000/";

test("Driver starts", () => {
  return driver; //.then((d) => (driver = d));
});

loginTest();
// viewAttractionsTest();
// createAttractionTest();
// contactsTest();
tourTest();

test("Driver stops", () => {
  return driver.quit();
});
