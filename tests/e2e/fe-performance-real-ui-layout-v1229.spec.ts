import {test, expect} from "@playwright/test";
const origin=process.env.LGO_WEB_URL ?? "http://127.0.0.1:3000";

test.describe("performance reading workshop, not fabricated measurement v1.229",()=>{
 test.beforeEach(async({page})=>{
  await page.goto(`${origin}/performance`);
  await expect(page.getByRole("heading",{level:1,name:"Hiệu năng và ngân sách nội dung",exact:true})).toBeVisible();
 });
 test("real workshop composition replaces embedded mockup and unmeasured scores",async({page,isMobile})=>{
  await expect(page.locator('.lgo-performance-priority-console')).toBeVisible();
  await expect(page.locator('.lgo-measurement-boundary > div')).toHaveCount(3);
  await expect(page.locator('main img[src*=design-boards], main img[src*=design-reference]')).toHaveCount(0);
  const m=await page.evaluate(()=>{
   const copy=document.querySelector('.lgo-performance-experience .lgo-release-hero-copy')!.getBoundingClientRect();
   const console=document.querySelector('.lgo-performance-priority-console')!.getBoundingClientRect();
   const controls=document.querySelector('.lgo-reading-preview-controls')!.getBoundingClientRect();
   const sample=document.querySelector('.lgo-reading-preview-sample')!.getBoundingClientRect();
   return {copy:copy.toJSON(),console:console.toJSON(),controls:controls.toJSON(),sample:sample.toJSON(),overflow:document.documentElement.scrollWidth-innerWidth};
  });
  expect(m.overflow).toBeLessThanOrEqual(0);
  if(isMobile){expect(m.console.top).toBeGreaterThanOrEqual(m.copy.bottom);expect(m.sample.top).toBeGreaterThanOrEqual(m.controls.bottom);}
  else{expect(m.console.left).toBeGreaterThanOrEqual(m.copy.right);expect(m.sample.left).toBeGreaterThanOrEqual(m.controls.right);}
  await expect(page.locator('#performance-measurement')).toContainText('Chưa có số đo production');
  await expect(page.locator('#performance-measurement')).toContainText('Không phải kết quả benchmark');
  await page.screenshot({path:test.info().outputPath('performance-layout.png'),fullPage:true});
 });
 test("spacing choice changes only the sample and never clamps its text",async({page})=>{
  const preview=page.locator('.lgo-reading-preview');await expect(preview).toBeVisible();
  const h1Before=await page.locator('h1').evaluate(e=>getComputedStyle(e).fontSize);
  const sample=preview.locator('.lgo-reading-preview-sample');const textBefore=await sample.innerText();
  const before=await sample.evaluate(e=>getComputedStyle(e).paddingTop);
  const roomy=preview.getByRole('button',{name:'Thoáng hơn',exact:true});await roomy.focus();await page.keyboard.press('Enter');
  await expect(roomy).toHaveAttribute('aria-pressed','true');await expect(sample).toHaveAttribute('data-density','comfortable');
  expect(parseFloat(await sample.evaluate(e=>getComputedStyle(e).paddingTop))).toBeGreaterThan(parseFloat(before));
  expect(await sample.innerText()).toBe(textBefore);expect(await page.locator('h1').evaluate(e=>getComputedStyle(e).fontSize)).toBe(h1Before);
  expect(await sample.locator('p').first().evaluate(e=>getComputedStyle(e).webkitLineClamp)).toBe('none');
  await preview.getByRole('button',{name:'Đặt lại khung thử',exact:true}).click();await expect(sample).toHaveAttribute('data-density','compact');
 });
 test("optional illustration is not fetched until selected, and choice resets on reload",async({page})=>{
  const requests:string[]=[];await page.route('**/game-art/world/dong-mon-skyline.webp',async route=>{requests.push(route.request().url());await route.continue();});
  await page.reload();const preview=page.locator('.lgo-reading-preview');await expect(preview).toBeVisible();
  const toggle=preview.getByRole('checkbox',{name:'Hiện minh họa trong khung thử',exact:true});await expect(toggle).not.toBeChecked();
  await expect(preview.locator('img')).toHaveCount(0);expect(requests).toEqual([]);
  await toggle.focus();await page.keyboard.press('Space');await expect(toggle).toBeChecked();
  await expect(preview.locator('img')).toBeVisible();
  await expect.poll(()=>preview.locator('img').evaluate(e=>(e as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  expect(requests.length).toBeGreaterThan(0);await expect(preview.getByRole('status')).toContainText('Đã tải minh họa');
  await toggle.uncheck();await expect(preview.locator('img')).toHaveCount(0);
  await expect(preview).toContainText('Ẩn ảnh không hoàn lại dữ liệu đã tải');
  await preview.getByRole('button',{name:'Thoáng hơn',exact:true}).click();await page.reload();
  await expect(toggle).not.toBeChecked();await expect(preview.locator('.lgo-reading-preview-sample')).toHaveAttribute('data-density','compact');
 });
 test("failed illustration preserves reading and can be retried through the same control",async({page})=>{
  await page.route('**/game-art/world/dong-mon-skyline.webp',route=>route.abort());
  const preview=page.locator('.lgo-reading-preview');await expect(preview).toBeVisible();
  const toggle=preview.getByRole('checkbox',{name:'Hiện minh họa trong khung thử',exact:true});await toggle.check();
  await expect(preview.getByRole('status')).toContainText('Không tải được minh họa');
  await expect(preview.getByRole('heading',{level:3,name:'Đọc trước khi vào Linh Giới'})).toBeVisible();
  await expect(preview.locator('.lgo-reading-preview-sample')).toContainText('chưa có bản tải công khai');
  await toggle.uncheck();await page.unroute('**/game-art/world/dong-mon-skyline.webp');await toggle.check();
  await expect(preview.getByRole('status')).toContainText('Đã tải minh họa');
 });
 test("source-backed routes and disclosures remain useful without fake telemetry",async({page})=>{
  const routes=page.locator('#performance-routes');await expect(routes.locator('article')).toHaveCount(4);
  for(const href of ['/performance','/download/trust','/game/loop','/support/safety']){
   const link=routes.locator(`a[href="${href}"]`);await expect(link).toBeVisible();expect((await page.request.get(origin+href)).status()).toBe(200);
  }
  const principles=page.locator('#performance-principles details');await expect(principles).toHaveCount(4);
  const first=principles.first();await first.locator('summary').focus();await page.keyboard.press('Enter');await expect(first).toHaveAttribute('open','');
  await expect(first.locator('.lgo-question-answer')).toBeVisible();
  await expect(page.locator('main form, main textarea, main input:not([type=checkbox]), main iframe')).toHaveCount(0);
  await expect(page.locator('main')).toContainText('NO_ACCEPTED_BACKEND_CONTRACT');
 });
 test("local controls and expanded evidence meet main-content accessibility checks",async({page})=>{
  const preview=page.locator('.lgo-reading-preview');await expect(preview).toBeVisible();
  const outgoing:string[]=[];page.on('request',r=>{if(r.method()!=='GET'||['fetch','xhr'].includes(r.resourceType()))outgoing.push(r.url());});
  await preview.getByRole('button',{name:'Thoáng hơn',exact:true}).click();
  for(const button of await preview.getByRole('button').all())expect((await button.boundingBox())!.height).toBeGreaterThanOrEqual(44);
  await page.locator('#performance-principles summary').first().click();
  await page.addScriptTag({path:'node_modules/axe-core/axe.min.js'});
  const violations=await page.evaluate(async()=>{const axe=(window as unknown as {axe:{run:(n:Element|null,o:unknown)=>Promise<{violations:Array<{id:string}>}>}}).axe;return (await axe.run(document.querySelector('main'),{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}})).violations.map(v=>v.id);});
  expect(violations).toEqual([]);expect(outgoing).toEqual([]);
 });
});
