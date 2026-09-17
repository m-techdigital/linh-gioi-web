import { expect, test } from "@playwright/test";

const origin = process.env.LGO_WEB_URL ?? "http://127.0.0.1:3000";
const routes = [
  "/", "/game", "/story", "/classes", "/journey", "/start", "/download", "/download/trust",
  "/release", "/release/readiness", "/release/tester-pack", "/status", "/support", "/support/help",
  "/support/safety", "/community", "/community/onboarding", "/roadmap", "/game/loop", "/guides",
  "/guides/beginner", "/news", "/news/player-safety-support-faq-polish-started", "/events",
  "/patch-notes", "/performance", "/accessibility",
] as const;

const canonicalMenu = ["Trang chủ", "Thế giới", "Lộ phái", "Tính năng", "Cộng đồng", "Tin tức"];

test.describe("public chrome follows homepage header and footer", () => {
  for (const route of routes) {
    test(`${route} uses the homepage public chrome`, async ({ page }) => {
      await page.goto(origin + route, { waitUntil: "networkidle" });

      await expect(page.locator("header .lgo-nav-sigil-art img[src='/game-art/marketing/header-sigil.png']")).toHaveCount(1);
      await expect(page.locator("header .lgo-nav-brand-art img[src='/game-art/marketing/wordmark-brush.png']")).toHaveCount(1);
      await expect(page.locator(".lgo-brand-links a")).toHaveText(canonicalMenu);
      await expect(page.locator(".lgo-nav-play")).toHaveText("Trạng thái chơi");
      await expect(page.locator(".lgo-marketing-footer")).toHaveCount(1);
      await expect(page.locator(".lgo-brand-footer")).toHaveCount(0);
      await expect(page.locator(".lgo-design-target-band")).toHaveCount(0);
      await expect(page.locator(".lgo-marketing-footer img[src='/game-art/marketing/wordmark-brush.png']")).toHaveCount(1);

      const chrome = await page.evaluate(() => {
        const header = document.querySelector<HTMLElement>(".lgo-site-header")!;
        const brand = document.querySelector<HTMLElement>(".lgo-brand-mark")!;
        const footer = document.querySelector<HTMLElement>(".lgo-marketing-footer")!;
        return {
          header: header.getBoundingClientRect().height,
          brand: brand.getBoundingClientRect().width,
          footer: footer.getBoundingClientRect().height,
          overflow: document.documentElement.scrollWidth - innerWidth,
        };
      });
      expect(chrome.overflow).toBeLessThanOrEqual(0);
      expect(chrome.header).toBeGreaterThanOrEqual(70);
      expect(chrome.brand).toBeGreaterThanOrEqual(150);
      expect(chrome.footer).toBeGreaterThanOrEqual(90);
    });
  }
});
