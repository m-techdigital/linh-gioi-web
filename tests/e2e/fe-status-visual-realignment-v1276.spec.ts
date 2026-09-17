import { expect, test } from "@playwright/test";

const web = process.env.LGO_WEB_URL ?? "http://127.0.0.1:3000";
const surfaceTitles = ["Website công khai", "Gói tải game", "Tài khoản / quyền Portal", "Guardrail runtime/browser"];

async function waitForStatusLayout(page) {
  await page.goto(`${web}/status`, { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { level: 1, name: "Trạng thái công khai" })).toBeVisible();
  await page.evaluate(async () => { await document.fonts.ready; });
  await page.waitForFunction(() => document.readyState === "complete");
}

test.describe("status visual realignment v1.276", () => {
  test.beforeEach(async ({ page }) => { await waitForStatusLayout(page); });

  test("uses the immersive target hierarchy with one status landing owner", async ({ page }) => {
    await expect(page.locator(".lgo-public-shell-immersive")).toHaveCount(1);
    await expect(page.locator(".lgo-status-landing")).toBeVisible();
    await expect(page.locator(".lgo-status-hero")).toBeVisible();
    await expect(page.locator(".lgo-statuspage-stack")).toHaveCount(0);
  });

  test("keeps three truthful visibility signals and never turns them into live health", async ({ page }) => {
    const root = page.locator(".lgo-status-landing");
    await expect(root.locator(".lgo-visibility-signal strong")).toHaveText(["Công khai", "Nội bộ", "Tạm khóa"]);
    await expect(root).toContainText("NO_ACCEPTED_BACKEND_CONTRACT");
    await expect(root).toContainText("Không có dữ liệu giám sát trực tiếp");
    await expect(root.locator(".lgo-status-live-metrics,[data-live=true],[role=progressbar],form,a[download]")).toHaveCount(0);
  });

  test("preserves the four source surfaces and their real visibility states", async ({ page }) => {
    const catalog = page.locator(".lgo-visibility-catalog");
    await expect(catalog.locator(".lgo-visibility-card h3")).toHaveText(surfaceTitles);
    await expect(catalog.locator(".lgo-visibility-card")).toHaveCount(4);
    await catalog.getByRole("button", { name: "Tạm khóa", exact: true }).click();
    await expect(catalog.locator(".lgo-visibility-card")).toHaveCount(2);
    await expect(catalog.getByRole("status")).toContainText("2/4");
    await catalog.getByRole("button", { name: "Tất cả", exact: true }).click();
  });

  test("uses clean project artwork and never embeds the registered design board", async ({ page }) => {
    const hero = page.locator(".lgo-status-hero");
    await expect(hero.locator('img[src="/game-art/world/dong-mon-skyline.webp"]')).toHaveCount(1);
    await expect(hero.locator('img[src="/game-art/marketing/hero-traveler.png"]')).toHaveCount(1);
    await expect(page.locator('main img[src*="design-reference"],main img[src*="design-boards"]')).toHaveCount(0);
  });

  test("keeps trust, maintenance and three real next routes in the target reading flow", async ({ page }) => {
    const root = page.locator(".lgo-status-landing");
    await expect(root.getByRole("heading", { name: "Cam kết minh bạch" })).toBeVisible();
    await expect(root.getByRole("heading", { name: "Thông tin bảo trì" })).toBeVisible();
    const next = root.locator(".lgo-release-shortcuts-three a");
    await expect(next).toHaveCount(3);
    await expect(next.nth(0)).toHaveAttribute("href", "/release/readiness");
    await expect(next.nth(1)).toHaveAttribute("href", "/release/tester-pack");
    await expect(next.nth(2)).toHaveAttribute("href", "/support/safety");
  });

  test("matches target-wide rhythm on desktop and remains compact at 390px", async ({ page, isMobile }) => {
    if (!isMobile) {
      const desktop = await page.evaluate(() => {
        const hero = document.querySelector<HTMLElement>(".lgo-status-hero")?.getBoundingClientRect();
        const surfaces = document.querySelector<HTMLElement>("#status-surfaces")?.getBoundingClientRect();
        const trust = document.querySelector<HTMLElement>(".lgo-status-trust-grid")?.getBoundingClientRect();
        return { innerWidth, scrollWidth: document.documentElement.scrollWidth, scrollHeight: document.documentElement.scrollHeight,
          heroWidth: hero?.width ?? 0, heroBottom: hero?.bottom ?? 9999, surfacesTop: surfaces?.top ?? 9999, trustTop: trust?.top ?? 9999 };
      });
      expect(desktop.scrollWidth).toBeLessThanOrEqual(desktop.innerWidth);
      expect(desktop.heroWidth).toBeGreaterThanOrEqual(desktop.innerWidth - 1);
      expect(desktop.heroBottom).toBeLessThan(650);
      expect(desktop.surfacesTop).toBeLessThan(720);
      expect(desktop.trustTop).toBeLessThan(1250);
      expect(desktop.scrollHeight).toBeLessThan(1550);
    }
    await page.setViewportSize({ width: 390, height: 844 });
    const mobile = await page.evaluate(() => ({ innerWidth, scrollWidth: document.documentElement.scrollWidth, scrollHeight: document.documentElement.scrollHeight,
      heroWidth: document.querySelector<HTMLElement>(".lgo-status-hero")?.getBoundingClientRect().width ?? 0 }));
    expect(mobile.scrollWidth).toBeLessThanOrEqual(mobile.innerWidth);
    expect(mobile.heroWidth).toBeLessThanOrEqual(mobile.innerWidth + 1);
    expect(mobile.scrollHeight).toBeLessThan(3000);
  });

  test("keeps filter and evidence disclosure keyboard reachable", async ({ page }) => {
    const catalog = page.locator(".lgo-visibility-catalog");
    const blocked = catalog.getByRole("button", { name: "Tạm khóa", exact: true });
    await blocked.focus(); await expect(blocked).toBeFocused(); await page.keyboard.press("Enter");
    await expect(blocked).toHaveAttribute("aria-pressed", "true");
    const summary = catalog.locator(".lgo-visibility-card summary").first();
    await summary.focus(); await expect(summary).toBeFocused(); await page.keyboard.press("Enter");
    await expect(summary.locator("..")).toHaveAttribute("open", "");
  });
});
