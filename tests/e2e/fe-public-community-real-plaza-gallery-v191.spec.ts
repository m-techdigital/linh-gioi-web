// v1.91 coverage: community page renders real LinhGioiOnline plaza screenshots with safe responsive layout.
import { test, expect, type Page } from "@playwright/test";

const web = process.env.LGO_WEB_URL ?? "http://127.0.0.1:3000";

const screenshots = [
  {
    alt: "Ảnh quảng trường Linh Thành với nhân vật hướng dẫn",
    src: "/game-art/community/linh-thanh-plaza-npc-preview.png",
  },
  {
    alt: "Ảnh chọn mục tiêu trong quảng trường Linh Thành",
    src: "/game-art/community/linh-thanh-plaza-target-selector.png",
  },
];

type GalleryMetrics = {
  pageOverflow: number;
  maxFont: number;
  gallery: null | {
    cardCount: number;
    columnCount: number;
    captionMaxFont: number;
    images: Array<{ alt: string; src: string | null; loading: string | null; naturalWidth: number; naturalHeight: number }>;
  };
};

async function collectGalleryMetrics(page: Page): Promise<GalleryMetrics> {
  return page.evaluate(() => {
    const visibleElements = Array.from(document.querySelectorAll<HTMLElement>("body *")).filter((element) => {
      const rect = element.getBoundingClientRect();
      const style = getComputedStyle(element);
      return rect.width > 0 && rect.height > 0 && style.visibility !== "hidden" && style.display !== "none";
    });
    const gallery = document.querySelector<HTMLElement>('#community-runtime-gallery');
    const cards = Array.from(gallery?.querySelectorAll<HTMLElement>(".lgo-media-frame") ?? []);
    const captions = Array.from(gallery?.querySelectorAll<HTMLElement>(".lgo-media-frame-copy p") ?? []);
    const firstTop = cards[0]?.getBoundingClientRect().top ?? 0;
    const columnCount = new Set(cards.filter((card) => Math.abs(card.getBoundingClientRect().top - firstTop) < 4).map((card) => Math.round(card.getBoundingClientRect().left))).size;
    return {
      pageOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      maxFont: Math.max(...visibleElements.map((element) => Number.parseFloat(getComputedStyle(element).fontSize) || 0)),
      gallery: gallery ? {
        cardCount: cards.length,
        columnCount,
        captionMaxFont: Math.max(...captions.map((caption) => Number.parseFloat(getComputedStyle(caption).fontSize) || 0)),
        images: Array.from(gallery.querySelectorAll<HTMLImageElement>("img")).map((image) => ({
          alt: image.alt,
          src: image.getAttribute("src"),
          loading: image.getAttribute("loading"),
          naturalWidth: image.naturalWidth,
          naturalHeight: image.naturalHeight,
        })),
      } : null,
    };
  });
}

test.describe("public community real plaza gallery", () => {
  test("/community uses real Linh Thanh plaza screenshots without backend claims or layout overflow", async ({ page, isMobile }) => {
    await page.goto(`${web}/community`);
    await expect(page.getByRole("heading", { level: 2, name: "Khung hình prototype Linh Thành" })).toBeVisible();
    for (const screenshot of screenshots) {
      await expect(page.getByRole("img", { name: screenshot.alt })).toBeVisible();
    }

    const metrics = await collectGalleryMetrics(page);
    expect(metrics.gallery, "community gallery metrics").not.toBeNull();
    expect(metrics.gallery?.cardCount, "community gallery card count").toBe(2);
    expect(metrics.gallery?.columnCount, "community gallery responsive columns").toBe(isMobile ? 1 : 2);
    expect(metrics.pageOverflow, "community gallery overflow").toBeLessThanOrEqual(0);
    expect(metrics.maxFont, "community visible font cap").toBeLessThanOrEqual(isMobile ? 48 : 64);
    expect(metrics.gallery?.captionMaxFont ?? 0, "community gallery caption font cap").toBeLessThanOrEqual(18);

    for (const screenshot of screenshots) {
      const image = metrics.gallery?.images.find((item) => item.alt === screenshot.alt);
      expect(image?.src, `${screenshot.alt} src`).toContain(screenshot.src);
      expect(image?.loading, `${screenshot.alt} loading`).toBe("lazy");
      expect(image?.naturalWidth, `${screenshot.alt} loaded width`).toBeGreaterThanOrEqual(640);
      expect(image?.naturalHeight, `${screenshot.alt} loaded height`).toBeGreaterThanOrEqual(480);
    }
  });
});
