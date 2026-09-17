import { expect, test, type BrowserContext, type Page } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

const STATIC_BUILD = process.env.LGO_STATIC_BUILD_PATH;
const EVIDENCE_DIR = process.env.LGO_EVIDENCE_DIR;
const ids = ["faq-download", "faq-test", "faq-report", "faq-account", "faq-gameplay", "faq-privacy"];

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
    if (url.searchParams.has("_rsc")) { file = appRouteFile(STATIC_BUILD, url.pathname, ".rsc"); contentType = "text/x-component"; }
    else if (url.pathname.startsWith("/_next/static/")) file = path.join(STATIC_BUILD, ".next", url.pathname.slice("/_next/".length));
    else if (url.pathname === "/_next/image") { const source = url.searchParams.get("url"); if (source?.startsWith("/")) file = path.join(STATIC_BUILD, "public", source); }
    else { const publicFile = path.join(STATIC_BUILD, "public", url.pathname); if (url.pathname !== "/" && fs.existsSync(publicFile) && fs.statSync(publicFile).isFile()) file = publicFile; else { file = appRouteFile(STATIC_BUILD, url.pathname, ".html"); contentType = "text/html"; } }
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
  await page.getByRole("heading", { level: 1, name: "FAQ nhanh", exact: true }).waitFor({ state: "visible" });
  await page.evaluate(async () => {
    await document.fonts.ready;
    await new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
  });
}

test.describe("WEB-OPT-09 support help discovery v1.286", () => {
  test.setTimeout(120_000);
  test.beforeEach(async ({ context }) => mountStaticBuild(context));

  test("question map leads directly to the local answer directory", async ({ page, isMobile }, testInfo) => {
    const response = await page.goto("/support/help", { waitUntil: "load" });
    expect(response?.ok()).toBeTruthy();
    await ready(page);
    const map = page.getByRole("navigation", { name: "Bản đồ câu hỏi", exact: true });
    await expect(map.getByRole("link")).toHaveCount(6);
    for (let index = 0; index < ids.length; index++) await expect(map.getByRole("link").nth(index)).toHaveAttribute("href", `#${ids[index]}`);
    await expect(page.locator(".lgo-guidance-topics")).toHaveCount(0);
    const metrics = await page.evaluate(() => {
      const box = (selector: string) => document.querySelector<HTMLElement>(selector)?.getBoundingClientRect();
      const absoluteTop = (selector: string) => { const r = box(selector); return r ? Math.round(r.top + scrollY) : null; };
      const hero = box(".lgo-guidance-hero");
      const answers = box("#faq-answers");
      return {
        scrollHeight: document.documentElement.scrollHeight,
        overflow: document.documentElement.scrollWidth - innerWidth,
        heroBottom: hero ? Math.round(hero.bottom + scrollY) : null,
        answersTop: answers ? Math.round(answers.top + scrollY) : null,
        answerGap: hero && answers ? Math.round(answers.top - hero.bottom) : null,
        firstGroupTop: absoluteTop(".lgo-question-group"),
        boundaryTop: absoluteTop("#help-boundary"),
      };
    });
    expect(metrics.overflow).toBeLessThanOrEqual(1);
    expect(metrics.answerGap).not.toBeNull();
    expect(metrics.answerGap as number).toBeLessThanOrEqual(48);
    expect(metrics.firstGroupTop).not.toBeNull();
    expect(metrics.scrollHeight).toBeLessThanOrEqual(isMobile ? 4250 : 2250);
    if (EVIDENCE_DIR) {
      fs.mkdirSync(EVIDENCE_DIR, { recursive: true });
      fs.writeFileSync(path.join(EVIDENCE_DIR, `support-help-${testInfo.project.name}.json`), JSON.stringify(metrics, null, 2) + "\n");
      await page.screenshot({ path: path.join(EVIDENCE_DIR, `support-help-${testInfo.project.name}.png`), fullPage: true });
    }
  });

  test("mobile topic filters stay compact while local selection remains native", async ({ page, isMobile }) => {
    await page.goto("/support/help", { waitUntil: "load" });
    await ready(page);
    const directory = page.locator(".lgo-question-directory");
    const filters = directory.getByRole("group", { name: "Chọn chủ đề câu hỏi" });
    await expect(directory.locator(".lgo-question-group:visible")).toHaveCount(6);
    const geometry = await filters.evaluate(element => {
      const style = getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      const buttons = [...element.querySelectorAll<HTMLElement>("button")].map(button => button.getBoundingClientRect());
      return { overflowX: style.overflowX, height: rect.height, minHit: Math.min(...buttons.map(button => button.height)), rows: new Set(buttons.map(button => Math.round(button.top))).size };
    });
    expect(geometry.minHit).toBeGreaterThanOrEqual(44);
    if (isMobile) {
      expect(geometry.overflowX).toBe("auto");
      expect(geometry.height).toBeLessThanOrEqual(52);
      expect(geometry.rows).toBe(1);
    }
    const account = filters.getByRole("button", { name: "Tài khoản", exact: true });
    await account.click();
    await expect(account).toHaveAttribute("aria-pressed", "true");
    await expect(account).toBeFocused();
    await expect(directory.locator(".lgo-question-group:visible")).toHaveCount(1);
    await expect(page).toHaveURL(/#faq-account$/);
    await page.goto("/support/help#faq-account", { waitUntil: "load" });
    await ready(page);
    await expect(page.locator("#faq-account")).toBeFocused();
    const details = page.locator("#faq-account details").first();
    const summary = details.locator("summary");
    await summary.focus(); await summary.press("Space");
    await expect(details).toHaveAttribute("open", "");
    await summary.press("Enter");
    await expect(details).not.toHaveAttribute("open", "");
    await filters.getByRole("button", { name: "Tất cả", exact: true }).click();
    await expect(directory.locator(".lgo-question-group:visible")).toHaveCount(6);
    await expect(page.locator("#help-boundary")).toContainText("Không có hệ thống ticket thật");
    await expect(page.locator("#help-boundary")).toContainText("không có tìm kiếm backend");
    await expect(page.locator("main form, main input, main textarea")).toHaveCount(0);
    await expect(page.locator("main")).toContainText("NO_ACCEPTED_BACKEND_CONTRACT");
  });
});
