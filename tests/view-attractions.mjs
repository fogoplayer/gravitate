const { querySelectorWait, driver } = require("./driver.mjs");

function viewAttractionsTest() {
  describe("View Attractions tests", () => {
    test("/view-attractions loads", async () => {
      await driver.get("http://localhost:5000/view-attractions");
      let map = await querySelectorWait("#map");
    });

    // test("Logs in successfully", async () => {
    //   let email = await querySelectorWait("#email");
    //   let password = await querySelectorWait("#password");
    //   let submit = await querySelectorWait(".primary");

    //   await email.sendKeys("zarinloosli+testing@gmail.com");
    //   await password.sendKeys("Testing123!");
    //   await submit.click();
    //   await querySelectorWait("#map");
    // });
  });
}

exports.viewAttractionsTest = viewAttractionsTest;
