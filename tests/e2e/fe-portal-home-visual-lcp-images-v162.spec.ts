// v1.62 migrated coverage: Portal home secondary visual panels remain loaded/readable without competing with primary player data.
import { test, expect, type Page } from "@playwright/test";

const portal = process.env.LGO_PORTAL_URL ?? "http://127.0.0.1:3001";

type ImageMetrics = {
  pageOverflow: number;
  images: Array<{
    alt: string;
    loading: string | null;
    complete: boolean;
    naturalWidth: number;
    fontSizes: number[];
    rect: { top: number; bottom: number; width: number; height: number };
  }>;
};

async function collectImageMetrics(page: Page): Promise<ImageMetrics> {
  return page.evaluate(() => {
    const panel = document.querySelector<HTMLElement>('[aria-label="Portal home visual panels"]');
    if (!panel) throw new Error("missing Portal home visual panels");
    return {
      pageOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      images: Array.from(panel.querySelectorAll<HTMLImageElement>("img")).map((img) => {
        const rect = img.getBoundingClientRect();
        const card = img.closest<HTMLElement>("article") ?? panel;
        return {
          alt: img.alt,
          loading: img.getAttribute("loading"),
          complete: img.complete,
          naturalWidth: img.naturalWidth,
          fontSizes: Array.from(card.querySelectorAll<HTMLElement>("h2, p, span")).map((node) => Number.parseFloat(getComputedStyle(node).fontSize)),
          rect: { top: rect.top, bottom: rect.bottom, width: rect.width, height: rect.height }
        };
      })
    };
  });
}

test.describe("Portal home visual LCP images", () => {
  test("secondary visual panel images stay lazy and readable on desktop and mobile", async ({ page }) => {
    await page.goto(`${portal}/`);
    await expect(page.getByRole("heading", { name: "Tổng quan người chơi" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Tổng quan hình ảnh hành trình" })).toBeVisible();

    const world = page.getByAltText("Portal home Đông Môn world concept");
    const vo = page.getByAltText("Portal home development art Võ");
    await expect(world).toBeVisible();
    await expect(vo).toBeVisible();
    await expect(world).toHaveAttribute("loading", "lazy");
    await expect(vo).toHaveAttribute("loading", "lazy");

    const metrics = await collectImageMetrics(page);
    expect(metrics.pageOverflow, "Portal home page overflow").toBeLessThanOrEqual(0);
    expect(metrics.images, "Portal home visual image count").toHaveLength(2);
    for (const image of metrics.images) {
      expect(image.loading, `${image.alt} loading`).toBe("lazy");
      expect(image.complete, `${image.alt} complete`).toBe(true);
      expect(image.naturalWidth, `${image.alt} natural width`).toBeGreaterThan(0);
      for (const size of image.fontSizes) expect(size, `${image.alt} copy font-size`).toBeLessThanOrEqual(42);
    }
  });
});
