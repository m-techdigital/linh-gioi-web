import { expect, test } from "@playwright/test";

const routes = ["/", "/game", "/roadmap", "/news", "/community", "/guides", "/guides/beginner", "/download", "/support"];

for (const route of routes) {
  test(`public route ${route} renders`, async ({ page }) => {
    await page.goto(route);
    await expect(page.locator("body")).toContainText("Linh Giới");
  });
}

test("homepage presents player-facing public UX content", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Linh Giới Online" })).toBeVisible();
  await expect(page.locator("body")).toContainText("WEB v1.8 game info depth");
  await expect(page.locator("body")).toContainText("Câu chuyện thế giới được giải thích theo nhịp người chơi");
});

test("roadmap keeps backend and production non-claims explicit", async ({ page }) => {
  await page.goto("/roadmap");
  await expect(page.getByRole("heading", { name: "Roadmap phát triển web" })).toBeVisible();
  await expect(page.locator("body")).toContainText("WEB-08");
  await expect(page.locator("body")).toContainText("no production auth");
});
