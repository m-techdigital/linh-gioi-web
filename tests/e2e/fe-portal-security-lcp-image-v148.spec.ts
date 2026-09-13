// v1.48 coverage: Portal security above-the-fold LCP image eager loading, typography and overflow.
import { test, expect } from "@playwright/test";

const portal = process.env.LGO_PORTAL_URL ?? "http://127.0.0.1:3001";

type ImageMetrics = {
  alt: string | null;
  complete: boolean;
  naturalWidth: number;
  loading: string | null;
  fetchPriority: string | null;
  top: number;
  width: number;
  height: number;
  overflow: number;
  h1: number;
  bodyCopy: number[];
};

async function collectMetrics(page: import("@playwright/test").Page): Promise<ImageMetrics> {
  return page.evaluate(() => {
    const image = document.querySelector<HTMLImageElement>('img[alt="Security route Đông Môn context"]');
    if (!image) throw new Error("missing Portal security world image");
    const rect = image.getBoundingClientRect();
    const h1 = document.querySelector("h1");
    return {
      alt: image.getAttribute("alt"),
      complete: image.complete,
      naturalWidth: image.naturalWidth,
      loading: image.getAttribute("loading"),
      fetchPriority: image.getAttribute("fetchpriority"),
      top: rect.top,
      width: rect.width,
      height: rect.height,
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      h1: h1 ? Number.parseFloat(getComputedStyle(h1).fontSize) : 0,
      bodyCopy: Array.from(document.querySelectorAll("main p")).map((node) => Number.parseFloat(getComputedStyle(node).fontSize)),
    };
  });
}

test.describe("Portal security LCP image loading", () => {
  test("security world visual uses eager loading without layout overflow", async ({ page, isMobile }) => {
    await page.goto(`${portal}/account/security`);

    await expect(page.getByRole("heading", { name: "Bảo mật tài khoản", exact: true })).toBeVisible();
    const image = page.getByRole("img", { name: "Security route Đông Môn context" });
    await expect(image).toBeVisible();
    await expect(image, "reviewed world visual should be eager for the browser-reported LCP candidate").toHaveAttribute("loading", "eager");

    const metrics = await collectMetrics(page);
    expect(metrics.complete, "image decode/load state").toBe(true);
    expect(metrics.naturalWidth, "image natural width").toBeGreaterThan(0);
    expect(metrics.top, "image should remain in the initial route composition without layout drift").toBeLessThan(isMobile ? 1300 : 900);
    expect(metrics.width, "image rendered width").toBeGreaterThan(120);
    expect(metrics.height, "image rendered height").toBeGreaterThan(80);
    expect(metrics.overflow, "horizontal overflow").toBeLessThanOrEqual(0);
    expect(metrics.h1, "h1 font-size cap").toBeLessThanOrEqual(isMobile ? 34 : 46);
    for (const size of metrics.bodyCopy) expect(size, "body copy font-size cap").toBeLessThanOrEqual(18);
  });
});
