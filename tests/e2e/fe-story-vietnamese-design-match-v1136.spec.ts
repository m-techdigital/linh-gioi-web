// v1.136 coverage: /story continues sequential page completion with Vietnamese design-target and layout match.
import { test, expect, type Page } from "@playwright/test";

const web = process.env.LGO_WEB_URL ?? "http://127.0.0.1:3000";

type StoryMetrics = {
  overflow: number;
  h1Size: number;
  englishLeak: string;
  designReferenceText: string;
  firstFlowText: string;
  heroBottom: number;
  chaptersTop: number;
  chapterCardCount: number;
  firstCardVisibleHeight: number;
  storyBoardTop: number;
};

async function collectStoryMetrics(page: Page): Promise<StoryMetrics> {
  return page.evaluate(() => {
    const rect = (selector: string) => {
      const node = document.querySelector<HTMLElement>(selector);
      if (!node) return { top: -1, bottom: -1, height: 0 };
      const r = node.getBoundingClientRect();
      return { top: r.top, bottom: r.bottom, height: r.height };
    };
    const h1 = document.querySelector<HTMLElement>("main h1");
    const firstCard = rect(".lgo-storypage-stack .lgo-narrative-chapter");
    const firstFlowText = [
      ".lgo-design-target-reference",
      ".lgo-storypage-stack .lgo-story-hero",
      ".lgo-storypage-stack #chapters",
      ".lgo-story-fracture-design-board",
    ].map((selector) => document.querySelector<HTMLElement>(selector)?.textContent ?? "").join(" ");
    const englishLeak = /(Opening narrative|Story detailed design target|Story reference art|Dong Mon fracture|narrative setup|quest state live|while keeping|portal events|player progress|account state|production world simulation|Opening arc|Design Target FIRST|Chapter 0[1-9]|Signature world event)/i.exec(firstFlowText)?.[0] ?? "";
    return {
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      h1Size: h1 ? Number.parseFloat(getComputedStyle(h1).fontSize) : 0,
      englishLeak,
      designReferenceText: document.querySelector<HTMLElement>(".lgo-design-target-reference")?.textContent ?? "",
      firstFlowText,
      heroBottom: rect(".lgo-storypage-stack .lgo-story-hero").bottom,
      chaptersTop: rect(".lgo-storypage-stack #chapters").top,
      chapterCardCount: document.querySelectorAll(".lgo-storypage-stack .lgo-narrative-chapter").length,
      firstCardVisibleHeight: Math.max(0, Math.min(firstCard.bottom, window.innerHeight) - Math.max(firstCard.top, 0)),
      storyBoardTop: rect(".lgo-story-fracture-design-board").top,
    };
  });
}

test.describe("story Vietnamese design match", () => {
  test("/story uses Vietnamese Public Story target and matches first-flow target structure", async ({ page, isMobile }) => {
    await page.goto(`${web}/story`);
    await expect(page.getByRole("region", { name: /Design target reference.*Public Story/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /Thiết kế chi tiết cốt truyện.*Public Story.*mở trong tab mới/i })).toHaveAttribute("href", "/design-reference/story-detailed-design-target-v1121.png");
    await expect(page.getByRole("heading", { level: 1, name: "Cho đến ngày những cánh cửa bắt đầu mở" })).toBeVisible();
    await expect(page.getByText("Cốt truyện Linh Giới", { exact: true })).toBeVisible();
    await expect(page.locator(".lgo-storypage-stack #chapters").getByText("Chương 01", { exact: true })).toBeVisible();
    await expect(page.locator(".lgo-storypage-stack #chapters").getByText("Âm Giới Xâm Lăng", { exact: true })).toBeVisible();

    const metrics = await collectStoryMetrics(page);
    expect(metrics.designReferenceText, "story design target link uses Vietnamese visible label").toContain("Thiết kế chi tiết cốt truyện");
    expect(metrics.firstFlowText, "story first-flow keeps FE/backend boundary in Vietnamese").toContain("không phải trạng thái nhiệm vụ thật");
    expect(metrics.englishLeak, "story first-flow visible copy should be Vietnamese").toBe("");
    expect(metrics.overflow, "story page horizontal overflow").toBeLessThanOrEqual(0);
    expect(metrics.h1Size, "story page h1 follows target scale").toBeLessThanOrEqual(isMobile ? 54 : 62);
    expect(metrics.chapterCardCount, "story target exposes opening chapter cards").toBeGreaterThanOrEqual(3);
    if (!isMobile) {
      expect(metrics.chaptersTop - metrics.heroBottom, "desktop chapter cards should follow the hero like the design target").toBeLessThanOrEqual(48);
      expect(metrics.chaptersTop, "desktop chapter cards enter the first design-led flow").toBeLessThanOrEqual(620);
      expect(metrics.firstCardVisibleHeight, "desktop first chapter card visible in first fold").toBeGreaterThanOrEqual(170);
      expect(metrics.storyBoardTop, "desktop reference/boundary board should not interrupt first-flow before chapter cards").toBeGreaterThan(900);
    } else {
      expect(metrics.heroBottom, "mobile story hero does not force extreme blank fold").toBeLessThanOrEqual(1450);
    }
  });
});
