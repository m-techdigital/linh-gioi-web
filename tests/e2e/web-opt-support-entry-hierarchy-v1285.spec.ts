import { expect, test, type BrowserContext, type Page } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

const STATIC_BUILD = process.env.LGO_STATIC_BUILD_PATH;
const EVIDENCE_DIR = process.env.LGO_EVIDENCE_DIR;
const SUPPORT_ROUTES = [
  "/download/trust",
  "/support/help",
  "/release/tester-pack#tester-feedback",
  "/support/safety",
];

function appRouteFile(app: string, pathname: string, extension: ".html" | ".rsc") {
  const route = pathname.replace(/\/$/, "") || "/";
  return path.join(app, ".next/server/app", `${route === "/" ? "index" : route.slice(1)}${extension}`);
}

async function mountStaticBuild(context: BrowserContext) {
  if (!STATIC_BUILD) return;
  await context.route("http://wip.local/**", async route => {
    const url = new URL(route.request().url());
    let file: string | undefined;
    let contentType = "application/octet-stream";
    if (url.searchParams.has("_rsc")) {
      file = appRouteFile(STATIC_BUILD, url.pathname, ".rsc");
      contentType = "text/x-component";
    } else if (url.pathname.startsWith("/_next/static/")) {
      file = path.join(STATIC_BUILD, ".next", url.pathname.slice("/_next/".length));
    } else if (url.pathname === "/_next/image") {
      const source = url.searchParams.get("url");
      if (source?.startsWith("/")) file = path.join(STATIC_BUILD, "public", source);
    } else {
      const publicFile = path.join(STATIC_BUILD, "public", url.pathname);
      if (url.pathname !== "/" && fs.existsSync(publicFile) && fs.statSync(publicFile).isFile()) file = publicFile;
      else { file = appRouteFile(STATIC_BUILD, url.pathname, ".html"); contentType = "text/html"; }
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
}

async function ready(page: Page) {
  await page.locator("h1").waitFor({ state: "visible" });
  await page.evaluate(async () => {
    await document.fonts.ready;
    await new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
  });
}

test.describe("WEB-OPT-08 support entry hierarchy v1.285", () => {
  test.setTimeout(120_000);
  test.beforeEach(async ({ context }) => mountStaticBuild(context));

  test("support quick paths lead the page without a duplicated topic wall", async ({ page, isMobile }, testInfo) => {
    const response = await page.goto("/support", { waitUntil: "load" });
    expect(response?.ok()).toBeTruthy();
    await ready(page);
    await expect(page.getByRole("heading", { level: 1, name: "Hỗ trợ cộng đồng" })).toBeVisible();
    const station = page.getByRole("navigation", { name: "Trạm hỗ trợ người chơi" });
    await expect(station.getByRole("link")).toHaveCount(4);
    for (let index = 0; index < SUPPORT_ROUTES.length; index++) {
      await expect(station.getByRole("link").nth(index)).toHaveAttribute("href", SUPPORT_ROUTES[index]!);
    }
    await expect(page.locator(".lgo-guidance-topics")).toHaveCount(0);
    const metrics = await page.evaluate(() => {
      const absoluteTop = (selector: string) => {
        const node = document.querySelector<HTMLElement>(selector);
        return node ? Math.round(node.getBoundingClientRect().top + scrollY) : null;
      };
      const hero = document.querySelector<HTMLElement>(".lgo-guidance-hero");
      const faq = document.querySelector<HTMLElement>("#support-faq");
      const heroBottom = hero ? Math.round(hero.getBoundingClientRect().bottom + scrollY) : null;
      const faqTop = faq ? Math.round(faq.getBoundingClientRect().top + scrollY) : null;
      return {
        scrollHeight: document.documentElement.scrollHeight,
        overflow: document.documentElement.scrollWidth - innerWidth,
        heroBottom,
        faqTop,
        faqGap: heroBottom !== null && faqTop !== null ? faqTop - heroBottom : null,
        boundaryTop: absoluteTop("#support-boundary"),
        scopeTop: absoluteTop(".lgo-release-more-evidence"),
      };
    });
    expect(metrics.overflow).toBeLessThanOrEqual(1);
    expect(metrics.faqGap).not.toBeNull();
    expect(metrics.faqGap as number).toBeLessThanOrEqual(64);
    expect(metrics.scrollHeight).toBeLessThanOrEqual(isMobile ? 2800 : 1500);
    if (EVIDENCE_DIR) {
      fs.mkdirSync(EVIDENCE_DIR, { recursive: true });
      fs.writeFileSync(path.join(EVIDENCE_DIR, `support-${testInfo.project.name}.json`), JSON.stringify(metrics, null, 2) + "\n");
      await page.screenshot({ path: path.join(EVIDENCE_DIR, `support-${testInfo.project.name}.png`), fullPage: true });
    }
  });

  test("support keeps native FAQ, truthful boundaries and no intake", async ({ page }) => {
    await page.goto("/support", { waitUntil: "load" });
    await ready(page);
    const faq = page.locator("#support-faq");
    await expect(faq.locator("details")).toHaveCount(6);
    const first = faq.locator("details").first();
    const summary = first.locator("summary");
    await summary.focus();
    await expect(summary).toBeFocused();
    await summary.press("Enter");
    await expect(first).toHaveAttribute("open", "");
    await summary.press("Space");
    await expect(first).not.toHaveAttribute("open", "");
    const boundary = page.locator("#support-boundary");
    await expect(boundary).toContainText("Không có hệ thống ticket thật");
    await expect(boundary).toContainText("Không gửi thông tin nhạy cảm");
    await expect(page.locator("main")).toContainText("NO_ACCEPTED_BACKEND_CONTRACT");
    await expect(page.locator("main form, main input, main textarea, main a[download]")).toHaveCount(0);
    await expect(page.locator(".lgo-release-more-evidence > summary")).toBeVisible();
    const body = await page.locator("main").innerText();
    expect(body).not.toMatch(/Hỗ trợ 24\/7|Đã gửi ticket|Thời gian phản hồi:/);
  });
});
