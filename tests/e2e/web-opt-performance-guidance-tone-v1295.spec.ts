import { expect, test, type BrowserContext, type Page } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

const STATIC_BUILD=process.env.LGO_STATIC_BUILD_PATH;
const origin=STATIC_BUILD?"http://wip.local":(process.env.LGO_WEB_URL??"http://127.0.0.1:3221");
const evidenceRoot=process.env.LGO_EVIDENCE_DIR??path.join(process.cwd(),"handoff/web-opt-v1.295/evidence");
const phase=process.env.LGO_EVIDENCE_PHASE??"before";

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
 await page.goto(origin+"/performance",{waitUntil:"load"});
 await expect(page.getByRole("heading",{level:1})).toBeVisible();
 await page.evaluate(async()=>{await document.fonts.ready;await new Promise<void>(resolve=>requestAnimationFrame(()=>requestAnimationFrame(()=>resolve())));});
}

test.describe("WEB-OPT-18 performance guidance tone v1.295",()=>{
 test.setTimeout(120_000);
 test.beforeEach(async({context})=>mountStaticBuild(context));
 test("capture exact guidance and proof-density composition",async({page,isMobile})=>{
  await ready(page);
  const m=await page.evaluate(()=>{
   const box=(selector:string)=>{const n=document.querySelector<HTMLElement>(selector);if(!n)return null;const r=n.getBoundingClientRect();return{top:Math.round(r.top+scrollY),bottom:Math.round(r.bottom+scrollY),height:Math.round(r.height),width:Math.round(r.width)};};
   return{scrollHeight:document.documentElement.scrollHeight,overflow:document.documentElement.scrollWidth-innerWidth,
    hero:box(".lgo-release-hero"),workshop:box("#performance-preview"),measurement:box("#performance-measurement"),
    principles:box("#performance-principles"),routes:box("#performance-routes"),notes:box(".lgo-release-more-evidence"),
    heroNoteCount:document.querySelectorAll(".lgo-performance-hero-note").length,
    measurementCells:document.querySelectorAll("#performance-measurement .lgo-measurement-boundary > div").length,
    routeProofs:document.querySelectorAll("#performance-routes .lgo-performance-route-tile details").length};
  });
  const dir=path.join(evidenceRoot,phase);fs.mkdirSync(dir,{recursive:true});const name=isMobile?"mobile":"desktop";
  fs.writeFileSync(path.join(dir,name+"-metrics.json"),JSON.stringify(m,null,2)+"\n");
  await page.screenshot({path:path.join(dir,name+"-performance.png"),fullPage:true});
  expect(m.overflow).toBeLessThanOrEqual(0);
 });

 test("player-readable guidance replaces engineering dashboard tone",async({page})=>{
  await ready(page);
  await expect(page.getByRole("heading",{level:1,name:"Đọc nhẹ và rõ trên thiết bị của bạn",exact:true})).toBeVisible();
  await expect(page.locator(".lgo-performance-hero-note")).toHaveCount(0);
  const measurement=page.locator("#performance-measurement");
  await expect(measurement).toContainText("Điều khung thử không đo");
  await expect(measurement.locator(".lgo-measurement-boundary > div")).toHaveCount(1);
  await expect(page.locator("#performance-routes .lgo-performance-route-tile details")).toHaveCount(0);
  await expect(page.locator("#performance-routes")).not.toContainText("Ghi chú trong source");
 });
 test("reading workshop remains local, optional and non-measuring",async({page})=>{
  await ready(page);const preview=page.locator(".lgo-reading-preview");
  await expect(preview).toBeVisible();
  const sample=preview.locator(".lgo-reading-preview-sample"),before=await sample.evaluate(e=>getComputedStyle(e).paddingTop);
  const roomy=preview.getByRole("button",{name:"Thoáng hơn",exact:true});await roomy.click();
  await expect(roomy).toHaveAttribute("aria-pressed","true");
  expect(parseFloat(await sample.evaluate(e=>getComputedStyle(e).paddingTop))).toBeGreaterThan(parseFloat(before));
  const toggle=preview.getByRole("checkbox",{name:"Hiện minh họa trong khung thử",exact:true});
  await expect(toggle).not.toBeChecked();await expect(preview.locator("img")).toHaveCount(0);
  await expect(page.locator("#performance-measurement")).toContainText("Không có dữ liệu production");
 });

 test("useful routes and non-claims remain without telemetry or fake score",async({page})=>{
  await ready(page);const routes=page.locator("#performance-routes");
  await expect(routes.locator("article")).toHaveCount(4);
  for(const href of ["/performance","/download/trust","/game/loop","/support/safety"])await expect(routes.locator('a[href="'+href+'"]')).toBeVisible();
  await expect(page.locator("main form,main textarea,main input:not([type=checkbox]),main iframe,[role=progressbar],[role=timer]")).toHaveCount(0);
  await expect(page.locator("main")).toContainText("NO_ACCEPTED_BACKEND_CONTRACT");
  await expect(page.locator("main")).not.toContainText(/Lighthouse\s+\d+|Core Web Vitals\s+PASS|FPS\s+\d+/i);
  await page.addScriptTag({path:"node_modules/axe-core/axe.min.js"});
  const violations=await page.evaluate(async()=>{const axe=(window as unknown as {axe:{run:(n:Element|null,o:unknown)=>Promise<{violations:Array<{id:string}>}>}}).axe;return(await axe.run(document.querySelector("main"),{runOnly:{type:"tag",values:["wcag2a","wcag2aa","wcag21aa"]}})).violations.map(v=>v.id);});
  expect(violations).toEqual([]);
 });
});
