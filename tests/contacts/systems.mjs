const { querySelectorWait, driver, hardTimer } = require("../driver.mjs");

function systemsTest() {
  describe("Systems", () => {
    test("/systems/:system loads", async () => {
      await driver.get(
        "http://localhost:5000/contacts/systems/TMW5hHDB92H13e8gktbD"
      );
      await querySelectorWait("main button.pfp");
    });

    test("PFP can be edited", async () => {
      let pfp = await querySelectorWait("main button.pfp");
      await pfp.click();

      const iconInput = await querySelectorWait("#change-icon #new-icon");
      const submit = await querySelectorWait("#change-icon button.primary");
      const newIcon = "R" === (await pfp.getText())[0] ? "S" : "R";
      await iconInput.sendKeys(newIcon);
      await submit.click();
      await hardTimer(500);

      await driver.get(
        "http://localhost:5000/contacts/systems/TMW5hHDB92H13e8gktbD"
      );
      pfp = await querySelectorWait("main button.pfp");

      expect((await pfp.getText())[0]).toBe(newIcon);
    });

    test("Name can be edited", async () => {
      let name = await querySelectorWait("main button.edit-name");
      await name.click();

      const nameInput = await querySelectorWait("#change-name #new-name");
      const submit = await querySelectorWait("#change-name button.primary");
      const newName =
        "System" === (await name.getText()) ? "Test System" : "System";
      await nameInput.sendKeys(newName);
      await submit.click();
      await hardTimer(500);

      await driver.get(
        "http://localhost:5000/contacts/systems/TMW5hHDB92H13e8gktbD"
      );
      name = await querySelectorWait("main button.edit-name");

      expect(await name.getText()).toBe(newName);
    });

    test("Invite link can be generated", async () => {
      let createLink = await querySelectorWait("#create-link");
      await createLink.click();
      const closePopup = await querySelectorWait("dialog[open] .primary");
      await closePopup.click();
      let linkText = await querySelectorWait(".link-text");
      expect(linkText.innerText).toBeTruthy();
    });

    // TODO wait to test until add codes
    // test("User can leave", async () => {
    //   const openModal = await querySelectorWait(
    //     ".members-wrapper .contact-header-container button"
    //   );
    //   await openModal.click();

    //   const submit = await querySelectorWait(
    //     "dialog[open] button.primary.danger"
    //   );
    //   submit.click();
    //   await hardTimer(500);

    //   await driver.get(
    //     "http://localhost:5000/contacts/systems/TMW5hHDB92H13e8gktbD"
    //   );
    //   querySelectorWait(".empty-message");
    // });
    //
    // test("Member can be re-added", async () => {
    //   const openModal = await querySelectorWait(".members-wrapper .header-btn");
    //   await openModal.click();
    //   const friendSelect = await querySelectorWait(
    //     "#add-members .contact-header-container"
    //   );
    //   await friendSelect.click();
    //   const submit = await querySelectorWait("#add-members button.primary");
    //   submit.click();
    //   await hardTimer(500);
    //   await driver.get(
    //     "http://localhost:5000/contacts/systems/TMW5hHDB92H13e8gktbD"
    //   );
    //   const friend = await querySelectorWait(".members-wrapper .contact-name");
    //   expect(await friend.getText()).toEqual("User2");
    // }, 10000);
  });
}

exports.systemsTest = systemsTest;
