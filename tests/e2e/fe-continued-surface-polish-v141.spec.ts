// v1.41 coverage: portal home and ops home font-size/layout/image/overflow, no mutation controls.
import { test, expect } from "@playwright/test";

const portal = process.env.LGO_PORTAL_URL ?? "http://127.0.0.1:3001";
const ops = process.env.LGO_OPS_URL ?? "http://127.0.0.1:3002";

type Metrics = {
  width: number;
  overflow: boolean;
  h1: number[];
  h2: number[];
  h3: number[];
  p: number[];
  images: Array<{ alt: string; complete: boolean; width: number; height: number; boxWidth: number; boxHeight: number; src: string }>;
};

async function collectMetrics(page: import("@playwright/test").Page): Promise<Metrics> {
  return page.evaluate(() => {
    const sizes = (selector: string) => Array.from(document.querySelectorAll(selector)).map((node) => Number.parseFloat(getComputedStyle(node).fontSize));
    return {
      width: innerWidth,
      overflow: document.documentElement.scrollWidth > innerWidth,
      h1: sizes("main h1"),
      h2: sizes("main h2"),
      h3: sizes("main h3"),
      p: sizes("main p"),
      images: Array.from(document.querySelectorAll("main img")).map((img) => {
        const image = img as HTMLImageElement;
        const box = image.getBoundingClientRect();
        return { alt: image.alt, complete: image.complete, width: image.naturalWidth, height: image.naturalHeight, boxWidth: box.width, boxHeight: box.height, src: image.currentSrc || image.src };
      })
    };
  });
}

function expectWorkspaceReadable(metrics: Metrics) {
  const mobile = metrics.width < 720;
  for (const value of metrics.h1) expect(value).toBeLessThanOrEqual(mobile ? 34 : 46);
  for (const value of metrics.h2) expect(value).toBeLessThanOrEqual(mobile ? 28 : 32);
  for (const value of metrics.h3) expect(value).toBeLessThanOrEqual(mobile ? 22 : 24);
  for (const value of metrics.p) expect(value).toBeLessThanOrEqual(18);
  expect(metrics.overflow).toBe(false);
}

async function expectNoWritesOrMutationControls(page: import("@playwright/test").Page, writes: string[]) {
  await expect(page.locator("main form")).toHaveCount(0);
  await expect(page.locator("main button")).toHaveCount(0);
  expect(writes).toEqual([]);
}

test("portal home renders visual journey cards with readable layout", async ({ page }) => {
  const writes: string[] = [];
  page.on("request", (request) => {
    if (!["GET", "HEAD"].includes(request.method())) writes.push(`${request.method()} ${request.url()}`);
  });

  await page.goto(`${portal}/`);

  await expect(page.getByRole("heading", { name: "Tổng quan người chơi", exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Tổng quan hình ảnh hành trình", exact: true })).toBeVisible();
  await expect(page.getByText("NO_ACCEPTED_BACKEND_CONTRACT", { exact: true })).toHaveCount(2);
  await expect(page.getByRole("img", { name: "Portal home Đông Môn world concept" })).toBeVisible();
  await expect(page.getByRole("img", { name: "Portal home development art Võ" })).toBeVisible();
  const metrics = await collectMetrics(page);
  expectWorkspaceReadable(metrics);
  expect(metrics.images).toHaveLength(2);
  for (const image of metrics.images) {
    expect(image.complete).toBe(true);
    expect(image.width).toBeGreaterThan(220);
    expect(image.height).toBeGreaterThan(180);
    expect(image.boxWidth).toBeGreaterThan(170);
    expect(decodeURIComponent(image.src)).toContain("/game-art/");
  }
  await expectNoWritesOrMutationControls(page, writes);
});

test("ops home renders operational visual map without mutation controls", async ({ page }) => {
  const writes: string[] = [];
  page.on("request", (request) => {
    if (!["GET", "HEAD"].includes(request.method())) writes.push(`${request.method()} ${request.url()}`);
  });

  await page.goto(`${ops}/`);

  await expect(page.getByRole("heading", { name: "Ops/Admin Shell", exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Bản đồ vận hành trực quan", exact: true })).toBeVisible();
  await expect(page.getByText("NO_ACCEPTED_BACKEND_CONTRACT", { exact: true })).toHaveCount(2);
  await expect(page.getByRole("img", { name: "Ops home world concept" })).toBeVisible();
  await expect(page.getByRole("img", { name: "Ops home skill development art" })).toBeVisible();
  const metrics = await collectMetrics(page);
  expectWorkspaceReadable(metrics);
  expect(metrics.images).toHaveLength(2);
  for (const image of metrics.images) {
    expect(image.complete).toBe(true);
    expect(image.width).toBeGreaterThan(220);
    expect(image.height).toBeGreaterThan(180);
    expect(image.boxWidth).toBeGreaterThan(170);
    expect(decodeURIComponent(image.src)).toContain("/game-art/");
  }
  await expectNoWritesOrMutationControls(page, writes);
});
