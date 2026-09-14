// v1.198 coverage: /events must render compact Vietnamese static events page using shared service proof layout without fake live event claims.
import { test, expect, type Page } from "@playwright/test";

const web = process.env.LGO_WEB_URL ?? "http://127.0.0.1:3000";

type EventsMetrics = {
  h1Font: number;
  maxFont: number;
  pageOverflow: number;
  heroTop: number;
  heroBottom: number;
  boardTop: number;
  firstCardTop: number;
  actionTop: number;
  scrollHeight: number;
  eventCards: number;
  gridColumns: number;
};

async function collectEventsMetrics(page: Page): Promise<EventsMetrics> {
  return page.evaluate(() => {
    const visibleElements = Array.from(document.querySelectorAll<HTMLElement>("body *")).filter((element) => {
      const rect = element.getBoundingClientRect();
      const style = getComputedStyle(element);
      return rect.width > 0 && rect.height > 0 && style.visibility !== "hidden" && style.display !== "none";
    });
    const rect = (selector: string) => {
      const element = document.querySelector<HTMLElement>(selector);
      if (!element) throw new Error(`Missing ${selector}`);
      const box = element.getBoundingClientRect();
      return { top: box.top, bottom: box.bottom };
    };
    const h1 = document.querySelector<HTMLElement>("h1");
    const hero = rect(".lgo-events-hero-card");
    const board = rect(".lgo-events-board");
    const firstCard = rect(".lgo-events-card");
    const action = rect(".lgo-action-band");
    const grid = document.querySelector<HTMLElement>(".lgo-events-grid");
    if (!h1 || !grid) throw new Error("Missing events layout anchors");
    return {
      h1Font: Number.parseFloat(getComputedStyle(h1).fontSize) || 0,
      maxFont: Math.max(...visibleElements.map((element) => Number.parseFloat(getComputedStyle(element).fontSize) || 0)),
      pageOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      heroTop: hero.top,
      heroBottom: hero.bottom,
      boardTop: board.top,
      firstCardTop: firstCard.top,
      actionTop: action.top,
      scrollHeight: document.documentElement.scrollHeight,
      eventCards: document.querySelectorAll(".lgo-events-card").length,
      gridColumns: getComputedStyle(grid).gridTemplateColumns.split(" ").length,
    };
  });
}

test.describe("events real UI layout v1.198", () => {
  test("/events renders compact Vietnamese static events page with shared service layout", async ({ page, isMobile }) => {
    await page.goto(`${web}/events`);

    await expect(page.getByRole("heading", { level: 1, name: "Sự kiện Linh Giới" })).toBeVisible();
    await expect(page.getByText("Lịch sự kiện tĩnh", { exact: true })).toBeVisible();
    await expect(page.getByRole("heading", { level: 2, name: "Sự kiện hiện là thông báo định hướng cộng đồng" })).toBeVisible();
    await expect(page.locator(".lgo-events-hero-card")).toBeVisible();
    await expect(page.locator(".lgo-events-board")).toBeVisible();
    await expect(page.locator(".lgo-events-card")).toHaveCount(1);
    await expect(page.locator(".lgo-action-band")).toBeVisible();

    const mainText = await page.locator("main").innerText();
    expect(mainText).toContain("Chưa có lịch live, đăng ký tham gia hoặc phần thưởng sự kiện.");
    expect(mainText).not.toMatch(/CMS production|backend scheduler|reward entitlement|event registration form|live calendar|production event backend|claim phần thưởng/i);

    const statusLink = page.locator(".lgo-events-hero-card").getByRole("link", { name: "Trạng thái chơi" });
    await statusLink.focus();
    await expect(statusLink).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/\/status$/);
    await page.goBack();
    await expect(page.getByRole("heading", { level: 1, name: "Sự kiện Linh Giới" })).toBeVisible();

    const metrics = await collectEventsMetrics(page);
    expect(metrics.pageOverflow, "body horizontal overflow").toBeLessThanOrEqual(0);
    expect(metrics.eventCards).toBe(1);
    if (isMobile) {
      expect(metrics.h1Font, "mobile h1 scale").toBeLessThanOrEqual(31);
      expect(metrics.maxFont, "mobile visible font cap").toBeLessThanOrEqual(31);
      expect(metrics.heroTop, "mobile hero starts after shell").toBeLessThanOrEqual(150);
      expect(metrics.heroBottom, "mobile hero compact").toBeLessThanOrEqual(700);
      expect(metrics.boardTop, "mobile board follows hero").toBeLessThanOrEqual(720);
      expect(metrics.firstCardTop, "mobile event card near first fold").toBeLessThanOrEqual(900);
      expect(metrics.actionTop, "mobile action band reachable").toBeLessThanOrEqual(1300);
      expect(metrics.scrollHeight, "mobile events page height compact").toBeLessThanOrEqual(2100);
      expect(metrics.gridColumns).toBeLessThanOrEqual(2);
    } else {
      expect(metrics.h1Font, "desktop h1 scale").toBeLessThanOrEqual(50);
      expect(metrics.maxFont, "desktop visible font cap").toBeLessThanOrEqual(50);
      expect(metrics.heroTop, "desktop hero starts first").toBeLessThanOrEqual(115);
      expect(metrics.heroBottom, "desktop hero compact").toBeLessThanOrEqual(470);
      expect(metrics.boardTop, "desktop board follows hero").toBeLessThanOrEqual(490);
      expect(metrics.firstCardTop, "desktop event card near first fold").toBeLessThanOrEqual(650);
      expect(metrics.actionTop, "desktop action band reachable").toBeLessThanOrEqual(900);
      expect(metrics.scrollHeight, "desktop events page height compact").toBeLessThanOrEqual(1500);
      expect(metrics.gridColumns).toBeGreaterThanOrEqual(1);
    }

    await page.screenshot({ path: `/tmp/events-${isMobile ? "mobile" : "desktop"}-v1198.png`, fullPage: true });
  });
});
