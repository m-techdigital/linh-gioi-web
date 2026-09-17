import { expect, test } from "@playwright/test";

const origin = process.env.LGO_WEB_URL ?? "http://127.0.0.1:3000";
const stepNames = ["Học cách di chuyển", "Người Giữ Cổng", "Bia Luyện", "Slime Bóng Tối", "Mở Linh Thành"];
const milestoneNames = ["Người Giữ Cổng", "Bia Luyện", "Slime Bóng Tối", "Mở Linh Thành"];

test.describe("start visual realignment v1.270", () => {
  test.beforeEach(async ({ page }) => { await page.goto(origin + "/start", { waitUntil: "networkidle" }); });

  test("replaces proof-board start flow with immersive target hierarchy", async ({ page }) => {
    await expect(page.locator(".lgo-public-shell-immersive")).toHaveCount(1);
    await expect(page.locator(".lgo-start-landing-hero")).toBeVisible();
    await expect(page.locator(".lgo-startpage-stack,.lgo-start-design-board,.lgo-start-real-screenshot-panel")).toHaveCount(0);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Bắt đầu");
  });

  test("renders the five target onboarding steps as live HTML", async ({ page }) => {
    const steps = page.locator(".lgo-start-step");
    await expect(steps).toHaveCount(stepNames.length);
    for (const [index, name] of stepNames.entries()) await expect(steps.nth(index)).toContainText(name);
  });

  test("keeps movement controls and Lộ skill inside the first guide panel", async ({ page }) => {
    const panel = page.locator(".lgo-start-guide-panel");
    await expect(panel.getByRole("heading", { level: 2 })).toHaveText("Học cách di chuyển");
    for (const label of ["Di chuyển", "Nhảy", "Lướt nhanh", "Kỹ năng Lộ"]) await expect(panel).toContainText(label);
    for (const key of ["W", "A", "S", "D", "Space", "Shift"]) await expect(panel).toContainText(key);
  });

  test("renders four illustrated onboarding milestones from the target rhythm", async ({ page }) => {
    const cards = page.locator(".lgo-start-milestone-card");
    await expect(cards).toHaveCount(milestoneNames.length);
    for (const [index, name] of milestoneNames.entries()) {
      await expect(cards.nth(index).getByRole("heading", { level: 3 })).toHaveText(name);
      await expect(cards.nth(index).locator("img")).toHaveCount(1);
    }
  });

  test("uses decorative art instead of embedding design boards or blockout screenshots", async ({ page }) => {
    await expect(page.locator("main img[src*=design-reference],main img[src*=design-boards],main img[src*=onboarding],main iframe,main canvas")).toHaveCount(0);
    const art = page.locator(".lgo-start-landing img");
    expect(await art.count()).toBeGreaterThanOrEqual(5);
    for (const img of await art.all()) expect(await img.evaluate((el) => el.complete && el.naturalWidth > 0)).toBe(true);
  });

  test("keeps every public action truthful and keyboard reachable", async ({ page }) => {
    await expect(page.locator("main form,main input,main a[download]")).toHaveCount(0);
    await expect(page.locator("main")).not.toContainText(/chơi ngay|tạo nhân vật|đăng ký ngay/i);
    const actions = page.locator(".lgo-start-actions a");
    expect(await actions.count()).toBeGreaterThanOrEqual(2);
    for (const action of await actions.all()) expect((await action.getAttribute("href")) ?? "").toMatch(/^(#|\/)/);
    await actions.first().focus();
    expect(await actions.first().evaluate((el) => getComputedStyle(el).outlineStyle)).not.toBe("none");
  });

  test("desktop density and 320px layout stay target-like and readable", async ({ page, isMobile }) => {
    if (!isMobile) {
      expect(await page.evaluate(() => document.documentElement.scrollHeight)).toBeLessThan(1500);
      expect((await page.locator(".lgo-start-guide-panel").boundingBox())!.width).toBeGreaterThan(1100);
      const cols = await page.locator(".lgo-start-milestone-grid").evaluate((el) => getComputedStyle(el).gridTemplateColumns.split(" ").length);
      expect(cols).toBe(4);
    }
    await page.setViewportSize({ width: 320, height: 800 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(0);
    for (const p of await page.locator(".lgo-start-landing p").all()) if (await p.isVisible()) expect(await p.evaluate((el) => parseFloat(getComputedStyle(el).fontSize))).toBeGreaterThanOrEqual(14);
    for (const action of await page.locator(".lgo-start-actions a").all()) if (await action.isVisible()) expect((await action.boundingBox())!.height).toBeGreaterThanOrEqual(44);
  });
});
