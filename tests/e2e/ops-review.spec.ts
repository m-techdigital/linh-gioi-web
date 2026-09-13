import { test, expect } from "@playwright/test";
const ops = process.env.LGO_OPS_URL ?? "http://127.0.0.1:3002";

test("operator can navigate review context without executing actions", async ({ page }) => {
  const writes: string[] = [];
  page.on("request", r => { if (!["GET", "HEAD"].includes(r.method())) writes.push(r.url()); });
  await page.goto(ops);
  await page.getByRole("link", { name: "Mở Control Center", exact: true }).click();
  await expect(page.getByRole("list", { name: "Hàng đợi rà soát" })).toBeVisible();
  await page.getByRole("link", { name: "Mở an toàn cộng đồng", exact: true }).click();
  await expect(page.getByRole("list", { name: "Các bước rà soát dự kiến" }).getByRole("listitem")).toHaveCount(3);
  await expect(page.getByRole("list", { name: "Diễn tiến báo cáo mẫu" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Áp dụng biện pháp — chưa khả dụng" })).toBeDisabled();
  await expect(page.getByRole("button", { name: "Chuyển phê duyệt — chưa khả dụng" })).toBeDisabled();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.getByRole("link", { name: "Xem điều kiện phê duyệt", exact: true }).click();
  await expect(page.getByRole("list", { name: "Điều kiện phê duyệt dự kiến" })).toBeVisible();
  await expect(page.getByRole("combobox")).toBeDisabled();
  await expect(page.getByRole("checkbox")).toBeDisabled();
  expect(writes).toEqual([]);
});
