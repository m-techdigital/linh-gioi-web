// v1.137 coverage: /classes keeps Vietnamese design target copy and follows the Năm Lộ design target first-flow.
import { test, expect } from "@playwright/test";

const web = process.env.LGO_WEB_URL ?? "http://127.0.0.1:3000";

type ClassesDesignMetrics = {
  overflow: number;
  h1Size: number;
  heroTop: number;
  heroHeight: number;
  heroBottom: number;
  classGridTop: number;
  firstClassVisibleHeight: number;
  identityTop: number;
  artTop: number;
  targetText: string;
  bodyText: string;
};

async function collectClassesDesignMetrics(page): Promise<ClassesDesignMetrics> {
  return page.evaluate(() => {
    const rect = (selector: string) => {
      const node = document.querySelector<HTMLElement>(selector);
      if (!node) return { top: -1, bottom: -1, height: 0 };
      const r = node.getBoundingClientRect();
      return { top: r.top, bottom: r.bottom, height: r.height };
    };
    const visibleHeight = (selector: string) => {
      const r = rect(selector);
      return Math.max(0, Math.min(window.innerHeight, r.bottom) - Math.max(0, r.top));
    };
    const hero = rect(".lgo-classespage-stack .lgo-paths-hero");
    const classGrid = rect(".lgo-classespage-stack .lgo-class-path-grid");
    const identity = rect(".lgo-classespage-stack .lgo-class-identity-section");
    const art = rect(".lgo-classespage-stack .lgo-class-art-spotlight");
    const h1 = document.querySelector<HTMLElement>("main h1");
    const target = document.querySelector<HTMLElement>(".lgo-design-target-reference");
    return {
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      h1Size: h1 ? Number.parseFloat(getComputedStyle(h1).fontSize) : 0,
      heroTop: hero.top,
      heroHeight: hero.height,
      heroBottom: hero.bottom,
      classGridTop: classGrid.top,
      firstClassVisibleHeight: visibleHeight(".lgo-classespage-stack .lgo-class-path"),
      identityTop: identity.top,
      artTop: art.top,
      targetText: target?.textContent ?? "",
      bodyText: document.body.innerText,
    };
  });
}

test.describe("classes Vietnamese design match v1.137", () => {
  test("/classes uses Vietnamese target copy and Năm Lộ first-flow density", async ({ page, isMobile }) => {
    await page.goto(`${web}/classes`);
    await expect(page.getByRole("heading", { name: "Chọn cách bạn nhìn và bảo vệ thế giới" })).toBeVisible();
    await expect(page.getByRole("region", { name: /Design target reference.*Public Classes/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /Thiết kế chi tiết Năm Lộ/i })).toBeVisible();
    await expect(page.getByText("Class philosophy")).toHaveCount(0);
    await expect(page.getByText("Class identity")).toHaveCount(0);
    await expect(page.getByText("Development art preview", { exact: false })).toHaveCount(0);
    await expect(page.getByText("Modular gear board", { exact: false })).toHaveCount(0);
    await expect(page.getByText("production-final", { exact: false })).toHaveCount(0);

    const metrics = await collectClassesDesignMetrics(page);
    expect(metrics.targetText, "classes target label is Vietnamese").toContain("Thiết kế chi tiết Năm Lộ");
    expect(metrics.overflow, "classes page horizontal overflow").toBeLessThanOrEqual(0);
    expect(metrics.h1Size, "classes h1 stays below giant-font threshold").toBeLessThanOrEqual(isMobile ? 52 : 78);
    expect(metrics.bodyText, "English implementation labels should not leak into /classes first-flow").not.toMatch(/Class philosophy|Class identity|Development art preview|Modular gear board|production-final/);

    if (!isMobile) {
      expect(metrics.heroHeight, "desktop hero leaves room for class cards like the target").toBeLessThanOrEqual(520);
      expect(metrics.classGridTop, "five class cards start in the opening viewport").toBeLessThanOrEqual(680);
      expect(metrics.firstClassVisibleHeight, "first class card remains visible in first fold").toBeGreaterThanOrEqual(110);
      expect(metrics.identityTop, "identity/detail band follows the first cards without a long blank gap").toBeLessThanOrEqual(1340);
      expect(metrics.artTop, "art board remains after identity deck, not before the target first-flow").toBeGreaterThan(metrics.identityTop);
    } else {
      expect(metrics.heroBottom, "mobile hero is readable without oversized vertical sprawl").toBeLessThanOrEqual(1360);
      expect(metrics.classGridTop, "mobile reaches class cards without excessive blank space").toBeLessThanOrEqual(1450);
    }
  });
});
