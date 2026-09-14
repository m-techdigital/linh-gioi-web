// v1.139 coverage: /start uses Vietnamese target copy and follows the refreshed tutorial-start target.
import { test, expect } from "@playwright/test";

const web = process.env.LGO_WEB_URL ?? "http://127.0.0.1:3000";

type StartDesignMetrics = {
  overflow: number;
  h1Size: number;
  heroHeight: number;
  heroBottom: number;
  stepsBottom: number;
  boardTop: number;
  boardVisibleHeight: number;
  screenshotTop: number;
  targetText: string;
  bodyText: string;
};

async function collectStartDesignMetrics(page): Promise<StartDesignMetrics> {
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
    const hero = rect(".lgo-startpage-stack .lgo-start-hero");
    const steps = rect(".lgo-startpage-stack .lgo-onboarding-steps");
    const board = rect(".lgo-startpage-stack .lgo-start-design-board");
    const screenshot = rect(".lgo-startpage-stack .lgo-start-real-screenshot-panel");
    const h1 = document.querySelector<HTMLElement>("main h1");
    const target = document.querySelector<HTMLElement>(".lgo-design-target-reference");
    return {
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      h1Size: h1 ? Number.parseFloat(getComputedStyle(h1).fontSize) : 0,
      heroHeight: hero.height,
      heroBottom: hero.bottom,
      stepsBottom: steps.bottom,
      boardTop: board.top,
      boardVisibleHeight: visibleHeight(".lgo-startpage-stack .lgo-start-design-board"),
      screenshotTop: screenshot.top,
      targetText: target?.textContent ?? "",
      sceneHeight: rect(".lgo-startpage-stack .lgo-cinematic-scene").height,
      sceneTop: rect(".lgo-startpage-stack .lgo-cinematic-scene").top,
      bodyText: document.body.innerText,
    };
  });
}

test.describe("start Vietnamese design match v1.139", () => {
  test("/start uses Vietnamese target copy and tutorial first-flow density", async ({ page, isMobile }) => {
    await page.goto(`${web}/start`);
    await expect(page.getByRole("link", { name: /Thiết kế chi tiết bắt đầu/i })).toBeVisible();
    await expect(page.getByText("Start detailed design target")).toHaveCount(0);
    await expect(page.getByText("Player journey")).toHaveCount(0);
    await expect(page.getByText("Move / Jump / Dash", { exact: false })).toHaveCount(0);
    await expect(page.getByText("Class Skill", { exact: false })).toHaveCount(0);
    await expect(page.getByText("Shadow Slime", { exact: false })).toHaveCount(0);
    await expect(page.getByText("Game reference art")).toHaveCount(0);
    await expect(page.getByText("Real onboarding screenshots")).toHaveCount(0);
    await expect(page.getByText("public build", { exact: false })).toHaveCount(0);
    await expect(page.getByLabel("Minh họa Linh Thành và khe nứt Âm Giới")).toBeVisible();
    await expect(page.getByText("Ý tưởng thế giới · Đông Môn")).toBeVisible();

    const metrics = await collectStartDesignMetrics(page);
    expect(metrics.targetText, "start target label is Vietnamese").toContain("Thiết kế chi tiết bắt đầu");
    expect(metrics.overflow, "start page horizontal overflow").toBeLessThanOrEqual(0);
    expect(metrics.h1Size, "start h1 stays below giant-font threshold").toBeLessThanOrEqual(isMobile ? 52 : 68);
    expect(metrics.bodyText, "English implementation labels should not leak into /start first-flow").not.toMatch(/Start detailed design target|Move \/ Jump \/ Dash|Class Skill|Shadow Slime|Game reference art|Real onboarding screenshots|public build/);

    if (!isMobile) {
      expect(metrics.heroHeight, "desktop start hero leaves room for tutorial board").toBeLessThanOrEqual(520);
      expect(metrics.sceneHeight, "desktop start hero uses the shared Đông Môn cinematic scene").toBeGreaterThanOrEqual(260);
      expect(metrics.sceneTop, "desktop cinematic scene sits inside the first hero target").toBeLessThanOrEqual(210);
      expect(metrics.boardTop, "tutorial board starts in the opening viewport").toBeLessThanOrEqual(690);
      expect(metrics.boardVisibleHeight, "tutorial board remains visible in first fold").toBeGreaterThanOrEqual(90);
      expect(metrics.screenshotTop, "real screenshot panel follows the tutorial board").toBeGreaterThan(metrics.boardTop);
    } else {
      expect(metrics.heroBottom, "mobile start hero remains readable without extreme sprawl").toBeLessThanOrEqual(760);
      expect(metrics.sceneHeight, "mobile start hero keeps the Đông Môn cinematic scene visible").toBeGreaterThanOrEqual(160);
      expect(metrics.boardTop, "mobile reaches tutorial board without excessive blank space").toBeLessThanOrEqual(900);
    }
  });
});
