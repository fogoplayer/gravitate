const timeout = 15000;
beforeAll(async () => {
  await page.goto("http://localhost:5000", { waitUntil: "networkidle0" });
});

describe("Index loads", () => {
  it(
    "should have 'Gravitate' as the title",
    async () => {
      const title = await page.title();
      expect(title).toBe("Gravitate");
    },
    timeout
  );
});
