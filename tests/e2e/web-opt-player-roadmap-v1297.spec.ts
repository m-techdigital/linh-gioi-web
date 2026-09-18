import { expect, test, type BrowserContext, type Page } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

const STATIC_BUILD=process.env.LGO_STATIC_BUILD_PATH;
const origin=STATIC_BUILD?"http://wip.local":(process.env.LGO_WEB_URL??"http://127.0.0.1:3221");
const evidenceRoot=process.env.LGO_EVIDENCE_DIR??path.join(process.cwd(),"handoff/web-opt-v1.297/evidence");
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
 await page.goto(origin+"/roadmap",{waitUntil:"load"});
 await expect(page.locator("main h1")).toHaveCount(1);
 await page.evaluate(async()=>{await document.fonts.ready;await new Promise<void>(resolve=>requestAnimationFrame(()=>requestAnimationFrame(()=>resolve())));});
}

test.describe("WEB-OPT-20 player roadmap v1.297",()=>{
 test.setTimeout(120_000);
 test.beforeEach(async({context})=>mountStaticBuild(context));
 test("capture exact player-roadmap versus engineering-history composition",async({page,isMobile})=>{
  await ready(page);
  const m=await page.evaluate(()=>{
   const box=(selector:string)=>{const n=document.querySelector<HTMLElement>(selector);if(!n)return null;const r=n.getBoundingClientRect();return{top:Math.round(r.top+scrollY),bottom:Math.round(r.bottom+scrollY),height:Math.round(r.height),width:Math.round(r.width)};};
   return{scrollHeight:document.documentElement.scrollHeight,overflow:document.documentElement.scrollWidth-innerWidth,
    hero:box(".lgo-release-hero"),stages:box("#roadmap-release-stages"),gates:box("#roadmap-gates"),boundary:box(".lgo-planning-boundaries"),archive:box("#roadmap-source-archive"),
    stageCount:document.querySelectorAll("#roadmap-release-stages .lgo-planning-stage").length,
    gateCount:document.querySelectorAll("#roadmap-gates .lgo-planning-gate").length,
    archiveCount:document.querySelectorAll("#roadmap-source-archive .lgo-milestone-entry").length};
  });
  const dir=path.join(evidenceRoot,phase);fs.mkdirSync(dir,{recursive:true});const name=isMobile?"mobile":"desktop";
  fs.writeFileSync(path.join(dir,name+"-metrics.json"),JSON.stringify(m,null,2)+"\n");
  await page.screenshot({path:path.join(dir,name+"-roadmap.png"),fullPage:true});
  expect(m.overflow).toBeLessThanOrEqual(0);
 });

 test("public roadmap leads with player product stages before release conditions",async({page})=>{
  await ready(page);
  await expect(page.getByRole("heading",{level:1,name:"Lộ trình Linh Giới Online",exact:true})).toBeVisible();
  const order=await page.evaluate(()=>["roadmap-release-stages","roadmap-gates"].map(id=>document.getElementById(id)?.getBoundingClientRect().top??Infinity));
  expect(order[0]).toBeLessThan(order[1]);
  await expect(page.getByRole("heading",{name:"Các chặng người chơi có thể theo dõi",exact:true})).toBeVisible();
  await expect(page.locator("#roadmap-release-stages .lgo-planning-stage")).toHaveCount(4);
 });

 test("engineering implementation archive is not rendered in the public journey",async({page})=>{
  await ready(page);
  await expect(page.locator("#roadmap-source-archive")).toHaveCount(0);
  const main=page.locator("main");
  await expect(main).not.toContainText("Public UX / content polish");
  await expect(main).not.toContainText("Game backend contract sync");
  await expect(main).not.toContainText("Performance / copy / asset budget polish");
 });
 test("truthful stages and gates remain interactive without fake release state",async({page})=>{
  await ready(page);
  await expect(page.locator("#roadmap-gates .lgo-planning-gate")).toHaveCount(4);
  await expect(page.locator(".lgo-planning-boundaries")).toContainText("Không có ngày mở");
  await expect(page.locator(".lgo-planning-boundaries")).toContainText("NO_ACCEPTED_BACKEND_CONTRACT");
  await expect(page.locator("main form,main input,main textarea,[role=progressbar],[role=timer],main time")).toHaveCount(0);
  await expect(page.locator("main")).not.toContainText(/\b\d{1,3}%\b/);
  const first=page.locator("#roadmap-gates .lgo-planning-gate").first();
  await first.locator("summary").focus();await page.keyboard.press("Enter");await expect(first.locator("details")).toHaveAttribute("open","");
  await page.addScriptTag({path:"node_modules/axe-core/axe.min.js"});
  const violations=await page.evaluate(async()=>{const axe=(window as unknown as {axe:{run:(n:Element|null,o:unknown)=>Promise<{violations:Array<{id:string}>}>}}).axe;return(await axe.run(document.querySelector("main"),{runOnly:{type:"tag",values:["wcag2a","wcag2aa","wcag21aa"]}})).violations.map(v=>v.id);});
  expect(violations).toEqual([]);
 });
});
