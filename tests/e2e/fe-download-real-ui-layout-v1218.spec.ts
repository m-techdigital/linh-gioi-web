import { expect, test, type Page } from "@playwright/test";

const web = process.env.LGO_WEB_URL ?? "http://127.0.0.1:3000";

type DownloadRealMetrics = {
  overflow: number;
  scrollHeight: number;
  h1Font: number;
  maxFont: number;
  heroBottom: number;
  gateTop: number;
  gateHeight: number;
  readinessTop: number;
  readinessBottom: number;
  channelTop: number;
  statusDepthTop: number;
  trustGateTop: number;
  releaseChecklistTop: number;
  releaseDetailTop: number;
  designBandTop: number;
  readinessColumns: number;
  channelColumns: number;
  releaseDetailChildren: number;
  focusLabel: string;
  firstFlowText: string;
};

async function collectDownloadRealMetrics(page: Page): Promise<DownloadRealMetrics> {
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
      heroBottom: rect(".lgo-downloadpage-stack .lgo-download-player-hero").bottom,
      gateTop: rect(".lgo-downloadpage-stack .lgo-download-gate-visual").top,
      gateHeight: rect(".lgo-downloadpage-stack .lgo-download-gate-visual").height,
      readinessTop: rect(".lgo-downloadpage-stack .lgo-download-readiness-target-panel").top,
      readinessBottom: rect(".lgo-downloadpage-stack .lgo-download-readiness-target-panel").bottom,
      channelTop: rect(".lgo-downloadpage-stack .lgo-download-channel-section").top,
      statusDepthTop: rect(".lgo-downloadpage-stack .lgo-download-depth").top,
      trustGateTop: rect(".lgo-downloadpage-stack .lgo-trust-panel").top,
      releaseChecklistTop: rect(".lgo-downloadpage-stack .lgo-release-evidence").top,
      releaseDetailTop: rect(".lgo-downloadpage-stack .lgo-release-detail-stack").top,
      designBandTop: rect(".lgo-design-target-band").top,
      readinessColumns: columnCount(".lgo-downloadpage-stack .lgo-readiness-item"),
      channelColumns: columnCount(".lgo-downloadpage-stack .lgo-download-channel-section .lgo-card"),
      releaseDetailChildren: document.querySelectorAll(".lgo-downloadpage-stack .lgo-release-detail-stack > *").length,
      focusLabel: document.activeElement?.textContent?.trim() ?? "",
      firstFlowText: [
        ".lgo-design-target-reference",
        ".lgo-downloadpage-stack .lgo-download-player-hero",
        ".lgo-downloadpage-stack .lgo-download-readiness-target-panel",
        ".lgo-downloadpage-stack .lgo-download-channel-section",
        ".lgo-downloadpage-stack .lgo-download-depth",
      ].map((selector) => document.querySelector<HTMLElement>(selector)?.textContent ?? "").join("\n"),
    };
  });
}

test.describe("download real UI layout v1.218", () => {
  test("/download renders compact Vietnamese availability flow", async ({ page, isMobile }) => {
    await page.goto(`${web}/download`);
    await expect(page.getByRole("heading", { level: 1, name: "Trạng thái chơi & tải game" })).toBeVisible();
    await expect(page.getByRole("link", { name: /Thiết kế chi tiết tải game/i })).toBeVisible();

    const metrics = await collectDownloadRealMetrics(page);
    console.log(JSON.stringify({ viewport: isMobile ? "mobile" : "desktop", metrics }, null, 2));

    await page.evaluate(() => (document.activeElement as HTMLElement | null)?.blur());
    await page.screenshot({ path: isMobile ? "/tmp/download-mobile-v1218.png" : "/tmp/download-desktop-v1218.png", fullPage: true });

    expect(metrics.overflow, "download page horizontal overflow").toBeLessThanOrEqual(0);
    expect(metrics.firstFlowText, "download first-flow stays Vietnamese").toContain("Bản tải công khai hiện chưa mở");
    expect(metrics.firstFlowText, "download target label remains Vietnamese").toContain("Thiết kế chi tiết tải game");
    expect(metrics.focusLabel, "skip link can receive focus").toContain("Bỏ qua menu");

    if (isMobile) {
      expect(metrics.h1Font, "mobile download h1 compact").toBeLessThanOrEqual(38);
      expect(metrics.maxFont, "mobile visible font cap").toBeLessThanOrEqual(38);
      expect(metrics.heroBottom, "mobile download hero does not dominate first-flow").toBeLessThanOrEqual(760);
      expect(metrics.gateHeight, "mobile sealed-gate visual remains visible").toBeGreaterThanOrEqual(145);
      expect(metrics.readinessTop, "mobile reaches readiness quickly").toBeLessThanOrEqual(900);
      expect(metrics.channelTop, "mobile channels follow readiness in reviewable flow").toBeLessThanOrEqual(1700);
      expect(metrics.statusDepthTop, "mobile status depth follows primary flow").toBeLessThanOrEqual(2600);
      expect(metrics.releaseChecklistTop, "mobile release evidence remains in reviewable flow").toBeLessThanOrEqual(2300);
      expect(metrics.scrollHeight, "mobile page height remains reviewable").toBeLessThanOrEqual(3800);
      expect(metrics.readinessColumns, "mobile keeps dense readiness grid").toBeGreaterThanOrEqual(2);
      expect(metrics.channelColumns, "mobile keeps dense channel grid").toBeGreaterThanOrEqual(2);
    } else {
      expect(metrics.h1Font, "desktop download h1 compact").toBeLessThanOrEqual(52);
      expect(metrics.maxFont, "desktop visible font cap").toBeLessThanOrEqual(52);
      expect(metrics.heroBottom, "desktop hero leaves room for readiness").toBeLessThanOrEqual(470);
      expect(metrics.gateTop, "desktop sealed-gate visual sits in hero").toBeLessThanOrEqual(190);
      expect(metrics.gateHeight, "desktop sealed-gate visual remains substantial").toBeGreaterThanOrEqual(220);
      expect(metrics.readinessTop, "desktop readiness starts in first-flow").toBeLessThanOrEqual(620);
      expect(metrics.channelTop, "desktop channels follow readiness without excessive gap").toBeLessThanOrEqual(900);
      expect(metrics.statusDepthTop, "desktop status depth follows primary flow").toBeLessThanOrEqual(1250);
      expect(metrics.releaseChecklistTop, "desktop release evidence remains in reviewable flow").toBeLessThanOrEqual(1750);
      expect(metrics.scrollHeight, "desktop page height remains reviewable").toBeLessThanOrEqual(2300);
      expect(metrics.readinessColumns, "desktop keeps readiness in one dense row").toBeGreaterThanOrEqual(5);
      expect(metrics.channelColumns, "desktop keeps channels in one dense row").toBeGreaterThanOrEqual(2);
    }
  });
});
