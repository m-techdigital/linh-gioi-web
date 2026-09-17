import { expect, test } from "@playwright/test";
import { publicRouteMatrix } from "@lgo-web/content";
import fs from "node:fs";
import path from "node:path";

const TARGET_MEDIAN_CSS_BYTES = 196_418;
const STATIC_BUILD = process.env.LGO_STATIC_BUILD_PATH;

function median(values: number[]) {
  const sorted = [...values].sort((a, b) => a - b);
  return sorted[Math.floor(sorted.length / 2)];
}

function appRouteFile(app: string, pathname: string, extension: ".html" | ".rsc") {
  const route = pathname.replace(/\/$/, "") || "/";
  return path.join(app, ".next/server/app", `${route === "/" ? "index" : route.slice(1)}${extension}`);
}
test.describe("WEB-OPT-01 public CSS ownership/payload v1.278", () => {
  test.setTimeout(180_000);

  test.beforeEach(async ({ context }) => {
    if (!STATIC_BUILD) return;
    const app = STATIC_BUILD;
    await context.route("http://wip.local/**", async (route) => {
      const url = new URL(route.request().url());
      let file: string | undefined;
      let contentType = "application/octet-stream";
      if (url.searchParams.has("_rsc")) {
        file = appRouteFile(app, url.pathname, ".rsc"); contentType = "text/x-component";
      } else if (url.pathname.startsWith("/_next/static/")) {
        file = path.join(app, ".next", url.pathname.slice("/_next/".length));
      } else if (url.pathname === "/_next/image") {
        const source = url.searchParams.get("url");
        if (source?.startsWith("/")) file = path.join(app, "public", source);
      } else if (url.pathname.startsWith("/game-art/") || url.pathname.startsWith("/design-reference/")) {
        file = path.join(app, "public", url.pathname);
      } else {
        file = appRouteFile(app, url.pathname, ".html"); contentType = "text/html";
      }
      if (!file || !fs.existsSync(file)) return route.fulfill({ status: 404, body: "not found" });
      if (file.endsWith(".css")) contentType = "text/css";
      else if (file.endsWith(".js")) contentType = "application/javascript";
      else if (file.endsWith(".png")) contentType = "image/png";
      else if (file.endsWith(".webp")) contentType = "image/webp";
      else if (file.endsWith(".jpg") || file.endsWith(".jpeg")) contentType = "image/jpeg";
      else if (file.endsWith(".svg")) contentType = "image/svg+xml";
      else if (file.endsWith(".woff2")) contentType = "font/woff2";
      return route.fulfill({ status: 200, contentType, body: fs.readFileSync(file) });
    });
  });

  test("all sitemap routes stay overflow-free and median decoded CSS meets the reset budget", async ({ page }) => {
    const routes = publicRouteMatrix.map((entry) => entry.route);
    expect(routes).toHaveLength(59);
    const rows: Array<{ route: string; cssBytes: number; overflow: boolean }> = [];
    for (const route of routes) {
      const response = await page.goto(route, { waitUntil: "load" });
      expect(response?.ok(), `${route} HTTP status`).toBeTruthy();
      await expect(page.locator(".lgo-public-shell")).toBeVisible();
      await expect(page.locator("h1").first()).toBeVisible();
      const metrics = await page.evaluate(() => ({
        cssBytes: performance.getEntriesByType("resource")
          .filter((entry) => entry.name.includes(".css"))
          .reduce((sum, entry) => sum + (entry.decodedBodySize || 0), 0),
        overflow: document.documentElement.scrollWidth > window.innerWidth + 1,
      }));
      rows.push({ route, ...metrics });
    }
    const overflowRoutes = rows.filter((row) => row.overflow).map((row) => row.route);
    expect(overflowRoutes, `overflow routes: ${overflowRoutes.join(", ")}`).toEqual([]);
    expect(median(rows.map((row) => row.cssBytes))).toBeLessThanOrEqual(TARGET_MEDIAN_CSS_BYTES);
  });

  test("representative modern and legacy families retain the public shell and primary heading", async ({ page }) => {
    for (const route of ["/", "/status", "/support", "/guides", "/news", "/game/loop"]) {
      await page.goto(route, { waitUntil: "load" });
      await expect(page.locator(".lgo-site-header")).toBeVisible();
      await expect(page.locator(".lgo-public-shell footer")).toBeVisible();
      await expect(page.locator("h1").first()).toBeVisible();
    }
  });
});
