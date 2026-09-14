import { test, expect } from "@playwright/test";

const web = process.env.LGO_WEB_URL ?? "http://127.0.0.1:3000";

type SupportMetrics = {
  overflow: number;
  heroBottom: number;
  boardTop: number;
  boardBottom: number;
  topicsTop: number;
  faqTop: number;
  safetyTop: number;
  h1Size: number;
  englishLeak: string;
  designTargetScope: string;
  designTargetHref: string;
};

async function collectSupportMetrics(page): Promise<SupportMetrics> {
  return page.evaluate(() => {
    const rect = (selector: string) => {
      const node = document.querySelector<HTMLElement>(selector);
      if (!node) return { top: -1, bottom: -1, height: 0 };
      const r = node.getBoundingClientRect();
      return { top: r.top, bottom: r.bottom, height: r.height };
    };
    const hero = rect(".lgo-supportpage-stack .lgo-support-hero");
    const board = rect(".lgo-supportpage-stack .lgo-support-design-board");
    const topics = rect(".lgo-supportpage-stack .lgo-support-topic-grid");
    const faq = rect(".lgo-supportpage-stack .lgo-faq-panel");
    const safety = rect(".lgo-supportpage-stack .lgo-player-safety-cta, .lgo-supportpage-stack .lgo-player-safety-board");
    const h1 = document.querySelector<HTMLElement>("main h1");
    const designTarget = document.querySelector<HTMLElement>(".lgo-design-target-reference");
    const designTargetLink = document.querySelector<HTMLAnchorElement>(".lgo-design-target-reference a[href*='support-detailed-design-target-v1131.png']");
    const firstFlowText = [".lgo-support-hero", ".lgo-support-design-board", ".lgo-support-topic-grid"]
      .map((selector) => document.querySelector<HTMLElement>(selector)?.textContent ?? "")
      .join(" ");
    const englishLeak = /(ticket backend|account lookup|ops\/admin mutation|Support guidance is static|Current behavior|No search backend)/i.exec(firstFlowText)?.[0] ?? "";
    return {
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      heroBottom: hero.bottom,
      boardTop: board.top,
      boardBottom: board.bottom,
      topicsTop: topics.top,
      faqTop: faq.top,
      safetyTop: safety.top,
      h1Size: h1 ? Number.parseFloat(getComputedStyle(h1).fontSize) : 0,
      englishLeak,
      designTargetScope: designTarget?.textContent ?? "",
      designTargetHref: designTargetLink?.getAttribute("href") ?? "",
    };
  });
}

test.describe("support Vietnamese design target density", () => {
  test("/support attaches Hỗ trợ cộng đồng target and keeps Vietnamese help flow readable", async ({ page, isMobile }) => {
    await page.goto(`${web}/support`);
    await expect(page.getByRole("region", { name: /Design target reference.*Hỗ trợ cộng đồng/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Hỗ trợ cộng đồng" })).toBeVisible();
    await expect(page.locator(".lgo-support-hero-note").getByText("Không có hệ thống ticket thật", { exact: false })).toBeVisible();
    const metrics = await collectSupportMetrics(page);
    expect(metrics.designTargetScope, "Hỗ trợ cộng đồng target scope").toContain("Hỗ trợ cộng đồng");
    expect(metrics.designTargetHref, "support design target href").toContain("support-detailed-design-target-v1131.png");
    expect(metrics.englishLeak, "support page visible copy should be Vietnamese").toBe("");
    expect(metrics.designTargetScope, "stale design-first label should not appear").not.toContain("Design Target First");
    expect(metrics.overflow, "support horizontal overflow").toBeLessThanOrEqual(0);
    expect(metrics.h1Size, "support h1 follows target scale").toBeLessThanOrEqual(isMobile ? 54 : 60);
    if (!isMobile) {
      expect(metrics.heroBottom, "desktop support hero leaves space for support board").toBeLessThanOrEqual(520);
      expect(metrics.boardTop, "desktop support board enters first fold").toBeLessThanOrEqual(760);
      expect(metrics.boardBottom, "desktop support board remains compact").toBeLessThanOrEqual(1040);
      expect(metrics.topicsTop, "desktop support topics follow board quickly").toBeLessThanOrEqual(1160);
      expect(metrics.faqTop, "desktop support FAQ stays near first help flow").toBeLessThanOrEqual(1650);
      expect(metrics.safetyTop, "desktop support safety route remains discoverable").toBeLessThanOrEqual(2150);
    } else {
      expect(metrics.heroBottom, "mobile support hero does not force extreme blank fold").toBeLessThanOrEqual(1450);
    }
  });
});
