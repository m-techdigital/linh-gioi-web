import { test, expect } from "@playwright/test";

const web = process.env.LGO_WEB_URL ?? "http://127.0.0.1:3000";

type DownloadTrustMetrics = {
  overflow: number;
  heroBottom: number;
  readinessTop: number;
  ownerGateTop: number;
  ownerGateVisibleHeight: number;
  trustGateTop: number;
  h1Size: number;
  designTargetScope: string;
  designTargetHref: string;
};

async function collectDownloadTrustMetrics(page): Promise<DownloadTrustMetrics> {
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
    const hero = rect(".lgo-downloadtrustpage-stack .lgo-detail-hero-card");
    const readiness = rect(".lgo-downloadtrustpage-stack .lgo-release-readiness-cta");
    const ownerGate = rect(".lgo-downloadtrustpage-stack .lgo-owner-release-gate-board");
    const trustGate = rect(".lgo-downloadtrustpage-stack .lgo-trust-panel");
    const h1 = document.querySelector<HTMLElement>("main h1");
    const designTarget = document.querySelector<HTMLElement>(".lgo-design-target-reference");
    const designTargetLink = document.querySelector<HTMLAnchorElement>(".lgo-design-target-reference a[href*='download-trust-detailed-design-target-v1126.png']");
    return {
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      heroBottom: hero.bottom,
      readinessTop: readiness.top,
      ownerGateTop: ownerGate.top,
      ownerGateVisibleHeight: visibleHeight(".lgo-downloadtrustpage-stack .lgo-owner-release-gate-board"),
      trustGateTop: trustGate.top,
      h1Size: h1 ? Number.parseFloat(getComputedStyle(h1).fontSize) : 0,
      designTargetScope: designTarget?.textContent ?? "",
      designTargetHref: designTargetLink?.getAttribute("href") ?? "",
    };
  });
}

test.describe("download trust design target density", () => {
  test("/download/trust attaches Public Download Trust target and keeps trust gates readable", async ({ page, isMobile }) => {
    await page.goto(`${web}/download/trust`);
    await expect(page.getByRole("region", { name: /Design target reference.*Public Download Trust/i })).toBeVisible();
    const metrics = await collectDownloadTrustMetrics(page);
    expect(metrics.designTargetScope, "Public Download Trust target scope").toContain("Public Download Trust");
    expect(metrics.designTargetHref, "download trust design target href").toContain("download-trust-detailed-design-target-v1126.png");
    expect(metrics.overflow, "download trust horizontal overflow").toBeLessThanOrEqual(0);
    expect(metrics.h1Size, "download trust h1 follows target scale").toBeLessThanOrEqual(isMobile ? 54 : 60);
    if (!isMobile) {
      expect(metrics.heroBottom, "desktop trust hero leaves space for release readiness").toBeLessThanOrEqual(510);
      expect(metrics.readinessTop, "desktop release readiness enters first fold").toBeLessThanOrEqual(620);
      expect(metrics.ownerGateTop, "desktop owner gate follows target board density").toBeLessThanOrEqual(770);
      expect(metrics.ownerGateVisibleHeight, "desktop owner gate visible in first fold").toBeGreaterThanOrEqual(90);
      expect(metrics.trustGateTop, "desktop trust gate board stays near the target sequence").toBeLessThanOrEqual(1700);
    } else {
      expect(metrics.heroBottom, "mobile trust hero does not force extreme blank fold").toBeLessThanOrEqual(1450);
    }
  });
});
