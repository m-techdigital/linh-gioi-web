// v1.53 coverage: public cinematic world concept explicit image loading, typography and overflow.
import { test, expect } from "@playwright/test";

type Metrics = {
  loading: string | null;
  complete: boolean;
  naturalWidth: number;
  naturalHeight: number;
  top: number;
  width: number;
  height: number;
  overflow: number;
  h1: number;
  bodyCopy: number[];
};

async function collectSceneMetrics(page: import("@playwright/test").Page): Promise<Metrics> {
  return page.evaluate(() => {
    const image = document.querySelector<HTMLImageElement>(".lgo-world-concept-art img");
    if (!image) throw new Error("missing public cinematic world image");
    const rect = image.getBoundingClientRect();
    const h1 = document.querySelector("h1");
    return {
      loading: image.getAttribute("loading"),
      complete: image.complete,
      naturalWidth: image.naturalWidth,
      naturalHeight: image.naturalHeight,
      top: rect.top,
      width: rect.width,
      height: rect.height,
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      h1: h1 ? Number.parseFloat(getComputedStyle(h1).fontSize) : 0,
      bodyCopy: Array.from(document.querySelectorAll("main p")).map((node) => Number.parseFloat(getComputedStyle(node).fontSize)),
    };
  });
}

async function expectPublicTypography(page: import("@playwright/test").Page, isMobile: boolean) {
  const metrics = await collectSceneMetrics(page);
  expect(metrics.complete, "image decode/load state").toBe(true);
  expect(metrics.naturalWidth, "image natural width").toBeGreaterThan(0);
  expect(metrics.naturalHeight, "image natural height").toBeGreaterThan(0);
  expect(metrics.width, "image rendered width").toBeGreaterThan(120);
  expect(metrics.height, "image rendered height").toBeGreaterThan(80);
  expect(metrics.overflow, "horizontal overflow").toBeLessThanOrEqual(0);
  expect(metrics.h1, "h1 font-size cap").toBeLessThanOrEqual(isMobile ? 48 : 76);
  for (const size of metrics.bodyCopy) expect(size, "body copy font-size cap").toBeLessThanOrEqual(20);
  return metrics;
}

test.describe("public cinematic world image loading", () => {
  test("homepage full cinematic image is explicit eager without layout overflow", async ({ page, isMobile }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: "Sống một đời khác trong Linh Giới", exact: true })).toBeVisible();
    const metrics = await expectPublicTypography(page, isMobile);
    expect(metrics.loading, "homepage full cinematic world image should expose eager loading").toBe("eager");
    expect(metrics.top, "homepage image should stay near hero composition").toBeLessThan(isMobile ? 980 : 260);
  });

  test("game compact cinematic image is explicit eager without layout overflow", async ({ page, isMobile }) => {
    await page.goto("/game");
    await expect(page.getByRole("heading", { name: "Một thế giới có nơi để trở về", exact: true })).toBeVisible();
    const metrics = await expectPublicTypography(page, isMobile);
    expect(metrics.loading, "compact cinematic world image should expose eager loading when browser reports it as LCP").toBe("eager");
    expect(metrics.top, "compact image should stay near route hero composition").toBeLessThan(isMobile ? 980 : 300);
  });
});
