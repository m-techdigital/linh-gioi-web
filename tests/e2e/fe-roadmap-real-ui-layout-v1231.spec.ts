import { test, expect } from '@playwright/test';
const origin=process.env.LGO_WEB_URL ?? 'http://127.0.0.1:3000';

test.describe('roadmap conditions and historical source labels v1.231',()=>{
 test.beforeEach(async({page})=>{await page.goto(origin+'/roadmap');await expect(page.getByRole('heading',{level:1,name:'Roadmap phát triển web',exact:true})).toBeVisible();});
 test('real gate map and readable hero replace a diagram embedded in the page',async({page,isMobile})=>{
  const map=page.locator('.lgo-planning-map');await expect(map).toBeVisible();await expect(map.getByRole('link')).toHaveCount(4);
  await expect(page.locator('main img[src*=design-boards],main img[src*=design-reference]')).toHaveCount(0);
  const m=await page.evaluate(()=>{const a=document.querySelector('.lgo-roadmap-experience .lgo-release-hero-copy')!.getBoundingClientRect();const b=document.querySelector('.lgo-planning-map')!.getBoundingClientRect();return{a:a.toJSON(),b:b.toJSON(),overflow:document.documentElement.scrollWidth-innerWidth};});
  expect(m.overflow).toBeLessThanOrEqual(0);if(isMobile)expect(m.b.top).toBeGreaterThanOrEqual(m.a.bottom);else expect(m.b.left).toBeGreaterThanOrEqual(m.a.right);
  await page.screenshot({path:test.info().outputPath('roadmap-layout.png'),fullPage:true});
 });
 test('each gate map destination exposes the corresponding real condition',async({page})=>{
  const links=page.locator('.lgo-planning-map a');await expect(links).toHaveCount(4);
  const ids=['roadmap-gate-content','roadmap-gate-download','roadmap-gate-community','roadmap-gate-backend'];
  for(let i=0;i<ids.length;i++){
   await expect(links.nth(i)).toHaveAttribute('href','#'+ids[i]);await links.nth(i).click();await expect(page).toHaveURL(origin+'/roadmap#'+ids[i]);
   const gate=page.locator('#'+ids[i]);await expect(gate).toBeVisible();const summary=gate.locator('summary');await summary.focus();await page.keyboard.press('Enter');
   await expect(gate.locator('details')).toHaveAttribute('open','');await expect(gate.locator('.lgo-planning-gate-proof')).toBeVisible();
   expect((await summary.boundingBox())!.height).toBeGreaterThanOrEqual(44);
  }
  await expect(page.locator('#roadmap-gate-backend')).toContainText('Auth/API/DB/RBAC/audit');
  await expect(page.locator('#roadmap-gate-download')).toContainText('SHA256');
 });
 test('source archive retains all 15 records and distinguishes old labels from current work',async({page})=>{
  const archive=page.locator('#roadmap-source-archive');await archive.locator(':scope > summary').click();
  await expect(archive).toContainText('không phải tiến độ hiện tại');
  await expect(archive.locator('.lgo-milestone-entry')).toHaveCount(15);
  await expect(archive.getByRole('status')).toContainText('15/15');
  await expect(archive.locator('[data-version="v1.6"]')).toContainText('Public UX / content polish');
  await expect(archive.locator('[data-version="WEB-08"]')).toContainText('Game backend contract sync');
  await expect(archive.locator('[data-version="WEB-08"]')).toHaveAttribute('data-source-state','blocked');
 });
 test('filter counts empty state reset and reload reflect only source records',async({page})=>{
  const archive=page.locator('#roadmap-source-archive');await archive.locator(':scope > summary').click();
  const filters=archive.getByRole('group',{name:'Lọc nhãn trong dữ liệu roadmap'});await expect(filters).toBeVisible();
  const requests:string[]=[];page.on('request',r=>{if(['xhr','fetch'].includes(r.resourceType())||r.method()!=='GET')requests.push(r.url());});
  for(const [name,count] of [['Trong nguồn: current',11],['Trong nguồn: planned',3],['Trong nguồn: blocked',1],['Trong nguồn: next',0]] as const){
   const button=filters.getByRole('button',{name,exact:true});await button.focus();await page.keyboard.press('Space');await expect(button).toHaveAttribute('aria-pressed','true');
   await expect(archive.locator('.lgo-milestone-entry')).toHaveCount(count);await expect(archive.getByRole('status')).toContainText(`${count}/15`);
  }
  await expect(archive.locator('.lgo-milestone-empty')).toContainText('Không có mốc');
  await archive.getByRole('button',{name:'Xem lại tất cả',exact:true}).click();await expect(archive.locator('.lgo-milestone-entry')).toHaveCount(15);expect(requests).toEqual([]);
  await expect(filters.getByRole('button',{name:'Tất cả',exact:true})).toBeFocused();
  await filters.getByRole('button',{name:'Trong nguồn: blocked',exact:true}).click();await page.reload();await archive.locator(':scope > summary').click();await expect(archive.locator('.lgo-milestone-entry')).toHaveCount(15);
 });
 test('release stages stay source-backed without countdown registration or progress claims',async({page})=>{
  const main=page.locator('main');await expect(page.locator('#roadmap-release-stages .lgo-planning-stage')).toHaveCount(4);
  await expect(main).toContainText('Không phải lịch phát hành');await expect(main).toContainText('NO_ACCEPTED_BACKEND_CONTRACT');
  await expect(main.locator('form,input,textarea,[role=progressbar],time')).toHaveCount(0);
  await expect(page.getByRole('button',{name:/Đăng ký|Tải game|Tham gia thử nghiệm/i})).toHaveCount(0);
  for(const path of ['/release/readiness','/download/trust','/community/onboarding'])expect((await page.request.get(origin+path)).status()).toBe(200);
 });
 test('expanded gates and source archive have usable headings focus and main accessibility',async({page})=>{
  const hub=page.locator('.lgo-roadmap-experience');await expect(hub).toBeVisible();
  await expect(page.locator('main h1')).toHaveCount(1);
  for(const summary of await hub.locator('.lgo-planning-gate summary').all())await summary.click();
  await page.locator('#roadmap-source-archive > summary').click();
  const bad=await hub.locator('[aria-labelledby]').evaluateAll(nodes=>nodes.filter(n=>(n.getAttribute('aria-labelledby')??'').split(/\s+/).some(id=>!document.getElementById(id))).map(n=>n.getAttribute('aria-labelledby')));expect(bad).toEqual([]);
  await page.addScriptTag({path:'node_modules/axe-core/axe.min.js'});
  const violations=await page.evaluate(async()=>{const axe=(window as unknown as {axe:{run:(n:Element|null,o:unknown)=>Promise<{violations:Array<{id:string}>}>}}).axe;return (await axe.run(document.querySelector('main'),{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}})).violations.map(v=>v.id);});expect(violations).toEqual([]);
 });
});
