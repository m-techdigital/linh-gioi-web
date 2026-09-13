// v1.50 coverage: public skip link visual hiding, focus reveal, keyboard target, font-size and horizontal overflow.
import { test, expect } from "@playwright/test";

type SkipMetrics = {
  activeText: string;
  bottom: number;
  fontSize: number;
  hiddenByTransform: boolean;
  left: number;
  maxWidth: number;
  overflowWrap: string;
  top: number;
  topCss: string;
  transform: string;
  topmostText: string;
  zIndex: number;
  viewportWidth: number;
  overflow: number;
};

async function collectSkipMetrics(page: import("@playwright/test").Page): Promise<SkipMetrics> {
  return page.evaluate(() => {
    const skip = document.querySelector<HTMLAnchorElement>(".lgo-skip-link");
    if (!skip) throw new Error("missing public skip link");
    const rect = skip.getBoundingClientRect();
    const style = getComputedStyle(skip);
    return {
      activeText: document.activeElement?.textContent?.trim() ?? "",
      bottom: rect.bottom,
      fontSize: Number.parseFloat(style.fontSize),
      hiddenByTransform: style.transform !== "none",
      left: rect.left,
      maxWidth: Number.parseFloat(style.maxWidth),
      overflowWrap: style.overflowWrap,
      top: rect.top,
      topCss: style.top,
      transform: style.transform,
      topmostText: (() => {
        const cx = Math.max(1, Math.min(document.documentElement.clientWidth - 1, rect.left + Math.min(rect.width / 2, 120)));
        const cy = Math.max(1, Math.min(innerHeight - 1, rect.top + Math.min(rect.height / 2, 20)));
        return document.elementFromPoint(cx, cy)?.textContent?.trim() ?? "";
      })(),
      zIndex: Number.parseInt(style.zIndex, 10) || 0,
      viewportWidth: document.documentElement.clientWidth,
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    };
  });
}

async function assertPublicSkipLinkVisualBehavior(page: import("@playwright/test").Page, url: string, heading: string) {
  await page.goto(url);
  await expect(page.getByRole("heading", { name: heading, exact: true })).toBeVisible();

  await page.evaluate(() => window.scrollTo(0, 520));
  await page.getByRole("link", { name: /Linh Giới Online|Trạng thái chơi|Năm Lộ/ }).first().focus();
  const hidden = await collectSkipMetrics(page);
  expect(hidden.activeText).not.toContain("Bỏ qua menu");
  expect(hidden.topCss, "hidden public skip link should stay anchored at top: 0 and hide with transform").toBe("0px");
  expect(hidden.hiddenByTransform, "hidden public skip link should use transform").toBe(true);
  expect(hidden.bottom, "hidden public skip link should sit outside viewport when not focused").toBeLessThanOrEqual(0);
  expect(hidden.overflow, "hidden public skip link must not create horizontal overflow").toBeLessThanOrEqual(0);

  await page.goto(url);
  await expect(page.getByRole("heading", { name: heading, exact: true })).toBeVisible();
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: "Bỏ qua menu tới nội dung chính" });
  await expect(skip).toBeFocused();
  await expect(skip).toHaveAttribute("href", "#main-content");
  const focused = await collectSkipMetrics(page);
  expect(focused.top, "focused public skip link should be visible near the top").toBeGreaterThanOrEqual(8);
  expect(focused.top, "focused public skip link should avoid covering deep hero content").toBeLessThanOrEqual(24);
  expect(focused.topmostText, "focused public skip link should render above sticky header").toContain("Bỏ qua menu");
  expect(focused.zIndex, "focused public skip link z-index should clear sticky header").toBeGreaterThanOrEqual(100);
  expect(focused.left, "focused public skip link should stay inside viewport padding").toBeGreaterThanOrEqual(8);
  expect(focused.fontSize, "public skip link font-size").toBeLessThanOrEqual(16);
  expect(focused.maxWidth, "public skip link should have viewport max-width cap").toBeLessThanOrEqual(focused.viewportWidth - 32);
  expect(focused.overflowWrap, "public skip link should wrap long text safely").toBe("anywhere");
  expect(focused.overflow, "focused public skip link must not create horizontal overflow").toBeLessThanOrEqual(0);

  await page.keyboard.press("Enter");
  await expect(page.locator("#main-content")).toBeFocused();
}

test.describe("public skip link visual behavior", () => {
  test("classes route skip link hides without overlay artifacts", async ({ page }) => {
    await assertPublicSkipLinkVisualBehavior(page, "/classes", "Chọn cách bạn nhìn và bảo vệ thế giới");
  });

  test("download route skip link hides without overlay artifacts", async ({ page }) => {
    await assertPublicSkipLinkVisualBehavior(page, "/download", "Trạng thái chơi & tải game");
  });
});
