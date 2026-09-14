// v1.79 coverage: start page uses a real LinhGioiOnline gameplay-loop reference-art visual.
import { test, expect, type Page } from "@playwright/test";

const web = process.env.LGO_WEB_URL ?? "http://127.0.0.1:3000";

type StartBoardMetrics = {
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

async function collectStartBoardMetrics(page: Page): Promise<StartBoardMetrics> {
  return page.evaluate(() => {
    const visibleElements = Array.from(document.querySelectorAll<HTMLElement>("body *")).filter((element) => {
      const rect = element.getBoundingClientRect();
      const style = getComputedStyle(element);
      return rect.width > 0 && rect.height > 0 && style.visibility !== "hidden" && style.display !== "none";
    });
    const image = document.querySelector<HTMLImageElement>('img[alt="Bảng tuyến hướng dẫn bắt đầu"]');
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

test.describe("public start design board", () => {
  test("/start renders the tutorial gameplay-loop visual without mobile overflow", async ({ page, isMobile }) => {
    await page.goto(`${web}/start`);
    await expect(page.getByRole("heading", { name: "Bắt đầu" })).toBeVisible();
    await expect(page.getByRole("img", { name: "Bảng tuyến hướng dẫn bắt đầu" })).toBeVisible();

    const metrics = await collectStartBoardMetrics(page);
    expect(metrics.board, "start board metrics").not.toBeNull();
    expect(metrics.board?.src, "start board src").toContain("/game-art/design-boards/start-tutorial-gameplay-loop.svg");
    expect(metrics.board?.loading, "start board loading intent").toBe("eager");
    expect(metrics.board?.naturalWidth, "start board loaded width").toBeGreaterThan(0);
    expect(metrics.board?.naturalHeight, "start board loaded height").toBeGreaterThan(0);
    expect(metrics.pageOverflow, "start horizontal overflow").toBeLessThanOrEqual(0);
    expect(metrics.maxFont, "start visible font cap").toBeLessThanOrEqual(isMobile ? 48 : 64);
    expect(metrics.board?.captionFontSize ?? 0, "start board caption font-size").toBeLessThanOrEqual(18);
  });
});
