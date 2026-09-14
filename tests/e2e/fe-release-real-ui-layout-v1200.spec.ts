// v1.200 coverage: /release must render the release narrative as real browser UI/UX layout with Base First release patterns.
import { test, expect, type Page } from "@playwright/test";

const web = process.env.LGO_WEB_URL ?? "http://127.0.0.1:3000";

type ReleaseMetrics = {
  h1Font: number;
  maxFont: number;
  pageOverflow: number;
  heroTop: number;
  heroBottom: number;
  boardTop: number;
  boardBottom: number;
  stageTop: number;
  firstStageTop: number;
  readinessTop: number;
  scrollHeight: number;
  stageCards: number;
  stageColumns: number;
  designTargetText: string;
};

async function collectReleaseMetrics(page: Page): Promise<ReleaseMetrics> {
  return page.evaluate(() => {
    const visibleElements = Array.from(document.querySelectorAll<HTMLElement>("body *")).filter((element) => {
      if (element.closest("details:not([open]) .lgo-service-disclosure-body")) return false;
      const rect = element.getBoundingClientRect();
      const style = getComputedStyle(element);
      return rect.width > 0 && rect.height > 0 && style.visibility !== "hidden" && style.display !== "none";
    });
    const rect = (selector: string) => {
      const element = document.querySelector<HTMLElement>(selector);
      if (!element) throw new Error(`Missing ${selector}`);
      const box = element.getBoundingClientRect();
      return { top: box.top, bottom: box.bottom };
    };
    const h1 = document.querySelector<HTMLElement>("h1");
    const hero = rect(".lgo-releasepage-stack .lgo-release-narrative-hero-card");
    const board = rect(".lgo-releasepage-stack .lgo-release-narrative-design-board");
    const stage = rect(".lgo-releasepage-stack .lgo-release-narrative-stage-board");
    const firstStage = rect(".lgo-releasepage-stack .lgo-release-narrative-item");
    const readiness = rect(".lgo-releasepage-stack .lgo-release-readiness-cta");
    const grid = document.querySelector<HTMLElement>(".lgo-releasepage-stack .lgo-release-narrative-list");
    const designTarget = document.querySelector<HTMLElement>(".lgo-design-target-reference");
    if (!h1 || !grid) throw new Error("Missing release layout anchors");
    return {
      h1Font: Number.parseFloat(getComputedStyle(h1).fontSize) || 0,
      maxFont: Math.max(...visibleElements.map((element) => Number.parseFloat(getComputedStyle(element).fontSize) || 0)),
      pageOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      heroTop: hero.top,
      heroBottom: hero.bottom,
      boardTop: board.top,
      boardBottom: board.bottom,
      stageTop: stage.top,
      firstStageTop: firstStage.top,
      readinessTop: readiness.top,
      scrollHeight: document.documentElement.scrollHeight,
      stageCards: document.querySelectorAll(".lgo-releasepage-stack .lgo-release-narrative-item").length,
      stageColumns: getComputedStyle(grid).gridTemplateColumns.split(" ").length,
      designTargetText: designTarget?.textContent ?? "",
    };
  });
}

test.describe("release real UI layout v1.200", () => {
  test("/release renders compact Vietnamese release narrative with target and keyboard path", async ({ page, isMobile }) => {
    await page.goto(`${web}/release`);

    await expect(page.getByRole("heading", { level: 1, name: "Hành trình phát hành" })).toBeVisible();
    await expect(page.getByText("WEB v1.18 hành trình phát hành", { exact: true })).toBeVisible();
    await expect(page.locator(".lgo-release-narrative-hero-card")).toBeVisible();
    await expect(page.locator(".lgo-release-narrative-design-board")).toBeVisible();
    await expect(page.locator(".lgo-release-narrative-stage-board")).toBeVisible();
    await expect(page.locator(".lgo-release-narrative-item")).toHaveCount(6);
    await expect(page.getByRole("region", { name: /Design target reference.*Public Release/i })).toBeVisible();

    const mainText = await page.locator("main").innerText();
    expect(mainText).toMatch(/Không build public · không open beta · không funnel quyền truy cập/i);
    expect(mainText).toContain("M0 → M1 là cổng giai đoạn có bằng chứng, không phải nút mở beta.");
    expect(mainText).not.toMatch(/open beta is live|public build is ready|account entitlement granted|production backend accepted|download now/i);

    const trustLink = page.locator(".lgo-release-narrative-hero-card").getByRole("link", { name: "Tin cậy tải game" });
    await trustLink.focus();
    await expect(trustLink).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/\/download\/trust$/);
    await page.goBack();
    await expect(page.getByRole("heading", { level: 1, name: "Hành trình phát hành" })).toBeVisible();

    const metrics = await collectReleaseMetrics(page);
    expect(metrics.designTargetText).toContain("Public Release");
    expect(metrics.pageOverflow, "body horizontal overflow").toBeLessThanOrEqual(0);
    expect(metrics.stageCards).toBe(6);
    if (isMobile) {
      expect(metrics.h1Font, "mobile h1 scale").toBeLessThanOrEqual(31);
      expect(metrics.maxFont, "mobile visible font cap").toBeLessThanOrEqual(31);
      expect(metrics.heroTop, "mobile hero starts after shell").toBeLessThanOrEqual(150);
      expect(metrics.heroBottom, "mobile hero compact").toBeLessThanOrEqual(760);
      expect(metrics.boardTop, "mobile board follows hero").toBeLessThanOrEqual(780);
      expect(metrics.boardBottom, "mobile board compact").toBeLessThanOrEqual(1180);
      expect(metrics.stageTop, "mobile stage board follows target board").toBeLessThanOrEqual(1260);
      expect(metrics.firstStageTop, "mobile first stage card near first sections").toBeLessThanOrEqual(1500);
      expect(metrics.readinessTop, "mobile readiness CTA reachable").toBeLessThanOrEqual(2300);
      expect(metrics.scrollHeight, "mobile release page height bounded").toBeLessThanOrEqual(5200);
      expect(metrics.stageColumns).toBeLessThanOrEqual(2);
    } else {
      expect(metrics.h1Font, "desktop h1 scale").toBeLessThanOrEqual(50);
      expect(metrics.maxFont, "desktop visible font cap").toBeLessThanOrEqual(50);
      expect(metrics.heroTop, "desktop hero starts first").toBeLessThanOrEqual(115);
      expect(metrics.heroBottom, "desktop hero compact").toBeLessThanOrEqual(430);
      expect(metrics.boardTop, "desktop board follows hero").toBeLessThanOrEqual(445);
      expect(metrics.boardBottom, "desktop board compact").toBeLessThanOrEqual(620);
      expect(metrics.stageTop, "desktop stage board follows target board").toBeLessThanOrEqual(650);
      expect(metrics.firstStageTop, "desktop first stage card near first fold").toBeLessThanOrEqual(780);
      expect(metrics.readinessTop, "desktop readiness CTA reachable after stage board").toBeLessThanOrEqual(1250);
      expect(metrics.scrollHeight, "desktop release page height bounded").toBeLessThanOrEqual(2500);
      expect(metrics.stageColumns).toBeGreaterThanOrEqual(3);
    }

    await page.screenshot({ path: `/tmp/release-${isMobile ? "mobile" : "desktop"}-v1200.png`, fullPage: true });
  });
});
