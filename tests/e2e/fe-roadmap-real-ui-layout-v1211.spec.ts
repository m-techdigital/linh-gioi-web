import { test, expect, type Page } from "@playwright/test";

const web = process.env.LGO_WEB_URL ?? "http://127.0.0.1:3000";

type Metrics = {
  overflow: number;
  h1Font: number;
  maxHeadingFont: number;
  heroBottom: number;
  designTop: number;
  designBottom: number;
  routeTop: number;
  listTop: number;
  disclosureTop: number;
  disclosureCount: number;
  expandedBoards: number;
  scrollHeight: number;
  stepColumns: number;
  listColumns: number;
  focusLabel: string;
  targetText: string;
  firstFlowText: string;
};

async function collect(page: Page): Promise<Metrics> {
  return page.evaluate(() => {
    const rect = (selector: string) => {
      const node = document.querySelector<HTMLElement>(selector);
      if (!node) return { top: -1, bottom: -1, height: 0 };
      const r = node.getBoundingClientRect();
      return { top: r.top, bottom: r.bottom, height: r.height };
    };
    const font = (selector: string) => {
      const node = document.querySelector<HTMLElement>(selector);
      return node ? Number.parseFloat(getComputedStyle(node).fontSize) : 0;
    };
    const columnCount = (selector: string) => {
      const nodes = Array.from(document.querySelectorAll<HTMLElement>(selector));
      const tops = new Map<number, number>();
      for (const node of nodes) {
        const top = Math.round(node.getBoundingClientRect().top);
        tops.set(top, (tops.get(top) ?? 0) + 1);
      }
      return Math.max(0, ...Array.from(tops.values()));
    };
    const maxHeadingFont = Math.max(
      ...Array.from(document.querySelectorAll<HTMLElement>("main h1, main h2, main h3")).map((node) =>
        Number.parseFloat(getComputedStyle(node).fontSize),
      ),
    );
    const target = document.querySelector<HTMLElement>(".lgo-design-target-reference");
    const hero = document.querySelector<HTMLElement>(".lgo-roadmap-hero-card");
    const design = document.querySelector<HTMLElement>(".lgo-roadmap-design-board");
    const route = document.querySelector<HTMLElement>(".lgo-roadmap-route-board");
    const list = document.querySelector<HTMLElement>(".lgo-roadmap-list-board");
    const disclosure = document.querySelector<HTMLElement>(".lgo-roadmappage-stack .lgo-service-disclosure-stack");
    const active = document.activeElement as HTMLElement | null;
    return {
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      h1Font: font("main h1"),
      maxHeadingFont,
      heroBottom: rect(".lgo-roadmap-hero-card").bottom,
      designTop: rect(".lgo-roadmap-design-board").top,
      designBottom: rect(".lgo-roadmap-design-board").bottom,
      routeTop: route ? route.getBoundingClientRect().top : -1,
      listTop: list ? list.getBoundingClientRect().top : -1,
      disclosureTop: disclosure ? disclosure.getBoundingClientRect().top : -1,
      disclosureCount: document.querySelectorAll(".lgo-roadmappage-stack .lgo-service-disclosure-stack").length,
      expandedBoards: document.querySelectorAll(".lgo-roadmappage-stack > .lgo-panel, .lgo-roadmappage-stack > .lgo-card, .lgo-roadmappage-stack > section, .lgo-roadmappage-stack > figure, .lgo-roadmappage-stack > .lgo-detail-next-steps, .lgo-roadmappage-stack > .lgo-depth-cta, .lgo-roadmappage-stack > .lgo-onboarding-cta").length,
      scrollHeight: document.documentElement.scrollHeight,
      stepColumns: columnCount(".lgo-roadmap-route-board .lgo-roadmap-step-card"),
      listColumns: columnCount(".lgo-roadmap-list-board .lgo-card"),
      focusLabel: active?.innerText ?? active?.getAttribute("aria-label") ?? "",
      targetText: target?.innerText ?? "",
      firstFlowText: [target?.innerText ?? "", hero?.innerText ?? "", design?.innerText ?? "", route?.innerText ?? "", list?.innerText ?? ""].join("\n"),
    };
  });
}

test.describe("roadmap real UI layout v1.211", () => {
  test("/roadmap keeps planning gates compact, Vietnamese and Base First", async ({ page, isMobile }) => {
    await page.goto(`${web}/roadmap`);
    await expect(page.getByRole("heading", { name: "Roadmap phát triển web", exact: true })).toBeVisible();
    await expect(page.getByText("chưa có đăng nhập thật").first()).toBeVisible();
    await expect(page.getByText("roadmap layout")).toHaveCount(0);

    await page.locator(".lgo-roadmap-hero-card .lgo-link-button").first().focus();

    const metrics = await collect(page);
    await page.screenshot({ path: isMobile ? "/tmp/roadmap-mobile-v1211.png" : "/tmp/roadmap-desktop-v1211.png", fullPage: true });
    console.log(JSON.stringify({ isMobile, metrics }, null, 2));

    expect(metrics.targetText.toLocaleLowerCase("vi-VN")).toMatch(/roadmap|service|thiết kế/);
    expect(metrics.firstFlowText.toLocaleLowerCase("vi-VN")).toContain("roadmap phát triển web");
    expect(metrics.firstFlowText.toLocaleLowerCase("vi-VN")).toContain("gate roadmap");
    expect(metrics.firstFlowText.toLocaleLowerCase("vi-VN")).toContain("các mốc public web hiện tại");
    expect(metrics.overflow, "no horizontal overflow").toBeLessThanOrEqual(0);
    expect(metrics.disclosureCount, "secondary roadmap proof boards use shared disclosure base").toBe(1);
    expect(metrics.expandedBoards, "first-flow keeps target, hero, design, route, roadmap list and one disclosure shell only").toBeLessThanOrEqual(6);
    expect(metrics.focusLabel.toLocaleLowerCase("vi-VN"), "keyboard/focus can land in hero roadmap actions").toContain("xem trạng thái");

    if (isMobile) {
      expect(metrics.h1Font, "mobile h1 scale").toBeLessThanOrEqual(31);
      expect(metrics.maxHeadingFont, "mobile heading cap").toBeLessThanOrEqual(34);
      expect(metrics.heroBottom, "mobile hero compact").toBeLessThanOrEqual(560);
      expect(metrics.designTop, "mobile design follows hero").toBeLessThanOrEqual(575);
      expect(metrics.designBottom, "mobile design board compact").toBeLessThanOrEqual(880);
      expect(metrics.routeTop, "mobile route follows design").toBeLessThanOrEqual(910);
      expect(metrics.listTop, "mobile roadmap list follows route").toBeLessThanOrEqual(1650);
      expect(metrics.disclosureTop, "mobile disclosure after core roadmap list").toBeLessThanOrEqual(2450);
      expect(metrics.scrollHeight, "mobile page height stays focused after disclosure").toBeLessThanOrEqual(3300);
      expect(metrics.stepColumns, "mobile roadmap steps keep dense two-column rhythm").toBeGreaterThanOrEqual(2);
      expect(metrics.listColumns, "mobile roadmap list remains scannable").toBeGreaterThanOrEqual(1);
    } else {
      expect(metrics.h1Font, "desktop h1 scale").toBeLessThanOrEqual(50);
      expect(metrics.maxHeadingFont, "desktop heading cap").toBeLessThanOrEqual(50);
      expect(metrics.heroBottom, "desktop hero compact").toBeLessThanOrEqual(390);
      expect(metrics.designTop, "desktop design follows hero").toBeLessThanOrEqual(405);
      expect(metrics.designBottom, "desktop design board compact").toBeLessThanOrEqual(620);
      expect(metrics.routeTop, "desktop route follows design").toBeLessThanOrEqual(655);
      expect(metrics.listTop, "desktop roadmap list follows route").toBeLessThanOrEqual(1100);
      expect(metrics.disclosureTop, "desktop disclosure after core roadmap list").toBeLessThanOrEqual(1600);
      expect(metrics.scrollHeight, "desktop page height stays focused after disclosure").toBeLessThanOrEqual(2100);
      expect(metrics.stepColumns, "desktop roadmap steps use three columns").toBeGreaterThanOrEqual(3);
      expect(metrics.listColumns, "desktop roadmap list uses multi-column rhythm").toBeGreaterThanOrEqual(3);
    }
  });
});
