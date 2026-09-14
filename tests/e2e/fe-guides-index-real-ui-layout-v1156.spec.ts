// v1.156 coverage: /guides prioritizes real browser UI layout and Base First shared guide-index CSS.
import { test, expect, type Page } from "@playwright/test";

const web = process.env.LGO_WEB_URL ?? "http://127.0.0.1:3000";

type Metrics = {
  overflow: number;
  h1Font: number;
  maxFont: number;
  heroTop: number;
  heroBottom: number;
  boardTop: number;
  boardBottom: number;
  gridTop: number;
  gridBottom: number;
  archiveTop: number;
  firstCardTop: number;
  firstCardBottom: number;
  cardCount: number;
  guideGridColumns: number;
  archiveGridColumns: number;
  firstHeadings: Array<{ tag: string; text: string }>;
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
    const hero = rect(".lgo-guides-index-hero");
    const board = rect(".lgo-guides-index-board");
    const grid = rect(".lgo-guides-index-grid");
    const archive = rect(".lgo-guides-index-archive");
    const firstCard = rect(".lgo-guides-index-card");
    return {
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      h1Font: Number.parseFloat(getComputedStyle(document.querySelector("h1") as HTMLElement).fontSize) || 0,
      maxFont: Math.max(...visibleElements.map((element) => Number.parseFloat(getComputedStyle(element).fontSize) || 0)),
      heroTop: hero.top,
      heroBottom: hero.bottom,
      boardTop: board.top,
      boardBottom: board.bottom,
      gridTop: grid.top,
      gridBottom: grid.bottom,
      archiveTop: archive.top,
      firstCardTop: firstCard.top,
      firstCardBottom: firstCard.bottom,
      cardCount: document.querySelectorAll(".lgo-guides-index-card").length,
      guideGridColumns: getComputedStyle(document.querySelector(".lgo-guides-index-grid") as HTMLElement).gridTemplateColumns.split(" ").length,
      archiveGridColumns: getComputedStyle(document.querySelector(".lgo-guides-index-archive-grid") as HTMLElement).gridTemplateColumns.split(" ").length,
      firstHeadings: Array.from(document.querySelectorAll<HTMLElement>("main h1, main h2, main h3")).slice(0, 7).map((heading) => ({
        tag: heading.tagName.toLowerCase(),
        text: heading.textContent?.trim().replace(/\s+/g, " ") ?? "",
      })),
      firstFlowText: [
        document.querySelector(".lgo-guides-index-hero")?.textContent ?? "",
        document.querySelector(".lgo-guides-index-board")?.textContent ?? "",
      ].join("\n"),
    };
  });
}

test.describe("guides index real UI layout v1.156", () => {
  test("/guides renders a compact Vietnamese guide index with reusable layout", async ({ page, isMobile }, testInfo) => {
    await page.goto(`${web}/guides`);

    await expect(page.getByRole("heading", { level: 1, name: "Hướng dẫn cho Người Thức Tỉnh" })).toBeVisible();
    await expect(page.getByRole("heading", { level: 2, name: "Vòng lặp thế giới trước, tin cậy phát hành sau" })).toBeVisible();
    await expect(page.getByRole("heading", { level: 2, name: "Đọc nhanh theo nhu cầu" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Đọc guide chính" })).toBeVisible();

    const metrics = await collect(page);
    expect(metrics.firstHeadings[0]).toEqual({ tag: "h1", text: "Hướng dẫn cho Người Thức Tỉnh" });
    expect(metrics.firstHeadings.map((heading) => heading.text).slice(0, 4)).toEqual([
      "Hướng dẫn cho Người Thức Tỉnh",
      "Vòng lặp thế giới trước, tin cậy phát hành sau",
      "Vòng lặp thế giới: từ Spirit Gate tới Training Stone",
      "Đọc nhanh theo nhu cầu",
    ]);
    expect(metrics.cardCount, "all guide cards stay reachable").toBe(16);
    expect(metrics.overflow, "horizontal overflow").toBeLessThanOrEqual(0);
    expect(metrics.maxFont, "visible font cap").toBeLessThanOrEqual(isMobile ? 38 : 60);
    expect(metrics.firstFlowText, "old English labels should not drive first-flow").not.toMatch(/Guides & codex|release trust|Mở guide|Download trust|Support safety|player-facing guides|hierarchy rõ/);

    const primaryCta = page.getByRole("link", { name: "Đọc guide chính" });
    await primaryCta.focus();
    await expect(primaryCta).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/\/guides\/world-gameplay-loop-guide$/);
    await page.goBack();

    if (isMobile) {
      expect(metrics.h1Font, "mobile h1 scale").toBeLessThanOrEqual(38);
      expect(metrics.heroTop, "mobile hero starts first").toBeLessThanOrEqual(120);
      expect(metrics.heroBottom, "mobile hero compact").toBeLessThanOrEqual(600);
      expect(metrics.boardTop, "mobile board follows hero").toBeLessThanOrEqual(620);
      expect(metrics.firstCardTop, "mobile featured guide appears in first fold").toBeLessThanOrEqual(760);
      expect(metrics.firstCardBottom, "mobile featured card compact").toBeLessThanOrEqual(930);
      expect(metrics.guideGridColumns, "mobile guide grid uses two scan columns").toBe(2);
      expect(metrics.archiveGridColumns, "mobile archive grid uses two scan columns").toBe(2);
      expect(metrics.archiveTop, "mobile archive follows after primary board").toBeLessThanOrEqual(1640);
    } else {
      expect(metrics.h1Font, "desktop h1 scale").toBeLessThanOrEqual(60);
      expect(metrics.heroTop, "desktop hero starts first").toBeLessThanOrEqual(115);
      expect(metrics.heroBottom, "desktop hero compact").toBeLessThanOrEqual(445);
      expect(metrics.boardTop, "desktop board follows hero").toBeLessThanOrEqual(460);
      expect(metrics.gridTop, "desktop guide grid reaches first fold").toBeLessThanOrEqual(900);
      expect(metrics.guideGridColumns, "desktop guide grid uses three scan columns").toBe(3);
      expect(metrics.archiveGridColumns, "desktop archive grid uses three scan columns").toBe(3);
      expect(metrics.archiveTop, "desktop archive follows after primary board").toBeLessThanOrEqual(1370);
    }

    await page.screenshot({ path: `/tmp/guides-index-${isMobile ? "mobile" : "desktop"}-v1156.png`, fullPage: true });
    await testInfo.attach(`guides-index-${isMobile ? "mobile" : "desktop"}-v1156`, {
      path: `/tmp/guides-index-${isMobile ? "mobile" : "desktop"}-v1156.png`,
      contentType: "image/png",
    });
  });
});
