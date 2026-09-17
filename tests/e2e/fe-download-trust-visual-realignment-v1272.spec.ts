import { expect, test } from "@playwright/test";

const origin = process.env.LGO_WEB_URL ?? "http://127.0.0.1:3000";
const gateNames = [
  "Có gói build thật",
  "SHA256 hiển thị cạnh link tải",
  "Nguồn gốc đọc được bởi người chơi",
  "Giới hạn đã biết đặt cạnh CTA",
  "Kỳ vọng hỗ trợ đã sẵn sàng",
  "Phê duyệt chủ sở hữu",
];

test.describe("download trust visual realignment v1.272", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(origin + "/download/trust", { waitUntil: "networkidle" });
  });

  test("replaces proof-stack trust flow with immersive trust target hierarchy", async ({ page }) => {
    await expect(page.locator(".lgo-public-shell-immersive")).toHaveCount(1);
    await expect(page.locator(".lgo-download-trust-hero")).toBeVisible();
    await expect(page.locator(".lgo-downloadtrustpage-stack,.lgo-download-trust-secondary")).toHaveCount(0);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Tin cậy tải game");
  });

  test("keeps the trust promise truthful and exposes no fake download", async ({ page }) => {
    const hero = page.locator(".lgo-download-trust-hero");
    await expect(hero).toContainText("Không tải giả");
    await expect(page.locator("main a[download],main a[href$='.zip'],main a[href$='.dmg'],main a[href$='.exe']")).toHaveCount(0);
    await expect(page.locator("main")).not.toContainText(/tải ngay|chơi ngay|open beta|đã phát hành/i);
  });

  test("renders all six canonical trust gates in source order", async ({ page }) => {
    const gates = page.locator(".lgo-download-trust-gate-card");
    await expect(gates).toHaveCount(gateNames.length);
    for (const [index, name] of gateNames.entries()) {
      await expect(gates.nth(index).getByRole("heading", { level: 3 })).toHaveText(name);
    }
  });

  test("keeps evidence and player-facing boundaries readable on every gate", async ({ page }) => {
    for (const gate of await page.locator(".lgo-download-trust-gate-card").all()) {
      await expect(gate).toContainText("Cần có");
      await expect(gate).toContainText("Người chơi thấy");
    }
  });

  test("uses separate decorative trust art instead of embedding the design board", async ({ page }) => {
    await expect(page.locator("main img[src*=design-reference],main img[src*=design-boards],main iframe,main canvas")).toHaveCount(0);
    const art = page.locator(".lgo-download-trust-landing img");
    expect(await art.count()).toBeGreaterThanOrEqual(2);
    for (const img of await art.all()) {
      expect(await img.evaluate((el) => el.complete && el.naturalWidth > 0 && el.naturalHeight > 0)).toBe(true);
    }
  });

  test("keeps every public action truthful and keyboard reachable", async ({ page }) => {
    const actions = page.locator(".lgo-download-trust-actions a");
    await expect(actions).toHaveCount(3);
    await expect(actions.nth(0)).toHaveAttribute("href", "/download");
    await expect(actions.nth(1)).toHaveAttribute("href", "/guides/release-trust-and-checksum-guide");
    await expect(actions.nth(2)).toHaveAttribute("href", "/status");
    await actions.first().focus();
    expect(await actions.first().evaluate((el) => getComputedStyle(el).outlineStyle)).not.toBe("none");
  });

  test("desktop trust gates follow target rhythm and 320px remains readable", async ({ page, isMobile }) => {
    if (!isMobile) {
      expect(await page.evaluate(() => document.documentElement.scrollHeight)).toBeLessThan(1500);
      const grid = page.locator(".lgo-download-trust-gate-grid");
      expect((await grid.boundingBox())!.width).toBeGreaterThan(1100);
      expect(await grid.evaluate((el) => getComputedStyle(el).gridTemplateColumns.split(" ").filter(Boolean).length)).toBe(6);
    }
    await page.setViewportSize({ width: 320, height: 800 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(0);
    for (const p of await page.locator(".lgo-download-trust-landing p").all()) {
      if (await p.isVisible()) expect(await p.evaluate((el) => parseFloat(getComputedStyle(el).fontSize))).toBeGreaterThanOrEqual(14);
    }
    for (const action of await page.locator(".lgo-download-trust-actions a").all()) {
      if (await action.isVisible()) expect((await action.boundingBox())!.height).toBeGreaterThanOrEqual(44);
    }
  });
});
