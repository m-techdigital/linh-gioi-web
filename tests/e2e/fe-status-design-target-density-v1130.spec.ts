import { test, expect } from "@playwright/test";

const web = process.env.LGO_WEB_URL ?? "http://127.0.0.1:3000";

type StatusMetrics = {
  overflow: number;
  headerBottom: number;
  boardTop: number;
  boardBottom: number;
  explanationTop: number;
  trustTop: number;
  h1Size: number;
  designTargetScope: string;
  designTargetHref: string;
};

async function collectStatusMetrics(page): Promise<StatusMetrics> {
  return page.evaluate(() => {
    const rect = (selector: string) => {
      const node = document.querySelector<HTMLElement>(selector);
      if (!node) return { top: -1, bottom: -1, height: 0 };
      const r = node.getBoundingClientRect();
      return { top: r.top, bottom: r.bottom, height: r.height };
    };
    const header = rect(".lgo-statuspage-stack .lgo-status-hero-card");
    const board = rect(".lgo-statuspage-stack .lgo-status-design-board");
    const explanation = rect(".lgo-statuspage-stack .lgo-status-explainers");
    const trust = rect(".lgo-statuspage-stack .lgo-status-trust");
    const h1 = document.querySelector<HTMLElement>("main h1");
    const designTarget = document.querySelector<HTMLElement>(".lgo-design-target-reference");
    const designTargetLink = document.querySelector<HTMLAnchorElement>(".lgo-design-target-reference a[href*='status-detailed-design-target-v1130.png']");
    return {
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      headerBottom: header.bottom,
      boardTop: board.top,
      boardBottom: board.bottom,
      explanationTop: explanation.top,
      trustTop: trust.top,
      h1Size: h1 ? Number.parseFloat(getComputedStyle(h1).fontSize) : 0,
      designTargetScope: designTarget?.textContent ?? "",
      designTargetHref: designTargetLink?.getAttribute("href") ?? "",
    };
  });
}

test.describe("status design target density", () => {
  test("/status attaches Trạng thái công khai target and keeps status trust signals readable", async ({ page, isMobile }) => {
    await page.goto(`${web}/status`);
    await expect(page.getByText("Thiết kế chi tiết trạng thái")).toBeVisible();
    const metrics = await collectStatusMetrics(page);
    expect(metrics.designTargetScope, "Trạng thái công khai target scope").toContain("Trạng thái công khai");
    expect(metrics.designTargetHref, "status design target href").toContain("status-detailed-design-target-v1130.png");
    expect(metrics.overflow, "status horizontal overflow").toBeLessThanOrEqual(0);
    expect(metrics.h1Size, "status h1 follows target scale").toBeLessThanOrEqual(isMobile ? 54 : 60);
    if (!isMobile) {
      expect(metrics.headerBottom, "desktop status hero leaves space for signal board").toBeLessThanOrEqual(500);
      expect(metrics.boardTop, "desktop status board enters first fold").toBeLessThanOrEqual(520);
      expect(metrics.boardBottom, "desktop status board remains compact").toBeLessThanOrEqual(720);
      expect(metrics.explanationTop, "desktop status explanation follows signal board").toBeLessThanOrEqual(900);
      expect(metrics.trustTop, "desktop status trust board stays near status proof flow").toBeLessThanOrEqual(1220);
    } else {
      expect(metrics.headerBottom, "mobile status hero does not force extreme blank fold").toBeLessThanOrEqual(900);
    }
  });
});
