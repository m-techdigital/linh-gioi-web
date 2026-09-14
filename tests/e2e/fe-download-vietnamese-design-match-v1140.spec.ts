// v1.140 coverage: /download follows the Vietnamese Public Download target and first-flow layout.
import { test, expect, type Page } from "@playwright/test";

const web = process.env.LGO_WEB_URL ?? "http://127.0.0.1:3000";

type DownloadDesignMetrics = {
  overflow: number;
  h1Size: number;
  heroHeight: number;
  channelSectionTop: number;
  heroBottom: number;
  gateVisualHeight: number;
  gateVisualTop: number;
  readinessPanelTop: number;
  readinessVisibleHeight: number;
  readinessCardCount: number;
  trustBoardTop: number;
  firstFlowText: string;
  targetText: string;
};

async function collectDownloadDesignMetrics(page: Page): Promise<DownloadDesignMetrics> {
  return page.evaluate(() => {
    const rect = (selector: string) => {
      const node = document.querySelector<HTMLElement>(selector);
      if (!node) return { top: -1, bottom: -1, height: 0 };
      const r = node.getBoundingClientRect();
      return { top: r.top, bottom: r.bottom, height: r.height };
    };
    const visibleHeight = (selector: string) => {
      const r = rect(selector);
      return Math.max(0, Math.min(window.innerHeight, r.bottom) - Math.max(0, r.top));
    };
    const hero = rect(".lgo-downloadpage-stack .lgo-download-player-hero");
    const gate = rect(".lgo-downloadpage-stack .lgo-download-gate-visual");
    const readinessPanel = rect(".lgo-downloadpage-stack .lgo-download-readiness-target-panel");
    const trustBoard = rect(".lgo-downloadpage-stack .lgo-trust-panel");
    const h1 = document.querySelector<HTMLElement>("main h1");
    const target = document.querySelector<HTMLElement>(".lgo-design-target-reference");
    return {
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      h1Size: h1 ? Number.parseFloat(getComputedStyle(h1).fontSize) : 0,
      heroHeight: hero.height,
      heroBottom: hero.bottom,
      gateVisualHeight: gate.height,
      gateVisualTop: gate.top,
      readinessPanelTop: readinessPanel.top,
      channelSectionTop: rect(".lgo-downloadpage-stack .lgo-download-channel-section").top,
      readinessVisibleHeight: visibleHeight(".lgo-downloadpage-stack .lgo-download-readiness-target-panel"),
      readinessCardCount: document.querySelectorAll(".lgo-downloadpage-stack .lgo-readiness-item").length,
      trustBoardTop: trustBoard.top,
      firstFlowText: [
        target?.textContent ?? "",
        document.querySelector<HTMLElement>(".lgo-downloadpage-stack .lgo-download-player-hero")?.innerText ?? "",
        document.querySelector<HTMLElement>(".lgo-downloadpage-stack .lgo-download-readiness-target-panel")?.innerText ?? "",
        document.querySelector<HTMLElement>(".lgo-downloadpage-stack .lgo-download-channel-section")?.innerText ?? "",
      ].join("\n"),
      targetText: target?.textContent ?? "",
    };
  });
}

test.describe("download Vietnamese design match v1.140", () => {
  test("/download uses Vietnamese release-gate target copy and compact first-flow", async ({ page, isMobile }) => {
    await page.goto(`${web}/download`);
    await expect(page.getByRole("link", { name: /Thiết kế chi tiết tải game/i })).toBeVisible();
    await expect(page.getByText("Download detailed design target")).toHaveCount(0);
    const metrics = await collectDownloadDesignMetrics(page);
    expect(metrics.targetText, "download target label is Vietnamese").toContain("Thiết kế chi tiết tải game");
    expect(metrics.firstFlowText, "English implementation labels should not leak into /download first-flow").not.toMatch(/Download detailed design target|Public access|No public production download|release artifact|owner approval|No fake download|Public build|Channels|Readiness/);
    expect(metrics.overflow, "download page horizontal overflow").toBeLessThanOrEqual(0);
    expect(metrics.h1Size, "download h1 stays below giant-font threshold").toBeLessThanOrEqual(isMobile ? 52 : 68);
    expect(metrics.readinessCardCount, "download readiness checklist should expose five gates like target").toBeGreaterThanOrEqual(5);

    if (!isMobile) {
      expect(metrics.heroHeight, "desktop download hero leaves room for readiness board").toBeLessThanOrEqual(525);
      expect(metrics.gateVisualHeight, "desktop sealed-gate visual remains substantial").toBeGreaterThanOrEqual(220);
      expect(metrics.gateVisualTop, "desktop sealed-gate visual sits inside hero").toBeLessThanOrEqual(230);
      expect(metrics.readinessPanelTop, "release readiness panel starts in the opening viewport").toBeLessThanOrEqual(670);
      expect(metrics.readinessVisibleHeight, "release readiness panel visible in first fold").toBeGreaterThanOrEqual(110);
      expect(metrics.channelSectionTop, "channel cards follow readiness in the design-led first flow").toBeLessThanOrEqual(980);
      expect(metrics.trustBoardTop, "trust board follows readiness instead of replacing it").toBeGreaterThan(metrics.channelSectionTop);
    } else {
      expect(metrics.heroBottom, "mobile download hero remains readable without extreme sprawl").toBeLessThanOrEqual(1360);
      expect(metrics.readinessPanelTop, "mobile reaches readiness panel without excessive blank space").toBeLessThanOrEqual(1450);
    }
  });
});
