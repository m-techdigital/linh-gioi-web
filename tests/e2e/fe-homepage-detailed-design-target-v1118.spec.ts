// v1.118 coverage: homepage has a page-specific detailed design target before further UI work.
import { test, expect } from "@playwright/test";

const web = process.env.LGO_WEB_URL ?? "http://127.0.0.1:3000";
const targetPath = "/design-reference/homepage-detailed-design-target-v1118.png";

test.describe("homepage detailed design target", () => {
  test("homepage exposes the detailed target and keeps hero comparable", async ({ page, isMobile }) => {
    await page.goto(`${web}/`);
    await expect(page.getByRole("region", { name: /Design target reference.*Public Homepage/i })).toBeVisible();
    const targetLink = page.getByRole("link", { name: /Thiết kế chi tiết trang chủ.*Public Homepage.*mở trong tab mới/i });
    await expect(targetLink).toHaveAttribute("href", targetPath);
    await expect(page.locator("main h1").first()).toBeVisible();
    await expect(page.locator(".lgo-cinematic-hero")).toBeVisible();

    const metrics = await page.evaluate(() => {
      const hero = document.querySelector<HTMLElement>(".lgo-cinematic-hero");
      const h1 = document.querySelector<HTMLElement>("main h1");
      const designRegion = document.querySelector<HTMLElement>(".lgo-design-target-reference");
      const ctas = Array.from(document.querySelectorAll<HTMLAnchorElement>(".lgo-hero-actions-primary a"));
      return {
        overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        heroTop: hero?.getBoundingClientRect().top ?? -1,
        heroWidth: hero?.getBoundingClientRect().width ?? 0,
        h1Size: h1 ? Number.parseFloat(getComputedStyle(h1).fontSize) : 0,
        ctaCount: ctas.length,
        targetScope: designRegion?.textContent ?? "",
      };
    });
    expect(metrics.overflow, "homepage horizontal overflow").toBeLessThanOrEqual(0);
    expect(metrics.heroTop, "homepage hero starts in first viewport").toBeGreaterThanOrEqual(0);
    expect(metrics.heroWidth, "homepage hero rendered width").toBeGreaterThan(isMobile ? 320 : 900);
    expect(metrics.h1Size, "homepage h1 font-size").toBeLessThanOrEqual(isMobile ? 54 : 72);
    expect(metrics.ctaCount, "homepage primary CTA count").toBeGreaterThanOrEqual(3);
    expect(metrics.targetScope, "homepage target scope copy").toContain("Public Homepage");
  });

  test("the detailed design target image is a high-fidelity 16:9 board", async ({ page }) => {
    const response = await page.goto(`${web}${targetPath}`);
    expect(response?.ok(), "homepage target image response").toBe(true);
    const image = page.locator("img");
    await expect(image, "browser renders homepage detailed target").toBeVisible();
    const size = await image.evaluate((node: HTMLImageElement) => ({ width: node.naturalWidth, height: node.naturalHeight }));
    expect(size.width, "homepage detailed target width").toBeGreaterThanOrEqual(1600);
    expect(size.height, "homepage detailed target height").toBeGreaterThanOrEqual(900);
  });
});
