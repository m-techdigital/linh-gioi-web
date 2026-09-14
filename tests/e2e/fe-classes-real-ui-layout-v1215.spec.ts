import { expect, test, type Page } from "@playwright/test";

const web = process.env.LGO_WEB_URL ?? "http://127.0.0.1:3000";

type ClassesRealMetrics = {
  overflow: number;
  h1Font: number;
  maxFont: number;
  heroBottom: number;
  classGridTop: number;
  classGridBottom: number;
  firstClassVisibleHeight: number;
  disclosureTop: number;
  disclosureCount: number;
  identityTopClosed: number;
  scrollHeight: number;
  classColumns: number;
  focusLabel: string;
  firstFlowText: string;
};

async function collectClassesRealMetrics(page: Page): Promise<ClassesRealMetrics> {
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
    const firstCard = rect(".lgo-classespage-stack .lgo-class-path");
    const cards = Array.from(document.querySelectorAll<HTMLElement>(".lgo-classespage-stack .lgo-class-path"));
    const firstTop = cards[0]?.getBoundingClientRect().top ?? 0;
    const columns = cards.filter((card) => Math.abs(card.getBoundingClientRect().top - firstTop) <= 2).length || 0;
    const focusTarget = document.querySelector<HTMLElement>(".lgo-skip-link");
    focusTarget?.focus();
    return {
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      h1Font: h1 ? Number.parseFloat(getComputedStyle(h1).fontSize) : 0,
      maxFont: Math.max(...visibleElements.map((element) => Number.parseFloat(getComputedStyle(element).fontSize) || 0)),
      heroBottom: rect(".lgo-classespage-stack .lgo-paths-hero").bottom,
      classGridTop: rect(".lgo-classespage-stack .lgo-class-path-grid").top,
      classGridBottom: rect(".lgo-classespage-stack .lgo-class-path-grid").bottom,
      firstClassVisibleHeight: Math.max(0, Math.min(firstCard.bottom, window.innerHeight) - Math.max(firstCard.top, 0)),
      disclosureTop: rect(".lgo-classespage-stack .lgo-classespage-expanded-evidence").top,
      disclosureCount: document.querySelectorAll(".lgo-classespage-stack .lgo-classespage-expanded-evidence").length,
      identityTopClosed: document.querySelector(".lgo-classespage-expanded-evidence")?.hasAttribute("open") ? rect(".lgo-class-identity-section").top : -1,
      scrollHeight: document.documentElement.scrollHeight,
      classColumns: columns,
      focusLabel: document.activeElement?.textContent?.trim() ?? "",
      firstFlowText: [
        ".lgo-design-target-reference",
        ".lgo-classespage-stack .lgo-paths-hero",
        ".lgo-classespage-stack > .lgo-experience-section:nth-child(2)",
        ".lgo-classespage-stack .lgo-classespage-expanded-evidence > summary",
      ].map((selector) => document.querySelector<HTMLElement>(selector)?.textContent ?? "").join("\n"),
    };
  });
}

test.describe("classes real UI layout v1.215", () => {
  test("/classes renders compact Vietnamese Năm Lộ flow with shared disclosure proof", async ({ page, isMobile }) => {
    await page.goto(`${web}/classes`);
    await expect(page.getByRole("heading", { level: 1, name: "Chọn cách bạn nhìn và bảo vệ thế giới" })).toBeVisible();
    await expect(page.locator(".lgo-classespage-expanded-evidence > summary")).toBeVisible();

    const metrics = await collectClassesRealMetrics(page);
    console.log(JSON.stringify({ viewport: isMobile ? "mobile" : "desktop", metrics }, null, 2));

    expect(metrics.overflow, "classes page horizontal overflow").toBeLessThanOrEqual(0);
    expect(metrics.disclosureCount, "one shared disclosure for secondary classes proof").toBe(1);
    expect(metrics.firstFlowText, "classes first-flow stays Vietnamese").toContain("Bằng chứng phụ và chiều sâu Năm Lộ");
    expect(metrics.firstFlowText, "classes first-flow keeps proof out of core flow").toContain("không ép toàn bộ proof board vào first-flow `/classes`");
    expect(metrics.focusLabel, "skip link can receive focus").toContain("Bỏ qua menu");
    expect(metrics.identityTopClosed, "identity deck remains hidden while disclosure is closed").toBeLessThan(0);

    if (isMobile) {
      expect(metrics.h1Font, "mobile classes h1 compact").toBeLessThanOrEqual(38);
      expect(metrics.maxFont, "mobile visible font cap").toBeLessThanOrEqual(38);
      expect(metrics.heroBottom, "mobile classes hero does not dominate the first-fold").toBeLessThanOrEqual(610);
      expect(metrics.classGridTop, "mobile reaches class cards quickly").toBeLessThanOrEqual(740);
      expect(metrics.firstClassVisibleHeight, "mobile first class is visible in first viewport").toBeGreaterThanOrEqual(90);
      expect(metrics.disclosureTop, "mobile disclosure follows dense class grid").toBeLessThanOrEqual(1620);
      expect(metrics.scrollHeight, "mobile page height remains reviewable while proof is collapsed").toBeLessThanOrEqual(2400);
      expect(metrics.classColumns, "mobile keeps dense two-column class rhythm").toBe(2);
      await page.evaluate(() => (document.activeElement as HTMLElement | null)?.blur());
      await page.screenshot({ path: "/tmp/classes-mobile-v1215.png", fullPage: true });
    } else {
      expect(metrics.h1Font, "desktop classes h1 compact").toBeLessThanOrEqual(52);
      expect(metrics.maxFont, "desktop visible font cap").toBeLessThanOrEqual(52);
      expect(metrics.heroBottom, "desktop hero leaves room for class grid").toBeLessThanOrEqual(405);
      expect(metrics.classGridTop, "desktop class cards start inside first-flow").toBeLessThanOrEqual(500);
      expect(metrics.firstClassVisibleHeight, "desktop first card is materially visible in first viewport").toBeGreaterThanOrEqual(180);
      expect(metrics.disclosureTop, "desktop disclosure follows core class grid").toBeLessThanOrEqual(790);
      expect(metrics.scrollHeight, "desktop page height remains reviewable while proof is collapsed").toBeLessThanOrEqual(1320);
      expect(metrics.classColumns, "desktop keeps five classes in one row").toBe(5);
      await page.evaluate(() => (document.activeElement as HTMLElement | null)?.blur());
      await page.screenshot({ path: "/tmp/classes-desktop-v1215.png", fullPage: true });
    }
  });
});
