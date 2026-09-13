// v1.70 coverage: public roadmap uses a real LinhGioiOnline reference-art flow board.
import { test, expect, type Page } from "@playwright/test";

const web = process.env.LGO_WEB_URL ?? "http://127.0.0.1:3000";

type RoadmapBoardMetrics = {
  pageOverflow: number;
  maxFont: number;
  board: null | {
    src: string | null;
    alt: string | null;
    loading: string | null;
    naturalWidth: number;
    naturalHeight: number;
    width: number;
    height: number;
    captionFontSize: number;
  };
};

async function collectRoadmapBoardMetrics(page: Page): Promise<RoadmapBoardMetrics> {
  return page.evaluate(() => {
    const visibleElements = Array.from(document.querySelectorAll<HTMLElement>("body *")).filter((element) => {
      const rect = element.getBoundingClientRect();
      const style = getComputedStyle(element);
      return rect.width > 0 && rect.height > 0 && style.visibility !== "hidden" && style.display !== "none";
    });
    const image = document.querySelector<HTMLImageElement>('img[alt="Public roadmap flow design board"]');
    const rect = image?.getBoundingClientRect();
    const caption = image?.closest("figure")?.querySelector("figcaption");
    return {
      pageOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      maxFont: Math.max(...visibleElements.map((element) => Number.parseFloat(getComputedStyle(element).fontSize) || 0)),
      board: image && rect ? {
        src: image.getAttribute("src"),
        alt: image.getAttribute("alt"),
        loading: image.getAttribute("loading"),
        naturalWidth: image.naturalWidth,
        naturalHeight: image.naturalHeight,
        width: rect.width,
        height: rect.height,
        captionFontSize: caption ? Number.parseFloat(getComputedStyle(caption).fontSize) : 0,
      } : null,
    };
  });
}

test.describe("public roadmap design board", () => {
  test("/roadmap renders the real roadmap flow board without mobile overflow", async ({ page, isMobile }) => {
    await page.goto(`${web}/roadmap`);
    await expect(page.getByRole("heading", { name: "Roadmap phát triển web" })).toBeVisible();
    await expect(page.getByRole("img", { name: "Public roadmap flow design board" })).toBeVisible();

    const metrics = await collectRoadmapBoardMetrics(page);
    expect(metrics.board, "roadmap flow board metrics").not.toBeNull();
    expect(metrics.board?.src, "roadmap board src").toContain("/game-art/design-boards/public-roadmap-flow.svg");
    expect(metrics.board?.loading, "roadmap board loading intent").toBe("eager");
    expect(metrics.board?.naturalWidth, "roadmap board loaded width").toBeGreaterThan(0);
    expect(metrics.board?.naturalHeight, "roadmap board loaded height").toBeGreaterThan(0);
    expect(metrics.pageOverflow, "roadmap horizontal overflow").toBeLessThanOrEqual(0);
    expect(metrics.maxFont, "roadmap visible font cap").toBeLessThanOrEqual(isMobile ? 48 : 64);
    expect(metrics.board?.captionFontSize ?? 0, "roadmap board caption font-size").toBeLessThanOrEqual(18);
  });
});
