// v1.55 coverage: public class art typography scale and decorative lettering caps.
import { test, expect } from "@playwright/test";

type Metrics = {
  overflow: number;
  decorativeFontSize: number;
  decorativeRight: string;
  decorativeTop: string;
  spotlightHeading: number;
  spotlightCopy: number;
  spotlightWidth: number;
  viewportWidth: number;
};

async function collectMetrics(page: import("@playwright/test").Page): Promise<Metrics> {
  return page.evaluate(() => {
    const spotlight = document.querySelector<HTMLElement>(".lgo-class-art-spotlight");
    const heading = document.querySelector<HTMLElement>(".lgo-class-art-spotlight-copy h2");
    const copy = document.querySelector<HTMLElement>(".lgo-class-art-spotlight-copy > p");
    const before = spotlight ? getComputedStyle(spotlight, "::before") : null;
    const spotlightRect = spotlight?.getBoundingClientRect();
    return {
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      decorativeFontSize: before ? Number.parseFloat(before.fontSize) : 0,
      decorativeRight: before?.right ?? "",
      decorativeTop: before?.top ?? "",
      spotlightHeading: heading ? Number.parseFloat(getComputedStyle(heading).fontSize) : 0,
      spotlightCopy: copy ? Number.parseFloat(getComputedStyle(copy).fontSize) : 0,
      spotlightWidth: spotlightRect?.width ?? 0,
      viewportWidth: window.innerWidth,
    };
  });
}

test.describe("public class art typography scale", () => {
  test("class art display type stays decorative without overwhelming the viewport", async ({ page, isMobile }) => {
    await page.goto("/classes");
    await expect(page.getByRole("heading", { name: "Chọn cách bạn nhìn và bảo vệ thế giới", exact: true })).toBeVisible();
    await page.getByRole("heading", { name: /Một Lộ được mở như một bộ nhận diện/ }).scrollIntoViewIfNeeded();

    const metrics = await collectMetrics(page);
    expect(metrics.spotlightWidth, "spotlight width should render").toBeGreaterThan(280);
    expect(metrics.overflow, "horizontal overflow").toBeLessThanOrEqual(0);
    expect(metrics.decorativeFontSize, "decorative VÕ font-size cap").toBeLessThanOrEqual(isMobile ? 88 : 128);
    expect(metrics.spotlightHeading, "class art heading font-size cap").toBeLessThanOrEqual(isMobile ? 42 : 48);
    expect(metrics.spotlightCopy, "class art body copy font-size cap").toBeLessThanOrEqual(20);
    expect(metrics.decorativeRight, "decorative VÕ stays tucked near the card edge").not.toBe("");
    expect(metrics.decorativeTop, "decorative VÕ stays tucked near the card top").not.toBe("");
  });
});
