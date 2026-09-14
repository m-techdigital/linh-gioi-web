import { test, expect } from "@playwright/test";

const web = process.env.LGO_WEB_URL ?? "http://127.0.0.1:3000";

type SupportHelpMetrics = {
  overflow: number;
  heroBottom: number;
  boardTop: number;
  boardBottom: number;
  discoveryTop: number;
  issueTop: number;
  h1Size: number;
  englishLeak: string;
  designTargetScope: string;
  designTargetHref: string;
};

async function collectSupportHelpMetrics(page): Promise<SupportHelpMetrics> {
  return page.evaluate(() => {
    const rect = (selector: string) => {
      const node = document.querySelector<HTMLElement>(selector);
      if (!node) return { top: -1, bottom: -1, height: 0 };
      const r = node.getBoundingClientRect();
      return { top: r.top, bottom: r.bottom, height: r.height };
    };
    const hero = rect(".lgo-supporthelppage-stack .lgo-detail-hero-card");
    const board = rect(".lgo-supporthelppage-stack .lgo-support-help-design-board");
    const discovery = rect(".lgo-supporthelppage-stack .lgo-faq-discovery-board");
    const issue = rect(".lgo-supporthelppage-stack .lgo-issue-category-board");
    const h1 = document.querySelector<HTMLElement>("main h1");
    const designTarget = document.querySelector<HTMLElement>(".lgo-design-target-reference");
    const designTargetLink = document.querySelector<HTMLAnchorElement>(".lgo-design-target-reference a[href*='support-help-detailed-design-target-v1132.png']");
    const firstFlowText = [".lgo-detail-hero-card", ".lgo-support-help-design-board", ".lgo-section-heading"]
      .map((selector) => document.querySelector<HTMLElement>(selector)?.textContent ?? "")
      .join(" ");
    const englishLeak = /(FAQ Help|no search backend|live ticket|Download trust|Tester pack|Safety support|Status boundaries|static help hub|ticket system)/i.exec(firstFlowText)?.[0] ?? "";
    return {
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      heroBottom: hero.bottom,
      boardTop: board.top,
      boardBottom: board.bottom,
      discoveryTop: discovery.top,
      issueTop: issue.top,
      h1Size: h1 ? Number.parseFloat(getComputedStyle(h1).fontSize) : 0,
      englishLeak,
      designTargetScope: designTarget?.textContent ?? "",
      designTargetHref: designTargetLink?.getAttribute("href") ?? "",
    };
  });
}

test.describe("support help Vietnamese design target density", () => {
  test("/support/help attaches Trung tâm trợ giúp target and keeps FAQ route map readable", async ({ page, isMobile }) => {
    await page.goto(`${web}/support/help`);
    await expect(page.getByRole("region", { name: /Design target reference.*Trung tâm trợ giúp/i })).toBeVisible();
    await expect(page.getByRole("heading", { level: 1, name: "FAQ nhanh" })).toBeVisible();
    await expect(page.locator(".lgo-support-help-design-board").getByText("Bản đồ câu hỏi", { exact: false })).toBeVisible();
    const metrics = await collectSupportHelpMetrics(page);
    expect(metrics.designTargetScope, "Trung tâm trợ giúp target scope").toContain("Trung tâm trợ giúp");
    expect(metrics.designTargetHref, "support help design target href").toContain("support-help-detailed-design-target-v1132.png");
    expect(metrics.englishLeak, "support/help first-flow visible copy should be Vietnamese").toBe("");
    expect(metrics.designTargetScope, "stale design-first label should not appear").not.toContain("Design Target First");
    expect(metrics.overflow, "support/help horizontal overflow").toBeLessThanOrEqual(0);
    expect(metrics.h1Size, "support/help h1 follows target scale").toBeLessThanOrEqual(isMobile ? 54 : 60);
    if (!isMobile) {
      expect(metrics.heroBottom, "desktop support/help hero leaves space for route board").toBeLessThanOrEqual(560);
      expect(metrics.boardTop, "desktop support/help board enters first fold").toBeLessThanOrEqual(780);
      expect(metrics.boardBottom, "desktop support/help board remains compact").toBeLessThanOrEqual(1060);
      expect(metrics.discoveryTop, "desktop FAQ discovery stays near first route flow").toBeLessThanOrEqual(1450);
      expect(metrics.issueTop, "desktop issue routing remains discoverable").toBeLessThanOrEqual(2100);
    } else {
      expect(metrics.heroBottom, "mobile support/help hero does not force extreme blank fold").toBeLessThanOrEqual(1500);
    }
  });
});
