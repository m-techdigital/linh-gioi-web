// v1.63 coverage: public mobile brand navigation link rail is a keyboard-readable scroll region.
import { test, expect, type Page } from "@playwright/test";

type BrandNavMetrics = {
  pageOverflow: number;
  rail: {
    tabIndex: number;
    focused: boolean;
    role: string | null;
    ariaLabel: string | null;
    scrollWidth: number;
    clientWidth: number;
    overflowX: string;
    outlineStyle: string;
    fontSizes: number[];
    offscreenLinks: number;
  };
};

async function collectBrandNavMetrics(page: Page): Promise<BrandNavMetrics> {
  return page.evaluate(() => {
    const rail = document.querySelector<HTMLElement>(".lgo-brand-links");
    if (!rail) throw new Error("missing public brand nav link rail");
    const railRect = rail.getBoundingClientRect();
    const linkMetrics = Array.from(rail.querySelectorAll<HTMLElement>("a")).map((link) => {
      const rect = link.getBoundingClientRect();
      return {
        fontSize: Number.parseFloat(getComputedStyle(link).fontSize),
        offscreen: rect.right > railRect.right + 1 || rect.left < railRect.left - 1,
      };
    });
    return {
      pageOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      rail: {
        tabIndex: rail.tabIndex,
        focused: document.activeElement === rail,
        role: rail.getAttribute("role"),
        ariaLabel: rail.getAttribute("aria-label"),
        scrollWidth: rail.scrollWidth,
        clientWidth: rail.clientWidth,
        overflowX: getComputedStyle(rail).overflowX,
        outlineStyle: getComputedStyle(rail).outlineStyle,
        fontSizes: linkMetrics.map((item) => item.fontSize),
        offscreenLinks: linkMetrics.filter((item) => item.offscreen).length,
      }
    };
  });
}

async function expectPublicBrandNavRailReadable(page: Page, route: string, heading: string) {
  await page.goto(route);
  await expect(page.getByRole("heading", { name: heading })).toBeVisible();
  const rail = page.getByRole("region", { name: "Liên kết điều hướng chính" });
  await expect(rail).toBeVisible();
  await rail.focus();
  await expect(rail).toBeFocused();
  const metrics = await collectBrandNavMetrics(page);
  expect(metrics.pageOverflow, "public page horizontal overflow").toBeLessThanOrEqual(0);
  expect(metrics.rail.role, "brand link rail role").toBe("region");
  expect(metrics.rail.ariaLabel, "brand link rail label").toBe("Liên kết điều hướng chính");
  expect(metrics.rail.tabIndex, "brand link rail tabindex").toBe(0);
  expect(metrics.rail.focused, "brand link rail focus").toBe(true);
  expect(metrics.rail.scrollWidth, "brand link rail scroll width").toBeGreaterThan(metrics.rail.clientWidth);
  expect(metrics.rail.overflowX, "brand link rail overflow-x").toBe("auto");
  expect(metrics.rail.outlineStyle, "brand link rail focus outline").not.toBe("none");
  expect(metrics.rail.offscreenLinks, "brand link rail hides links horizontally for scroll").toBeGreaterThan(0);
  for (const size of metrics.rail.fontSizes) expect(size, "public nav font-size").toBeLessThanOrEqual(18);
}

test.describe("public brand navigation scroll region", () => {
  test("mobile classes route exposes the horizontal public route rail to keyboard users", async ({ page, isMobile }) => {
    test.skip(!isMobile, "mobile-only horizontal public nav rail coverage");
    await expectPublicBrandNavRailReadable(page, "/classes", "Chọn cách bạn bảo vệ Linh Giới");
  });

  test("mobile download route exposes the horizontal public route rail to keyboard users", async ({ page, isMobile }) => {
    test.skip(!isMobile, "mobile-only horizontal public nav rail coverage");
    await expectPublicBrandNavRailReadable(page, "/download", "Trạng thái chơi & tải game");
  });
});
