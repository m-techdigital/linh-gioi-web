import { test, expect, type Page } from "@playwright/test";
const ops = process.env.LGO_OPS_URL ?? "http://127.0.0.1:3002";

async function clickUiLink(page: Page, name: string, path: string) {
  const loaded = page.waitForURL(url => url.pathname === path, { waitUntil: "domcontentloaded", timeout: 15_000 });
  await page.getByRole("link", { name, exact: true }).click({ noWaitAfter: true });
  await loaded;
}

test("operator can navigate review context without executing actions", async ({ page }) => {
  const writes: string[] = [];
  page.on("request", r => { if (!["GET", "HEAD"].includes(r.method())) writes.push(r.url()); });
  await page.goto(ops, { waitUntil: "domcontentloaded" });
  await clickUiLink(page, "Mở Control Center", "/control-center");
  await expect(page.getByRole("list", { name: "Hàng đợi rà soát" })).toBeVisible();
  await expect(page.getByText("Sources not connected")).toBeVisible();
  await expect(page.getByText("Freshness unavailable")).toBeVisible();
  await clickUiLink(page, "Mở an toàn cộng đồng", "/trust-safety");
  await expect(page.getByRole("list", { name: "Các bước rà soát dự kiến" }).getByRole("listitem")).toHaveCount(3);
  await expect(page.getByRole("list", { name: "Diễn tiến báo cáo mẫu" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Áp dụng biện pháp — chưa khả dụng" })).toHaveAttribute("aria-disabled", "true");
  await expect(page.getByRole("button", { name: "Chuyển phê duyệt — chưa khả dụng" })).toHaveAttribute("aria-disabled", "true");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await clickUiLink(page, "Xem điều kiện phê duyệt", "/security-governance");
  await expect(page.getByRole("list", { name: "Điều kiện phê duyệt dự kiến" })).toBeVisible();
  await expect(page.getByText("Governance controls are read-only fixtures")).toBeVisible();
  await expect(page.getByRole("list", { name: "Governance continuity next routes" })).toBeVisible();
  expect(writes).toEqual([]);
});

test("real-data-ready Ops prototype keeps search/read-model/source boundaries without writes", async ({ page }) => {
  const writes: string[] = [];
  page.on("request", r => { if (!["GET", "HEAD"].includes(r.method())) writes.push(`${r.method()} ${r.url()}`); });

  await page.setViewportSize({ width: 1180, height: 900 });
  await page.goto(`${ops}/player-operations`, { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("heading", { name: "Player Operations", exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Tìm người chơi trước, mở Player 360 sau" })).toBeVisible();
  await expect(page.getByLabel("Public Account ID")).toBeDisabled();
  await expect(page.getByLabel("Character ID / tên")).toBeDisabled();
  await expect(page.getByRole("button", { name: "Search unavailable" })).toHaveAttribute("aria-disabled", "true");
  const playerLoaded = page.waitForURL(url => url.pathname === "/player-operations/fixture-001", { waitUntil: "domcontentloaded", timeout: 15_000 });
  await page.getByRole("link", { name: "Mở Player 360" }).first().click({ noWaitAfter: true });
  await playerLoaded;

  await expect(page.getByRole("heading", { name: "Player 360 · Fixture Player 001", exact: true })).toBeVisible();
  await expect(page.getByRole("list", { name: "Player 360 domain sections" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Revoke session — blocked" })).toHaveAttribute("aria-disabled", "true");
  await expect(page.getByRole("button", { name: "Unstuck — blocked" })).toHaveAttribute("aria-disabled", "true");
  await expect(page.getByText("No canonical trust score")).toHaveCount(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);

  await page.goto(`${ops}/game-operations`, { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("heading", { name: "Nguồn vận hành trước, scenario fixture sau" })).toBeVisible();
  await expect(page.getByRole("list", { name: "Game Operations source readiness" })).toBeVisible();
  await expect(page.getByText(/Freshness: unavailable/).first()).toBeVisible();
  await expect(page.getByText("24 / 100 · illustrative")).toHaveCount(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  expect(writes).toEqual([]);
});
