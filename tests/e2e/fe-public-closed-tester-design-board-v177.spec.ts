// v1.77 coverage: closed tester information page uses a real LinhGioiOnline production-board reference-art visual.
import { test, expect, type Page } from "@playwright/test";

const web = process.env.LGO_WEB_URL ?? "http://127.0.0.1:3000";

type ClosedTesterBoardMetrics = {
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

async function collectClosedTesterBoardMetrics(page: Page): Promise<ClosedTesterBoardMetrics> {
  return page.evaluate(() => {
    const visibleElements = Array.from(document.querySelectorAll<HTMLElement>("body *")).filter((element) => {
      const rect = element.getBoundingClientRect();
      const style = getComputedStyle(element);
      return rect.width > 0 && rect.height > 0 && style.visibility !== "hidden" && style.display !== "none";
    });
    const image = document.querySelector<HTMLImageElement>('img[alt="Closed tester information production board"]');
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

test.describe("public closed tester information design board", () => {
  test("/release/tester-pack renders the production-board visual without mobile overflow", async ({ page, isMobile }) => {
    await page.goto(`${web}/release/tester-pack`);
    await expect(page.getByRole("heading", { name: "Closed tester information: chuẩn bị đúng, không gửi nhầm dữ liệu" })).toBeVisible();
    await expect(page.getByRole("img", { name: "Closed tester information production board" })).toBeVisible();

    const metrics = await collectClosedTesterBoardMetrics(page);
    expect(metrics.board, "closed tester board metrics").not.toBeNull();
    expect(metrics.board?.src, "closed tester board src").toContain("/game-art/design-boards/closed-tester-production-board.svg");
    expect(metrics.board?.loading, "closed tester board loading intent").toBe("eager");
    expect(metrics.board?.naturalWidth, "closed tester board loaded width").toBeGreaterThan(0);
    expect(metrics.board?.naturalHeight, "closed tester board loaded height").toBeGreaterThan(0);
    expect(metrics.pageOverflow, "closed tester horizontal overflow").toBeLessThanOrEqual(0);
    expect(metrics.maxFont, "closed tester visible font cap").toBeLessThanOrEqual(isMobile ? 48 : 64);
    expect(metrics.board?.captionFontSize ?? 0, "closed tester board caption font-size").toBeLessThanOrEqual(18);
  });
});
