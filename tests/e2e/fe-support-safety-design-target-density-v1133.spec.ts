import { test, expect } from "@playwright/test";

const web = process.env.LGO_WEB_URL ?? "http://127.0.0.1:3000";

type SafetyMetrics = {
  overflow: number;
  heroBottom: number;
  boardTop: number;
  boardBottom: number;
  principlesTop: number;
  issueTop: number;
  h1Size: number;
  englishLeak: string;
  designTargetScope: string;
  designTargetHref: string;
};

async function collectSafetyMetrics(page): Promise<SafetyMetrics> {
  return page.evaluate(() => {
    const rect = (selector: string) => {
      const node = document.querySelector<HTMLElement>(selector);
      if (!node) return { top: -1, bottom: -1, height: 0 };
      const r = node.getBoundingClientRect();
      return { top: r.top, bottom: r.bottom, height: r.height };
    };
    const hero = rect(".lgo-supportsafetypage-stack .lgo-detail-hero-card");
    const board = rect(".lgo-supportsafetypage-stack .lgo-safety-support-design-board");
    const principles = rect(".lgo-supportsafetypage-stack .lgo-player-safety-board");
    const issue = rect(".lgo-supportsafetypage-stack .lgo-support-issue-path-board, .lgo-supportsafetypage-stack .lgo-issue-category-board");
    const h1 = document.querySelector<HTMLElement>("main h1");
    const designTarget = document.querySelector<HTMLElement>(".lgo-design-target-reference");
    const designTargetLink = document.querySelector<HTMLAnchorElement>(".lgo-design-target-reference a[href*='support-safety-detailed-design-target-v1133.png']");
    const firstFlowText = [".lgo-detail-hero-card", ".lgo-safety-support-design-board", ".lgo-section-heading"]
      .map((selector) => document.querySelector<HTMLElement>(selector)?.textContent ?? "")
      .join(" ");
    const englishLeak = /(Safety support|No live ticket|account lookup|moderation backend|static public guidance|support ticket backend|production support SLA|Game reference art|live ticketing)/i.exec(firstFlowText)?.[0] ?? "";
    return {
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      heroBottom: hero.bottom,
      boardTop: board.top,
      boardBottom: board.bottom,
      principlesTop: principles.top,
      issueTop: issue.top,
      h1Size: h1 ? Number.parseFloat(getComputedStyle(h1).fontSize) : 0,
      englishLeak,
      designTargetScope: designTarget?.textContent ?? "",
      designTargetHref: designTargetLink?.getAttribute("href") ?? "",
    };
  });
}

test.describe("support safety Vietnamese design target density", () => {
  test("/support/safety attaches Public Support Safety target and keeps safe reporting readable", async ({ page, isMobile }) => {
    await page.goto(`${web}/support/safety`);
    await expect(page.getByRole("region", { name: /Design target reference.*Public Support Safety/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Báo lỗi an toàn cho người chơi mới" })).toBeVisible();
    await expect(page.locator(".lgo-safety-support-design-board").getByText("không gửi dữ liệu nhạy cảm", { exact: false })).toBeVisible();
    const metrics = await collectSafetyMetrics(page);
    expect(metrics.designTargetScope, "Public Support Safety target scope").toContain("Public Support Safety");
    expect(metrics.designTargetHref, "support safety design target href").toContain("support-safety-detailed-design-target-v1133.png");
    expect(metrics.englishLeak, "support/safety first-flow visible copy should be Vietnamese").toBe("");
    expect(metrics.overflow, "support/safety horizontal overflow").toBeLessThanOrEqual(0);
    expect(metrics.h1Size, "support/safety h1 follows target scale").toBeLessThanOrEqual(isMobile ? 54 : 60);
    if (!isMobile) {
      expect(metrics.heroBottom, "desktop support/safety hero leaves space for safety board").toBeLessThanOrEqual(560);
      expect(metrics.boardTop, "desktop support/safety board enters first fold").toBeLessThanOrEqual(780);
      expect(metrics.boardBottom, "desktop support/safety board remains compact").toBeLessThanOrEqual(1060);
      expect(metrics.principlesTop, "desktop safety principles stay near safe-reporting flow").toBeLessThanOrEqual(1500);
      expect(metrics.issueTop, "desktop issue routing remains discoverable").toBeLessThanOrEqual(2200);
    } else {
      expect(metrics.heroBottom, "mobile support/safety hero does not force extreme blank fold").toBeLessThanOrEqual(1500);
    }
  });
});
