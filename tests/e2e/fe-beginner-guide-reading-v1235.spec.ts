import {test,expect} from '@playwright/test';
import {beginnerGuideSections} from '../../packages/content/src/fixtures';
const origin=process.env.LGO_WEB_URL??'http://127.0.0.1:3000',route='/guides/beginner';

test.describe('source-backed beginner reading v1.235',()=>{
 test.beforeEach(async({page})=>{await page.goto(origin+route);await expect(page.getByRole('heading',{level:1,name:'Hướng dẫn người chơi mới',exact:true})).toBeVisible();});
 test('beginner guide has an illustrated header and four readable sections, not a stack of unrelated boards',async({page,isMobile})=>{
  const root=page.locator('.lgo-beginner-guide');await expect(root).toBeVisible();await expect(root.locator('.lgo-guide-article-section')).toHaveCount(4);await expect(root.locator('img[src*=design-reference],img[src*=design-boards]')).toHaveCount(0);
  const m=await root.evaluate(e=>{const contents=e.querySelector('.lgo-article-contents')!.getBoundingClientRect(),body=e.querySelector('.lgo-guide-article-body')!.getBoundingClientRect();const img=e.querySelector('.lgo-article-cover img') as HTMLImageElement;return {contents:contents.toJSON(),body:body.toJSON(),loaded:img.complete&&img.naturalWidth>0,overflow:document.documentElement.scrollWidth-innerWidth};});
  expect(m.loaded).toBe(true);expect(m.overflow).toBeLessThanOrEqual(0);if(isMobile)expect(m.body.top).toBeGreaterThanOrEqual(m.contents.bottom);else expect(m.body.left).toBeGreaterThan(m.contents.right);
  await page.screenshot({path:test.info().outputPath('beginner-reading.png'),fullPage:true});
 });
 test('all authored titles actions tips and boundaries remain in source order',async({page})=>{
  const sections=page.locator('.lgo-beginner-guide .lgo-guide-article-section');await expect(sections).toHaveCount(beginnerGuideSections.length);
  for(const [i,step] of beginnerGuideSections.entries()){
   const section=sections.nth(i);await expect(section.getByRole('heading',{level:2})).toHaveText(step.title);await expect(section.locator('.lgo-article-instruction')).toHaveText(step.action);await expect(section.locator('.lgo-article-outcome p')).toHaveText(step.playerTip);await expect(section.locator('.lgo-article-boundary p')).toHaveText(step.blockedScope);
   expect(await section.locator('.lgo-article-instruction').evaluate(e=>getComputedStyle(e).webkitLineClamp)).toBe('none');
  }
 });
 test('keyboard contents and next links move to the requested section and can return normally',async({page})=>{
  const contents=page.getByRole('navigation',{name:'Mục lục nhập môn'}),third=contents.locator('a').nth(2);await third.focus();await page.keyboard.press('Enter');
  await expect(page.locator('#beginner-step-03')).toBeFocused();await expect(page).toHaveURL(origin+route+'#beginner-step-03');
  await page.locator('#beginner-step-03').getByRole('link',{name:/Phần tiếp/}).click();await expect(page.locator('#beginner-step-04')).toBeFocused();
  await page.locator('#beginner-step-04').getByRole('link',{name:'Về mục lục',exact:true}).click();await expect(page.locator('#beginner-contents')).toBeFocused();
  const summary=page.locator('#beginner-contents summary');await summary.focus();await page.keyboard.press('Space');await expect(contents).not.toBeVisible();await page.keyboard.press('Enter');await expect(contents).toBeVisible();
 });
 test('cold fragment loads and browser history restore the right chapter without stored progress',async({page})=>{
  await page.goto('about:blank');await page.goto(origin+route+'#beginner-step-02');const chapter=page.locator('#beginner-step-02');await expect(chapter).toBeFocused();
  await expect.poll(()=>chapter.evaluate(e=>e.getBoundingClientRect().top)).toBeLessThanOrEqual(600);expect((await chapter.boundingBox())!.y).toBeGreaterThanOrEqual(70);
  await chapter.getByRole('link',{name:/Phần tiếp/}).click();await expect(page).toHaveURL(origin+route+'#beginner-step-03');await page.goBack();await expect(page).toHaveURL(origin+route+'#beginner-step-02');
  await page.goto(origin+route+'#not-a-chapter');await expect(page.locator('.lgo-guide-article-section')).toHaveCount(4);
 });
 test('each source action opens a real reading destination rather than a gameplay control',async({page})=>{
  const paths=['/download','/game','/roadmap','/support'];
  for(let i=0;i<4;i++){const action=page.locator('.lgo-guide-article-section').nth(i).locator('.lgo-beginner-reading-action');await expect(action).toHaveAttribute('href',paths[i]!);expect((await page.request.get(origin+paths[i])).status()).toBe(200);}
  await page.locator('#beginner-step-03 .lgo-beginner-reading-action').click();await expect(page).toHaveURL(origin+'/roadmap');
 });
 test('narrow layout and native section navigation keep visible focus, full text and access boundaries',async({page})=>{
  await page.setViewportSize({width:320,height:800});const root=page.locator('.lgo-beginner-guide');await expect(root).toContainText('Không phải nhiệm vụ trong game');await expect(root).toContainText('NO_ACCEPTED_BACKEND_CONTRACT');await expect(root.locator('canvas,form,input,textarea,[role=progressbar]')).toHaveCount(0);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth)).toBeLessThanOrEqual(0);
  for(const a of await root.locator('.lgo-article-section-navigation a,.lgo-beginner-reading-action').all())expect((await a.boundingBox())!.height).toBeGreaterThanOrEqual(44);
  await root.locator('.lgo-beginner-reading-action').first().focus();expect(await root.locator('.lgo-beginner-reading-action').first().evaluate(e=>getComputedStyle(e).outlineStyle)).not.toBe('none');
  await page.addScriptTag({path:'node_modules/axe-core/axe.min.js'});const violations=await page.evaluate(async()=>{const axe=(window as unknown as {axe:{run:(e:Element|null,o:unknown)=>Promise<{violations:{id:string}[]}>}}).axe;return(await axe.run(document.querySelector('main'),{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}})).violations.map(v=>v.id);});expect(violations).toEqual([]);
 });
 test('chapter actions use the solid ink treatment and a distinct hover state on parchment',async({page})=>{
  const action=page.locator('.lgo-beginner-reading-action').first();await action.scrollIntoViewIfNeeded();
  await page.mouse.move(0,0);
  const style=await action.evaluate(e=>{const s=getComputedStyle(e),probe=document.createElement('span');probe.style.backgroundColor='var(--lgo-color-art-ink)';document.body.appendChild(probe);const ink=getComputedStyle(probe).backgroundColor;probe.remove();return {background:s.backgroundColor,ink};});
  expect(style.background,'reading destinations should not inherit a washed-out translucent disabled-looking surface').toBe(style.ink);
  await action.hover();await expect.poll(()=>action.evaluate(e=>getComputedStyle(e).backgroundColor)).not.toBe(style.background);
  await action.focus();await expect(action).toBeFocused();
  await page.screenshot({path:test.info().outputPath('beginner-active-action.png'),fullPage:true});
 });

 test('fragment reading never submits data and malformed fragment addresses remain safe',async({page})=>{
  const root=page.locator('.lgo-beginner-guide');await expect(root).toBeVisible();
  const requests:string[]=[];page.on('request',r=>{if(r.method()!=='GET'||['xhr','fetch'].includes(r.resourceType()))requests.push(r.url());});
  await page.getByRole('navigation',{name:'Mục lục nhập môn'}).locator('a').first().click();await expect(page.locator('#beginner-step-01')).toBeFocused();
  await page.locator('#beginner-step-01').getByRole('link',{name:/Phần tiếp/}).click();await expect(page.locator('#beginner-step-02')).toBeFocused();
  expect(requests).toEqual([]);
  const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('about:blank');await page.goto(origin+route+'#%E0%A4%A',{waitUntil:'networkidle'});
  await expect(page.locator('.lgo-guide-article-section')).toHaveCount(4);expect(errors).toEqual([]);
  expect(await page.evaluate(()=>document.activeElement?.id)).not.toMatch(/^beginner-step-/);
 });

});
