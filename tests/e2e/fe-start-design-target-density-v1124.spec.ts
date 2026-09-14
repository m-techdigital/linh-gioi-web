// v1.124 coverage: /start uses a page-specific Public Start design target and first-fold onboarding density.
import { test, expect } from "@playwright/test";

const web = process.env.LGO_WEB_URL ?? "http://127.0.0.1:3000";

type StartMetrics = {
  overflow: number;
  heroHeight: number;
  heroBottom: number;
  designBoardTop: number;
  designBoardVisibleHeight: number;
  screenshotPanelTop: number;
  screenshotCardVisibleHeight: number;
  h1Size: number;
  designTargetScope: string;
  designTargetHref: string;
};

async function collectStartMetrics(page): Promise<StartMetrics> {
  return page.evaluate(() => {
    const rect = (selector: string) => {
      const node = document.querySelector<HTMLElement>(selector);
      if (!node) return { top: -1, bottom: -1, height: 0 };
      const r = node.getBoundingClientRect();
      return { top: r.top, bottom: r.bottom, height: r.height };
    };
    const visibleHeight = (selector: string) => {
      const r = rect(selector);
      return Math.max(0, Math.min(window.innerHeight, r.bottom) - Math.max(0, r.top));
    };
    const hero = rect(".lgo-startpage-stack .lgo-start-hero");
    const designBoard = rect(".lgo-startpage-stack .lgo-start-design-board");
    const screenshotPanel = rect(".lgo-startpage-stack .lgo-start-real-screenshot-panel");
    const h1 = document.querySelector<HTMLElement>("main h1");
    const designTarget = document.querySelector<HTMLElement>(".lgo-design-target-reference");
    const designTargetLink = document.querySelector<HTMLAnchorElement>(".lgo-design-target-reference a[href*='start-detailed-design-target-v1124.png']");
    return {
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      heroHeight: hero.height,
      heroBottom: hero.bottom,
      designBoardTop: designBoard.top,
      designBoardVisibleHeight: visibleHeight(".lgo-startpage-stack .lgo-start-design-board"),
      screenshotPanelTop: screenshotPanel.top,
      screenshotCardVisibleHeight: visibleHeight(".lgo-startpage-stack .lgo-start-real-screenshot-card"),
      h1Size: h1 ? Number.parseFloat(getComputedStyle(h1).fontSize) : 0,
      designTargetScope: designTarget?.textContent ?? "",
      designTargetHref: designTargetLink?.getAttribute("href") ?? "",
    };
  });
}

test.describe("start design target density", () => {
  test("/start attaches Public Start target and keeps onboarding board in first fold", async ({ page, isMobile }) => {
    await page.goto(`${web}/start`);
    await expect(page.getByRole("region", { name: /Design target reference.*Public Start/i })).toBeVisible();
    const metrics = await collectStartMetrics(page);
    expect(metrics.designTargetScope, "Public Start target scope").toContain("Public Start");
    expect(metrics.designTargetHref, "start design target href").toContain("start-detailed-design-target-v1124.png");
    expect(metrics.overflow, "start page horizontal overflow").toBeLessThanOrEqual(0);
    expect(metrics.h1Size, "start page h1 follows target scale").toBeLessThanOrEqual(isMobile ? 54 : 60);
    if (!isMobile) {
      expect(metrics.heroHeight, "desktop start hero leaves room for tutorial board").toBeLessThanOrEqual(540);
      expect(metrics.designBoardTop, "desktop start tutorial board enters first fold").toBeLessThanOrEqual(665);
      expect(metrics.designBoardVisibleHeight, "desktop start tutorial board visible in first fold").toBeGreaterThanOrEqual(90);
      expect(metrics.screenshotPanelTop, "desktop real screenshot panel starts near target board").toBeLessThanOrEqual(1210);
    } else {
      expect(metrics.heroBottom, "mobile start hero does not force extreme blank fold").toBeLessThanOrEqual(1500);
    }
  });
});
