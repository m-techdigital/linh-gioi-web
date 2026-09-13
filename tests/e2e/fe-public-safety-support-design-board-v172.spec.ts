// v1.72 coverage: safety support uses a real LinhGioiOnline HUD reference-art visual.
import { test, expect, type Page } from "@playwright/test";

const web = process.env.LGO_WEB_URL ?? "http://127.0.0.1:3000";

type SafetyBoardMetrics = {
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

async function collectSafetyBoardMetrics(page: Page): Promise<SafetyBoardMetrics> {
  return page.evaluate(() => {
    const visibleElements = Array.from(document.querySelectorAll<HTMLElement>("body *")).filter((element) => {
      const rect = element.getBoundingClientRect();
      const style = getComputedStyle(element);
      return rect.width > 0 && rect.height > 0 && style.visibility !== "hidden" && style.display !== "none";
    });
    const image = document.querySelector<HTMLImageElement>('img[alt="Player safety support HUD board"]');
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

test.describe("public safety support design board", () => {
  test("/support/safety renders the HUD support board without mobile overflow", async ({ page, isMobile }) => {
    await page.goto(`${web}/support/safety`);
    await expect(page.getByRole("heading", { name: "Safety support cho người chơi mới" })).toBeVisible();
    await expect(page.getByRole("img", { name: "Player safety support HUD board" })).toBeVisible();

    const metrics = await collectSafetyBoardMetrics(page);
    expect(metrics.board, "safety support board metrics").not.toBeNull();
    expect(metrics.board?.src, "safety support board src").toContain("/game-art/design-boards/player-safety-support-hud.svg");
    expect(metrics.board?.loading, "safety support board loading intent").toBe("eager");
    expect(metrics.board?.naturalWidth, "safety support board loaded width").toBeGreaterThan(0);
    expect(metrics.board?.naturalHeight, "safety support board loaded height").toBeGreaterThan(0);
    expect(metrics.pageOverflow, "safety support horizontal overflow").toBeLessThanOrEqual(0);
    expect(metrics.maxFont, "safety support visible font cap").toBeLessThanOrEqual(isMobile ? 48 : 64);
    expect(metrics.board?.captionFontSize ?? 0, "safety support board caption font-size").toBeLessThanOrEqual(18);
  });
});
