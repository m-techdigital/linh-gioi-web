// v1.64 coverage: public /story narrative chapter numbers stay readable on mobile.
import { test, expect, type Page } from "@playwright/test";

type StoryNumberMetrics = {
  pageOverflow: number;
  maxHeadingFont: number;
  storyNumbers: Array<{ text: string; fontSize: number; width: number; height: number }>;
};

async function collectStoryNumberMetrics(page: Page): Promise<StoryNumberMetrics> {
  return page.evaluate(() => {
    const storyNumbers = Array.from(document.querySelectorAll<HTMLElement>(".lgo-chapter-visual span")).filter((node) => /^0\d$/.test(node.textContent?.trim() ?? "")).map((node) => {
      const rect = node.getBoundingClientRect();
      return {
        text: node.textContent?.trim() ?? "",
        fontSize: Number.parseFloat(getComputedStyle(node).fontSize),
        width: Math.round(rect.width),
        height: Math.round(rect.height),
      };
    });
    const headingSizes = Array.from(document.querySelectorAll<HTMLElement>("main h1, main h2, main h3")).map((node) => Number.parseFloat(getComputedStyle(node).fontSize));
    return {
      pageOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      maxHeadingFont: Math.max(...headingSizes.filter(Number.isFinite)),
      storyNumbers,
    };
  });
}

test.describe("public story chapter typography", () => {
  test("mobile /story caps narrative chapter numbers below oversized heading scale", async ({ page, isMobile }) => {
    test.skip(!isMobile, "mobile-only story typography scale coverage");
    await page.goto("/story");
    await expect(page.getByRole("heading", { name: "Cho đến ngày những cánh cửa bắt đầu mở" })).toBeVisible();
    const metrics = await collectStoryNumberMetrics(page);
    expect(metrics.pageOverflow, "story page horizontal overflow").toBeLessThanOrEqual(0);
    expect(metrics.storyNumbers.length, "narrative chapter numbers").toBe(3);
    for (const item of metrics.storyNumbers) {
      expect(item.fontSize, `story number ${item.text} font-size`).toBeLessThanOrEqual(48);
      expect(item.fontSize, `story number ${item.text} should stay subordinate to headings`).toBeLessThanOrEqual(metrics.maxHeadingFont + 8);
      expect(item.width, `story number ${item.text} width`).toBeLessThanOrEqual(84);
    }
  });
});
