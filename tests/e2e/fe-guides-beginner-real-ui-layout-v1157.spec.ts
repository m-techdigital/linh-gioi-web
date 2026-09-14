// v1.157 coverage: /guides/beginner prioritizes real browser UI layout and Base First shared beginner-guide CSS.
import { test, expect, type Page } from "@playwright/test";

const web = process.env.LGO_WEB_URL ?? "http://127.0.0.1:3000";

type Metrics = {
  overflow: number;
  h1Font: number;
  maxFont: number;
  heroTop: number;
  heroBottom: number;
  storyTop: number;
  storyBottom: number;
  guideTop: number;
  guideBottom: number;
  downloadTop: number;
  faqTop: number;
  scrollHeight: number;
  storyColumns: number;
  guideColumns: number;
  faqColumns: number;
  firstStoryCardTop: number;
  firstGuideStepTop: number;
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
    const hero = rect(".lgo-beginner-hero-card");
    const story = rect(".lgo-depth-panel");
    const guide = rect(".lgo-guide-panel");
    const download = rect(".lgo-download-depth");
    const faq = rect(".lgo-faq-panel");
    const firstStoryCard = rect(".lgo-story-chapter");
    const firstGuideStep = rect(".lgo-guide-step");
    return {
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      h1Font: Number.parseFloat(getComputedStyle(document.querySelector("h1") as HTMLElement).fontSize) || 0,
      maxFont: Math.max(...visibleElements.map((element) => Number.parseFloat(getComputedStyle(element).fontSize) || 0)),
      heroTop: hero.top,
      heroBottom: hero.bottom,
      storyTop: story.top,
      storyBottom: story.bottom,
      guideTop: guide.top,
      guideBottom: guide.bottom,
      downloadTop: download.top,
      faqTop: faq.top,
      scrollHeight: document.documentElement.scrollHeight,
      storyColumns: getComputedStyle(document.querySelector(".lgo-story-chapters") as HTMLElement).gridTemplateColumns.split(" ").length,
      guideColumns: getComputedStyle(document.querySelector(".lgo-guide-steps") as HTMLElement).gridTemplateColumns.split(" ").length,
      faqColumns: getComputedStyle(document.querySelector(".lgo-faq-list") as HTMLElement).gridTemplateColumns.split(" ").length,
      firstStoryCardTop: firstStoryCard.top,
      firstGuideStepTop: firstGuideStep.top,
      firstFlowText: [
        document.querySelector(".lgo-beginner-hero-card")?.textContent ?? "",
        document.querySelector(".lgo-depth-panel")?.textContent ?? "",
        document.querySelector(".lgo-guide-panel")?.textContent ?? "",
      ].join("\n"),
      firstHeadings: Array.from(document.querySelectorAll<HTMLElement>("main h1, main h2, main h3")).slice(0, 7).map((heading) => ({
        tag: heading.tagName.toLowerCase(),
        text: heading.textContent?.trim().replace(/\s+/g, " ") ?? "",
      })),
    };
  });
}

test.describe("beginner guide real UI layout v1.157", () => {
  test("/guides/beginner renders compact beginner path from Cổng Linh to Đá Luyện", async ({ page, isMobile }, testInfo) => {
    await page.goto(`${web}/guides/beginner`);

    await expect(page.getByRole("heading", { level: 1, name: "Hướng dẫn người chơi mới" })).toBeVisible();
    await expect(page.getByRole("heading", { level: 2, name: "Câu chuyện thế giới được giải thích theo nhịp người chơi" })).toBeVisible();
    await expect(page.getByRole("heading", { level: 2, name: "Hướng dẫn người chơi mới theo 4 bước rõ ràng" })).toBeVisible();

    const metrics = await collect(page);
    expect(metrics.firstHeadings[0]).toEqual({ tag: "h1", text: "Hướng dẫn người chơi mới" });
    expect(metrics.firstFlowText, "stale English v1.8 labels should not drive first-flow").not.toMatch(/WEB v1\.8|beginner guide|game info depth|No production|No public game download|Download status depth/);
    expect(metrics.firstFlowText).toContain("Cổng Linh");
    expect(metrics.firstFlowText).toContain("Đá Luyện");
    expect(metrics.overflow, "horizontal overflow").toBeLessThanOrEqual(0);

    const worldCta = page.getByRole("link", { name: "Xem thế giới" });
    await worldCta.focus();
    await expect(worldCta).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/\/game$/);
    await page.goBack();

    if (isMobile) {
      expect(metrics.h1Font, "mobile h1 scale").toBeLessThanOrEqual(33);
      expect(metrics.maxFont, "mobile visible font cap").toBeLessThanOrEqual(34);
      expect(metrics.heroTop, "mobile hero starts first").toBeLessThanOrEqual(120);
      expect(metrics.heroBottom, "mobile hero compact").toBeLessThanOrEqual(535);
      expect(metrics.storyTop, "mobile story follows hero").toBeLessThanOrEqual(560);
      expect(metrics.firstStoryCardTop, "mobile first story card appears in first fold").toBeLessThanOrEqual(660);
      expect(metrics.guideTop, "mobile guide follows story without a long raw list").toBeLessThanOrEqual(1025);
      expect(metrics.firstGuideStepTop, "mobile first guide step reachable early").toBeLessThanOrEqual(1170);
      expect(metrics.scrollHeight, "mobile page height compact").toBeLessThanOrEqual(3100);
      expect(metrics.storyColumns).toBe(2);
      expect(metrics.guideColumns).toBe(2);
      expect(metrics.faqColumns).toBe(2);
    } else {
      expect(metrics.h1Font, "desktop h1 scale").toBeLessThanOrEqual(42);
      expect(metrics.maxFont, "desktop visible font cap").toBeLessThanOrEqual(42);
      expect(metrics.heroTop, "desktop hero starts first").toBeLessThanOrEqual(115);
      expect(metrics.heroBottom, "desktop hero compact").toBeLessThanOrEqual(390);
      expect(metrics.storyTop, "desktop story follows hero").toBeLessThanOrEqual(405);
      expect(metrics.storyBottom, "desktop story compact").toBeLessThanOrEqual(680);
      expect(metrics.guideTop, "desktop guide reaches first fold").toBeLessThanOrEqual(700);
      expect(metrics.firstGuideStepTop, "desktop first guide step near fold").toBeLessThanOrEqual(830);
      expect(metrics.faqTop, "desktop FAQ not pushed too deep").toBeLessThanOrEqual(1375);
      expect(metrics.scrollHeight, "desktop page height compact").toBeLessThanOrEqual(2250);
      expect(metrics.storyColumns).toBe(4);
      expect(metrics.guideColumns).toBe(2);
      expect(metrics.faqColumns).toBeGreaterThanOrEqual(3);
    }

    const screenshotPath = `/tmp/guides-beginner-${isMobile ? "mobile" : "desktop"}-v1157.png`;
    await page.screenshot({ path: screenshotPath, fullPage: true });
    await testInfo.attach(`guides-beginner-${isMobile ? "mobile" : "desktop"}-v1157`, {
      path: screenshotPath,
      contentType: "image/png",
    });
  });
});
