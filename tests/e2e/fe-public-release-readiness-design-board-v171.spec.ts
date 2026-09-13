// v1.71 coverage: release readiness uses a real LinhGioiOnline production-board reference-art visual.
import { test, expect, type Page } from "@playwright/test";

const web = process.env.LGO_WEB_URL ?? "http://127.0.0.1:3000";

type ReadinessBoardMetrics = {
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

async function collectReadinessBoardMetrics(page: Page): Promise<ReadinessBoardMetrics> {
  return page.evaluate(() => {
    const visibleElements = Array.from(document.querySelectorAll<HTMLElement>("body *")).filter((element) => {
      const rect = element.getBoundingClientRect();
      const style = getComputedStyle(element);
      return rect.width > 0 && rect.height > 0 && style.visibility !== "hidden" && style.display !== "none";
    });
    const image = document.querySelector<HTMLImageElement>('img[alt="Release readiness production board"]');
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

test.describe("public release readiness design board", () => {
  test("/release/readiness renders the production-board visual without mobile overflow", async ({ page, isMobile }) => {
    await page.goto(`${web}/release/readiness`);
    await expect(page.getByRole("heading", { name: "Release readiness: đọc gate trước khi kỳ vọng bản test" })).toBeVisible();
    await expect(page.getByRole("img", { name: "Release readiness production board" })).toBeVisible();

    const metrics = await collectReadinessBoardMetrics(page);
    expect(metrics.board, "release readiness board metrics").not.toBeNull();
    expect(metrics.board?.src, "release readiness board src").toContain("/game-art/design-boards/release-readiness-production-board.svg");
    expect(metrics.board?.loading, "release readiness board loading intent").toBe("eager");
    expect(metrics.board?.naturalWidth, "release readiness board loaded width").toBeGreaterThan(0);
    expect(metrics.board?.naturalHeight, "release readiness board loaded height").toBeGreaterThan(0);
    expect(metrics.pageOverflow, "release readiness horizontal overflow").toBeLessThanOrEqual(0);
    expect(metrics.maxFont, "release readiness visible font cap").toBeLessThanOrEqual(isMobile ? 48 : 64);
    expect(metrics.board?.captionFontSize ?? 0, "release readiness board caption font-size").toBeLessThanOrEqual(18);
  });
});
