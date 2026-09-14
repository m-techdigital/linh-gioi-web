import { test, expect } from "@playwright/test";

const web = process.env.LGO_WEB_URL ?? "http://127.0.0.1:3000";

type Metrics = {
  overflow: number;
  h1Font: number;
  maxHeadingFont: number;
  heroBottom: number;
  designTop: number;
  designBottom: number;
  fixtureTop: number;
  explanationTop: number;
  trustTop: number;
  disclosureTop: number;
  disclosureCount: number;
  expandedBoards: number;
  scrollHeight: number;
  fixtureColumns: number;
  explanationColumns: number;
  trustColumns: number;
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
    const hero = document.querySelector<HTMLElement>(".lgo-status-hero-card");
    const design = document.querySelector<HTMLElement>(".lgo-status-design-board");
    const fixture = document.querySelector<HTMLElement>(".lgo-status-fixture-board");
    const explanation = document.querySelector<HTMLElement>(".lgo-status-explainers");
    const trust = document.querySelector<HTMLElement>(".lgo-status-trust");
    const disclosure = document.querySelector<HTMLElement>(".lgo-statuspage-stack .lgo-service-disclosure-stack");
    const active = document.activeElement as HTMLElement | null;
    return {
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      h1Font: font("main h1"),
      maxHeadingFont,
      heroBottom: rect(".lgo-status-hero-card").bottom,
      designTop: rect(".lgo-status-design-board").top,
      designBottom: rect(".lgo-status-design-board").bottom,
      fixtureTop: fixture ? fixture.getBoundingClientRect().top : -1,
      explanationTop: explanation ? explanation.getBoundingClientRect().top : -1,
      trustTop: trust ? trust.getBoundingClientRect().top : -1,
      disclosureTop: disclosure ? disclosure.getBoundingClientRect().top : -1,
      disclosureCount: document.querySelectorAll(".lgo-statuspage-stack .lgo-service-disclosure-stack").length,
      expandedBoards: document.querySelectorAll(".lgo-statuspage-stack > .lgo-panel, .lgo-statuspage-stack > .lgo-card, .lgo-statuspage-stack > section, .lgo-statuspage-stack > figure").length,
      scrollHeight: document.documentElement.scrollHeight,
      fixtureColumns: columnCount(".lgo-status-fixture-board .lgo-service-proof-card"),
      explanationColumns: columnCount(".lgo-status-explainers .lgo-service-proof-card"),
      trustColumns: columnCount(".lgo-status-trust .lgo-status-trust-card"),
      focusLabel: active?.innerText ?? active?.getAttribute("aria-label") ?? "",
      targetText: target?.innerText ?? "",
      firstFlowText: [target?.innerText ?? "", hero?.innerText ?? "", design?.innerText ?? "", fixture?.innerText ?? "", explanation?.innerText ?? "", trust?.innerText ?? ""].join("\n"),
    };
  });
}

test.describe("status real UI layout v1.203", () => {
  test("/status keeps the public status page compact, Vietnamese and Base First", async ({ page, isMobile }) => {
    await page.goto(`${web}/status`);
    await expect(page.getByRole("heading", { name: "Trạng thái công khai", exact: true })).toBeVisible();
    await expect(page.getByText("Không CMS").first()).toBeVisible();
    await expect(page.getByText("Không máy chủ").first()).toBeVisible();
    await expect(page.getByText("status maintenance signal board")).toHaveCount(0);

    const hero = page.locator(".lgo-status-hero-card");
    await hero.locator(".lgo-service-status-seal").first().evaluate((node: HTMLElement) => { node.tabIndex = 0; node.focus(); });

    const metrics = await collect(page);
    await page.screenshot({ path: isMobile ? "/tmp/status-mobile-v1203.png" : "/tmp/status-desktop-v1203.png", fullPage: true });
    console.log(JSON.stringify({ isMobile, metrics }, null, 2));

    expect(metrics.targetText.toLocaleLowerCase("vi-VN")).toContain("trạng thái");
    expect(metrics.firstFlowText.toLocaleLowerCase("vi-VN")).toContain("không cms");
    expect(metrics.firstFlowText.toLocaleLowerCase("vi-VN")).toContain("không máy chủ");
    expect(metrics.firstFlowText.toLocaleLowerCase("vi-VN")).toContain("không giám sát");
    expect(metrics.firstFlowText.toLocaleLowerCase("vi-VN")).toContain("công khai");
    expect(metrics.overflow, "no horizontal overflow").toBeLessThanOrEqual(0);
    expect(metrics.disclosureCount, "secondary status proof boards use shared disclosure base").toBeGreaterThanOrEqual(1);
    expect(metrics.expandedBoards, "top-level status page flow keeps only primary boards expanded").toBeLessThanOrEqual(6);
    expect(metrics.focusLabel.toLocaleLowerCase("vi-VN"), "keyboard/focus can land in hero status controls").toMatch(/không cms|không máy chủ|không giám sát/);

    if (isMobile) {
      expect(metrics.h1Font, "mobile h1 scale").toBeLessThanOrEqual(31);
      expect(metrics.maxHeadingFont, "mobile max heading scale").toBeLessThanOrEqual(32);
      expect(metrics.heroBottom, "mobile hero compact enough before design board").toBeLessThanOrEqual(640);
      expect(metrics.designTop, "mobile design board follows hero without blank gap").toBeLessThanOrEqual(720);
      expect(metrics.fixtureTop, "mobile public status fixture begins early enough").toBeLessThanOrEqual(1450);
      expect(metrics.disclosureTop, "mobile secondary evidence follows status primary proof").toBeGreaterThan(metrics.fixtureTop);
      expect(metrics.scrollHeight, "mobile page avoids always-expanded secondary route wall").toBeLessThanOrEqual(3600);
      expect(metrics.fixtureColumns, "mobile fixture content remains visible in compact status flow").toBeGreaterThanOrEqual(1);
    } else {
      expect(metrics.h1Font, "desktop h1 scale").toBeLessThanOrEqual(50);
      expect(metrics.maxHeadingFont, "desktop max heading scale").toBeLessThanOrEqual(50);
      expect(metrics.heroBottom, "desktop hero compact first fold").toBeLessThanOrEqual(430);
      expect(metrics.designTop, "desktop design board follows hero tightly").toBeLessThanOrEqual(455);
      expect(metrics.designBottom, "desktop design board remains compact").toBeLessThanOrEqual(710);
      expect(metrics.fixtureTop, "desktop status fixtures begin near first fold").toBeLessThanOrEqual(900);
      expect(metrics.disclosureTop, "desktop disclosure follows primary status proof").toBeGreaterThan(metrics.fixtureTop);
      expect(metrics.scrollHeight, "desktop page height stays focused after disclosure").toBeLessThanOrEqual(2300);
      expect(metrics.fixtureColumns, "desktop fixture content remains visible in compact status flow").toBeGreaterThanOrEqual(1);
      expect(metrics.explanationColumns, "desktop explanation cards retain dense grid when visible").toBeGreaterThanOrEqual(3);
      expect(metrics.trustColumns, "desktop trust cards retain dense grid when visible").toBeGreaterThanOrEqual(3);
    }
  });
});
