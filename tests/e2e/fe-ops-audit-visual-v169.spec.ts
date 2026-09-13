// v1.69 coverage: Ops audit route renders real game-art visual while preserving locked fixture filter readability.
import { test, expect, type Page } from "@playwright/test";

const ops = process.env.LGO_OPS_URL ?? "http://127.0.0.1:3002";

type OpsAuditVisualMetrics = {
  pageOverflow: number;
  maxFont: number;
  filterControls: Array<{ name: string | null; ariaDisabled: string | null; dataDisabled: string | null; tabIndex: number; fontSize: number }>;
  image: null | {
    src: string | null;
    alt: string | null;
    loading: string | null;
    naturalWidth: number;
    naturalHeight: number;
  };
};

async function collectOpsAuditMetrics(page: Page): Promise<OpsAuditVisualMetrics> {
  return page.evaluate(() => {
    const visibleElements = Array.from(document.querySelectorAll<HTMLElement>("body *")).filter((element) => {
      const rect = element.getBoundingClientRect();
      const style = getComputedStyle(element);
      return rect.width > 0 && rect.height > 0 && style.visibility !== "hidden" && style.display !== "none";
    });
    const image = document.querySelector<HTMLImageElement>('img[alt="Ops audit trail visual"]');
    return {
      pageOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      maxFont: Math.max(...visibleElements.map((element) => Number.parseFloat(getComputedStyle(element).fontSize) || 0)),
      filterControls: Array.from(document.querySelectorAll<HTMLElement>('.lgo-form-control[aria-disabled=\"true\"]')).map((control) => ({
        name: control.getAttribute("aria-label") ?? control.textContent?.trim() ?? null,
        ariaDisabled: control.getAttribute("aria-disabled"),
        dataDisabled: control.getAttribute("data-disabled"),
        tabIndex: control.tabIndex,
        fontSize: Number.parseFloat(getComputedStyle(control).fontSize),
      })),
      image: image ? {
        src: image.getAttribute("src"),
        alt: image.getAttribute("alt"),
        loading: image.getAttribute("loading"),
        naturalWidth: image.naturalWidth,
        naturalHeight: image.naturalHeight,
      } : null,
    };
  });
}

test.describe("Ops audit real visual", () => {
  test("audit page renders real visual and keeps locked filters keyboard-readable", async ({ page, isMobile }) => {
    await page.goto(`${ops}/audit`);
    await expect(page.getByRole("heading", { name: "Audit" })).toBeVisible();
    await expect(page.getByRole("img", { name: "Ops audit trail visual" })).toBeVisible();

    const metrics = await collectOpsAuditMetrics(page);
    expect(metrics.image, "Ops audit image metrics").not.toBeNull();
    expect(metrics.image?.src, "Ops audit image src").toContain("/game-art/world/dong-mon-skyline.webp");
    expect(metrics.image?.loading, "Ops audit image loading intent").toBe("eager");
    expect(metrics.image?.naturalWidth, "Ops audit image loaded width").toBeGreaterThan(0);
    expect(metrics.image?.naturalHeight, "Ops audit image loaded height").toBeGreaterThan(0);
    expect(metrics.pageOverflow, "Ops audit horizontal overflow").toBeLessThanOrEqual(0);
    expect(metrics.maxFont, "Ops audit visible font cap").toBeLessThanOrEqual(isMobile ? 34 : 48);
    expect(metrics.filterControls.length, "locked filter controls").toBeGreaterThanOrEqual(1);
    for (const readout of metrics.filterControls) {
      expect(readout.ariaDisabled, `${readout.name} aria-disabled`).toBe("true");
      expect(readout.dataDisabled, `${readout.name} data-disabled`).toBe("true");
      expect(readout.tabIndex, `${readout.name} keyboard focusable`).toBe(0);
      expect(readout.fontSize, `${readout.name} font-size`).toBeLessThanOrEqual(18);
    }

    const actionReadout = page.locator('.lgo-form-control[aria-disabled=\"true\"]').first();
    await actionReadout.focus();
    await expect(actionReadout).toBeFocused();
  });
});
