const { driver } = require("./driver.mjs");
const { loginTest } = require("./login.mjs");

const ROOT_URL = "http://localhost:5000/";

test("Driver starts", () => {
  return driver; //.then((d) => (driver = d));
});

loginTest();

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
