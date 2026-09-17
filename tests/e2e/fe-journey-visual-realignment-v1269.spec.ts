import {test,expect} from '@playwright/test';
import {sampleSessionBeats,worldRouteStops} from '../../packages/content/src/fixtures';
const origin=process.env.LGO_WEB_URL??'http://127.0.0.1:3236';
test.describe('journey visual realignment v1.269',()=>{
 test.beforeEach(async({page})=>{await page.goto(origin+'/journey',{waitUntil:'networkidle'});});
 test('replaces generic proof flow with immersive journey target hierarchy',async({page})=>{
  await expect(page.locator('.lgo-public-shell-immersive')).toHaveCount(1);await expect(page.locator('.lgo-journey-landing-hero')).toBeVisible();
  await expect(page.locator('.lgo-journeypage-stack,.lgo-journey-design-board,.lgo-journey-hero')).toHaveCount(0);await expect(page.getByRole('heading',{level:1})).toHaveText('20 phút không chỉ để đánh quái');
 });
 test('renders four live journey phases without pretending they are backend state',async({page})=>{
  const phases=page.locator('.lgo-journey-live-cycle-phase');await expect(phases).toHaveCount(4);for(const label of ['Hội ngộ','Phiêu lưu','Chiến lợi','Mạnh hơn'])await expect(page.locator('.lgo-journey-live-cycle')).toContainText(label);
  await expect(page.locator('main form,main input,main a[download]')).toHaveCount(0);await expect(page.locator('main')).not.toContainText(/chơi ngay|tạo nhân vật|đăng ký ngay/i);
 });
 test('keeps every canonical session beat in source order with illustrated live HTML',async({page,isMobile})=>{
  const cards=page.locator('.lgo-journey-beat-card');await expect(cards).toHaveCount(sampleSessionBeats.length);
  for(const [i,beat] of sampleSessionBeats.entries()){const card=cards.nth(i);await expect(card).toContainText(beat.time);await expect(card.getByRole('heading',{level:3})).toHaveText(beat.title);await expect(card).toContainText(beat.summary);await expect(card.locator('img')).toHaveCount(1);}
  const cols=await page.locator('.lgo-journey-beat-grid').evaluate(e=>getComputedStyle(e).gridTemplateColumns.split(' ').length);expect(cols).toBe(isMobile?1:6);
 }); test('renders five canonical world-route stops as the visual journey rail',async({page,isMobile})=>{
  const stops=page.locator('.lgo-journey-route-stop');await expect(stops).toHaveCount(worldRouteStops.length);
  for(const [i,stop] of worldRouteStops.entries()){const card=stops.nth(i);await expect(card).toContainText(stop.order);await expect(card.getByRole('heading',{level:3})).toHaveText(stop.name);await expect(card.locator('img')).toHaveCount(1);}
  const cols=await page.locator('.lgo-journey-route-grid').evaluate(e=>getComputedStyle(e).gridTemplateColumns.split(' ').length);expect(cols).toBe(isMobile?1:5);
 });
 test('uses separate decorative art and never embeds the design board as runtime UI',async({page})=>{
  await expect(page.locator('main img[src*=design-reference],main img[src*=journey-session-route-flow],main iframe,main canvas')).toHaveCount(0);
  const art=page.locator('.lgo-journey-landing img');expect(await art.count()).toBeGreaterThanOrEqual(10);for(const img of await art.all()){const d=await img.evaluate(i=>({ok:i.complete&&i.naturalWidth>0,src:i.currentSrc}));expect(d.ok).toBe(true);expect(d.src).not.toContain('design-reference');}
 });
 test('desktop density and 320px accessibility remain usable',async({page,isMobile})=>{
  if(!isMobile){expect(await page.evaluate(()=>document.documentElement.scrollHeight)).toBeLessThan(1500);expect((await page.locator('.lgo-journey-beat-grid').boundingBox())!.width).toBeGreaterThan(1200);}
  await page.setViewportSize({width:320,height:800});expect(await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth)).toBeLessThanOrEqual(0);for(const p of await page.locator('.lgo-journey-landing p').all()){if(await p.isVisible())expect(await p.evaluate(e=>parseFloat(getComputedStyle(e).fontSize))).toBeGreaterThanOrEqual(14);}for(const a of await page.locator('.lgo-journey-landing a').all()){if(await a.isVisible())expect((await a.boundingBox())!.height).toBeGreaterThanOrEqual(44);}const a=page.locator('.lgo-journey-actions a').first();await a.focus();expect(await a.evaluate(e=>getComputedStyle(e).outlineStyle)).not.toBe('none');
 });
});