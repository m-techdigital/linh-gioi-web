import { test, expect } from "@playwright/test";

const web = process.env.LGO_WEB_URL ?? "http://127.0.0.1:3000";

type SafetyLayoutMetrics = {
  overflow: number;
  h1Size: number;
  heroBottom: number;
  boardTop: number;
  boardBottom: number;
  headingTop: number;
  checklistTop: number;
  checklistBottom: number;
  principlesTop: number;
  issueTop: number;
  firstFlowText: string;
  staleLeak: string;
};

async function collectSafetyLayoutMetrics(page): Promise<SafetyLayoutMetrics> {
  return page.evaluate(() => {
    const rect = (selector: string) => {
      const node = document.querySelector<HTMLElement>(selector);
      if (!node) return { top: -1, bottom: -1 };
      const r = node.getBoundingClientRect();
      return { top: r.top, bottom: r.bottom };
    };
    const hero = rect(".lgo-supportsafetypage-stack .lgo-detail-hero-card");
    const board = rect(".lgo-supportsafetypage-stack .lgo-safety-support-design-board");
    const heading = rect(".lgo-supportsafetypage-stack > .lgo-section-heading");
    const checklist = rect(".lgo-supportsafetypage-stack .lgo-support-safety-checklist");
    const principles = rect(".lgo-supportsafetypage-stack .lgo-player-safety-board");
    const issue = rect(".lgo-supportsafetypage-stack .lgo-support-issue-path-board, .lgo-supportsafetypage-stack .lgo-issue-category-board");
    const h1 = document.querySelector<HTMLElement>("main h1");
    const firstFlowText = [
      ".lgo-detail-hero-card",
      ".lgo-safety-support-design-board",
      ".lgo-section-heading",
      ".lgo-support-safety-checklist",
    ].map((selector) => document.querySelector<HTMLElement>(selector)?.textContent ?? "").join(" ");
    const staleLeak = /(Design Target First|Public Support Safety|Safety support|No live ticket|account lookup|moderation backend|static public guidance|support ticket backend|production support SLA|live ticketing)/i.exec(firstFlowText)?.[0] ?? "";
    return {
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      h1Size: h1 ? Number.parseFloat(getComputedStyle(h1).fontSize) : 0,
      heroBottom: hero.bottom,
      boardTop: board.top,
      boardBottom: board.bottom,
      headingTop: heading.top,
      checklistTop: checklist.top,
      checklistBottom: checklist.bottom,
      principlesTop: principles.top,
      issueTop: issue.top,
      firstFlowText,
      staleLeak,
    };
  });
}

test.describe("support safety real UI layout v1.148", () => {
  test("/support/safety follows Vietnamese safe-reporting target with compact browser layout", async ({ page, isMobile }) => {
    await page.goto(`${web}/support/safety`);
    await expect(page.getByRole("heading", { level: 1, name: "Báo lỗi an toàn" })).toBeVisible();
    await expect(page.getByRole("region", { name: /Design target reference.*Hỗ trợ an toàn/i })).toBeVisible();
    await expect(page.locator(".lgo-safety-support-design-board img")).toHaveAttribute("alt", /Thiết kế tiếng Việt cho báo lỗi an toàn/);

    const metrics = await collectSafetyLayoutMetrics(page);
    expect(metrics.firstFlowText).toContain("Board tham chiếu");
    expect(metrics.firstFlowText).toContain("Không gửi dữ liệu nhạy cảm");
    expect(metrics.firstFlowText).toContain("Che mật khẩu");
    expect(metrics.staleLeak, "support/safety first-flow must not keep stale English/design-first copy").toBe("");
    expect(metrics.overflow, "support/safety horizontal overflow").toBeLessThanOrEqual(0);
    expect(metrics.h1Size, "support/safety h1 scale").toBeLessThanOrEqual(isMobile ? 42 : 40);

    if (!isMobile) {
      expect(metrics.heroBottom, "desktop hero compactness").toBeLessThanOrEqual(390);
      expect(metrics.boardTop, "desktop board follows hero immediately").toBeLessThanOrEqual(390);
      expect(metrics.boardBottom, "desktop board remains in first fold").toBeLessThanOrEqual(590);
      expect(metrics.headingTop, "desktop guidance heading remains near board").toBeLessThanOrEqual(620);
      expect(metrics.checklistBottom, "desktop checklist remains compact").toBeLessThanOrEqual(880);
      expect(metrics.principlesTop, "desktop principles stay discoverable").toBeLessThanOrEqual(900);
      expect(metrics.issueTop, "desktop issue routing stays discoverable").toBeLessThanOrEqual(1360);
    } else {
      expect(metrics.heroBottom, "mobile hero compactness").toBeLessThanOrEqual(550);
      expect(metrics.boardTop, "mobile board follows hero immediately").toBeLessThanOrEqual(560);
      expect(metrics.boardBottom, "mobile board stays near first viewport").toBeLessThanOrEqual(850);
      expect(metrics.headingTop, "mobile guidance heading follows board").toBeLessThanOrEqual(890);
      expect(metrics.checklistBottom, "mobile checklist remains compact").toBeLessThanOrEqual(1480);
      expect(metrics.principlesTop, "mobile principles stay discoverable").toBeLessThanOrEqual(1500);
      expect(metrics.issueTop, "mobile issue routing stays discoverable").toBeLessThanOrEqual(2600);
    }
  });
});
