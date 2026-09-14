// v1.134 coverage: homepage restarts from Vietnamese-first design target and first-flow copy.
import { test, expect, type Page } from "@playwright/test";

const web = process.env.LGO_WEB_URL ?? "http://127.0.0.1:3000";

type HomeVietnameseMetrics = {
  overflow: number;
  h1Size: number;
  signalCount: number;
  ctaCount: number;
  englishLeak: string;
  designReferenceText: string;
  heroText: string;
};

async function collectHomeVietnameseMetrics(page: Page): Promise<HomeVietnameseMetrics> {
  return page.evaluate(() => {
    const h1 = document.querySelector<HTMLElement>("main h1");
    const firstFlowText = [".lgo-design-target-reference", ".lgo-cinematic-hero", ".lgo-hero-signals"]
      .map((selector) => document.querySelector<HTMLElement>(selector)?.textContent ?? "")
      .join(" ");
    const englishLeak = /(Side-Scrolling|Social Action|Social hub|Action combat|World events|Game identity|Homepage detailed design target|Design Target First)/i.exec(firstFlowText)?.[0] ?? "";
    return {
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      h1Size: h1 ? Number.parseFloat(getComputedStyle(h1).fontSize) : 0,
      signalCount: document.querySelectorAll(".lgo-hero-signals span").length,
      ctaCount: document.querySelectorAll(".lgo-hero-actions-primary a").length,
      englishLeak,
      designReferenceText: document.querySelector<HTMLElement>(".lgo-design-target-reference")?.textContent ?? "",
      heroText: document.querySelector<HTMLElement>(".lgo-cinematic-hero")?.textContent ?? "",
    };
  });
}

test.describe("homepage Vietnamese first-flow", () => {
  test("/ starts from Vietnamese homepage design target without English marketing leaks", async ({ page, isMobile }) => {
    await page.goto(`${web}/`);
    await expect(page.getByRole("region", { name: /Design target reference.*Public Homepage/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /Thiết kế chi tiết trang chủ.*Public Homepage.*mở trong tab mới/i })).toHaveAttribute("href", "/design-reference/homepage-detailed-design-target-v1118.png");
    await expect(page.getByRole("heading", { level: 1, name: "Sống một đời khác trong Linh Giới" })).toBeVisible();
    await expect(page.getByText("MMORPG hành động cộng đồng 2D", { exact: true })).toBeVisible();
    await expect(page.getByText("Trung tâm cộng đồng", { exact: true })).toBeVisible();
    await expect(page.getByText("Chiến đấu hành động", { exact: true })).toBeVisible();
    await expect(page.getByText("Sự kiện thế giới", { exact: true })).toBeVisible();

    const metrics = await collectHomeVietnameseMetrics(page);
    expect(metrics.designReferenceText, "homepage design target link uses Vietnamese visible label").toContain("Thiết kế chi tiết trang chủ");
    expect(metrics.heroText, "homepage hero states Vietnamese game genre").toContain("MMORPG hành động cộng đồng 2D");
    expect(metrics.englishLeak, "homepage first-flow visible copy should be Vietnamese").toBe("");
    expect(metrics.signalCount, "homepage identity signal chips").toBeGreaterThanOrEqual(4);
    expect(metrics.ctaCount, "homepage primary CTA count").toBeGreaterThanOrEqual(3);
    expect(metrics.overflow, "homepage horizontal overflow").toBeLessThanOrEqual(0);
    expect(metrics.h1Size, "homepage h1 follows target scale").toBeLessThanOrEqual(isMobile ? 54 : 66);
  });
});
