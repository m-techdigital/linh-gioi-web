import { test, expect, type Page } from "@playwright/test";

const web = process.env.LGO_WEB_URL ?? "http://127.0.0.1:3000";

type Metrics = {
  overflow: number;
  h1Font: number;
  maxHeadingFont: number;
  heroBottom: number;
  designTop: number;
  designBottom: number;
  focusTop: number;
  plazaTop: number;
  readinessTop: number;
  onboardingTop: number;
  disclosureTop: number;
  disclosureCount: number;
  expandedBoards: number;
  scrollHeight: number;
  focusColumns: number;
  plazaColumns: number;
  readinessColumns: number;
  onboardingColumns: number;
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
    const design = document.querySelector<HTMLElement>(".lgo-community-design-board");
    const focus = document.querySelector<HTMLElement>(".lgo-community-focus-board");
    const plaza = document.querySelector<HTMLElement>(".lgo-community-real-plaza-panel");
    const readiness = document.querySelector<HTMLElement>("[aria-labelledby='community-readiness-depth-heading']");
    const onboarding = document.querySelector<HTMLElement>(".lgo-onboarding-paths");
    const disclosure = document.querySelector<HTMLElement>(".lgo-communitypage-stack .lgo-service-disclosure-stack");
    const active = document.activeElement as HTMLElement | null;
    return {
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      h1Font: font("main h1"),
      maxHeadingFont,
      heroBottom: rect(".lgo-detail-hero-card").bottom,
      designTop: rect(".lgo-community-design-board").top,
      designBottom: rect(".lgo-community-design-board").bottom,
      focusTop: focus ? focus.getBoundingClientRect().top : -1,
      plazaTop: plaza ? plaza.getBoundingClientRect().top : -1,
      readinessTop: readiness ? readiness.getBoundingClientRect().top : -1,
      onboardingTop: onboarding ? onboarding.getBoundingClientRect().top : -1,
      disclosureTop: disclosure ? disclosure.getBoundingClientRect().top : -1,
      disclosureCount: document.querySelectorAll(".lgo-communitypage-stack .lgo-service-disclosure-stack").length,
      expandedBoards: document.querySelectorAll(".lgo-communitypage-stack > .lgo-panel, .lgo-communitypage-stack > .lgo-card, .lgo-communitypage-stack > section, .lgo-communitypage-stack > figure, .lgo-communitypage-stack > .lgo-detail-next-steps, .lgo-communitypage-stack > .lgo-action-band, .lgo-communitypage-stack > .lgo-onboarding-cta").length,
      scrollHeight: document.documentElement.scrollHeight,
      focusColumns: columnCount(".lgo-community-focus-board .lgo-community-focus-card"),
      plazaColumns: columnCount(".lgo-community-real-plaza-panel .lgo-community-real-plaza-card"),
      readinessColumns: columnCount("[aria-labelledby='community-readiness-depth-heading'] .lgo-card"),
      onboardingColumns: columnCount(".lgo-onboarding-paths .lgo-onboarding-card"),
      focusLabel: active?.innerText ?? active?.getAttribute("aria-label") ?? "",
      targetText: target?.innerText ?? "",
      firstFlowText: [target?.innerText ?? "", hero?.innerText ?? "", design?.innerText ?? "", focus?.innerText ?? "", plaza?.innerText ?? "", readiness?.innerText ?? "", onboarding?.innerText ?? ""].join("\n"),
    };
  });
}

test.describe("community real UI layout v1.207", () => {
  test("/community keeps the plaza/community first-flow compact, Vietnamese and Base First", async ({ page, isMobile }) => {
    await page.goto(`${web}/community`);
    await expect(page.getByRole("heading", { name: "Cộng đồng Linh Giới", exact: true })).toBeVisible();
    await expect(page.getByText("chưa có trò chuyện").first()).toBeVisible();
    await expect(page.getByText("community first-flow layout")).toHaveCount(0);

    await page.locator(".lgo-detail-hero-card .lgo-link-button").first().focus();

    const metrics = await collect(page);
    await page.screenshot({ path: isMobile ? "/tmp/community-mobile-v1207.png" : "/tmp/community-desktop-v1207.png", fullPage: true });
    console.log(JSON.stringify({ isMobile, metrics }, null, 2));

    expect(metrics.targetText.toLocaleLowerCase("vi-VN")).toMatch(/cộng đồng|linh giới|quảng trường/);
    expect(metrics.firstFlowText.toLocaleLowerCase("vi-VN")).toContain("chưa có trò chuyện");
    expect(metrics.firstFlowText.toLocaleLowerCase("vi-VN")).toContain("quảng trường linh thành");
    expect(metrics.firstFlowText.toLocaleLowerCase("vi-VN")).toContain("phản hồi an toàn");
    expect(metrics.overflow, "no horizontal overflow").toBeLessThanOrEqual(0);
    expect(metrics.disclosureCount, "secondary community proof boards use shared disclosure base").toBeGreaterThanOrEqual(1);
    expect(metrics.expandedBoards, "top-level community flow keeps only primary boards expanded").toBeLessThanOrEqual(7);
    expect(metrics.focusLabel.toLocaleLowerCase("vi-VN"), "keyboard/focus can land in hero community actions").toMatch(/hòa nhập cộng đồng|phản hồi an toàn|đọc trạng thái/);

    if (isMobile) {
      expect(metrics.h1Font, "mobile h1 scale").toBeLessThanOrEqual(31);
      expect(metrics.maxHeadingFont, "mobile max heading scale").toBeLessThanOrEqual(32);
      expect(metrics.heroBottom, "mobile hero compact enough before design board").toBeLessThanOrEqual(620);
      expect(metrics.designTop, "mobile design board follows hero without blank gap").toBeLessThanOrEqual(700);
      expect(metrics.focusTop, "mobile focus cards begin early enough").toBeLessThanOrEqual(1120);
      expect(metrics.disclosureTop, "mobile secondary evidence follows primary community proof").toBeGreaterThan(metrics.readinessTop);
      expect(metrics.scrollHeight, "mobile page avoids always-expanded secondary community wall").toBeLessThanOrEqual(4300);
      expect(metrics.focusColumns, "mobile focus cards use compact two-column layout").toBeGreaterThanOrEqual(2);
    } else {
      expect(metrics.h1Font, "desktop h1 scale").toBeLessThanOrEqual(50);
      expect(metrics.maxHeadingFont, "desktop max heading scale").toBeLessThanOrEqual(50);
      expect(metrics.heroBottom, "desktop hero compact first fold").toBeLessThanOrEqual(430);
      expect(metrics.designTop, "desktop design board follows hero tightly").toBeLessThanOrEqual(455);
      expect(metrics.designBottom, "desktop design board remains compact").toBeLessThanOrEqual(720);
      expect(metrics.focusTop, "desktop focus cards begin near first fold").toBeLessThanOrEqual(860);
      expect(metrics.disclosureTop, "desktop disclosure follows primary community proof").toBeGreaterThan(metrics.readinessTop);
      expect(metrics.scrollHeight, "desktop page height stays focused after disclosure").toBeLessThanOrEqual(2850);
      expect(metrics.focusColumns, "desktop focus cards retain dense grid").toBeGreaterThanOrEqual(3);
      expect(metrics.plazaColumns, "desktop plaza screenshots retain two-column grid").toBeGreaterThanOrEqual(2);
      expect(metrics.readinessColumns, "desktop readiness cards retain dense grid when visible").toBeGreaterThanOrEqual(3);
    }
  });
});
