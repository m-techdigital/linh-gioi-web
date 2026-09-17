import { expect, test, type BrowserContext, type Page } from "@playwright/test";
import { localContentRepository } from "@lgo-web/content";
import fs from "node:fs";
import path from "node:path";

const STATIC_BUILD = process.env.LGO_STATIC_BUILD_PATH;
const EVIDENCE_DIR = process.env.LGO_EVIDENCE_DIR;
const editorialRoutes = [
  ...localContentRepository.list("news").map(entry => `/news/${entry.slug}`),
  ...localContentRepository.list("guides").map(entry => `/guides/${entry.slug}`),
];

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
    else if (url.pathname.startsWith("/game-art/")) file = path.join(STATIC_BUILD, "public", url.pathname);
    else { file = appRouteFile(STATIC_BUILD, url.pathname, ".html"); contentType = "text/html"; }
    if (!file || !fs.existsSync(file)) return route.fulfill({ status: 404, body: "not found" });
    if (file.endsWith(".css")) contentType = "text/css"; else if (file.endsWith(".js")) contentType = "application/javascript";
    else if (file.endsWith(".png")) contentType = "image/png"; else if (file.endsWith(".webp")) contentType = "image/webp";
    else if (file.endsWith(".svg")) contentType = "image/svg+xml"; else if (file.endsWith(".woff2")) contentType = "font/woff2";
    return route.fulfill({ status: 200, contentType, body: fs.readFileSync(file) });
  });
}

async function ready(page: Page) { await page.locator("h1").first().waitFor({ state: "visible" }); await page.evaluate(() => document.fonts.ready); }
const percentile = (values: number[], p: number) => [...values].sort((a,b)=>a-b)[Math.max(0, Math.min(values.length - 1, Math.ceil(values.length * p) - 1))];

test.describe("WEB-OPT-07 editorial mobile density and reading flow v1.284", () => {
  test.setTimeout(240_000);
  test.beforeEach(async ({ context }) => { await mountStaticBuild(context); });

  test("33 editorial routes materially reduce mobile scroll cost without hiding truth boundaries", async ({ page }) => {
    const rows: Array<{ route:string; height:number; overflow:number; firstUsefulTop:number|null; sectionCount:number }> = [];
    for (const route of editorialRoutes) {
      const response = await page.goto(route, { waitUntil: "load" }); expect(response?.ok(), route).toBeTruthy(); await ready(page);
      const metrics = await page.evaluate(() => {
        const firstSection = document.querySelector<HTMLElement>(".lgo-guide-article-section");
        const sectionTop = firstSection ? firstSection.getBoundingClientRect().top + scrollY : Number.POSITIVE_INFINITY;
        const outward = [...document.querySelectorAll<HTMLAnchorElement>('a[href^="/"]')]
          .filter(a => { const r=a.getBoundingClientRect(); return r.width>0 && r.height>0 && r.top+scrollY >= sectionTop-1; })
          .sort((a,b)=>a.getBoundingClientRect().top-b.getBoundingClientRect().top)[0];
        const boundaries = [...document.querySelectorAll<HTMLElement>(".lgo-article-boundary")];
        return {
          height: document.documentElement.scrollHeight,
          overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
          sectionCount: document.querySelectorAll(".lgo-guide-article-section").length,
          visibleBoundaries: boundaries.filter(el => { const s=getComputedStyle(el); const r=el.getBoundingClientRect(); return s.display!=="none" && s.visibility!=="hidden" && r.height>0; }).length,
          firstUsefulTop: outward ? Math.round(outward.getBoundingClientRect().top + scrollY) : null,
        };
      });
      expect(metrics.overflow, `${route} overflow`).toBeLessThanOrEqual(1);
      if (metrics.sectionCount > 0) expect(metrics.visibleBoundaries, `${route} truth boundaries`).toBeGreaterThanOrEqual(metrics.sectionCount);
      rows.push({ route, height: metrics.height, overflow: metrics.overflow, firstUsefulTop: metrics.firstUsefulTop, sectionCount: metrics.sectionCount });
    }
    const heights = rows.map(row => row.height);
    const firstUseful = rows.filter(row => row.sectionCount > 0 && row.firstUsefulTop !== null).map(row => row.firstUsefulTop as number);
    const summary = { count: rows.length, p50: percentile(heights,.5), p90: percentile(heights,.9), max: Math.max(...heights), firstUsefulP90: percentile(firstUseful,.9), overflowRoutes: rows.filter(row=>row.overflow>1).length };
    if (EVIDENCE_DIR) { fs.mkdirSync(EVIDENCE_DIR,{recursive:true}); fs.writeFileSync(path.join(EVIDENCE_DIR,"mobile-density-final.json"),JSON.stringify({summary,routes:rows},null,2)+"\n"); }
    expect(summary.count).toBe(33);
    expect(summary.p90).toBeLessThanOrEqual(4300);
    expect(summary.max).toBeLessThanOrEqual(4700);
    expect(summary.firstUsefulP90).toBeLessThanOrEqual(1850);
    expect(summary.overflowRoutes).toBe(0);
  });

  test("native fragment focus and contents keyboard behavior survive density changes", async ({ page }) => {
    await page.goto("/guides/faq-search-helpfulness-guide#faq-guide-step-03", { waitUntil: "load" }); await ready(page);
    await expect(page.locator("#faq-guide-step-03")).toBeFocused();
    const summary = page.locator(".lgo-article-contents summary"); await expect(summary).toBeVisible(); await summary.focus(); await expect(summary).toBeFocused();
    await summary.press("Enter"); await summary.press("Enter"); await expect(page.locator(".lgo-article-contents details")).toHaveAttribute("open", "");
    await page.goto("/news/web-program-control-tower#news-web-program-control-tower-part-02", { waitUntil: "load" }); await ready(page);
    await expect(page.locator("#news-web-program-control-tower-part-02")).toBeFocused();
  });
});
