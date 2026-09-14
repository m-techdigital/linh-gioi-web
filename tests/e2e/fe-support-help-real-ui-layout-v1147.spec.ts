import { test, expect, type Page } from "@playwright/test";

const web = process.env.LGO_WEB_URL ?? "http://127.0.0.1:3000";

type Metrics = {
  overflow: number;
  h1Size: number;
  heroBottom: number;
  boardTop: number;
  boardBottom: number;
  routeTop: number;
  routeBottom: number;
  discoveryTop: number;
  issueTop: number;
  targetText: string;
  firstFlowText: string;
};

async function collect(page: Page): Promise<Metrics> {
  return page.evaluate(() => {
    const rect = (selector: string) => {
      const node = document.querySelector<HTMLElement>(selector);
      if (!node) return { top: -1, bottom: -1 };
      const r = node.getBoundingClientRect();
      return { top: r.top, bottom: r.bottom };
    };
    const hero = rect(".lgo-supporthelppage-stack .lgo-detail-hero-card");
    const board = rect(".lgo-supporthelppage-stack .lgo-support-help-design-board");
    const route = rect(".lgo-supporthelppage-stack .lgo-support-help-route-board");
    const discovery = rect(".lgo-supporthelppage-stack .lgo-faq-discovery-board");
    const issue = rect(".lgo-supporthelppage-stack .lgo-issue-category-board");
    const h1 = document.querySelector<HTMLElement>("main h1");
    return {
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      h1Size: h1 ? Number.parseFloat(getComputedStyle(h1).fontSize) : 0,
      heroBottom: hero.bottom,
      boardTop: board.top,
      boardBottom: board.bottom,
      routeTop: route.top,
      routeBottom: route.bottom,
      discoveryTop: discovery.top,
      issueTop: issue.top,
      targetText: document.querySelector<HTMLElement>(".lgo-design-target-reference")?.textContent ?? "",
      firstFlowText: [".lgo-detail-hero-card", ".lgo-support-help-design-board", ".lgo-support-help-route-board", ".lgo-faq-discovery-board", ".lgo-issue-category-board"].map((selector) => document.querySelector<HTMLElement>(selector)?.textContent ?? "").join(" "),
    };
  });
}

test.describe("support help real UI layout v1.147", () => {
  test("/support/help follows Vietnamese FAQ route-map target with compact browser layout", async ({ page, isMobile }) => {
    await page.goto(`${web}/support/help`);
    await expect(page.getByRole("heading", { level: 1, name: "FAQ nhanh" })).toBeVisible();
    await expect(page.getByRole("img", { name: "Thiết kế tiếng Việt cho FAQ nhanh và bản đồ câu hỏi hỗ trợ" })).toBeVisible();
    await expect(page.getByText("Thiết kế chi tiết trung tâm trợ giúp")).toBeVisible();

    const m = await collect(page);
    expect(m.targetText).toContain("Trung tâm trợ giúp");
    expect(m.firstFlowText).toContain("Board tham chiếu");
    expect(m.firstFlowText).toContain("Bản đồ câu hỏi");
    expect(m.firstFlowText).toContain("Nhóm câu hỏi");
    expect(m.firstFlowText).not.toMatch(/Design Target First|Public Support Help|FAQ Help|No search|Issue-category|Download Trust|Tester Pack|Safety support|Download \/|World \/|gameplay|password|payment data|account lookup|ticket system/i);
    expect(m.overflow).toBeLessThanOrEqual(0);
    expect(m.h1Size).toBeLessThanOrEqual(isMobile ? 42 : 42);
    expect(m.heroBottom).toBeLessThan(m.boardBottom);
    expect(m.boardTop).toBeLessThan(m.routeTop);
    expect(m.routeTop).toBeLessThan(m.discoveryTop);
    expect(m.discoveryTop).toBeLessThan(m.issueTop);
    if (!isMobile) {
      expect(m.heroBottom).toBeLessThanOrEqual(430);
      expect(m.boardTop).toBeLessThanOrEqual(430);
      expect(m.boardBottom).toBeLessThanOrEqual(620);
      expect(m.routeTop).toBeLessThanOrEqual(650);
      expect(m.routeBottom).toBeLessThanOrEqual(920);
      expect(m.discoveryTop).toBeLessThanOrEqual(940);
      expect(m.issueTop).toBeLessThanOrEqual(1360);
    } else {
      expect(m.heroBottom).toBeLessThanOrEqual(560);
      expect(m.boardTop).toBeLessThanOrEqual(570);
      expect(m.boardBottom).toBeLessThanOrEqual(910);
      expect(m.routeTop).toBeLessThanOrEqual(940);
      expect(m.routeBottom).toBeLessThanOrEqual(1520);
      expect(m.discoveryTop).toBeLessThanOrEqual(1540);
      expect(m.issueTop).toBeLessThanOrEqual(2900);
    }
  });
});
