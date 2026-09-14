// v1.123 coverage: /journey uses a page-specific Public Journey design target and first-fold session-loop density.
import { test, expect } from "@playwright/test";

const web = process.env.LGO_WEB_URL ?? "http://127.0.0.1:3000";

type JourneyMetrics = {
  overflow: number;
  heroHeight: number;
  heroBottom: number;
  designBoardTop: number;
  designBoardVisibleHeight: number;
  sessionTop: number;
  sessionVisibleHeight: number;
  h1Size: number;
  designTargetScope: string;
  designTargetHref: string;
};

async function collectJourneyMetrics(page): Promise<JourneyMetrics> {
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
    const hero = rect(".lgo-journeypage-stack .lgo-journey-hero");
    const designBoard = rect(".lgo-journeypage-stack .lgo-journey-design-board");
    const session = rect(".lgo-journeypage-stack .lgo-session-loop");
    const h1 = document.querySelector<HTMLElement>("main h1");
    const designTarget = document.querySelector<HTMLElement>(".lgo-design-target-reference");
    const designTargetLink = document.querySelector<HTMLAnchorElement>(".lgo-design-target-reference a[href*='journey-detailed-design-target-v1123.png']");
    return {
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      heroHeight: hero.height,
      heroBottom: hero.bottom,
      designBoardTop: designBoard.top,
      designBoardVisibleHeight: visibleHeight(".lgo-journeypage-stack .lgo-journey-design-board"),
      sessionTop: session.top,
      sessionVisibleHeight: visibleHeight(".lgo-journeypage-stack .lgo-session-loop"),
      h1Size: h1 ? Number.parseFloat(getComputedStyle(h1).fontSize) : 0,
      designTargetScope: designTarget?.textContent ?? "",
      designTargetHref: designTargetLink?.getAttribute("href") ?? "",
    };
  });
}

test.describe("journey design target density", () => {
  test("/journey attaches Public Journey target and keeps session route content in first fold", async ({ page, isMobile }) => {
    await page.goto(`${web}/journey`);
    await expect(page.getByRole("region", { name: /Design target reference.*Public Journey/i })).toBeVisible();
    const metrics = await collectJourneyMetrics(page);
    expect(metrics.designTargetScope, "Public Journey target scope").toContain("Public Journey");
    expect(metrics.designTargetHref, "journey design target href").toContain("journey-detailed-design-target-v1123.png");
    expect(metrics.overflow, "journey page horizontal overflow").toBeLessThanOrEqual(0);
    expect(metrics.h1Size, "journey page h1 follows target scale").toBeLessThanOrEqual(isMobile ? 54 : 60);
    if (!isMobile) {
      expect(metrics.heroHeight, "desktop journey hero leaves room for route-flow board").toBeLessThanOrEqual(540);
      expect(metrics.designBoardTop, "desktop journey board enters first fold").toBeLessThanOrEqual(665);
      expect(metrics.designBoardVisibleHeight, "desktop journey board visible in first fold").toBeGreaterThanOrEqual(90);
      expect(metrics.sessionTop, "desktop session loop starts near target board").toBeLessThanOrEqual(1180);
    } else {
      expect(metrics.heroBottom, "mobile journey hero does not force extreme blank fold").toBeLessThanOrEqual(1450);
    }
  });
});
