// v1.119 coverage: homepage first fold follows the detailed Public Homepage design target density.
import { test, expect } from "@playwright/test";

const web = process.env.LGO_WEB_URL ?? "http://127.0.0.1:3000";

type FoldMetrics = {
  overflow: number;
  heroTop: number;
  heroBottom: number;
  heroHeight: number;
  pillarTop: number;
  pillarVisibleHeight: number;
  h1Size: number;
  signalCount: number;
  ctaCount: number;
  designTargetScope: string;
};

async function collectFoldMetrics(page): Promise<FoldMetrics> {
  return page.evaluate(() => {
    const rect = (selector: string) => {
      const node = document.querySelector<HTMLElement>(selector);
      if (!node) return { top: -1, bottom: -1, height: 0, width: 0 };
      const r = node.getBoundingClientRect();
      return { top: r.top, bottom: r.bottom, height: r.height, width: r.width };
    };
    const hero = rect(".lgo-cinematic-hero");
    const pillars = rect(".lgo-home-pillar-section .lgo-experience-pillar");
    const h1 = document.querySelector<HTMLElement>("main h1");
    const designTarget = document.querySelector<HTMLElement>(".lgo-design-target-reference");
    return {
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      heroTop: hero.top,
      heroBottom: hero.bottom,
      heroHeight: hero.height,
      pillarTop: pillars.top,
      pillarVisibleHeight: Math.max(0, Math.min(window.innerHeight, pillars.bottom) - Math.max(0, pillars.top)),
      h1Size: h1 ? Number.parseFloat(getComputedStyle(h1).fontSize) : 0,
      signalCount: document.querySelectorAll(".lgo-hero-signals span").length,
      ctaCount: document.querySelectorAll(".lgo-hero-actions-primary a").length,
      designTargetScope: designTarget?.textContent ?? "",
    };
  });
}

test.describe("homepage target fold density", () => {
  test("desktop first fold shows hero plus the first content cards from Public Homepage target", async ({ page, isMobile }) => {
    await page.goto(`${web}/`);
    await expect(page.getByRole("region", { name: /Design target reference.*Public Homepage/i })).toBeVisible();
    const metrics = await collectFoldMetrics(page);
    expect(metrics.designTargetScope, "Public Homepage target scope").toContain("Public Homepage");
    expect(metrics.overflow, "homepage horizontal overflow").toBeLessThanOrEqual(0);
    expect(metrics.signalCount, "homepage identity signal chips").toBeGreaterThanOrEqual(4);
    expect(metrics.ctaCount, "homepage primary CTA count").toBeGreaterThanOrEqual(3);
    expect(metrics.h1Size, "homepage h1 font-size follows target scale").toBeLessThanOrEqual(isMobile ? 54 : 66);
    if (!isMobile) {
      expect(metrics.heroHeight, "desktop hero height leaves room for target cards").toBeLessThanOrEqual(650);
      expect(metrics.pillarTop, "desktop first card enters first fold").toBeLessThanOrEqual(840);
      expect(metrics.pillarVisibleHeight, "desktop first card visible in first fold").toBeGreaterThanOrEqual(120);
    } else {
      expect(metrics.heroBottom, "mobile hero does not force extreme blank fold").toBeLessThanOrEqual(1500);
    }
  });
});
