// v1.81 coverage: status page uses a real LinhGioiOnline HUD/status reference-art visual.
import { test, expect, type Page } from "@playwright/test";

const web = process.env.LGO_WEB_URL ?? "http://127.0.0.1:3000";

type StatusBoardMetrics = {
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

async function collectStatusBoardMetrics(page: Page): Promise<StatusBoardMetrics> {
  return page.evaluate(() => {
    const visibleElements = Array.from(document.querySelectorAll<HTMLElement>("body *")).filter((element) => {
      const rect = element.getBoundingClientRect();
      const style = getComputedStyle(element);
      return rect.width > 0 && rect.height > 0 && style.visibility !== "hidden" && style.display !== "none";
    });
    const image = document.querySelector<HTMLImageElement>('img[alt="Status maintenance signal board"]');
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

test.describe("public status design board", () => {
  test("/status renders the maintenance signal visual without mobile overflow", async ({ page, isMobile }) => {
    await page.goto(`${web}/status`);
    await expect(page.getByRole("heading", { name: "Trạng thái / Maintenance" })).toBeVisible();
    await expect(page.getByRole("img", { name: "Status maintenance signal board" })).toBeVisible();

    const metrics = await collectStatusBoardMetrics(page);
    expect(metrics.board, "status board metrics").not.toBeNull();
    expect(metrics.board?.src, "status board src").toContain("/game-art/design-boards/status-maintenance-signal-board.svg");
    expect(metrics.board?.loading, "status board loading intent").toBe("eager");
    expect(metrics.board?.naturalWidth, "status board loaded width").toBeGreaterThan(0);
    expect(metrics.board?.naturalHeight, "status board loaded height").toBeGreaterThan(0);
    expect(metrics.pageOverflow, "status horizontal overflow").toBeLessThanOrEqual(0);
    expect(metrics.maxFont, "status visible font cap").toBeLessThanOrEqual(isMobile ? 48 : 64);
    expect(metrics.board?.captionFontSize ?? 0, "status board caption font-size").toBeLessThanOrEqual(18);
  });
});
