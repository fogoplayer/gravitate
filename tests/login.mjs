const { querySelectorWait, driver } = require("./driver.mjs");

function loginTest() {
  describe("Login tests", () => {
    driver.get("http://localhost:5000/login");

    test("login loads", async () => {
      await driver.get("http://localhost:5000/login");
      let h1 = await querySelectorWait("h1");
      expect(await h1.getText()).toContain("Gravitate");
    });
    // let submit = await driver.findElement(By.css("submit-button"));
    // await code.sendKeys("kron4");
    // await submit.click();
  });
}

exports.loginTest = loginTest;
/*
/////////////////////////
  // Miscellaneous pages //
  /////////////////////////

  let goToRoute = async function (route) {
    await driver.get(ROOT_URL + "" + route);
  };

  // login
  await goToRoute("login");
  await takeScreenshot();

  // reset-password
  await goToRoute("reset-password");
  await takeScreenshot();

  // 404
  await goToRoute("lorem-ipsum-dolor-sit-amet");
  await takeScreenshot();

  ////////////////
  // Onboarding //
  ////////////////

  goToRoute = async function (route) {
    await driver.get(ROOT_URL + "onboarding/" + route);
  };

  // invitation-code
  await goToRoute("");
  await takeScreenshot();

  // Invitation code loading screen
  await (async () => {
    let code = await driver.findElement(By.id("invitation-code"));
    let submit = await driver.findElement(By.id("submit-button"));
    await code.sendKeys("kron4");
    await submit.click();

    // Loading circle
    await hardTimer(500);
    await takeScreenshot();

    // Complete
    await hardTimer(5000);
    await takeScreenshot();
  })();

  // zip-code
  await goToRoute("zip-code");
  await takeScreenshot();

  // validate
  await (async () => {
    let code = await driver.findElement(By.id("zip-code-input"));
    let submit = await driver.findElement(By.id("submit-button"));
    await code.sendKeys("12345");
    await submit.click();

    // Loading circle
    await hardTimer(500);
    await takeScreenshot(true); // TODO remove once validate title has been merged into staging

    // Complete before image loads
    await hardTimer(4600);
    await takeScreenshot(true); // TODO remove once validate title has been merged into staging

    // Complete after image loads
    await driver.wait(async () => {
      const img = await driver.findElement(By.css(".affiliate-image"));
      img.complete = await driver.executeScript((arg) => arg.complete, img);
      return img.complete;
    });
    await takeScreenshot(true); // TODO remove once validate title has been merged into staging
  })();

  // financial-goals
  await goToRoute("financial-goals");
  await takeScreenshot();

  // email
  await goToRoute("email");
  await takeScreenshot();

  // password
  await goToRoute("password");
  await takeScreenshot();

  // No account creation loading screen, since it would be a huge pain to actually create an account every time we ran this test
  // No account creation complete screen, since it would be a huge pain to actually create an account every time we ran this test

  //////////////////////////////////////////////////
  // Login so that routes that require login work //
  //////////////////////////////////////////////////

  await (async () => {
    console.log("Logging in user");
    await driver.get(ROOT_URL + "login");
    let email = await driver.findElement(By.id("email-input-field"));
    let password = await driver.findElement(By.id("password-input-field"));
    let submit = await driver.findElement(By.id("submit-button"));
    await email.sendKeys("selenium@xlr8dev.com");
    await password.sendKeys("Testing123!");
    await submit.click();
    // Wait for request to resolve
    await driver.wait(async () => {
      let loginScreens = await driver.findElements(By.css(".onboarding-login"));
      return !loginScreens.length;
    });
  })();

  //////////////////
  // Login routes //
  //////////////////

  // name
  await goToRoute("name");
  await takeScreenshot();

  // phone
  await goToRoute("phone");
  await takeScreenshot();

  // what-to-expect
  await goToRoute("what-to-expect");
  await waitForTextCascade();
  await takeScreenshot();

  /////////////////////
  // Basic Questions //
  /////////////////////

  goToRoute = async function (route) {
    await driver.get(ROOT_URL + "onboarding/basic-questions/" + route);
  };

  // physical-address
  await goToRoute("physical-address");
  await takeScreenshot();

  // property-type
  await goToRoute("property-type");
  await takeScreenshot();

  // additional-properties
  await goToRoute("additional-properties");
  await takeScreenshot();

  // additional-properties-count
  await goToRoute("additional-properties-count");
  await takeScreenshot();

  // people-on-current-loan
  await goToRoute("people-on-current-loan");
  await takeScreenshot();

  // people-on-new-loan
  await goToRoute("people-on-new-loan");
  await waitForTextCascade();
  await takeScreenshot();

  // people-on-new-loan loading screen
  // (async () => {
  //   let radio = await driver.findElement(By.css(".radio-input-component"));
  //   let submit = await driver.findElement(By.id("submit-button"));
  //   await radio.click();
  //   await hardTimer(1000);
  //   await submit.click();
  //   await hardTimer(1000);
  // })();
  // await takeScreenshot();

  // confirm-people-on-new-loan
  await goToRoute("confirm-people-on-new-loan");
  await takeScreenshot();

  // future-loan-relationships
  await goToRoute("future-loan-relationships");
  await waitForTextCascade();
  await takeScreenshot();

  // veteran-status
  await goToRoute("veteran-status");
  await takeScreenshot();

  // additional-info
  await goToRoute("additional-info");
  await takeScreenshot();

  // income-sources
  await goToRoute("income-sources");
  await takeScreenshot();

  // income-sources loading screen
  (async () => {
    let submit = await driver.findElement(By.id("submit-button"));
    await submit.click();
  })();
  await takeScreenshot();

  // income-details
  await goToRoute("income-details");
  await takeScreenshot();

  // asset-types
  await goToRoute("asset-types");
  await takeScreenshot();

  // asset-details
  await goToRoute("asset-details");
  await takeScreenshot();

  // status-of-residence
  await goToRoute("status-of-residence");
  await takeScreenshot();

  // ssn-dob
  await goToRoute("ssn-dob");
  await takeScreenshot();

  // SSN loading screen
  await (async () => {
    const elements = await driver.findElements(By.css(".text-input"));
    let ssn1 = elements[0];
    let dob1 = elements[1];
    let ssn2 = elements[2];
    let dob2 = elements[3];
    let checkbox = await driver.findElement(By.css(".unchecked-box"));
    let submit = await driver.findElement(By.id("submit-button"));
    await ssn1.sendKeys("123456789");
    await dob1.sendKeys("01012001");
    await ssn2.sendKeys("234567890");
    await dob2.sendKeys("02022002");
    await checkbox.click();
    await submit.click();

    // Loading circle
    await hardTimer(500);
    await takeScreenshot();

    // Complete
    await hardTimer(4000);
    await takeScreenshot();
  })();

  ////////////////////////////////
  // Post-basic-questions pages //
  ////////////////////////////////

  goToRoute = async function (route) {
    await driver.get(ROOT_URL + "onboarding/" + route);
  };

  // mortgage
  await goToRoute("mortgage");
  await waitForTextCascade();
  await takeScreenshot();

  // mortgage
  await (async () => {
    let submit = await driver.findElement(By.css(".button-component"));
    await submit.click();
  })();

  // calendly
  await goToRoute("calendly");
  await waitForTextCascade();
  await takeScreenshot();

  // calendly-confirmation
  await goToRoute("calendly-confirmation");
  await takeScreenshot();
} */
