// v1.152 coverage: /accessibility prioritizes real browser UI layout and Base First shared CSS.
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
  principlesTop: number;
  stepColumns: number;
  boardColumns: number;
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
    const hero = rect(".lgo-readable-hero-card");
    const board = rect(".lgo-accessibility-design-board");
    const route = rect(".lgo-accessibility-route-board");
    const principles = rect(".lgo-accessibility-principle-board");
    return {
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      h1Font: Number.parseFloat(getComputedStyle(document.querySelector("h1") as HTMLElement).fontSize) || 0,
      maxFont: Math.max(...visibleElements.map((element) => Number.parseFloat(getComputedStyle(element).fontSize) || 0)),
      heroBottom: hero.bottom,
      boardTop: board.top,
      boardBottom: board.bottom,
      routeTop: route.top,
      routeBottom: route.bottom,
      principlesTop: principles.top,
      stepColumns: getComputedStyle(document.querySelector(".lgo-accessibility-step-grid") as HTMLElement).gridTemplateColumns.split(" ").length,
      boardColumns: getComputedStyle(document.querySelector(".lgo-accessibility-design-board") as HTMLElement).gridTemplateColumns.split(" ").length,
      firstFlowText: [
        document.querySelector(".lgo-readable-hero-card")?.textContent ?? "",
        document.querySelector(".lgo-accessibility-design-board")?.textContent ?? "",
        document.querySelector(".lgo-accessibility-route-board")?.textContent ?? "",
      ].join("\n"),
    };
  });
}

test.describe("accessibility real UI layout v1.152", () => {
  test("/accessibility uses Vietnamese compact shared layout", async ({ page, isMobile }) => {
    await page.goto(`${web}/accessibility`);

    await expect(page.getByRole("heading", { level: 1, name: "Dễ đọc và dễ thao tác" })).toBeVisible();
    await expect(page.getByRole("img", { name: "Bảng lộ trình đọc dễ thao tác Linh Giới" })).toBeVisible();
    await expect(page.getByRole("heading", { level: 2, name: "Một trang để kiểm tra cách người chơi đọc website" })).toBeVisible();
    await expect(page.getByRole("heading", { level: 2, name: "Đọc tiêu đề trước" })).toBeVisible();

    const metrics = await collect(page);
    expect(metrics.overflow, "horizontal overflow").toBeLessThanOrEqual(0);
    expect(metrics.maxFont, "visible font cap").toBeLessThanOrEqual(isMobile ? 42 : 58);
    expect(metrics.firstFlowText, "English design labels should not drive first-flow").not.toMatch(/Accessibility và readability cho người chơi mới|Accessibility readability route map board|Game reference art|No formal WCAG audit|legal compliance claim|personal settings backend|formal WCAG audit/);

    if (isMobile) {
      expect(metrics.h1Font, "mobile h1 scale").toBeLessThanOrEqual(42);
      expect(metrics.heroBottom, "mobile hero compact").toBeLessThanOrEqual(555);
      expect(metrics.boardTop, "mobile board follows hero").toBeLessThanOrEqual(590);
      expect(metrics.boardBottom, "mobile board compact").toBeLessThanOrEqual(930);
      expect(metrics.routeTop, "mobile route board follows target").toBeLessThanOrEqual(970);
      expect(metrics.routeBottom, "mobile route board compact").toBeLessThanOrEqual(1700);
      expect(metrics.principlesTop, "mobile detail board follows first-flow").toBeLessThanOrEqual(1720);
      expect(metrics.stepColumns, "mobile steps stack").toBe(1);
      expect(metrics.boardColumns, "mobile board stacks").toBe(1);
    } else {
      expect(metrics.h1Font, "desktop h1 scale").toBeLessThanOrEqual(58);
      expect(metrics.heroBottom, "desktop hero compact").toBeLessThanOrEqual(440);
      expect(metrics.boardTop, "desktop board follows hero").toBeLessThanOrEqual(475);
      expect(metrics.boardBottom, "desktop board compact").toBeLessThanOrEqual(745);
      expect(metrics.routeTop, "desktop route board follows target").toBeLessThanOrEqual(780);
      expect(metrics.routeBottom, "desktop route board compact").toBeLessThanOrEqual(1190);
      expect(metrics.principlesTop, "desktop detail board follows first-flow").toBeLessThanOrEqual(1210);
      expect(metrics.stepColumns, "desktop three-step row").toBe(3);
      expect(metrics.boardColumns, "desktop board split").toBe(2);
    }
  });
});
