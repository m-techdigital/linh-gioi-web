// v1.43 coverage: keyboard focus, skip link, aria-current navigation, font-size and horizontal overflow.
import { test, expect } from "@playwright/test";

const portal = process.env.LGO_PORTAL_URL ?? "http://127.0.0.1:3001";
const ops = process.env.LGO_OPS_URL ?? "http://127.0.0.1:3002";

type LayoutMetrics = {
  overflow: boolean;
  focusedOutline: string;
  h1: number[];
  p: number[];
};

async function collectLayoutMetrics(page: import("@playwright/test").Page): Promise<LayoutMetrics> {
  return page.evaluate(() => {
    const sizes = (selector: string) => Array.from(document.querySelectorAll(selector)).map((node) => Number.parseFloat(getComputedStyle(node).fontSize));
    const active = document.activeElement as HTMLElement | null;
    return {
      overflow: document.documentElement.scrollWidth > innerWidth,
      focusedOutline: active ? getComputedStyle(active).outlineStyle : "",
      h1: sizes("main h1"),
      p: sizes("main p"),
    };
  });
}

function expectReadable(metrics: LayoutMetrics, mobile: boolean) {
  expect(metrics.overflow, "horizontal overflow").toBe(false);
  for (const size of metrics.h1) expect(size, "font-size h1").toBeLessThanOrEqual(mobile ? 34 : 46);
  for (const size of metrics.p) expect(size, "font-size body copy").toBeLessThanOrEqual(18);
}

async function expectSkipLinkKeyboardFocus(page: import("@playwright/test").Page) {
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: "Bỏ qua điều hướng tới nội dung chính" });
  await expect(skip, "skip link").toBeFocused();
  await expect(skip).toHaveAttribute("href", "#workspace-content");
  const metrics = await collectLayoutMetrics(page);
  expect(metrics.focusedOutline, "keyboard focus").not.toBe("none");
  await page.keyboard.press("Enter");
  await expect(page.locator("#workspace-content")).toBeFocused();
}

async function expectCurrentNav(page: import("@playwright/test").Page, navName: string, href: string) {
  const current = page.getByRole("navigation").getByRole("link", { name: new RegExp(navName) });
  await expect(current).toHaveAttribute("href", href);
  await expect(current).toHaveAttribute("aria-current", "page");
  await expect(current).toHaveAttribute("data-current", "page");
}

test.describe("workspace accessibility interaction audit", () => {
  test("portal account/security exposes keyboard skip link and active account nav", async ({ page, isMobile }) => {
    await page.goto(`${portal}/account/security`);

    await expect(page.getByRole("heading", { name: "Bảo mật tài khoản", exact: true })).toBeVisible();
    await expect(page.getByText("NO_ACCEPTED_BACKEND_CONTRACT", { exact: true })).toHaveCount(2);
    await expectCurrentNav(page, "Tài khoản", "/account");
    await expectSkipLinkKeyboardFocus(page);
    const metrics = await collectLayoutMetrics(page);
    expectReadable(metrics, isMobile);
  });

  test("ops security-governance exposes keyboard skip link and active governance nav", async ({ page, isMobile }) => {
    await page.goto(`${ops}/security-governance`);

    await expect(page.getByRole("heading", { name: "Security & Governance", exact: true })).toBeVisible();
    await expect(page.getByText("NO_ACCEPTED_BACKEND_CONTRACT", { exact: true })).toHaveCount(2);
    await expectCurrentNav(page, "Governance", "/security-governance");
    await expectSkipLinkKeyboardFocus(page);
    const metrics = await collectLayoutMetrics(page);
    expectReadable(metrics, isMobile);
  });
});
