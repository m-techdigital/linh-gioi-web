// v1.82 coverage: world gameplay loop page uses a real LinhGioiOnline gameplay-loop reference-art visual.
import { test, expect, type Page } from "@playwright/test";

const web = process.env.LGO_WEB_URL ?? "http://127.0.0.1:3000";

type GameLoopBoardMetrics = {
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

async function collectGameLoopBoardMetrics(page: Page): Promise<GameLoopBoardMetrics> {
  return page.evaluate(() => {
    const visibleElements = Array.from(document.querySelectorAll<HTMLElement>("body *")).filter((element) => {
      const rect = element.getBoundingClientRect();
      const style = getComputedStyle(element);
      return rect.width > 0 && rect.height > 0 && style.visibility !== "hidden" && style.display !== "none";
    });
    const image = document.querySelector<HTMLImageElement>('img[alt="Board vòng lặp gameplay thế giới Linh Giới"]');
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

test.describe("public world gameplay loop design board", () => {
  test("/game/loop renders the gameplay-loop visual without mobile overflow", async ({ page, isMobile }) => {
    await page.goto(`${web}/game/loop`);
    await expect(page.getByRole("heading", { name: "Vòng lặp gameplay thế giới" })).toBeVisible();
    await expect(page.getByRole("img", { name: "Board vòng lặp gameplay thế giới Linh Giới" })).toBeVisible();

    const metrics = await collectGameLoopBoardMetrics(page);
    expect(metrics.board, "game loop board metrics").not.toBeNull();
    expect(metrics.board?.src, "game loop board src").toContain("/game-art/design-boards/world-gameplay-loop-board.svg");
    expect(metrics.board?.loading, "game loop board loading intent").toBe("eager");
    expect(metrics.board?.naturalWidth, "game loop board loaded width").toBeGreaterThan(0);
    expect(metrics.board?.naturalHeight, "game loop board loaded height").toBeGreaterThan(0);
    expect(metrics.pageOverflow, "game loop horizontal overflow").toBeLessThanOrEqual(0);
    expect(metrics.maxFont, "game loop visible font cap").toBeLessThanOrEqual(isMobile ? 34 : 56);
    expect(metrics.board?.captionFontSize ?? 0, "game loop board caption font-size").toBeLessThanOrEqual(18);
  });
});
