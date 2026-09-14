// v1.151 coverage: /performance prioritizes real browser UI layout and Base First shared CSS.
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
    const hero = rect(".lgo-performance-hero-card");
    const board = rect(".lgo-performance-design-board");
    const route = rect(".lgo-performance-route-board");
    const principles = rect(".lgo-performance-principle-board");
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
      stepColumns: getComputedStyle(document.querySelector(".lgo-performance-step-grid") as HTMLElement).gridTemplateColumns.split(" ").length,
      boardColumns: getComputedStyle(document.querySelector(".lgo-performance-design-board") as HTMLElement).gridTemplateColumns.split(" ").length,
      firstFlowText: [
        document.querySelector(".lgo-performance-hero-card")?.textContent ?? "",
        document.querySelector(".lgo-performance-design-board")?.textContent ?? "",
        document.querySelector(".lgo-performance-route-board")?.textContent ?? "",
      ].join("\n"),
    };
  });
}

test.describe("performance real UI layout v1.151", () => {
  test("/performance uses Vietnamese compact shared layout", async ({ page, isMobile }) => {
    await page.goto(`${web}/performance`);

    await expect(page.getByRole("heading", { level: 1, name: "Hiệu năng và ngân sách nội dung" })).toBeVisible();
    await expect(page.getByRole("img", { name: "Bảng HUD ngân sách hiệu năng public Linh Giới" })).toBeVisible();
    await expect(page.getByText("Ngân sách đầu trang")).toBeVisible();
    await expect(page.getByRole("heading", { level: 2, name: "Nhẹ ở lần đọc đầu" })).toBeVisible();

    const metrics = await collect(page);
    expect(metrics.overflow, "horizontal overflow").toBeLessThanOrEqual(0);
    expect(metrics.maxFont, "visible font cap").toBeLessThanOrEqual(isMobile ? 42 : 58);
    expect(metrics.firstFlowText, "English design labels should not drive first-flow").not.toMatch(/Performance, copy và asset budget cho public web|Performance copy budget HUD board|Game reference art|without claiming|image CDN claim|Lighthouse certification/);

    if (isMobile) {
      expect(metrics.h1Font, "mobile h1 scale").toBeLessThanOrEqual(42);
      expect(metrics.heroBottom, "mobile hero compact").toBeLessThanOrEqual(570);
      expect(metrics.boardTop, "mobile board follows hero").toBeLessThanOrEqual(610);
      expect(metrics.boardBottom, "mobile board compact").toBeLessThanOrEqual(930);
      expect(metrics.routeTop, "mobile route board follows target").toBeLessThanOrEqual(970);
      expect(metrics.routeBottom, "mobile route board compact").toBeLessThanOrEqual(1700);
      expect(metrics.principlesTop, "mobile detail board follows first-flow").toBeLessThanOrEqual(1720);
      expect(metrics.stepColumns, "mobile steps stack").toBe(1);
      expect(metrics.boardColumns, "mobile board stacks").toBe(1);
    } else {
      expect(metrics.h1Font, "desktop h1 scale").toBeLessThanOrEqual(58);
      expect(metrics.heroBottom, "desktop hero compact").toBeLessThanOrEqual(490);
      expect(metrics.boardTop, "desktop board follows hero").toBeLessThanOrEqual(525);
      expect(metrics.boardBottom, "desktop board compact").toBeLessThanOrEqual(795);
      expect(metrics.routeTop, "desktop route board follows target").toBeLessThanOrEqual(830);
      expect(metrics.routeBottom, "desktop route board compact").toBeLessThanOrEqual(1280);
      expect(metrics.principlesTop, "desktop detail board follows first-flow").toBeLessThanOrEqual(1300);
      expect(metrics.stepColumns, "desktop three-step row").toBe(3);
      expect(metrics.boardColumns, "desktop board split").toBe(2);
    }
  });
});
