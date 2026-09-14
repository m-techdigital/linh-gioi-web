// v1.76 coverage: performance page uses a real LinhGioiOnline HUD reference-art visual.
import { test, expect, type Page } from "@playwright/test";

const web = process.env.LGO_WEB_URL ?? "http://127.0.0.1:3000";

type PerformanceBoardMetrics = {
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

async function collectPerformanceBoardMetrics(page: Page): Promise<PerformanceBoardMetrics> {
  return page.evaluate(() => {
    const visibleElements = Array.from(document.querySelectorAll<HTMLElement>("body *")).filter((element) => {
      const rect = element.getBoundingClientRect();
      const style = getComputedStyle(element);
      return rect.width > 0 && rect.height > 0 && style.visibility !== "hidden" && style.display !== "none";
    });
    const image = document.querySelector<HTMLImageElement>('img[alt="Bảng HUD ngân sách hiệu năng public Linh Giới"]');
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

test.describe("public performance design board", () => {
  test("/performance renders the copy-budget HUD visual without mobile overflow", async ({ page, isMobile }) => {
    await page.goto(`${web}/performance`);
    await expect(page.getByRole("heading", { name: "Hiệu năng và ngân sách nội dung" })).toBeVisible();
    await expect(page.getByRole("img", { name: "Bảng HUD ngân sách hiệu năng public Linh Giới" })).toBeVisible();

    const metrics = await collectPerformanceBoardMetrics(page);
    expect(metrics.board, "performance board metrics").not.toBeNull();
    expect(metrics.board?.src, "performance board src").toContain("/game-art/design-boards/performance-copy-budget-hud.svg");
    expect(metrics.board?.loading, "performance board loading intent").toBe("eager");
    expect(metrics.board?.naturalWidth, "performance board loaded width").toBeGreaterThan(0);
    expect(metrics.board?.naturalHeight, "performance board loaded height").toBeGreaterThan(0);
    expect(metrics.pageOverflow, "performance horizontal overflow").toBeLessThanOrEqual(0);
    expect(metrics.maxFont, "performance visible font cap").toBeLessThanOrEqual(isMobile ? 48 : 64);
    expect(metrics.board?.captionFontSize ?? 0, "performance board caption font-size").toBeLessThanOrEqual(18);
  });
});
