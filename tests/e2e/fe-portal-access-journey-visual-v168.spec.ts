// v1.68 coverage: Portal access journey renders a real game-art visual while preserving keyboard navigation and mobile readability.
import { test, expect, type Page } from "@playwright/test";

const portal = process.env.LGO_PORTAL_URL ?? "http://127.0.0.1:3001";

type AccessVisualMetrics = {
  pageOverflow: number;
  maxFont: number;
  actions: Array<{ text: string; fontSize: number }>;
  image: null | {
    src: string | null;
    alt: string | null;
    loading: string | null;
    naturalWidth: number;
    naturalHeight: number;
    width: number;
    height: number;
  };
};

async function collectAccessVisualMetrics(page: Page): Promise<AccessVisualMetrics> {
  return page.evaluate(() => {
    const visibleElements = Array.from(document.querySelectorAll<HTMLElement>("body *")).filter((element) => {
      const rect = element.getBoundingClientRect();
      const style = getComputedStyle(element);
      return rect.width > 0 && rect.height > 0 && style.visibility !== "hidden" && style.display !== "none";
    });
    const image = document.querySelector<HTMLImageElement>('img[alt="Portal access gate art"]');
    const rect = image?.getBoundingClientRect();
    return {
      pageOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      maxFont: Math.max(...visibleElements.map((element) => Number.parseFloat(getComputedStyle(element).fontSize) || 0)),
      actions: Array.from(document.querySelectorAll<HTMLAnchorElement>('.lgo-access-journey a')).map((link) => ({
        text: link.textContent?.trim() ?? "",
        fontSize: Number.parseFloat(getComputedStyle(link).fontSize),
      })),
      image: image && rect ? {
        src: image.getAttribute("src"),
        alt: image.getAttribute("alt"),
        loading: image.getAttribute("loading"),
        naturalWidth: image.naturalWidth,
        naturalHeight: image.naturalHeight,
        width: rect.width,
        height: rect.height,
      } : null,
    };
  });
}

test.describe("Portal access journey visual", () => {
  test("login access journey renders real gate art and keeps keyboard navigation readable", async ({ page, isMobile }) => {
    await page.goto(`${portal}/login`);
    await expect(page.getByRole("heading", { name: "Đăng nhập Linh Giới" })).toBeVisible();
    await expect(page.getByRole("img", { name: "Portal access gate art" })).toBeVisible();

    const metrics = await collectAccessVisualMetrics(page);
    expect(metrics.image, "portal access image metrics").not.toBeNull();
    expect(metrics.image?.src, "portal access image src").toContain("/game-art/world/dong-mon-skyline.webp");
    expect(metrics.image?.loading, "portal access image loading intent").toBe("eager");
    expect(metrics.image?.naturalWidth, "portal access image loaded width").toBeGreaterThan(0);
    expect(metrics.image?.naturalHeight, "portal access image loaded height").toBeGreaterThan(0);
    expect(metrics.pageOverflow, "Portal login horizontal overflow").toBeLessThanOrEqual(0);
    expect(metrics.maxFont, "Portal login visible font cap").toBeLessThanOrEqual(isMobile ? 34 : 48);
    for (const action of metrics.actions) {
      expect(action.fontSize, `${action.text} action font-size`).toBeLessThanOrEqual(18);
    }

    const recoveryLink = page.getByRole("link", { name: "Cần khôi phục truy cập" });
    await recoveryLink.focus();
    await expect(recoveryLink).toBeFocused();
  });
});
