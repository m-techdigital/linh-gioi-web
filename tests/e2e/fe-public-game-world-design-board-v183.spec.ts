// v1.83 coverage: game world page uses a real LinhGioiOnline world-hub reference-art visual.
import { test, expect, type Page } from "@playwright/test";

const web = process.env.LGO_WEB_URL ?? "http://127.0.0.1:3000";

type GameWorldBoardMetrics = {
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

async function collectGameWorldBoardMetrics(page: Page): Promise<GameWorldBoardMetrics> {
  return page.evaluate(() => {
    const visibleElements = Array.from(document.querySelectorAll<HTMLElement>("body *")).filter((element) => {
      const rect = element.getBoundingClientRect();
      const style = getComputedStyle(element);
      return rect.width > 0 && rect.height > 0 && style.visibility !== "hidden" && style.display !== "none";
    });
    const image = document.querySelector<HTMLImageElement>('img[alt="Game world atlas hub board"]');
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

test.describe("public game world design board", () => {
  test("/game renders the world atlas visual without mobile overflow", async ({ page, isMobile }) => {
    await page.goto(`${web}/game`);
    await expect(page.getByRole("heading", { name: "Một thế giới có nơi để trở về" })).toBeVisible();
    await expect(page.getByRole("img", { name: "Game world atlas hub board" })).toBeVisible();

    const metrics = await collectGameWorldBoardMetrics(page);
    expect(metrics.board, "game world board metrics").not.toBeNull();
    expect(metrics.board?.src, "game world board src").toContain("/game-art/design-boards/game-world-atlas-hub.svg");
    expect(metrics.board?.loading, "game world board loading intent").toBe("eager");
    expect(metrics.board?.naturalWidth, "game world board loaded width").toBeGreaterThan(0);
    expect(metrics.board?.naturalHeight, "game world board loaded height").toBeGreaterThan(0);
    expect(metrics.pageOverflow, "game world horizontal overflow").toBeLessThanOrEqual(0);
    expect(metrics.maxFont, "game world visible font cap").toBeLessThanOrEqual(isMobile ? 48 : 64);
    expect(metrics.board?.captionFontSize ?? 0, "game world board caption font-size").toBeLessThanOrEqual(18);
  });
});
