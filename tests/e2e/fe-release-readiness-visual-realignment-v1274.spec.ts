import { test, expect } from "@playwright/test";
import { ownerReleaseGates } from "@lgo-web/content";

const web = process.env.LGO_WEB_URL ?? "http://127.0.0.1:3000";
const gateTitles = ownerReleaseGates.map(item => item.gate);

test.describe("release readiness visual realignment v1.274", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${web}/release/readiness`, { waitUntil: "networkidle" });
  });

  test("uses immersive target hierarchy without duplicated proof disclosure", async ({ page }) => {
    await expect(page.locator(".lgo-public-shell-immersive")).toHaveCount(1);
    await expect(page.locator(".lgo-release-readiness-landing")).toBeVisible();
    await expect(page.locator("main h1")).toHaveText("Sẵn sàng phát hành");
    await expect(page.locator(".lgo-release-more-evidence,.lgo-release-readiness-hub-board")).toHaveCount(0);
  });

  test("keeps a live readiness console backed by the four canonical owner gates", async ({ page }) => {
    const hero = page.locator(".lgo-release-hero");
    await expect(hero).toBeVisible();
    await expect(hero.locator(".lgo-release-gate-signals li")).toHaveCount(4);
    await expect(hero.locator(".lgo-release-seal")).toContainText("Chưa sẵn sàng");
    await expect(hero.locator("[role=progressbar]")).toHaveCount(0);
  });

  test("renders four canonical owner gates in source order", async ({ page }) => {
    const cards = page.locator(".lgo-release-owner-section .lgo-release-gate-card");
    await expect(cards).toHaveCount(4);
    await expect(cards.locator("h3")).toHaveText(gateTitles);
  });

  test("uses clean project artwork and never embeds design boards", async ({ page }) => {
    await expect(page.locator('main img[src*="design-boards"],main img[src*="design-reference"]')).toHaveCount(0);
    const art = page.locator(".lgo-release-hero img");
    expect(await art.count()).toBeGreaterThanOrEqual(2);
    for (const image of await art.all()) {
      const natural = await image.evaluate((node: HTMLImageElement) => ({ complete: node.complete, w: node.naturalWidth, h: node.naturalHeight }));
      expect(natural.complete).toBe(true);
      expect(natural.w).toBeGreaterThan(240);
      expect(natural.h).toBeGreaterThan(140);
    }
  });

  test("keeps tester guidance and the three truthful next routes", async ({ page }) => {
    await expect(page.locator(".lgo-release-tester-panel")).toBeVisible();
    const hrefs = await page.locator(".lgo-release-next-routes a").evaluateAll(nodes => nodes.map(node => node.getAttribute("href")));
    expect(hrefs).toEqual(["/download/trust", "/status", "/support/safety"]);
    await expect(page.locator('main a[download],main form,main [role="progressbar"]')).toHaveCount(0);
  });

  test("matches the detailed-target density while preserving mobile readability", async ({ page, isMobile }) => {
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(0);
    if (!isMobile) {
      await expect(page.locator(".lgo-release-hero")).toBeVisible();
      await expect(page.locator(".lgo-release-owner-section")).toBeVisible();
      const layout = await page.evaluate(() => {
        const hero = document.querySelector<HTMLElement>(".lgo-release-hero")?.getBoundingClientRect();
        const owner = document.querySelector<HTMLElement>(".lgo-release-owner-section")?.getBoundingClientRect();
        return { heroWidth: hero?.width ?? 0, ownerTop: owner?.top ?? 9999, viewportWidth: innerWidth, scrollHeight: document.documentElement.scrollHeight };
      });
      expect(layout.heroWidth).toBeGreaterThanOrEqual(layout.viewportWidth - 1);
      expect(layout.ownerTop).toBeLessThan(760);
      expect(layout.scrollHeight).toBeLessThan(1350);
    }
    await page.setViewportSize({ width: 320, height: 900 });
    const mobileLayout = await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth - innerWidth,
      heroWidth: document.querySelector<HTMLElement>(".lgo-release-hero")?.getBoundingClientRect().width ?? 0,
      viewportWidth: innerWidth,
      scrollHeight: document.documentElement.scrollHeight,
    }));
    expect(mobileLayout.overflow).toBeLessThanOrEqual(0);
    expect(mobileLayout.heroWidth).toBeLessThanOrEqual(mobileLayout.viewportWidth + 1);
    expect(mobileLayout.scrollHeight).toBeLessThan(3000);
    const size = await page.locator(".lgo-release-readiness-landing .lgo-hero-lead").evaluate(node => Number.parseFloat(getComputedStyle(node).fontSize));
    expect(size).toBeGreaterThanOrEqual(14);
    for (const link of await page.locator(".lgo-release-readiness-landing a").all()) {
      if (await link.isVisible()) expect((await link.boundingBox())?.height ?? 0).toBeGreaterThanOrEqual(44);
    }
  });
});
