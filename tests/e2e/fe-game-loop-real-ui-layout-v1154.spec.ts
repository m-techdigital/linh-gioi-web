// v1.154 coverage: /game/loop prioritizes real browser UI layout and Base First shared CSS.
import { test, expect, type Page } from "@playwright/test";

const web = process.env.LGO_WEB_URL ?? "http://127.0.0.1:3000";

type Metrics = {
  overflow: number;
  h1Font: number;
  maxFont: number;
  heroBottom: number;
  boardTop: number;
  boardBottom: number;
  gateTop: number;
  gateBottom: number;
  stageTop: number;
  trustTop: number;
  boardColumns: number;
  gateColumns: number;
  stageColumns: number;
  firstFlowText: string;
};

async function collect(page: Page): Promise<Metrics> {
  return page.evaluate(() => {
    const rect = (selector: string) => {
      const element = document.querySelector<HTMLElement>(selector);
      if (!element) throw new Error(`missing selector ${selector}`);
      return element.getBoundingClientRect();
    };
    const visibleElements = Array.from(document.querySelectorAll<HTMLElement>("body *")).filter((element) => {
      const box = element.getBoundingClientRect();
      const style = getComputedStyle(element);
      return box.width > 0 && box.height > 0 && style.display !== "none" && style.visibility !== "hidden";
    });
    const hero = rect(".lgo-game-loop-hero-card");
    const board = rect(".lgo-game-loop-design-board");
    const gate = rect(".lgo-game-loop-gate-board");
    const stage = rect(".lgo-gameplay-loop-board");
    const trust = rect("[class*='player-trust'], .lgo-release-trust-cta, .lgo-trust-release-cta");
    return {
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      h1Font: Number.parseFloat(getComputedStyle(document.querySelector("h1") as HTMLElement).fontSize) || 0,
      maxFont: Math.max(...visibleElements.map((element) => Number.parseFloat(getComputedStyle(element).fontSize) || 0)),
      heroBottom: hero.bottom,
      boardTop: board.top,
      boardBottom: board.bottom,
      gateTop: gate.top,
      gateBottom: gate.bottom,
      stageTop: stage.top,
      trustTop: trust.top,
      boardColumns: getComputedStyle(document.querySelector(".lgo-game-loop-design-board") as HTMLElement).gridTemplateColumns.split(" ").length,
      gateColumns: getComputedStyle(document.querySelector(".lgo-game-loop-gate-grid") as HTMLElement).gridTemplateColumns.split(" ").length,
      stageColumns: getComputedStyle(document.querySelector(".lgo-gameplay-loop-grid") as HTMLElement).gridTemplateColumns.split(" ").length,
      firstFlowText: [
        document.querySelector(".lgo-game-loop-hero-card")?.textContent ?? "",
        document.querySelector(".lgo-game-loop-design-board")?.textContent ?? "",
        document.querySelector(".lgo-game-loop-gate-board")?.textContent ?? "",
      ].join("\n"),
    };
  });
}

test.describe("game loop real UI layout v1.154", () => {
  test("/game/loop uses Vietnamese compact shared layout", async ({ page, isMobile }) => {
    await page.goto(`${web}/game/loop`);

    await expect(page.getByRole("heading", { level: 1, name: "Vòng lặp gameplay thế giới" })).toBeVisible();
    await expect(page.getByRole("img", { name: "Board vòng lặp gameplay thế giới Linh Giới" })).toBeVisible();
    await expect(page.getByRole("heading", { level: 2, name: "Đọc loop như hành trình kỳ vọng, chưa phải tính năng online" })).toBeVisible();
    await expect(page.getByRole("heading", { level: 2, name: "Vào cổng", exact: true })).toBeVisible();

    const metrics = await collect(page);
    expect(metrics.overflow, "horizontal overflow").toBeLessThanOrEqual(0);
    expect(metrics.maxFont, "visible font cap").toBeLessThanOrEqual(isMobile ? 34 : 56);
    expect(metrics.firstFlowText, "old English/reference/backend labels should not drive first-flow").not.toMatch(/World gameplay loop board|World gameplay loop reference art|Game reference art|without claiming|live combat|inventory persistence|party flow|account integration|combat backend/);

    if (isMobile) {
      expect(metrics.h1Font, "mobile h1 scale").toBeLessThanOrEqual(34);
      expect(metrics.heroBottom, "mobile hero compact").toBeLessThanOrEqual(535);
      expect(metrics.boardTop, "mobile board follows hero").toBeLessThanOrEqual(565);
      expect(metrics.boardBottom, "mobile board compact").toBeLessThanOrEqual(905);
      expect(metrics.gateTop, "mobile gate follows board").toBeLessThanOrEqual(935);
      expect(metrics.gateBottom, "mobile gate compact").toBeLessThanOrEqual(1530);
      expect(metrics.stageTop, "mobile stage follows first-flow").toBeLessThanOrEqual(1545);
      expect(metrics.boardColumns, "mobile board stacks").toBe(1);
      expect(metrics.gateColumns, "mobile gate uses compact two-column rhythm").toBe(2);
      expect(metrics.stageColumns, "mobile stage stacks").toBe(1);
    } else {
      expect(metrics.h1Font, "desktop h1 scale").toBeLessThanOrEqual(56);
      expect(metrics.heroBottom, "desktop hero compact").toBeLessThanOrEqual(385);
      expect(metrics.boardTop, "desktop board follows hero").toBeLessThanOrEqual(395);
      expect(metrics.boardBottom, "desktop board compact").toBeLessThanOrEqual(660);
      expect(metrics.gateTop, "desktop gate follows target").toBeLessThanOrEqual(690);
      expect(metrics.gateBottom, "desktop gate compact").toBeLessThanOrEqual(1150);
      expect(metrics.stageTop, "desktop stage follows first-flow").toBeLessThanOrEqual(1160);
      expect(metrics.trustTop, "desktop trust CTA stays after gameplay proof").toBeGreaterThan(metrics.stageTop);
      expect(metrics.boardColumns, "desktop board split").toBe(2);
      expect(metrics.gateColumns, "desktop three gate cards").toBe(3);
      expect(metrics.stageColumns, "desktop four-stage row").toBe(4);
    }
  });
});
