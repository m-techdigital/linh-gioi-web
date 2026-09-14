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
  faqDiscoveryTop: number;
  issueTop: number;
  helpfulnessTop: number;
  disclosureTop: number;
  disclosureCount: number;
  expandedBoards: number;
  scrollHeight: number;
  routeColumns: number;
  faqDiscoveryColumns: number;
  issueColumns: number;
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
    const hero = document.querySelector<HTMLElement>(".lgo-detail-hero-card");
    const design = document.querySelector<HTMLElement>(".lgo-support-help-design-board");
    const route = document.querySelector<HTMLElement>(".lgo-support-help-route-board");
    const faqDiscovery = document.querySelector<HTMLElement>(".lgo-faq-discovery-board");
    const issue = document.querySelector<HTMLElement>(".lgo-issue-category-board");
    const helpfulness = document.querySelector<HTMLElement>(".lgo-faq-helpfulness-board");
    const disclosure = document.querySelector<HTMLElement>(".lgo-supporthelppage-stack .lgo-service-disclosure-stack");
    const active = document.activeElement as HTMLElement | null;
    return {
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      h1Font: font("main h1"),
      maxHeadingFont,
      heroBottom: rect(".lgo-detail-hero-card").bottom,
      designTop: rect(".lgo-support-help-design-board").top,
      designBottom: rect(".lgo-support-help-design-board").bottom,
      routeTop: route ? route.getBoundingClientRect().top : -1,
      faqDiscoveryTop: faqDiscovery ? faqDiscovery.getBoundingClientRect().top : -1,
      issueTop: issue ? issue.getBoundingClientRect().top : -1,
      helpfulnessTop: helpfulness ? helpfulness.getBoundingClientRect().top : -1,
      disclosureTop: disclosure ? disclosure.getBoundingClientRect().top : -1,
      disclosureCount: document.querySelectorAll(".lgo-supporthelppage-stack .lgo-service-disclosure-stack").length,
      expandedBoards: document.querySelectorAll(".lgo-supporthelppage-stack > .lgo-panel, .lgo-supporthelppage-stack > .lgo-card, .lgo-supporthelppage-stack > section, .lgo-supporthelppage-stack > figure").length,
      scrollHeight: document.documentElement.scrollHeight,
      routeColumns: columnCount(".lgo-support-help-route-board .lgo-support-help-route-card"),
      faqDiscoveryColumns: columnCount(".lgo-faq-discovery-board .lgo-faq-discovery-card"),
      issueColumns: columnCount(".lgo-issue-category-board .lgo-issue-category-item"),
      focusLabel: active?.innerText ?? active?.getAttribute("aria-label") ?? "",
      targetText: target?.innerText ?? "",
      firstFlowText: [target?.innerText ?? "", hero?.innerText ?? "", design?.innerText ?? "", route?.innerText ?? "", faqDiscovery?.innerText ?? "", issue?.innerText ?? "", helpfulness?.innerText ?? ""].join("\n"),
    };
  });
}

test.describe("support help real UI layout v1.205", () => {
  test("/support/help keeps the FAQ route map compact, Vietnamese and Base First", async ({ page, isMobile }) => {
    await page.goto(`${web}/support/help`);
    await expect(page.getByRole("heading", { name: "FAQ nhanh", exact: true })).toBeVisible();
    await expect(page.getByText("không có ticket thật").first()).toBeVisible();
    await expect(page.getByText("support help route map")).toHaveCount(0);

    await page.locator(".lgo-detail-hero-card .lgo-link-button").first().focus();

    const metrics = await collect(page);
    await page.screenshot({ path: isMobile ? "/tmp/support-help-mobile-v1205.png" : "/tmp/support-help-desktop-v1205.png", fullPage: true });
    console.log(JSON.stringify({ isMobile, metrics }, null, 2));

    expect(metrics.targetText.toLocaleLowerCase("vi-VN")).toMatch(/trợ giúp|hỗ trợ|faq/);
    expect(metrics.firstFlowText.toLocaleLowerCase("vi-VN")).toContain("không có ticket thật");
    expect(metrics.firstFlowText.toLocaleLowerCase("vi-VN")).toContain("báo lỗi an toàn");
    expect(metrics.firstFlowText.toLocaleLowerCase("vi-VN")).toContain("tải game");
    expect(metrics.overflow, "no horizontal overflow").toBeLessThanOrEqual(0);
    expect(metrics.disclosureCount, "secondary support-help proof boards use shared disclosure base").toBeGreaterThanOrEqual(1);
    expect(metrics.expandedBoards, "top-level support-help flow keeps only primary boards expanded").toBeLessThanOrEqual(6);
    expect(metrics.focusLabel.toLocaleLowerCase("vi-VN"), "keyboard/focus can land in hero FAQ actions").toMatch(/độ tin cậy tải game|gói tester|báo lỗi an toàn/);

    if (isMobile) {
      expect(metrics.h1Font, "mobile h1 scale").toBeLessThanOrEqual(31);
      expect(metrics.maxHeadingFont, "mobile max heading scale").toBeLessThanOrEqual(32);
      expect(metrics.heroBottom, "mobile hero compact enough before design board").toBeLessThanOrEqual(620);
      expect(metrics.designTop, "mobile design board follows hero without blank gap").toBeLessThanOrEqual(700);
      expect(metrics.routeTop, "mobile FAQ route map begins early enough").toBeLessThanOrEqual(1200);
      expect(metrics.disclosureTop, "mobile secondary evidence follows primary FAQ proof").toBeGreaterThan(metrics.routeTop);
      expect(metrics.scrollHeight, "mobile page avoids always-expanded secondary route wall").toBeLessThanOrEqual(3420);
      expect(metrics.routeColumns, "mobile route map uses compact two-column cards").toBeGreaterThanOrEqual(2);
    } else {
      expect(metrics.h1Font, "desktop h1 scale").toBeLessThanOrEqual(50);
      expect(metrics.maxHeadingFont, "desktop max heading scale").toBeLessThanOrEqual(50);
      expect(metrics.heroBottom, "desktop hero compact first fold").toBeLessThanOrEqual(430);
      expect(metrics.designTop, "desktop design board follows hero tightly").toBeLessThanOrEqual(455);
      expect(metrics.designBottom, "desktop design board remains compact").toBeLessThanOrEqual(720);
      expect(metrics.routeTop, "desktop FAQ route map begins near first fold").toBeLessThanOrEqual(850);
      expect(metrics.disclosureTop, "desktop disclosure follows primary FAQ proof").toBeGreaterThan(metrics.routeTop);
      expect(metrics.scrollHeight, "desktop page height stays focused after disclosure").toBeLessThanOrEqual(2300);
      expect(metrics.routeColumns, "desktop route cards retain dense grid").toBeGreaterThanOrEqual(6);
      expect(metrics.faqDiscoveryColumns, "desktop FAQ discovery cards retain dense grid when visible").toBeGreaterThanOrEqual(6);
      expect(metrics.issueColumns, "desktop issue cards retain dense grid when visible").toBeGreaterThanOrEqual(2);
    }
  });
});
