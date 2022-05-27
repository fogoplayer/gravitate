const { querySelectorWait, driver, hardTimer } = require("../driver.mjs");

function orbitsTest() {
  describe("Orbits", () => {
    test("/orbits/:orbits loads", async () => {
      await driver.get(
        "http://localhost:5000/contacts/orbits/z0FqQLDNupyQy59pQiwI"
      );
      await querySelectorWait("main button.pfp");
    });

    test("PFP can be edited", async () => {
      let pfp = await querySelectorWait("main button.pfp");
      await pfp.click();

      const iconInput = await querySelectorWait("#change-icon #new-icon");
      const submit = await querySelectorWait("#change-icon button.primary");
      const newIcon = "T" === (await pfp.getText())[0] ? "O" : "T";
      await iconInput.sendKeys(newIcon);
      await submit.click();
      await hardTimer(500);

      await driver.get(
        "http://localhost:5000/contacts/orbits/z0FqQLDNupyQy59pQiwI"
      );
      pfp = await querySelectorWait("main button.pfp");

      expect((await pfp.getText())[0]).toBe(newIcon);
    });

    test("Member can be added", async () => {
      const openModal = await querySelectorWait(".members-wrapper .header-btn");
      await openModal.click();

      const friendSelect = await querySelectorWait(
        "#add-members .contact-header-container"
      );
      await friendSelect.click();

      const submit = await querySelectorWait("#add-members button.primary");
      submit.click();
      await hardTimer(500);

      await driver.get(
        "http://localhost:5000/contacts/orbits/z0FqQLDNupyQy59pQiwI"
      );

      const friend = await querySelectorWait(".members-wrapper .contact-name");
      expect(await friend.getText()).toEqual("User2");
    });

    test("Member can be removed", async () => {
      const openModal = await querySelectorWait(
        ".members-wrapper .contact-header-container button"
      );
      await openModal.click();

      const submit = await querySelectorWait(
        "dialog[open] button.primary.danger"
      );
      submit.click();
      await hardTimer(500);

      await driver.get(
        "http://localhost:5000/contacts/orbits/z0FqQLDNupyQy59pQiwI"
      );
      querySelectorWait(".empty-message");
    });

    test("Member can be re-added", async () => {
      const openModal = await querySelectorWait(".members-wrapper .header-btn");
      await openModal.click();

      const friendSelect = await querySelectorWait(
        "#add-members .contact-header-container"
      );
      await friendSelect.click();

      const submit = await querySelectorWait("#add-members button.primary");
      submit.click();
      await hardTimer(500);

      await driver.get(
        "http://localhost:5000/contacts/orbits/z0FqQLDNupyQy59pQiwI"
      );

      const friend = await querySelectorWait(".members-wrapper .contact-name");
      expect(await friend.getText()).toEqual("User2");
    }, 10000);
  });
}

exports.orbitsTest = orbitsTest;
