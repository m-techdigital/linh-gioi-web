// v1.65 coverage: expanded FE route readability, overflow, axe and scroll-region audit across public, Portal and Ops.
import { test, expect, type Page } from "@playwright/test";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";

const require = createRequire(__filename);
const axeSource = readFileSync(require.resolve("axe-core/axe.min.js"), "utf8");

const portal = process.env.LGO_PORTAL_URL ?? "http://127.0.0.1:3001";
const ops = process.env.LGO_OPS_URL ?? "http://127.0.0.1:3002";

type RouteCase = {
  name: string;
  url: string;
  heading: string;
  app: "public" | "portal" | "ops";
  requireScrollableRegion?: "public-brand" | "workspace" | "data-table";
};

const routes: RouteCase[] = [
  { app: "public", name: "public home", url: "/", heading: "Sống một đời khác trong Linh Giới", requireScrollableRegion: "public-brand" },
  { app: "public", name: "public game", url: "/game", heading: "Một thế giới có nơi để trở về", requireScrollableRegion: "public-brand" },
  { app: "public", name: "public story", url: "/story", heading: "Cho đến ngày những cánh cửa bắt đầu mở", requireScrollableRegion: "public-brand" },
  { app: "public", name: "public journey", url: "/journey", heading: "20 phút không chỉ để đánh quái", requireScrollableRegion: "public-brand" },
  { app: "public", name: "public start", url: "/start", heading: "Học cách di chuyển. Chọn nhịp chiến đấu. Mở cánh cửa vào thành.", requireScrollableRegion: "public-brand" },
  { app: "public", name: "public news detail", url: "/news/web-program-control-tower", heading: "Web program control tower established", requireScrollableRegion: "public-brand" },
  { app: "public", name: "public guide detail", url: "/guides/player-safety-support-guide", heading: "Hướng dẫn an toàn và hỗ trợ cho người chơi mới", requireScrollableRegion: "public-brand" },
  { app: "portal", name: "portal home", url: `${portal}/`, heading: "Tổng quan người chơi", requireScrollableRegion: "workspace" },
  { app: "portal", name: "portal sessions", url: `${portal}/account/sessions`, heading: "Phiên đăng nhập", requireScrollableRegion: "data-table" },
  { app: "portal", name: "portal support", url: `${portal}/support`, heading: "Hỗ trợ người chơi", requireScrollableRegion: "workspace" },
  { app: "portal", name: "portal login", url: `${portal}/login`, heading: "Đăng nhập Linh Giới", requireScrollableRegion: "workspace" },
  { app: "ops", name: "ops home", url: `${ops}/`, heading: "Ops/Admin Shell", requireScrollableRegion: "workspace" },
  { app: "ops", name: "ops support", url: `${ops}/support`, heading: "Support triage", requireScrollableRegion: "data-table" },
  { app: "ops", name: "ops player operations", url: `${ops}/player-operations`, heading: "Player Operations", requireScrollableRegion: "data-table" },
  { app: "ops", name: "ops player detail", url: `${ops}/player-operations/player-linh-001`, heading: "Player review · Fixture Player 001", requireScrollableRegion: "workspace" },
  { app: "ops", name: "ops security", url: `${ops}/security-governance`, heading: "Security & Governance", requireScrollableRegion: "workspace" },
];

type RouteMetrics = {
  overflow: number;
  maxFont: number;
  navAndActionFonts: number[];
  seriousAxeViolations: Array<{ id: string; impact: string | null; targets: string[] }>;
  scrollRegions: Array<{
    className: string;
    role: string | null;
    ariaLabel: string | null;
    tabIndex: number;
    scrollWidth: number;
    clientWidth: number;
    overflowX: string;
  }>;
};

async function collectMetrics(page: Page): Promise<RouteMetrics> {
  await page.addScriptTag({ content: axeSource });
  return page.evaluate(async () => {
    const visible = Array.from(document.querySelectorAll<HTMLElement>("body *")).filter((el) => {
      const rect = el.getBoundingClientRect();
      const style = getComputedStyle(el);
      return rect.width > 0 && rect.height > 0 && rect.top < innerHeight * 2 && style.display !== "none" && style.visibility !== "hidden";
    });
    const axe = (window as unknown as { axe: { run: (root: Document, options: object) => Promise<{ violations: Array<{ id: string; impact: string | null; nodes: Array<{ target: string[] }> }> }> } }).axe;
    const axeResult = await axe.run(document, { runOnly: ["wcag2a", "wcag2aa"], rules: { "color-contrast": { enabled: false } } });
    const scrollRegions = Array.from(document.querySelectorAll<HTMLElement>('[role="region"], nav, .lgo-brand-links, .lgo-workspace-nav, .lgo-data-table-wrap'))
      .filter((el) => el.scrollWidth > el.clientWidth + 1 || el.tabIndex >= 0 || el.getAttribute("role") === "region")
      .map((el) => ({
        className: String(el.className ?? ""),
        role: el.getAttribute("role"),
        ariaLabel: el.getAttribute("aria-label"),
        tabIndex: el.tabIndex,
        scrollWidth: el.scrollWidth,
        clientWidth: el.clientWidth,
        overflowX: getComputedStyle(el).overflowX,
      }));
    return {
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      maxFont: Math.max(0, ...visible.map((el) => Number.parseFloat(getComputedStyle(el).fontSize)).filter(Number.isFinite)),
      navAndActionFonts: Array.from(document.querySelectorAll<HTMLElement>("nav a, main a, main button, main input, main select")).map((el) => Number.parseFloat(getComputedStyle(el).fontSize)),
      seriousAxeViolations: axeResult.violations
        .filter((violation) => violation.impact === "serious" || violation.impact === "critical")
        .map((violation) => ({ id: violation.id, impact: violation.impact, targets: violation.nodes.flatMap((node) => node.target).slice(0, 4) })),
      scrollRegions,
    };
  });
}

function expectNamedScrollableRegion(metrics: RouteMetrics, required: RouteCase["requireScrollableRegion"], routeName: string) {
  if (required === "public-brand") {
    const rail = metrics.scrollRegions.find((region) => region.className.includes("lgo-brand-links"));
    expect(rail, `${routeName} public brand rail`).toBeTruthy();
    expect(rail?.role, `${routeName} public brand rail role`).toBe("region");
    expect(rail?.ariaLabel, `${routeName} public brand rail label`).toBe("Liên kết điều hướng chính");
    expect(rail?.tabIndex, `${routeName} public brand rail tabindex`).toBe(0);
    expect(rail?.scrollWidth ?? 0, `${routeName} public brand rail scrollable`).toBeGreaterThan(rail?.clientWidth ?? 0);
  }
  if (required === "workspace") {
    const nav = metrics.scrollRegions.find((region) => region.className.includes("lgo-workspace-nav"));
    expect(nav, `${routeName} workspace nav`).toBeTruthy();
    expect(nav?.ariaLabel, `${routeName} workspace nav label`).toBe("Linh Giới navigation");
    expect(nav?.tabIndex, `${routeName} workspace nav tabindex`).toBe(0);
    expect(nav?.scrollWidth ?? 0, `${routeName} workspace nav scrollable`).toBeGreaterThan(nav?.clientWidth ?? 0);
  }
  if (required === "data-table") {
    const table = metrics.scrollRegions.find((region) => region.className.includes("lgo-data-table-wrap"));
    expect(table, `${routeName} data table scroll region`).toBeTruthy();
    expect(table?.role, `${routeName} data table role`).toBe("region");
    expect(table?.ariaLabel, `${routeName} data table label`).toContain("Scrollable data table:");
    expect(table?.tabIndex, `${routeName} data table tabindex`).toBe(0);
    expect(table?.scrollWidth ?? 0, `${routeName} data table scrollable`).toBeGreaterThan(table?.clientWidth ?? 0);
  }
}

test.describe("expanded FE route readability audit", () => {
  for (const route of routes) {
    test(`${route.name} keeps mobile layout readable and accessible`, async ({ page, isMobile }) => {
      test.skip(!isMobile, "v1.65 expanded audit targets mobile layout and horizontal scroll affordances");
      await page.goto(route.url);
      await expect(page.getByRole("heading", { name: route.heading })).toBeVisible();
      const metrics = await collectMetrics(page);
      expect(metrics.seriousAxeViolations, `${route.name} serious/critical axe violations`).toEqual([]);
      expect(metrics.overflow, `${route.name} horizontal overflow`).toBeLessThanOrEqual(0);
      expect(metrics.maxFont, `${route.name} max visible font-size`).toBeLessThanOrEqual(route.app === "public" ? 48 : 34);
      for (const size of metrics.navAndActionFonts) expect(size, `${route.name} nav/action font-size`).toBeLessThanOrEqual(18);
      expectNamedScrollableRegion(metrics, route.requireScrollableRegion, route.name);
    });
  }
});
