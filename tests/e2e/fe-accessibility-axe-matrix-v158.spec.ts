// v1.58 coverage: representative public, Portal and Ops routes have no serious/critical axe violations.
import { test, expect, type Page } from "@playwright/test";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";

const require = createRequire(__filename);
const axeSource = readFileSync(require.resolve("axe-core/axe.min.js"), "utf8");

const web = process.env.LGO_WEB_URL ?? "http://127.0.0.1:3000";
const portal = process.env.LGO_PORTAL_URL ?? "http://127.0.0.1:3001";
const ops = process.env.LGO_OPS_URL ?? "http://127.0.0.1:3002";

const routeMatrix = [
  { app: "public", base: web, route: "/", heading: "Sống một đời khác trong Linh Giới" },
  { app: "public", base: web, route: "/classes", heading: "Chọn cách bạn nhìn và bảo vệ thế giới" },
  { app: "public", base: web, route: "/download", heading: "Trạng thái chơi & tải game" },
  { app: "portal", base: portal, route: "/login", heading: "Đăng nhập Linh Giới" },
  { app: "portal", base: portal, route: "/support", heading: "Hỗ trợ người chơi" },
  { app: "ops", base: ops, route: "/support", heading: "Support triage" },
  { app: "ops", base: ops, route: "/audit", heading: "Audit" },
  { app: "ops", base: ops, route: "/trust-safety", heading: "Trust & Safety" },
];

type AxeViolation = {
  id: string;
  impact: string | null;
  description: string;
  nodes: Array<{ target: string[]; html: string; failureSummary?: string }>;
};

type RouteMetrics = {
  overflow: number;
  h1: number[];
  navButtonsAndLinks: number[];
  axeViolations: AxeViolation[];
};

async function runAxe(page: Page): Promise<AxeViolation[]> {
  await page.addScriptTag({ content: axeSource });
  return page.evaluate(async () => {
    const result = await window.axe.run(document, { runOnly: ["wcag2a", "wcag2aa"] });
    return result.violations
      .filter((violation) => violation.impact === "serious" || violation.impact === "critical")
      .map((violation) => ({
        id: violation.id,
        impact: violation.impact,
        description: violation.description,
        nodes: violation.nodes.slice(0, 3).map((node) => ({
          target: node.target,
          html: node.html,
          failureSummary: node.failureSummary,
        })),
      }));
  });
}

async function collectMetrics(page: Page): Promise<RouteMetrics> {
  const axeViolations = await runAxe(page);
  const layout = await page.evaluate(() => ({
    overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    h1: Array.from(document.querySelectorAll("main h1")).map((node) => Number.parseFloat(getComputedStyle(node).fontSize)),
    navButtonsAndLinks: Array.from(document.querySelectorAll("nav a, main a, main button")).map((node) => Number.parseFloat(getComputedStyle(node).fontSize)),
  }));
  return { ...layout, axeViolations };
}

test.describe("FE accessibility axe route matrix", () => {
  for (const route of routeMatrix) {
    test(`${route.app} ${route.route} has no serious axe violation`, async ({ page, isMobile }) => {
      await page.goto(`${route.base}${route.route}`);
      await expect(page.getByRole("heading", { name: route.heading })).toBeVisible();
      const metrics = await collectMetrics(page);
      expect(metrics.axeViolations, `${route.app} ${route.route} serious/critical axe violations`).toEqual([]);
      expect(metrics.overflow, `${route.app} ${route.route} horizontal overflow`).toBeLessThanOrEqual(0);
      for (const size of metrics.h1) expect(size, `${route.app} ${route.route} h1 font-size`).toBeLessThanOrEqual(isMobile ? 54 : 66);
      for (const size of metrics.navButtonsAndLinks) expect(size, `${route.app} ${route.route} nav/button/link font-size`).toBeLessThanOrEqual(18);
    });
  }
});
