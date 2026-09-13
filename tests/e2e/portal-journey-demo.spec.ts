import { test, expect } from "@playwright/test";

const portal = process.env.LGO_PORTAL_URL ?? "http://127.0.0.1:3001";

async function expectTypographyWithinBounds(page: import("@playwright/test").Page) {
  const measurements = await page.evaluate(() => {
    const size = (selector: string) =>
      Array.from(document.querySelectorAll(selector)).map((node) => Number.parseFloat(getComputedStyle(node).fontSize));
    const letterSpacing = Array.from(document.querySelectorAll("main *")).map((node) => getComputedStyle(node).letterSpacing);
    return {
      viewport: innerWidth,
      h1: size("main h1"),
      h2: size("main h2"),
      h3: size("main h3"),
      p: size("main p"),
      buttons: size("main .lgo-link-button, main .lgo-button"),
      letterSpacing
    };
  });

  const mobile = measurements.viewport < 720;
  for (const value of measurements.h1) expect(value).toBeLessThanOrEqual(mobile ? 34 : 46);
  for (const value of measurements.h2) expect(value).toBeLessThanOrEqual(mobile ? 28 : 32);
  for (const value of measurements.h3) expect(value).toBeLessThanOrEqual(mobile ? 22 : 24);
  for (const value of measurements.p) expect(value).toBeLessThanOrEqual(18);
  for (const value of measurements.buttons) expect(value).toBeLessThanOrEqual(17);
  expect(measurements.letterSpacing.some((value) => value.startsWith("-"))).toBe(false);
}

test("portal journey demo keeps fixture UX readable and non-operational", async ({ page }) => {
  const writes: string[] = [];
  page.on("request", (request) => {
    if (!["GET", "HEAD"].includes(request.method())) writes.push(`${request.method()} ${request.url()}`);
  });

  await page.goto(`${portal}/journey`);

  await expect(page.getByRole("heading", { name: "Hành trình người chơi", exact: true })).toBeVisible();
  await expect(page.getByText("NO_ACCEPTED_BACKEND_CONTRACT", { exact: true })).toBeVisible();
  await expect(page.getByRole("img", { name: "Khung concept Đông Môn trong Linh Giới" })).toBeVisible();
  await expect(page.getByRole("img", { name: "Bảng development art Võ cấp đầu" })).toBeVisible();
  await expect(page.getByRole("img", { name: "Bảng development art kỹ năng Võ" })).toBeVisible();
  const imagesLoaded = await page.evaluate(() =>
    Array.from(document.querySelectorAll("main img")).map((img) => ({
      complete: (img as HTMLImageElement).complete,
      width: (img as HTMLImageElement).naturalWidth,
      height: (img as HTMLImageElement).naturalHeight,
      box: img.getBoundingClientRect().width
    }))
  );
  expect(imagesLoaded).toHaveLength(3);
  for (const image of imagesLoaded) {
    expect(image.complete).toBe(true);
    expect(image.width).toBeGreaterThan(220);
    expect(image.height).toBeGreaterThan(180);
    expect(image.box).toBeGreaterThan(180);
  }
  await expect(page.getByRole("list", { name: "Các bước hành trình demo" }).getByRole("listitem")).toHaveCount(4);
  await expect(page.getByRole("list", { name: "Hoạt động demo gần đây" }).getByRole("listitem")).toHaveCount(4);
  await expect(page.getByRole("list", { name: "Việc có thể thử tiếp" }).getByRole("listitem")).toHaveCount(3);
  await expect(page.locator("form")).toHaveCount(0);
  await expect(page.locator("main button")).toHaveCount(0);
  const nextActions = page.getByRole("list", { name: "Việc có thể thử tiếp" });
  await expect(nextActions.getByRole("link", { name: "Tài khoản mẫu", exact: true })).toHaveAttribute("href", "/account");
  await expect(nextActions.getByRole("link", { name: "Nhân vật mẫu", exact: true })).toHaveAttribute("href", "/characters");
  await expect(nextActions.getByRole("link", { name: "Hỗ trợ mẫu", exact: true })).toHaveAttribute("href", "/support");
  await expectTypographyWithinBounds(page);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  expect(writes).toEqual([]);
});

test("portal workspace typography stays compact across existing demo surfaces", async ({ page }) => {
  for (const route of ["/", "/account", "/characters", "/access", "/login"]) {
    await page.goto(`${portal}${route}`);
    await expect(page.locator("main h1").first()).toBeVisible();
    await expectTypographyWithinBounds(page);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
});
