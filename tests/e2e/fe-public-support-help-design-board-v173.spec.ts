// v1.73 coverage: support help uses a real LinhGioiOnline world-hub reference-art visual.
import { test, expect, type Page } from "@playwright/test";

const web = process.env.LGO_WEB_URL ?? "http://127.0.0.1:3000";

type HelpBoardMetrics = {
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

async function collectHelpBoardMetrics(page: Page): Promise<HelpBoardMetrics> {
  return page.evaluate(() => {
    const visibleElements = Array.from(document.querySelectorAll<HTMLElement>("body *")).filter((element) => {
      const rect = element.getBoundingClientRect();
      const style = getComputedStyle(element);
      return rect.width > 0 && rect.height > 0 && style.visibility !== "hidden" && style.display !== "none";
    });
    const image = document.querySelector<HTMLImageElement>('img[alt="Support help route map board"]');
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

test.describe("public support help design board", () => {
  test("/support/help renders the route-map board without mobile overflow", async ({ page, isMobile }) => {
    await page.goto(`${web}/support/help`);
    await expect(page.getByRole("heading", { name: "FAQ Help: tìm đúng câu trả lời trước khi gửi feedback" })).toBeVisible();
    await expect(page.getByRole("img", { name: "Support help route map board" })).toBeVisible();

    const metrics = await collectHelpBoardMetrics(page);
    expect(metrics.board, "support help board metrics").not.toBeNull();
    expect(metrics.board?.src, "support help board src").toContain("/game-art/design-boards/support-help-route-map.svg");
    expect(metrics.board?.loading, "support help board loading intent").toBe("eager");
    expect(metrics.board?.naturalWidth, "support help board loaded width").toBeGreaterThan(0);
    expect(metrics.board?.naturalHeight, "support help board loaded height").toBeGreaterThan(0);
    expect(metrics.pageOverflow, "support help horizontal overflow").toBeLessThanOrEqual(0);
    expect(metrics.maxFont, "support help visible font cap").toBeLessThanOrEqual(isMobile ? 48 : 64);
    expect(metrics.board?.captionFontSize ?? 0, "support help board caption font-size").toBeLessThanOrEqual(18);
  });
});
