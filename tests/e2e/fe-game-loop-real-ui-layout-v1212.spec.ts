// v1.212 coverage: /game/loop must close as a real browser UI/UX Layout page slice with Base First shared disclosure.
import { test, expect, type Page } from "@playwright/test";

const web = process.env.LGO_WEB_URL ?? "http://127.0.0.1:3000";

type Metrics = {
  overflow: number;
  h1Font: number;
  maxFont: number;
  heroBottom: number;
  designTop: number;
  designBottom: number;
  gateTop: number;
  gateBottom: number;
  stageTop: number;
  stageBottom: number;
  disclosureTop: number;
  disclosureCount: number;
  expandedBoards: number;
  scrollHeight: number;
  designColumns: number;
  gateColumns: number;
  stageColumns: number;
  focusLabel: string;
  targetText: string;
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
    const design = rect(".lgo-game-loop-design-board");
    const gate = rect(".lgo-game-loop-gate-board");
    const stage = rect(".lgo-gameplay-loop-board");
    const disclosure = rect(".lgo-gameloop-expanded-evidence");
    const expandedBoards = Array.from(document.querySelectorAll<HTMLElement>("main > * > .lgo-panel, main > * > .lgo-detail-next-steps"))
      .filter((element) => !element.closest("details"))
      .length;
    return {
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      h1Font: Number.parseFloat(getComputedStyle(document.querySelector("h1") as HTMLElement).fontSize) || 0,
      maxFont: Math.max(...visibleElements.map((element) => Number.parseFloat(getComputedStyle(element).fontSize) || 0)),
      heroBottom: hero.bottom,
      designTop: design.top,
      designBottom: design.bottom,
      gateTop: gate.top,
      gateBottom: gate.bottom,
      stageTop: stage.top,
      stageBottom: stage.bottom,
      disclosureTop: disclosure.top,
      disclosureCount: document.querySelectorAll("details.lgo-gameloop-expanded-evidence").length,
      expandedBoards,
      scrollHeight: document.documentElement.scrollHeight,
      designColumns: getComputedStyle(document.querySelector(".lgo-game-loop-design-board") as HTMLElement).gridTemplateColumns.split(" ").length,
      gateColumns: getComputedStyle(document.querySelector(".lgo-game-loop-gate-grid") as HTMLElement).gridTemplateColumns.split(" ").length,
      stageColumns: getComputedStyle(document.querySelector(".lgo-gameplay-loop-grid") as HTMLElement).gridTemplateColumns.split(" ").length,
      focusLabel: document.activeElement?.textContent?.trim() ?? "",
      targetText: document.querySelector(".lgo-game-loop-design-board")?.textContent ?? "",
      firstFlowText: [
        document.querySelector(".lgo-game-loop-hero-card")?.textContent ?? "",
        document.querySelector(".lgo-game-loop-design-board")?.textContent ?? "",
        document.querySelector(".lgo-game-loop-gate-board")?.textContent ?? "",
        document.querySelector(".lgo-gameplay-loop-board")?.textContent ?? "",
      ].join("\n"),
    };
  });
}

test.describe("game loop real UI layout v1.212", () => {
  test("/game/loop closes as compact Vietnamese browser layout with shared disclosure", async ({ page, isMobile }) => {
    await page.goto(`${web}/game/loop`);

    await expect(page.getByRole("heading", { level: 1, name: "Vòng lặp gameplay thế giới" })).toBeVisible();
    await expect(page.getByRole("img", { name: "Board vòng lặp gameplay thế giới Linh Giới" })).toBeVisible();
    await expect(page.getByRole("heading", { level: 2, name: "Đọc loop như hành trình kỳ vọng, chưa phải tính năng online" })).toBeVisible();
    await expect(page.getByRole("heading", { level: 2, name: "Loop hiện tại: vào cổng, được dẫn đường, luyện tập, quay lại trust/status" })).toBeVisible();
    await page.keyboard.press("Tab");

    const metrics = await collect(page);
    console.log(JSON.stringify({ viewport: isMobile ? "mobile" : "desktop", metrics }, null, 2));

    expect(metrics.overflow, "horizontal overflow").toBeLessThanOrEqual(0);
    expect(metrics.disclosureCount, "one shared details disclosure for secondary proof").toBe(1);
    expect(metrics.expandedBoards, "top-level boards before disclosure").toBeLessThanOrEqual(5);
    expect(metrics.targetText, "Vietnamese target guardrail").toContain("Gameplay loop là kỳ vọng public");
    expect(metrics.firstFlowText, "first-flow remains Vietnamese and scenario-correct").toContain("Spirit Gate");
    expect(metrics.firstFlowText, "old English/reference/backend labels should not drive first-flow").not.toMatch(/World gameplay loop board|World gameplay loop reference art|Game reference art|without claiming|live combat|inventory persistence|party flow|account integration|combat backend/);
    expect(metrics.focusLabel, "keyboard reaches skip navigation first").toMatch(/Bỏ qua|Skip/i);

    if (isMobile) {
      expect(metrics.h1Font, "mobile h1 scale").toBeLessThanOrEqual(31);
      expect(metrics.maxFont, "mobile visible font cap").toBeLessThanOrEqual(34);
      expect(metrics.heroBottom, "mobile hero compact").toBeLessThanOrEqual(520);
      expect(metrics.designTop, "mobile design follows hero").toBeLessThanOrEqual(535);
      expect(metrics.designBottom, "mobile design compact").toBeLessThanOrEqual(850);
      expect(metrics.gateTop, "mobile gate follows design").toBeLessThanOrEqual(880);
      expect(metrics.gateBottom, "mobile gate compact").toBeLessThanOrEqual(1420);
      expect(metrics.stageTop, "mobile stage follows first-flow").toBeLessThanOrEqual(1450);
      expect(metrics.stageBottom, "mobile stage compact").toBeLessThanOrEqual(2280);
      expect(metrics.disclosureTop, "mobile secondary proof starts after core loop").toBeLessThanOrEqual(2320);
      expect(metrics.scrollHeight, "mobile page height remains reviewable").toBeLessThanOrEqual(3100);
      expect(metrics.designColumns, "mobile design board stacks").toBe(1);
      expect(metrics.gateColumns, "mobile gate uses compact two-column rhythm").toBe(2);
      expect(metrics.stageColumns, "mobile stage uses compact two-column rhythm").toBe(2);
    } else {
      expect(metrics.h1Font, "desktop h1 scale").toBeLessThanOrEqual(50);
      expect(metrics.maxFont, "desktop visible font cap").toBeLessThanOrEqual(52);
      expect(metrics.heroBottom, "desktop hero compact").toBeLessThanOrEqual(380);
      expect(metrics.designTop, "desktop design follows hero").toBeLessThanOrEqual(395);
      expect(metrics.designBottom, "desktop design compact").toBeLessThanOrEqual(620);
      expect(metrics.gateTop, "desktop gate follows target").toBeLessThanOrEqual(650);
      expect(metrics.gateBottom, "desktop gate compact").toBeLessThanOrEqual(1000);
      expect(metrics.stageTop, "desktop stage follows first-flow").toBeLessThanOrEqual(1035);
      expect(metrics.stageBottom, "desktop stage compact").toBeLessThanOrEqual(1440);
      expect(metrics.disclosureTop, "desktop secondary proof starts after core loop").toBeLessThanOrEqual(1480);
      expect(metrics.scrollHeight, "desktop page height remains reviewable").toBeLessThanOrEqual(2050);
      expect(metrics.designColumns, "desktop board split").toBe(2);
      expect(metrics.gateColumns, "desktop three gate cards").toBe(3);
      expect(metrics.stageColumns, "desktop four-stage row").toBe(4);
    }

    await page.evaluate(() => (document.activeElement as HTMLElement | null)?.blur());
    await page.screenshot({ path: `/tmp/game-loop-${isMobile ? "mobile" : "desktop"}-v1212.png`, fullPage: true });
  });
});
