import { expect, test, type BrowserContext, type Page } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

const STATIC_BUILD=process.env.LGO_STATIC_BUILD_PATH;
const origin=STATIC_BUILD?"http://wip.local":(process.env.LGO_WEB_URL??"http://127.0.0.1:3221");
const evidenceRoot=process.env.LGO_EVIDENCE_DIR??path.join(process.cwd(),"handoff/web-opt-v1.296/evidence");
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
 await page.goto(origin+"/accessibility",{waitUntil:"load"});
 await expect(page.getByRole("heading",{level:1,name:"Dễ đọc và dễ thao tác",exact:true})).toBeVisible();
 await page.evaluate(async()=>{await document.fonts.ready;await new Promise<void>(resolve=>requestAnimationFrame(()=>requestAnimationFrame(()=>resolve())));});
}

test.describe("WEB-OPT-19 accessibility player help v1.296",()=>{
 test.setTimeout(120_000);
 test.beforeEach(async({context})=>mountStaticBuild(context));
 test("capture exact player-help versus compliance-proof composition",async({page,isMobile})=>{
  await ready(page);
  const m=await page.evaluate(()=>{
   const box=(selector:string)=>{const n=document.querySelector<HTMLElement>(selector);if(!n)return null;const r=n.getBoundingClientRect();return{top:Math.round(r.top+scrollY),bottom:Math.round(r.bottom+scrollY),height:Math.round(r.height),width:Math.round(r.width)};};
   return{scrollHeight:document.documentElement.scrollHeight,overflow:document.documentElement.scrollWidth-innerWidth,
    hero:box(".lgo-release-hero"),practice:box("#accessibility-practice"),routes:box("#accessibility-routes"),
    principles:box("#accessibility-principles"),boundaries:box("#accessibility-boundaries"),notes:box(".lgo-release-more-evidence"),
    heroNoteCount:document.querySelectorAll(".lgo-accessibility-hero-note").length,
    principleSmallCount:document.querySelectorAll("#accessibility-principles .lgo-question-answer small").length,
    principleParagraphCount:document.querySelectorAll("#accessibility-principles .lgo-question-answer p").length};
  });
  const dir=path.join(evidenceRoot,phase);fs.mkdirSync(dir,{recursive:true});const name=isMobile?"mobile":"desktop";
  fs.writeFileSync(path.join(dir,name+"-metrics.json"),JSON.stringify(m,null,2)+"\n");
  await page.screenshot({path:path.join(dir,name+"-accessibility.png"),fullPage:true});
  expect(m.overflow).toBeLessThanOrEqual(0);
 });

 test("main principles read as player help while technical proof moves to deep notes",async({page})=>{
  await ready(page);
  await expect(page.locator(".lgo-accessibility-hero-note")).toHaveCount(0);
  const rules=page.locator("#accessibility-principles details");await expect(rules).toHaveCount(3);
  for(const rule of await rules.all()){
   await rule.locator("summary").click();
   await expect(rule.locator(".lgo-question-answer p")).toHaveCount(1);
   await expect(rule.locator(".lgo-question-answer small")).toHaveCount(0);
  }
  await expect(page.getByRole("heading",{name:"Điều hướng dẫn chưa thay thế",exact:true})).toBeVisible();
  await expect(page.locator(".lgo-release-more-evidence")).toContainText("Tìm hiểu sâu hơn về focus và cách đọc");
 });
 test("keyboard practice and five player routes remain real and local",async({page})=>{
  await ready(page);const practice=page.locator(".lgo-keyboard-practice");
  await practice.getByRole("button",{name:"Bắt đầu lượt thử",exact:true}).click();
  const checkbox=practice.getByRole("checkbox",{name:"Đánh dấu thử",exact:true});await expect(checkbox).toBeFocused();
  await page.keyboard.press("Space");await expect(checkbox).toBeChecked();
  await page.keyboard.press("Tab");const summary=practice.locator("summary");await expect(summary).toBeFocused();
  await page.keyboard.press("Enter");await expect(practice.locator("details")).toHaveAttribute("open","");
  const routes=page.locator("#accessibility-routes nav");await expect(routes.getByRole("link")).toHaveCount(5);
  for(const href of ["/accessibility","/start","/download/trust","/support/safety","/game/loop"])await expect(routes.locator('a[href="'+href+'"]')).toBeVisible();
  await expect(page.locator("#accessibility-boundaries")).toContainText("Chưa có audit WCAG chính thức");
  await expect(page.locator("#accessibility-boundaries")).toContainText("Không lưu thiết lập cá nhân");
  await expect(page.locator("main")).toContainText("NO_ACCEPTED_BACKEND_CONTRACT");
 });

 test("player help remains accessible without fake settings or certification",async({page})=>{
  await ready(page);
  await expect(page.locator("main form,main textarea,main input:not([type=checkbox]),main iframe,[role=progressbar],[role=timer]")).toHaveCount(0);
  await expect(page.locator("main")).not.toContainText(/WCAG\s*(AA|AAA)\s*(PASS|certified)|certified accessible|legal compliance achieved/i);
  await page.addScriptTag({path:"node_modules/axe-core/axe.min.js"});
  const violations=await page.evaluate(async()=>{const axe=(window as unknown as {axe:{run:(n:Element|null,o:unknown)=>Promise<{violations:Array<{id:string}>}>}}).axe;return(await axe.run(document.querySelector("main"),{runOnly:{type:"tag",values:["wcag2a","wcag2aa","wcag21aa"]}})).violations.map(v=>v.id);});
  expect(violations).toEqual([]);
 });
});
