import { test, expect } from "@playwright/test";

for (const [app, url] of [["Portal", `${process.env.LGO_PORTAL_URL ?? "http://127.0.0.1:3001"}/login`], ["Ops", `${process.env.LGO_OPS_URL ?? "http://127.0.0.1:3002"}/security-governance`]]) {
  test(`${app}: shared shell has gutters and accessible controls`, async ({ page }) => {
    await page.goto(url!);
    const box = await page.locator(".lgo-workspace-header-inner").boundingBox();
    expect(box!.x).toBeGreaterThanOrEqual(15);
    expect(box!.width).toBeLessThanOrEqual(1180);
    const button = page.locator("main .lgo-button").first();
    expect((await button.boundingBox())!.height).toBeGreaterThanOrEqual(44);
    await expect(button).toBeDisabled();
    if (page.viewportSize()!.width < 720) {
      await expect(page.locator(".lgo-boundary-banner").first()).toHaveCSS("flex-direction", "column");
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  });
}
