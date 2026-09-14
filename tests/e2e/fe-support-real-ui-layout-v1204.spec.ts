import { test, expect, type Page } from "@playwright/test";

const web = process.env.LGO_WEB_URL ?? "http://127.0.0.1:3000";

type Metrics = {
  overflow: number;
  h1Font: number;
  maxHeadingFont: number;
  heroBottom: number;
  designTop: number;
  designBottom: number;
  topicTop: number;
  faqTop: number;
  safetyTop: number;
  expectationsTop: number;
  disclosureTop: number;
  disclosureCount: number;
  expandedBoards: number;
  scrollHeight: number;
  topicColumns: number;
  faqColumns: number;
  expectationsColumns: number;
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
    const hero = document.querySelector<HTMLElement>(".lgo-support-hero");
    const design = document.querySelector<HTMLElement>(".lgo-support-design-board");
    const topic = document.querySelector<HTMLElement>(".lgo-support-topic-board");
    const faq = document.querySelector<HTMLElement>(".lgo-faq-panel");
    const safety = document.querySelector<HTMLElement>(".lgo-player-safety-cta");
    const expectations = document.querySelector<HTMLElement>(".lgo-support-expectations");
    const disclosure = document.querySelector<HTMLElement>(".lgo-supportpage-stack .lgo-service-disclosure-stack");
    const active = document.activeElement as HTMLElement | null;
    return {
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      h1Font: font("main h1"),
      maxHeadingFont,
      heroBottom: rect(".lgo-support-hero").bottom,
      designTop: rect(".lgo-support-design-board").top,
      designBottom: rect(".lgo-support-design-board").bottom,
      topicTop: topic ? topic.getBoundingClientRect().top : -1,
      faqTop: faq ? faq.getBoundingClientRect().top : -1,
      safetyTop: safety ? safety.getBoundingClientRect().top : -1,
      expectationsTop: expectations ? expectations.getBoundingClientRect().top : -1,
      disclosureTop: disclosure ? disclosure.getBoundingClientRect().top : -1,
      disclosureCount: document.querySelectorAll(".lgo-supportpage-stack .lgo-service-disclosure-stack").length,
      expandedBoards: document.querySelectorAll(".lgo-supportpage-stack > .lgo-panel, .lgo-supportpage-stack > .lgo-card, .lgo-supportpage-stack > section, .lgo-supportpage-stack > figure, .lgo-supportpage-stack > .lgo-empty-state").length,
      scrollHeight: document.documentElement.scrollHeight,
      topicColumns: columnCount(".lgo-support-topic-board .lgo-service-proof-card"),
      faqColumns: columnCount(".lgo-faq-panel .lgo-faq-item"),
      expectationsColumns: columnCount(".lgo-support-expectations .lgo-support-expectation-item"),
      focusLabel: active?.innerText ?? active?.getAttribute("aria-label") ?? "",
      targetText: target?.innerText ?? "",
      firstFlowText: [target?.innerText ?? "", hero?.innerText ?? "", design?.innerText ?? "", topic?.innerText ?? "", faq?.innerText ?? "", safety?.innerText ?? "", expectations?.innerText ?? ""].join("\n"),
    };
  });
}

test.describe("support real UI layout v1.204", () => {
  test("/support keeps the community support station compact, Vietnamese and Base First", async ({ page, isMobile }) => {
    await page.goto(`${web}/support`);
    await expect(page.getByRole("heading", { name: "Hỗ trợ cộng đồng", exact: true })).toBeVisible();
    await expect(page.getByText("Không có hệ thống ticket thật").first()).toBeVisible();
    await expect(page.getByText("community support station")).toHaveCount(0);

    await page.locator(".lgo-support-hero .lgo-link-button").first().focus();

    const metrics = await collect(page);
    await page.screenshot({ path: isMobile ? "/tmp/support-mobile-v1204.png" : "/tmp/support-desktop-v1204.png", fullPage: true });
    console.log(JSON.stringify({ isMobile, metrics }, null, 2));

    expect(metrics.targetText.toLocaleLowerCase("vi-VN")).toContain("hỗ trợ");
    expect(metrics.firstFlowText.toLocaleLowerCase("vi-VN")).toContain("ticket thật");
    expect(metrics.firstFlowText.toLocaleLowerCase("vi-VN")).toContain("an toàn");
    expect(metrics.firstFlowText.toLocaleLowerCase("vi-VN")).toContain("faq");
    expect(metrics.overflow, "no horizontal overflow").toBeLessThanOrEqual(0);
    expect(metrics.disclosureCount, "secondary support proof boards use shared disclosure base").toBeGreaterThanOrEqual(1);
    expect(metrics.expandedBoards, "top-level support page flow keeps only primary boards expanded").toBeLessThanOrEqual(7);
    expect(metrics.focusLabel.toLocaleLowerCase("vi-VN"), "keyboard/focus can land in hero support actions").toMatch(/faq nhanh|báo lỗi an toàn/);

    if (isMobile) {
      expect(metrics.h1Font, "mobile h1 scale").toBeLessThanOrEqual(31);
      expect(metrics.maxHeadingFont, "mobile max heading scale").toBeLessThanOrEqual(32);
      expect(metrics.heroBottom, "mobile hero compact enough before design board").toBeLessThanOrEqual(620);
      expect(metrics.designTop, "mobile design board follows hero without blank gap").toBeLessThanOrEqual(700);
      expect(metrics.topicTop, "mobile support topics begin early enough").toBeLessThanOrEqual(1280);
      expect(metrics.disclosureTop, "mobile secondary evidence follows primary support proof").toBeGreaterThan(metrics.topicTop);
      expect(metrics.scrollHeight, "mobile page avoids always-expanded secondary route wall").toBeLessThanOrEqual(3800);
      expect(metrics.topicColumns, "mobile topic cards use compact two-column cards").toBeGreaterThanOrEqual(2);
    } else {
      expect(metrics.h1Font, "desktop h1 scale").toBeLessThanOrEqual(50);
      expect(metrics.maxHeadingFont, "desktop max heading scale").toBeLessThanOrEqual(50);
      expect(metrics.heroBottom, "desktop hero compact first fold").toBeLessThanOrEqual(430);
      expect(metrics.designTop, "desktop design board follows hero tightly").toBeLessThanOrEqual(455);
      expect(metrics.designBottom, "desktop design board remains compact").toBeLessThanOrEqual(720);
      expect(metrics.topicTop, "desktop support topics begin near first fold").toBeLessThanOrEqual(940);
      expect(metrics.disclosureTop, "desktop disclosure follows primary support proof").toBeGreaterThan(metrics.topicTop);
      expect(metrics.scrollHeight, "desktop page height stays focused after disclosure").toBeLessThanOrEqual(2600);
      expect(metrics.topicColumns, "desktop topic cards retain dense grid").toBeGreaterThanOrEqual(4);
      expect(metrics.faqColumns, "desktop FAQ cards retain dense grid when visible").toBeGreaterThanOrEqual(3);
      expect(metrics.expectationsColumns, "desktop support expectations retain dense grid when visible").toBeGreaterThanOrEqual(3);
    }
  });
});
