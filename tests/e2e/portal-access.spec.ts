import { test, expect } from "@playwright/test";

const portal = process.env.LGO_PORTAL_URL ?? "http://127.0.0.1:3101";

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
    for (const input of await page.locator("main input").all()) await expect(input).toBeDisabled();
    for (const button of await page.locator("main button").all()) await expect(button).toBeDisabled();
    await expect(page.locator("form")).toHaveCount(0);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.getByRole("link", { name: "Trạng thái truy cập", exact: true }).click();
    await expect(page.getByRole("heading", { name: "Trạng thái truy cập", exact: true })).toBeVisible();
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
