import { expect, test } from "@playwright/test";
import { publicRouteMatrix } from "@lgo-web/content";
import fs from "node:fs";
import path from "node:path";

const STATIC_BUILD = process.env.LGO_STATIC_BUILD_PATH;

function appRouteFile(app: string, pathname: string, extension: ".html" | ".rsc") {
  const route = pathname.replace(/\/$/, "") || "/";
  return path.join(app, ".next/server/app", `${route === "/" ? "index" : route.slice(1)}${extension}`);
}

async function installStaticBuild(context: import("@playwright/test").BrowserContext) {
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
    } else if (url.pathname === "/sitemap.xml") {
      file = path.join(app, ".next/server/app/sitemap.xml.body"); contentType = "application/xml";
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
}

async function ready(page: import("@playwright/test").Page) {
  await expect(page.locator("h1").first()).toBeVisible();
  await page.evaluate(async () => {
    await document.fonts.ready;
    await new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
  });
}
test.describe("WEB-OPT-02 interaction hit-area/mobile navigation v1.279", () => {
  test.setTimeout(180_000);
  test.beforeEach(async ({ context }) => installStaticBuild(context));

  test("all 59 public routes keep ergonomic mobile action hit areas", async ({ page }) => {
    const routes = publicRouteMatrix.map((entry) => entry.route);
    expect(routes).toHaveLength(59);
    const failures: Array<{ route: string; tag: string; text: string; className: string; height: number }> = [];
    for (const route of routes) {
      const response = await page.goto(route, { waitUntil: "load" });
      expect(response?.ok(), `${route} HTTP status`).toBeTruthy();
      await ready(page);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
      expect(overflow, `${route} horizontal overflow`).toBeFalsy();
      const small = await page.evaluate(() => [...document.querySelectorAll<HTMLElement>("a[href],button,summary,input,select,textarea")].flatMap((element) => {
        const style = getComputedStyle(element);
        const own = element.getBoundingClientRect();
        if (own.width < 1 || own.height < 1 || style.display === "none" || style.visibility === "hidden") return [];
        const tag = element.tagName.toLowerCase();
        const type = element.getAttribute("type") ?? "";
        const className = element.getAttribute("class") ?? "";
        const parent = element.parentElement;
        const inlineText = tag === "a" && style.display === "inline" && !!parent && ["P", "LI", "SPAN", "SMALL", "H3"].includes(parent.tagName)
          && !className.includes("lgo-link-button") && !parent.closest("nav");
        if (inlineText || className.includes("lgo-skip-link") || (tag === "input" && type === "hidden")) return [];
        let hitHeight = own.height;
        if (tag === "input" && ["checkbox", "radio"].includes(type)) {
          const input = element as HTMLInputElement;
          const label = input.closest("label") ?? (input.id ? document.querySelector<HTMLLabelElement>(`label[for="${CSS.escape(input.id)}"]`) : null);
          if (label) hitHeight = label.getBoundingClientRect().height;
        }
        if (hitHeight >= 44) return [];
        return [{ tag, text: (element.textContent ?? element.getAttribute("aria-label") ?? "").trim().replace(/\s+/g, " ").slice(0, 80), className, height: Number(hitHeight.toFixed(2)) }];
      }));
      failures.push(...small.map((item) => ({ route, ...item })));
    }
    expect(failures, JSON.stringify(failures.slice(0, 30), null, 2)).toEqual([]);
  });

  test("mobile public navigation advertises horizontal overflow and reveals focused items", async ({ page }) => {
    await page.goto("/", { waitUntil: "load" });
    await ready(page);
    const rail = page.locator(".lgo-brand-links");
    await expect(rail).toBeVisible();
    const before = await rail.evaluate((element) => {
      const style = getComputedStyle(element);
      const scrollbar = getComputedStyle(element, "::-webkit-scrollbar");
      return {
        overflowX: style.overflowX,
        scrollWidth: element.scrollWidth,
        clientWidth: element.clientWidth,
        scrollLeft: element.scrollLeft,
        scrollbarHeight: scrollbar.height,
      };
    });
    expect(before.overflowX).toBe("auto");
    expect(before.scrollWidth).toBeGreaterThan(before.clientWidth);
    expect(parseFloat(before.scrollbarHeight)).toBeGreaterThanOrEqual(5);

    const lastLink = rail.locator("a").last();
    await lastLink.focus();
    await page.waitForTimeout(50);
    const after = await rail.evaluate((element) => element.scrollLeft);
    expect(after).toBeGreaterThan(before.scrollLeft);
    await expect(lastLink).toBeInViewport();
  });
});
