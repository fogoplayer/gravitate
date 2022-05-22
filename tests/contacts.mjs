const { querySelectorWait, driver } = require("./driver.mjs");

function contactsTest() {
  describe("Contacts tests", () => {
    test("/contacts loads", async () => {
      await driver.get("http://localhost:5000/contacts");
      let map = await querySelectorWait(".contacts-list");
    });
  });
}

exports.contactsTest = contactsTest;
