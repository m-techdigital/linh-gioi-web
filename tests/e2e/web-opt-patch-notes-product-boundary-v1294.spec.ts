import { expect, test, type BrowserContext, type Page } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";
import { contentEntries } from "../../packages/content/src/fixtures";

const STATIC_BUILD=process.env.LGO_STATIC_BUILD_PATH;
const origin=STATIC_BUILD?"http://wip.local":(process.env.LGO_WEB_URL??"http://127.0.0.1:3221");
const evidenceRoot=process.env.LGO_EVIDENCE_DIR??path.join(process.cwd(),"handoff/web-opt-v1.294/evidence");
const phase=process.env.LGO_EVIDENCE_PHASE??"before";
const webPatchFixtures=contentEntries.filter(entry=>entry.category==="patch-notes"&&entry.status==="published");

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
 await page.goto(origin+"/patch-notes",{waitUntil:"load"});
 await expect(page.getByRole("heading",{level:1,name:"Ghi chú cập nhật Linh Giới",exact:true})).toBeVisible();
 await page.evaluate(async()=>{await document.fonts.ready;await new Promise<void>(resolve=>requestAnimationFrame(()=>requestAnimationFrame(()=>resolve())));});
}

test.describe("WEB-OPT-17 patch notes product boundary v1.294",()=>{
 test.setTimeout(120_000);
 test.beforeEach(async({context})=>mountStaticBuild(context));

 test("capture exact game-release state versus web-engineering archive",async({page,isMobile})=>{
  await ready(page);
  const m=await page.evaluate(()=>{
   const box=(selector:string)=>{const n=document.querySelector<HTMLElement>(selector);if(!n)return null;const r=n.getBoundingClientRect();return{top:Math.round(r.top+scrollY),bottom:Math.round(r.bottom+scrollY),height:Math.round(r.height),width:Math.round(r.width)};};
   const archive=document.querySelector<HTMLDetailsElement>("#patch-notes-web-archive");
   return{scrollHeight:document.documentElement.scrollHeight,overflow:document.documentElement.scrollWidth-innerWidth,
    hero:box(".lgo-release-hero"),state:box("#patch-notes-announcements"),routes:box(".lgo-patch-notes-reading-routes"),archive:box("#patch-notes-web-archive"),
    heroBoundaryCount:document.querySelectorAll(".lgo-library-boundary").length,
    visibleAnnouncementBoards:document.querySelectorAll("#patch-notes-announcements > .lgo-announcement-board").length,
    archiveCards:document.querySelectorAll("#patch-notes-web-archive .lgo-announcement-card").length,
    archiveOpen:archive?.open??false};
  });
  const dir=path.join(evidenceRoot,phase);fs.mkdirSync(dir,{recursive:true});const name=isMobile?"mobile":"desktop";
  fs.writeFileSync(path.join(dir,name+"-metrics.json"),JSON.stringify(m,null,2)+"\n");
  await page.screenshot({path:path.join(dir,name+"-patch-notes.png"),fullPage:true});
  expect(m.overflow).toBeLessThanOrEqual(0);
 });

 test("provisional web records resolve to explicit no-game-patch state",async({page})=>{
  await ready(page);expect(webPatchFixtures).toHaveLength(2);
  expect(webPatchFixtures.every(entry=>entry.tags?.includes("PROVISIONAL_WEB_FIXTURE"))).toBe(true);
  await expect(page.locator("#patch-notes-announcements")).toContainText("Chưa có ghi chú phát hành game");
  await expect(page.locator("#patch-notes-announcements")).toContainText("0 bản cập nhật game được xác nhận");
  await expect(page.locator("#patch-notes-announcements > .lgo-announcement-board")).toHaveCount(0);
  await expect(page.locator(".lgo-library-boundary")).toHaveCount(0);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content",/noindex/i);
 });
 test("web engineering records remain exact and reachable only in collapsed archive",async({page})=>{
  await ready(page);const archive=page.locator("#patch-notes-web-archive");
  await expect(archive).not.toHaveAttribute("open","");
  await expect(archive).toContainText("Nhật ký kỹ thuật Web");
  await expect(archive.locator(".lgo-announcement-card")).toHaveCount(webPatchFixtures.length);
  await archive.locator(":scope > summary").focus();await page.keyboard.press("Enter");await expect(archive).toHaveAttribute("open","");
  const cards=archive.locator(".lgo-announcement-card");
  for(const [index,entry] of webPatchFixtures.entries()){
   const card=cards.nth(index);
   await expect(card.getByRole("heading",{level:3})).toHaveText(entry.title);
   await expect(card.locator(".lgo-announcement-description")).toHaveText(entry.summary);
   await card.locator("summary").click();await expect(card.locator(".lgo-announcement-body")).toHaveText(entry.body);
  }
 });

 test("player verification routes precede engineering archive without release actions",async({page})=>{
  await ready(page);
  const routes=page.locator(".lgo-patch-notes-reading-routes"),archive=page.locator("#patch-notes-web-archive");
  const [routesBox,archiveBox]=await Promise.all([routes.boundingBox(),archive.boundingBox()]);
  expect(routesBox!.y).toBeLessThan(archiveBox!.y);
  await expect(routes.getByRole("link")).toHaveCount(4);
  for(const [i,href] of ["/status","/roadmap","/download","/download/trust"].entries())await expect(routes.getByRole("link").nth(i)).toHaveAttribute("href",href);
  await expect(page.locator("main form,main input,main textarea,main iframe,main canvas,[role=timer],[role=progressbar],main a[download]")).toHaveCount(0);
  await expect(page.locator("main")).toContainText("NO_ACCEPTED_BACKEND_CONTRACT");
  await page.addScriptTag({path:"node_modules/axe-core/axe.min.js"});
  const violations=await page.evaluate(async()=>{const axe=(window as unknown as {axe:{run:(n:Element|null,o:unknown)=>Promise<{violations:Array<{id:string}>}>}}).axe;return(await axe.run(document.querySelector("main"),{runOnly:{type:"tag",values:["wcag2a","wcag2aa","wcag21aa"]}})).violations.map(v=>v.id);});
  expect(violations).toEqual([]);
 });
});
