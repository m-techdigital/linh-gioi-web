import { test, expect } from "@playwright/test";

const web = process.env.LGO_WEB_URL ?? "http://127.0.0.1:3000";

type ReleaseReadinessMetrics = {
  overflow: number;
  heroBottom: number;
  boardTop: number;
  boardBottom: number;
  hubTop: number;
  ownerTop: number;
  h1Size: number;
  designTargetScope: string;
  designTargetHref: string;
};

async function collectReleaseReadinessMetrics(page): Promise<ReleaseReadinessMetrics> {
  return page.evaluate(() => {
    const rect = (selector: string) => {
      const node = document.querySelector<HTMLElement>(selector);
      if (!node) return { top: -1, bottom: -1, height: 0 };
      const r = node.getBoundingClientRect();
      return { top: r.top, bottom: r.bottom, height: r.height };
    };
    const hero = rect(".lgo-releasereadinesspage-stack .lgo-release-readiness-hero-card");
    const board = rect(".lgo-releasereadinesspage-stack .lgo-release-readiness-design-board");
    const hub = rect(".lgo-releasereadinesspage-stack .lgo-release-readiness-hub-board");
    const owner = rect(".lgo-releasereadinesspage-stack .lgo-owner-release-gate-board");
    const h1 = document.querySelector<HTMLElement>("main h1");
    const designTarget = document.querySelector<HTMLElement>(".lgo-design-target-reference");
    const designTargetLink = document.querySelector<HTMLAnchorElement>(".lgo-design-target-reference a[href*='release-readiness-detailed-design-target-v1128.png']");
    return {
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      heroBottom: hero.bottom,
      boardTop: board.top,
      boardBottom: board.bottom,
      hubTop: hub.top,
      ownerTop: owner.top,
      h1Size: h1 ? Number.parseFloat(getComputedStyle(h1).fontSize) : 0,
      designTargetScope: designTarget?.textContent ?? "",
      designTargetHref: designTargetLink?.getAttribute("href") ?? "",
    };
  });
}

test.describe("release readiness design target density", () => {
  test("/release/readiness attaches Public Release Readiness target and keeps owner gates readable", async ({ page, isMobile }) => {
    await page.goto(`${web}/release/readiness`);
    await expect(page.getByRole("region", { name: /Design target reference.*Public Release Readiness/i })).toBeVisible();
    const metrics = await collectReleaseReadinessMetrics(page);
    expect(metrics.designTargetScope, "Public Release Readiness target scope").toContain("Public Release Readiness");
    expect(metrics.designTargetHref, "release readiness design target href").toContain("release-readiness-detailed-design-target-v1128.png");
    expect(metrics.overflow, "release readiness horizontal overflow").toBeLessThanOrEqual(0);
    expect(metrics.h1Size, "release readiness h1 follows target scale").toBeLessThanOrEqual(isMobile ? 54 : 60);
    if (!isMobile) {
      expect(metrics.heroBottom, "desktop readiness hero leaves space for production board").toBeLessThanOrEqual(520);
      expect(metrics.boardTop, "desktop readiness board enters first fold").toBeLessThanOrEqual(560);
      expect(metrics.boardBottom, "desktop readiness board remains compact").toBeLessThanOrEqual(850);
      expect(metrics.hubTop, "desktop readiness hub board follows target sequence").toBeLessThanOrEqual(1120);
      expect(metrics.ownerTop, "desktop owner gate board stays near release readiness proof flow").toBeLessThanOrEqual(1780);
    } else {
      expect(metrics.heroBottom, "mobile readiness hero does not force extreme blank fold").toBeLessThanOrEqual(1450);
    }
  });
});
