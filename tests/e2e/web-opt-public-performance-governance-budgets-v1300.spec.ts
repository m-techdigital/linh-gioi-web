import { expect, test, type BrowserContext, type Page } from "@playwright/test";
import { publicRouteMatrix } from "@lgo-web/content";
import fs from "node:fs";
import path from "node:path";

const STATIC_BUILD=process.env.LGO_STATIC_BUILD_PATH;
const captureOnly=process.env.LGO_BUDGET_CAPTURE_ONLY==="1";
const evidenceRoot=process.env.LGO_EVIDENCE_DIR??path.join(process.cwd(),"handoff/web-opt-v1.300/evidence");
const budgetPath=path.join(process.cwd(),"tools/web_public_performance_budgets_v1300.json");
const budget=captureOnly?undefined:JSON.parse(fs.readFileSync(budgetPath,"utf8"));

function appRouteFile(app:string,pathname:string,extension:".html"|".rsc"){
 const route=pathname.replace(/\/$/,"")||"/";
 return path.join(app,".next/server/app",(route==="/"?"index":route.slice(1))+extension);
}
function publicFile(app:string,pathname:string){
 const rel=decodeURIComponent(pathname).replace(/^\/+/, "");
 return path.join(app,"public",rel);
}
function mediaType(file:string){
 if(file.endsWith(".css"))return"text/css";
 if(file.endsWith(".js"))return"application/javascript";
 if(file.endsWith(".png"))return"image/png";
 if(file.endsWith(".webp"))return"image/webp";
 if(file.endsWith(".jpg")||file.endsWith(".jpeg"))return"image/jpeg";
 if(file.endsWith(".svg"))return"image/svg+xml";
 if(file.endsWith(".woff2"))return"font/woff2";
 return"application/octet-stream";
}
async function mountStaticBuild(context:BrowserContext){
 if(!STATIC_BUILD)throw new Error("LGO_STATIC_BUILD_PATH is required for v1.300 budgets");
 await context.route("http://wip.local/**",async route=>{
  const url=new URL(route.request().url());let file:string|undefined;let type="application/octet-stream";
  if(url.searchParams.has("_rsc")){file=appRouteFile(STATIC_BUILD,url.pathname,".rsc");type="text/x-component";}
  else if(url.pathname.startsWith("/_next/static/"))file=path.join(STATIC_BUILD,".next",url.pathname.slice("/_next/".length));
  else if(url.pathname==="/_next/image"){
   const source=url.searchParams.get("url");if(source?.startsWith("/"))file=publicFile(STATIC_BUILD,source);
  } else {
   const candidate=publicFile(STATIC_BUILD,url.pathname);
   if(url.pathname!=="/"&&fs.existsSync(candidate)&&fs.statSync(candidate).isFile())file=candidate;
   else {file=appRouteFile(STATIC_BUILD,url.pathname,".html");type="text/html";}
  }
  if(!file||!fs.existsSync(file))return route.fulfill({status:404,body:"not found"});
  if(type==="application/octet-stream")type=mediaType(file);
  return route.fulfill({status:200,contentType:type,body:fs.readFileSync(file)});
 });
}
function percentile(values:number[],fraction:number){
 const sorted=[...values].sort((a,b)=>a-b);
 return sorted[Math.min(sorted.length-1,Math.ceil(sorted.length*fraction)-1)]??0;
}
function sizeForResource(raw:string){
 if(!STATIC_BUILD)return 0;
 const url=new URL(raw);let file:string|undefined;
 if(url.pathname.startsWith("/_next/static/"))file=path.join(STATIC_BUILD,".next",url.pathname.slice("/_next/".length));
 else if(url.pathname==="/_next/image"){const source=url.searchParams.get("url");if(source?.startsWith("/"))file=publicFile(STATIC_BUILD,source);}
 else {const candidate=publicFile(STATIC_BUILD,url.pathname);if(fs.existsSync(candidate))file=candidate;}
 return file&&fs.existsSync(file)?fs.statSync(file).size:0;
}
function walkFiles(root:string){
 const result:string[]=[];
 for(const name of fs.readdirSync(root)){
  const full=path.join(root,name),stat=fs.statSync(full);
  if(stat.isDirectory())result.push(...walkFiles(full));else if(stat.isFile())result.push(full);
 }
 return result;
}
async function ready(page:Page,route:string){
 const response=await page.goto("http://wip.local"+route,{waitUntil:"load"});
 expect(response?.ok(),route+" HTTP status").toBeTruthy();
 await expect(page.locator(".lgo-public-shell")).toBeVisible();
 await expect(page.locator("h1").first()).toBeVisible();
 await page.evaluate(async()=>{await document.fonts.ready;await new Promise<void>(r=>requestAnimationFrame(()=>requestAnimationFrame(()=>r())));});
}
function runtimeBudget(projectName:string){
 const key=projectName.includes("mobile")?"mobile":"desktop";
 return {key,values:budget?.runtime?.[key]};
}
function assertMetric(name:string,value:number,item:{baseline:number;limit:number}){
 expect(value,name+": "+value+" > "+item.limit+" (baseline "+item.baseline+")").toBeLessThanOrEqual(item.limit);
}

test.describe("WEB-OPT-23 public performance & governance budgets v1.300",()=>{
 test.setTimeout(360_000);
 test.beforeEach(async({context})=>mountStaticBuild(context));
 test("59 public routes stay inside accepted performance budgets",async({page},testInfo)=>{
  const routes=publicRouteMatrix.map(x=>x.route);expect(routes).toHaveLength(59);
  const rows:Array<{route:string;cssBytes:number;height:number;imageBytes:number;maxImage:number;overflow:boolean;reviewRefs:number}>=[];
  for(const route of routes){
   await ready(page,route);
   const metrics=await page.evaluate(()=>({
    height:document.documentElement.scrollHeight,
    overflow:document.documentElement.scrollWidth>innerWidth+1,
    resources:performance.getEntriesByType("resource").map(e=>e.name)
   }));
   const resources=[...new Set(metrics.resources)];
   const cssUrls=resources.filter(x=>new URL(x).pathname.endsWith(".css"));
   const imageUrls=resources.filter(x=>{const u=new URL(x);return u.pathname==="/_next/image"||/\.(?:png|jpe?g|webp|gif|svg)$/i.test(u.pathname);});
   const imageSizes=[...new Set(imageUrls.map(x=>sizeForResource(x)).filter(Boolean))];
   rows.push({route,cssBytes:cssUrls.reduce((n,x)=>n+sizeForResource(x),0),height:metrics.height,
    imageBytes:imageSizes.reduce((a,b)=>a+b,0),maxImage:Math.max(0,...imageSizes),overflow:metrics.overflow,
    reviewRefs:resources.filter(x=>new URL(x).pathname.startsWith("/design-reference/")).length});
  }
  const values={
   routeCount:rows.length,overflowRoutes:rows.filter(x=>x.overflow).map(x=>x.route),
   designReferenceRequests:rows.reduce((n,x)=>n+x.reviewRefs,0),
   css_median_bytes:percentile(rows.map(x=>x.cssBytes),.5),css_max_bytes:Math.max(...rows.map(x=>x.cssBytes)),
   page_height_p90:percentile(rows.map(x=>x.height),.9),page_height_max:Math.max(...rows.map(x=>x.height)),
   image_bytes_p90:percentile(rows.map(x=>x.imageBytes),.9),image_bytes_max_route:Math.max(...rows.map(x=>x.imageBytes)),
   image_bytes_max_single:Math.max(...rows.map(x=>x.maxImage))
  };
  const {key,values:limits}=runtimeBudget(testInfo.project.name);
  const dir=path.join(evidenceRoot,captureOnly?"before":"after");fs.mkdirSync(dir,{recursive:true});
  fs.writeFileSync(path.join(dir,key+"-runtime-budget.json"),JSON.stringify({values,rows},null,2)+"\n");
  expect(values.overflowRoutes).toEqual([]);expect(values.designReferenceRequests).toBe(0);
  if(!captureOnly)for(const name of ["css_median_bytes","css_max_bytes","page_height_p90","page_height_max","image_bytes_p90","image_bytes_max_route","image_bytes_max_single"] as const)assertMetric(key+"."+name,values[name],limits[name]);
 });

 test("design-reference shipping stays zero",async({isMobile})=>{
  if(isMobile)return;
  if(!STATIC_BUILD)throw new Error("static build required");
  const root=path.join(STATIC_BUILD,"public"),files=walkFiles(root);
  const images=files.filter(f=>/\.(?:png|jpe?g|webp|gif|svg)$/i.test(f));
  const metrics={file_count:files.length,total_bytes:files.reduce((n,f)=>n+fs.statSync(f).size,0),
   image_bytes:images.reduce((n,f)=>n+fs.statSync(f).size,0),
   max_single_asset:Math.max(0,...files.map(f=>fs.statSync(f).size)),
   design_reference_files:files.filter(f=>f.includes(path.sep+"design-reference"+path.sep)).length};
  const dir=path.join(evidenceRoot,captureOnly?"before":"after");fs.mkdirSync(dir,{recursive:true});
  fs.writeFileSync(path.join(dir,"public-assets-budget.json"),JSON.stringify(metrics,null,2)+"\n");
  expect(metrics.design_reference_files).toBe(0);
  if(!captureOnly){
   const b=budget.public_assets;
   expect(metrics.file_count).toBeLessThanOrEqual(b.max_file_count);
   expect(metrics.total_bytes).toBeLessThanOrEqual(b.max_total_bytes);
   expect(metrics.image_bytes).toBeLessThanOrEqual(b.max_image_bytes);
   expect(metrics.max_single_asset).toBeLessThanOrEqual(b.max_single_asset);
  }
 });

 test("active-suite authority drift stays bounded",async({isMobile})=>{
  if(isMobile)return;
  const manifest=JSON.parse(fs.readFileSync(path.join(process.cwd(),"tools/web_active_suite_manifest_v1298.json"),"utf8"));
  const metrics={validators:manifest.active.validators.length,browser_specs:manifest.active.browser_specs.length};
  const dir=path.join(evidenceRoot,captureOnly?"before":"after");fs.mkdirSync(dir,{recursive:true});
  fs.writeFileSync(path.join(dir,"active-suite-budget.json"),JSON.stringify(metrics,null,2)+"\n");
  if(!captureOnly){
   expect(metrics.validators).toBeLessThanOrEqual(budget.active_suite.max_validators);
   expect(metrics.browser_specs).toBeLessThanOrEqual(budget.active_suite.max_browser_specs);
  }
 });
});
