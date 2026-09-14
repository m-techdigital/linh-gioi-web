// v1.166 coverage: /guides/player-safety-support-guide prioritizes rendered browser UI layout and shared guide-flow Base First CSS.
import { test, expect, type Page } from "@playwright/test";

const web = process.env.LGO_WEB_URL ?? "http://127.0.0.1:3000";

type Metrics = {
  overflow: number;
  internalOverflowCount: number;
  h1Font: number;
  maxFont: number;
  heroTop: number;
  heroBottom: number;
  detailTop: number;
  worldCtaTop: number;
  routeCtaTop: number;
  actionBandTop: number;
  scrollHeight: number;
  stepCount: number;
  stepColumns: number;
  firstStepTop: number;
  firstFlowText: string;
  firstHeadings: Array<{ tag: string; text: string }>;
};

async function collect(page: Page): Promise<Metrics> {
  return page.evaluate(() => {
    const rect = (selector: string) => {
      const element = document.querySelector<HTMLElement>(selector);
      if (!element) throw new Error(`missing selector ${selector}`);
      return element.getBoundingClientRect();
    };
    const visibleElements = Array.from(document.querySelectorAll<HTMLElement>("body *")).filter((element) => {
      const box = element.getBoundingClientRect();
      const style = getComputedStyle(element);
      return box.width > 0 && box.height > 0 && style.display !== "none" && style.visibility !== "hidden";
    });
    const hero = rect(".lgo-player-safety-guide-hero-card");
    const detail = rect(".lgo-guide-detail-depth");
    const worldCta = rect(".lgo-world-loop-cta");
    const routeCta = rect(".lgo-route-continuity-cta");
    const actionBand = rect(".lgo-action-band");
    const firstStep = rect(".lgo-guide-detail-step");
    const internalOverflow = visibleElements.filter((element) => element.scrollWidth > element.clientWidth + 1);
    return {
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      internalOverflowCount: internalOverflow.length,
      h1Font: Number.parseFloat(getComputedStyle(document.querySelector("h1") as HTMLElement).fontSize) || 0,
      maxFont: Math.max(...visibleElements.map((element) => Number.parseFloat(getComputedStyle(element).fontSize) || 0)),
      heroTop: hero.top,
      heroBottom: hero.bottom,
      detailTop: detail.top,
      worldCtaTop: worldCta.top,
      routeCtaTop: routeCta.top,
      actionBandTop: actionBand.top,
      scrollHeight: document.documentElement.scrollHeight,
      stepCount: document.querySelectorAll(".lgo-guide-detail-step").length,
      stepColumns: getComputedStyle(document.querySelector(".lgo-guide-detail-steps") as HTMLElement).gridTemplateColumns.split(" ").length,
      firstStepTop: firstStep.top,
      firstFlowText: [
        document.querySelector(".lgo-player-safety-guide-hero-card")?.textContent ?? "",
        document.querySelector(".lgo-guide-detail-depth")?.textContent ?? "",
      ].join("\n"),
      firstHeadings: Array.from(document.querySelectorAll<HTMLElement>("main h1, main h2, main h3")).slice(0, 9).map((heading) => ({
        tag: heading.tagName.toLowerCase(),
        text: heading.textContent?.trim().replace(/\s+/g, " ") ?? "",
      })),
    };
  });
}

test.describe("player safety support guide real UI layout v1.166", () => {
  test("/guides/player-safety-support-guide renders compact safe-support flow before generic CTAs", async ({ page, isMobile }, testInfo) => {
    await page.goto(`${web}/guides/player-safety-support-guide`);

    await expect(page.getByRole("heading", { level: 1, name: "An toàn và hỗ trợ cho người chơi mới" })).toBeVisible();
    await expect(page.getByRole("heading", { level: 2, name: "Các bước guide có kết quả mong đợi và phạm vi tạm khóa" })).toBeVisible();
    await expect(page.locator(".lgo-status-badge", { hasText: "An toàn hỗ trợ" }).first()).toBeVisible();

    const metrics = await collect(page);
    expect(metrics.firstHeadings[0]).toEqual({ tag: "h1", text: "An toàn và hỗ trợ cho người chơi mới" });
    expect(metrics.firstFlowText).toContain("FAQ hỗ trợ");
    expect(metrics.firstFlowText).toContain("báo lỗi an toàn");
    expect(metrics.firstFlowText).toContain("Cộng đồng");
    expect(metrics.firstFlowText, "generic guide fallback and stale English labels must not drive the current page layout").not.toMatch(/WEB v1\.155|Guide tĩnh · chưa có hệ thống wiki|support FAQ|bug report|closed-test support|ticket\/account\/moderation backend/i);
    expect(metrics.overflow, "body horizontal overflow").toBeLessThanOrEqual(0);
    expect(metrics.internalOverflowCount, "visible element overflow").toBe(0);
    expect(metrics.stepCount).toBe(4);

    const trustLink = page.locator(".lgo-player-safety-guide-hero-card").getByRole("link", { name: "Tin cậy tải game" });
    await trustLink.focus();
    await expect(trustLink).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/\/download\/trust$/);
    await page.goBack();

    if (isMobile) {
      expect(metrics.h1Font, "mobile h1 scale").toBeLessThanOrEqual(29);
      expect(metrics.maxFont, "mobile visible font cap").toBeLessThanOrEqual(30);
      expect(metrics.heroTop, "mobile hero starts after compact shell").toBeLessThanOrEqual(150);
      expect(metrics.heroBottom, "mobile hero compact").toBeLessThanOrEqual(610);
      expect(metrics.detailTop, "mobile guide detail follows hero").toBeLessThanOrEqual(620);
      expect(metrics.firstStepTop, "mobile first safety step appears near first fold").toBeLessThanOrEqual(785);
      expect(metrics.worldCtaTop, "mobile generic CTA starts after safety steps without a raw gap").toBeLessThanOrEqual(1320);
      expect(metrics.actionBandTop, "mobile final guide action not pushed by oversized cards").toBeLessThanOrEqual(3450);
      expect(metrics.scrollHeight, "mobile page height compact").toBeLessThanOrEqual(4480);
      expect(metrics.stepColumns).toBe(1);
    } else {
      expect(metrics.h1Font, "desktop h1 scale").toBeLessThanOrEqual(49);
      expect(metrics.maxFont, "desktop visible font cap").toBeLessThanOrEqual(49);
      expect(metrics.heroTop, "desktop hero starts first").toBeLessThanOrEqual(115);
      expect(metrics.heroBottom, "desktop hero compact").toBeLessThanOrEqual(480);
      expect(metrics.detailTop, "desktop guide detail follows hero").toBeLessThanOrEqual(490);
      expect(metrics.firstStepTop, "desktop first step near first fold").toBeLessThanOrEqual(745);
      expect(metrics.worldCtaTop, "desktop world-loop CTA follows detail without a long gap").toBeLessThanOrEqual(920);
      expect(metrics.routeCtaTop, "desktop route CTA stays early").toBeLessThanOrEqual(1070);
      expect(metrics.actionBandTop, "desktop action band not pushed too deep").toBeLessThanOrEqual(2220);
      expect(metrics.scrollHeight, "desktop page height compact").toBeLessThanOrEqual(2940);
      expect(metrics.stepColumns).toBe(4);
    }

    const screenshotPath = `/tmp/guides-player-safety-support-${isMobile ? "mobile" : "desktop"}-v1166.png`;
    await page.screenshot({ path: screenshotPath, fullPage: true });
    await testInfo.attach(`guides-player-safety-support-${isMobile ? "mobile" : "desktop"}-v1166`, {
      path: screenshotPath,
      contentType: "image/png",
    });
  });
});
