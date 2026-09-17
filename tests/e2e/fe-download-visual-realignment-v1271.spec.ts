import { expect, test } from "@playwright/test";

const readinessLabels = ["Gói phát hành", "SHA256", "Phê duyệt chủ sở hữu", "Giới hạn đã biết", "Sẵn sàng hỗ trợ"];
const buildTitles = ["Launcher / gói build công khai", "Gói kiểm thử giới hạn"];

async function openDownload(page: import("@playwright/test").Page) {
  await page.goto("/download");
}

test.describe("download visual realignment v1.271", () => {
  test("replaces proof-card download flow with immersive release-gate hierarchy", async ({ page }) => {
    await openDownload(page);
    await expect(page.locator(".lgo-public-shell-immersive")).toHaveCount(1);
    await expect(page.locator(".lgo-download-landing-hero")).toHaveCount(1);
    await expect(page.locator(".lgo-downloadpage-stack, .lgo-download-expanded-evidence")).toHaveCount(0);
    await expect(page.getByRole("heading", { level: 1, name: "Trạng thái chơi & tải game" })).toHaveCount(1);
  });
  test("keeps the release state truthful and never exposes a fake download", async ({ page }) => {
    await openDownload(page);
    await expect(page.locator(".lgo-download-release-state")).toContainText("Chưa mở cổng phát hành");
    const actions = page.locator(".lgo-download-landing-actions a");
    await expect(actions).toHaveCount(3);
    expect(await actions.evaluateAll((nodes) => nodes.map((node) => node.getAttribute("href")))).toEqual(["/status", "/release", "/download/trust"]);
    await expect(page.locator('a[download], a[href$=".zip"], a[href$=".dmg"], a[href$=".exe"]')).toHaveCount(0);
    await expect(page.getByRole("link", { name: /tải ngay|chơi ngay/i })).toHaveCount(0);
  });

  test("renders all five canonical readiness gates in source order", async ({ page }) => {
    await openDownload(page);
    const cards = page.locator(".lgo-download-readiness-card");
    await expect(cards).toHaveCount(5);
    for (let i = 0; i < readinessLabels.length; i++) await expect(cards.nth(i)).toContainText(readinessLabels[i]);
  });
  test("keeps both canonical release channels without pretending they are links", async ({ page }) => {
    await openDownload(page);
    const builds = page.locator(".lgo-download-build-card");
    await expect(builds).toHaveCount(2);
    for (let i = 0; i < buildTitles.length; i++) await expect(builds.nth(i)).toContainText(buildTitles[i]);
    await expect(builds.locator("a,button")).toHaveCount(0);
  });

  test("offers four real official information routes", async ({ page }) => {
    await openDownload(page);
    const links = page.locator(".lgo-download-info-link");
    await expect(links).toHaveCount(4);
    expect(await links.evaluateAll((nodes) => nodes.map((node) => node.getAttribute("href")))).toEqual(["/news", "/community", "/status", "/support"]);
  });

  test("uses decorative gate art instead of embedding the target or old proof boards", async ({ page }) => {
    await openDownload(page);
    await expect(page.locator('.lgo-download-landing img[src="/game-art/download-target/hero-gate.png"]')).toHaveCount(1);
    await expect(page.locator('.lgo-download-landing img[src*="design-reference"], .lgo-download-landing img[src*="design-boards"]')).toHaveCount(0);
    await expect(page.locator(".lgo-download-landing img")).toHaveCount(1);
    await expect(page.locator(".lgo-download-landing img")).toHaveJSProperty("complete", true);
  });
  test("desktop density and 320px accessibility stay close to the release-gate target", async ({ page }, testInfo) => {
    await openDownload(page);
    if (testInfo.project.name === "chromium-desktop") {
      const metrics = await page.locator(".lgo-download-landing").evaluate((root) => ({
        height: document.documentElement.scrollHeight,
        readinessColumns: getComputedStyle(root.querySelector(".lgo-download-readiness-grid")!).gridTemplateColumns.split(" ").filter(Boolean).length,
        infoColumns: getComputedStyle(root.querySelector(".lgo-download-info-grid")!).gridTemplateColumns.split(" ").filter(Boolean).length,
      }));
      expect(metrics.height).toBeLessThan(1500);
      expect(metrics.readinessColumns).toBe(5);
      expect(metrics.infoColumns).toBe(2);
    }
    await page.setViewportSize({ width: 320, height: 900 });
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    const fontSizes = await page.locator(".lgo-download-landing p:visible").evaluateAll((nodes) => nodes.map((node) => parseFloat(getComputedStyle(node).fontSize)));
    expect(Math.min(...fontSizes)).toBeGreaterThanOrEqual(14);
    for (const link of await page.locator(".lgo-download-landing-actions a").all()) expect((await link.boundingBox())!.height).toBeGreaterThanOrEqual(44);
  });
});
