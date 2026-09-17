import { expect, test } from "@playwright/test";

const stages = [
  "M0 — Sẵn sàng nội dung",
  "Kiểm tra tin cậy",
  "Điều kiện closed test",
  "Contract backend",
  "Owner phê duyệt",
  "M1 — Closed test có điều kiện",
];

const stateLabels = ["Công khai", "Nội bộ", "Đang bị chặn", "Đang bị chặn", "Đang bị chặn", "Đang bị chặn"];

test.describe("release visual realignment v1.273", () => {
  test.beforeEach(async ({ page }) => { await page.goto("/release"); });

  test("uses immersive release hierarchy without historical proof stack", async ({ page }) => {
    await expect(page.locator(".lgo-public-shell-immersive")).toHaveCount(1);
    await expect(page.locator(".lgo-release-landing-hero")).toBeVisible();
    await expect(page.locator("main h1")).toHaveText("Hành trình phát hành");
    await expect(page.locator(".lgo-release-expanded-evidence,.lgo-release-narrative-design-board")).toHaveCount(0);
  });

  test("renders the M0 to M1 release gate as live HTML", async ({ page }) => {
    const gateway = page.locator(".lgo-release-stage-gateway");
    await expect(gateway).toBeVisible();
    await expect(gateway.locator(".is-m0")).toContainText("M0");
    await expect(gateway.locator(".is-m1")).toContainText("M1");
    await expect(gateway.locator("img,svg,canvas")).toHaveCount(0);
  });

  test("renders exactly six canonical release stages in source order with Vietnamese states", async ({ page }) => {
    const cards = page.locator(".lgo-release-stage-card");
    await expect(cards).toHaveCount(6);
    await expect(cards.locator("h3")).toHaveText(stages);
    await expect(cards.locator(".lgo-release-stage-state")).toHaveText(stateLabels);
    for (const card of await cards.all()) await expect(card).toContainText("Cần có:");
  });

  test("uses clean project artwork instead of a baked design board", async ({ page }) => {
    await expect(page.locator('main img[src*="design-boards"],main img[src*="design-reference"]')).toHaveCount(0);
    const art = page.locator(".lgo-release-landing img");
    expect(await art.count()).toBeGreaterThanOrEqual(2);
    for (const image of await art.all()) {
      const natural = await image.evaluate((node: HTMLImageElement) => ({ w: node.naturalWidth, h: node.naturalHeight, complete: node.complete }));
      expect(natural.complete).toBe(true); expect(natural.w).toBeGreaterThan(240); expect(natural.h).toBeGreaterThan(140);
    }
  });

  test("keeps readiness concise and truthful", async ({ page }) => {
    await expect(page.locator(".lgo-release-readiness-strip article")).toHaveCount(4);
    await expect(page.locator(".lgo-release-truth-note")).toContainText("chưa có gói tải game công khai");
    await expect(page.locator('main a[href*=".zip"],main a[download],main button')).toHaveCount(0);
  });

  test("keeps release actions on real informational routes", async ({ page }) => {
    const hrefs = await page.locator(".lgo-release-landing-actions a").evaluateAll(nodes => nodes.map(node => node.getAttribute("href")));
    expect(hrefs).toEqual(["/release/readiness", "/download/trust", "/status"]);
    for (const link of await page.locator(".lgo-release-landing-actions a").all()) {
      const box = await link.boundingBox(); expect(box?.height ?? 0).toBeGreaterThanOrEqual(44);
    }
  });

  test("matches target wide rhythm on desktop and remains readable at 320px", async ({ page, isMobile }) => {
    if (!isMobile) {
      const grid = await page.locator(".lgo-release-stage-grid").boundingBox();
      const card = await page.locator(".lgo-release-stage-card").first().boundingBox();
      expect(grid?.width ?? 0).toBeGreaterThan(1180);
      expect(card?.width ?? 0).toBeGreaterThan(175);
      expect(await page.evaluate(() => document.documentElement.scrollHeight)).toBeLessThan(1500);
    }
    await page.setViewportSize({ width: 320, height: 900 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(0);
    const paragraphSize = await page.locator(".lgo-release-landing p").first().evaluate(node => Number.parseFloat(getComputedStyle(node).fontSize));
    expect(paragraphSize).toBeGreaterThanOrEqual(14);
    const focus = page.locator(".lgo-release-landing-actions a").first(); await focus.focus();
    expect(await focus.evaluate(node => getComputedStyle(node).outlineStyle)).not.toBe("none");
  });
});
