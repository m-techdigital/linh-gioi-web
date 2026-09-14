// v1.177 coverage: /news/web-program-control-tower must render as a compact article detail, not raw WEB v1.9 fixture detail.
import { test, expect, type Page } from "@playwright/test";

const web = process.env.LGO_WEB_URL ?? "http://127.0.0.1:3000";

type ArticleMetrics = {
  h1Font: number;
  maxFont: number;
  pageOverflow: number;
  heroTop: number;
  heroBottom: number;
  depthTop: number;
  firstDepthCardTop: number;
  relatedTop: number;
  nextStepsTop: number;
  scrollHeight: number;
  relatedColumns: number;
};

async function collectArticleMetrics(page: Page): Promise<ArticleMetrics> {
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
    const hero = rect(".lgo-newsdetail-hero-card");
    const depth = rect(".lgo-newsdetail-depth");
    const firstDepthCard = rect(".lgo-newsdetail-depth-card");
    const related = rect(".lgo-newsdetail-related");
    const next = rect(".lgo-newsdetail-next-steps");
    const relatedGrid = document.querySelector<HTMLElement>(".lgo-newsdetail-related-grid");
    if (!h1 || !relatedGrid) throw new Error("Missing detail layout anchors");
    return {
      h1Font: Number.parseFloat(getComputedStyle(h1).fontSize) || 0,
      maxFont: Math.max(...visibleElements.map((element) => Number.parseFloat(getComputedStyle(element).fontSize) || 0)),
      pageOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      heroTop: hero.top,
      heroBottom: hero.bottom,
      depthTop: depth.top,
      firstDepthCardTop: firstDepthCard.top,
      relatedTop: related.top,
      nextStepsTop: next.top,
      scrollHeight: document.documentElement.scrollHeight,
      relatedColumns: getComputedStyle(relatedGrid).gridTemplateColumns.split(" ").length,
    };
  });
}

test.describe("news control tower real UI layout v1.177", () => {
  test("/news/web-program-control-tower renders compact Vietnamese article detail flow", async ({ page, isMobile }) => {
    await page.goto(`${web}/news/web-program-control-tower`);

    await expect(page.getByRole("heading", { level: 1, name: "Control tower web đã được thiết lập" })).toBeVisible();
    await expect(page.getByText("Bài viết công khai", { exact: true })).toBeVisible();
    await expect(page.getByRole("heading", { level: 2, name: "Bài viết giải thích governance web độc lập" })).toBeVisible();
    await expect(page.locator(".lgo-newsdetail-hero-card")).toBeVisible();
    await expect(page.locator(".lgo-newsdetail-depth")).toBeVisible();
    await expect(page.locator(".lgo-newsdetail-depth-card").first()).toBeVisible();
    await expect(page.locator(".lgo-newsdetail-related")).toBeVisible();
    await expect(page.locator(".lgo-newsdetail-next-steps")).toBeVisible();

    const mainText = await page.locator("main").innerText();
    expect(mainText).not.toMatch(/WEB v1\.9 article detail|Boundary:|PROVISIONAL_WEB_FIXTURE|NOT_CANONICAL_BACKEND_CONTRACT|Detail section|no CMS\/live announcement backend|This public content is/i);

    const backToNews = page.locator(".lgo-newsdetail-hero-card").getByRole("link", { name: "Tin tức" });
    await backToNews.focus();
    await expect(backToNews).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/\/news$/);
    await page.goBack();
    await expect(page.getByRole("heading", { level: 1, name: "Control tower web đã được thiết lập" })).toBeVisible();

    const metrics = await collectArticleMetrics(page);
    expect(metrics.pageOverflow, "body horizontal overflow").toBeLessThanOrEqual(0);
    if (isMobile) {
      expect(metrics.h1Font, "mobile h1 scale").toBeLessThanOrEqual(31);
      expect(metrics.maxFont, "mobile visible font cap").toBeLessThanOrEqual(31);
      expect(metrics.heroTop, "mobile hero starts after shell").toBeLessThanOrEqual(150);
      expect(metrics.heroBottom, "mobile hero compact").toBeLessThanOrEqual(680);
      expect(metrics.depthTop, "mobile depth follows hero").toBeLessThanOrEqual(700);
      expect(metrics.firstDepthCardTop, "mobile first depth card near first fold").toBeLessThanOrEqual(900);
      expect(metrics.relatedTop, "mobile related not pushed by raw body").toBeLessThanOrEqual(1500);
      expect(metrics.nextStepsTop, "mobile next steps reachable").toBeLessThanOrEqual(1900);
      expect(metrics.scrollHeight, "mobile article page height compact").toBeLessThanOrEqual(2900);
      expect(metrics.relatedColumns).toBe(1);
    } else {
      expect(metrics.h1Font, "desktop h1 scale").toBeLessThanOrEqual(50);
      expect(metrics.maxFont, "desktop visible font cap").toBeLessThanOrEqual(50);
      expect(metrics.heroTop, "desktop hero starts first").toBeLessThanOrEqual(115);
      expect(metrics.heroBottom, "desktop hero compact").toBeLessThanOrEqual(450);
      expect(metrics.depthTop, "desktop depth follows hero").toBeLessThanOrEqual(465);
      expect(metrics.firstDepthCardTop, "desktop first depth card near first fold").toBeLessThanOrEqual(690);
      expect(metrics.relatedTop, "desktop related soon after depth").toBeLessThanOrEqual(980);
      expect(metrics.nextStepsTop, "desktop next steps reachable").toBeLessThanOrEqual(1220);
      expect(metrics.scrollHeight, "desktop article page height compact").toBeLessThanOrEqual(1900);
      expect(metrics.relatedColumns).toBeGreaterThanOrEqual(2);
    }

    await page.screenshot({ path: `/tmp/news-control-tower-${isMobile ? "mobile" : "desktop"}-v1177.png`, fullPage: true });
  });
});
