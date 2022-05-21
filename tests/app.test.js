const { driver } = require("./driver.mjs");
const { loginTest } = require("./login.mjs");

const ROOT_URL = "http://localhost:5000/";

test("Driver starts", () => {
  return driver; //.then((d) => (driver = d));
});

loginTest();

test("Driver stops", () => {
  return driver.quit();
});
