const timeout = 15000;
beforeAll(async () => {
  await page.goto("http://localhost:5000/login", { waitUntil: "networkidle0" });
});

describe("Login", () => {
  it(
    "Displays the login component",
    async () => {
      let h1 = await page.evaluate(
        () => document.querySelector("h1").textContent
      );
      expect(h1).toEqual("Gravitate");
    },
    timeout
  );
});
