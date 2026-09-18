// v1.49 coverage: Ops visual image loading intent, typography and overflow.
import { test, expect } from "@playwright/test";

const ops = process.env.LGO_OPS_URL ?? "http://127.0.0.1:3002";

const routes = [
  { path: "/", heading: "Ops/Admin Shell", alt: "Ops home world concept", loading: "eager", desktopTop: 1000, mobileTop: 1300 },
  { path: "/control-center", heading: "Control Center", alt: "Ops visual proof Đông Môn world concept", loading: "lazy", desktopTop: 1900, mobileTop: 2600 },
  { path: "/security-governance", heading: "Security & Governance", alt: "Governance world context", loading: "eager", desktopTop: 1000, mobileTop: 1300 },
] as const;

type Metrics = {
  complete: boolean;
  naturalWidth: number;
  loading: string | null;
  top: number;
  width: number;
  height: number;
  overflow: number;
  h1: number;
  bodyCopy: number[];
};

async function collectMetrics(page: import("@playwright/test").Page, alt: string): Promise<Metrics> {
  return page.evaluate((imageAlt) => {
    const image = document.querySelector<HTMLImageElement>(`img[alt="${imageAlt}"]`);
    if (!image) throw new Error(`missing image ${imageAlt}`);
    const rect = image.getBoundingClientRect();
    const h1 = document.querySelector("h1");
    return {
      complete: image.complete,
      naturalWidth: image.naturalWidth,
      loading: image.getAttribute("loading"),
      top: rect.top,
      width: rect.width,
      height: rect.height,
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      h1: h1 ? Number.parseFloat(getComputedStyle(h1).fontSize) : 0,
      bodyCopy: Array.from(document.querySelectorAll("main p")).map((node) => Number.parseFloat(getComputedStyle(node).fontSize)),
    };
  }, alt);
}

test.describe("Ops visual image loading intent", () => {
  for (const route of routes) {
    test(`${route.path} keeps intentional image loading without layout overflow`, async ({ page, isMobile }) => {
      await page.goto(`${ops}${route.path}`);
      await expect(page.getByRole("heading", { name: route.heading, exact: true })).toBeVisible();
      const image = page.getByRole("img", { name: route.alt });
      await expect(image).toBeVisible();
      await expect(image).toHaveAttribute("loading", route.loading);

      const metrics = await collectMetrics(page, route.alt);
      expect(metrics.complete, "image decode/load state").toBe(true);
      expect(metrics.naturalWidth, "image natural width").toBeGreaterThan(0);
      expect(metrics.top, "image remains in intentional route composition").toBeLessThan(isMobile ? route.mobileTop : route.desktopTop);
      expect(metrics.width, "image rendered width").toBeGreaterThan(120);
      expect(metrics.height, "image rendered height").toBeGreaterThan(80);
      expect(metrics.overflow, "horizontal overflow").toBeLessThanOrEqual(0);
      expect(metrics.h1, "h1 font-size cap").toBeLessThanOrEqual(isMobile ? 34 : 46);
      for (const size of metrics.bodyCopy) expect(size, "body copy font-size cap").toBeLessThanOrEqual(18);
    });
  }
});
