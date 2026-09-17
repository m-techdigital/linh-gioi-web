import { expect, test, type BrowserContext, type Page } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

const STATIC_BUILD = process.env.LGO_STATIC_BUILD_PATH;
const origin = STATIC_BUILD ? "http://wip.local" : (process.env.LGO_WEB_URL ?? "http://127.0.0.1:3000");

function appRouteFile(app: string, pathname: string, extension: ".html" | ".rsc") {
  const route = pathname.replace(/\/$/, "") || "/";
  return path.join(app, ".next/server/app", `${route === "/" ? "index" : route.slice(1)}${extension}`);
}

async function mountStaticBuild(context: BrowserContext) {
  if (!STATIC_BUILD) return;
  await context.route("http://wip.local/**", async route => {
    const url = new URL(route.request().url());
    let file: string | undefined; let contentType = "application/octet-stream";
    if (url.searchParams.has("_rsc")) { file = appRouteFile(STATIC_BUILD, url.pathname, ".rsc"); contentType = "text/x-component"; }
    else if (url.pathname.startsWith("/_next/static/")) file = path.join(STATIC_BUILD, ".next", url.pathname.slice("/_next/".length));
    else if (url.pathname === "/_next/image") { const source = url.searchParams.get("url"); if (source?.startsWith("/")) file = path.join(STATIC_BUILD, "public", source); }
    else { const publicFile = path.join(STATIC_BUILD, "public", url.pathname); if (url.pathname !== "/" && fs.existsSync(publicFile) && fs.statSync(publicFile).isFile()) file = publicFile; else { file = appRouteFile(STATIC_BUILD, url.pathname, ".html"); contentType = "text/html"; } }
    if (!file || !fs.existsSync(file)) return route.fulfill({ status: 404, body: "not found" });
    if (file.endsWith(".css")) contentType = "text/css"; else if (file.endsWith(".js")) contentType = "application/javascript";
    else if (file.endsWith(".png")) contentType = "image/png"; else if (file.endsWith(".webp")) contentType = "image/webp"; else if (file.endsWith(".svg")) contentType = "image/svg+xml"; else if (file.endsWith(".woff2")) contentType = "font/woff2";
    return route.fulfill({ status: 200, contentType, body: fs.readFileSync(file) });
  });
}

async function ready(page: Page) {
  await page.goto(`${origin}/support/safety`, { waitUntil: "load" });
  await expect(page.getByRole("heading", { level: 1, name: "Báo lỗi an toàn", exact: true })).toBeVisible();
  await page.evaluate(async () => {
    await document.fonts.ready;
    await new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
  });
}

test.describe("WEB-OPT-10 support safety flow v1.287", () => {
  test.setTimeout(120_000);
  test.beforeEach(async ({ context }) => mountStaticBuild(context));

  test("safe-reporting sequence reaches issue routing before the deep data reference", async ({ page, isMobile }) => {
    await ready(page);
    const metrics = await page.evaluate(() => {
      const top = (selector: string) => {
        const node = document.querySelector<HTMLElement>(selector)!;
        return Math.round(node.getBoundingClientRect().top + scrollY);
      };
      return {
        scrollHeight: document.documentElement.scrollHeight,
        overflow: document.documentElement.scrollWidth - innerWidth,
        checklistTop: top("#safety-checklist"),
        issueTop: top("#safety-issue-paths"),
        dataTop: top("#safety-data-boundary")
      };
    });
    expect(metrics.overflow).toBeLessThanOrEqual(0);
    expect(metrics.checklistTop).toBeLessThan(metrics.issueTop);
    expect(metrics.issueTop).toBeLessThan(metrics.dataTop);
    if (isMobile) {
      expect(metrics.issueTop).toBeLessThanOrEqual(2100);
      expect(metrics.scrollHeight).toBeLessThanOrEqual(3400);
    }
    await expect(page.locator("#safety-no-intake")).toContainText("Chưa có ticket thật");
    await expect(page.locator("main form, main input:not([type=checkbox]), main textarea, main input[type=file]")).toHaveCount(0);
    await expect(page.locator("main")).toContainText("NO_ACCEPTED_BACKEND_CONTRACT");
  });

  test("mobile five-step checklist is a swipeable one-row touch rail without shrinking targets", async ({ page, isMobile }) => {
    await ready(page);
    const list = page.locator("#safety-checklist .lgo-local-checklist-items");
    const cards = list.locator(".lgo-checkbox-field");
    await expect(cards).toHaveCount(5);
    const geometry = await list.evaluate(element => {
      const style = getComputedStyle(element);
      const cardBoxes = [...element.querySelectorAll<HTMLElement>(".lgo-checkbox-field")].map(card => card.getBoundingClientRect());
      return {
        display: style.display,
        overflowX: style.overflowX,
        rows: new Set(cardBoxes.map(box => Math.round(box.top))).size,
        minCardHeight: Math.min(...cardBoxes.map(box => box.height)),
        scrollWidth: element.scrollWidth,
        clientWidth: element.clientWidth
      };
    });
    if (isMobile) {
      expect(geometry.display).toBe("flex");
      expect(geometry.overflowX).toBe("auto");
      expect(geometry.rows).toBe(1);
      expect(geometry.scrollWidth).toBeGreaterThan(geometry.clientWidth);
    }
    expect(geometry.minCardHeight).toBeGreaterThanOrEqual(44);
    const first = cards.first().getByRole("checkbox");
    await first.focus();
    await page.keyboard.press("Space");
    await expect(first).toBeChecked();
    await expect(page.locator("#safety-checklist .lgo-local-checklist").getByRole("status")).toContainText("1/5");
  });
});

// v1.287 carries forward the runtime invariants of the live v1.226 safety suite so closure can use a clean static build.
test.describe("WEB-OPT-10 support safety preserved interactions", () => {
  test.setTimeout(120_000);
  test.beforeEach(async ({ context }) => mountStaticBuild(context));

  test("local preparation stays non-persistent and all safety boundaries remain native", async ({ page }) => {
    await ready(page);
    const list = page.locator("#safety-checklist .lgo-local-checklist");
    const checkboxes = list.getByRole("checkbox");
    await expect(checkboxes).toHaveCount(5);
    const requests: string[] = [];
    page.on("request", request => { if (["fetch", "xhr"].includes(request.resourceType()) || request.method() !== "GET") requests.push(request.url()); });
    const first = checkboxes.first();
    await first.focus();
    await first.press("Space");
    await expect(first).toBeChecked();
    await expect(list.getByRole("status")).toContainText("1/5");
    const reset = list.getByRole("button", { name: "Bỏ các đánh dấu" });
    await reset.focus();
    await reset.press("Enter");
    await expect(list.getByRole("status")).toContainText("0/5");
    expect(requests).toEqual([]);
    await expect(page.locator(".lgo-privacy-notice-item")).toHaveCount(3);
    await expect(page.locator("#safety-data-boundary .lgo-data-boundary-columns > section")).toHaveCount(2);
    const issues = page.locator("#safety-issue-paths details");
    await expect(issues).toHaveCount(4);
    const summary = issues.first().locator("summary");
    await summary.focus();
    await summary.press("Enter");
    await expect(issues.first()).toHaveAttribute("open", "");
    expect((await summary.boundingBox())!.height).toBeGreaterThanOrEqual(44);
    await expect(page.locator("#safety-no-intake")).toContainText("Chưa có ticket thật");
    await expect(page.locator("#safety-no-intake")).toContainText("NO_ACCEPTED_BACKEND_CONTRACT");
    await expect(page.locator("main form, main input:not([type=checkbox]), main textarea, main input[type=file], main a[download]")).toHaveCount(0);
  });
});
