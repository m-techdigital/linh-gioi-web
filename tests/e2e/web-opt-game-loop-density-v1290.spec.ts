import { expect, test, type BrowserContext, type Page } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

const STATIC_BUILD = process.env.LGO_STATIC_BUILD_PATH;
const origin = STATIC_BUILD ? "http://wip.local" : (process.env.LGO_WEB_URL ?? "http://127.0.0.1:3221");
const evidenceRoot = process.env.LGO_EVIDENCE_DIR ?? path.join(process.cwd(),"handoff/web-opt-v1.290/evidence");
const phase = process.env.LGO_EVIDENCE_PHASE ?? "before";

function appRouteFile(app:string,pathname:string,extension:".html"|".rsc"){
  const route=pathname.replace(/\/$/,"")||"/";
  return path.join(app,".next/server/app",(route==="/"?"index":route.slice(1))+extension);
}
async function mountStaticBuild(context:BrowserContext){
  if(!STATIC_BUILD)return;
  await context.route("http://wip.local/**",async route=>{
    const url=new URL(route.request().url());
    let file:string|undefined;let contentType="application/octet-stream";
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
    return route.fulfill({status:200,contentType,body:fs.readFileSync(file)});
  });
}
async function ready(page:Page){
  await page.goto(origin+"/game/loop",{waitUntil:"load"});
  await expect(page.getByRole("heading",{level:1,name:"Vòng lặp gameplay thế giới",exact:true})).toBeVisible();
  await page.evaluate(async()=>{await document.fonts.ready;await new Promise<void>(resolve=>requestAnimationFrame(()=>requestAnimationFrame(()=>resolve())));});
}

test.describe("WEB-OPT-13 game loop density v1.290",()=>{
  test.setTimeout(120_000);
  test.beforeEach(async({context})=>mountStaticBuild(context));
  test("capture exact game-loop composition",async({page,isMobile})=>{
    await ready(page);
    const metrics=await page.evaluate(()=>{
      const makeBox=(selector:string)=>{const n=document.querySelector<HTMLElement>(selector);if(!n)return null;const r=n.getBoundingClientRect();return{top:Math.round(r.top+scrollY),bottom:Math.round(r.bottom+scrollY),height:Math.round(r.height),width:Math.round(r.width)};};
      const rail=document.querySelector<HTMLElement>("#loop-reading .lgo-progress-steps")!;
      const style=getComputedStyle(rail);
      const boxes=[...rail.children].map(n=>(n as HTMLElement).getBoundingClientRect());
      return{
        scrollHeight:document.documentElement.scrollHeight,
        overflow:document.documentElement.scrollWidth-innerWidth,
        hero:makeBox(".lgo-release-hero"),
        reading:makeBox("#loop-reading"),
        questions:makeBox("#loop-questions"),
        scope:makeBox("#loop-questions + aside"),
        routes:makeBox(".lgo-loop-route-grid"),
        sourceNotes:makeBox(".lgo-release-more-evidence"),
        heroBoundaryCount:document.querySelectorAll(".lgo-loop-hero-boundary").length,
        readingBoundaryCount:document.querySelectorAll("#loop-reading .lgo-reading-journey-boundary").length,
        routeProofCount:document.querySelectorAll(".lgo-loop-route-grid .lgo-release-gate-proof").length,
        rail:{display:style.display,overflowX:style.overflowX,rows:new Set(boxes.map(r=>Math.round(r.top))).size,scrollWidth:rail.scrollWidth,clientWidth:rail.clientWidth}
      };
    });
    const dir=path.join(evidenceRoot,phase);fs.mkdirSync(dir,{recursive:true});
    const name=isMobile?"mobile":"desktop";
    fs.writeFileSync(path.join(dir,name+"-metrics.json"),JSON.stringify(metrics,null,2)+"\n");
    await page.screenshot({path:path.join(dir,name+"-game-loop.png"),fullPage:true});
    expect(metrics.overflow).toBeLessThanOrEqual(0);
  });
  test("repeated technical boundaries collapse into one clear scope owner",async({page})=>{
    await ready(page);
    await expect(page.locator(".lgo-loop-hero-boundary")).toHaveCount(0);
    await expect(page.locator("#loop-reading .lgo-reading-journey-boundary")).toHaveCount(1);
    await expect(page.locator("#loop-questions + aside")).toContainText("NO_ACCEPTED_BACKEND_CONTRACT");
    await expect(page.locator("main")).toContainText("không lưu tiến trình nhân vật");
  });

  test("mobile loop stages use a compact swipe rail without page overflow",async({page,isMobile})=>{
    await ready(page);
    const rail=page.locator("#loop-reading .lgo-progress-steps");
    const m=await rail.evaluate(el=>{const n=el as HTMLElement,s=getComputedStyle(n),boxes=[...n.children].map(c=>(c as HTMLElement).getBoundingClientRect());return{display:s.display,overflowX:s.overflowX,rows:new Set(boxes.map(r=>Math.round(r.top))).size,scrollWidth:n.scrollWidth,clientWidth:n.clientWidth,minWidth:Math.min(...boxes.map(r=>r.width)),pageOverflow:document.documentElement.scrollWidth-innerWidth};});
    if(isMobile){
      expect(m.display).toBe("flex");
      expect(m.overflowX).toBe("auto");
      expect(m.rows).toBe(1);
      expect(m.scrollWidth).toBeGreaterThan(m.clientWidth);
      expect(m.minWidth).toBeGreaterThanOrEqual(280);
    }
    expect(m.pageOverflow).toBeLessThanOrEqual(0);
  });
  test("read-only interaction and next routes remain truthful",async({page})=>{
    await ready(page);
    const journey=page.locator("#loop-reading .lgo-reading-journey");
    await expect(journey.locator(".lgo-progress-step")).toHaveCount(4);
    await journey.getByRole("button",{name:"Bước tiếp",exact:true}).click();
    await expect(journey.getByRole("status")).toContainText("2/4");
    await expect(page.locator("canvas,video,iframe,main form,main input,main textarea,[role=progressbar]")).toHaveCount(0);
    await expect(page.getByRole("button",{name:/Tấn công|Nhận thưởng|Dùng skill|Đăng nhập|Chơi ngay/i})).toHaveCount(0);
    await page.addScriptTag({path:"node_modules/axe-core/axe.min.js"});
    const violations=await page.evaluate(async()=>{
      const axe=(window as unknown as {axe:{run:(n:Element|null,o:unknown)=>Promise<{violations:Array<{id:string}>}>}}).axe;
      return(await axe.run(document.querySelector("main"),{runOnly:{type:"tag",values:["wcag2a","wcag2aa","wcag21aa"]}})).violations.map(v=>v.id);
    });
    expect(violations).toEqual([]);
  });
  test("mobile scroll cost stays materially below the 4880px baseline",async({page,isMobile})=>{
    if(!isMobile)return;
    await ready(page);
    const m=await page.evaluate(()=>({height:document.documentElement.scrollHeight,overflow:document.documentElement.scrollWidth-innerWidth}));
    expect(m.height).toBeLessThanOrEqual(4490);
    expect(m.overflow).toBeLessThanOrEqual(0);
  });

});
