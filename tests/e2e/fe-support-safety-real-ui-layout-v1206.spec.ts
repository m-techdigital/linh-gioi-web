import { test, expect, type Page } from "@playwright/test";

const web = process.env.LGO_WEB_URL ?? "http://127.0.0.1:3000";

type Metrics = {
  overflow: number;
  h1Font: number;
  maxHeadingFont: number;
  heroBottom: number;
  designTop: number;
  designBottom: number;
  checklistTop: number;
  principlesTop: number;
  issuePathTop: number;
  disclosureTop: number;
  disclosureCount: number;
  expandedBoards: number;
  scrollHeight: number;
  checklistColumns: number;
  principlesColumns: number;
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
    const design = document.querySelector<HTMLElement>(".lgo-safety-support-design-board");
    const checklist = document.querySelector<HTMLElement>(".lgo-support-safety-checklist");
    const principles = document.querySelector<HTMLElement>(".lgo-player-safety-board");
    const issuePath = document.querySelector<HTMLElement>(".lgo-support-issue-path-board");
    const disclosure = document.querySelector<HTMLElement>(".lgo-supportsafetypage-stack .lgo-service-disclosure-stack");
    const active = document.activeElement as HTMLElement | null;
    return {
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      h1Font: font("main h1"),
      maxHeadingFont,
      heroBottom: rect(".lgo-detail-hero-card").bottom,
      designTop: rect(".lgo-safety-support-design-board").top,
      designBottom: rect(".lgo-safety-support-design-board").bottom,
      checklistTop: checklist ? checklist.getBoundingClientRect().top : -1,
      principlesTop: principles ? principles.getBoundingClientRect().top : -1,
      issuePathTop: issuePath ? issuePath.getBoundingClientRect().top : -1,
      disclosureTop: disclosure ? disclosure.getBoundingClientRect().top : -1,
      disclosureCount: document.querySelectorAll(".lgo-supportsafetypage-stack .lgo-service-disclosure-stack").length,
      expandedBoards: document.querySelectorAll(".lgo-supportsafetypage-stack > .lgo-panel, .lgo-supportsafetypage-stack > .lgo-card, .lgo-supportsafetypage-stack > section, .lgo-supportsafetypage-stack > figure, .lgo-supportsafetypage-stack > .lgo-detail-next-steps").length,
      scrollHeight: document.documentElement.scrollHeight,
      checklistColumns: columnCount(".lgo-support-safety-checklist .lgo-support-safety-card"),
      principlesColumns: columnCount(".lgo-player-safety-board .lgo-player-safety-card"),
      issueColumns: columnCount(".lgo-support-issue-path-board .lgo-support-issue-path"),
      focusLabel: active?.innerText ?? active?.getAttribute("aria-label") ?? "",
      targetText: target?.innerText ?? "",
      firstFlowText: [target?.innerText ?? "", hero?.innerText ?? "", design?.innerText ?? "", checklist?.innerText ?? "", principles?.innerText ?? "", issuePath?.innerText ?? ""].join("\n"),
    };
  });
}

test.describe("support safety real UI layout v1.206", () => {
  test("/support/safety keeps safe-reporting guidance compact, Vietnamese and Base First", async ({ page, isMobile }) => {
    await page.goto(`${web}/support/safety`);
    await expect(page.getByRole("heading", { name: "Báo lỗi an toàn", exact: true })).toBeVisible();
    await expect(page.getByText("không gửi dữ liệu nhạy cảm").first()).toBeVisible();
    await expect(page.getByText("safe reporting layout")).toHaveCount(0);

    await page.locator(".lgo-detail-hero-card .lgo-link-button").first().focus();

    const metrics = await collect(page);
    await page.screenshot({ path: isMobile ? "/tmp/support-safety-mobile-v1206.png" : "/tmp/support-safety-desktop-v1206.png", fullPage: true });
    console.log(JSON.stringify({ isMobile, metrics }, null, 2));

    expect(metrics.targetText.toLocaleLowerCase("vi-VN")).toMatch(/an toàn|hỗ trợ|báo lỗi/);
    expect(metrics.firstFlowText.toLocaleLowerCase("vi-VN")).toContain("không gửi dữ liệu nhạy cảm");
    expect(metrics.firstFlowText.toLocaleLowerCase("vi-VN")).toContain("che mật khẩu");
    expect(metrics.firstFlowText.toLocaleLowerCase("vi-VN")).toContain("che token");
    expect(metrics.overflow, "no horizontal overflow").toBeLessThanOrEqual(0);
    expect(metrics.disclosureCount, "secondary support-safety proof boards use shared disclosure base").toBeGreaterThanOrEqual(1);
    expect(metrics.expandedBoards, "top-level support-safety flow keeps only primary boards expanded").toBeLessThanOrEqual(7);
    expect(metrics.focusLabel.toLocaleLowerCase("vi-VN"), "keyboard/focus can land in hero safety actions").toMatch(/trạm hỗ trợ|hướng dẫn an toàn|độ tin cậy tải game/);

    if (isMobile) {
      expect(metrics.h1Font, "mobile h1 scale").toBeLessThanOrEqual(31);
      expect(metrics.maxHeadingFont, "mobile max heading scale").toBeLessThanOrEqual(32);
      expect(metrics.heroBottom, "mobile hero compact enough before design board").toBeLessThanOrEqual(620);
      expect(metrics.designTop, "mobile design board follows hero without blank gap").toBeLessThanOrEqual(700);
      expect(metrics.checklistTop, "mobile safety checklist begins early enough").toBeLessThanOrEqual(1180);
      expect(metrics.disclosureTop, "mobile secondary evidence follows primary safety proof").toBeGreaterThan(metrics.issuePathTop);
      expect(metrics.scrollHeight, "mobile page avoids always-expanded secondary safety wall").toBeLessThanOrEqual(3900);
      expect(metrics.checklistColumns, "mobile checklist uses compact two-column cards").toBeGreaterThanOrEqual(2);
    } else {
      expect(metrics.h1Font, "desktop h1 scale").toBeLessThanOrEqual(50);
      expect(metrics.maxHeadingFont, "desktop max heading scale").toBeLessThanOrEqual(50);
      expect(metrics.heroBottom, "desktop hero compact first fold").toBeLessThanOrEqual(430);
      expect(metrics.designTop, "desktop design board follows hero tightly").toBeLessThanOrEqual(455);
      expect(metrics.designBottom, "desktop design board remains compact").toBeLessThanOrEqual(720);
      expect(metrics.checklistTop, "desktop checklist begins near first fold").toBeLessThanOrEqual(850);
      expect(metrics.disclosureTop, "desktop disclosure follows primary safety proof").toBeGreaterThan(metrics.issuePathTop);
      expect(metrics.scrollHeight, "desktop page height stays focused after disclosure").toBeLessThanOrEqual(2500);
      expect(metrics.checklistColumns, "desktop checklist cards retain dense grid").toBeGreaterThanOrEqual(5);
      expect(metrics.principlesColumns, "desktop principles cards retain dense grid when visible").toBeGreaterThanOrEqual(3);
      expect(metrics.issueColumns, "desktop issue path cards retain dense grid when visible").toBeGreaterThanOrEqual(2);
    }
  });
});
