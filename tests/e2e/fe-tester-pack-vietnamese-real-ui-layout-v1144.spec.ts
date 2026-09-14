import { test, expect, type Page } from "@playwright/test";

const web = process.env.LGO_WEB_URL ?? "http://127.0.0.1:3000";

type Metrics = {
  overflow: number;
  h1Size: number;
  heroBottom: number;
  boardTop: number;
  boardBottom: number;
  headingTop: number;
  checklistTop: number;
  safeTop: number;
  knownTop: number;
  deviceTop: number;
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
    const hero = rect(".lgo-testerpackpage-stack .lgo-closed-tester-hero-card");
    const board = rect(".lgo-testerpackpage-stack .lgo-closed-tester-design-board");
    const heading = rect(".lgo-testerpackpage-stack > .lgo-section-heading");
    const checklist = rect(".lgo-testerpackpage-stack .lgo-closed-tester-checklist-board");
    const safe = rect(".lgo-testerpackpage-stack .lgo-safe-feedback-template-board");
    const known = rect(".lgo-testerpackpage-stack .lgo-known-limitation-board");
    const device = rect(".lgo-testerpackpage-stack .lgo-device-report-template-board");
    const h1 = document.querySelector<HTMLElement>("main h1");
    const targetText = document.querySelector<HTMLElement>(".lgo-design-target-reference")?.textContent ?? "";
    const firstFlowText = (document.querySelector<HTMLElement>("main")?.textContent ?? "").slice(0, 5600);
    return {
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      h1Size: h1 ? Number.parseFloat(getComputedStyle(h1).fontSize) : 0,
      heroBottom: hero.bottom,
      boardTop: board.top,
      boardBottom: board.bottom,
      headingTop: heading.top,
      checklistTop: checklist.top,
      safeTop: safe.top,
      knownTop: known.top,
      deviceTop: device.top,
      targetText,
      firstFlowText,
    };
  });
}

test.describe("tester pack Vietnamese real UI layout v1.144", () => {
  test("/release/tester-pack matches the Vietnamese tester-pack flow without oversized typography", async ({ page, isMobile }) => {
    await page.goto(`${web}/release/tester-pack`);
    await expect(page.getByRole("heading", { level: 1, name: "Gói tester cộng đồng" })).toBeVisible();
    await expect(page.getByRole("img", { name: "Board gói tester cộng đồng" })).toBeVisible();
    await expect(page.getByText("Thiết kế chi tiết gói tester")).toBeVisible();

    const m = await collect(page);
    expect(m.targetText).toContain("Thiết kế chi tiết gói tester");
    expect(m.firstFlowText).toContain("Chưa mở intake");
    expect(m.firstFlowText).toContain("Checklist chuẩn bị");
    expect(m.firstFlowText).toContain("Feedback an toàn");
    expect(m.firstFlowText).not.toMatch(/Closed tester|Release readiness|Download trust|Safety support|Tester guidance before intake|Static guidance|Safe feedback|Known limitations|Device\/report template|Safe format|Expected|Actual|Severity|Network context|Device class/);
    expect(m.overflow).toBeLessThanOrEqual(0);
    expect(m.h1Size).toBeLessThanOrEqual(isMobile ? 50 : 42);
    expect(m.boardTop).toBeLessThan(m.checklistTop);
    expect(m.checklistTop).toBeLessThan(m.safeTop);
    expect(m.safeTop).toBeLessThan(m.knownTop);
    expect(m.knownTop).toBeLessThan(m.deviceTop);
    if (!isMobile) {
      expect(m.heroBottom).toBeLessThanOrEqual(500);
      expect(m.boardTop).toBeLessThanOrEqual(500);
      expect(m.boardBottom).toBeLessThanOrEqual(700);
      expect(m.headingTop).toBeLessThanOrEqual(720);
      expect(m.checklistTop).toBeLessThanOrEqual(880);
      expect(m.safeTop).toBeLessThanOrEqual(1250);
      expect(m.deviceTop).toBeLessThanOrEqual(2050);
    } else {
      expect(m.heroBottom).toBeLessThanOrEqual(900);
      expect(m.boardTop).toBeLessThanOrEqual(980);
      expect(m.checklistTop).toBeLessThanOrEqual(1850);
    }
  });
});
