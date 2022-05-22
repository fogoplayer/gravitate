const { contactsTest } = require("./contacts.mjs");
const { createAttractionTest } = require("./create-attractions.mjs");
const { driver } = require("./driver.mjs");
const { loginTest } = require("./login.mjs");
const { tourTest } = require("./onboarding/tour.mjs");
const { signupTest } = require("./signup.mjs");
const { viewAttractionsTest } = require("./view-attractions.mjs");

const ROOT_URL = "http://localhost:5000/";

test("Driver starts", () => {
  return driver;
});

signupTest();
loginTest();
// viewAttractionsTest();
// createAttractionTest();
// contactsTest();
tourTest();

test("Driver stops", () => {
  return driver.quit();
});
