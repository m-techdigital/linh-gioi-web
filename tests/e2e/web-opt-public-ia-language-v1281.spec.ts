import { expect, test, type Page } from "@playwright/test";
import { publicRouteMatrix } from "@lgo-web/content";
import fs from "node:fs";
import path from "node:path";

const STATIC_BUILD = process.env.LGO_STATIC_BUILD_PATH;
const INTERNAL_PRIMARY_TERMS = [/WEB v\d/i, /PROVISIONAL_WEB_FIXTURE/i, /\bfixture\b/i, /\bruntime\b/i, /\be2e\b/i, /source-owned/i];

function appRouteFile(app: string, pathname: string, extension: ".html" | ".rsc") {
  const route = pathname.replace(/\/$/, "") || "/";
  return path.join(app, ".next/server/app", `${route === "/" ? "index" : route.slice(1)}${extension}`);
}

test.describe("WEB-OPT-04 public IA/player language v1.281", () => {
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

  test("primary news discovery is player-facing while Web history is explicit archive", async ({ page }) => {
    await page.goto("/news", { waitUntil: "load" });
    await expect(page.getByRole("heading", { level: 1, name: "Tin tức Linh Giới" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Chưa có bản tin game mới" })).toBeVisible();
    const archive = page.locator("#news-devlog-archive");
    await expect(archive).toBeVisible();
    await expect(archive).not.toHaveAttribute("open", "");
    const visiblePrimary = await page.locator("main").innerText();
    for (const term of INTERNAL_PRIMARY_TERMS) expect(visiblePrimary).not.toMatch(term);
    await archive.locator(":scope > summary").click();
    await expect(archive).toHaveAttribute("open", "");
    await expect(archive.getByRole("link", { name: /Sự kiện/i })).toHaveAttribute("href", "/events");
    await expect(archive.getByRole("link", { name: /Ghi chú cập nhật/i })).toHaveAttribute("href", "/patch-notes");
    await expect(archive.locator(".lgo-reading-catalog-card")).toHaveCount(17);
  });

  test("homepage stops promoting development-history articles as primary news", async ({ page }) => {
    await page.goto("/", { waitUntil: "load" });
    await expect(page.locator("#home-news")).toBeVisible();
    await expect(page.locator("#home-news")).toContainText("Chưa có bản tin game mới");
    await expect(page.locator("#home-news")).not.toContainText("Control tower web đã được thiết lập");
    await expect(page.locator("#home-news").getByRole("link", { name: /Xem kho bản tin/i })).toHaveAttribute("href", "/news");
    await expect(page.locator("#home-news").getByRole("link", { name: /Trạng thái chơi/i })).toHaveAttribute("href", "/status");
  });

  test("all 59 public routes have an intentional inbound public link, including events archive", async ({ page }) => {
    const routes = publicRouteMatrix.map((entry) => entry.route);
    expect(routes).toHaveLength(59);
    const inbound = new Map(routes.map((route) => [route, 0]));
    for (const route of routes) {
      const response = await page.goto(route, { waitUntil: "load" });
      expect(response?.ok(), `${route} HTTP`).toBeTruthy();
      const links = await page.locator("a[href^='/']").evaluateAll((nodes) => nodes.map((node) => (node as HTMLAnchorElement).getAttribute("href") || ""));
      for (const href of links) {
        const target = href.split("#", 1)[0] || "/";
        if (target !== route && inbound.has(target)) inbound.set(target, (inbound.get(target) || 0) + 1);
      }
    }
    const orphans = [...inbound.entries()].filter(([route, count]) => route !== "/" && count === 0);
    expect(orphans, JSON.stringify(orphans)).toEqual([]);
    expect(inbound.get("/events")).toBeGreaterThan(0);
  });
});
