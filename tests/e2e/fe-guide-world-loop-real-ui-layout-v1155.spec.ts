// v1.155 coverage: /guides/world-gameplay-loop-guide prioritizes real browser UI layout and Base First shared CSS.
import { test, expect, type Page } from "@playwright/test";

const web = process.env.LGO_WEB_URL ?? "http://127.0.0.1:3000";

type Metrics = {
  overflow: number;
  h1Font: number;
  maxFont: number;
  heroTop: number;
  heroBottom: number;
  detailTop: number;
  detailBottom: number;
  worldCtaTop: number;
  firstHeadings: Array<{ tag: string; text: string }>;
  detailColumns: number;
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
    const hero = rect(".lgo-guide-detail-hero-card");
    const detail = rect(".lgo-guide-detail-depth");
    const worldCta = rect(".lgo-world-loop-cta");
    return {
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      h1Font: Number.parseFloat(getComputedStyle(document.querySelector("h1") as HTMLElement).fontSize) || 0,
      maxFont: Math.max(...visibleElements.map((element) => Number.parseFloat(getComputedStyle(element).fontSize) || 0)),
      heroTop: hero.top,
      heroBottom: hero.bottom,
      detailTop: detail.top,
      detailBottom: detail.bottom,
      worldCtaTop: worldCta.top,
      firstHeadings: Array.from(document.querySelectorAll<HTMLElement>("main h1, main h2, main h3")).slice(0, 6).map((heading) => ({
        tag: heading.tagName.toLowerCase(),
        text: heading.textContent?.trim().replace(/\s+/g, " ") ?? "",
      })),
      detailColumns: getComputedStyle(document.querySelector(".lgo-guide-detail-steps") as HTMLElement).gridTemplateColumns.split(" ").length,
      firstFlowText: [
        document.querySelector(".lgo-guide-detail-hero-card")?.textContent ?? "",
        document.querySelector(".lgo-guide-detail-depth")?.textContent ?? "",
      ].join("\n"),
    };
  });
}

test.describe("world gameplay guide real UI layout v1.155", () => {
  test("/guides/world-gameplay-loop-guide starts with compact guide content", async ({ page, isMobile }) => {
    await page.goto(`${web}/guides/world-gameplay-loop-guide`);

    await expect(page.getByRole("heading", { level: 1, name: "Vòng lặp thế giới: từ Spirit Gate tới Training Stone" })).toBeVisible();
    await expect(page.getByRole("heading", { level: 2, name: "Các bước guide có kết quả mong đợi và phạm vi tạm khóa" })).toBeVisible();
    await expect(page.getByRole("heading", { level: 3, name: "Vào Spirit Gate bằng kỳ vọng đúng" })).toBeVisible();

    const metrics = await collect(page);
    expect(metrics.firstHeadings[0]).toEqual({ tag: "h1", text: "Vòng lặp thế giới: từ Spirit Gate tới Training Stone" });
    expect(metrics.firstHeadings.map((heading) => heading.text).slice(0, 3), "CTA headings should not precede guide content").not.toContain("Trước khi mời test hoặc mở tải game, hãy đọc gate owner và đồng bộ bề mặt.");
    expect(metrics.overflow, "horizontal overflow").toBeLessThanOrEqual(0);
    expect(metrics.maxFont, "visible font cap").toBeLessThanOrEqual(isMobile ? 32 : 56);
    expect(metrics.firstFlowText, "old English/backend labels should not drive first-flow").not.toMatch(/World loop:|Guide detail helps|live guide\/wiki backend|quest database|combat tutorial|live progression system|wiki backend/);

    if (isMobile) {
      expect(metrics.h1Font, "mobile h1 scale").toBeLessThanOrEqual(32);
      expect(metrics.heroTop, "mobile hero starts first").toBeLessThanOrEqual(120);
      expect(metrics.heroBottom, "mobile hero compact").toBeLessThanOrEqual(735);
      expect(metrics.detailTop, "mobile detail follows hero").toBeLessThanOrEqual(750);
      expect(metrics.detailBottom, "mobile detail compact").toBeLessThanOrEqual(1540);
      expect(metrics.worldCtaTop, "mobile world CTA follows guide proof").toBeGreaterThan(metrics.detailTop);
      expect(metrics.detailColumns, "mobile guide steps stack").toBe(1);
    } else {
      expect(metrics.h1Font, "desktop h1 scale").toBeLessThanOrEqual(56);
      expect(metrics.heroTop, "desktop hero starts first").toBeLessThanOrEqual(115);
      expect(metrics.heroBottom, "desktop hero compact").toBeLessThanOrEqual(510);
      expect(metrics.detailTop, "desktop detail follows hero").toBeLessThanOrEqual(525);
      expect(metrics.detailBottom, "desktop detail compact").toBeLessThanOrEqual(1100);
      expect(metrics.worldCtaTop, "desktop world CTA follows guide proof").toBeGreaterThan(metrics.detailTop);
      expect(metrics.detailColumns, "desktop guide steps split into two columns").toBe(2);
    }
  });
});
