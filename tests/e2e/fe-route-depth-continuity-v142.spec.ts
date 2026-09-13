// v1.42 coverage: navigation continuity plus font-size/layout/image/overflow on account/security and security-governance.
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
  images: Array<{ alt: string; complete: boolean; width: number; height: number; boxWidth: number; src: string }>;
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
        return { alt: image.alt, complete: image.complete, width: image.naturalWidth, height: image.naturalHeight, boxWidth: box.width, src: image.currentSrc || image.src };
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

async function expectReadOnlyRoute(page: import("@playwright/test").Page, writes: string[]) {
  await expect(page.locator("main form")).toHaveCount(0);
  await expect(page.locator("main button")).toHaveCount(0);
  expect(writes).toEqual([]);
}

test("portal account/security has visual route continuity and safe navigation", async ({ page }) => {
  const writes: string[] = [];
  page.on("request", (request) => {
    if (!["GET", "HEAD"].includes(request.method())) writes.push(`${request.method()} ${request.url()}`);
  });

  await page.goto(`${portal}/account/security`);

  await expect(page.getByRole("heading", { name: "Bảo mật tài khoản", exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Security route continuity", exact: true })).toBeVisible();
  await expect(page.getByText("NO_ACCEPTED_BACKEND_CONTRACT", { exact: true })).toHaveCount(2);
  await expect(page.getByRole("img", { name: "Security route Đông Môn context" })).toBeVisible();
  await expect(page.getByRole("img", { name: "Security route skill preview" })).toBeVisible();
  const portalContinuity = page.getByRole("list", { name: "Security continuity next routes" });
  await expect(portalContinuity.getByRole("link", { name: "Phiên đăng nhập", exact: true })).toHaveAttribute("href", "/account/sessions");
  await expect(portalContinuity.getByRole("link", { name: "Hành trình", exact: true })).toHaveAttribute("href", "/journey");
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
  await expectReadOnlyRoute(page, writes);
});

test("ops security-governance has visual route continuity and safe navigation", async ({ page }) => {
  const writes: string[] = [];
  page.on("request", (request) => {
    if (!["GET", "HEAD"].includes(request.method())) writes.push(`${request.method()} ${request.url()}`);
  });

  await page.goto(`${ops}/security-governance`);

  await expect(page.getByRole("heading", { name: "Security & Governance", exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Governance route continuity", exact: true })).toBeVisible();
  await expect(page.getByText("NO_ACCEPTED_BACKEND_CONTRACT", { exact: true })).toHaveCount(2);
  await expect(page.getByRole("img", { name: "Governance world context" })).toBeVisible();
  await expect(page.getByRole("img", { name: "Governance skill preview" })).toBeVisible();
  const opsContinuity = page.getByRole("list", { name: "Governance continuity next routes" });
  await expect(opsContinuity.getByRole("link", { name: "Control Center", exact: true })).toHaveAttribute("href", "/control-center");
  await expect(opsContinuity.getByRole("link", { name: "Audit", exact: true })).toHaveAttribute("href", "/audit");
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
  await expectReadOnlyRoute(page, writes);
});
