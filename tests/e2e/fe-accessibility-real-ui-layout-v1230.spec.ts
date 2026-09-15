import {test,expect} from "@playwright/test";
const origin=process.env.LGO_WEB_URL ?? "http://127.0.0.1:3000";

test.describe('readability and real keyboard practice v1.230',()=>{
 test.beforeEach(async({page})=>{await page.goto(origin+'/accessibility');await expect(page.getByRole('heading',{level:1,name:'Dễ đọc và dễ thao tác',exact:true})).toBeVisible();});
 test('key guide and paper practice replace the embedded route-map',async({page,isMobile})=>{
  await expect(page.locator('.lgo-keyboard-guide kbd')).toHaveCount(3);
  await expect(page.locator('.lgo-keyboard-practice')).toBeVisible();
  await expect(page.locator('main img[src*=design-boards],main img[src*=design-reference]')).toHaveCount(0);
  const m=await page.evaluate(()=>{const c=document.querySelector('.lgo-accessibility-experience .lgo-release-hero-copy')!.getBoundingClientRect(),k=document.querySelector('.lgo-keyboard-guide')!.getBoundingClientRect();return {copy:c.toJSON(),keys:k.toJSON(),overflow:document.documentElement.scrollWidth-innerWidth};});
  expect(m.overflow).toBeLessThanOrEqual(0);if(isMobile)expect(m.keys.top).toBeGreaterThanOrEqual(m.copy.bottom);else expect(m.keys.left).toBeGreaterThanOrEqual(m.copy.right);
  await page.screenshot({path:test.info().outputPath('accessibility-layout.png'),fullPage:true});
 });
 test('native Tab Space Enter and Shift Tab work and focus can leave the example',async({page})=>{
  const practice=page.locator('.lgo-keyboard-practice');await expect(practice).toBeVisible();
  await practice.getByRole('button',{name:'Bắt đầu lượt thử',exact:true}).click();
  const checkbox=practice.getByRole('checkbox',{name:'Đánh dấu thử',exact:true});await expect(checkbox).toBeFocused();
  await page.keyboard.press('Space');await expect(checkbox).toBeChecked();
  expect(await practice.locator('.lgo-checkbox-field').evaluate(e=>getComputedStyle(e).outlineStyle)).not.toBe('none');
  await page.keyboard.press('Tab');const summary=practice.locator('summary');await expect(summary).toBeFocused();
  await page.keyboard.press('Enter');await expect(practice.locator('details')).toHaveAttribute('open','');
  await expect(practice.locator('.lgo-keyboard-practice-answer')).toBeVisible();
  await page.keyboard.press('Tab');const next=practice.getByRole('link',{name:'Đi tới các lối đọc',exact:true});await expect(next).toBeFocused();
  await page.keyboard.press('Shift+Tab');await expect(summary).toBeFocused();await page.keyboard.press('Tab');await page.keyboard.press('Tab');
  expect(await practice.evaluate(e=>e.contains(document.activeElement))).toBe(false);
 });
 test('start again and reload discard the local exercise without submitting data',async({page})=>{
  const practice=page.locator('.lgo-keyboard-practice');await expect(practice).toBeVisible();const outgoing:string[]=[];
  page.on('request',r=>{if(r.method()!=='GET'||['fetch','xhr'].includes(r.resourceType()))outgoing.push(r.url());});
  const checkbox=practice.getByRole('checkbox',{name:'Đánh dấu thử',exact:true});await checkbox.check();await practice.locator('summary').click();
  await expect(practice.getByRole('status')).toContainText('Đã đánh dấu');
  await practice.getByRole('button',{name:'Bắt đầu lượt thử',exact:true}).click();await expect(checkbox).not.toBeChecked();await expect(practice.locator('details')).not.toHaveAttribute('open','');await expect(checkbox).toBeFocused();
  expect(outgoing).toEqual([]);await checkbox.check();await page.reload();await expect(checkbox).not.toBeChecked();
 });
 test('shared skip link and five reading routes work without fake settings',async({page})=>{
  await expect(page.locator('.lgo-keyboard-practice')).toBeVisible();
  await page.locator('body').click({position:{x:1,y:1}});await page.keyboard.press('Control+Home');
  await page.evaluate(()=>{(document.activeElement as HTMLElement)?.blur();document.body.tabIndex=-1;document.body.focus();});
  await page.keyboard.press('Tab');const skip=page.getByRole('link',{name:'Bỏ qua menu tới nội dung chính',exact:true});await expect(skip).toBeFocused();
  await page.keyboard.press('Enter');await expect(page).toHaveURL(origin+'/accessibility#main-content');
  const routes=page.locator('#accessibility-routes nav');await expect(routes.getByRole('link')).toHaveCount(5);
  for(const href of ['/accessibility','/start','/download/trust','/support/safety','/game/loop'])expect((await page.request.get(origin+href)).status()).toBe(200);
  await routes.locator('a[href="/start"]').click();await expect(page).toHaveURL(origin+'/start');
 });
 test('scope stays explicit and expanded source principles stay readable',async({page})=>{
  await expect(page.locator('#accessibility-boundaries')).toContainText('Chưa có audit WCAG chính thức');
  await expect(page.locator('#accessibility-boundaries')).toContainText('Không lưu thiết lập cá nhân');
  await expect(page.locator('main')).toContainText('NO_ACCEPTED_BACKEND_CONTRACT');
  await expect(page.locator('main form,main textarea,main input:not([type=checkbox]),main iframe')).toHaveCount(0);
  const rules=page.locator('#accessibility-principles details');await expect(rules).toHaveCount(3);
  for(const rule of await rules.all()){await rule.locator('summary').click();await expect(rule.locator('.lgo-question-answer')).toBeVisible();expect(await rule.locator('.lgo-question-answer').evaluate(e=>getComputedStyle(e).webkitLineClamp)).toBe('none');}
 });
 test('focus is visible under forced colors and standard main-content axe is clean',async({page})=>{
  const practice=page.locator('.lgo-keyboard-practice');await expect(practice).toBeVisible();
  for(const control of await practice.locator('button,summary,a').all())expect((await control.boundingBox())!.height).toBeGreaterThanOrEqual(44);
  await page.addScriptTag({path:'node_modules/axe-core/axe.min.js'});
  const violations=await page.evaluate(async()=>{const axe=(window as unknown as {axe:{run:(n:Element|null,o:unknown)=>Promise<{violations:Array<{id:string}>}>}}).axe;return (await axe.run(document.querySelector('main'),{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}})).violations.map(v=>v.id);});expect(violations).toEqual([]);
  await page.emulateMedia({forcedColors:'active',reducedMotion:'reduce'});await practice.getByRole('button',{name:'Bắt đầu lượt thử',exact:true}).click();
  const ring=await practice.locator('.lgo-checkbox-field').evaluate(e=>({width:parseFloat(getComputedStyle(e).outlineWidth),style:getComputedStyle(e).outlineStyle}));expect(ring.width).toBeGreaterThanOrEqual(2);expect(ring.style).toBe('solid');
  await page.screenshot({path:test.info().outputPath('forced-colors-focus.png'),fullPage:true});
 });
});
