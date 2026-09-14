// v1.85 coverage: public content utility routes expose a first h1 before CTA/card sections.
import { test, expect, type Page } from "@playwright/test";

const web = process.env.LGO_WEB_URL ?? "http://127.0.0.1:3000";
const routes = [
  { path: "/events", title: "Sự kiện Linh Giới" },
  { path: "/patch-notes", title: "Patch notes" },
  { path: "/news", title: "Tin tức" },
  { path: "/status", title: "Trạng thái / Maintenance" },
];

type HeadingMetrics = {
  pageOverflow: number;
  maxFont: number;
  headings: Array<{ tag: string; text: string }>;
};

async function collectHeadingMetrics(page: Page): Promise<HeadingMetrics> {
  return page.evaluate(() => {
    const visibleElements = Array.from(document.querySelectorAll<HTMLElement>("body *")).filter((element) => {
      const rect = element.getBoundingClientRect();
      const style = getComputedStyle(element);
      return rect.width > 0 && rect.height > 0 && style.visibility !== "hidden" && style.display !== "none";
    });
    return {
      pageOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      maxFont: Math.max(...visibleElements.map((element) => Number.parseFloat(getComputedStyle(element).fontSize) || 0)),
      headings: Array.from(document.querySelectorAll<HTMLElement>("main h1, main h2, main h3")).map((heading) => ({
        tag: heading.tagName.toLowerCase(),
        text: heading.textContent?.trim().replace(/\s+/g, " ") ?? "",
      })),
    };
  });
}

test.describe("public content heading order", () => {
  for (const route of routes) {
    test(`${route.path} starts main content with one page h1`, async ({ page, isMobile }) => {
      await page.goto(`${web}${route.path}`);
      await expect(page.getByRole("heading", { level: 1, name: route.title })).toBeVisible();

      const metrics = await collectHeadingMetrics(page);
      expect(metrics.headings[0], `${route.path} first heading`).toEqual({ tag: "h1", text: route.title });
      expect(metrics.headings.filter((heading) => heading.tag === "h1"), `${route.path} h1 count`).toHaveLength(1);
      expect(metrics.pageOverflow, `${route.path} horizontal overflow`).toBeLessThanOrEqual(0);
      expect(metrics.maxFont, `${route.path} visible font cap`).toBeLessThanOrEqual(isMobile ? 48 : 64);
    });
  }
});
