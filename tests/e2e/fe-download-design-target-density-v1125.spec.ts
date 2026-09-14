// v1.125 coverage: /download uses a page-specific Public Download design target and first-fold readiness density.
import { test, expect } from "@playwright/test";

const web = process.env.LGO_WEB_URL ?? "http://127.0.0.1:3000";

type DownloadMetrics = {
  overflow: number;
  heroHeight: number;
  heroBottom: number;
  readinessTop: number;
  readinessVisibleHeight: number;
  statusDepthTop: number;
  h1Size: number;
  designTargetScope: string;
  designTargetHref: string;
};

async function collectDownloadMetrics(page): Promise<DownloadMetrics> {
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
    const hero = rect(".lgo-downloadpage-stack .lgo-download-player-hero");
    const readiness = rect(".lgo-downloadpage-stack .lgo-readiness-list");
    const statusDepth = rect(".lgo-downloadpage-stack .lgo-download-depth");
    const h1 = document.querySelector<HTMLElement>("main h1");
    const designTarget = document.querySelector<HTMLElement>(".lgo-design-target-reference");
    const designTargetLink = document.querySelector<HTMLAnchorElement>(".lgo-design-target-reference a[href*='download-detailed-design-target-v1125.png']");
    return {
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      heroHeight: hero.height,
      heroBottom: hero.bottom,
      readinessTop: readiness.top,
      readinessVisibleHeight: visibleHeight(".lgo-downloadpage-stack .lgo-readiness-list"),
      statusDepthTop: statusDepth.top,
      h1Size: h1 ? Number.parseFloat(getComputedStyle(h1).fontSize) : 0,
      designTargetScope: designTarget?.textContent ?? "",
      designTargetHref: designTargetLink?.getAttribute("href") ?? "",
    };
  });
}

test.describe("download design target density", () => {
  test("/download attaches Public Download target and keeps readiness content in first fold", async ({ page, isMobile }) => {
    await page.goto(`${web}/download`);
    await expect(page.getByRole("region", { name: /Design target reference.*Public Download/i })).toBeVisible();
    const metrics = await collectDownloadMetrics(page);
    expect(metrics.designTargetScope, "Public Download target scope").toContain("Public Download");
    expect(metrics.designTargetHref, "download design target href").toContain("download-detailed-design-target-v1125.png");
    expect(metrics.overflow, "download page horizontal overflow").toBeLessThanOrEqual(0);
    expect(metrics.h1Size, "download page h1 follows target scale").toBeLessThanOrEqual(isMobile ? 54 : 60);
    if (!isMobile) {
      expect(metrics.heroHeight, "desktop download hero leaves room for readiness board").toBeLessThanOrEqual(540);
      expect(metrics.readinessTop, "desktop readiness list enters first fold").toBeLessThanOrEqual(705);
      expect(metrics.readinessVisibleHeight, "desktop readiness list visible in first fold").toBeGreaterThanOrEqual(90);
      expect(metrics.statusDepthTop, "desktop status depth starts near target board").toBeLessThanOrEqual(1220);
    } else {
      expect(metrics.heroBottom, "mobile download hero does not force extreme blank fold").toBeLessThanOrEqual(1500);
    }
  });
});
