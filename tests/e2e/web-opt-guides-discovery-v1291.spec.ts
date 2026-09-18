import { expect, test, type BrowserContext, type Page } from "@playwright/test";
import { contentEntries } from "../../packages/content/src/fixtures";
import fs from "node:fs";
import path from "node:path";

const STATIC_BUILD=process.env.LGO_STATIC_BUILD_PATH;
const origin=STATIC_BUILD?"http://wip.local":(process.env.LGO_WEB_URL??"http://127.0.0.1:3221");
const evidenceRoot=process.env.LGO_EVIDENCE_DIR??path.join(process.cwd(),"handoff/web-opt-v1.291/evidence");
const phase=process.env.LGO_EVIDENCE_PHASE??"before";
const guides=contentEntries.filter(entry=>entry.category==="guides"&&entry.status==="published");

function appRouteFile(app:string,pathname:string,extension:".html"|".rsc"){
 const route=pathname.replace(/\/$/,"")||"/";
 return path.join(app,".next/server/app",(route==="/"?"index":route.slice(1))+extension);
}
async function mountStaticBuild(context:BrowserContext){
 if(!STATIC_BUILD)return;
 await context.route("http://wip.local/**",async route=>{
  const url=new URL(route.request().url());let file:string|undefined;let contentType="application/octet-stream";
  if(url.searchParams.has("_rsc")){file=appRouteFile(STATIC_BUILD,url.pathname,".rsc");contentType="text/x-component";}
  else if(url.pathname.startsWith("/_next/static/"))file=path.join(STATIC_BUILD,".next",url.pathname.slice("/_next/".length));
  else if(url.pathname==="/_next/image"){const source=url.searchParams.get("url");if(source?.startsWith("/"))file=path.join(STATIC_BUILD,"public",source);}
  else {const publicFile=path.join(STATIC_BUILD,"public",url.pathname);if(url.pathname!=="/"&&fs.existsSync(publicFile)&&fs.statSync(publicFile).isFile())file=publicFile;else{file=appRouteFile(STATIC_BUILD,url.pathname,".html");contentType="text/html";}}
  if(!file||!fs.existsSync(file))return route.fulfill({status:404,body:"not found"});
  if(file.endsWith(".css"))contentType="text/css";else if(file.endsWith(".js"))contentType="application/javascript";
  else if(file.endsWith(".png"))contentType="image/png";else if(file.endsWith(".webp"))contentType="image/webp";else if(file.endsWith(".svg"))contentType="image/svg+xml";else if(file.endsWith(".woff2"))contentType="font/woff2";
  return route.fulfill({status:200,contentType,body:fs.readFileSync(file)});
 });
}
async function ready(page:Page){
 await page.goto(origin+"/guides",{waitUntil:"load"});
 await expect(page.getByRole("heading",{level:1,name:"Hướng dẫn cho Người Thức Tỉnh",exact:true})).toBeVisible();
 await page.evaluate(async()=>{await document.fonts.ready;await new Promise<void>(resolve=>requestAnimationFrame(()=>requestAnimationFrame(()=>resolve())));});
}

test.describe("WEB-OPT-14 guides discovery v1.291",()=>{
 test.setTimeout(120_000);
 test.beforeEach(async({context})=>mountStaticBuild(context));
 test("capture exact guides discovery composition",async({page,isMobile})=>{
  await ready(page);
  const m=await page.evaluate(()=>{
   const box=(selector:string)=>{const n=document.querySelector<HTMLElement>(selector);if(!n)return null;const r=n.getBoundingClientRect();return{top:Math.round(r.top+scrollY),bottom:Math.round(r.bottom+scrollY),height:Math.round(r.height),width:Math.round(r.width)};};
   const filters=document.querySelector<HTMLElement>(".lgo-reading-catalog-filters")!;
   const style=getComputedStyle(filters),children=[...filters.children].map(n=>(n as HTMLElement).getBoundingClientRect());
   return{scrollHeight:document.documentElement.scrollHeight,overflow:document.documentElement.scrollWidth-innerWidth,
    hero:box(".lgo-release-hero"),library:box("#guide-library"),controls:box(".lgo-reading-catalog-controls"),
    results:box(".lgo-reading-catalog-grid"),help:box(".lgo-library-help"),
    visibleCards:document.querySelectorAll(".lgo-reading-catalog-card").length,
    filterRail:{display:style.display,overflowX:style.overflowX,rows:new Set(children.map(r=>Math.round(r.top))).size,scrollWidth:filters.scrollWidth,clientWidth:filters.clientWidth}};
  });
  const dir=path.join(evidenceRoot,phase);fs.mkdirSync(dir,{recursive:true});const name=isMobile?"mobile":"desktop";
  fs.writeFileSync(path.join(dir,name+"-metrics.json"),JSON.stringify(m,null,2)+"\n");
  await page.screenshot({path:path.join(dir,name+"-guides.png"),fullPage:true});
  expect(m.overflow).toBeLessThanOrEqual(0);
 });

 test("curated beginner intent is the initial view while all published guides stay one action away",async({page})=>{
  await ready(page);expect(guides).toHaveLength(16);
  const catalog=page.locator(".lgo-reading-catalog");
  await expect(catalog.getByRole("button",{name:/^Nhập môn/})).toHaveAttribute("aria-pressed","true");
  await expect(catalog.locator(".lgo-reading-catalog-card")).toHaveCount(3);
  await expect(catalog.getByRole("status")).toContainText("3/16");
  await catalog.getByRole("button",{name:/^Tất cả/}).click();
  await expect(catalog.locator(".lgo-reading-catalog-card")).toHaveCount(16);
  for(const entry of guides)await expect(catalog.locator(`[data-entry-id="${entry.slug}"] a`)).toHaveAttribute("href",`/guides/${entry.slug}`);
 });

 test("mobile intent filters are one compact swipe rail instead of a vertical control wall",async({page,isMobile})=>{
  await ready(page);const rail=page.locator(".lgo-reading-catalog-filters");
  const m=await rail.evaluate(el=>{const n=el as HTMLElement,s=getComputedStyle(n),boxes=[...n.children].map(c=>(c as HTMLElement).getBoundingClientRect());return{display:s.display,overflowX:s.overflowX,rows:new Set(boxes.map(r=>Math.round(r.top))).size,scrollWidth:n.scrollWidth,clientWidth:n.clientWidth,minHeight:Math.min(...boxes.map(r=>r.height)),pageOverflow:document.documentElement.scrollWidth-innerWidth};});
  if(isMobile){expect(m.display).toBe("flex");expect(m.overflowX).toBe("auto");expect(m.rows).toBe(1);expect(m.scrollWidth).toBeGreaterThan(m.clientWidth);expect(m.minHeight).toBeGreaterThanOrEqual(44);}
  expect(m.pageOverflow).toBeLessThanOrEqual(0);
 });

 test("local search still reaches the full guide set without backend or persistence",async({page})=>{
  await ready(page);const catalog=page.locator(".lgo-reading-catalog");
  await catalog.getByRole("button",{name:/^Tất cả/}).click();
  const input=catalog.getByRole("searchbox",{name:"Tìm trong thư viện"});
  await input.fill("an toàn");await expect(catalog.locator(".lgo-reading-catalog-card")).not.toHaveCount(0);
  await expect(page.locator("main form,main textarea,main iframe")).toHaveCount(0);
  await expect(page.locator("main")).toContainText("Không phải wiki trực tuyến");
  await page.reload();await expect(catalog.getByRole("button",{name:/^Nhập môn/})).toHaveAttribute("aria-pressed","true");
  await expect(input).toHaveValue("");
 });
 test("curated initial discovery keeps scan height materially below the 16-card baseline",async({page,isMobile})=>{
  await ready(page);
  const m=await page.evaluate(()=>({height:document.documentElement.scrollHeight,overflow:document.documentElement.scrollWidth-innerWidth,cards:document.querySelectorAll(".lgo-reading-catalog-card").length}));
  expect(m.cards).toBe(3);
  expect(m.height).toBeLessThanOrEqual(isMobile?3000:1800);
  expect(m.overflow).toBeLessThanOrEqual(0);
 });

});
