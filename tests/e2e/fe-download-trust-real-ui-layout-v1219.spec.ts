import { expect, test, type Page } from "@playwright/test";

const web = process.env.LGO_WEB_URL ?? "http://127.0.0.1:3000";

type DownloadTrustRealMetrics = {
  overflow: number;
  scrollHeight: number;
  h1Font: number;
  maxFont: number;
  heroBottom: number;
  trustGateTop: number;
  trustGateBottom: number;
  firstGatesTop: number;
  ownerGateTop: number;
  releaseNarrativeTop: number;
  designBoardTop: number;
  releaseEvidenceTop: number;
  statusDepthTop: number;
  secondaryTop: number;
  designBandTop: number;
  trustGateColumns: number;
  firstGateColumns: number;
  ownerGateColumns: number;
  releaseEvidenceColumns: number;
  secondaryChildren: number;
  focusLabel: string;
  firstFlowText: string;
};

async function collectDownloadTrustRealMetrics(page: Page): Promise<DownloadTrustRealMetrics> {
  return page.evaluate(() => {
    const rect = (selector: string) => {
      const node = document.querySelector<HTMLElement>(selector);
      if (!node) return { top: -1, bottom: -1, height: 0, width: 0 };
      const r = node.getBoundingClientRect();
      return { top: r.top, bottom: r.bottom, height: r.height, width: r.width };
    };
    const visibleForFont = (element: HTMLElement) => {
      const style = getComputedStyle(element);
      const r = element.getBoundingClientRect();
      return r.width > 0 && r.height > 0 && style.display !== "none" && style.visibility !== "hidden";
    };
    const columnCount = (selector: string) => {
      const nodes = Array.from(document.querySelectorAll<HTMLElement>(selector));
      const firstTop = nodes[0]?.getBoundingClientRect().top ?? 0;
      return nodes.filter((node) => Math.abs(node.getBoundingClientRect().top - firstTop) <= 2).length || 0;
    };
    const visibleElements = Array.from(document.querySelectorAll<HTMLElement>("body *")).filter(visibleForFont);
    const h1 = document.querySelector<HTMLElement>("main h1");
    const focusTarget = document.querySelector<HTMLElement>(".lgo-skip-link");
    focusTarget?.focus();
    return {
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      scrollHeight: document.documentElement.scrollHeight,
      h1Font: h1 ? Number.parseFloat(getComputedStyle(h1).fontSize) : 0,
      maxFont: Math.max(...visibleElements.map((element) => Number.parseFloat(getComputedStyle(element).fontSize) || 0)),
      heroBottom: rect(".lgo-downloadtrustpage-stack .lgo-download-trust-hero-card").bottom,
      trustGateTop: rect(".lgo-downloadtrustpage-stack .lgo-trust-panel").top,
      trustGateBottom: rect(".lgo-downloadtrustpage-stack .lgo-trust-panel").bottom,
      firstGatesTop: rect(".lgo-downloadtrustpage-stack .lgo-download-trust-first-gates").top,
      ownerGateTop: rect(".lgo-downloadtrustpage-stack .lgo-owner-release-gate-board").top,
      releaseNarrativeTop: rect(".lgo-downloadtrustpage-stack .lgo-release-narrative-stage").top,
      designBoardTop: rect(".lgo-downloadtrustpage-stack .lgo-release-trust-board").top,
      releaseEvidenceTop: rect(".lgo-downloadtrustpage-stack .lgo-release-evidence").top,
      statusDepthTop: rect(".lgo-downloadtrustpage-stack .lgo-download-depth").top,
      secondaryTop: rect(".lgo-downloadtrustpage-stack .lgo-download-trust-secondary").top,
      designBandTop: rect(".lgo-design-target-band").top,
      trustGateColumns: columnCount(".lgo-downloadtrustpage-stack .lgo-trust-panel .lgo-card"),
      firstGateColumns: columnCount(".lgo-downloadtrustpage-stack .lgo-download-trust-first-gates > *"),
      ownerGateColumns: columnCount(".lgo-downloadtrustpage-stack .lgo-owner-release-gate-card"),
      releaseEvidenceColumns: columnCount(".lgo-downloadtrustpage-stack .lgo-release-evidence-item"),
      secondaryChildren: document.querySelectorAll(".lgo-downloadtrustpage-stack .lgo-download-trust-secondary > *").length,
      focusLabel: document.activeElement?.textContent?.trim() ?? "",
      firstFlowText: [
        ".lgo-design-target-reference",
        ".lgo-downloadtrustpage-stack .lgo-download-trust-hero-card",
        ".lgo-downloadtrustpage-stack .lgo-trust-panel",
        ".lgo-downloadtrustpage-stack .lgo-download-trust-first-gates",
      ].map((selector) => document.querySelector<HTMLElement>(selector)?.textContent ?? "").join("\n"),
    };
  });
}

test.describe("download trust real UI layout v1.219", () => {
  test("/download/trust renders compact Vietnamese trust-gate flow", async ({ page, isMobile }) => {
    await page.goto(`${web}/download/trust`);
    await expect(page.getByRole("heading", { level: 1, name: "Tin cậy tải game" })).toBeVisible();
    await expect(page.getByRole("link", { name: /Thiết kế chi tiết tin cậy tải game/i })).toBeVisible();

    const metrics = await collectDownloadTrustRealMetrics(page);
    console.log(JSON.stringify({ viewport: isMobile ? "mobile" : "desktop", metrics }, null, 2));

    await page.evaluate(() => (document.activeElement as HTMLElement | null)?.blur());
    await page.screenshot({ path: isMobile ? "/tmp/download-trust-mobile-v1219.png" : "/tmp/download-trust-desktop-v1219.png", fullPage: true });

    expect(metrics.overflow, "download trust page horizontal overflow").toBeLessThanOrEqual(0);
    expect(metrics.firstFlowText, "download trust first-flow stays Vietnamese").toContain("Tin cậy tải game");
    expect(metrics.firstFlowText, "download trust target label remains Vietnamese").toContain("Thiết kế chi tiết tin cậy tải game");
    expect(metrics.focusLabel, "skip link can receive focus").toContain("Bỏ qua menu");

    if (isMobile) {
      expect(metrics.h1Font, "mobile download trust h1 compact").toBeLessThanOrEqual(38);
      expect(metrics.maxFont, "mobile visible font cap").toBeLessThanOrEqual(38);
      expect(metrics.heroBottom, "mobile trust hero does not dominate first-flow").toBeLessThanOrEqual(620);
      expect(metrics.trustGateTop, "mobile trust gate follows hero quickly").toBeLessThanOrEqual(760);
      expect(metrics.firstGatesTop, "mobile first gates stay in reviewable flow").toBeLessThanOrEqual(1550);
      expect(metrics.releaseEvidenceTop, "mobile release evidence stays before secondary proof").toBeLessThanOrEqual(2600);
      expect(metrics.secondaryTop, "mobile secondary disclosure stays after primary trust flow").toBeGreaterThan(metrics.releaseEvidenceTop);
      expect(metrics.scrollHeight, "mobile page height remains reviewable").toBeLessThanOrEqual(3900);
      expect(metrics.trustGateColumns, "mobile keeps dense trust-gate grid").toBeGreaterThanOrEqual(2);
      expect(metrics.ownerGateColumns, "mobile keeps dense owner-gate grid").toBeGreaterThanOrEqual(2);
      expect(metrics.releaseEvidenceColumns, "mobile keeps dense release-evidence grid").toBeGreaterThanOrEqual(2);
    } else {
      expect(metrics.h1Font, "desktop download trust h1 compact").toBeLessThanOrEqual(52);
      expect(metrics.maxFont, "desktop visible font cap").toBeLessThanOrEqual(52);
      expect(metrics.heroBottom, "desktop hero leaves room for trust gates").toBeLessThanOrEqual(410);
      expect(metrics.trustGateTop, "desktop trust gate enters first flow").toBeLessThanOrEqual(430);
      expect(metrics.firstGatesTop, "desktop first gates follow trust board").toBeLessThanOrEqual(850);
      expect(metrics.releaseEvidenceTop, "desktop release evidence remains in reviewable flow").toBeLessThanOrEqual(1450);
      expect(metrics.scrollHeight, "desktop page height remains reviewable").toBeLessThanOrEqual(2300);
      expect(metrics.trustGateColumns, "desktop keeps trust gates dense").toBeGreaterThanOrEqual(4);
      expect(metrics.firstGateColumns, "desktop keeps first gates in one row").toBeGreaterThanOrEqual(2);
      expect(metrics.releaseEvidenceColumns, "desktop keeps release evidence dense").toBeGreaterThanOrEqual(4);
    }
  });
});
