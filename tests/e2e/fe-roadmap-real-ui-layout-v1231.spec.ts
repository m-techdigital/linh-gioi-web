import { test, expect, type BrowserContext, type Page } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";
import { publicRoadmapItems } from "../../packages/content/src/fixtures";

const STATIC_BUILD=process.env.LGO_STATIC_BUILD_PATH;
const origin=STATIC_BUILD?"http://wip.local":(process.env.LGO_WEB_URL??"http://127.0.0.1:3000");

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
  else {
   const publicFile=path.join(STATIC_BUILD,"public",url.pathname);
   if(url.pathname!=="/"&&fs.existsSync(publicFile)&&fs.statSync(publicFile).isFile())file=publicFile;
   else {file=appRouteFile(STATIC_BUILD,url.pathname,".html");contentType="text/html";}
  }
  if(!file||!fs.existsSync(file))return route.fulfill({status:404,body:"not found"});
  if(file.endsWith(".css"))contentType="text/css";
  else if(file.endsWith(".js"))contentType="application/javascript";
  else if(file.endsWith(".png"))contentType="image/png";
  else if(file.endsWith(".webp"))contentType="image/webp";
  else if(file.endsWith(".svg"))contentType="image/svg+xml";
  else if(file.endsWith(".woff2"))contentType="font/woff2";
  const body=fs.readFileSync(file);
  return route.fulfill({status:200,contentType,body});
 });
}

async function ready(page:Page){
 await page.goto(origin+"/roadmap");
 await expect(page.getByRole("heading",{level:1,name:"Lộ trình Linh Giới Online",exact:true})).toBeVisible();
}

test.describe("roadmap player stages and source-owned history v1.231",()=>{
 test.beforeEach(async({context,page})=>{await mountStaticBuild(context);await ready(page);});
 test("real gate map and readable hero remain responsive",async({page,isMobile})=>{
  const map=page.locator(".lgo-planning-map");
  await expect(map).toBeVisible();
  await expect(map.getByRole("link")).toHaveCount(4);
  await expect(page.locator("main img[src*=design-boards],main img[src*=design-reference]")).toHaveCount(0);
  const m=await page.evaluate(()=>{
   const a=document.querySelector(".lgo-roadmap-experience .lgo-release-hero-copy")!.getBoundingClientRect();
   const b=document.querySelector(".lgo-planning-map")!.getBoundingClientRect();
   return{a:a.toJSON(),b:b.toJSON(),overflow:document.documentElement.scrollWidth-innerWidth};
  });
  expect(m.overflow).toBeLessThanOrEqual(0);
  if(isMobile)expect(m.b.top).toBeGreaterThanOrEqual(m.a.bottom);
  else expect(m.b.left).toBeGreaterThanOrEqual(m.a.right);
 });
 test("each gate destination exposes the corresponding real condition",async({page})=>{
  const links=page.locator(".lgo-planning-map a");
  await expect(links).toHaveCount(4);
  const ids=["roadmap-gate-content","roadmap-gate-download","roadmap-gate-community","roadmap-gate-backend"];
  for(let i=0;i<ids.length;i++){
   await expect(links.nth(i)).toHaveAttribute("href","#"+ids[i]);
   await links.nth(i).click();
   const gate=page.locator("#"+ids[i]);
   await expect(gate).toBeVisible();
   const summary=gate.locator("summary");
   await summary.focus();
   await page.keyboard.press("Enter");
   await expect(gate.locator("details")).toHaveAttribute("open","");
   expect((await summary.boundingBox())!.height).toBeGreaterThanOrEqual(44);
  }
  await expect(page.locator("#roadmap-gate-backend")).toContainText("Auth/API/DB/RBAC/audit");
  await expect(page.locator("#roadmap-gate-download")).toContainText("SHA256");
 });
 test("engineering history remains source-owned but is not public roadmap content",async({page})=>{
  expect(publicRoadmapItems).toHaveLength(15);
  expect(publicRoadmapItems.filter(item=>item.status==="current")).toHaveLength(11);
  expect(publicRoadmapItems.filter(item=>item.status==="planned")).toHaveLength(3);
  expect(publicRoadmapItems.filter(item=>item.status==="blocked")).toHaveLength(1);
  expect(publicRoadmapItems.find(item=>item.version==="v1.6")?.title).toBe("Public UX / content polish");
  expect(publicRoadmapItems.find(item=>item.version==="WEB-08")?.title).toBe("Game backend contract sync");
  await expect(page.locator("#roadmap-source-archive")).toHaveCount(0);
  await expect(page.locator("main")).not.toContainText("Public UX / content polish");
 });
 test("four release stages lead the public roadmap without fake progress",async({page})=>{
  const stages=page.locator("#roadmap-release-stages .lgo-planning-stage");
  await expect(stages).toHaveCount(4);
  const tops=await page.evaluate(()=>["roadmap-release-stages","roadmap-gates"].map(id=>document.getElementById(id)!.getBoundingClientRect().top));
  expect(tops[0]).toBeLessThan(tops[1]);
  await expect(stages.nth(0)).toContainText("Khám phá Linh Giới trên web");
  await expect(stages.nth(1)).toContainText("Chuẩn bị bản thử giới hạn");
  await expect(stages.nth(2)).toContainText("Bản thử được duyệt");
  await expect(stages.nth(3)).toContainText("Kết nối tài khoản và máy chủ");
  await expect(page.locator("main form,main input,main textarea,[role=progressbar],main time")).toHaveCount(0);
  const mainText=await page.locator("main").innerText();
  expect(mainText).not.toMatch(/\b\d{1,3}%\b/);
 });
 test("truth boundaries and player next steps remain explicit",async({page})=>{
  const main=page.locator("main");
  await expect(main).toContainText("Không phải lịch phát hành");
  await expect(main).toContainText("NO_ACCEPTED_BACKEND_CONTRACT");
  const boundary=page.locator(".lgo-planning-boundaries");
  await expect(boundary.locator('a[href="/status"]')).toBeVisible();
  await expect(boundary.locator('a[href="/download/trust"]')).toBeVisible();
 });
 test("main roadmap remains accessible",async({page})=>{
  const hub=page.locator(".lgo-roadmap-experience");
  await expect(hub).toBeVisible();
  await expect(page.locator("main h1")).toHaveCount(1);
  await page.addScriptTag({path:"node_modules/axe-core/axe.min.js"});
  const violations=await page.evaluate(async()=>{
   const axe=(window as unknown as {axe:{run:(n:Element|null,o:unknown)=>Promise<{violations:Array<{id:string}>}>}}).axe;
   return(await axe.run(document.querySelector("main"),{runOnly:{type:"tag",values:["wcag2a","wcag2aa","wcag21aa"]}})).violations.map(v=>v.id);
  });
  expect(violations).toEqual([]);
 });
});
