import { test, expect } from "@playwright/test";

const web = process.env.LGO_WEB_URL ?? "http://127.0.0.1:3000";

type TesterPackMetrics = {
  overflow: number;
  heroBottom: number;
  boardTop: number;
  boardBottom: number;
  checklistTop: number;
  safeFeedbackTop: number;
  h1Size: number;
  designTargetScope: string;
  designTargetHref: string;
};

async function collectTesterPackMetrics(page): Promise<TesterPackMetrics> {
  return page.evaluate(() => {
    const rect = (selector: string) => {
      const node = document.querySelector<HTMLElement>(selector);
      if (!node) return { top: -1, bottom: -1, height: 0 };
      const r = node.getBoundingClientRect();
      return { top: r.top, bottom: r.bottom, height: r.height };
    };
    const hero = rect(".lgo-testerpackpage-stack .lgo-closed-tester-hero-card");
    const board = rect(".lgo-testerpackpage-stack .lgo-closed-tester-design-board");
    const checklist = rect(".lgo-testerpackpage-stack .lgo-closed-tester-checklist-board");
    const safeFeedback = rect(".lgo-testerpackpage-stack .lgo-safe-feedback-template-board");
    const h1 = document.querySelector<HTMLElement>("main h1");
    const designTarget = document.querySelector<HTMLElement>(".lgo-design-target-reference");
    const designTargetLink = document.querySelector<HTMLAnchorElement>(".lgo-design-target-reference a[href*='tester-pack-detailed-design-target-v1129.png']");
    return {
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      heroBottom: hero.bottom,
      boardTop: board.top,
      boardBottom: board.bottom,
      checklistTop: checklist.top,
      safeFeedbackTop: safeFeedback.top,
      h1Size: h1 ? Number.parseFloat(getComputedStyle(h1).fontSize) : 0,
      designTargetScope: designTarget?.textContent ?? "",
      designTargetHref: designTargetLink?.getAttribute("href") ?? "",
    };
  });
}

test.describe("tester pack design target density", () => {
  test("/release/tester-pack attaches Public Tester Pack target and keeps tester guidance readable", async ({ page, isMobile }) => {
    await page.goto(`${web}/release/tester-pack`);
    await expect(page.getByRole("region", { name: /Design target reference.*Public Tester Pack/i })).toBeVisible();
    const metrics = await collectTesterPackMetrics(page);
    expect(metrics.designTargetScope, "Public Tester Pack target scope").toContain("Public Tester Pack");
    expect(metrics.designTargetHref, "tester pack design target href").toContain("tester-pack-detailed-design-target-v1129.png");
    expect(metrics.overflow, "tester pack horizontal overflow").toBeLessThanOrEqual(0);
    expect(metrics.h1Size, "tester pack h1 follows target scale").toBeLessThanOrEqual(isMobile ? 54 : 60);
    if (!isMobile) {
      expect(metrics.heroBottom, "desktop tester pack hero leaves space for production board").toBeLessThanOrEqual(520);
      expect(metrics.boardTop, "desktop tester pack board enters first fold").toBeLessThanOrEqual(560);
      expect(metrics.boardBottom, "desktop tester pack board remains compact").toBeLessThanOrEqual(850);
      expect(metrics.checklistTop, "desktop tester checklist follows target sequence").toBeLessThanOrEqual(1120);
      expect(metrics.safeFeedbackTop, "desktop safe feedback stays near tester guidance flow").toBeLessThanOrEqual(1780);
    } else {
      expect(metrics.heroBottom, "mobile tester pack hero does not force extreme blank fold").toBeLessThanOrEqual(1450);
    }
  });
});
