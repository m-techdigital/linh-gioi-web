import { expect, test, type Page } from "@playwright/test";

const web = process.env.LGO_WEB_URL ?? "http://127.0.0.1:3000";

type ReleaseRealMetrics = {
  overflow: number;
  scrollHeight: number;
  h1Font: number;
  maxFont: number;
  heroBottom: number;
  boardTop: number;
  boardBottom: number;
  stagesTop: number;
  stagesBottom: number;
  readinessTop: number;
  disclosureTop: number;
  designBandTop: number;
  stageColumns: number;
  disclosureChildren: number;
  focusLabel: string;
  firstFlowText: string;
};

async function collectReleaseRealMetrics(page: Page): Promise<ReleaseRealMetrics> {
  return page.evaluate(() => {
    const rect = (selector: string) => {
      const node = document.querySelector<HTMLElement>(selector);
      if (!node) return { top: -1, bottom: -1, height: 0, width: 0 };
      const r = node.getBoundingClientRect();
      return { top: r.top, bottom: r.bottom, height: r.height, width: r.width };
    };
    const visibleForFont = (element: HTMLElement) => {
      const style = getComputedStyle(element);
      const r = element.getBoundingClientRect();
      return r.width > 0 && r.height > 0 && style.display !== "none" && style.visibility !== "hidden";
    };
    const columnCount = (selector: string) => {
      const nodes = Array.from(document.querySelectorAll<HTMLElement>(selector));
      const firstTop = nodes[0]?.getBoundingClientRect().top ?? 0;
      return nodes.filter((node) => Math.abs(node.getBoundingClientRect().top - firstTop) <= 2).length || 0;
    };
    const visibleElements = Array.from(document.querySelectorAll<HTMLElement>("body *")).filter(visibleForFont);
    const h1 = document.querySelector<HTMLElement>("main h1");
    const focusTarget = document.querySelector<HTMLElement>(".lgo-skip-link");
    focusTarget?.focus();
    return {
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      scrollHeight: document.documentElement.scrollHeight,
      h1Font: h1 ? Number.parseFloat(getComputedStyle(h1).fontSize) : 0,
      maxFont: Math.max(...visibleElements.map((element) => Number.parseFloat(getComputedStyle(element).fontSize) || 0)),
      heroBottom: rect(".lgo-releasepage-stack .lgo-release-narrative-hero-card").bottom,
      boardTop: rect(".lgo-releasepage-stack .lgo-release-narrative-design-board").top,
      boardBottom: rect(".lgo-releasepage-stack .lgo-release-narrative-design-board").bottom,
      stagesTop: rect(".lgo-releasepage-stack .lgo-release-narrative-stage-board").top,
      stagesBottom: rect(".lgo-releasepage-stack .lgo-release-narrative-stage-board").bottom,
      readinessTop: rect(".lgo-releasepage-stack .lgo-release-readiness-cta").top,
      disclosureTop: rect(".lgo-releasepage-stack .lgo-release-expanded-evidence").top,
      designBandTop: rect(".lgo-design-target-band").top,
      stageColumns: columnCount(".lgo-releasepage-stack .lgo-release-narrative-item"),
      disclosureChildren: document.querySelectorAll(".lgo-releasepage-stack .lgo-release-expanded-evidence > *").length,
      focusLabel: document.activeElement?.textContent?.trim() ?? "",
      firstFlowText: [
        ".lgo-design-target-reference",
        ".lgo-releasepage-stack .lgo-release-narrative-hero-card",
        ".lgo-releasepage-stack .lgo-release-narrative-design-board",
        ".lgo-releasepage-stack .lgo-release-narrative-stage-board",
        ".lgo-releasepage-stack .lgo-release-readiness-cta",
      ].map((selector) => document.querySelector<HTMLElement>(selector)?.textContent ?? "").join("\n"),
    };
  });
}

test.describe("release real UI layout v1.220", () => {
  test("/release renders compact Vietnamese staged-release flow", async ({ page, isMobile }) => {
    await page.goto(`${web}/release`);
    await expect(page.getByRole("heading", { level: 1, name: "Hành trình phát hành" })).toBeVisible();
    await expect(page.getByRole("link", { name: /Thiết kế chi tiết phát hành/i })).toBeVisible();

    const metrics = await collectReleaseRealMetrics(page);
    console.log(JSON.stringify({ viewport: isMobile ? "mobile" : "desktop", metrics }, null, 2));

    await page.evaluate(() => (document.activeElement as HTMLElement | null)?.blur());
    await page.screenshot({ path: isMobile ? "/tmp/release-mobile-v1220.png" : "/tmp/release-desktop-v1220.png", fullPage: true });

    expect(metrics.overflow, "release page horizontal overflow").toBeLessThanOrEqual(0);
    expect(metrics.firstFlowText, "release first-flow stays Vietnamese").toContain("Từ sẵn sàng nội dung tới closed test");
    expect(metrics.firstFlowText, "release target label remains Vietnamese").toContain("Thiết kế chi tiết phát hành");
    expect(metrics.focusLabel, "skip link can receive focus").toContain("Bỏ qua menu");
    expect(metrics.disclosureChildren, "release secondary evidence is collapsed as summary/body").toBeLessThanOrEqual(2);

    if (isMobile) {
      expect(metrics.h1Font, "mobile release h1 compact").toBeLessThanOrEqual(38);
      expect(metrics.maxFont, "mobile visible font cap").toBeLessThanOrEqual(38);
      expect(metrics.heroBottom, "mobile release hero does not dominate first-flow").toBeLessThanOrEqual(620);
      expect(metrics.boardTop, "mobile release design board follows hero quickly").toBeLessThanOrEqual(760);
      expect(metrics.stagesTop, "mobile stages stay in primary flow").toBeLessThanOrEqual(1300);
      expect(metrics.readinessTop, "mobile readiness CTA follows stages").toBeLessThanOrEqual(2300);
      expect(metrics.scrollHeight, "mobile page height remains reviewable").toBeLessThanOrEqual(3900);
      expect(metrics.stageColumns, "mobile keeps dense stage rhythm").toBeGreaterThanOrEqual(2);
    } else {
      expect(metrics.h1Font, "desktop release h1 compact").toBeLessThanOrEqual(52);
      expect(metrics.maxFont, "desktop visible font cap").toBeLessThanOrEqual(52);
      expect(metrics.heroBottom, "desktop hero leaves room for visual board").toBeLessThanOrEqual(405);
      expect(metrics.boardTop, "desktop release board enters first flow").toBeLessThanOrEqual(430);
      expect(metrics.boardBottom, "desktop release board remains compact").toBeLessThanOrEqual(660);
      expect(metrics.stagesTop, "desktop stages follow design board").toBeLessThanOrEqual(900);
      expect(metrics.readinessTop, "desktop readiness CTA stays in reviewable flow").toBeLessThanOrEqual(1250);
      expect(metrics.scrollHeight, "desktop page height remains reviewable").toBeLessThanOrEqual(2300);
      expect(metrics.stageColumns, "desktop keeps stages in dense row").toBeGreaterThanOrEqual(4);
    }
  });
});
