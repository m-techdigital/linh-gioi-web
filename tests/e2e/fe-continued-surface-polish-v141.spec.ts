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


test("portal real-data-ready visual prototype prioritizes task/account/character hierarchy without opening writes", async ({ page }) => {
  const writes: string[] = [];
  page.on("request", (request) => {
    if (!["GET", "HEAD"].includes(request.method())) writes.push(`${request.method()} ${request.url()}`);
  });

  await page.goto(`${portal}/login`);
  const authTask = page.locator(".lgo-portal-auth-task");
  const accessJourney = page.locator(".lgo-access-journey");
  await expect(authTask).toBeVisible();
  await expect(accessJourney).toBeVisible();
  const loginOrder = await page.evaluate(() => {
    const task = document.querySelector(".lgo-portal-auth-task")?.getBoundingClientRect();
    const journey = document.querySelector(".lgo-access-journey")?.getBoundingClientRect();
    return {
      taskTop: task?.top ?? Number.POSITIVE_INFINITY,
      journeyTop: journey?.top ?? Number.NEGATIVE_INFINITY,
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth
    };
  });
  expect(loginOrder.taskTop, "login task must precede world-context journey").toBeLessThan(loginOrder.journeyTop);
  expect(loginOrder.overflow, "login horizontal overflow").toBeLessThanOrEqual(0);
  await expect(page.locator("main form")).toHaveCount(0);

  await page.goto(`${portal}/`);
  await expect(page.locator(".lgo-portal-overview-grid")).toBeVisible();
  const homeOrder = await page.evaluate(() => {
    const core = document.querySelector(".lgo-portal-overview-grid")?.getBoundingClientRect();
    const art = document.querySelector('[aria-label="Portal home visual panels"]')?.getBoundingClientRect();
    return {
      coreTop: core?.top ?? Number.POSITIVE_INFINITY,
      artTop: art?.top ?? Number.NEGATIVE_INFINITY,
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth
    };
  });
  expect(homeOrder.coreTop, "account/character journey must precede decorative art").toBeLessThan(homeOrder.artTop);
  expect(homeOrder.overflow, "home horizontal overflow").toBeLessThanOrEqual(0);

  await page.goto(`${portal}/account`);
  await expect(page.getByRole("heading", { name: "Thông tin nhận diện" })).toBeVisible();
  await expect(page.getByText("Chưa kết nối email production", { exact: true })).toHaveCount(0);
  await expect(page.getByText("Fixture only", { exact: true })).toHaveCount(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(0);

  await page.goto(`${portal}/characters`);
  const roster = page.getByRole("list", { name: "Character slot roster" });
  await expect(roster.getByRole("listitem")).toHaveCount(3);
  await expect(page.getByText("Chưa có nhân vật", { exact: true })).toBeVisible();
  for (const unsupported of ["Lv. 18 · illustrative", "Lv. 12 · illustrative", "Ready fixture", "Resting fixture", "Hôm nay · illustrative", "Hôm qua · illustrative"]) {
    await expect(page.getByText(unsupported, { exact: true })).toHaveCount(0);
  }
  await expect(page.getByText("NOT_CANONICAL_BACKEND_CONTRACT", { exact: true })).toBeVisible();
  const characterMetrics = await page.evaluate(() => {
    const rail = document.querySelector<HTMLElement>(".lgo-portal-character-grid");
    return {
      viewport: innerWidth,
      pageOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      railClientWidth: rail?.clientWidth ?? 0,
      railScrollWidth: rail?.scrollWidth ?? 0
    };
  });
  expect(characterMetrics.pageOverflow).toBeLessThanOrEqual(0);
  if (characterMetrics.viewport <= 760) {
    expect(characterMetrics.railScrollWidth, "mobile character slots should use an internal rail instead of a taller page stack")
      .toBeGreaterThan(characterMetrics.railClientWidth);
  } else {
    expect(characterMetrics.railScrollWidth, "desktop/tablet roster should fit its three-column composition")
      .toBeLessThanOrEqual(characterMetrics.railClientWidth + 1);
  }

  expect(writes, "visual prototype must remain GET/HEAD-only").toEqual([]);
});
