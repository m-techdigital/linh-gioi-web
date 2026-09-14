// v1.176 coverage: /news must render as a compact public news surface, not raw fixture cards.
import { test, expect, type Page } from "@playwright/test";

const web = process.env.LGO_WEB_URL ?? "http://127.0.0.1:3000";

type NewsMetrics = {
  h1Font: number;
  maxFont: number;
  pageOverflow: number;
  heroTop: number;
  heroBottom: number;
  boardTop: number;
  firstCardTop: number;
  actionBandTop: number;
  scrollHeight: number;
  columns: number;
};

async function collectNewsMetrics(page: Page): Promise<NewsMetrics> {
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
    const hero = rect(".lgo-news-hero-card");
    const board = rect(".lgo-news-board");
    const firstCard = rect(".lgo-newsfeed-card");
    const actionBand = rect(".lgo-action-band");
    const grid = document.querySelector<HTMLElement>(".lgo-newsfeed-grid");
    if (!h1 || !grid) throw new Error("Missing news layout anchors");
    return {
      h1Font: Number.parseFloat(getComputedStyle(h1).fontSize) || 0,
      maxFont: Math.max(...visibleElements.map((element) => Number.parseFloat(getComputedStyle(element).fontSize) || 0)),
      pageOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      heroTop: hero.top,
      heroBottom: hero.bottom,
      boardTop: board.top,
      firstCardTop: firstCard.top,
      actionBandTop: actionBand.top,
      scrollHeight: document.documentElement.scrollHeight,
      columns: getComputedStyle(grid).gridTemplateColumns.split(" ").length,
    };
  });
}

test.describe("news real UI layout v1.176", () => {
  test("/news renders compact public news layout without raw fixture cards", async ({ page, isMobile }) => {
    await page.goto(`${web}/news`);

    await expect(page.getByRole("heading", { level: 1, name: "Tin tức Linh Giới" })).toBeVisible();
    await expect(page.locator(".lgo-news-hero-card").getByText("Bản tin công khai", { exact: true })).toBeVisible();
    await expect(page.getByRole("heading", { level: 2, name: "Bản tin hiện là nhật ký web công khai" })).toBeVisible();
    await expect(page.locator(".lgo-news-hero-card")).toBeVisible();
    await expect(page.locator(".lgo-news-board")).toBeVisible();
    await expect(page.locator(".lgo-newsfeed-card").first()).toBeVisible();
    await expect(page.locator(".lgo-action-band")).toBeVisible();

    const mainText = await page.locator("main").innerText();
    expect(mainText).not.toMatch(/News list is now|Fixture entries|PROVISIONAL_WEB_FIXTURE|Summary-only fixture|No CMS and no backend API|ContentIaStartCta/i);

    const heroStatusLink = page.locator(".lgo-news-hero-card").getByRole("link", { name: "Trạng thái chơi" });
    await heroStatusLink.focus();
    await expect(heroStatusLink).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/\/status$/);
    await page.goBack();
    await expect(page.getByRole("heading", { level: 1, name: "Tin tức Linh Giới" })).toBeVisible();

    const metrics = await collectNewsMetrics(page);
    expect(metrics.pageOverflow, "body horizontal overflow").toBeLessThanOrEqual(0);
    if (isMobile) {
      expect(metrics.h1Font, "mobile h1 scale").toBeLessThanOrEqual(31);
      expect(metrics.maxFont, "mobile visible font cap").toBeLessThanOrEqual(31);
      expect(metrics.heroTop, "mobile hero starts after shell").toBeLessThanOrEqual(150);
      expect(metrics.heroBottom, "mobile hero compact").toBeLessThanOrEqual(630);
      expect(metrics.boardTop, "mobile board follows hero").toBeLessThanOrEqual(645);
      expect(metrics.firstCardTop, "mobile first news card near first fold").toBeLessThanOrEqual(860);
      expect(metrics.actionBandTop, "mobile action band not pushed by raw fixtures").toBeLessThanOrEqual(1450);
      expect(metrics.scrollHeight, "mobile news page height compact").toBeLessThanOrEqual(2600);
      expect(metrics.columns).toBe(1);
    } else {
      expect(metrics.h1Font, "desktop h1 scale").toBeLessThanOrEqual(50);
      expect(metrics.maxFont, "desktop visible font cap").toBeLessThanOrEqual(50);
      expect(metrics.heroTop, "desktop hero starts first").toBeLessThanOrEqual(115);
      expect(metrics.heroBottom, "desktop hero compact").toBeLessThanOrEqual(430);
      expect(metrics.boardTop, "desktop board follows hero").toBeLessThanOrEqual(445);
      expect(metrics.firstCardTop, "desktop first news card near first fold").toBeLessThanOrEqual(660);
      expect(metrics.actionBandTop, "desktop action band stays visible soon after board").toBeLessThanOrEqual(900);
      expect(metrics.scrollHeight, "desktop news page height compact").toBeLessThanOrEqual(1700);
      expect(metrics.columns).toBeGreaterThanOrEqual(2);
    }

    await page.screenshot({ path: `/tmp/news-${isMobile ? "mobile" : "desktop"}-v1176.png`, fullPage: true });
  });
});
