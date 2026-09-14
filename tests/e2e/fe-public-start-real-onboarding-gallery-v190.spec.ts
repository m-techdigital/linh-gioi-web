// v1.90 coverage: start page renders real LinhGioiOnline onboarding screenshots with safe responsive layout.
import { test, expect, type Page } from "@playwright/test";

const web = process.env.LGO_WEB_URL ?? "http://127.0.0.1:3000";

const screenshots = [
  {
    alt: "Dong Mon onboarding initial spawn screenshot",
    src: "/game-art/onboarding/dong-mon-01-initial.png",
  },
  {
    alt: "Dong Mon onboarding gate focus screenshot",
    src: "/game-art/onboarding/dong-mon-02-gate-focus.png",
  },
  {
    alt: "Dong Mon onboarding dialogue screenshot",
    src: "/game-art/onboarding/dong-mon-03-dialogue.png",
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
    const gallery = document.querySelector<HTMLElement>('[aria-label="Dong Mon onboarding real screenshots"]');
    const cards = Array.from(gallery?.querySelectorAll<HTMLElement>("figure") ?? []);
    const captions = Array.from(gallery?.querySelectorAll<HTMLElement>("figcaption") ?? []);
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

test.describe("public start real onboarding gallery", () => {
  test("/start uses real Dong Mon onboarding screenshots without oversized layout", async ({ page, isMobile }) => {
    await page.goto(`${web}/start`);
    await expect(page.getByRole("heading", { name: "Ảnh thật từ tutorial Đông Môn" })).toBeVisible();
    for (const screenshot of screenshots) {
      await expect(page.getByRole("img", { name: screenshot.alt })).toBeVisible();
    }

    const metrics = await collectGalleryMetrics(page);
    expect(metrics.gallery, "onboarding gallery metrics").not.toBeNull();
    expect(metrics.gallery?.cardCount, "gallery card count").toBe(3);
    expect(metrics.gallery?.columnCount, "gallery responsive columns").toBe(isMobile ? 1 : 3);
    expect(metrics.pageOverflow, "start onboarding gallery overflow").toBeLessThanOrEqual(0);
    expect(metrics.maxFont, "start onboarding visible font cap").toBeLessThanOrEqual(isMobile ? 48 : 64);
    expect(metrics.gallery?.captionMaxFont ?? 0, "gallery caption font cap").toBeLessThanOrEqual(18);

    for (const screenshot of screenshots) {
      const image = metrics.gallery?.images.find((item) => item.alt === screenshot.alt);
      expect(image?.src, `${screenshot.alt} src`).toContain(screenshot.src);
      expect(image?.loading, `${screenshot.alt} loading`).toBe("lazy");
      expect(image?.naturalWidth, `${screenshot.alt} loaded width`).toBeGreaterThanOrEqual(1280);
      expect(image?.naturalHeight, `${screenshot.alt} loaded height`).toBeGreaterThanOrEqual(720);
    }
  });
});
