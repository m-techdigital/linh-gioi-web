// v1.47 coverage: workspace skip link visual hiding, focus reveal, keyboard target, font-size and horizontal overflow.
import { test, expect } from "@playwright/test";

const portal = process.env.LGO_PORTAL_URL ?? "http://127.0.0.1:3001";
const ops = process.env.LGO_OPS_URL ?? "http://127.0.0.1:3002";

type SkipMetrics = {
  activeText: string;
  bottom: number;
  fontSize: number;
  hiddenByTransform: boolean;
  left: number;
  maxWidth: number;
  top: number;
  topCss: string;
  transform: string;
  viewportWidth: number;
  overflow: number;
};

async function collectSkipMetrics(page: import("@playwright/test").Page): Promise<SkipMetrics> {
  return page.evaluate(() => {
    const skip = document.querySelector<HTMLAnchorElement>(".lgo-workspace-skip");
    if (!skip) throw new Error("missing workspace skip link");
    const rect = skip.getBoundingClientRect();
    const style = getComputedStyle(skip);
    return {
      activeText: document.activeElement?.textContent?.trim() ?? "",
      bottom: rect.bottom,
      fontSize: Number.parseFloat(style.fontSize),
      hiddenByTransform: style.transform !== "none",
      left: rect.left,
      maxWidth: Number.parseFloat(style.maxWidth),
      top: rect.top,
      topCss: style.top,
      transform: style.transform,
      viewportWidth: document.documentElement.clientWidth,
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    };
  });
}

async function assertSkipLinkVisualBehavior(page: import("@playwright/test").Page, url: string, heading: string) {
  await page.goto(url);
  await expect(page.getByRole("heading", { name: heading, exact: true })).toBeVisible();

  await page.evaluate(() => window.scrollTo(0, 520));
  await page.getByRole("link", { name: /Control|Tổng quan|Account|Tài khoản/ }).first().focus();
  const hidden = await collectSkipMetrics(page);
  expect(hidden.activeText).not.toContain("Bỏ qua điều hướng");
  expect(hidden.topCss, "hidden skip link should stay anchored at top: 0 and hide with transform for clean screenshots").toBe("0px");
  expect(hidden.hiddenByTransform, "hidden skip link should use transform instead of negative top").toBe(true);
  expect(hidden.bottom, "hidden skip link should sit outside the viewport when not focused").toBeLessThanOrEqual(0);
  expect(hidden.overflow, "hidden skip link must not create horizontal overflow").toBeLessThanOrEqual(0);

  await page.goto(url);
  await expect(page.getByRole("heading", { name: heading, exact: true })).toBeVisible();
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: "Bỏ qua điều hướng tới nội dung chính" });
  await expect(skip).toBeFocused();
  const focused = await collectSkipMetrics(page);
  expect(focused.top, "focused skip link should be visible near the viewport top").toBeGreaterThanOrEqual(8);
  expect(focused.top, "focused skip link should not cover deep hero/page content").toBeLessThanOrEqual(24);
  expect(focused.left, "focused skip link should align within mobile viewport padding").toBeGreaterThanOrEqual(8);
  expect(focused.fontSize, "skip link font-size").toBeLessThanOrEqual(16);
  expect(focused.maxWidth, "skip link must have a viewport max-width cap").toBeLessThanOrEqual(focused.viewportWidth - 32);
  expect(focused.overflow, "focused skip link must not create horizontal overflow").toBeLessThanOrEqual(0);

  await page.keyboard.press("Enter");
  await expect(page.locator("#workspace-content")).toBeFocused();
}

test.describe("workspace skip link visual behavior", () => {
  test("portal workspace skip link hides without screenshot overlay artifacts", async ({ page }) => {
    await assertSkipLinkVisualBehavior(page, `${portal}/account/security`, "Bảo mật tài khoản");
  });

  test("ops workspace skip link hides without screenshot overlay artifacts", async ({ page }) => {
    await assertSkipLinkVisualBehavior(page, `${ops}/content-liveops`, "Content & LiveOps");
  });
});
