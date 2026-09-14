// v1.120 coverage: /game uses a page-specific Public Game World design target and first-fold density.
import { test, expect } from "@playwright/test";

const web = process.env.LGO_WEB_URL ?? "http://127.0.0.1:3000";

type GameWorldMetrics = {
  overflow: number;
  heroHeight: number;
  heroBottom: number;
  designBoardTop: number;
  designBoardVisibleHeight: number;
  routeTop: number;
  routeVisibleHeight: number;
  h1Size: number;
  designTargetScope: string;
  designTargetHref: string;
};

async function collectGameWorldMetrics(page): Promise<GameWorldMetrics> {
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
    const hero = rect(".lgo-gamepage-stack .lgo-cinematic-hero");
    const designBoard = rect(".lgo-game-world-design-board");
    const route = rect(".lgo-gamepage-stack .lgo-world-route-section");
    const h1 = document.querySelector<HTMLElement>("main h1");
    const designTarget = document.querySelector<HTMLElement>(".lgo-design-target-reference");
    const designTargetLink = document.querySelector<HTMLAnchorElement>(".lgo-design-target-reference a[href*='game-world-detailed-design-target-v1120.png']");
    return {
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      heroHeight: hero.height,
      heroBottom: hero.bottom,
      designBoardTop: designBoard.top,
      designBoardVisibleHeight: visibleHeight(".lgo-game-world-design-board"),
      routeTop: route.top,
      routeVisibleHeight: visibleHeight(".lgo-gamepage-stack .lgo-world-route-section"),
      h1Size: h1 ? Number.parseFloat(getComputedStyle(h1).fontSize) : 0,
      designTargetScope: designTarget?.textContent ?? "",
      designTargetHref: designTargetLink?.getAttribute("href") ?? "",
    };
  });
}

test.describe("game world design target density", () => {
  test("/game attaches Public Game World target and keeps route content in first fold", async ({ page, isMobile }) => {
    await page.goto(`${web}/game`);
    await expect(page.getByRole("region", { name: /Design target reference.*Public Game World/i })).toBeVisible();
    const metrics = await collectGameWorldMetrics(page);
    expect(metrics.designTargetScope, "Public Game World target scope").toContain("Public Game World");
    expect(metrics.designTargetHref, "game world design target href").toContain("game-world-detailed-design-target-v1120.png");
    expect(metrics.overflow, "game page horizontal overflow").toBeLessThanOrEqual(0);
    expect(metrics.h1Size, "game page h1 follows target scale").toBeLessThanOrEqual(isMobile ? 54 : 60);
    if (!isMobile) {
      expect(metrics.heroHeight, "desktop game hero leaves room for target route map").toBeLessThanOrEqual(540);
      expect(metrics.designBoardTop, "desktop world design board enters first fold").toBeLessThanOrEqual(650);
      expect(metrics.designBoardVisibleHeight, "desktop world design board visible in first fold").toBeGreaterThanOrEqual(90);
      expect(metrics.routeTop, "desktop world route starts near first target board").toBeLessThanOrEqual(960);
    } else {
      expect(metrics.heroBottom, "mobile game hero does not force extreme blank fold").toBeLessThanOrEqual(1450);
    }
  });
});
