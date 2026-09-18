import { test, expect } from "@playwright/test";

const portal = process.env.LGO_PORTAL_URL ?? "http://127.0.0.1:3001";

for (const route of ["login", "register", "recovery"]) {
  test(`${route}: safe preview, readable steps and access navigation`, async ({ page }) => {
    const writes: string[] = [];
    page.on("request", (request) => {
      if (!["GET", "HEAD"].includes(request.method())) writes.push(request.url());
    });
    await page.goto(`${portal}/${route}`);
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.getByRole("list", { name: "Các bước truy cập dự kiến" }).getByRole("listitem")).toHaveCount(3);
    await expect(page.locator('[aria-current="step"]')).toHaveCount(1);
    const inputs = page.locator("main input");
    await expect(inputs).toHaveCount(route === "recovery" ? 1 : 2);
    for (const input of await inputs.all()) {
      await expect(input).toHaveAttribute("aria-disabled", "true");
      await expect(input).toHaveAttribute("data-disabled", "true");
      await expect(input).toHaveAttribute("readonly", "");
    }
    const checkbox = page.locator('main [role="checkbox"]');
    await expect(checkbox).toHaveCount(route === "recovery" ? 0 : 1);
    if (route !== "recovery") {
      await expect(checkbox).toHaveAttribute("aria-disabled", "true");
      await expect(checkbox).toHaveAttribute("data-disabled", "true");
    }
    for (const button of await page.locator("main button").all()) {
      await expect(button).toHaveAttribute("aria-disabled", "true");
      await expect(button).toHaveAttribute("data-disabled", "true");
    }
    await expect(page.locator("form")).toHaveCount(0);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.getByRole("link", { name: "Trạng thái truy cập", exact: true }).click();
    await expect(page.getByRole("heading", { name: "Trạng thái truy cập", exact: true })).toBeVisible();
    await expect(page.getByText("Đăng nhập, đăng ký và khôi phục chưa mở. Không thu thông tin cá nhân, không tạo tài khoản hoặc phiên đăng nhập.", { exact: true })).toBeVisible();
    await page.getByRole("link", { name: "Xem tài khoản mẫu", exact: true }).click();
    await expect(page).toHaveURL(`${portal}/account`);
    expect(writes).toEqual([]);
  });
}

test("registration and recovery are reachable from login", async ({ page }) => {
  await page.goto(`${portal}/login`);
  await page.getByRole("link", { name: "Chưa có tài khoản", exact: true }).click();
  await expect(page).toHaveURL(`${portal}/register`);
  await page.getByRole("link", { name: "Cần khôi phục truy cập", exact: true }).click();
  await expect(page).toHaveURL(`${portal}/recovery`);
  await expect(page.getByRole("list", { name: "Recovery stages" })).toBeVisible();
});
