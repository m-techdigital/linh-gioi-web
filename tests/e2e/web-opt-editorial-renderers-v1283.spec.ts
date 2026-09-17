import { expect, test, type Page } from "@playwright/test";
import { contentEntries } from "../../packages/content/src/fixtures";
import fs from "node:fs";
import path from "node:path";

const STATIC_BUILD = process.env.LGO_STATIC_BUILD_PATH;
const news = contentEntries.filter((entry) => entry.category === "news" && entry.status === "published");
const guides = contentEntries.filter((entry) => entry.category === "guides" && entry.status === "published");

function appRouteFile(app: string, pathname: string, extension: ".html" | ".rsc") {
  const route = pathname.replace(/\/$/, "") || "/";
  return path.join(app, ".next/server/app", `${route === "/" ? "index" : route.slice(1)}${extension}`);
}

async function ready(page: Page) {
  await page.locator("h1").first().waitFor({ state: "visible", timeout: 10_000 });
  await page.evaluate(() => document.fonts.ready);
}

test.describe("WEB-OPT-06 editorial renderer consolidation v1.283", () => {
  test.setTimeout(180_000);
  test.beforeEach(async ({ context }) => {
    if (!STATIC_BUILD) return;
    const app = STATIC_BUILD;
    await context.route("http://wip.local/**", async (route) => {
      const url = new URL(route.request().url());
      let file: string | undefined;
      let contentType = "application/octet-stream";
      if (url.searchParams.has("_rsc")) { file = appRouteFile(app, url.pathname, ".rsc"); contentType = "text/x-component"; }
      else if (url.pathname.startsWith("/_next/static/")) file = path.join(app, ".next", url.pathname.slice("/_next/".length));
      else if (url.pathname === "/_next/image") { const source = url.searchParams.get("url"); if (source?.startsWith("/")) file = path.join(app, "public", source); }
      else if (url.pathname.startsWith("/game-art/")) file = path.join(app, "public", url.pathname);
      else { file = appRouteFile(app, url.pathname, ".html"); contentType = "text/html"; }
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

  test("all 17 News routes preserve authored semantics and archive metadata", async ({ page }) => {
    expect(news).toHaveLength(17);
    for (const entry of news) {
      const route = `/news/${entry.slug}`;
      const response = await page.goto(route, { waitUntil: "load" });
      expect(response?.ok(), route).toBeTruthy();
      await ready(page);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(entry.title);
      await expect(page.locator("main")).toContainText(entry.summary);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `https://linhgioi.vn${route}`);
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/i);
      await expect(page.locator("main h1")).toHaveCount(1);
    }
  });

  test("all 16 Guide routes preserve authored semantics and indexable metadata", async ({ page }) => {
    expect(guides).toHaveLength(16);
    for (const entry of guides) {
      const route = `/guides/${entry.slug}`;
      const response = await page.goto(route, { waitUntil: "load" });
      expect(response?.ok(), route).toBeTruthy();
      await ready(page);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(entry.title);
      await expect(page.locator("main")).toContainText(entry.summary);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `https://linhgioi.vn${route}`);
      await expect(page.locator('meta[name="robots"]')).not.toHaveAttribute("content", /noindex/i);
      await expect(page.locator("main h1")).toHaveCount(1);
    }
  });

  test("unknown editorial slugs remain 404", async ({ page }) => {
    for (const route of ["/news/not-a-real-lgo-article", "/guides/not-a-real-lgo-guide"]) {
      const response = await page.goto(route, { waitUntil: "load" });
      expect(response?.status(), route).toBe(404);
    }
  });
});
