// v1.67 coverage: public download trust uses a real imported design-board image instead of only text placeholders.
import { test, expect, type Page } from "@playwright/test";

const web = process.env.LGO_WEB_URL ?? "http://127.0.0.1:3000";

type TrustBoardMetrics = {
  pageOverflow: number;
  maxFont: number;
  board: null | {
    src: string | null;
    alt: string | null;
    loading: string | null;
    width: number;
    height: number;
    naturalWidth: number;
    naturalHeight: number;
    fontSize: number;
  };
};

async function collectTrustBoardMetrics(page: Page): Promise<TrustBoardMetrics> {
  return page.evaluate(() => {
    const visibleElements = Array.from(document.querySelectorAll<HTMLElement>("body *")).filter((element) => {
      const rect = element.getBoundingClientRect();
      const style = getComputedStyle(element);
      return rect.width > 0 && rect.height > 0 && style.visibility !== "hidden" && style.display !== "none";
    });
    const image = document.querySelector<HTMLImageElement>('img[alt="Release trust gate design board"]');
    const rect = image?.getBoundingClientRect();
    return {
      pageOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      maxFont: Math.max(...visibleElements.map((element) => Number.parseFloat(getComputedStyle(element).fontSize) || 0)),
      board: image && rect ? {
        src: image.getAttribute("src"),
        alt: image.getAttribute("alt"),
        loading: image.getAttribute("loading"),
        width: rect.width,
        height: rect.height,
        naturalWidth: image.naturalWidth,
        naturalHeight: image.naturalHeight,
        fontSize: Number.parseFloat(getComputedStyle(image.closest("figure") ?? image).fontSize),
      } : null,
    };
  });
}

test.describe("public download trust design board", () => {
  test("/download/trust renders the real release gate design board without mobile overflow", async ({ page, isMobile }) => {
    await page.goto(`${web}/download/trust`);
    await expect(page.getByRole("heading", { name: "Download trust / checksum / provenance" })).toBeVisible();
    const boardImage = page.getByRole("img", { name: "Release trust gate design board" });
    await expect(boardImage).toBeVisible();
    const metrics = await collectTrustBoardMetrics(page);
    expect(metrics.board, "release trust board image metrics").not.toBeNull();
    expect(metrics.board?.src, "release trust board src").toContain("/game-art/design-boards/release-trust-gate.svg");
    expect(metrics.board?.loading, "release trust board loading intent").toBe("eager");
    expect(metrics.board?.naturalWidth, "release trust board loaded width").toBeGreaterThan(0);
    expect(metrics.board?.naturalHeight, "release trust board loaded height").toBeGreaterThan(0);
    expect(metrics.pageOverflow, "download trust horizontal overflow").toBeLessThanOrEqual(0);
    expect(metrics.maxFont, "download trust visible font cap").toBeLessThanOrEqual(isMobile ? 48 : 64);
    expect(metrics.board?.fontSize ?? 0, "release trust board caption font-size").toBeLessThanOrEqual(18);
  });
});
