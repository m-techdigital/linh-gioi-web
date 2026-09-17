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
  await page.goto(`${origin}/community`, { waitUntil: "load" });
  await expect(page.getByRole("heading", { level: 1, name: "Cộng đồng Linh Giới", exact: true })).toBeVisible();
  await page.evaluate(async () => {
    await document.fonts.ready;
    await new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
  });
}

test.describe("WEB-OPT-11 community value clarity v1.288", () => {
  test.setTimeout(120_000);
  test.beforeEach(async ({ context }) => mountStaticBuild(context));

  test("player value and next steps lead before one compact live-social boundary", async ({ page, isMobile }) => {
    await ready(page);
    const root = page.locator(".lgo-community-experience");
    await expect(root.locator(".lgo-community-hero-boundary")).toHaveCount(0);
    await expect(root.locator("#community-live-boundary")).toHaveCount(1);
    await expect(root.locator("#community-live-boundary")).toContainText("Chưa có trò chuyện, diễn đàn hoặc bang hội");
    const metrics = await page.evaluate(() => {
      const top = (selector: string) => Math.round(document.querySelector<HTMLElement>(selector)!.getBoundingClientRect().top + scrollY);
      const visibleNoLive = [...document.querySelectorAll<HTMLElement>(".lgo-community-experience *")]
        .filter(node => node.children.length === 0 && getComputedStyle(node).display !== "none" && node.textContent?.includes("Chưa có trò chuyện, diễn đàn hoặc bang hội"));
      return {
        startTop: top("[aria-labelledby='community-start-heading']"),
        boundaryTop: top("#community-live-boundary"),
        scrollHeight: document.documentElement.scrollHeight,
        overflow: document.documentElement.scrollWidth - innerWidth,
        visibleNoLiveCount: visibleNoLive.length
      };
    });
    expect(metrics.startTop).toBeLessThan(metrics.boundaryTop);
    expect(metrics.visibleNoLiveCount).toBe(1);
    expect(metrics.overflow).toBeLessThanOrEqual(0);
    if (isMobile) expect(metrics.scrollHeight).toBeLessThanOrEqual(3650);
  });

  test("mobile community value cards form one swipeable rail without losing player destinations", async ({ page, isMobile }) => {
    await ready(page);
    const rail = page.locator(".lgo-community-columns");
    const cards = rail.locator(":scope > section");
    await expect(cards).toHaveCount(3);
    const geometry = await rail.evaluate(element => {
      const style = getComputedStyle(element);
      const boxes = [...element.querySelectorAll<HTMLElement>(":scope > section")].map(card => card.getBoundingClientRect());
      return {
        display: style.display,
        overflowX: style.overflowX,
        rows: new Set(boxes.map(box => Math.round(box.top))).size,
        scrollWidth: element.scrollWidth,
        clientWidth: element.clientWidth,
        minWidth: Math.min(...boxes.map(box => box.width))
      };
    });
    if (isMobile) {
      expect(geometry.display).toBe("flex");
      expect(geometry.overflowX).toBe("auto");
      expect(geometry.rows).toBe(1);
      expect(geometry.scrollWidth).toBeGreaterThan(geometry.clientWidth);
      expect(geometry.minWidth).toBeGreaterThanOrEqual(300);
    }
    const routes = rail.locator(".lgo-community-start-routes a");
    await expect(routes).toHaveCount(3);
    expect(await routes.evaluateAll(nodes => nodes.map(node => node.getAttribute("href")))).toEqual([
      "/release/readiness", "/community/onboarding", "/release/tester-pack"
    ]);
    for (const link of await routes.all()) expect((await link.boundingBox())!.height).toBeGreaterThanOrEqual(44);
  });

  test("prototype, conduct and backend truth remain intact without fake social actions", async ({ page }) => {
    await ready(page);
    await expect(page.locator("#community-runtime-gallery img")).toHaveCount(2);
    await expect(page.locator("#community-conduct details")).toHaveCount(3);
    await expect(page.locator("main")).toContainText("NO_ACCEPTED_BACKEND_CONTRACT");
    await expect(page.locator("main form, main input, main textarea, main iframe, main a[download]")).toHaveCount(0);
    await expect(page.getByRole("button", { name: /Tham gia ngay|Đăng ký|Gửi phản hồi|Vào chat/i })).toHaveCount(0);
    const firstRule = page.locator("#community-conduct details").first();
    const summary = firstRule.locator("summary");
    await summary.focus(); await summary.press("Enter"); await expect(firstRule).toHaveAttribute("open", "");
    expect((await summary.boundingBox())!.height).toBeGreaterThanOrEqual(44);
    await page.addScriptTag({ path: "node_modules/axe-core/axe.min.js" });
    const violations = await page.evaluate(async () => {
      const axe = (window as unknown as {axe:{run:(node:Element|null,opts:unknown)=>Promise<{violations:Array<{id:string}>}>}}).axe;
      return (await axe.run(document.querySelector("main"), {runOnly:{type:"tag",values:["wcag2a","wcag2aa","wcag21aa"]}})).violations.map(item => item.id);
    });
    expect(violations).toEqual([]);
  });
  test("captures accepted desktop/mobile community composition", async ({ page, isMobile }) => {
    await ready(page);
    const metrics = await page.evaluate(() => {
      const box = (selector: string) => { const node=document.querySelector<HTMLElement>(selector); if(!node)return null; const r=node.getBoundingClientRect(); return {top:Math.round(r.top+scrollY),bottom:Math.round(r.bottom+scrollY),height:Math.round(r.height),width:Math.round(r.width)}; };
      const rail=document.querySelector<HTMLElement>(".lgo-community-columns")!; const style=getComputedStyle(rail); const cards=[...rail.querySelectorAll<HTMLElement>(":scope > section")].map(card=>card.getBoundingClientRect());
      return { scrollHeight:document.documentElement.scrollHeight, overflow:document.documentElement.scrollWidth-innerWidth, hero:box(".lgo-community-hero"), panels:box(".lgo-community-columns"), start:box("[aria-labelledby='community-start-heading']"), boundary:box("#community-live-boundary"), gallery:box("#community-runtime-gallery"), conduct:box("#community-conduct"), scope:box(".lgo-release-more-evidence"), galleryImages:document.querySelectorAll("#community-runtime-gallery img").length, conductRules:document.querySelectorAll("#community-conduct details").length, forms:document.querySelectorAll("main form,main input,main textarea").length, rail:{display:style.display,overflowX:style.overflowX,rows:new Set(cards.map(card=>Math.round(card.top))).size,scrollWidth:rail.scrollWidth,clientWidth:rail.clientWidth} };
    });
    const out=path.join(process.cwd(),"handoff/web-opt-v1.288/evidence/after"); fs.mkdirSync(out,{recursive:true});
    const name=isMobile?"mobile":"desktop"; fs.writeFileSync(path.join(out,`${name}-metrics.json`),JSON.stringify(metrics,null,2)+"\n");
    await page.screenshot({path:path.join(out,`${name}-community.png`),fullPage:true});
  });

});
