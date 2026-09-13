// v1.54 coverage: public class art spotlight explicit eager loading, typography and overflow.
import { test, expect } from "@playwright/test";

type ArtMetric = {
  alt: string | null;
  loading: string | null;
  complete: boolean;
  naturalWidth: number;
  naturalHeight: number;
  top: number;
  width: number;
  height: number;
};

type Metrics = {
  images: ArtMetric[];
  overflow: number;
  h1: number;
  h2: number[];
  bodyCopy: number[];
};

async function collectMetrics(page: import("@playwright/test").Page): Promise<Metrics> {
  return page.evaluate(() => {
    const images = Array.from(document.querySelectorAll<HTMLImageElement>(".lgo-class-art-spotlight img")).map((image) => {
      const rect = image.getBoundingClientRect();
      return {
        alt: image.getAttribute("alt"),
        loading: image.getAttribute("loading"),
        complete: image.complete,
        naturalWidth: image.naturalWidth,
        naturalHeight: image.naturalHeight,
        top: rect.top,
        width: rect.width,
        height: rect.height,
      };
    });
    const h1 = document.querySelector("h1");
    return {
      images,
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      h1: h1 ? Number.parseFloat(getComputedStyle(h1).fontSize) : 0,
      h2: Array.from(document.querySelectorAll("main h2")).map((node) => Number.parseFloat(getComputedStyle(node).fontSize)),
      bodyCopy: Array.from(document.querySelectorAll("main p")).map((node) => Number.parseFloat(getComputedStyle(node).fontSize)),
    };
  });
}

test.describe("public class art spotlight loading", () => {
  test("class art images stay explicit eager without layout overflow", async ({ page, isMobile }) => {
    await page.goto("/classes");
    await expect(page.getByRole("heading", { name: "Chọn cách bạn nhìn và bảo vệ thế giới", exact: true })).toBeVisible();
    await page.getByRole("heading", { name: /Một Lộ được mở như một bộ nhận diện/ }).scrollIntoViewIfNeeded();
    await expect(page.getByRole("img", { name: "Bảng thiết kế modular của class Võ gồm gương mặt, trang phục, phụ kiện và vũ khí" })).toBeVisible();
    await expect(page.getByRole("img", { name: "Bảng hiệu ứng kỹ năng đang phát triển cho class Võ" })).toBeVisible();
    await page.waitForFunction(() =>
      Array.from(document.querySelectorAll<HTMLImageElement>(".lgo-class-art-spotlight img"))
        .every((image) => image.complete && image.naturalWidth > 0 && image.naturalHeight > 0)
    );

    const metrics = await collectMetrics(page);
    expect(metrics.images, "class art image count").toHaveLength(2);
    for (const image of metrics.images) {
      expect(image.loading, `loading for ${image.alt}`).toBe("eager");
      expect(image.complete, `loaded state for ${image.alt}`).toBe(true);
      expect(image.naturalWidth, `natural width for ${image.alt}`).toBeGreaterThan(0);
      expect(image.naturalHeight, `natural height for ${image.alt}`).toBeGreaterThan(0);
      expect(image.width, `rendered width for ${image.alt}`).toBeGreaterThan(100);
      expect(image.height, `rendered height for ${image.alt}`).toBeGreaterThan(80);
    }
    expect(metrics.overflow, "horizontal overflow").toBeLessThanOrEqual(0);
    expect(metrics.h1, "h1 font-size cap").toBeLessThanOrEqual(isMobile ? 48 : 76);
    for (const size of metrics.h2) expect(size, "h2 font-size cap").toBeLessThanOrEqual(isMobile ? 36 : 48);
    for (const size of metrics.bodyCopy) expect(size, "body copy font-size cap").toBeLessThanOrEqual(20);
  });
});
