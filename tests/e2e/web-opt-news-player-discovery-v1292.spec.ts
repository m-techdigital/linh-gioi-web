import { expect, test, type BrowserContext, type Page } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";
import { currentNewsPolicy } from "../../packages/content/src/public-ia";

const STATIC_BUILD=process.env.LGO_STATIC_BUILD_PATH;
const origin=STATIC_BUILD?"http://wip.local":(process.env.LGO_WEB_URL??"http://127.0.0.1:3221");
const evidenceRoot=process.env.LGO_EVIDENCE_DIR??path.join(process.cwd(),"handoff/web-opt-v1.292/evidence");
const phase=process.env.LGO_EVIDENCE_PHASE??"before";
const playerCount=Object.values(currentNewsPolicy).filter(value=>value==="player").length;
const archiveCount=Object.values(currentNewsPolicy).filter(value=>value==="archive").length;

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
 await page.goto(origin+"/news",{waitUntil:"load"});
 await expect(page.getByRole("heading",{level:1,name:"Tin tức Linh Giới",exact:true})).toBeVisible();
 await page.evaluate(async()=>{await document.fonts.ready;await new Promise<void>(resolve=>requestAnimationFrame(()=>requestAnimationFrame(()=>resolve())));});
}

test.describe("WEB-OPT-15 news player discovery v1.292",()=>{
 test.setTimeout(120_000);
 test.beforeEach(async({context})=>mountStaticBuild(context));
 test("capture exact player-news versus archive composition",async({page,isMobile})=>{
  await ready(page);
  const m=await page.evaluate(()=>{
   const box=(selector:string)=>{const n=document.querySelector<HTMLElement>(selector);if(!n)return null;const r=n.getBoundingClientRect();return{top:Math.round(r.top+scrollY),bottom:Math.round(r.bottom+scrollY),height:Math.round(r.height),width:Math.round(r.width)};};
   const actions=document.querySelector<HTMLElement>(".lgo-news-primary-empty-actions");
   const actionStyle=actions?getComputedStyle(actions):null;
   const actionBoxes=actions?[...actions.children].map(n=>(n as HTMLElement).getBoundingClientRect()):[];
   return{scrollHeight:document.documentElement.scrollHeight,overflow:document.documentElement.scrollWidth-innerWidth,
    hero:box(".lgo-release-hero"),library:box("#news-library"),reading:box("[aria-labelledby=news-reading-heading]"),archive:box("#news-devlog-archive"),
    heroBoundaryCount:document.querySelectorAll(".lgo-library-boundary").length,
    playerCards:document.querySelectorAll("#news-library .lgo-reading-catalog-card").length,
    archiveCards:document.querySelectorAll("#news-devlog-archive .lgo-reading-catalog-card").length,
    archiveOpen:(document.querySelector("#news-devlog-archive") as HTMLDetailsElement)?.open??false,
    actionRail:actions&&actionStyle?{display:actionStyle.display,overflowX:actionStyle.overflowX,rows:new Set(actionBoxes.map(r=>Math.round(r.top))).size,scrollWidth:actions.scrollWidth,clientWidth:actions.clientWidth}:null};
  });
  const dir=path.join(evidenceRoot,phase);fs.mkdirSync(dir,{recursive:true});const name=isMobile?"mobile":"desktop";
  fs.writeFileSync(path.join(dir,name+"-metrics.json"),JSON.stringify(m,null,2)+"\n");
  await page.screenshot({path:path.join(dir,name+"-news.png"),fullPage:true});
  expect(m.overflow).toBeLessThanOrEqual(0);
 });

 test("truthful player-news empty state is primary and archive follows useful routes",async({page})=>{
  await ready(page);expect(playerCount).toBe(0);expect(archiveCount).toBeGreaterThan(0);
  await expect(page.locator("#news-library")).toContainText("Chưa có bản tin game mới");
  const links=page.locator(".lgo-news-primary-empty-actions").getByRole("link");
  await expect(links).toHaveCount(3);
  for(const [i,href] of ["/status","/guides","/roadmap"].entries())await expect(links.nth(i)).toHaveAttribute("href",href);
  const reading=page.locator("[aria-labelledby=news-reading-heading]"),archive=page.locator("#news-devlog-archive");
  const [readingBox,archiveBox]=await Promise.all([reading.boundingBox(),archive.boundingBox()]);
  expect(readingBox!.y).toBeLessThan(archiveBox!.y);
  await expect(archive).not.toHaveAttribute("open","");
  await expect(archive.locator(".lgo-reading-catalog-card")).toHaveCount(archiveCount);
 });

 test("hero and mobile empty-state actions prioritize players instead of repeated technical proof",async({page,isMobile})=>{
  await ready(page);
  await expect(page.locator(".lgo-library-boundary")).toHaveCount(0);
  const actions=page.locator(".lgo-news-primary-empty-actions");
  const m=await actions.evaluate(el=>{const n=el as HTMLElement,s=getComputedStyle(n),boxes=[...n.children].map(c=>(c as HTMLElement).getBoundingClientRect());return{display:s.display,overflowX:s.overflowX,rows:new Set(boxes.map(r=>Math.round(r.top))).size,scrollWidth:n.scrollWidth,clientWidth:n.clientWidth,minHeight:Math.min(...boxes.map(r=>r.height)),pageOverflow:document.documentElement.scrollWidth-innerWidth};});
  if(isMobile){expect(m.display).toBe("flex");expect(m.overflowX).toBe("auto");expect(m.rows).toBe(1);expect(m.scrollWidth).toBeGreaterThan(m.clientWidth);expect(m.minHeight).toBeGreaterThanOrEqual(44);}
  expect(m.pageOverflow).toBeLessThanOrEqual(0);
 });

 test("archive remains reachable without becoming player news or a live feed",async({page})=>{
  await ready(page);const archive=page.locator("#news-devlog-archive");
  await archive.locator(":scope > summary").focus();await page.keyboard.press("Enter");await expect(archive).toHaveAttribute("open","");
  await expect(archive.locator(".lgo-reading-catalog-card")).toHaveCount(archiveCount);
  await expect(page.locator("main form,main textarea,main iframe,main canvas,[role=timer],[role=progressbar]")).toHaveCount(0);
  await expect(page.locator("main")).toContainText("NO_ACCEPTED_BACKEND_CONTRACT");
  await page.addScriptTag({path:"node_modules/axe-core/axe.min.js"});
  const violations=await page.evaluate(async()=>{const axe=(window as unknown as {axe:{run:(n:Element|null,o:unknown)=>Promise<{violations:Array<{id:string}>}>}}).axe;return(await axe.run(document.querySelector("main"),{runOnly:{type:"tag",values:["wcag2a","wcag2aa","wcag21aa"]}})).violations.map(v=>v.id);});
  expect(violations).toEqual([]);
 });
 test("player-first hierarchy stays compact after removing repeated proof",async({page,isMobile})=>{
  await ready(page);
  const m=await page.evaluate(()=>({height:document.documentElement.scrollHeight,overflow:document.documentElement.scrollWidth-innerWidth}));
  expect(m.height).toBeLessThanOrEqual(isMobile?1750:1250);
  expect(m.overflow).toBeLessThanOrEqual(0);
 });

 test("news-only mobile rail does not alter the generic events reading routes",async({page,isMobile})=>{
  await page.goto(origin+"/events",{waitUntil:"load"});
  await expect(page.locator(".lgo-events-reading-routes")).toBeVisible();
  const m=await page.locator(".lgo-events-reading-routes").evaluate(el=>{
    const n=el as HTMLElement,s=getComputedStyle(n);
    return{display:s.display,overflowX:s.overflowX,pageOverflow:document.documentElement.scrollWidth-innerWidth};
  });
  expect(m.display).toBe("grid");
  if(isMobile)expect(m.overflowX).not.toBe("auto");
  expect(m.pageOverflow).toBeLessThanOrEqual(0);
 });

});
