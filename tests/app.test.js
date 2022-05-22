const { contactsTest } = require("./contacts.mjs");
const { createAttractionTest } = require("./create-attractions.mjs");
const { driver } = require("./driver.mjs");
const { loginTest } = require("./login.mjs");
const { createProfileTest } = require("./onboarding/createProfile.mjs");
const { tourTest } = require("./onboarding/tour.mjs");
const { signupTest } = require("./signup.mjs");
const { viewAttractionsTest } = require("./view-attractions.mjs");

const ROOT_URL = "http://localhost:5000/";

test("Driver starts", () => {
  return driver;
});

signupTest();
loginTest();
createProfileTest();
tourTest();
viewAttractionsTest();
createAttractionTest();
contactsTest();

test("Driver stops", () => {
  return driver.quit();
});
