// v1.150 coverage: /community/onboarding prioritizes real browser UI layout and Base First shared CSS.
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
  firstCtaTop: number;
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
    const hero = rect(".lgo-community-onboarding-hero-card");
    const board = rect(".lgo-community-onboarding-design-board");
    const route = rect(".lgo-community-onboarding-route-board");
    const cta = rect(".lgo-release-readiness-hub-cta, .lgo-release-readiness-hub, [class*='release-readiness']");
    return {
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      h1Font: Number.parseFloat(getComputedStyle(document.querySelector("h1") as HTMLElement).fontSize) || 0,
      maxFont: Math.max(...visibleElements.map((element) => Number.parseFloat(getComputedStyle(element).fontSize) || 0)),
      heroBottom: hero.bottom,
      boardTop: board.top,
      boardBottom: board.bottom,
      routeTop: route.top,
      routeBottom: route.bottom,
      firstCtaTop: cta.top,
      stepColumns: getComputedStyle(document.querySelector(".lgo-community-onboarding-step-grid") as HTMLElement).gridTemplateColumns.split(" ").length,
      boardColumns: getComputedStyle(document.querySelector(".lgo-community-onboarding-design-board") as HTMLElement).gridTemplateColumns.split(" ").length,
      firstFlowText: [
        document.querySelector(".lgo-community-onboarding-hero-card")?.textContent ?? "",
        document.querySelector(".lgo-community-onboarding-design-board")?.textContent ?? "",
        document.querySelector(".lgo-community-onboarding-route-board")?.textContent ?? "",
      ].join("\n"),
    };
  });
}

test.describe("community onboarding real UI layout v1.150", () => {
  test("/community/onboarding uses Vietnamese compact shared layout", async ({ page, isMobile }) => {
    await page.goto(`${web}/community/onboarding`);

    await expect(page.getByRole("heading", { level: 1, name: "Hòa nhập cộng đồng Linh Giới" })).toBeVisible();
    await expect(page.getByRole("img", { name: "Bảng vòng chơi hòa nhập cộng đồng Linh Giới" })).toBeVisible();
    await expect(page.getByText("Luồng đọc đề xuất")).toBeVisible();
    await expect(page.getByRole("heading", { level: 2, name: "Kiểm tra trạng thái" })).toBeVisible();

    const metrics = await collect(page);
    expect(metrics.overflow, "horizontal overflow").toBeLessThanOrEqual(0);
    expect(metrics.maxFont, "visible font cap").toBeLessThanOrEqual(isMobile ? 42 : 58);
    expect(metrics.firstFlowText, "English/backend wording should not drive first-flow").not.toMatch(/Community \/ roadmap onboarding|No live forum|ticket backend|fake waitlist|Game reference art|forum live|guild chat|waitlist|CMS|DB persistence/);

    if (isMobile) {
      expect(metrics.h1Font, "mobile h1 scale").toBeLessThanOrEqual(42);
      expect(metrics.heroBottom, "mobile hero compact").toBeLessThanOrEqual(560);
      expect(metrics.boardTop, "mobile board follows hero").toBeLessThanOrEqual(600);
      expect(metrics.boardBottom, "mobile board compact").toBeLessThanOrEqual(925);
      expect(metrics.routeTop, "mobile route board follows target").toBeLessThanOrEqual(970);
      expect(metrics.routeBottom, "mobile route board compact").toBeLessThanOrEqual(1800);
      expect(metrics.firstCtaTop, "mobile deeper CTA follows first-flow").toBeLessThanOrEqual(1820);
      expect(metrics.stepColumns, "mobile steps stack").toBe(1);
      expect(metrics.boardColumns, "mobile board stacks").toBe(1);
    } else {
      expect(metrics.h1Font, "desktop h1 scale").toBeLessThanOrEqual(58);
      expect(metrics.heroBottom, "desktop hero compact").toBeLessThanOrEqual(430);
      expect(metrics.boardTop, "desktop board follows hero").toBeLessThanOrEqual(470);
      expect(metrics.boardBottom, "desktop board compact").toBeLessThanOrEqual(740);
      expect(metrics.routeTop, "desktop route board follows target").toBeLessThanOrEqual(780);
      expect(metrics.routeBottom, "desktop route board compact").toBeLessThanOrEqual(1260);
      expect(metrics.firstCtaTop, "desktop deeper CTA follows first-flow").toBeLessThanOrEqual(1280);
      expect(metrics.stepColumns, "desktop three-step row").toBe(3);
      expect(metrics.boardColumns, "desktop board split").toBe(2);
    }
  });
});
