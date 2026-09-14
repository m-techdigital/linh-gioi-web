// v1.80 coverage: journey page uses a real LinhGioiOnline route-flow reference-art visual.
import { test, expect, type Page } from "@playwright/test";

const web = process.env.LGO_WEB_URL ?? "http://127.0.0.1:3000";

type JourneyBoardMetrics = {
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

async function collectJourneyBoardMetrics(page: Page): Promise<JourneyBoardMetrics> {
  return page.evaluate(() => {
    const visibleElements = Array.from(document.querySelectorAll<HTMLElement>("body *")).filter((element) => {
      const rect = element.getBoundingClientRect();
      const style = getComputedStyle(element);
      return rect.width > 0 && rect.height > 0 && style.visibility !== "hidden" && style.display !== "none";
    });
    const image = document.querySelector<HTMLImageElement>('img[alt="Bảng tuyến hành trình một phiên chơi"]');
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

test.describe("public journey design board", () => {
  test("/journey renders the route-flow visual without mobile overflow", async ({ page, isMobile }) => {
    await page.goto(`${web}/journey`);
    await expect(page.getByRole("heading", { name: "20 phút không chỉ để đánh quái" })).toBeVisible();
    await expect(page.getByRole("img", { name: "Bảng tuyến hành trình một phiên chơi" })).toBeVisible();

    const metrics = await collectJourneyBoardMetrics(page);
    expect(metrics.board, "journey board metrics").not.toBeNull();
    expect(metrics.board?.src, "journey board src").toContain("/game-art/design-boards/journey-session-route-flow.svg");
    expect(metrics.board?.loading, "journey board loading intent").toBe("eager");
    expect(metrics.board?.naturalWidth, "journey board loaded width").toBeGreaterThan(0);
    expect(metrics.board?.naturalHeight, "journey board loaded height").toBeGreaterThan(0);
    expect(metrics.pageOverflow, "journey horizontal overflow").toBeLessThanOrEqual(0);
    expect(metrics.maxFont, "journey visible font cap").toBeLessThanOrEqual(isMobile ? 48 : 64);
    expect(metrics.board?.captionFontSize ?? 0, "journey board caption font-size").toBeLessThanOrEqual(18);
  });
});
