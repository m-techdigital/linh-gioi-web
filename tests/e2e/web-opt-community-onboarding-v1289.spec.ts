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
  await page.goto(`${origin}/community/onboarding`, { waitUntil: "load" });
  await expect(page.getByRole("heading", { level: 1, name: "Hòa nhập cộng đồng Linh Giới", exact: true })).toBeVisible();
  await page.evaluate(async () => { await document.fonts.ready; await new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))); });
}

test.describe("WEB-OPT-12 community onboarding v1.289", () => {
  test.setTimeout(120_000);
  test.beforeEach(async ({ context }) => mountStaticBuild(context));

  test("capture exact BEFORE onboarding composition", async ({ page, isMobile }) => {
    await ready(page);
    const metrics = await page.evaluate(() => {
      const box=(selector:string)=>{const n=document.querySelector<HTMLElement>(selector);if(!n)return null;const r=n.getBoundingClientRect();return{top:Math.round(r.top+scrollY),bottom:Math.round(r.bottom+scrollY),height:Math.round(r.height),width:Math.round(r.width)}};
      const geo=(n:HTMLElement)=>{const style=getComputedStyle(n);const children=[...n.children].map(c=>(c as HTMLElement).getBoundingClientRect());return{display:style.display,overflowX:style.overflowX,rows:new Set(children.map(r=>Math.round(r.top))).size,scrollWidth:n.scrollWidth,clientWidth:n.clientWidth}};
      const stepRail=document.querySelector<HTMLElement>(".lgo-reading-journey .lgo-progress-steps")!;
      const audienceList=document.querySelector<HTMLElement>("#onboarding-audiences .lgo-question-list")!;
      return {scrollHeight:document.documentElement.scrollHeight,overflow:document.documentElement.scrollWidth-innerWidth,hero:box(".lgo-release-hero"),reading:box("#onboarding-reading"),audiences:box("#onboarding-audiences"),boundary:box("#onboarding-boundary"),scope:box(".lgo-release-more-evidence"),heroBoundaryCount:document.querySelectorAll(".lgo-onboarding-hero-boundary").length,forms:document.querySelectorAll("main form,main input,main textarea").length,stepRail:geo(stepRail),audienceRail:geo(audienceList)};
    });
    const out=path.join(process.cwd(),"handoff/web-opt-v1.289/evidence/before"); fs.mkdirSync(out,{recursive:true});
    const name=isMobile?"mobile":"desktop"; fs.writeFileSync(path.join(out,`${name}-metrics.json`),JSON.stringify(metrics,null,2)+"\n");
    await page.screenshot({path:path.join(out,`${name}-community-onboarding.png`),fullPage:true});
  });

  test("newcomer journey is game-oriented before technical release surfaces", async ({ page }) => {
    await ready(page);
    const journey=page.locator(".lgo-reading-journey");
    const actions=journey.locator(".lgo-reading-journey-panel .lgo-link-button");
    const selects=journey.getByRole("button",{name:/^Xem bước \d:/});
    await expect(selects).toHaveCount(3);
    const expected=["/start","/game","/community"];
    for(let i=0;i<3;i++){await selects.nth(i).click();await expect(actions).toHaveAttribute("href",expected[i]);}
    await expect(page.locator(".lgo-onboarding-hero-boundary")).toHaveCount(0);
    await expect(page.locator("#onboarding-boundary")).toContainText("Chưa có danh sách chờ");
  });

  test("mobile reading steps and audience choices are compact swipe rails", async ({ page, isMobile }) => {
    await ready(page);
    const rails=[page.locator(".lgo-reading-journey .lgo-progress-steps"),page.locator("#onboarding-audiences .lgo-question-list")];
    for(const rail of rails){
      const m=await rail.evaluate(el=>{const n=el as HTMLElement,s=getComputedStyle(n),boxes=[...n.children].map(c=>(c as HTMLElement).getBoundingClientRect());return{display:s.display,overflowX:s.overflowX,rows:new Set(boxes.map(r=>Math.round(r.top))).size,scrollWidth:n.scrollWidth,clientWidth:n.clientWidth,minWidth:Math.min(...boxes.map(r=>r.width))}});
      if(isMobile){expect(m.display).toBe("flex");expect(m.overflowX).toBe("auto");expect(m.rows).toBe(1);expect(m.scrollWidth).toBeGreaterThan(m.clientWidth);expect(m.minWidth).toBeGreaterThanOrEqual(280);}
    }
  });

  test("static-only truth and interaction semantics remain intact", async ({ page }) => {
    await ready(page);
    const journey=page.locator(".lgo-reading-journey");
    await expect(journey.getByRole("status")).toContainText("1/3");
    await expect(journey.getByRole("button",{name:"Bước trước",exact:true})).toBeDisabled();
    await journey.getByRole("button",{name:"Bước tiếp",exact:true}).click();
    await expect(journey.getByRole("status")).toContainText("2/3");
    await expect(page.locator("#onboarding-audiences details")).toHaveCount(4);
    await expect(page.locator("main form,main input,main textarea,main iframe,main a[download]")).toHaveCount(0);
    await expect(page.locator("main")).toContainText("NO_ACCEPTED_BACKEND_CONTRACT");
    await expect(page.getByRole("button",{name:/Đăng ký|Gửi yêu cầu|Tham gia ngay|Nhận quyền/i})).toHaveCount(0);
    await page.addScriptTag({path:"node_modules/axe-core/axe.min.js"});
    const violations=await page.evaluate(async()=>{const axe=(window as unknown as {axe:{run:(n:Element|null,o:unknown)=>Promise<{violations:Array<{id:string}>}>}}).axe;return(await axe.run(document.querySelector("main"),{runOnly:{type:"tag",values:["wcag2a","wcag2aa","wcag21aa"]}})).violations.map(v=>v.id);});
    expect(violations).toEqual([]);
  });
});
