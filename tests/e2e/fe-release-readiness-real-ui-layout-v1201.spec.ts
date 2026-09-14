import { test, expect } from "@playwright/test";

const web = process.env.LGO_WEB_URL ?? "http://127.0.0.1:3000";

type Metrics = {
  overflow: number;
  h1Font: number;
  maxHeadingFont: number;
  heroBottom: number;
  designTop: number;
  designBottom: number;
  hubTop: number;
  ownerTop: number;
  firstHubCardTop: number;
  disclosureTop: number;
  disclosureCount: number;
  expandedBoards: number;
  scrollHeight: number;
  hubColumns: number;
  ownerColumns: number;
  focusLabel: string;
  targetText: string;
  firstFlowText: string;
};

async function collect(page): Promise<Metrics> {
  return page.evaluate(() => {
    const rect = (selector: string) => {
      const node = document.querySelector<HTMLElement>(selector);
      if (!node) return { top: -1, bottom: -1, height: 0, left: -1 };
      const r = node.getBoundingClientRect();
      return { top: r.top, bottom: r.bottom, height: r.height, left: r.left };
    };
    const font = (selector: string) => {
      const node = document.querySelector<HTMLElement>(selector);
      return node ? Number.parseFloat(getComputedStyle(node).fontSize) : 0;
    };
    const maxHeadingFont = Math.max(
      ...Array.from(document.querySelectorAll<HTMLElement>("main h1, main h2, main h3")).map((node) =>
        Number.parseFloat(getComputedStyle(node).fontSize),
      ),
    );
    const columnCount = (selector: string) => {
      const nodes = Array.from(document.querySelectorAll<HTMLElement>(selector));
      const tops = new Map<number, number>();
      for (const node of nodes) {
        const top = Math.round(node.getBoundingClientRect().top);
        tops.set(top, (tops.get(top) ?? 0) + 1);
      }
      return Math.max(0, ...Array.from(tops.values()));
    };
    const target = document.querySelector<HTMLElement>(".lgo-design-target-reference");
    const hero = document.querySelector<HTMLElement>(".lgo-release-readiness-hero-card");
    const design = document.querySelector<HTMLElement>(".lgo-release-readiness-design-board");
    const hub = document.querySelector<HTMLElement>(".lgo-release-readiness-hub-board");
    const owner = document.querySelector<HTMLElement>(".lgo-owner-release-gate-board");
    const firstHubCard = document.querySelector<HTMLElement>(".lgo-release-readiness-card");
    const firstDisclosure = document.querySelector<HTMLElement>(".lgo-releasereadinesspage-stack .lgo-service-disclosure-stack");
    const active = document.activeElement as HTMLElement | null;
    return {
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      h1Font: font("main h1"),
      maxHeadingFont,
      heroBottom: rect(".lgo-release-readiness-hero-card").bottom,
      designTop: rect(".lgo-release-readiness-design-board").top,
      designBottom: rect(".lgo-release-readiness-design-board").bottom,
      hubTop: rect(".lgo-release-readiness-hub-board").top,
      ownerTop: rect(".lgo-owner-release-gate-board").top,
      firstHubCardTop: firstHubCard ? firstHubCard.getBoundingClientRect().top : -1,
      disclosureTop: firstDisclosure ? firstDisclosure.getBoundingClientRect().top : -1,
      disclosureCount: document.querySelectorAll(".lgo-releasereadinesspage-stack .lgo-service-disclosure-stack").length,
      expandedBoards: document.querySelectorAll(".lgo-releasereadinesspage-stack > .lgo-panel, .lgo-releasereadinesspage-stack > .lgo-card, .lgo-releasereadinesspage-stack > section, .lgo-releasereadinesspage-stack > figure").length,
      scrollHeight: document.documentElement.scrollHeight,
      hubColumns: columnCount(".lgo-release-readiness-hub-board .lgo-release-readiness-card"),
      ownerColumns: columnCount(".lgo-owner-release-gate-board .lgo-owner-release-gate-card"),
      focusLabel: active?.innerText ?? active?.getAttribute("aria-label") ?? "",
      targetText: target?.innerText ?? "",
      firstFlowText: [target?.innerText ?? "", hero?.innerText ?? "", design?.innerText ?? "", hub?.innerText ?? "", owner?.innerText ?? ""].join("\n"),
    };
  });
}

test.describe("release readiness real UI layout v1.201", () => {
  test("/release/readiness keeps the real readiness page compact, Vietnamese and Base First", async ({ page, isMobile }) => {
    await page.goto(`${web}/release/readiness`);
    await expect(page.getByRole("heading", { name: "Sẵn sàng phát hành" })).toBeVisible();
    const hero = page.locator(".lgo-release-readiness-hero-card");
    await expect(hero.getByRole("link", { name: "Tin cậy tải game" })).toBeVisible();
    await expect(hero.getByRole("link", { name: "Trạng thái" })).toBeVisible();
    await expect(page.getByText("Release readiness detailed design target")).toHaveCount(0);
    await expect(page.getByText("NO_ACCEPTED_BACKEND_CONTRACT").first()).toBeVisible();

    await hero.getByRole("link", { name: "Tin cậy tải game" }).focus();

    const metrics = await collect(page);
    await page.screenshot({ path: isMobile ? "/tmp/release-readiness-mobile-v1201.png" : "/tmp/release-readiness-desktop-v1201.png", fullPage: true });
    console.log(JSON.stringify({ isMobile, metrics }, null, 2));

    expect(metrics.firstFlowText.toLocaleLowerCase("vi-VN")).toContain("cổng readiness");
    expect(metrics.firstFlowText.toLocaleLowerCase("vi-VN")).toContain("cổng owner");
    expect(metrics.firstFlowText).toContain("NO_ACCEPTED_BACKEND_CONTRACT");
    expect(metrics.targetText).toContain("Public Release Readiness");
    expect(metrics.overflow, "no horizontal overflow").toBeLessThanOrEqual(0);
    expect(metrics.disclosureCount, "secondary proof boards use shared disclosure base").toBeGreaterThanOrEqual(1);
    expect(metrics.expandedBoards, "top-level page flow keeps only primary proof boards expanded").toBeLessThanOrEqual(7);
    expect(metrics.focusLabel, "keyboard reaches a hero action link early").toMatch(/Tin cậy tải game|Trạng thái|Hỗ trợ an toàn/);

    if (isMobile) {
      expect(metrics.h1Font, "mobile h1 scale").toBeLessThanOrEqual(31);
      expect(metrics.maxHeadingFont, "mobile max heading scale").toBeLessThanOrEqual(32);
      expect(metrics.heroBottom, "mobile hero compact enough before design board").toBeLessThanOrEqual(620);
      expect(metrics.designTop, "mobile design board follows hero without blank gap").toBeLessThanOrEqual(700);
      expect(metrics.hubTop, "mobile readiness hub remains in early reading flow").toBeLessThanOrEqual(1250);
      expect(metrics.ownerTop, "mobile owner gate follows readiness hub").toBeLessThanOrEqual(1850);
      expect(metrics.disclosureTop, "mobile secondary evidence is available after primary gates").toBeGreaterThan(metrics.ownerTop);
      expect(metrics.scrollHeight, "mobile page is not dominated by always-expanded secondary boards").toBeLessThanOrEqual(3900);
      expect(metrics.hubColumns, "mobile hub cards use compact two-column proof grid").toBeGreaterThanOrEqual(2);
    } else {
      expect(metrics.h1Font, "desktop h1 scale").toBeLessThanOrEqual(50);
      expect(metrics.maxHeadingFont, "desktop max heading scale").toBeLessThanOrEqual(50);
      expect(metrics.heroBottom, "desktop hero compact first fold").toBeLessThanOrEqual(430);
      expect(metrics.designTop, "desktop design board follows hero tightly").toBeLessThanOrEqual(455);
      expect(metrics.designBottom, "desktop design board remains compact").toBeLessThanOrEqual(705);
      expect(metrics.hubTop, "desktop hub starts near design target").toBeLessThanOrEqual(770);
      expect(metrics.ownerTop, "desktop owner gate stays near readiness hub").toBeLessThanOrEqual(1180);
      expect(metrics.disclosureTop, "desktop disclosure follows the primary owner gates").toBeGreaterThan(metrics.ownerTop);
      expect(metrics.scrollHeight, "desktop page height stays focused after disclosures").toBeLessThanOrEqual(2300);
      expect(metrics.hubColumns, "desktop hub cards retain dense grid").toBeGreaterThanOrEqual(3);
      expect(metrics.ownerColumns, "desktop owner gate cards retain dense grid").toBeGreaterThanOrEqual(3);
    }
  });
});
