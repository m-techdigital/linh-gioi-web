// v1.51 coverage: Portal home WORLD_CONCEPT image eager loading, typography and overflow.
import { test, expect } from "@playwright/test";

const portal = process.env.LGO_PORTAL_URL ?? "http://127.0.0.1:3001";

type Metrics = {
  complete: boolean;
  naturalWidth: number;
  loading: string | null;
  top: number;
  width: number;
  height: number;
  overflow: number;
  h1: number;
  bodyCopy: number[];
};

async function collectMetrics(page: import("@playwright/test").Page): Promise<Metrics> {
  return page.evaluate(() => {
    const image = document.querySelector<HTMLImageElement>('img[alt="Portal home Đông Môn world concept"]');
    if (!image) throw new Error("missing Portal home world image");
    const rect = image.getBoundingClientRect();
    const h1 = document.querySelector("h1");
    return {
      complete: image.complete,
      naturalWidth: image.naturalWidth,
      loading: image.getAttribute("loading"),
      top: rect.top,
      width: rect.width,
      height: rect.height,
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      h1: h1 ? Number.parseFloat(getComputedStyle(h1).fontSize) : 0,
      bodyCopy: Array.from(document.querySelectorAll("main p")).map((node) => Number.parseFloat(getComputedStyle(node).fontSize)),
    };
  });
}

test.describe("Portal home LCP image loading", () => {
  test("home world visual uses eager loading without layout overflow", async ({ page, isMobile }) => {
    await page.goto(`${portal}/`);
    await expect(page.getByRole("heading", { name: "Tổng quan người chơi", exact: true })).toBeVisible();
    const image = page.getByRole("img", { name: "Portal home Đông Môn world concept" });
    await expect(image).toBeVisible();
    await expect(image, "Portal home WORLD_CONCEPT visual should be eager for reviewed route").toHaveAttribute("loading", "eager");

    const metrics = await collectMetrics(page);
    expect(metrics.complete, "image decode/load state").toBe(true);
    expect(metrics.naturalWidth, "image natural width").toBeGreaterThan(0);
    expect(metrics.top, "image should remain in route composition without large layout drift").toBeLessThan(isMobile ? 1300 : 900);
    expect(metrics.width, "image rendered width").toBeGreaterThan(120);
    expect(metrics.height, "image rendered height").toBeGreaterThan(80);
    expect(metrics.overflow, "horizontal overflow").toBeLessThanOrEqual(0);
    expect(metrics.h1, "h1 font-size cap").toBeLessThanOrEqual(isMobile ? 34 : 46);
    for (const size of metrics.bodyCopy) expect(size, "body copy font-size cap").toBeLessThanOrEqual(18);
  });
});
