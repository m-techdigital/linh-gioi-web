import { test, expect } from "@playwright/test";

const web = process.env.LGO_WEB_URL ?? "http://127.0.0.1:3000";
const shortcuts = ["Điều kiện phát hành", "Checklist chuẩn bị", "Báo cáo thiết bị", "Mẫu phản hồi", "Giới hạn đã biết"];

test.describe("release tester pack visual realignment v1.275", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${web}/release/tester-pack`, { waitUntil: "networkidle" });
    await expect(page.locator("main h1")).toHaveText("Gói tester cộng đồng");
    await expect(page.locator(".lgo-tester-pack-landing")).toBeVisible();
    await page.evaluate(async () => { await document.fonts.ready; });
    await page.waitForFunction(() => {
      const hero = document.querySelector<HTMLElement>(".lgo-tester-pack-hero")?.getBoundingClientRect();
      const summary = document.querySelector<HTMLElement>(".lgo-tester-pack-secondary > summary")?.getBoundingClientRect();
      return document.readyState === "complete" && (hero?.width ?? 0) > 0 && (hero?.height ?? 0) > 0
        && (summary?.width ?? 0) > 0 && (summary?.height ?? 0) > 0;
    });
  });

  test("uses immersive target hierarchy with one tester-pack landing owner", async ({ page }) => {
    await expect(page.locator(".lgo-public-shell-immersive")).toHaveCount(1);
    await expect(page.locator(".lgo-tester-pack-landing")).toBeVisible();
    await expect(page.locator(".lgo-tester-pack-hero")).toBeVisible();
    await expect(page.locator(".lgo-testerpackpage-stack")).toHaveCount(0);
  });

  test("keeps the five truthful tester shortcuts in target order", async ({ page }) => {
    const cards = page.locator(".lgo-tester-shortcuts a");
    await expect(cards).toHaveCount(5);
    await expect(cards.locator("strong")).toHaveText(shortcuts);
    await expect(cards.first()).toHaveAttribute("href", "/release/readiness");
    await expect(cards.nth(3)).toHaveAttribute("href", "#tester-feedback");
  });

  test("uses clean cinematic project artwork plus the live field manual", async ({ page }) => {
    await expect(page.locator('main img[src*="design-boards"],main img[src*="design-reference"]')).toHaveCount(0);
    const hero = page.locator(".lgo-tester-pack-hero");
    await expect(hero.locator(".lgo-field-manual")).toBeVisible();
    const art = hero.locator("img");
    expect(await art.count()).toBeGreaterThanOrEqual(2);
    for (const image of await art.all()) {
      const natural = await image.evaluate((node: HTMLImageElement) => ({ complete: node.complete, w: node.naturalWidth, h: node.naturalHeight }));
      expect(natural.complete).toBe(true);
      expect(natural.w).toBeGreaterThan(240);
      expect(natural.h).toBeGreaterThan(140);
    }
  });
  test("puts safe feedback and template tools in the primary target flow", async ({ page }) => {
    const primary = page.locator(".lgo-tester-pack-primary-grid");
    await expect(primary).toBeVisible();
    await expect(primary.locator("#tester-safety-heading")).toHaveText("Phản hồi an toàn");
    await expect(primary.locator("#tester-feedback-heading")).toHaveText("Mẫu phản hồi");
    await expect(primary.getByRole("tablist", { name: "Mẫu phản hồi" })).toBeVisible();
  });

  test("preserves local preparation tools inside one native secondary disclosure", async ({ page }) => {
    const secondary = page.locator(".lgo-tester-pack-secondary");
    await expect(secondary).toHaveCount(1);
    await expect(secondary).not.toHaveAttribute("open", "");
    const summary = secondary.locator(":scope > summary");
    await expect(summary).toContainText("Chuẩn bị chi tiết");
    await summary.focus(); await expect(summary).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(secondary).toHaveAttribute("open", "");
    await expect(secondary.locator(".lgo-local-checklist")).toBeVisible();
    await expect(secondary.locator("#tester-device")).toBeVisible();
    await expect(secondary.locator(".lgo-tester-limitations details")).toHaveCount(4);
  });

  test("keeps tester boundaries truthful and non-submitting", async ({ page }) => {
    const root = page.locator(".lgo-tester-pack-landing");
    await expect(root).toContainText("Chưa mở intake");
    await expect(root).toContainText("Không hứa slot");
    await expect(root).toContainText("NO_ACCEPTED_BACKEND_CONTRACT");
    await expect(root.locator("form,input[type=email],input[type=password],input[type=file],a[download]")).toHaveCount(0);
  });

  test("matches compact target density without clipping at 320px", async ({ page, isMobile }) => {
    if (!isMobile) {
      const metrics = await page.evaluate(() => {
        const hero = document.querySelector<HTMLElement>(".lgo-tester-pack-hero")?.getBoundingClientRect();
        const shortcuts = document.querySelector<HTMLElement>(".lgo-tester-shortcuts")?.getBoundingClientRect();
        const primary = document.querySelector<HTMLElement>(".lgo-tester-pack-primary-grid")?.getBoundingClientRect();
        return { innerWidth, scrollHeight: document.documentElement.scrollHeight, heroWidth: hero?.width ?? 0, shortcutsTop: shortcuts?.top ?? 9999, primaryTop: primary?.top ?? 9999 };
      });
      expect(metrics.heroWidth).toBeGreaterThanOrEqual(metrics.innerWidth - 1);
      expect(metrics.shortcutsTop).toBeLessThan(650);
      expect(metrics.primaryTop).toBeLessThan(950);
      expect(metrics.scrollHeight).toBeLessThan(1800);
    }
    await page.setViewportSize({ width: 320, height: 900 });
    const mobile = await page.evaluate(() => {
      const hero = document.querySelector<HTMLElement>(".lgo-tester-pack-hero")?.getBoundingClientRect();
      return { viewportWidth: innerWidth, scrollWidth: document.documentElement.scrollWidth, scrollHeight: document.documentElement.scrollHeight, heroWidth: hero?.width ?? 0 };
    });
    expect(mobile.scrollWidth).toBeLessThanOrEqual(mobile.viewportWidth);
    expect(mobile.heroWidth).toBeLessThanOrEqual(mobile.viewportWidth + 1);
    expect(mobile.scrollHeight).toBeLessThan(3200);
    const leadSize = await page.locator(".lgo-tester-pack-landing .lgo-hero-lead").evaluate(node => Number.parseFloat(getComputedStyle(node).fontSize));
    expect(leadSize).toBeGreaterThanOrEqual(14);
  });
});
