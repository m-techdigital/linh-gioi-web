import { test, expect, type Page } from "@playwright/test";

const web = process.env.LGO_WEB_URL ?? "http://127.0.0.1:3000";

type Metrics = {
  overflow: number;
  h1Size: number;
  heroBottom: number;
  boardTop: number;
  boardBottom: number;
  topicsTop: number;
  topicsBottom: number;
  faqTop: number;
  safetyTop: number;
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
    const hero = rect(".lgo-supportpage-stack .lgo-support-hero");
    const board = rect(".lgo-supportpage-stack .lgo-support-design-board");
    const topics = rect(".lgo-supportpage-stack .lgo-support-topic-board");
    const faq = rect(".lgo-supportpage-stack .lgo-faq-panel");
    const safety = rect(".lgo-supportpage-stack .lgo-player-safety-cta");
    const h1 = document.querySelector<HTMLElement>("main h1");
    return {
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      h1Size: h1 ? Number.parseFloat(getComputedStyle(h1).fontSize) : 0,
      heroBottom: hero.bottom,
      boardTop: board.top,
      boardBottom: board.bottom,
      topicsTop: topics.top,
      topicsBottom: topics.bottom,
      faqTop: faq.top,
      safetyTop: safety.top,
      targetText: document.querySelector<HTMLElement>(".lgo-design-target-reference")?.textContent ?? "",
      firstFlowText: [".lgo-support-hero", ".lgo-support-design-board", ".lgo-support-topic-board", ".lgo-faq-panel"].map((selector) => document.querySelector<HTMLElement>(selector)?.textContent ?? "").join(" "),
    };
  });
}

test.describe("support real UI layout v1.146", () => {
  test("/support follows Vietnamese support-station target with compact browser layout", async ({ page, isMobile }) => {
    await page.goto(`${web}/support`);
    await expect(page.getByRole("heading", { level: 1, name: "Hỗ trợ cộng đồng" })).toBeVisible();
    await expect(page.getByRole("img", { name: "Thiết kế tiếng Việt cho trạm hỗ trợ người chơi Linh Giới Online" })).toBeVisible();
    await expect(page.getByText("Thiết kế chi tiết hỗ trợ")).toBeVisible();

    const m = await collect(page);
    expect(m.targetText).toContain("Hỗ trợ cộng đồng");
    expect(m.firstFlowText).toContain("Board tham chiếu");
    expect(m.firstFlowText).toContain("FAQ nhanh");
    expect(m.firstFlowText).toContain("Hướng dẫn tạm thời");
    expect(m.firstFlowText).not.toMatch(/Design Target First|Public Support|Support guidance is static|Current behavior|No search backend|account lookup|ops\/admin mutation/i);
    expect(m.overflow).toBeLessThanOrEqual(0);
    expect(m.h1Size).toBeLessThanOrEqual(isMobile ? 50 : 42);
    expect(m.heroBottom).toBeLessThan(m.boardBottom);
    expect(m.boardTop).toBeLessThan(m.topicsTop);
    expect(m.topicsTop).toBeLessThan(m.faqTop);
    expect(m.faqTop).toBeLessThan(m.safetyTop);
    if (!isMobile) {
      expect(m.heroBottom).toBeLessThanOrEqual(390);
      expect(m.boardTop).toBeLessThanOrEqual(390);
      expect(m.boardBottom).toBeLessThanOrEqual(590);
      expect(m.topicsTop).toBeLessThanOrEqual(620);
      expect(m.topicsBottom).toBeLessThanOrEqual(900);
      expect(m.faqTop).toBeLessThanOrEqual(930);
      expect(m.safetyTop).toBeLessThanOrEqual(1360);
    } else {
      expect(m.heroBottom).toBeLessThanOrEqual(540);
      expect(m.boardTop).toBeLessThanOrEqual(560);
      expect(m.boardBottom).toBeLessThanOrEqual(850);
      expect(m.topicsTop).toBeLessThanOrEqual(900);
      expect(m.faqTop).toBeLessThanOrEqual(1500);
      expect(m.safetyTop).toBeLessThanOrEqual(2300);
    }
  });
});
