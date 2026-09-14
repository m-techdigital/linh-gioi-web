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
  disclosureTop: number;
  disclosureCount: number;
  expandedBoards: number;
  scrollHeight: number;
  stepColumns: number;
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
    const hero = document.querySelector<HTMLElement>(".lgo-performance-hero-card");
    const design = document.querySelector<HTMLElement>(".lgo-performance-design-board");
    const route = document.querySelector<HTMLElement>(".lgo-performance-route-board");
    const disclosure = document.querySelector<HTMLElement>(".lgo-performancepage-stack .lgo-service-disclosure-stack");
    const active = document.activeElement as HTMLElement | null;
    return {
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      h1Font: font("main h1"),
      maxHeadingFont,
      heroBottom: rect(".lgo-performance-hero-card").bottom,
      designTop: rect(".lgo-performance-design-board").top,
      designBottom: rect(".lgo-performance-design-board").bottom,
      routeTop: route ? route.getBoundingClientRect().top : -1,
      disclosureTop: disclosure ? disclosure.getBoundingClientRect().top : -1,
      disclosureCount: document.querySelectorAll(".lgo-performancepage-stack .lgo-service-disclosure-stack").length,
      expandedBoards: document.querySelectorAll(".lgo-performancepage-stack > .lgo-panel, .lgo-performancepage-stack > .lgo-card, .lgo-performancepage-stack > section, .lgo-performancepage-stack > figure, .lgo-performancepage-stack > .lgo-detail-next-steps, .lgo-performancepage-stack > .lgo-depth-cta, .lgo-performancepage-stack > .lgo-onboarding-cta").length,
      scrollHeight: document.documentElement.scrollHeight,
      stepColumns: columnCount(".lgo-performance-route-board .lgo-performance-step-card"),
      focusLabel: active?.innerText ?? active?.getAttribute("aria-label") ?? "",
      targetText: target?.innerText ?? "",
      firstFlowText: [target?.innerText ?? "", hero?.innerText ?? "", design?.innerText ?? "", route?.innerText ?? ""].join("\n"),
    };
  });
}

test.describe("performance real UI layout v1.209", () => {
  test("/performance keeps the performance budget compact, Vietnamese and Base First", async ({ page, isMobile }) => {
    await page.goto(`${web}/performance`);
    await expect(page.getByRole("heading", { name: "Hiệu năng và ngân sách nội dung", exact: true })).toBeVisible();
    await expect(page.getByText("chưa có chứng nhận Lighthouse").first()).toBeVisible();
    await expect(page.getByText("performance layout")).toHaveCount(0);

    await page.locator(".lgo-performance-hero-card .lgo-link-button").first().focus();

    const metrics = await collect(page);
    await page.screenshot({ path: isMobile ? "/tmp/performance-mobile-v1209.png" : "/tmp/performance-desktop-v1209.png", fullPage: true });
    console.log(JSON.stringify({ isMobile, metrics }, null, 2));

    expect(metrics.targetText.toLocaleLowerCase("vi-VN")).toMatch(/performance|service|thiết kế/);
    expect(metrics.firstFlowText.toLocaleLowerCase("vi-VN")).toContain("hiệu năng");
    expect(metrics.firstFlowText.toLocaleLowerCase("vi-VN")).toContain("ngân sách đầu trang");
    expect(metrics.firstFlowText.toLocaleLowerCase("vi-VN")).toContain("mobile không bị dày");
    expect(metrics.overflow, "no horizontal overflow").toBeLessThanOrEqual(0);
    expect(metrics.disclosureCount, "secondary performance proof boards use shared disclosure base").toBe(1);
    expect(metrics.expandedBoards, "first-flow has target, hero, design, route and one disclosure shell only").toBeLessThanOrEqual(5);
    expect(metrics.focusLabel.toLocaleLowerCase("vi-VN"), "keyboard/focus can land in hero performance actions").toContain("đọc dễ hơn");

    if (isMobile) {
      expect(metrics.h1Font, "mobile h1 scale").toBeLessThanOrEqual(31);
      expect(metrics.maxHeadingFont, "mobile heading cap").toBeLessThanOrEqual(34);
      expect(metrics.heroBottom, "mobile hero compact").toBeLessThanOrEqual(560);
      expect(metrics.designTop, "mobile design follows hero").toBeLessThanOrEqual(575);
      expect(metrics.designBottom, "mobile design board compact").toBeLessThanOrEqual(880);
      expect(metrics.routeTop, "mobile route follows design").toBeLessThanOrEqual(910);
      expect(metrics.disclosureTop, "mobile disclosure after first-flow").toBeLessThanOrEqual(1650);
      expect(metrics.scrollHeight, "mobile page height stays focused after disclosure").toBeLessThanOrEqual(2500);
      expect(metrics.stepColumns, "mobile performance steps keep dense two-column rhythm").toBeGreaterThanOrEqual(2);
    } else {
      expect(metrics.h1Font, "desktop h1 scale").toBeLessThanOrEqual(50);
      expect(metrics.maxHeadingFont, "desktop heading cap").toBeLessThanOrEqual(50);
      expect(metrics.heroBottom, "desktop hero compact").toBeLessThanOrEqual(390);
      expect(metrics.designTop, "desktop design follows hero").toBeLessThanOrEqual(405);
      expect(metrics.designBottom, "desktop design board compact").toBeLessThanOrEqual(620);
      expect(metrics.routeTop, "desktop route follows design").toBeLessThanOrEqual(655);
      expect(metrics.disclosureTop, "desktop disclosure after first-flow").toBeLessThanOrEqual(1100);
      expect(metrics.scrollHeight, "desktop page height stays focused after disclosure").toBeLessThanOrEqual(1700);
      expect(metrics.stepColumns, "desktop performance steps use three columns").toBeGreaterThanOrEqual(3);
    }
  });
});
