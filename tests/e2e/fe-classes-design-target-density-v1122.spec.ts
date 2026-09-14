// v1.122 coverage: /classes uses a page-specific Public Classes design target and first-fold class density.
import { test, expect } from "@playwright/test";

const web = process.env.LGO_WEB_URL ?? "http://127.0.0.1:3000";

type ClassesMetrics = {
  overflow: number;
  heroHeight: number;
  heroBottom: number;
  firstClassTop: number;
  firstClassVisibleHeight: number;
  identityTop: number;
  h1Size: number;
  designTargetScope: string;
  designTargetHref: string;
};

async function collectClassesMetrics(page): Promise<ClassesMetrics> {
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
    const hero = rect(".lgo-classespage-stack .lgo-paths-hero");
    const firstClass = rect(".lgo-classespage-stack .lgo-class-path");
    const identity = rect(".lgo-classespage-stack .lgo-class-identity-section");
    const h1 = document.querySelector<HTMLElement>("main h1");
    const designTarget = document.querySelector<HTMLElement>(".lgo-design-target-reference");
    const designTargetLink = document.querySelector<HTMLAnchorElement>(".lgo-design-target-reference a[href*='classes-detailed-design-target-v1122.png']");
    return {
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      heroHeight: hero.height,
      heroBottom: hero.bottom,
      firstClassTop: firstClass.top,
      firstClassVisibleHeight: visibleHeight(".lgo-classespage-stack .lgo-class-path"),
      identityTop: identity.top,
      h1Size: h1 ? Number.parseFloat(getComputedStyle(h1).fontSize) : 0,
      designTargetScope: designTarget?.textContent ?? "",
      designTargetHref: designTargetLink?.getAttribute("href") ?? "",
    };
  });
}

test.describe("classes design target density", () => {
  test("/classes attaches Public Classes target and keeps first class cards in first fold", async ({ page, isMobile }) => {
    await page.goto(`${web}/classes`);
    await expect(page.getByRole("region", { name: /Design target reference.*Public Classes/i })).toBeVisible();
    const metrics = await collectClassesMetrics(page);
    expect(metrics.designTargetScope, "Public Classes target scope").toContain("Public Classes");
    expect(metrics.designTargetHref, "classes design target href").toContain("classes-detailed-design-target-v1122.png");
    expect(metrics.overflow, "classes page horizontal overflow").toBeLessThanOrEqual(0);
    expect(metrics.h1Size, "classes page h1 follows target scale").toBeLessThanOrEqual(isMobile ? 54 : 60);
    if (!isMobile) {
      expect(metrics.heroHeight, "desktop classes hero leaves room for target class cards").toBeLessThanOrEqual(540);
      expect(metrics.firstClassTop, "desktop first class card enters first fold").toBeLessThanOrEqual(680);
      expect(metrics.firstClassVisibleHeight, "desktop first class card visible in first fold").toBeGreaterThanOrEqual(80);
      expect(metrics.identityTop, "desktop identity deck starts near target board").toBeLessThanOrEqual(1450);
    } else {
      expect(metrics.heroBottom, "mobile classes hero does not force extreme blank fold").toBeLessThanOrEqual(1450);
    }
  });
});
