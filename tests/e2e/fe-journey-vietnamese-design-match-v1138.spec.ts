// v1.138 coverage: /journey uses Vietnamese target copy and follows the refreshed 20-minute journey target.
import { test, expect } from "@playwright/test";

const web = process.env.LGO_WEB_URL ?? "http://127.0.0.1:3000";

type JourneyDesignMetrics = {
  overflow: number;
  h1Size: number;
  heroHeight: number;
  heroBottom: number;
  sessionTop: number;
  firstBeatVisibleHeight: number;
  routeTop: number;
  designBoardTop: number;
  targetText: string;
  bodyText: string;
};

async function collectJourneyDesignMetrics(page): Promise<JourneyDesignMetrics> {
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
    const session = rect(".lgo-journeypage-stack .lgo-session-loop");
    const route = rect(".lgo-journeypage-stack .lgo-world-route-section");
    const designBoard = rect(".lgo-journeypage-stack .lgo-journey-design-board");
    const h1 = document.querySelector<HTMLElement>("main h1");
    const target = document.querySelector<HTMLElement>(".lgo-design-target-reference");
    return {
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      h1Size: h1 ? Number.parseFloat(getComputedStyle(h1).fontSize) : 0,
      heroHeight: hero.height,
      heroBottom: hero.bottom,
      sessionTop: session.top,
      firstBeatVisibleHeight: visibleHeight(".lgo-journeypage-stack .lgo-session-beat"),
      routeTop: route.top,
      designBoardTop: designBoard.top,
      targetText: target?.textContent ?? "",
      bodyText: document.body.innerText,
    };
  });
}

test.describe("journey Vietnamese design match v1.138", () => {
  test("/journey uses Vietnamese target copy and 20-minute first-flow density", async ({ page, isMobile }) => {
    await page.goto(`${web}/journey`);
    await expect(page.getByRole("heading", { name: "20 phút không chỉ để đánh quái" })).toBeVisible();
    await expect(page.getByRole("link", { name: /Thiết kế chi tiết hành trình/i })).toBeVisible();
    await expect(page.getByText("Journey detailed design target")).toHaveCount(0);
    await expect(page.getByText("Player journey")).toHaveCount(0);
    await expect(page.getByText("Social")).toHaveCount(0);
    await expect(page.getByText("Adventure")).toHaveCount(0);
    await expect(page.getByText("Reward")).toHaveCount(0);
    await expect(page.getByText("Upgrade")).toHaveCount(0);
    await expect(page.getByText("Game reference art")).toHaveCount(0);
    await expect(page.getByText("without claiming", { exact: false })).toHaveCount(0);

    const metrics = await collectJourneyDesignMetrics(page);
    expect(metrics.targetText, "journey target label is Vietnamese").toContain("Thiết kế chi tiết hành trình");
    expect(metrics.overflow, "journey page horizontal overflow").toBeLessThanOrEqual(0);
    expect(metrics.h1Size, "journey h1 stays below giant-font threshold").toBeLessThanOrEqual(isMobile ? 52 : 68);
    expect(metrics.bodyText, "English implementation labels should not leak into /journey first-flow").not.toMatch(/Journey detailed design target|Player journey|Social|Adventure|Reward|Upgrade|Game reference art|without claiming/);

    if (!isMobile) {
      expect(metrics.heroHeight, "desktop journey hero leaves room for 20-minute cards").toBeLessThanOrEqual(520);
      expect(metrics.sessionTop, "20-minute card loop starts in the opening viewport").toBeLessThanOrEqual(690);
      expect(metrics.firstBeatVisibleHeight, "first 20-minute card remains visible in first fold").toBeGreaterThanOrEqual(90);
      expect(metrics.routeTop, "world route follows session loop before boundary board").toBeLessThan(metrics.designBoardTop);
    } else {
      expect(metrics.heroBottom, "mobile journey hero remains readable without extreme sprawl").toBeLessThanOrEqual(1360);
      expect(metrics.sessionTop, "mobile reaches journey cards without excessive blank space").toBeLessThanOrEqual(1450);
    }
  });
});
