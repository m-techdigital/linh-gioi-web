import { expect, test } from "@playwright/test";
import { publicRouteMatrix } from "@lgo-web/content";
import fs from "node:fs";
import path from "node:path";

const STATIC_BUILD = process.env.LGO_STATIC_BUILD_PATH;

function appRouteFile(app: string, pathname: string, extension: ".html" | ".rsc") {
  const route = pathname.replace(/\/$/, "") || "/";
  return path.join(app, ".next/server/app", `${route === "/" ? "index" : route.slice(1)}${extension}`);
}

function contentType(file: string) {
  if (file.endsWith(".css")) return "text/css";
  if (file.endsWith(".js")) return "application/javascript";
  if (file.endsWith(".png")) return "image/png";
  if (file.endsWith(".webp")) return "image/webp";
  if (file.endsWith(".jpg") || file.endsWith(".jpeg")) return "image/jpeg";
  if (file.endsWith(".svg")) return "image/svg+xml";
  if (file.endsWith(".woff2")) return "font/woff2";
  return "application/octet-stream";
}

async function installStaticBuild(context: import("@playwright/test").BrowserContext) {
  if (!STATIC_BUILD) return;
  await context.route("http://wip.local/**", async (route) => {
    const url = new URL(route.request().url());
    let file: string | undefined;
    let type = "application/octet-stream";
    if (url.searchParams.has("_rsc")) {
      file = appRouteFile(STATIC_BUILD, url.pathname, ".rsc"); type = "text/x-component";
    } else if (url.pathname.startsWith("/_next/static/")) {
      file = path.join(STATIC_BUILD, ".next", url.pathname.slice("/_next/".length));
    } else if (url.pathname === "/sitemap.xml") {
      file = path.join(STATIC_BUILD, ".next/server/app/sitemap.xml.body"); type = "application/xml";
    } else if (url.pathname.startsWith("/game-art/") || url.pathname.startsWith("/design-reference/")) {
      file = path.join(STATIC_BUILD, "public", url.pathname);
    } else {
      file = appRouteFile(STATIC_BUILD, url.pathname, ".html"); type = "text/html";
    }
    if (!file || !fs.existsSync(file)) return route.fulfill({ status: 404, body: "not found" });
    if (type === "application/octet-stream") type = contentType(file);
    return route.fulfill({ status: 200, contentType: type, body: fs.readFileSync(file) });
  });
}
async function ready(page: import("@playwright/test").Page) {
  await expect(page.locator("h1").first()).toBeVisible();
  await page.evaluate(async () => {
    await document.fonts.ready;
    await new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
  });
}

test.describe("WEB-OPT-03 public asset boundary/image delivery v1.280", () => {
  test.setTimeout(240_000);
  test.beforeEach(async ({ context }) => installStaticBuild(context));

  test("review-only design targets are not public and live routes keep healthy product images", async ({ page }) => {
    const review = await page.goto("/design-reference/homepage-detailed-design-target-v1118.png", { waitUntil: "load" });
    expect(review?.status()).toBe(404);
    const publicRoutes = publicRouteMatrix.map((entry) => entry.route);
    expect(publicRoutes).toHaveLength(59);
    const failures: Array<{ route: string; src: string }> = [];
    const reviewRequests: string[] = [];
    page.on("request", (request) => {
      if (new URL(request.url()).pathname.startsWith("/design-reference/")) reviewRequests.push(request.url());
    });
    for (const route of publicRoutes) {
      const response = await page.goto(route, { waitUntil: "load" });
      expect(response?.ok(), `${route} HTTP status`).toBeTruthy();
      await ready(page);
      await page.evaluate(async () => {
        window.scrollTo(0, document.documentElement.scrollHeight);
        await new Promise<void>((resolve) => setTimeout(resolve, 40));
      });
      const broken = await page.evaluate(() => [...document.images]
        .filter((image) => image.complete && image.naturalWidth === 0)
        .map((image) => image.currentSrc || image.src));
      failures.push(...broken.map((src) => ({ route, src })));
    }
    expect(reviewRequests, `live review-asset requests: ${reviewRequests.join(", ")}`).toEqual([]);
    expect(failures, JSON.stringify(failures, null, 2)).toEqual([]);
  });

  test("homepage hero uses bounded WebP delivery with stable dimensions", async ({ page }) => {
    await page.goto("/", { waitUntil: "load" });
    await ready(page);
    const hero = page.locator(".lgo-native-hero-scene img");
    await expect(hero).toBeVisible();
    const metrics = await hero.evaluate((image: HTMLImageElement) => {
      const entry = performance.getEntriesByName(image.currentSrc).at(-1) as PerformanceResourceTiming | undefined;
      return {
        width: image.naturalWidth,
        height: image.naturalHeight,
        currentSrc: image.currentSrc,
        encodedBodySize: entry?.encodedBodySize ?? 0,
        viewport: window.innerWidth,
      };
    });
    expect(metrics.currentSrc).toMatch(/\/game-art\/marketing\/hero-(?:artwork|mobile)\.webp$/);
    if (metrics.viewport <= 600) {
      expect(metrics.currentSrc).toContain("hero-mobile.webp");
      expect(metrics.width).toBe(565);
      expect(metrics.height).toBe(405);
      expect(metrics.encodedBodySize).toBeLessThanOrEqual(80_000);
    } else {
      expect(metrics.currentSrc).toContain("hero-artwork.webp");
      expect(metrics.width).toBe(1672);
      expect(metrics.height).toBe(405);
      expect(metrics.encodedBodySize).toBeLessThanOrEqual(200_000);
    }
  });
});
