import { test, expect } from "@playwright/test";

const web = process.env.LGO_WEB_URL ?? "http://127.0.0.1:3000";

type Metrics = {
  overflow: number;
  h1Font: number;
  maxHeadingFont: number;
  heroBottom: number;
  designTop: number;
  designBottom: number;
  introTop: number;
  checklistTop: number;
  feedbackTop: number;
  limitationsTop: number;
  deviceTop: number;
  disclosureTop: number;
  disclosureCount: number;
  expandedBoards: number;
  scrollHeight: number;
  checklistColumns: number;
  limitationColumns: number;
  focusLabel: string;
  targetText: string;
  firstFlowText: string;
};

async function collect(page): Promise<Metrics> {
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
    const hero = document.querySelector<HTMLElement>(".lgo-closed-tester-hero-card");
    const design = document.querySelector<HTMLElement>(".lgo-closed-tester-design-board");
    const intro = document.querySelector<HTMLElement>(".lgo-testerpackpage-stack > .lgo-section-heading");
    const checklist = document.querySelector<HTMLElement>(".lgo-closed-tester-checklist-board");
    const disclosure = document.querySelector<HTMLElement>(".lgo-testerpackpage-stack .lgo-service-disclosure-stack");
    const active = document.activeElement as HTMLElement | null;
    return {
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      h1Font: font("main h1"),
      maxHeadingFont,
      heroBottom: rect(".lgo-closed-tester-hero-card").bottom,
      designTop: rect(".lgo-closed-tester-design-board").top,
      designBottom: rect(".lgo-closed-tester-design-board").bottom,
      introTop: intro ? intro.getBoundingClientRect().top : -1,
      checklistTop: checklist ? checklist.getBoundingClientRect().top : -1,
      feedbackTop: rect(".lgo-safe-feedback-template-board").top,
      limitationsTop: rect(".lgo-known-limitation-board").top,
      deviceTop: rect(".lgo-device-report-template-board").top,
      disclosureTop: disclosure ? disclosure.getBoundingClientRect().top : -1,
      disclosureCount: document.querySelectorAll(".lgo-testerpackpage-stack .lgo-service-disclosure-stack").length,
      expandedBoards: document.querySelectorAll(".lgo-testerpackpage-stack > .lgo-panel, .lgo-testerpackpage-stack > .lgo-card, .lgo-testerpackpage-stack > section, .lgo-testerpackpage-stack > figure").length,
      scrollHeight: document.documentElement.scrollHeight,
      checklistColumns: columnCount(".lgo-closed-tester-checklist-board .lgo-closed-tester-card"),
      limitationColumns: columnCount(".lgo-known-limitation-board .lgo-known-limitation-card"),
      focusLabel: active?.innerText ?? active?.getAttribute("aria-label") ?? "",
      targetText: target?.innerText ?? "",
      firstFlowText: [target?.innerText ?? "", hero?.innerText ?? "", design?.innerText ?? "", intro?.innerText ?? "", checklist?.innerText ?? ""].join("\n"),
    };
  });
}

test.describe("release tester pack real UI layout v1.202", () => {
  test("/release/tester-pack keeps the real tester pack page compact, Vietnamese and Base First", async ({ page, isMobile }) => {
    await page.goto(`${web}/release/tester-pack`);
    await expect(page.getByRole("heading", { name: "Gói tester cộng đồng", exact: true })).toBeVisible();
    await expect(page.getByText("closed tester production board")).toHaveCount(0);
    await expect(page.getByText("Không có form đăng ký").first()).toBeVisible();
    await expect(page.getByText("Không hứa slot").first()).toBeVisible();

    const hero = page.locator(".lgo-closed-tester-hero-card");
    await hero.locator(".lgo-service-status-seal").first().evaluate((node: HTMLElement) => { node.tabIndex = 0; node.focus(); });

    const metrics = await collect(page);
    await page.screenshot({ path: isMobile ? "/tmp/release-tester-pack-mobile-v1202.png" : "/tmp/release-tester-pack-desktop-v1202.png", fullPage: true });
    console.log(JSON.stringify({ isMobile, metrics }, null, 2));

    expect(metrics.targetText).toContain("Gói tester công khai");
    expect(metrics.firstFlowText.toLocaleLowerCase("vi-VN")).toContain("gói tester cộng đồng");
    expect(metrics.firstFlowText.toLocaleLowerCase("vi-VN")).toContain("checklist");
    expect(metrics.firstFlowText.toLocaleLowerCase("vi-VN")).toContain("không có form đăng ký");
    expect(metrics.overflow, "no horizontal overflow").toBeLessThanOrEqual(0);
    expect(metrics.disclosureCount, "secondary proof boards use shared disclosure base").toBeGreaterThanOrEqual(1);
    expect(metrics.expandedBoards, "top-level page flow keeps only tester pack primary boards expanded").toBeLessThanOrEqual(5);
    expect(metrics.focusLabel.toLocaleLowerCase("vi-VN"), "keyboard/focus can land in hero status controls").toMatch(/chưa mở intake|không hứa slot|feedback an toàn/);

    if (isMobile) {
      expect(metrics.h1Font, "mobile h1 scale").toBeLessThanOrEqual(31);
      expect(metrics.maxHeadingFont, "mobile max heading scale").toBeLessThanOrEqual(32);
      expect(metrics.heroBottom, "mobile hero compact enough before design board").toBeLessThanOrEqual(640);
      expect(metrics.designTop, "mobile design board follows hero without blank gap").toBeLessThanOrEqual(720);
      expect(metrics.checklistTop, "mobile checklist starts early enough").toBeLessThanOrEqual(1450);
      expect(metrics.disclosureTop, "mobile secondary evidence follows tester pack checklist").toBeGreaterThan(metrics.checklistTop);
      expect(metrics.scrollHeight, "mobile page avoids always-expanded secondary route wall").toBeLessThanOrEqual(3300);
      expect(metrics.checklistColumns, "mobile checklist uses compact two-column cards").toBeGreaterThanOrEqual(2);
    } else {
      expect(metrics.h1Font, "desktop h1 scale").toBeLessThanOrEqual(50);
      expect(metrics.maxHeadingFont, "desktop max heading scale").toBeLessThanOrEqual(50);
      expect(metrics.heroBottom, "desktop hero compact first fold").toBeLessThanOrEqual(430);
      expect(metrics.designTop, "desktop design board follows hero tightly").toBeLessThanOrEqual(455);
      expect(metrics.designBottom, "desktop design board remains compact").toBeLessThanOrEqual(710);
      expect(metrics.checklistTop, "desktop checklist begins near first fold").toBeLessThanOrEqual(920);
      expect(metrics.disclosureTop, "desktop disclosure follows primary tester pack checklist").toBeGreaterThan(metrics.checklistTop);
      expect(metrics.scrollHeight, "desktop page height stays focused after disclosure").toBeLessThanOrEqual(2300);
      expect(metrics.checklistColumns, "desktop checklist cards retain dense grid").toBeGreaterThanOrEqual(3);
      expect(metrics.limitationColumns, "desktop limitation cards retain dense grid").toBeGreaterThanOrEqual(3);
    }
  });
});
