const { querySelectorWait, driver, hardTimer } = require("../driver.mjs");

function friendsTest() {
  describe("Friends", () => {
    test("/friends/:friend loads", async () => {
      await driver.get(
        "http://localhost:5000/contacts/friends/IJxHuXlIyWfRRFtA9Lt8BkMnfYq2"
      );
      await querySelectorWait("main div.pfp img.pfp", 10000);
    }, 10000);

    test("PFP opens in full screen", async () => {
      const pfp = await querySelectorWait("main div.pfp img.pfp");
      await pfp.click();
      const fullscreenEl = await driver.executeScript(
        "return document.fullscreenElement"
      );
      expect(pfp).toEqual(fullscreenEl);
    });

    test("PFP closes from full screen", async () => {
      const pfp = await querySelectorWait("main div.pfp img.pfp");
      await pfp.click();
      await hardTimer(500);
      const fullscreenEl = await driver.executeScript(
        "return document.fullscreenElement"
      );
      expect(fullscreenEl).toEqual(null);
    });

    test("Unfriend is successful", async () => {
      const showModal = await querySelectorWait("button.flat.danger");
      await showModal.click();
      await querySelectorWait(".contacts-list");
      await hardTimer(500);

      const unfriend = await querySelectorWait(
        "#unfriend-confirm .primary.danger"
      );
      await unfriend.click();
      await hardTimer(500);
    });

    test("Adding friends is successful", async () => {
      // Add friend
      await driver.get("http://localhost:5000/contacts");
      const openModal = await querySelectorWait(".friends-wrapper .header-btn");
      await openModal.click();

      const friendInput = await querySelectorWait("#add-friend .text-input");
      friendInput.sendKeys("User2");
      const searchButton = await querySelectorWait(
        "#add-friend .inline-inputs > .flat.inline"
      );
      await searchButton.click();

      const friendSelect = await querySelectorWait(
        "#add-friend .contact-header-container"
      );
      await friendSelect.click();

      const submit = await querySelectorWait("#add-friend button#add-friends");
      submit.click();

      await hardTimer(500);

      // Confirm friend added
      await driver.get("http://localhost:5000/contacts");
      const friend = await querySelectorWait(".friends-wrapper .contact-name");
      expect(await friend.getText()).toEqual("User2");
    }, 10000);
  });
}

exports.friendsTest = friendsTest;
