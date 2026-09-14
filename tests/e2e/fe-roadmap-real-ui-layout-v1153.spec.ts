// v1.153 coverage: /roadmap prioritizes real browser UI layout and Base First shared CSS.
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
  readinessTop: number;
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
    const hero = rect(".lgo-roadmap-hero-card");
    const board = rect(".lgo-roadmap-design-board");
    const route = rect(".lgo-roadmap-route-board");
    const readiness = rect(".lgo-release-readiness-hub-cta, .lgo-release-readiness-hub, [class*='release-readiness']");
    return {
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      h1Font: Number.parseFloat(getComputedStyle(document.querySelector("h1") as HTMLElement).fontSize) || 0,
      maxFont: Math.max(...visibleElements.map((element) => Number.parseFloat(getComputedStyle(element).fontSize) || 0)),
      heroBottom: hero.bottom,
      boardTop: board.top,
      boardBottom: board.bottom,
      routeTop: route.top,
      routeBottom: route.bottom,
      readinessTop: readiness.top,
      stepColumns: getComputedStyle(document.querySelector(".lgo-roadmap-step-grid") as HTMLElement).gridTemplateColumns.split(" ").length,
      boardColumns: getComputedStyle(document.querySelector(".lgo-roadmap-design-board") as HTMLElement).gridTemplateColumns.split(" ").length,
      firstFlowText: [
        document.querySelector(".lgo-roadmap-hero-card")?.textContent ?? "",
        document.querySelector(".lgo-roadmap-design-board")?.textContent ?? "",
        document.querySelector(".lgo-roadmap-route-board")?.textContent ?? "",
      ].join("\n"),
    };
  });
}

test.describe("roadmap real UI layout v1.153", () => {
  test("/roadmap uses Vietnamese compact shared layout", async ({ page, isMobile }) => {
    await page.goto(`${web}/roadmap`);

    await expect(page.getByRole("heading", { level: 1, name: "Roadmap phát triển web" })).toBeVisible();
    await expect(page.getByRole("img", { name: "Bảng luồng roadmap public Linh Giới" })).toBeVisible();
    await expect(page.getByRole("heading", { level: 2, name: "Phân biệt rõ đang làm, kế tiếp và đang bị chặn" })).toBeVisible();
    await expect(page.getByRole("heading", { level: 2, name: "Đọc trạng thái hiện tại" })).toBeVisible();

    const metrics = await collect(page);
    expect(metrics.overflow, "horizontal overflow").toBeLessThanOrEqual(0);
    expect(metrics.maxFont, "visible font cap").toBeLessThanOrEqual(isMobile ? 42 : 58);
    expect(metrics.firstFlowText, "English design/backend labels should not drive first-flow").not.toMatch(/Public roadmap flow design board|Game reference art|Roadmap flow before release promise|production auth|backend integration|Auth\/API|DB|CMS|full MMO gameplay/);

    if (isMobile) {
      expect(metrics.h1Font, "mobile h1 scale").toBeLessThanOrEqual(42);
      expect(metrics.heroBottom, "mobile hero compact").toBeLessThanOrEqual(555);
      expect(metrics.boardTop, "mobile board follows hero").toBeLessThanOrEqual(590);
      expect(metrics.boardBottom, "mobile board compact").toBeLessThanOrEqual(915);
      expect(metrics.routeTop, "mobile route board follows target").toBeLessThanOrEqual(950);
      expect(metrics.routeBottom, "mobile route board compact").toBeLessThanOrEqual(1680);
      expect(metrics.readinessTop, "mobile deeper CTA follows first-flow").toBeLessThanOrEqual(1700);
      expect(metrics.stepColumns, "mobile steps stack").toBe(1);
      expect(metrics.boardColumns, "mobile board stacks").toBe(1);
    } else {
      expect(metrics.h1Font, "desktop h1 scale").toBeLessThanOrEqual(58);
      expect(metrics.heroBottom, "desktop hero compact").toBeLessThanOrEqual(440);
      expect(metrics.boardTop, "desktop board follows hero").toBeLessThanOrEqual(475);
      expect(metrics.boardBottom, "desktop board compact").toBeLessThanOrEqual(745);
      expect(metrics.routeTop, "desktop route board follows target").toBeLessThanOrEqual(780);
      expect(metrics.routeBottom, "desktop route board compact").toBeLessThanOrEqual(1220);
      expect(metrics.readinessTop, "desktop deeper CTA follows first-flow").toBeLessThanOrEqual(1240);
      expect(metrics.stepColumns, "desktop three-step row").toBe(3);
      expect(metrics.boardColumns, "desktop board split").toBe(2);
    }
  });
});
