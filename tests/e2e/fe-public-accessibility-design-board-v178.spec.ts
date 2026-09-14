// v1.78 coverage: accessibility/readability page uses a real LinhGioiOnline route-map reference-art visual.
import { test, expect, type Page } from "@playwright/test";

const web = process.env.LGO_WEB_URL ?? "http://127.0.0.1:3000";

type AccessibilityBoardMetrics = {
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

async function collectAccessibilityBoardMetrics(page: Page): Promise<AccessibilityBoardMetrics> {
  return page.evaluate(() => {
    const visibleElements = Array.from(document.querySelectorAll<HTMLElement>("body *")).filter((element) => {
      const rect = element.getBoundingClientRect();
      const style = getComputedStyle(element);
      return rect.width > 0 && rect.height > 0 && style.visibility !== "hidden" && style.display !== "none";
    });
    const image = document.querySelector<HTMLImageElement>('img[alt="Bảng lộ trình đọc dễ thao tác Linh Giới"]');
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

test.describe("public accessibility readability design board", () => {
  test("/accessibility renders the route-map visual without mobile overflow", async ({ page, isMobile }) => {
    await page.goto(`${web}/accessibility`);
    await expect(page.getByRole("heading", { name: "Dễ đọc và dễ thao tác" })).toBeVisible();
    await expect(page.getByRole("img", { name: "Bảng lộ trình đọc dễ thao tác Linh Giới" })).toBeVisible();

    const metrics = await collectAccessibilityBoardMetrics(page);
    expect(metrics.board, "accessibility board metrics").not.toBeNull();
    expect(metrics.board?.src, "accessibility board src").toContain("/game-art/design-boards/accessibility-readability-route-map.svg");
    expect(metrics.board?.loading, "accessibility board loading intent").toBe("eager");
    expect(metrics.board?.naturalWidth, "accessibility board loaded width").toBeGreaterThan(0);
    expect(metrics.board?.naturalHeight, "accessibility board loaded height").toBeGreaterThan(0);
    expect(metrics.pageOverflow, "accessibility horizontal overflow").toBeLessThanOrEqual(0);
    expect(metrics.maxFont, "accessibility visible font cap").toBeLessThanOrEqual(isMobile ? 48 : 64);
    expect(metrics.board?.captionFontSize ?? 0, "accessibility board caption font-size").toBeLessThanOrEqual(18);
  });
});
