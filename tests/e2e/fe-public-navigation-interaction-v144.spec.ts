// v1.44 coverage: public keyboard/navigation continuity, aria-current, font-size and horizontal overflow.
import { test, expect } from "@playwright/test";

type Metrics = {
  overflow: boolean;
  focusedText: string;
  focusedOutline: string;
  h1: number[];
  navFont: number[];
};

async function collectMetrics(page: import("@playwright/test").Page): Promise<Metrics> {
  return page.evaluate(() => {
    const sizes = (selector: string) => Array.from(document.querySelectorAll(selector)).map((node) => Number.parseFloat(getComputedStyle(node).fontSize));
    const active = document.activeElement as HTMLElement | null;
    return {
      overflow: document.documentElement.scrollWidth > innerWidth,
      focusedText: active?.textContent?.trim() ?? "",
      focusedOutline: active ? getComputedStyle(active).outlineStyle : "",
      h1: sizes("main h1"),
      navFont: sizes(".lgo-brand-nav a"),
    };
  });
}

function expectReadable(metrics: Metrics, mobile: boolean) {
  expect(metrics.overflow, "horizontal overflow").toBe(false);
  for (const size of metrics.h1) expect(size, "font-size h1").toBeLessThanOrEqual(mobile ? 54 : 66);
  for (const size of metrics.navFont) expect(size, "font-size nav").toBeLessThanOrEqual(18);
}

async function expectSkipLink(page: import("@playwright/test").Page) {
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: "Bỏ qua menu tới nội dung chính" });
  await expect(skip, "skip link").toBeFocused();
  await expect(skip).toHaveAttribute("href", "#main-content");
  const metrics = await collectMetrics(page);
  expect(metrics.focusedOutline, "keyboard focus").not.toBe("none");
  await page.keyboard.press("Enter");
  await expect(page.locator("#main-content")).toBeFocused();
}

async function expectCurrentPublicLink(page: import("@playwright/test").Page, name: string, href: string) {
  const link = page.getByRole("navigation", { name: "Linh Giới Online public navigation" }).getByRole("link", { name });
  await expect(link).toHaveAttribute("href", href);
  await expect(link).toHaveAttribute("aria-current", "page");
  await expect(link).toHaveAttribute("data-current", "page");
}

test.describe("public navigation interaction audit", () => {
  test("classes route marks Năm Lộ as current and keeps keyboard layout readable", async ({ page, isMobile }) => {
    await page.goto("/classes");
    await expect(page.getByRole("heading", { name: "Chọn cách bạn nhìn và bảo vệ thế giới" })).toBeVisible();
    await expectCurrentPublicLink(page, "Năm Lộ", "/classes");
    await expectSkipLink(page);
    expectReadable(await collectMetrics(page), isMobile);
  });

  test("download route marks Trạng thái chơi as current and keeps keyboard layout readable", async ({ page, isMobile }) => {
    await page.goto("/download");
    await expect(page.getByRole("heading", { name: "Trạng thái chơi & tải game" })).toBeVisible();
    await expectCurrentPublicLink(page, "Trạng thái chơi", "/download");
    await expectSkipLink(page);
    expectReadable(await collectMetrics(page), isMobile);
  });
});
