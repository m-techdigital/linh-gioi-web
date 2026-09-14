// v1.84 coverage: story page uses real LinhGioiOnline Dong Mon concept art and readable typography.
import { test, expect, type Page } from "@playwright/test";

const web = process.env.LGO_WEB_URL ?? "http://127.0.0.1:3000";

type StoryFractureMetrics = {
  pageOverflow: number;
  maxFont: number;
  board: null | {
    src: string | null;
    loading: string | null;
    naturalWidth: number;
    naturalHeight: number;
    captionFontSize: number;
  };
};

async function collectStoryFractureMetrics(page: Page): Promise<StoryFractureMetrics> {
  return page.evaluate(() => {
    const visibleElements = Array.from(document.querySelectorAll<HTMLElement>("body *")).filter((element) => {
      const rect = element.getBoundingClientRect();
      const style = getComputedStyle(element);
      return rect.width > 0 && rect.height > 0 && style.visibility !== "hidden" && style.display !== "none";
    });
    const image = document.querySelector<HTMLImageElement>('img[alt="Ảnh ý tưởng Vết Nứt Đông Môn trong cốt truyện Linh Giới"]');
    const caption = image?.closest("figure")?.querySelector("figcaption");
    return {
      pageOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      maxFont: Math.max(...visibleElements.map((element) => Number.parseFloat(getComputedStyle(element).fontSize) || 0)),
      board: image ? {
        src: image.getAttribute("src"),
        loading: image.getAttribute("loading"),
        naturalWidth: image.naturalWidth,
        naturalHeight: image.naturalHeight,
        captionFontSize: caption ? Number.parseFloat(getComputedStyle(caption).fontSize) : 0,
      } : null,
    };
  });
}

test.describe("public story fracture design board", () => {
  test("/story renders real concept art without mobile overflow", async ({ page, isMobile }) => {
    await page.goto(`${web}/story`);
    await expect(page.getByRole("heading", { name: "Cho đến ngày những cánh cửa bắt đầu mở" })).toBeVisible();
    await expect(page.getByRole("img", { name: "Ảnh ý tưởng Vết Nứt Đông Môn trong cốt truyện Linh Giới" })).toBeVisible();

    const metrics = await collectStoryFractureMetrics(page);
    expect(metrics.board, "story fracture board metrics").not.toBeNull();
    expect(metrics.board?.src, "story fracture board src").toContain("/game-art/world/dong-mon-skyline.webp");
    expect(metrics.board?.loading, "story fracture board loading intent").toBe("eager");
    expect(metrics.board?.naturalWidth, "story fracture board loaded width").toBeGreaterThan(0);
    expect(metrics.board?.naturalHeight, "story fracture board loaded height").toBeGreaterThan(0);
    expect(metrics.pageOverflow, "story fracture horizontal overflow").toBeLessThanOrEqual(0);
    expect(metrics.maxFont, "story fracture visible font cap").toBeLessThanOrEqual(isMobile ? 48 : 64);
    expect(metrics.board?.captionFontSize ?? 0, "story fracture caption font-size").toBeLessThanOrEqual(18);
  });
});
