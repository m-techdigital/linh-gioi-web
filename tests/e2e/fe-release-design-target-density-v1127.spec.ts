import { test, expect } from "@playwright/test";

const web = process.env.LGO_WEB_URL ?? "http://127.0.0.1:3000";

type ReleaseMetrics = {
  overflow: number;
  heroBottom: number;
  boardTop: number;
  boardBottom: number;
  sectionHeadingTop: number;
  readinessTop: number;
  h1Size: number;
  designTargetScope: string;
  designTargetHref: string;
};

async function collectReleaseMetrics(page): Promise<ReleaseMetrics> {
  return page.evaluate(() => {
    const rect = (selector: string) => {
      const node = document.querySelector<HTMLElement>(selector);
      if (!node) return { top: -1, bottom: -1, height: 0 };
      const r = node.getBoundingClientRect();
      return { top: r.top, bottom: r.bottom, height: r.height };
    };
    const hero = rect(".lgo-releasepage-stack .lgo-release-narrative-hero-card");
    const board = rect(".lgo-releasepage-stack .lgo-release-narrative-design-board");
    const heading = rect(".lgo-releasepage-stack > .lgo-section-heading");
    const readiness = rect(".lgo-releasepage-stack .lgo-release-readiness-cta");
    const h1 = document.querySelector<HTMLElement>("main h1");
    const designTarget = document.querySelector<HTMLElement>(".lgo-design-target-reference");
    const designTargetLink = document.querySelector<HTMLAnchorElement>(".lgo-design-target-reference a[href*='release-detailed-design-target-v1127.png']");
    return {
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      heroBottom: hero.bottom,
      boardTop: board.top,
      boardBottom: board.bottom,
      sectionHeadingTop: heading.top,
      readinessTop: readiness.top,
      h1Size: h1 ? Number.parseFloat(getComputedStyle(h1).fontSize) : 0,
      designTargetScope: designTarget?.textContent ?? "",
      designTargetHref: designTargetLink?.getAttribute("href") ?? "",
    };
  });
}

test.describe("release design target density", () => {
  test("/release attaches Public Release target and keeps release evidence sequence readable", async ({ page, isMobile }) => {
    await page.goto(`${web}/release`);
    await expect(page.getByRole("region", { name: /Design target reference.*Public Release/i })).toBeVisible();
    const metrics = await collectReleaseMetrics(page);
    expect(metrics.designTargetScope, "Public Release target scope").toContain("Public Release");
    expect(metrics.designTargetHref, "release design target href").toContain("release-detailed-design-target-v1127.png");
    expect(metrics.overflow, "release horizontal overflow").toBeLessThanOrEqual(0);
    expect(metrics.h1Size, "release h1 follows target scale").toBeLessThanOrEqual(isMobile ? 54 : 60);
    if (!isMobile) {
      expect(metrics.heroBottom, "desktop release hero leaves space for narrative board").toBeLessThanOrEqual(520);
      expect(metrics.boardTop, "desktop release board enters first fold").toBeLessThanOrEqual(560);
      expect(metrics.boardBottom, "desktop release board remains compact").toBeLessThanOrEqual(860);
      expect(metrics.sectionHeadingTop, "desktop release proof heading follows the visual board").toBeLessThanOrEqual(940);
      expect(metrics.readinessTop, "desktop release readiness CTA stays near target story sequence").toBeLessThanOrEqual(2100);
    } else {
      expect(metrics.heroBottom, "mobile release hero does not force extreme blank fold").toBeLessThanOrEqual(1450);
    }
  });
});
