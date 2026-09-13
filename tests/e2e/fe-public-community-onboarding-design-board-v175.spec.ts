// v1.75 coverage: community onboarding uses a real LinhGioiOnline gameplay-loop reference-art visual.
import { test, expect, type Page } from "@playwright/test";

const web = process.env.LGO_WEB_URL ?? "http://127.0.0.1:3000";

type CommunityOnboardingBoardMetrics = {
  pageOverflow: number;
  maxFont: number;
  board: null | {
    src: string | null;
    loading: string | null;
    naturalWidth: number;
    naturalHeight: number;
    captionFontSize: number;
  };
};

async function collectCommunityOnboardingBoardMetrics(page: Page): Promise<CommunityOnboardingBoardMetrics> {
  return page.evaluate(() => {
    const visibleElements = Array.from(document.querySelectorAll<HTMLElement>("body *")).filter((element) => {
      const rect = element.getBoundingClientRect();
      const style = getComputedStyle(element);
      return rect.width > 0 && rect.height > 0 && style.visibility !== "hidden" && style.display !== "none";
    });
    const image = document.querySelector<HTMLImageElement>('img[alt="Community onboarding gameplay loop board"]');
    const caption = image?.closest("figure")?.querySelector("figcaption");
    return {
      pageOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      maxFont: Math.max(...visibleElements.map((element) => Number.parseFloat(getComputedStyle(element).fontSize) || 0)),
      board: image ? {
        src: image.getAttribute("src"),
        loading: image.getAttribute("loading"),
        naturalWidth: image.naturalWidth,
        naturalHeight: image.naturalHeight,
        captionFontSize: caption ? Number.parseFloat(getComputedStyle(caption).fontSize) : 0,
      } : null,
    };
  });
}

test.describe("public community onboarding design board", () => {
  test("/community/onboarding renders the gameplay-loop visual without mobile overflow", async ({ page, isMobile }) => {
    await page.goto(`${web}/community/onboarding`);
    await expect(page.getByRole("heading", { name: "Community / roadmap onboarding" })).toBeVisible();
    await expect(page.getByRole("img", { name: "Community onboarding gameplay loop board" })).toBeVisible();

    const metrics = await collectCommunityOnboardingBoardMetrics(page);
    expect(metrics.board, "community onboarding board metrics").not.toBeNull();
    expect(metrics.board?.src, "community onboarding board src").toContain("/game-art/design-boards/community-onboarding-gameplay-loop.svg");
    expect(metrics.board?.loading, "community onboarding board loading intent").toBe("eager");
    expect(metrics.board?.naturalWidth, "community onboarding board loaded width").toBeGreaterThan(0);
    expect(metrics.board?.naturalHeight, "community onboarding board loaded height").toBeGreaterThan(0);
    expect(metrics.pageOverflow, "community onboarding horizontal overflow").toBeLessThanOrEqual(0);
    expect(metrics.maxFont, "community onboarding visible font cap").toBeLessThanOrEqual(isMobile ? 48 : 64);
    expect(metrics.board?.captionFontSize ?? 0, "community onboarding board caption font-size").toBeLessThanOrEqual(18);
  });
});
