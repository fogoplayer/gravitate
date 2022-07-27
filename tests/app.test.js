const { changelogTest } = require("./changelog.mjs");
const { contactsTest } = require("./contacts.mjs");
const { friendsTest } = require("./contacts/friends.mjs");
const { orbitsTest } = require("./contacts/orbits.mjs");
const { systemsTest } = require("./contacts/systems.mjs");
const { createAttractionTest } = require("./create-attractions.mjs");
const { driver } = require("./driver.mjs");
const { loginTest } = require("./login.mjs");
const { createProfileTest } = require("./onboarding/createProfile.mjs");
const { tourTest } = require("./onboarding/tour.mjs");
const { resetPasswordTest } = require("./reset-password.mjs");
const { sendFeedbackTest } = require("./send-feedback.mjs");
const { settingsTest } = require("./settings.mjs");
const { signupTest } = require("./signup.mjs");
const { viewAttractionsTest } = require("./view-attractions.mjs");

const ROOT_URL = "http://localhost:5000/";

test("Driver starts", () => {
  return driver;
});

// signupTest();
// resetPasswordTest();
loginTest();
// createProfileTest();
// tourTest();
// createAttractionTest();
// viewAttractionsTest();
// contactsTest();
// friendsTest();
// orbitsTest();
// systemsTest();
// settingsTest();
sendFeedbackTest();
// changelogTest();

test("Driver stops", () => {
  return driver.quit();
});
