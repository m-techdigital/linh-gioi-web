import { test, expect } from '@playwright/test';
import { worldRouteStops } from '../../packages/content/src/fixtures';
const origin=process.env.LGO_WEB_URL??'http://127.0.0.1:3236';

test.describe('game world landing realignment v1.266',()=>{
 test.beforeEach(async({page})=>{await page.goto(origin+'/game',{waitUntil:'networkidle'});});
 test('uses immersive target hierarchy instead of proof-board engineering layout',async({page,isMobile})=>{
  const main=page.locator('main');await expect(page.locator('.lgo-public-shell-immersive')).toHaveCount(1);
  const hero=main.locator('.lgo-world-landing-hero');await expect(hero).toBeVisible();await expect(hero.getByRole('heading',{level:1})).toHaveText('Một thế giới có nơi để trở về');
  await expect(main.locator('.lgo-game-world-design-board,.lgo-gamepage-expanded-evidence')).toHaveCount(0);
  await expect(main).not.toContainText('Board tham chiếu');await expect(main).not.toContainText('Bằng chứng phụ và tuyến liên quan');
  const rect=await hero.boundingBox();expect(rect!.height).toBeGreaterThan(isMobile?520:360);expect(rect!.height).toBeLessThan(isMobile?850:620);
 });
 test('renders source-derived world artwork without embedding the design board as UI',async({page,isMobile})=>{
  const heroImages=page.locator('.lgo-world-landing-art img');await expect(heroImages).toHaveCount(2);if(isMobile)await expect(page.locator('.lgo-world-hero-character')).toBeHidden();else await expect(page.locator('.lgo-world-hero-character')).toBeVisible();
  for(const image of await heroImages.all()){const d=await image.evaluate(i=>({complete:i.complete,nw:i.naturalWidth,nh:i.naturalHeight,src:i.currentSrc}));expect(d.complete).toBe(true);expect(d.nw).toBeGreaterThan(300);expect(d.nh).toBeGreaterThan(250);expect(d.src).not.toContain('design-reference');}
  await expect(page.locator('main img[src*=design-reference],main iframe,main video,main canvas,main a[download]')).toHaveCount(0);
 });
 test('keeps exactly five source world stops in journey order',async({page})=>{
  const rail=page.getByRole('region',{name:'Hành trình khám phá'}),items=rail.locator('.lgo-world-journey-stop');await expect(items).toHaveCount(worldRouteStops.length);expect(worldRouteStops.length).toBe(5);
  for(const [i,stop]of worldRouteStops.entries()){await expect(items.nth(i)).toContainText(stop.name);await expect(items.nth(i)).toHaveAttribute('aria-label',new RegExp(stop.summary.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')));}
 });
 test('world atlas uses five visual cards with real source copy and distinct artwork',async({page})=>{
  const grid=page.locator('.lgo-world-region-grid'),cards=grid.locator('.lgo-world-region-card');await expect(cards).toHaveCount(worldRouteStops.length);
  const sources=[];
  for(const [i,stop]of worldRouteStops.entries()){const card=cards.nth(i);await expect(card.getByRole('heading',{level:3})).toHaveText(stop.name);await expect(card).toHaveAttribute('aria-label',new RegExp(stop.mood.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')));const img=card.locator('img');await expect(img).toBeVisible();sources.push(await img.getAttribute('src'));}
  expect(new Set(sources).size).toBe(5);
 });
 test('primary actions remain truthful reading routes, never a fake trailer or game launch',async({page})=>{
  const actions=page.locator('.lgo-world-landing-actions a');await expect(actions).toHaveCount(2);await expect(actions.nth(0)).toHaveAttribute('href','/game/loop');await expect(actions.nth(1)).toHaveAttribute('href','/journey');
  await expect(page.locator('main')).not.toContainText(/trailer|đăng nhập|máy chủ đang hoạt động|500\.000/i);
  await actions.nth(0).focus();await page.keyboard.press('Enter');await expect(page).toHaveURL(origin+'/game/loop');await page.goBack();await actions.nth(1).click();await expect(page).toHaveURL(origin+'/journey');
 });
 test('desktop journey and atlas follow the target horizontal rhythm',async({page,isMobile})=>{
  const rail=page.locator('.lgo-world-journey'),grid=page.locator('.lgo-world-region-grid');const railStyle=await rail.evaluate(e=>getComputedStyle(e).gridTemplateColumns.split(' ').length),gridStyle=await grid.evaluate(e=>getComputedStyle(e).gridTemplateColumns.split(' ').length);
  if(isMobile){expect(railStyle).toBe(1);expect(gridStyle).toBe(1);}else{expect(railStyle).toBe(5);expect(gridStyle).toBe(5);}
 });
 test('320px stays readable and keyboard focus remains visible',async({page})=>{
  await page.setViewportSize({width:320,height:800});expect(await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth)).toBeLessThanOrEqual(0);
  for(const p of await page.locator('.lgo-world-landing p').all()){if(await p.isVisible())expect(await p.evaluate(e=>parseFloat(getComputedStyle(e).fontSize))).toBeGreaterThanOrEqual(14);}
  for(const a of await page.locator('.lgo-world-landing a').all()){if(await a.isVisible())expect((await a.boundingBox())!.height).toBeGreaterThanOrEqual(44);}
  const link=page.locator('.lgo-world-landing-actions a').first();await link.focus();expect(await link.evaluate(e=>getComputedStyle(e).outlineStyle)).not.toBe('none');
 });
 test('reduced motion and forced colors keep the world page usable',async({page})=>{
  await page.emulateMedia({reducedMotion:'reduce'});expect(await page.evaluate(()=>getComputedStyle(document.documentElement).scrollBehavior)).toBe('auto');
  await page.emulateMedia({forcedColors:'active'});const link=page.locator('.lgo-world-landing-actions a').first();await link.focus();expect(await link.evaluate(e=>getComputedStyle(e).outlineStyle)).not.toBe('none');await expect(page.locator('.lgo-world-region-card').first()).toBeVisible();
 });
 test('desktop target density keeps the world landing concise instead of proof-board long-form',async({page,isMobile})=>{
  if(isMobile)return;
  const height=await page.evaluate(()=>document.documentElement.scrollHeight);expect(height).toBeLessThan(1300);
  const rail=page.locator('.lgo-world-journey-section');expect((await rail.boundingBox())!.height).toBeLessThan(190);
  for(const p of await rail.locator('.lgo-world-journey-stop p').all())expect((await p.boundingBox())!.height).toBeLessThan(48);
 });

});
