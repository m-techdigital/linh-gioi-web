// v1.213 coverage: /game must close as a real browser UI/UX Layout page slice with Base First shared CSS.
import { test, expect, type Page } from "@playwright/test";

const web = process.env.LGO_WEB_URL ?? "http://127.0.0.1:3000";

type Metrics = {
  overflow: number;
  h1Font: number;
  maxFont: number;
  heroBottom: number;
  boardTop: number;
  boardBottom: number;
  routeTop: number;
  routeBottom: number;
  atlasTop: number;
  atlasBottom: number;
  disclosureTop: number;
  disclosureCount: number;
  expandedBoards: number;
  scrollHeight: number;
  boardColumns: number;
  routeColumns: number;
  atlasColumns: number;
  focusLabel: string;
  boardText: string;
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
      return box.width > 0 && box.height > 0 && style.display !== "none" && style.visibility !== "hidden" && !element.closest("details:not([open])");
    });
    const hero = rect(".lgo-gamepage-stack .lgo-cinematic-hero");
    const board = rect(".lgo-game-world-design-board");
    const route = rect(".lgo-gamepage-stack .lgo-world-route-section");
    const atlas = rect(".lgo-gamepage-stack .lgo-world-atlas-section");
    const disclosure = rect(".lgo-gamepage-expanded-evidence");
    const expandedBoards = Array.from(document.querySelectorAll<HTMLElement>("main > * > section, main > * > aside, main > * > figure"))
      .filter((element) => !element.closest("details"))
      .length;
    return {
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      h1Font: Number.parseFloat(getComputedStyle(document.querySelector("h1") as HTMLElement).fontSize) || 0,
      maxFont: Math.max(...visibleElements.map((element) => Number.parseFloat(getComputedStyle(element).fontSize) || 0)),
      heroBottom: hero.bottom,
      boardTop: board.top,
      boardBottom: board.bottom,
      routeTop: route.top,
      routeBottom: route.bottom,
      atlasTop: atlas.top,
      atlasBottom: atlas.bottom,
      disclosureTop: disclosure.top,
      disclosureCount: document.querySelectorAll("details.lgo-gamepage-expanded-evidence").length,
      expandedBoards,
      scrollHeight: document.documentElement.scrollHeight,
      boardColumns: getComputedStyle(document.querySelector(".lgo-game-world-design-board") as HTMLElement).gridTemplateColumns.split(" ").length,
      routeColumns: getComputedStyle(document.querySelector(".lgo-world-route") as HTMLElement).gridTemplateColumns.split(" ").length,
      atlasColumns: getComputedStyle(document.querySelector(".lgo-world-atlas-stories") as HTMLElement).gridTemplateColumns.split(" ").length,
      focusLabel: document.activeElement?.textContent?.trim() ?? "",
      boardText: document.querySelector(".lgo-game-world-design-board")?.textContent ?? "",
      firstFlowText: [
        document.querySelector(".lgo-gamepage-stack .lgo-cinematic-hero")?.textContent ?? "",
        document.querySelector(".lgo-game-world-design-board")?.textContent ?? "",
        document.querySelector(".lgo-gamepage-stack .lgo-world-route-section")?.textContent ?? "",
        document.querySelector(".lgo-gamepage-stack .lgo-world-atlas-section")?.textContent ?? "",
      ].join("\n"),
    };
  });
}

test.describe("game overview real UI layout v1.213", () => {
  test("/game renders compact Vietnamese world overview against the shared target", async ({ page, isMobile }) => {
    await page.goto(`${web}/game`);

    await expect(page.getByRole("heading", { level: 1, name: "Một thế giới có nơi để trở về" })).toBeVisible();
    await expect(page.getByRole("img", { name: "Game world atlas hub board" })).toBeVisible();
    await expect(page.getByRole("heading", { level: 2, name: "Rời thành phố. Tìm dấu vết. Đi tới nơi cánh cổng mở ra." })).toBeVisible();
    await expect(page.getByRole("heading", { level: 2, name: "Mỗi nơi trong Linh Giới phải cho bạn một cảm giác khác" })).toBeVisible();
    await page.keyboard.press("Tab");

    const metrics = await collect(page);
    console.log(JSON.stringify({ viewport: isMobile ? "mobile" : "desktop", metrics }, null, 2));

    expect(metrics.overflow, "horizontal overflow").toBeLessThanOrEqual(0);
    expect(metrics.disclosureCount, "one shared disclosure for secondary world proof").toBe(1);
    expect(metrics.expandedBoards, "top-level first-flow sections before disclosure").toBeLessThanOrEqual(4);
    expect(metrics.boardText, "Vietnamese board target guardrail").toContain("Thế giới công khai là tuyến đọc vùng đất");
    expect(metrics.firstFlowText, "first-flow remains Vietnamese and scenario-correct").toContain("Linh Thành");
    expect(metrics.firstFlowText).toContain("Âm Giới");
    expect(metrics.focusLabel, "keyboard reaches skip navigation first").toMatch(/Bỏ qua|Skip/i);

    if (isMobile) {
      expect(metrics.h1Font, "mobile h1 scale").toBeLessThanOrEqual(34);
      expect(metrics.maxFont, "mobile visible font cap").toBeLessThanOrEqual(36);
      expect(metrics.heroBottom, "mobile hero compact").toBeLessThanOrEqual(720);
      expect(metrics.boardTop, "mobile board follows hero").toBeLessThanOrEqual(740);
      expect(metrics.boardBottom, "mobile board compact").toBeLessThanOrEqual(1060);
      expect(metrics.routeTop, "mobile route follows board").toBeLessThanOrEqual(1090);
      expect(metrics.routeBottom, "mobile route compact").toBeLessThanOrEqual(1800);
      expect(metrics.atlasTop, "mobile atlas follows route").toBeLessThanOrEqual(1830);
      expect(metrics.atlasBottom, "mobile atlas compact").toBeLessThanOrEqual(3150);
      expect(metrics.disclosureTop, "mobile secondary proof after atlas").toBeLessThanOrEqual(3180);
      expect(metrics.scrollHeight, "mobile page height remains reviewable").toBeLessThanOrEqual(3950);
      expect(metrics.boardColumns, "mobile board stacks").toBe(1);
      expect(metrics.routeColumns, "mobile route uses two-column rhythm").toBe(2);
      expect(metrics.atlasColumns, "mobile atlas uses one-column cards").toBe(1);
    } else {
      expect(metrics.h1Font, "desktop h1 scale").toBeLessThanOrEqual(52);
      expect(metrics.maxFont, "desktop visible font cap").toBeLessThanOrEqual(54);
      expect(metrics.heroBottom, "desktop hero compact").toBeLessThanOrEqual(385);
      expect(metrics.boardTop, "desktop board follows hero").toBeLessThanOrEqual(405);
      expect(metrics.boardBottom, "desktop board compact").toBeLessThanOrEqual(625);
      expect(metrics.routeTop, "desktop route follows board").toBeLessThanOrEqual(655);
      expect(metrics.routeBottom, "desktop route compact").toBeLessThanOrEqual(970);
      expect(metrics.atlasTop, "desktop atlas follows route").toBeLessThanOrEqual(1005);
      expect(metrics.atlasBottom, "desktop atlas compact").toBeLessThanOrEqual(1450);
      expect(metrics.disclosureTop, "desktop secondary proof after atlas").toBeLessThanOrEqual(1490);
      expect(metrics.scrollHeight, "desktop page height remains reviewable").toBeLessThanOrEqual(2150);
      expect(metrics.boardColumns, "desktop board split").toBe(2);
      expect(metrics.routeColumns, "desktop world route five stops").toBe(5);
      expect(metrics.atlasColumns, "desktop atlas five cards").toBe(5);
    }

    await page.evaluate(() => (document.activeElement as HTMLElement | null)?.blur());
    await page.screenshot({ path: `/tmp/game-${isMobile ? "mobile" : "desktop"}-v1213.png`, fullPage: true });
  });
});
