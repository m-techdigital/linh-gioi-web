import { test, expect, type Page } from "@playwright/test";

const web = process.env.LGO_WEB_URL ?? "http://127.0.0.1:3000";

type Metrics = {
  overflow: number;
  h1Size: number;
  heroBottom: number;
  boardTop: number;
  boardBottom: number;
  fixturesTop: number;
  explainersTop: number;
  trustTop: number;
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
    const hero = rect(".lgo-statuspage-stack .lgo-status-hero-card");
    const board = rect(".lgo-statuspage-stack .lgo-status-design-board");
    const fixtures = rect(".lgo-statuspage-stack .lgo-status-fixture-board");
    const explainers = rect(".lgo-statuspage-stack .lgo-status-explainers");
    const trust = rect(".lgo-statuspage-stack .lgo-status-trust");
    const h1 = document.querySelector<HTMLElement>("main h1");
    return {
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      h1Size: h1 ? Number.parseFloat(getComputedStyle(h1).fontSize) : 0,
      heroBottom: hero.bottom,
      boardTop: board.top,
      boardBottom: board.bottom,
      fixturesTop: fixtures.top,
      explainersTop: explainers.top,
      trustTop: trust.top,
      targetText: document.querySelector<HTMLElement>(".lgo-design-target-reference")?.textContent ?? "",
      firstFlowText: [".lgo-status-hero-card", ".lgo-status-design-board", ".lgo-status-fixture-board", ".lgo-status-explainers", ".lgo-status-trust"].map((selector) => document.querySelector<HTMLElement>(selector)?.textContent ?? "").join(" "),
    };
  });
}

test.describe("status Vietnamese real UI layout v1.145", () => {
  test("/status uses Vietnamese static-status flow without oversized typography", async ({ page, isMobile }) => {
    await page.goto(`${web}/status`);
    await expect(page.getByRole("heading", { level: 1, name: "Trạng thái công khai" })).toBeVisible();
    await expect(page.getByRole("img", { name: "Board tín hiệu trạng thái công khai" })).toBeVisible();
    await expect(page.getByText("Thiết kế chi tiết trạng thái")).toBeVisible();

    const m = await collect(page);
    expect(m.targetText).toContain("Trạng thái công khai");
    expect(m.firstFlowText).toContain("Không CMS");
    expect(m.firstFlowText).toMatch(/tạm khóa/i);
    expect(m.firstFlowText).not.toMatch(/Status signal|Maintenance|Status fixture entries|Game reference art|public status|blocked surfaces|production monitoring|incident backend|live server health|release-ready|Public Status/);
    expect(m.overflow).toBeLessThanOrEqual(0);
    expect(m.h1Size).toBeLessThanOrEqual(isMobile ? 50 : 42);
    expect(m.boardTop).toBeLessThan(m.fixturesTop);
    expect(m.fixturesTop).toBeLessThan(m.explainersTop);
    expect(m.explainersTop).toBeLessThan(m.trustTop);
    if (!isMobile) {
      expect(m.heroBottom).toBeLessThanOrEqual(500);
      expect(m.boardTop).toBeLessThanOrEqual(520);
      expect(m.boardBottom).toBeLessThanOrEqual(720);
      expect(m.fixturesTop).toBeLessThanOrEqual(740);
      expect(m.explainersTop).toBeLessThanOrEqual(900);
      expect(m.trustTop).toBeLessThanOrEqual(1220);
    } else {
      expect(m.heroBottom).toBeLessThanOrEqual(900);
      expect(m.boardTop).toBeLessThanOrEqual(980);
      expect(m.fixturesTop).toBeLessThanOrEqual(1500);
    }
  });
});
