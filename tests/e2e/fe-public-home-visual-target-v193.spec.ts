// v1.93 coverage: homepage has a saved professional visual target and live hero renders against it.
import { test, expect, type Page } from "@playwright/test";

const web = process.env.LGO_WEB_URL ?? "http://127.0.0.1:3000";
const targetPath = "/design-reference/homepage-visual-target-v193.svg";

type HomeVisualMetrics = {
  pageOverflow: number;
  maxFont: number;
  targetStatus: number;
  hero: null | { x: number; y: number; width: number; height: number };
  h1: null | { text: string; x: number; y: number; width: number; height: number };
  primaryCta: null | { x: number; y: number; width: number; height: number; backgroundImage: string };
  scene: null | { x: number; y: number; width: number; height: number };
};

async function collectHomeVisualMetrics(page: Page): Promise<HomeVisualMetrics> {
  const target = await page.request.get(`${web}${targetPath}`);
  return page.evaluate((targetStatus) => {
    const visibleElements = Array.from(document.querySelectorAll<HTMLElement>("body *")).filter((element) => {
      const rect = element.getBoundingClientRect();
      const style = getComputedStyle(element);
      return rect.width > 0 && rect.height > 0 && style.visibility !== "hidden" && style.display !== "none";
    });
    const rectOf = (selector: string) => {
      const element = document.querySelector<HTMLElement>(selector);
      if (!element) return null;
      const rect = element.getBoundingClientRect();
      return { x: rect.x, y: rect.y, width: rect.width, height: rect.height };
    };
    const h1 = document.querySelector<HTMLElement>("main h1");
    const h1Rect = h1?.getBoundingClientRect();
    const primaryCta = document.querySelector<HTMLElement>("main .lgo-hero-actions-primary .lgo-link-button");
    const primaryCtaRect = primaryCta?.getBoundingClientRect();
    return {
      pageOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      maxFont: Math.max(...visibleElements.map((element) => Number.parseFloat(getComputedStyle(element).fontSize) || 0)),
      targetStatus,
      hero: rectOf(".lgo-cinematic-hero"),
      h1: h1 && h1Rect ? { text: h1.textContent?.trim() ?? "", x: h1Rect.x, y: h1Rect.y, width: h1Rect.width, height: h1Rect.height } : null,
      primaryCta: primaryCta && primaryCtaRect ? { x: primaryCtaRect.x, y: primaryCtaRect.y, width: primaryCtaRect.width, height: primaryCtaRect.height, backgroundImage: getComputedStyle(primaryCta).backgroundImage } : null,
      scene: rectOf(".lgo-cinematic-scene"),
    };
  }, target.status());
}

test.describe("public homepage visual target", () => {
  test("/ renders the designed hero target in the first viewport", async ({ page, isMobile }) => {
    await page.setViewportSize(isMobile ? { width: 412, height: 915 } : { width: 1440, height: 1100 });
    await page.goto(`${web}/`);
    await expect(page.getByRole("heading", { level: 1, name: "Sống một đời khác trong Linh Giới" })).toBeVisible();

    const metrics = await collectHomeVisualMetrics(page);
    expect(metrics.targetStatus, "saved homepage visual target asset").toBe(200);
    expect(metrics.hero?.width ?? 0, "hero rendered width").toBeGreaterThan(isMobile ? 360 : 1000);
    expect(metrics.hero?.height ?? 0, "hero rendered height").toBeGreaterThan(isMobile ? 520 : 420);
    expect(metrics.hero?.y ?? 9999, "hero starts in first viewport").toBeLessThan(isMobile ? 190 : 140);
    expect(metrics.h1?.text, "homepage h1 text").toBe("Sống một đời khác trong Linh Giới");
    expect(metrics.h1?.width ?? 0, "homepage h1 visible width").toBeGreaterThan(isMobile ? 280 : 420);
    expect(metrics.h1?.height ?? 0, "homepage h1 visible height").toBeGreaterThan(70);
    expect(metrics.primaryCta?.backgroundImage ?? "none", "primary CTA target styling").toContain("linear-gradient");
    expect(metrics.scene?.width ?? 0, "homepage scene visible width").toBeGreaterThan(isMobile ? 300 : 420);
    expect(metrics.scene?.height ?? 0, "homepage scene visible height").toBeGreaterThan(isMobile ? 300 : 330);
    expect(metrics.pageOverflow, "homepage visual target overflow").toBeLessThanOrEqual(0);
    expect(metrics.maxFont, "homepage visual target font cap").toBeLessThanOrEqual(isMobile ? 48 : 64);
  });
});
