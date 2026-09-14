import { expect, test, type Page } from "@playwright/test";

const web = process.env.LGO_WEB_URL ?? "http://127.0.0.1:3000";

type JourneyRealMetrics = {
  overflow: number;
  scrollHeight: number;
  h1Font: number;
  maxFont: number;
  heroBottom: number;
  sessionTop: number;
  sessionBottom: number;
  firstBeatVisibleHeight: number;
  routeTop: number;
  routeBottom: number;
  firstRouteVisibleHeight: number;
  designBoardTop: number;
  sessionColumns: number;
  routeColumns: number;
  focusLabel: string;
  firstFlowText: string;
};

async function collectJourneyRealMetrics(page: Page): Promise<JourneyRealMetrics> {
  return page.evaluate(() => {
    const rect = (selector: string) => {
      const node = document.querySelector<HTMLElement>(selector);
      if (!node) return { top: -1, bottom: -1, height: 0, width: 0 };
      const r = node.getBoundingClientRect();
      return { top: r.top, bottom: r.bottom, height: r.height, width: r.width };
    };
    const visibleHeight = (selector: string) => {
      const r = rect(selector);
      return Math.max(0, Math.min(window.innerHeight, r.bottom) - Math.max(0, r.top));
    };
    const isVisibleForFont = (element: HTMLElement) => {
      const style = getComputedStyle(element);
      const r = element.getBoundingClientRect();
      return r.width > 0 && r.height > 0 && style.visibility !== "hidden" && style.display !== "none";
    };
    const visibleElements = Array.from(document.querySelectorAll<HTMLElement>("body *")).filter(isVisibleForFont);
    const h1 = document.querySelector<HTMLElement>("main h1");
    const sessionCards = Array.from(document.querySelectorAll<HTMLElement>(".lgo-journeypage-stack .lgo-session-beat"));
    const routeStops = Array.from(document.querySelectorAll<HTMLElement>(".lgo-journeypage-stack .lgo-world-route-stop"));
    const firstSessionTop = sessionCards[0]?.getBoundingClientRect().top ?? 0;
    const firstRouteTop = routeStops[0]?.getBoundingClientRect().top ?? 0;
    const focusTarget = document.querySelector<HTMLElement>(".lgo-skip-link");
    focusTarget?.focus();
    return {
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      scrollHeight: document.documentElement.scrollHeight,
      h1Font: h1 ? Number.parseFloat(getComputedStyle(h1).fontSize) : 0,
      maxFont: Math.max(...visibleElements.map((element) => Number.parseFloat(getComputedStyle(element).fontSize) || 0)),
      heroBottom: rect(".lgo-journeypage-stack .lgo-journey-hero").bottom,
      sessionTop: rect(".lgo-journeypage-stack .lgo-session-loop").top,
      sessionBottom: rect(".lgo-journeypage-stack .lgo-session-loop").bottom,
      firstBeatVisibleHeight: visibleHeight(".lgo-journeypage-stack .lgo-session-beat"),
      routeTop: rect(".lgo-journeypage-stack .lgo-world-route-section").top,
      routeBottom: rect(".lgo-journeypage-stack .lgo-world-route-section").bottom,
      firstRouteVisibleHeight: visibleHeight(".lgo-journeypage-stack .lgo-world-route-stop"),
      designBoardTop: rect(".lgo-journeypage-stack .lgo-journey-design-board").top,
      sessionColumns: sessionCards.filter((card) => Math.abs(card.getBoundingClientRect().top - firstSessionTop) <= 2).length || 0,
      routeColumns: routeStops.filter((stop) => Math.abs(stop.getBoundingClientRect().top - firstRouteTop) <= 2).length || 0,
      focusLabel: document.activeElement?.textContent?.trim() ?? "",
      firstFlowText: [
        ".lgo-design-target-reference",
        ".lgo-journeypage-stack .lgo-journey-hero",
        ".lgo-journeypage-stack .lgo-experience-section:nth-of-type(2)",
        ".lgo-journeypage-stack .lgo-world-route-section",
        ".lgo-journeypage-stack .lgo-journey-design-board",
      ].map((selector) => document.querySelector<HTMLElement>(selector)?.textContent ?? "").join("\n"),
    };
  });
}

test.describe("journey real UI layout v1.216", () => {
  test("/journey renders compact Vietnamese session loop and route flow", async ({ page, isMobile }) => {
    await page.goto(`${web}/journey`);
    await expect(page.getByRole("heading", { level: 1, name: "20 phút không chỉ để đánh quái" })).toBeVisible();

    const metrics = await collectJourneyRealMetrics(page);
    console.log(JSON.stringify({ viewport: isMobile ? "mobile" : "desktop", metrics }, null, 2));

    await expect(page.getByRole("img", { name: "Bảng tuyến hành trình một phiên chơi" })).toBeVisible();
    await page.evaluate(() => (document.activeElement as HTMLElement | null)?.blur());
    await page.screenshot({ path: isMobile ? "/tmp/journey-mobile-v1216.png" : "/tmp/journey-desktop-v1216.png", fullPage: true });

    expect(metrics.overflow, "journey page horizontal overflow").toBeLessThanOrEqual(0);
    expect(metrics.firstFlowText, "journey first-flow stays Vietnamese").toContain("Thiết kế chi tiết hành trình");
    expect(metrics.focusLabel, "skip link can receive focus").toContain("Bỏ qua menu");

    if (isMobile) {
      expect(metrics.h1Font, "mobile journey h1 compact").toBeLessThanOrEqual(38);
      expect(metrics.maxFont, "mobile visible font cap").toBeLessThanOrEqual(38);
      expect(metrics.heroBottom, "mobile journey hero does not dominate first-fold").toBeLessThanOrEqual(650);
      expect(metrics.sessionTop, "mobile reaches session loop quickly").toBeLessThanOrEqual(760);
      expect(metrics.firstBeatVisibleHeight, "mobile first session beat visible").toBeGreaterThanOrEqual(90);
      expect(metrics.routeTop, "mobile route follows session loop without excessive proof gap").toBeLessThanOrEqual(1660);
      expect(metrics.designBoardTop, "mobile design board remains reachable after route flow").toBeLessThanOrEqual(2500);
      expect(metrics.scrollHeight, "mobile page height remains reviewable").toBeLessThanOrEqual(3400);
      expect(metrics.sessionColumns, "mobile keeps dense two-column session rhythm").toBe(2);
    } else {
      expect(metrics.h1Font, "desktop journey h1 compact").toBeLessThanOrEqual(52);
      expect(metrics.maxFont, "desktop visible font cap").toBeLessThanOrEqual(52);
      expect(metrics.heroBottom, "desktop hero leaves room for loop").toBeLessThanOrEqual(430);
      expect(metrics.sessionTop, "desktop session loop starts in first-flow").toBeLessThanOrEqual(520);
      expect(metrics.firstBeatVisibleHeight, "desktop first session beat visible").toBeGreaterThanOrEqual(170);
      expect(metrics.routeTop, "desktop route flow follows session loop in reviewable range").toBeLessThanOrEqual(820);
      expect(metrics.designBoardTop, "desktop design board follows route flow").toBeLessThanOrEqual(1120);
      expect(metrics.scrollHeight, "desktop page height remains reviewable").toBeLessThanOrEqual(1650);
      expect(metrics.sessionColumns, "desktop keeps session loop in one row").toBeGreaterThanOrEqual(4);
    }
  });
});
