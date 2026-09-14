// v1.135 coverage: /game continues sequential page completion with Vietnamese first-flow copy.
import { test, expect, type Page } from "@playwright/test";

const web = process.env.LGO_WEB_URL ?? "http://127.0.0.1:3000";

type GameVietnameseMetrics = {
  overflow: number;
  h1Size: number;
  englishLeak: string;
  designReferenceText: string;
  firstFlowText: string;
  heroBottom: number;
  boardTop: number;
  routeTop: number;
  atlasTop: number;
  atlasCardCount: number;
  boardGap: number;
  routeGap: number;
  wireframeBoardVisible: boolean;
};

async function collectGameVietnameseMetrics(page: Page): Promise<GameVietnameseMetrics> {
  return page.evaluate(() => {
    const rect = (selector: string) => {
      const node = document.querySelector<HTMLElement>(selector);
      if (!node) return { top: -1, bottom: -1, height: 0 };
      const r = node.getBoundingClientRect();
      return { top: r.top, bottom: r.bottom, height: r.height };
    };
    const h1 = document.querySelector<HTMLElement>("main h1");
    const firstFlowText = [".lgo-design-target-reference", ".lgo-gamepage-stack .lgo-cinematic-hero", ".lgo-world-route-section", ".lgo-world-atlas-section", ".lgo-game-world-boundary", ".lgo-world-layer-stack"]
      .map((selector) => document.querySelector<HTMLElement>(selector)?.textContent ?? "")
      .join(" ");
    const englishLeak = /(World of Linh Giới|Game reference art|Game world detailed design target|World concept|CONCEPT|World atlas|WORLD ATLAS|route map public|live open-world backend|without claiming|live map streaming|account position|quest state|production world server|World structure|Zone Network|open world|Sky \/ Fog|Far Background|Mid Background|Near Background|Gameplay Plane|Foreground|Design Target First)/i.exec(firstFlowText)?.[0] ?? "";
    const hero = rect(".lgo-gamepage-stack .lgo-cinematic-hero");
    const route = rect(".lgo-gamepage-stack .lgo-world-route-section");
    const board = rect(".lgo-game-world-design-board");
    const atlas = rect(".lgo-gamepage-stack .lgo-world-atlas-section");
    const boardText = document.querySelector<HTMLElement>(".lgo-game-world-design-board")?.textContent ?? "";
    const boardAlt = document.querySelector<HTMLImageElement>(".lgo-game-world-design-board img")?.alt ?? "";
    return {
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      h1Size: h1 ? Number.parseFloat(getComputedStyle(h1).fontSize) : 0,
      englishLeak,
      designReferenceText: document.querySelector<HTMLElement>(".lgo-design-target-reference")?.textContent ?? "",
      firstFlowText,
      heroBottom: hero.bottom,
      boardTop: board.top,
      routeTop: route.top,
      atlasTop: atlas.top,
      atlasCardCount: document.querySelectorAll(".lgo-gamepage-stack .lgo-world-atlas-card").length,
      boardGap: board.top - hero.bottom,
      routeGap: route.top - board.top,
      wireframeBoardVisible: /Bảng tham chiếu bản đồ|Ảnh tham chiếu thế giới|wireframe|reference board/i.test(`${boardText} ${boardAlt}`),
    };
  });
}

test.describe("game world Vietnamese first-flow", () => {
  test("/game uses Vietnamese Public Game World target and first-flow copy", async ({ page, isMobile }) => {
    await page.goto(`${web}/game`);
    await expect(page.getByRole("region", { name: /Design target reference.*Public Game World/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /Thiết kế chi tiết thế giới.*Public Game World.*mở trong tab mới/i })).toHaveAttribute("href", "/design-reference/game-world-detailed-design-target-v1120.png");
    await expect(page.getByRole("heading", { level: 1, name: "Một thế giới có nơi để trở về" })).toBeVisible();
    await expect(page.getByText("Thế giới Linh Giới", { exact: true })).toBeVisible();
    await expect(page.locator(".lgo-world-route-section").getByText("Linh Thành", { exact: true })).toBeVisible();
    await expect(page.locator(".lgo-world-route-section").getByText("Âm Giới", { exact: true })).toBeVisible();
    await expect(page.getByText("Bằng chứng phụ và tuyến liên quan", { exact: true })).toBeVisible();

    const metrics = await collectGameVietnameseMetrics(page);
    expect(metrics.designReferenceText, "game design target link uses Vietnamese visible label").toContain("Thiết kế chi tiết thế giới");
    expect(metrics.firstFlowText, "game first-flow states Vietnamese backend boundary").toContain("chưa phải bản đồ mở hoặc máy chủ thế giới thật");
    expect(metrics.englishLeak, "game first-flow visible copy should be Vietnamese").toBe("");
    expect(metrics.overflow, "game page horizontal overflow").toBeLessThanOrEqual(0);
    expect(metrics.h1Size, "game page h1 follows target scale").toBeLessThanOrEqual(isMobile ? 54 : 60);
    if (!isMobile) {
      expect(metrics.boardGap, "desktop target board should follow the hero like the design target").toBeLessThanOrEqual(16);
      expect(metrics.routeGap, "desktop route strip should follow the target board").toBeLessThanOrEqual(260);
      expect(metrics.routeTop, "desktop route strip enters after the target board").toBeLessThanOrEqual(700);
      expect(metrics.atlasTop, "desktop atlas cards should be visible in the first design-led flow").toBeLessThanOrEqual(900);
      expect(metrics.atlasCardCount, "game scenario should expose all opening world stops").toBeGreaterThanOrEqual(5);
      expect(metrics.wireframeBoardVisible, "first-flow should not show the old wireframe/reference board as product UI").toBe(false);
    }
  });
});
