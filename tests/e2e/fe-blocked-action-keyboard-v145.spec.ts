// v1.45 coverage: blocked Portal action controls remain non-operational but keyboard-readable.
import { test, expect } from "@playwright/test";

const portal = process.env.LGO_PORTAL_URL ?? "http://127.0.0.1:3001";

type Metrics = {
  overflow: boolean;
  buttonFont: number[];
  focusedOutline: string;
};

async function collectMetrics(page: import("@playwright/test").Page): Promise<Metrics> {
  return page.evaluate(() => {
    const buttonFont = Array.from(document.querySelectorAll("main button")).map((node) => Number.parseFloat(getComputedStyle(node).fontSize));
    const active = document.activeElement as HTMLElement | null;
    return {
      overflow: document.documentElement.scrollWidth > innerWidth,
      buttonFont,
      focusedOutline: active ? getComputedStyle(active).outlineStyle : "",
    };
  });
}

async function expectBlockedAction(page: import("@playwright/test").Page, name: string) {
  const writes: string[] = [];
  page.on("request", (request) => {
    if (!["GET", "HEAD"].includes(request.method())) writes.push(`${request.method()} ${request.url()}`);
  });

  const button = page.getByRole("button", { name });
  await expect(button).toHaveAttribute("aria-disabled", "true");
  await expect(button).toHaveAttribute("data-disabled", "true");
  await expect(button).toHaveAttribute("aria-describedby", /blocked-action/);
  await button.focus();
  await expect(button).toBeFocused();
  const metrics = await collectMetrics(page);
  expect(metrics.focusedOutline, "keyboard focus").not.toBe("none");
  await button.click({ force: true });
  await page.keyboard.press("Enter");
  expect(writes).toEqual([]);
  expect(metrics.overflow, "horizontal overflow").toBe(false);
  for (const size of metrics.buttonFont) expect(size, "font-size button").toBeLessThanOrEqual(18);
}

test.describe("Portal blocked action keyboard clarity", () => {
  test("login blocked action is focusable and non-operational", async ({ page }) => {
    await page.goto(`${portal}/login`);
    await expect(page.getByRole("heading", { name: "Đăng nhập Linh Giới" })).toBeVisible();
    await expect(page.getByText("Fixture only — đăng nhập thật chưa được mở")).toBeVisible();
    await expectBlockedAction(page, "Đăng nhập chưa khả dụng");
  });

  test("register blocked action is focusable and non-operational", async ({ page }) => {
    await page.goto(`${portal}/register`);
    await expect(page.getByRole("heading", { name: "Tạo tài khoản Linh Giới" })).toBeVisible();
    await expect(page.getByText("Registration fixture only")).toBeVisible();
    await expectBlockedAction(page, "Đăng ký chưa khả dụng");
  });

  test("recovery blocked action is focusable and non-operational", async ({ page }) => {
    await page.goto(`${portal}/recovery`);
    await expect(page.getByRole("heading", { name: "Khôi phục tài khoản" })).toBeVisible();
    await expect(page.getByText("Recovery fixture only")).toBeVisible();
    await expectBlockedAction(page, "Khôi phục chưa khả dụng");
  });
});
