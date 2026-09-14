// v1.121 coverage: /story uses a page-specific Public Story design target and first-fold chapter density.
import { test, expect } from "@playwright/test";

const web = process.env.LGO_WEB_URL ?? "http://127.0.0.1:3000";

type StoryMetrics = {
  overflow: number;
  heroHeight: number;
  heroBottom: number;
  chapterTop: number;
  chapterVisibleHeight: number;
  arcTop: number;
  h1Size: number;
  designTargetScope: string;
  designTargetHref: string;
};

async function collectStoryMetrics(page): Promise<StoryMetrics> {
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
    const hero = rect(".lgo-storypage-stack .lgo-story-hero");
    const chapter = rect(".lgo-storypage-stack .lgo-narrative-chapter");
    const arc = rect(".lgo-storypage-stack .lgo-story-arc-section");
    const h1 = document.querySelector<HTMLElement>("main h1");
    const designTarget = document.querySelector<HTMLElement>(".lgo-design-target-reference");
    const designTargetLink = document.querySelector<HTMLAnchorElement>(".lgo-design-target-reference a[href*='story-detailed-design-target-v1121.png']");
    return {
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      heroHeight: hero.height,
      heroBottom: hero.bottom,
      chapterTop: chapter.top,
      chapterVisibleHeight: visibleHeight(".lgo-storypage-stack .lgo-narrative-chapter"),
      arcTop: arc.top,
      h1Size: h1 ? Number.parseFloat(getComputedStyle(h1).fontSize) : 0,
      designTargetScope: designTarget?.textContent ?? "",
      designTargetHref: designTargetLink?.getAttribute("href") ?? "",
    };
  });
}

test.describe("story design target density", () => {
  test("/story attaches Public Story target and keeps chapter cards in first fold", async ({ page, isMobile }) => {
    await page.goto(`${web}/story`);
    await expect(page.getByRole("region", { name: /Design target reference.*Public Story/i })).toBeVisible();
    const metrics = await collectStoryMetrics(page);
    expect(metrics.designTargetScope, "Public Story target scope").toContain("Public Story");
    expect(metrics.designTargetHref, "story design target href").toContain("story-detailed-design-target-v1121.png");
    expect(metrics.overflow, "story page horizontal overflow").toBeLessThanOrEqual(0);
    expect(metrics.h1Size, "story page h1 follows target scale").toBeLessThanOrEqual(isMobile ? 54 : 60);
    if (!isMobile) {
      expect(metrics.heroHeight, "desktop story hero leaves room for target chapter cards").toBeLessThanOrEqual(540);
      expect(metrics.chapterTop, "desktop first chapter card enters first fold").toBeLessThanOrEqual(680);
      expect(metrics.chapterVisibleHeight, "desktop first chapter card visible in first fold").toBeGreaterThanOrEqual(80);
      expect(metrics.arcTop, "desktop story arc starts near target board").toBeLessThanOrEqual(1300);
    } else {
      expect(metrics.heroBottom, "mobile story hero does not force extreme blank fold").toBeLessThanOrEqual(1450);
    }
  });
});
