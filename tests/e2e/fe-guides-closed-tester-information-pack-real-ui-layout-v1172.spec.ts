// v1.172 coverage: /guides/closed-tester-information-pack-guide prioritizes rendered browser UI layout and shared guide-flow Base First CSS.
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
    const hero = rect(".lgo-closed-tester-pack-guide-hero-card");
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
        document.querySelector(".lgo-closed-tester-pack-guide-hero-card")?.textContent ?? "",
        document.querySelector(".lgo-guide-detail-depth")?.textContent ?? "",
      ].join("\n"),
      firstHeadings: Array.from(document.querySelectorAll<HTMLElement>("main h1, main h2, main h3")).slice(0, 9).map((heading) => ({
        tag: heading.tagName.toLowerCase(),
        text: heading.textContent?.trim().replace(/\s+/g, " ") ?? "",
      })),
    };
  });
}

test.describe("closed tester information pack guide real UI layout v1.172", () => {
  test("/guides/closed-tester-information-pack-guide renders compact tester-pack flow before generic CTAs", async ({ page, isMobile }, testInfo) => {
    await page.goto(`${web}/guides/closed-tester-information-pack-guide`);

    await expect(page.getByRole("heading", { level: 1, name: "Chuẩn bị gói thông tin closed tester" })).toBeVisible();
    await expect(page.getByRole("heading", { level: 2, name: "Các bước guide có kết quả mong đợi và phạm vi tạm khóa" })).toBeVisible();
    await expect(page.locator(".lgo-status-badge", { hasText: "Gói closed tester" }).first()).toBeVisible();

    const metrics = await collect(page);
    expect(metrics.firstHeadings[0]).toEqual({ tag: "h1", text: "Chuẩn bị gói thông tin closed tester" });
    expect(metrics.firstFlowText).toContain("Đọc tester pack như checklist chuẩn bị");
    expect(metrics.firstFlowText).toContain("Giữ feedback an toàn");
    expect(metrics.firstFlowText).toContain("Đối chiếu giới hạn đã biết");
    expect(metrics.firstFlowText).toContain("Quay lại readiness trước mọi CTA");
    expect(metrics.firstFlowText, "generic guide fallback and stale English labels must not drive the current page layout").not.toMatch(/WEB v1\.155|Guide tĩnh · chưa có hệ thống wiki|Closed tester information pack guide|signup form|No live tester intake|No secure ticket inbox|No public build|No owner sign-off bypass|No production support SLA|open registration|entitlement automation|guaranteed tester slot/i);
    expect(metrics.overflow, "body horizontal overflow").toBeLessThanOrEqual(0);
    expect(metrics.internalOverflowCount, "visible element overflow").toBe(0);
    expect(metrics.stepCount).toBe(4);

    const trustLink = page.locator(".lgo-closed-tester-pack-guide-hero-card").getByRole("link", { name: "Tin cậy tải game" });
    await trustLink.focus();
    await expect(trustLink).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/\/download\/trust$/);
    await page.goBack();

    if (isMobile) {
      expect(metrics.h1Font, "mobile h1 scale").toBeLessThanOrEqual(29);
      expect(metrics.maxFont, "mobile visible font cap").toBeLessThanOrEqual(30);
      expect(metrics.heroTop, "mobile hero starts after compact shell").toBeLessThanOrEqual(150);
      expect(metrics.heroBottom, "mobile hero compact").toBeLessThanOrEqual(590);
      expect(metrics.detailTop, "mobile guide detail follows hero").toBeLessThanOrEqual(600);
      expect(metrics.firstStepTop, "mobile first tester-pack step appears near first fold").toBeLessThanOrEqual(760);
      expect(metrics.worldCtaTop, "mobile generic CTA starts after tester-pack steps without a raw gap").toBeLessThanOrEqual(1290);
      expect(metrics.actionBandTop, "mobile final guide action not pushed by oversized cards").toBeLessThanOrEqual(3420);
      expect(metrics.scrollHeight, "mobile page height compact").toBeLessThanOrEqual(4450);
      expect(metrics.stepColumns).toBe(1);
    } else {
      expect(metrics.h1Font, "desktop h1 scale").toBeLessThanOrEqual(49);
      expect(metrics.maxFont, "desktop visible font cap").toBeLessThanOrEqual(49);
      expect(metrics.heroTop, "desktop hero starts first").toBeLessThanOrEqual(115);
      expect(metrics.heroBottom, "desktop hero compact").toBeLessThanOrEqual(440);
      expect(metrics.detailTop, "desktop guide detail follows hero").toBeLessThanOrEqual(455);
      expect(metrics.firstStepTop, "desktop first step near first fold").toBeLessThanOrEqual(725);
      expect(metrics.worldCtaTop, "desktop world-loop CTA follows detail without a long gap").toBeLessThanOrEqual(900);
      expect(metrics.routeCtaTop, "desktop route CTA stays early").toBeLessThanOrEqual(1050);
      expect(metrics.actionBandTop, "desktop action band not pushed too deep").toBeLessThanOrEqual(2240);
      expect(metrics.scrollHeight, "desktop page height compact").toBeLessThanOrEqual(3000);
      expect(metrics.stepColumns).toBe(4);
    }

    const screenshotPath = `/tmp/guides-closed-tester-information-pack-${isMobile ? "mobile" : "desktop"}-v1172.png`;
    await page.screenshot({ path: screenshotPath, fullPage: true });
    await testInfo.attach(`guides-closed-tester-information-pack-${isMobile ? "mobile" : "desktop"}-v1172`, {
      path: screenshotPath,
      contentType: "image/png",
    });
  });
});
