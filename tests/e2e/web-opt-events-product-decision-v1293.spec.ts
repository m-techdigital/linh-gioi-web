import { expect, test, type BrowserContext, type Page } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";
import { contentEntries } from "../../packages/content/src/fixtures";

const STATIC_BUILD=process.env.LGO_STATIC_BUILD_PATH;
const origin=STATIC_BUILD?"http://wip.local":(process.env.LGO_WEB_URL??"http://127.0.0.1:3221");
const evidenceRoot=process.env.LGO_EVIDENCE_DIR??path.join(process.cwd(),"handoff/web-opt-v1.293/evidence");
const phase=process.env.LGO_EVIDENCE_PHASE??"before";
const eventFixtures=contentEntries.filter(entry=>entry.category==="events"&&entry.status==="published");

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
 await page.goto(origin+"/events",{waitUntil:"load"});
 await expect(page.getByRole("heading",{level:1,name:"Sự kiện Linh Giới",exact:true})).toBeVisible();
 await page.evaluate(async()=>{await document.fonts.ready;await new Promise<void>(resolve=>requestAnimationFrame(()=>requestAnimationFrame(()=>resolve())));});
}

test.describe("WEB-OPT-16 events product decision v1.293",()=>{
 test.setTimeout(120_000);
 test.beforeEach(async({context})=>mountStaticBuild(context));

 test("capture exact event-state versus fixture-archive composition",async({page,isMobile})=>{
  await ready(page);
  const m=await page.evaluate(()=>{
   const box=(selector:string)=>{const n=document.querySelector<HTMLElement>(selector);if(!n)return null;const r=n.getBoundingClientRect();return{top:Math.round(r.top+scrollY),bottom:Math.round(r.bottom+scrollY),height:Math.round(r.height),width:Math.round(r.width)};};
   const archive=document.querySelector<HTMLDetailsElement>("#events-fixture-archive");
   return{scrollHeight:document.documentElement.scrollHeight,overflow:document.documentElement.scrollWidth-innerWidth,
    hero:box(".lgo-release-hero"),state:box("#events-announcements"),routes:box(".lgo-events-reading-routes"),archive:box("#events-fixture-archive"),
    heroBoundaryCount:document.querySelectorAll(".lgo-library-boundary").length,
    visibleAnnouncementBoards:document.querySelectorAll("#events-announcements > .lgo-announcement-board").length,
    archiveCards:document.querySelectorAll("#events-fixture-archive .lgo-announcement-card").length,
    archiveOpen:archive?.open??false};
  });
  const dir=path.join(evidenceRoot,phase);fs.mkdirSync(dir,{recursive:true});const name=isMobile?"mobile":"desktop";
  fs.writeFileSync(path.join(dir,name+"-metrics.json"),JSON.stringify(m,null,2)+"\n");
  await page.screenshot({path:path.join(dir,name+"-events.png"),fullPage:true});
  expect(m.overflow).toBeLessThanOrEqual(0);
 });

 test("fixture-only source resolves to explicit no-live-event product state",async({page})=>{
  await ready(page);
  expect(eventFixtures).toHaveLength(1);
  await expect(page.locator("#events-announcements")).toContainText("Chưa có sự kiện live đang mở");
  await expect(page.locator("#events-announcements")).toContainText("0 sự kiện live được xác nhận");
  await expect(page.locator("#events-announcements > .lgo-announcement-board")).toHaveCount(0);
  await expect(page.locator(".lgo-library-boundary")).toHaveCount(0);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content",/noindex/i);
 });
 test("provisional event fixture remains reachable only inside collapsed archive",async({page})=>{
  await ready(page);const archive=page.locator("#events-fixture-archive");
  await expect(archive).not.toHaveAttribute("open","");
  await expect(archive).toContainText("Kho chủ đề minh họa");
  await expect(archive.locator(".lgo-announcement-card")).toHaveCount(eventFixtures.length);
  await archive.locator(":scope > summary").focus();await page.keyboard.press("Enter");await expect(archive).toHaveAttribute("open","");
  const card=archive.locator(".lgo-announcement-card").first();
  await expect(card.getByRole("heading",{level:3})).toHaveText(eventFixtures[0]!.title);
  await expect(card.locator(".lgo-announcement-description")).toHaveText(eventFixtures[0]!.summary);
  await card.locator("summary").click();await expect(card.locator(".lgo-announcement-body")).toHaveText(eventFixtures[0]!.body);
 });

 test("read-only routes remain useful without registration countdown or reward state",async({page})=>{
  await ready(page);
  const routes=page.locator(".lgo-events-reading-routes");await expect(routes.getByRole("link")).toHaveCount(4);
  for(const [i,href] of ["/status","/roadmap","/community","/support/help"].entries())await expect(routes.getByRole("link").nth(i)).toHaveAttribute("href",href);
  await expect(page.locator("main form,main input,main textarea,main iframe,main canvas,[role=timer],[role=progressbar],main a[download]")).toHaveCount(0);
  await expect(page.locator("main")).toContainText("NO_ACCEPTED_BACKEND_CONTRACT");
  await page.addScriptTag({path:"node_modules/axe-core/axe.min.js"});
  const violations=await page.evaluate(async()=>{const axe=(window as unknown as {axe:{run:(n:Element|null,o:unknown)=>Promise<{violations:Array<{id:string}>}>}}).axe;return(await axe.run(document.querySelector("main"),{runOnly:{type:"tag",values:["wcag2a","wcag2aa","wcag21aa"]}})).violations.map(v=>v.id);});
  expect(violations).toEqual([]);
 });
});
