// v1.174 coverage: /events prioritizes rendered browser UI layout and shared service/card Base First CSS.
import { test, expect, type Page } from "@playwright/test";

const web = process.env.LGO_WEB_URL ?? "http://127.0.0.1:3000";

type Metrics = {
  overflow: number;
  internalOverflowCount: number;
  h1Font: number;
  maxFont: number;
  heroTop: number;
  heroBottom: number;
  boardTop: number;
  firstCardTop: number;
  cardCount: number;
  actionBandTop: number;
  scrollHeight: number;
  columns: number;
  firstFlowText: string;
  headings: Array<{ tag: string; text: string }>;
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
    const hero = rect(".lgo-events-hero-card");
    const board = rect(".lgo-events-board");
    const firstCard = rect(".lgo-events-card");
    const actionBand = rect(".lgo-action-band");
    const internalOverflow = visibleElements.filter((element) => element.scrollWidth > element.clientWidth + 1);
    return {
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      internalOverflowCount: internalOverflow.length,
      h1Font: Number.parseFloat(getComputedStyle(document.querySelector("h1") as HTMLElement).fontSize) || 0,
      maxFont: Math.max(...visibleElements.map((element) => Number.parseFloat(getComputedStyle(element).fontSize) || 0)),
      heroTop: hero.top,
      heroBottom: hero.bottom,
      boardTop: board.top,
      firstCardTop: firstCard.top,
      cardCount: document.querySelectorAll(".lgo-events-card").length,
      actionBandTop: actionBand.top,
      scrollHeight: document.documentElement.scrollHeight,
      columns: getComputedStyle(document.querySelector(".lgo-events-grid") as HTMLElement).gridTemplateColumns.split(" ").length,
      firstFlowText: [
        document.querySelector(".lgo-events-hero-card")?.textContent ?? "",
        document.querySelector(".lgo-events-board")?.textContent ?? "",
      ].join("\n"),
      headings: Array.from(document.querySelectorAll<HTMLElement>("main h1, main h2, main h3")).slice(0, 8).map((heading) => ({
        tag: heading.tagName.toLowerCase(),
        text: heading.textContent?.trim().replace(/\s+/g, " ") ?? "",
      })),
    };
  });
}

test.describe("events real UI layout v1.174", () => {
  test("/events renders compact event-state layout without fake live calendar", async ({ page, isMobile }, testInfo) => {
    await page.goto(`${web}/events`);

    await expect(page.getByRole("heading", { level: 1, name: "Sự kiện Linh Giới" })).toBeVisible();
    await expect(page.locator(".lgo-status-badge", { hasText: "Lịch sự kiện tĩnh" }).first()).toBeVisible();
    await expect(page.getByRole("heading", { level: 2, name: "Sự kiện hiện là thông báo định hướng cộng đồng" })).toBeVisible();

    const metrics = await collect(page);
    expect(metrics.headings[0]).toEqual({ tag: "h1", text: "Sự kiện Linh Giới" });
    expect(metrics.firstFlowText).toContain("Sự kiện hiện là thông báo định hướng cộng đồng");
    expect(metrics.firstFlowText).toContain("Lễ hội Linh Khí");
    expect(metrics.firstFlowText).toContain("Chưa có lịch live, đăng ký tham gia hoặc phần thưởng sự kiện");
    expect(metrics.firstFlowText, "stale fixture/backend labels must not drive the current /events layout").not.toMatch(/Local content|Fixture entries|Spirit festival event placeholder|No CMS|No backend|live event|backend scheduler|production CMS/i);
    expect(metrics.overflow, "body horizontal overflow").toBeLessThanOrEqual(0);
    expect(metrics.internalOverflowCount, "visible element overflow").toBe(0);
    expect(metrics.cardCount).toBeGreaterThanOrEqual(1);

    const statusLink = page.locator(".lgo-events-hero-card").getByRole("link", { name: "Trạng thái chơi" });
    await statusLink.focus();
    await expect(statusLink).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/\/status$/);
    await page.goBack();
    await expect(page.getByRole("heading", { level: 1, name: "Sự kiện Linh Giới" })).toBeVisible();

    if (isMobile) {
      expect(metrics.h1Font, "mobile h1 scale").toBeLessThanOrEqual(30);
      expect(metrics.maxFont, "mobile visible font cap").toBeLessThanOrEqual(31);
      expect(metrics.heroTop, "mobile hero starts after shell").toBeLessThanOrEqual(150);
      expect(metrics.heroBottom, "mobile hero compact").toBeLessThanOrEqual(610);
      expect(metrics.boardTop, "mobile board follows hero").toBeLessThanOrEqual(625);
      expect(metrics.firstCardTop, "mobile first event card near first fold").toBeLessThanOrEqual(850);
      expect(metrics.actionBandTop, "mobile action band not pushed by raw fixtures").toBeLessThanOrEqual(1350);
      expect(metrics.scrollHeight, "mobile events page height compact").toBeLessThanOrEqual(2200);
      expect(metrics.columns).toBe(1);
    } else {
      expect(metrics.h1Font, "desktop h1 scale").toBeLessThanOrEqual(50);
      expect(metrics.maxFont, "desktop visible font cap").toBeLessThanOrEqual(50);
      expect(metrics.heroTop, "desktop hero starts first").toBeLessThanOrEqual(115);
      expect(metrics.heroBottom, "desktop hero compact").toBeLessThanOrEqual(430);
      expect(metrics.boardTop, "desktop board follows hero").toBeLessThanOrEqual(445);
      expect(metrics.firstCardTop, "desktop first card near first fold").toBeLessThanOrEqual(660);
      expect(metrics.actionBandTop, "desktop action band stays visible soon after board").toBeLessThanOrEqual(850);
      expect(metrics.scrollHeight, "desktop events page height compact").toBeLessThanOrEqual(1500);
      expect(metrics.columns).toBeGreaterThanOrEqual(1);
    }

    const screenshotPath = `/tmp/events-${isMobile ? "mobile" : "desktop"}-v1174.png`;
    await page.screenshot({ path: screenshotPath, fullPage: true });
    await testInfo.attach(`events-${isMobile ? "mobile" : "desktop"}-v1174`, {
      path: screenshotPath,
      contentType: "image/png",
    });
  });
});
