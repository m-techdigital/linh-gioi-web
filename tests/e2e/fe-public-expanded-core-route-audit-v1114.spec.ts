// v1.114 coverage: expanded public core routes keep registered design-target attachment, readable layout and serious axe cleanliness.
import { test, expect, type Page } from "@playwright/test";
import { readFileSync } from "node:fs";

const axeSource = readFileSync(require.resolve("axe-core/axe.min.js"), "utf8");
const web = process.env.LGO_WEB_URL ?? "http://127.0.0.1:3000";

const coreRoutes = [
  { route: "/", designScope: /Public Core/i },
  { route: "/game", designScope: /Public Core/i },
  { route: "/game/loop", designScope: /Public Core/i },
  { route: "/classes", designScope: /Public Core/i },
  { route: "/story", designScope: /Public Core/i },
  { route: "/journey", designScope: /Public Core/i },
  { route: "/start", designScope: /Public Core/i },
  { route: "/guides", designScope: /Public Core/i },
  { route: "/guides/beginner", designScope: /Public Core/i },
  { route: "/guides/beginner-training-loop-guide", designScope: /Public Core/i },
  { route: "/news", designScope: /Public Core/i },
  { route: "/events", designScope: /Public Core/i },
  { route: "/patch-notes", designScope: /Public Core/i }
];

type LayoutMetrics = {
  overflow: number;
  h1Sizes: number[];
  h2Sizes: number[];
  navSizes: number[];
};

async function collectLayout(page: Page): Promise<LayoutMetrics> {
  return page.evaluate(() => {
    const sizes = (selector: string) => Array.from(document.querySelectorAll<HTMLElement>(selector)).map((node) => Number.parseFloat(getComputedStyle(node).fontSize));
    return {
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      h1Sizes: sizes("main h1"),
      h2Sizes: sizes("main h2"),
      navSizes: sizes(".lgo-brand-nav a")
    };
  });
}

async function collectSeriousAxeViolations(page: Page) {
  await page.addScriptTag({ content: axeSource });
  return page.evaluate(async () => {
    const axe = (window as unknown as { axe: { run: (root: Document, options: object) => Promise<{ violations: Array<{ id: string; impact: string | null; nodes: Array<{ target: string[] }> }> }> } }).axe;
    const result = await axe.run(document, { runOnly: ["wcag2a", "wcag2aa"], rules: { "color-contrast": { enabled: false } } });
    return result.violations
      .filter((violation) => violation.impact === "serious" || violation.impact === "critical")
      .map((violation) => ({ id: violation.id, impact: violation.impact, targets: violation.nodes.map((node) => node.target) }));
  });
}

test.describe("expanded public core route audit", () => {
  for (const item of coreRoutes) {
    test(`${item.route} keeps core design target and readable layout`, async ({ page, isMobile }) => {
      await page.goto(`${web}${item.route}`);
      await expect(page.locator("main h1").first(), `${item.route} h1`).toBeVisible();
      await expect(page.getByRole("region", { name: new RegExp(`Design target reference.*${item.designScope.source}`, "i") })).toBeVisible();
      const layout = await collectLayout(page);
      expect(layout.overflow, `${item.route} horizontal overflow`).toBeLessThanOrEqual(0);
      for (const size of layout.h1Sizes) expect(size, `${item.route} h1 font-size`).toBeLessThanOrEqual(isMobile ? 54 : 70);
      for (const size of layout.h2Sizes) expect(size, `${item.route} h2 font-size`).toBeLessThanOrEqual(isMobile ? 42 : 56);
      for (const size of layout.navSizes) expect(size, `${item.route} nav font-size`).toBeLessThanOrEqual(18);
      expect(await collectSeriousAxeViolations(page), `${item.route} serious/critical axe violations`).toEqual([]);
    });
  }
});
