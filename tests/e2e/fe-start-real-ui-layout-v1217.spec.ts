import { expect, test, type Page } from "@playwright/test";

const web = process.env.LGO_WEB_URL ?? "http://127.0.0.1:3000";

type StartRealMetrics = {
  overflow: number;
  scrollHeight: number;
  h1Font: number;
  maxFont: number;
  heroBottom: number;
  sceneTop: number;
  sceneHeight: number;
  stepsBottom: number;
  designBoardTop: number;
  designBoardBottom: number;
  screenshotPanelTop: number;
  screenshotPanelBottom: number;
  firstScreenshotVisibleHeight: number;
  classGridTop: number;
  routeTop: number;
  stepRows: number;
  screenshotColumns: number;
  classColumns: number;
  focusLabel: string;
  firstFlowText: string;
};

async function collectStartRealMetrics(page: Page): Promise<StartRealMetrics> {
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
    const columnCount = (selector: string) => {
      const nodes = Array.from(document.querySelectorAll<HTMLElement>(selector));
      const firstTop = nodes[0]?.getBoundingClientRect().top ?? 0;
      return nodes.filter((node) => Math.abs(node.getBoundingClientRect().top - firstTop) <= 2).length || 0;
    };
    const stepRows = (() => {
      const nodes = Array.from(document.querySelectorAll<HTMLElement>(".lgo-startpage-stack .lgo-onboarding-steps span"));
      return new Set(nodes.map((node) => Math.round(node.getBoundingClientRect().top))).size;
    })();
    const visibleElements = Array.from(document.querySelectorAll<HTMLElement>("body *")).filter(isVisibleForFont);
    const h1 = document.querySelector<HTMLElement>("main h1");
    const focusTarget = document.querySelector<HTMLElement>(".lgo-skip-link");
    focusTarget?.focus();
    return {
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      scrollHeight: document.documentElement.scrollHeight,
      h1Font: h1 ? Number.parseFloat(getComputedStyle(h1).fontSize) : 0,
      maxFont: Math.max(...visibleElements.map((element) => Number.parseFloat(getComputedStyle(element).fontSize) || 0)),
      heroBottom: rect(".lgo-startpage-stack .lgo-start-hero").bottom,
      sceneTop: rect(".lgo-startpage-stack .lgo-cinematic-scene").top,
      sceneHeight: rect(".lgo-startpage-stack .lgo-cinematic-scene").height,
      stepsBottom: rect(".lgo-startpage-stack .lgo-onboarding-steps").bottom,
      designBoardTop: rect(".lgo-startpage-stack .lgo-start-design-board").top,
      designBoardBottom: rect(".lgo-startpage-stack .lgo-start-design-board").bottom,
      screenshotPanelTop: rect(".lgo-startpage-stack .lgo-start-real-screenshot-panel").top,
      screenshotPanelBottom: rect(".lgo-startpage-stack .lgo-start-real-screenshot-panel").bottom,
      firstScreenshotVisibleHeight: visibleHeight(".lgo-startpage-stack .lgo-start-real-screenshot-card"),
      classGridTop: rect(".lgo-startpage-stack .lgo-class-path-grid").top,
      routeTop: rect(".lgo-startpage-stack .lgo-world-route-section").top,
      stepRows,
      screenshotColumns: columnCount(".lgo-startpage-stack .lgo-start-real-screenshot-card"),
      classColumns: columnCount(".lgo-startpage-stack .lgo-class-path"),
      focusLabel: document.activeElement?.textContent?.trim() ?? "",
      firstFlowText: [
        ".lgo-design-target-reference",
        ".lgo-startpage-stack .lgo-start-hero",
        ".lgo-startpage-stack .lgo-start-design-board",
        ".lgo-startpage-stack .lgo-start-real-screenshot-panel",
        ".lgo-startpage-stack .lgo-class-path-grid",
      ].map((selector) => document.querySelector<HTMLElement>(selector)?.textContent ?? "").join("\n"),
    };
  });
}

test.describe("start real UI layout v1.217", () => {
  test("/start renders compact Vietnamese tutorial onboarding flow", async ({ page, isMobile }) => {
    await page.goto(`${web}/start`);
    await expect(page.getByRole("heading", { level: 1, name: "Bắt đầu" })).toBeVisible();
    await expect(page.getByRole("img", { name: "Bảng tuyến hướng dẫn bắt đầu" })).toBeVisible();

    const metrics = await collectStartRealMetrics(page);
    console.log(JSON.stringify({ viewport: isMobile ? "mobile" : "desktop", metrics }, null, 2));

    await page.evaluate(() => (document.activeElement as HTMLElement | null)?.blur());
    await page.screenshot({ path: isMobile ? "/tmp/start-mobile-v1217.png" : "/tmp/start-desktop-v1217.png", fullPage: true });

    expect(metrics.overflow, "start page horizontal overflow").toBeLessThanOrEqual(0);
    expect(metrics.firstFlowText, "start first-flow stays Vietnamese").toContain("Thiết kế chi tiết bắt đầu");
    expect(metrics.firstFlowText, "start tutorial board remains scenario-specific").toContain("Tuyến bắt đầu dạy bằng vòng chơi nhỏ");
    expect(metrics.focusLabel, "skip link can receive focus").toContain("Bỏ qua menu");

    if (isMobile) {
      expect(metrics.h1Font, "mobile start h1 compact").toBeLessThanOrEqual(38);
      expect(metrics.maxFont, "mobile visible font cap").toBeLessThanOrEqual(38);
      expect(metrics.heroBottom, "mobile start hero does not dominate first-flow").toBeLessThanOrEqual(760);
      expect(metrics.sceneHeight, "mobile cinematic scene remains visible but compact").toBeGreaterThanOrEqual(160);
      expect(metrics.designBoardTop, "mobile reaches tutorial board quickly").toBeLessThanOrEqual(900);
      expect(metrics.screenshotPanelTop, "mobile screenshot proof follows board without excessive gap").toBeLessThanOrEqual(1450);
      expect(metrics.classGridTop, "mobile class grid follows proof in reviewable flow").toBeLessThanOrEqual(2400);
      expect(metrics.scrollHeight, "mobile page height remains reviewable").toBeLessThanOrEqual(3600);
      expect(metrics.screenshotColumns, "mobile keeps dense tutorial screenshot grid").toBeGreaterThanOrEqual(2);
      expect(metrics.classColumns, "mobile keeps dense class grid").toBe(2);
    } else {
      expect(metrics.h1Font, "desktop start h1 compact").toBeLessThanOrEqual(52);
      expect(metrics.maxFont, "desktop visible font cap").toBeLessThanOrEqual(52);
      expect(metrics.heroBottom, "desktop hero leaves room for tutorial board").toBeLessThanOrEqual(470);
      expect(metrics.sceneTop, "desktop cinematic scene sits in first hero target").toBeLessThanOrEqual(180);
      expect(metrics.sceneHeight, "desktop cinematic scene remains visible but compact").toBeGreaterThanOrEqual(260);
      expect(metrics.designBoardTop, "desktop tutorial board starts in first-flow").toBeLessThanOrEqual(620);
      expect(metrics.screenshotPanelTop, "desktop screenshot proof follows board in reviewable range").toBeLessThanOrEqual(920);
      expect(metrics.classGridTop, "desktop class grid follows tutorial proof in reviewable flow").toBeLessThanOrEqual(1300);
      expect(metrics.scrollHeight, "desktop page height remains reviewable").toBeLessThanOrEqual(2200);
      expect(metrics.screenshotColumns, "desktop keeps three tutorial screenshots in one row").toBe(3);
      expect(metrics.classColumns, "desktop keeps class cards in one row").toBe(5);
    }
  });
});
