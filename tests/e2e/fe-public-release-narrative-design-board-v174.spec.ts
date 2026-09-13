// v1.74 coverage: release narrative uses a real LinhGioiOnline M0-to-M1 gate reference-art visual.
import { test, expect, type Page } from "@playwright/test";

const web = process.env.LGO_WEB_URL ?? "http://127.0.0.1:3000";

type ReleaseNarrativeBoardMetrics = {
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

async function collectReleaseNarrativeBoardMetrics(page: Page): Promise<ReleaseNarrativeBoardMetrics> {
  return page.evaluate(() => {
    const visibleElements = Array.from(document.querySelectorAll<HTMLElement>("body *")).filter((element) => {
      const rect = element.getBoundingClientRect();
      const style = getComputedStyle(element);
      return rect.width > 0 && rect.height > 0 && style.visibility !== "hidden" && style.display !== "none";
    });
    const image = document.querySelector<HTMLImageElement>('img[alt="Release narrative M0 to M1 gate board"]');
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

test.describe("public release narrative design board", () => {
  test("/release renders the M0-to-M1 gate visual without mobile overflow", async ({ page, isMobile }) => {
    await page.goto(`${web}/release`);
    await expect(page.getByRole("heading", { name: "Release narrative: từ content-ready tới closed test" })).toBeVisible();
    await expect(page.getByRole("img", { name: "Release narrative M0 to M1 gate board" })).toBeVisible();

    const metrics = await collectReleaseNarrativeBoardMetrics(page);
    expect(metrics.board, "release narrative board metrics").not.toBeNull();
    expect(metrics.board?.src, "release narrative board src").toContain("/game-art/design-boards/release-narrative-m0-to-m1-gate.svg");
    expect(metrics.board?.loading, "release narrative board loading intent").toBe("eager");
    expect(metrics.board?.naturalWidth, "release narrative board loaded width").toBeGreaterThan(0);
    expect(metrics.board?.naturalHeight, "release narrative board loaded height").toBeGreaterThan(0);
    expect(metrics.pageOverflow, "release narrative horizontal overflow").toBeLessThanOrEqual(0);
    expect(metrics.maxFont, "release narrative visible font cap").toBeLessThanOrEqual(isMobile ? 48 : 64);
    expect(metrics.board?.captionFontSize ?? 0, "release narrative board caption font-size").toBeLessThanOrEqual(18);
  });
});
