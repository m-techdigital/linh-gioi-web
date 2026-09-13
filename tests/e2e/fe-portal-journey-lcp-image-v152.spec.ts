// v1.52 coverage: Portal journey WORLD_CONCEPT image eager loading, typography and overflow.
import { test, expect } from "@playwright/test";

const portal = process.env.LGO_PORTAL_URL ?? "http://127.0.0.1:3001";

type Metrics = {
  complete: boolean;
  naturalWidth: number;
  naturalHeight: number;
  loading: string | null;
  top: number;
  width: number;
  height: number;
  overflow: number;
  h1: number;
  bodyCopy: number[];
  imageCount: number;
};

async function collectMetrics(page: import("@playwright/test").Page): Promise<Metrics> {
  return page.evaluate(() => {
    const image = document.querySelector<HTMLImageElement>('img[alt="Khung concept Đông Môn trong Linh Giới"]');
    if (!image) throw new Error("missing Portal journey world image");
    const rect = image.getBoundingClientRect();
    const h1 = document.querySelector("h1");
    return {
      complete: image.complete,
      naturalWidth: image.naturalWidth,
      naturalHeight: image.naturalHeight,
      loading: image.getAttribute("loading"),
      top: rect.top,
      width: rect.width,
      height: rect.height,
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      h1: h1 ? Number.parseFloat(getComputedStyle(h1).fontSize) : 0,
      bodyCopy: Array.from(document.querySelectorAll("main p")).map((node) => Number.parseFloat(getComputedStyle(node).fontSize)),
      imageCount: document.querySelectorAll("main img").length,
    };
  });
}

test.describe("Portal journey art image loading", () => {
  test("journey above-fold art uses explicit eager loading without layout overflow", async ({ page, isMobile }) => {
    await page.goto(`${portal}/journey`);
    await expect(page.getByRole("heading", { name: "Hành trình người chơi", exact: true })).toBeVisible();
    const journeyImages = [
      page.getByRole("img", { name: "Khung concept Đông Môn trong Linh Giới" }),
      page.getByRole("img", { name: "Bảng development art Võ cấp đầu" }),
      page.getByRole("img", { name: "Bảng development art kỹ năng Võ" }),
    ];
    for (const image of journeyImages) {
      await expect(image).toBeVisible();
      await expect(image, "Portal journey above-fold art should expose eager loading for reviewed route").toHaveAttribute("loading", "eager");
    }

    const metrics = await collectMetrics(page);
    expect(metrics.imageCount, "journey art panel count").toBe(3);
    expect(metrics.complete, "image decode/load state").toBe(true);
    expect(metrics.naturalWidth, "image natural width").toBeGreaterThan(0);
    expect(metrics.naturalHeight, "image natural height").toBeGreaterThan(0);
    expect(metrics.top, "image should remain in route composition without large layout drift").toBeLessThan(isMobile ? 1250 : 760);
    expect(metrics.width, "image rendered width").toBeGreaterThan(120);
    expect(metrics.height, "image rendered height").toBeGreaterThan(80);
    expect(metrics.overflow, "horizontal overflow").toBeLessThanOrEqual(0);
    expect(metrics.h1, "h1 font-size cap").toBeLessThanOrEqual(isMobile ? 34 : 46);
    for (const size of metrics.bodyCopy) expect(size, "body copy font-size cap").toBeLessThanOrEqual(18);
  });
});
