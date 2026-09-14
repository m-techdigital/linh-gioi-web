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
    const hero = document.querySelector<HTMLElement>(".lgo-detail-hero-card");
    const design = document.querySelector<HTMLElement>(".lgo-community-onboarding-design-board");
    const route = document.querySelector<HTMLElement>(".lgo-community-onboarding-route-board");
    const disclosure = document.querySelector<HTMLElement>(".lgo-community-onboardingpage-stack .lgo-service-disclosure-stack");
    const active = document.activeElement as HTMLElement | null;
    return {
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      h1Font: font("main h1"),
      maxHeadingFont,
      heroBottom: rect(".lgo-detail-hero-card").bottom,
      designTop: rect(".lgo-community-onboarding-design-board").top,
      designBottom: rect(".lgo-community-onboarding-design-board").bottom,
      routeTop: route ? route.getBoundingClientRect().top : -1,
      disclosureTop: disclosure ? disclosure.getBoundingClientRect().top : -1,
      disclosureCount: document.querySelectorAll(".lgo-community-onboardingpage-stack .lgo-service-disclosure-stack").length,
      expandedBoards: document.querySelectorAll(".lgo-community-onboardingpage-stack > .lgo-panel, .lgo-community-onboardingpage-stack > .lgo-card, .lgo-community-onboardingpage-stack > section, .lgo-community-onboardingpage-stack > figure, .lgo-community-onboardingpage-stack > .lgo-detail-next-steps, .lgo-community-onboardingpage-stack > .lgo-depth-cta, .lgo-community-onboardingpage-stack > .lgo-onboarding-cta").length,
      scrollHeight: document.documentElement.scrollHeight,
      stepColumns: columnCount(".lgo-community-onboarding-route-board .lgo-community-onboarding-step-card"),
      focusLabel: active?.innerText ?? active?.getAttribute("aria-label") ?? "",
      targetText: target?.innerText ?? "",
      firstFlowText: [target?.innerText ?? "", hero?.innerText ?? "", design?.innerText ?? "", route?.innerText ?? ""].join("\n"),
    };
  });
}

test.describe("community onboarding real UI layout v1.208", () => {
  test("/community/onboarding keeps the onboarding path compact, Vietnamese and Base First", async ({ page, isMobile }) => {
    await page.goto(`${web}/community/onboarding`);
    await expect(page.getByRole("heading", { name: "Hòa nhập cộng đồng Linh Giới", exact: true })).toBeVisible();
    await expect(page.getByText("chưa có diễn đàn").first()).toBeVisible();
    await expect(page.getByText("community onboarding layout")).toHaveCount(0);

    await page.locator(".lgo-detail-hero-card .lgo-link-button").first().focus();

    const metrics = await collect(page);
    await page.screenshot({ path: isMobile ? "/tmp/community-onboarding-mobile-v1208.png" : "/tmp/community-onboarding-desktop-v1208.png", fullPage: true });
    console.log(JSON.stringify({ isMobile, metrics }, null, 2));

    expect(metrics.targetText.toLocaleLowerCase("vi-VN")).toMatch(/cộng đồng|service|thiết kế/);
    expect(metrics.firstFlowText.toLocaleLowerCase("vi-VN")).toContain("hòa nhập cộng đồng");
    expect(metrics.firstFlowText.toLocaleLowerCase("vi-VN")).toContain("kiểm tra trạng thái");
    expect(metrics.firstFlowText.toLocaleLowerCase("vi-VN")).toContain("xem lộ trình");
    expect(metrics.overflow, "no horizontal overflow").toBeLessThanOrEqual(0);
    expect(metrics.disclosureCount, "secondary onboarding proof boards use shared disclosure base").toBeGreaterThanOrEqual(1);
    expect(metrics.expandedBoards, "top-level onboarding flow keeps only primary boards expanded").toBeLessThanOrEqual(5);
    expect(metrics.focusLabel.toLocaleLowerCase("vi-VN"), "keyboard/focus can land in hero onboarding actions").toMatch(/về cộng đồng|xem trạng thái|xem lộ trình/);

    if (isMobile) {
      expect(metrics.h1Font, "mobile h1 scale").toBeLessThanOrEqual(31);
      expect(metrics.maxHeadingFont, "mobile max heading scale").toBeLessThanOrEqual(32);
      expect(metrics.heroBottom, "mobile hero compact enough before design board").toBeLessThanOrEqual(620);
      expect(metrics.designTop, "mobile design board follows hero without blank gap").toBeLessThanOrEqual(700);
      expect(metrics.routeTop, "mobile route board begins early enough").toBeLessThanOrEqual(1180);
      expect(metrics.disclosureTop, "mobile secondary evidence follows primary onboarding proof").toBeGreaterThan(metrics.routeTop);
      expect(metrics.scrollHeight, "mobile page avoids always-expanded secondary onboarding wall").toBeLessThanOrEqual(3200);
      expect(metrics.stepColumns, "mobile route cards use compact two-column layout").toBeGreaterThanOrEqual(2);
    } else {
      expect(metrics.h1Font, "desktop h1 scale").toBeLessThanOrEqual(50);
      expect(metrics.maxHeadingFont, "desktop max heading scale").toBeLessThanOrEqual(50);
      expect(metrics.heroBottom, "desktop hero compact first fold").toBeLessThanOrEqual(430);
      expect(metrics.designTop, "desktop design board follows hero tightly").toBeLessThanOrEqual(455);
      expect(metrics.designBottom, "desktop design board remains compact").toBeLessThanOrEqual(720);
      expect(metrics.routeTop, "desktop route board begins near first fold").toBeLessThanOrEqual(850);
      expect(metrics.disclosureTop, "desktop disclosure follows primary onboarding proof").toBeGreaterThan(metrics.routeTop);
      expect(metrics.scrollHeight, "desktop page height stays focused after disclosure").toBeLessThanOrEqual(2300);
      expect(metrics.stepColumns, "desktop step cards retain dense grid").toBeGreaterThanOrEqual(3);
    }
  });
});
