import { expect, test, type Page } from "@playwright/test";

const web = process.env.LGO_WEB_URL ?? "http://127.0.0.1:3000";

type StoryRealMetrics = {
  overflow: number;
  h1Font: number;
  maxFont: number;
  heroBottom: number;
  chaptersTop: number;
  chaptersBottom: number;
  firstCardVisibleHeight: number;
  disclosureTop: number;
  disclosureCount: number;
  openedBoardTop: number;
  scrollHeight: number;
  chapterColumns: number;
  focusLabel: string;
  firstFlowText: string;
};

async function collectStoryRealMetrics(page: Page): Promise<StoryRealMetrics> {
  return page.evaluate(() => {
    const rect = (selector: string) => {
      const node = document.querySelector<HTMLElement>(selector);
      if (!node) return { top: -1, bottom: -1, height: 0, width: 0 };
      const r = node.getBoundingClientRect();
      return { top: r.top, bottom: r.bottom, height: r.height, width: r.width };
    };
    const isVisibleForFont = (element: HTMLElement) => {
      if (element.closest("details:not([open])")) return false;
      const style = getComputedStyle(element);
      const r = element.getBoundingClientRect();
      return r.width > 0 && r.height > 0 && style.visibility !== "hidden" && style.display !== "none";
    };
    const visibleElements = Array.from(document.querySelectorAll<HTMLElement>("body *")).filter(isVisibleForFont);
    const h1 = document.querySelector<HTMLElement>("main h1");
    const firstCard = rect(".lgo-storypage-stack .lgo-narrative-chapter");
    const firstCards = Array.from(document.querySelectorAll<HTMLElement>(".lgo-storypage-stack .lgo-narrative-chapter"));
    const firstTop = firstCards[0]?.getBoundingClientRect().top ?? 0;
    const secondTop = firstCards.find((card) => Math.abs(card.getBoundingClientRect().top - firstTop) > 2)?.getBoundingClientRect().top ?? firstTop;
    const columns = firstCards.filter((card) => Math.abs(card.getBoundingClientRect().top - firstTop) <= 2).length || 0;
    const focusTarget = document.querySelector<HTMLElement>(".lgo-skip-link");
    focusTarget?.focus();
    return {
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      h1Font: h1 ? Number.parseFloat(getComputedStyle(h1).fontSize) : 0,
      maxFont: Math.max(...visibleElements.map((element) => Number.parseFloat(getComputedStyle(element).fontSize) || 0)),
      heroBottom: rect(".lgo-storypage-stack .lgo-story-hero").bottom,
      chaptersTop: rect(".lgo-storypage-stack #chapters").top,
      chaptersBottom: rect(".lgo-storypage-stack #chapters").bottom,
      firstCardVisibleHeight: Math.max(0, Math.min(firstCard.bottom, window.innerHeight) - Math.max(firstCard.top, 0)),
      disclosureTop: rect(".lgo-storypage-stack .lgo-storypage-expanded-evidence").top,
      disclosureCount: document.querySelectorAll(".lgo-storypage-stack .lgo-storypage-expanded-evidence").length,
      openedBoardTop: document.querySelector(".lgo-storypage-expanded-evidence")?.hasAttribute("open") ? rect(".lgo-story-fracture-design-board").top : -1,
      scrollHeight: document.documentElement.scrollHeight,
      chapterColumns: columns,
      focusLabel: document.activeElement?.textContent?.trim() ?? "",
      firstFlowText: [
        ".lgo-design-target-reference",
        ".lgo-storypage-stack .lgo-story-hero",
        ".lgo-storypage-stack #chapters",
        ".lgo-storypage-stack .lgo-storypage-expanded-evidence > summary",
      ].map((selector) => document.querySelector<HTMLElement>(selector)?.textContent ?? "").join("\n"),
    };
  });
}

test.describe("story real UI layout v1.214", () => {
  test("/story renders compact Vietnamese first-flow with shared disclosure proof", async ({ page, isMobile }) => {
    await page.goto(`${web}/story`);
    await expect(page.getByRole("heading", { level: 1, name: "Cho đến ngày những cánh cửa bắt đầu mở" })).toBeVisible();
    await expect(page.locator(".lgo-storypage-expanded-evidence > summary")).toBeVisible();

    const metrics = await collectStoryRealMetrics(page);
    console.log(JSON.stringify({ viewport: isMobile ? "mobile" : "desktop", metrics }, null, 2));

    expect(metrics.overflow, "story page horizontal overflow").toBeLessThanOrEqual(0);
    expect(metrics.disclosureCount, "one shared disclosure for secondary story proof").toBe(1);
    expect(metrics.firstFlowText, "story first-flow stays Vietnamese").toContain("Bằng chứng phụ và tuyến cốt truyện");
    expect(metrics.firstFlowText, "story first-flow keeps FE boundary").toContain("không ép toàn bộ proof board vào first-flow `/story`");
    expect(metrics.focusLabel, "skip link can receive focus").toContain("Bỏ qua menu");
    expect(metrics.openedBoardTop, "proof board remains hidden while disclosure is closed").toBeLessThan(0);

    if (isMobile) {
      expect(metrics.h1Font, "mobile story h1 compact").toBeLessThanOrEqual(40);
      expect(metrics.maxFont, "mobile story visible font cap").toBeLessThanOrEqual(40);
      expect(metrics.heroBottom, "mobile hero does not dominate the first-fold").toBeLessThanOrEqual(820);
      expect(metrics.chaptersTop, "mobile chapters follow hero quickly").toBeLessThanOrEqual(870);
      expect(metrics.firstCardVisibleHeight, "mobile first chapter is visible in first viewport").toBeGreaterThanOrEqual(60);
      expect(metrics.disclosureTop, "mobile disclosure follows chapter grid without long proof stack").toBeLessThanOrEqual(1900);
      expect(metrics.scrollHeight, "mobile page height remains reviewable while proof is collapsed").toBeLessThanOrEqual(2800);
      expect(metrics.chapterColumns, "mobile keeps a dense two-column chapter rhythm").toBe(2);
      await page.evaluate(() => (document.activeElement as HTMLElement | null)?.blur());
      await page.screenshot({ path: "/tmp/story-mobile-v1214.png", fullPage: true });
    } else {
      expect(metrics.h1Font, "desktop story h1 compact").toBeLessThanOrEqual(52);
      expect(metrics.maxFont, "desktop story visible font cap").toBeLessThanOrEqual(52);
      expect(metrics.heroBottom, "desktop hero leaves room for chapters").toBeLessThanOrEqual(470);
      expect(metrics.chaptersTop, "desktop chapters start inside first-flow").toBeLessThanOrEqual(500);
      expect(metrics.firstCardVisibleHeight, "desktop first card is materially visible in first viewport").toBeGreaterThanOrEqual(180);
      expect(metrics.disclosureTop, "desktop disclosure follows core chapter flow").toBeLessThanOrEqual(920);
      expect(metrics.scrollHeight, "desktop page height remains reviewable while proof is collapsed").toBeLessThanOrEqual(1550);
      expect(metrics.chapterColumns, "desktop keeps three story cards in one row").toBe(3);
      await page.evaluate(() => (document.activeElement as HTMLElement | null)?.blur());
      await page.screenshot({ path: "/tmp/story-desktop-v1214.png", fullPage: true });
    }
  });
});
