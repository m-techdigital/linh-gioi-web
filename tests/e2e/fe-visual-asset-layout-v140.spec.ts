// v1.40 coverage: font-size/layout/image/overflow assertions for public, portal and ops/control-center.
import { test, expect } from "@playwright/test";

const publicWeb = process.env.LGO_WEB_URL ?? "http://127.0.0.1:3000";
const portal = process.env.LGO_PORTAL_URL ?? "http://127.0.0.1:3001";
const ops = process.env.LGO_OPS_URL ?? "http://127.0.0.1:3002";

type FontMetrics = {
  width: number;
  overflow: boolean;
  h1: number[];
  h2: number[];
  h3: number[];
  p: number[];
  img: Array<{ src: string; alt: string; complete: boolean; width: number; height: number; boxWidth: number; boxHeight: number }>;
};

async function collectMetrics(page: import("@playwright/test").Page): Promise<FontMetrics> {
  return page.evaluate(() => {
    const sizes = (selector: string) => Array.from(document.querySelectorAll(selector)).map((node) => Number.parseFloat(getComputedStyle(node).fontSize));
    return {
      width: innerWidth,
      overflow: document.documentElement.scrollWidth > innerWidth,
      h1: sizes("main h1"),
      h2: sizes("main h2"),
      h3: sizes("main h3"),
      p: sizes("main p"),
      img: Array.from(document.querySelectorAll("main img")).map((img) => {
        const image = img as HTMLImageElement;
        const box = image.getBoundingClientRect();
        return { src: image.currentSrc || image.src, alt: image.alt, complete: image.complete, width: image.naturalWidth, height: image.naturalHeight, boxWidth: box.width, boxHeight: box.height };
      })
    };
  });
}

function expectReadableTypography(metrics: FontMetrics, surface: "public" | "workspace") {
  const mobile = metrics.width < 720;
  const h1Cap = surface === "public" ? (mobile ? 42 : 64) : (mobile ? 34 : 46);
  const h2Cap = surface === "public" ? (mobile ? 32 : 42) : (mobile ? 28 : 32);
  for (const value of metrics.h1) expect(value).toBeLessThanOrEqual(h1Cap);
  for (const value of metrics.h2) expect(value).toBeLessThanOrEqual(h2Cap);
  for (const value of metrics.h3) expect(value).toBeLessThanOrEqual(mobile ? 24 : 28);
  for (const value of metrics.p) expect(value).toBeLessThanOrEqual(18);
  expect(metrics.overflow).toBe(false);
}

test("public/portal/ops typography stays readable with no horizontal overflow", async ({ page }) => {
  for (const item of [
    { url: `${publicWeb}/`, surface: "public" as const, heading: "Sống một đời khác trong Linh Giới" },
    { url: `${publicWeb}/game`, surface: "public" as const, heading: "Một thế giới có nơi để trở về" },
    { url: `${portal}/journey`, surface: "workspace" as const, heading: "Hành trình người chơi" },
    { url: `${ops}/control-center`, surface: "workspace" as const, heading: "Control Center" }
  ]) {
    await page.goto(item.url);
    await expect(page.getByRole("heading", { name: item.heading, exact: true })).toBeVisible();
    expectReadableTypography(await collectMetrics(page), item.surface);
  }
});

test("ops/control-center renders game-art visual proof without enabling operations", async ({ page }) => {
  const writes: string[] = [];
  page.on("request", (request) => {
    if (!["GET", "HEAD"].includes(request.method())) writes.push(`${request.method()} ${request.url()}`);
  });

  await page.goto(`${ops}/control-center`);

  await expect(page.getByRole("heading", { name: "Visual proof cho ca trực", exact: true })).toBeVisible();
  await expect(page.getByText("NO_ACCEPTED_BACKEND_CONTRACT", { exact: true })).toHaveCount(3);
  await expect(page.getByRole("img", { name: "Ops visual proof Đông Môn world concept" })).toBeVisible();
  await expect(page.getByRole("img", { name: "Ops visual proof development art Võ" })).toBeVisible();
  await expect(page.getByRole("img", { name: "Ops visual proof kỹ năng Võ" })).toBeVisible();

  const metrics = await collectMetrics(page);
  expect(metrics.img).toHaveLength(3);
  for (const image of metrics.img) {
    expect(image.complete).toBe(true);
    expect(image.width).toBeGreaterThan(220);
    expect(image.height).toBeGreaterThan(180);
    expect(image.boxWidth).toBeGreaterThan(170);
    expect(image.boxHeight).toBeGreaterThan(120);
    expect(decodeURIComponent(image.src)).toContain("/game-art/");
  }
  await expect(page.locator("main button")).toHaveCount(0);
  await expect(page.locator("form")).toHaveCount(0);
  expect(writes).toEqual([]);
});

test("portal journey keeps shared visual proof cards loaded", async ({ page }) => {
  await page.goto(`${portal}/journey`);
  await expect(page.locator(".lgo-visual-proof-grid")).toHaveCount(1);
  await expect(page.locator(".lgo-visual-proof-card")).toHaveCount(3);
  const metrics = await collectMetrics(page);
  expect(metrics.img).toHaveLength(3);
  for (const image of metrics.img) {
    expect(image.complete).toBe(true);
    expect(image.boxWidth).toBeGreaterThan(170);
  }
});
