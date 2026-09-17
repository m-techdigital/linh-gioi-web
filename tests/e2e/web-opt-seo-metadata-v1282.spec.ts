import { expect, test, type Page } from "@playwright/test";
import { publicRouteMatrix } from "@lgo-web/content";
import fs from "node:fs";
import path from "node:path";

const STATIC_BUILD = process.env.LGO_STATIC_BUILD_PATH;
const SITE = "https://linhgioi.vn";

function appRouteFile(app: string, pathname: string, extension: ".html" | ".rsc") {
  const route = pathname.replace(/\/$/, "") || "/";
  return path.join(app, ".next/server/app", `${route === "/" ? "index" : route.slice(1)}${extension}`);
}

async function ready(page: Page) {
  await page.locator("h1").first().waitFor({ state: "visible", timeout: 10_000 });
  await page.evaluate(() => document.fonts.ready);
}

test.describe("WEB-OPT-05 SEO metadata/sitemap ownership v1.282", () => {
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
      } else if (url.pathname.startsWith("/game-art/")) {
        file = path.join(app, "public", url.pathname);
      } else if (url.pathname === "/sitemap.xml") {
        file = path.join(app, ".next/server/app/sitemap.xml.body"); contentType = "application/xml";
      } else if (url.pathname === "/robots.txt") {
        file = path.join(app, ".next/server/app/robots.txt.body"); contentType = "text/plain";
      } else {
        file = appRouteFile(app, url.pathname, ".html"); contentType = "text/html";
      }
      if (!file || !fs.existsSync(file)) return route.fulfill({ status: 404, body: "not found" });
      if (file.endsWith(".css")) contentType = "text/css";
      else if (file.endsWith(".js")) contentType = "application/javascript";
      else if (file.endsWith(".png")) contentType = "image/png";
      else if (file.endsWith(".webp")) contentType = "image/webp";
      else if (file.endsWith(".svg")) contentType = "image/svg+xml";
      else if (file.endsWith(".woff2")) contentType = "font/woff2";
      return route.fulfill({ status: 200, contentType, body: fs.readFileSync(file) });
    });
  });

  test("all 40 indexable routes expose unique descriptions and canonical/OG URLs", async ({ page }) => {
    const routes = publicRouteMatrix.filter((entry) => entry.indexability === "index");
    expect(routes).toHaveLength(40);
    const descriptions: string[] = [];
    for (const policy of routes) {
      const response = await page.goto(policy.route, { waitUntil: "load" });
      expect(response?.ok(), `${policy.route} HTTP`).toBeTruthy();
      await ready(page);
      const metadata = await page.evaluate(() => ({
        description: document.querySelector<HTMLMetaElement>('meta[name="description"]')?.content ?? "",
        canonical: document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href ?? "",
        robots: document.querySelector<HTMLMetaElement>('meta[name="robots"]')?.content ?? "",
        ogUrl: document.querySelector<HTMLMetaElement>('meta[property="og:url"]')?.content ?? "",
        ogDescription: document.querySelector<HTMLMetaElement>('meta[property="og:description"]')?.content ?? "",
      }));
      expect(metadata.description.length, `${policy.route} description`).toBeGreaterThan(45);
      expect(metadata.canonical, `${policy.route} canonical`).toBe(`${SITE}${policy.route === "/" ? "/" : policy.route}`);
      expect(metadata.robots.toLowerCase(), `${policy.route} robots`).not.toContain("noindex");
      expect(new URL(metadata.ogUrl).href, `${policy.route} og:url`).toBe(new URL(metadata.canonical).href);
      expect(metadata.ogDescription, `${policy.route} og:description`).toBe(metadata.description);
      descriptions.push(metadata.description);
    }
    expect(new Set(descriptions).size).toBe(descriptions.length);
  });

  test("all 19 archive routes are canonical noindex surfaces", async ({ page }) => {
    const routes = publicRouteMatrix.filter((entry) => entry.indexability === "noindex");
    expect(routes).toHaveLength(19);
    for (const policy of routes) {
      const response = await page.goto(policy.route, { waitUntil: "load" });
      expect(response?.ok(), `${policy.route} HTTP`).toBeTruthy();
      await ready(page);
      const metadata = await page.evaluate(() => ({
        canonical: document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href ?? "",
        robots: document.querySelector<HTMLMetaElement>('meta[name="robots"]')?.content ?? "",
      }));
      expect(metadata.canonical).toBe(`${SITE}${policy.route}`);
      expect(metadata.robots.toLowerCase()).toContain("noindex");
    }
  });

  test("sitemap contains only indexable routes and uses source dates for guides", async ({ page }) => {
    const response = await page.goto("/sitemap.xml", { waitUntil: "load" });
    expect(response?.ok()).toBeTruthy();
    const rows = await page.locator("url").evaluateAll((nodes) => nodes.map((node) => ({
      loc: node.querySelector("loc")?.textContent ?? "",
      lastmod: node.querySelector("lastmod")?.textContent ?? "",
    })));
    const urls = rows.map((row) => row.loc);
    const expected = publicRouteMatrix.filter((entry) => entry.indexability === "index").map((entry) => `${SITE}${entry.route === "/" ? "/" : entry.route}`);
    expect(urls).toHaveLength(40);
    expect(new Set(urls)).toEqual(new Set(expected));
    expect(urls.some((url) => url.endsWith("/events"))).toBe(false);
    expect(urls.some((url) => url.endsWith("/patch-notes"))).toBe(false);
    expect(urls.some((url) => url.includes("/news/web-program-control-tower"))).toBe(false);
    const guide = rows.find((row) => row.loc.endsWith("/guides/gate-entry-guide"));
    expect(guide?.lastmod).toBe("2026-09-05T04:00:00.000Z");
    const game = rows.find((row) => row.loc.endsWith("/game"));
    expect(game?.lastmod).toBe("");
  });

  test("robots publishes an explicit host and absolute sitemap", async ({ page }) => {
    const response = await page.goto("/robots.txt", { waitUntil: "load" });
    expect(response?.ok()).toBeTruthy();
    const text = (await page.textContent("body")) ?? "";
    expect(text).toContain("User-Agent: *");
    expect(text).toContain("Allow: /");
    expect(text).toContain(`Host: ${SITE}`);
    expect(text).toContain(`Sitemap: ${SITE}/sitemap.xml`);
  });
});
