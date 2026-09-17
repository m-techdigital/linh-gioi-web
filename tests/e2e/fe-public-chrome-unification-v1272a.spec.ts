import { test, expect } from "@playwright/test";

const publicRoutes = [
  "/", "/game", "/story", "/classes", "/journey", "/start", "/download", "/download/trust",
  "/release", "/release/readiness", "/release/tester-pack", "/status", "/support", "/support/help", "/support/safety",
  "/community", "/community/onboarding", "/roadmap", "/game/loop", "/guides", "/guides/beginner", "/news",
  "/news/player-safety-support-faq-polish-started", "/events", "/patch-notes", "/performance", "/accessibility"
] as const;

const canonicalLinks = ["Trang chủ", "Thế giới", "Lộ phái", "Tính năng", "Cộng đồng", "Tin tức"];

type ChromeMetrics = {
  headerHeight: number; brandWidth: number; footerHeight: number; overflow: boolean;
  links: string[]; legacyBrandCount: number; marketingFooterCount: number; legacyFooterCount: number; designBandCount: number;
};

async function chromeMetrics(page: import("@playwright/test").Page): Promise<ChromeMetrics> {
  return page.evaluate(() => {
    const rect = (selector: string) => document.querySelector(selector)?.getBoundingClientRect();
    return {
      headerHeight: rect(".lgo-site-header")?.height ?? 0,
      brandWidth: rect(".lgo-brand-mark")?.width ?? 0,
      footerHeight: rect(".lgo-marketing-footer")?.height ?? 0,
      overflow: document.documentElement.scrollWidth > innerWidth,
      links: Array.from(document.querySelectorAll(".lgo-brand-links a")).map((node) => node.textContent?.trim() ?? ""),
      legacyBrandCount: document.querySelectorAll(".lgo-brand-sigil").length,
      marketingFooterCount: document.querySelectorAll(".lgo-marketing-footer").length,
      legacyFooterCount: document.querySelectorAll(".lgo-brand-footer").length,
      designBandCount: document.querySelectorAll(".lgo-design-target-band").length,
    };
  });
}
test.describe("public chrome unification v1.272a", () => {
  test("release already exposes the same real brand chrome as the accepted homepage direction", async ({ page }) => {
    await page.goto("/release");
    await expect(page.locator(".lgo-brand-nav")).toBeVisible();
    await expect(page.locator('.lgo-brand-mark img[src="/game-art/marketing/header-sigil.png"]')).toBeVisible();
    await expect(page.locator(".lgo-nav-brand-art .lgo-art-wordmark")).toHaveAttribute("data-fallback", "false");
    await expect(page.locator('.lgo-brand-mark img[src="/game-art/marketing/wordmark-brush.png"]')).toBeVisible();
    await expect(page.locator(".lgo-nav-play")).toHaveText("Trạng thái chơi");
    await expect(page.locator(".lgo-nav-play")).toBeVisible();
    await expect(page.locator(".lgo-marketing-footer")).toBeVisible();
    await expect(page.locator(".lgo-design-target-band")).toHaveCount(0);
    const metrics = await chromeMetrics(page);
    expect(metrics.links).toEqual(canonicalLinks);
    expect(metrics.legacyBrandCount).toBe(0);
    expect(metrics.legacyFooterCount).toBe(0);
  });

  test("all 27 audited public routes share one header footer logo and menu geometry", async ({ page }) => {
    let baseline: ChromeMetrics | undefined;
    for (const route of publicRoutes) {
      await page.goto(route);
      await expect(page.locator(".lgo-brand-nav"), `${route} navigation`).toBeVisible();
      const metrics = await chromeMetrics(page);
      expect(metrics.overflow, `${route} page overflow`).toBe(false);
      expect(metrics.links, `${route} menu`).toEqual(canonicalLinks);
      expect(metrics.legacyBrandCount, `${route} legacy text brand`).toBe(0);
      expect(metrics.marketingFooterCount, `${route} marketing footer`).toBe(1);
      expect(metrics.legacyFooterCount, `${route} legacy footer`).toBe(0);
      expect(metrics.designBandCount, `${route} public design band`).toBe(0);
      if (!baseline) baseline = metrics;
      expect(Math.abs(metrics.headerHeight - baseline.headerHeight), `${route} header height`).toBeLessThanOrEqual(1);
      expect(Math.abs(metrics.brandWidth - baseline.brandWidth), `${route} brand width`).toBeLessThanOrEqual(1);
      expect(Math.abs(metrics.footerHeight - baseline.footerHeight), `${route} footer height`).toBeLessThanOrEqual(2);
    }
  });

  test("shared chrome does not force legacy page bodies into immersive composition", async ({ page }) => {
    await page.goto("/release");
    await expect(page.locator(".lgo-brand-nav")).toBeVisible();
    const release = await page.evaluate(() => ({
      shell: document.querySelector(".lgo-public-shell")?.className ?? "",
      mainPad: Number.parseFloat(getComputedStyle(document.querySelector(".lgo-main")!).paddingTop),
      h1: document.querySelector("main h1")?.textContent?.trim() ?? ""
    }));
    expect(release.shell).not.toContain("lgo-public-shell-immersive");
    expect(release.mainPad).toBeGreaterThan(0);
    expect(release.h1).toBe("Hành trình phát hành");

    await page.goto("/download/trust");
    await expect(page.locator(".lgo-brand-nav")).toBeVisible();
    const immersive = await page.evaluate(() => ({
      shell: document.querySelector(".lgo-public-shell")?.className ?? "",
      mainPad: Number.parseFloat(getComputedStyle(document.querySelector(".lgo-main")!).paddingTop)
    }));
    expect(immersive.shell).toContain("lgo-public-shell-immersive");
    expect(immersive.mainPad).toBe(0);
  });
});
