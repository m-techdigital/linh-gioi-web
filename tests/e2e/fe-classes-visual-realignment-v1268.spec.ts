import {test,expect} from '@playwright/test';
import {classPaths} from '../../packages/content/src/fixtures';
const origin=process.env.LGO_WEB_URL??'http://127.0.0.1:3236';
test.describe('classes visual realignment v1.268',()=>{
 test.beforeEach(async({page})=>{await page.goto(origin+'/classes',{waitUntil:'networkidle'});});
 test('replaces proof layout with immersive five-path target hierarchy',async({page})=>{
  await expect(page.locator('.lgo-public-shell-immersive')).toHaveCount(1);await expect(page.locator('.lgo-classes-landing-hero')).toBeVisible();
  await expect(page.locator('.lgo-classespage-expanded-evidence,.lgo-paths-hero')).toHaveCount(0);await expect(page.getByRole('heading',{level:1})).toHaveText('Chọn cách bạn bảo vệ Linh Giới');
 });
 test('renders five canonical illustrated path choices in source order',async({page,isMobile})=>{
  const cards=page.locator('.lgo-class-choice-card');await expect(cards).toHaveCount(5);
  for(const [i,path] of classPaths.entries()){const card=cards.nth(i);await expect(card.getByRole('heading',{level:3})).toHaveText(path.name);await expect(card).toContainText(path.role);const img=card.locator('img');await expect(img).toHaveCount(1);const d=await img.evaluate(i=>({nw:i.naturalWidth,nh:i.naturalHeight,src:i.currentSrc}));expect(d.nw).toBeGreaterThan(240);expect(d.nh).toBeGreaterThan(140);expect(d.src).not.toContain('design-reference');}
  const cols=await page.locator('.lgo-class-choice-grid').evaluate(e=>getComputedStyle(e).gridTemplateColumns.split(' ').length);expect(cols).toBe(isMobile?1:5);
 });
 test('five choices drive one local selected-path feature without fake gameplay',async({page})=>{
  const buttons=page.locator('.lgo-class-choice-card button');await expect(buttons).toHaveCount(5);await expect(buttons.first()).toHaveAttribute('aria-pressed','true');
  const feature=page.locator('.lgo-class-selected-feature');await expect(feature.getByRole('heading',{level:2})).toContainText('Võ');await buttons.nth(2).click();await expect(buttons.nth(2)).toHaveAttribute('aria-pressed','true');await expect(feature.getByRole('heading',{level:2})).toContainText('Pháp');await expect(feature).toContainText(classPaths[2]!.battleRhythm);
  await expect(page.locator('main form,main input,main a[download]')).toHaveCount(0);await expect(page.locator('main')).not.toContainText(/đăng ký ngay|chơi ngay|tạo nhân vật ngay/i);
 });
 test('desktop classes composition follows target wide five-card rhythm',async({page,isMobile})=>{if(isMobile)return;const grid=await page.locator('.lgo-class-choice-grid').boundingBox();const card=await page.locator('.lgo-class-choice-card').first().boundingBox();expect(grid!.width).toBeGreaterThan(1200);expect(card!.width).toBeGreaterThan(220);expect(await page.evaluate(()=>document.documentElement.scrollHeight)).toBeLessThan(1450);});
 test('mobile hero keeps the class choices near the first fold with a portrait-friendly scene crop',async({page,isMobile})=>{if(!isMobile)return;const hero=await page.locator('.lgo-classes-landing-hero').boundingBox();const choices=await page.locator('.lgo-class-choice-section').boundingBox();const art=await page.locator('.lgo-classes-hero-city').evaluate(i=>({nw:i.naturalWidth,nh:i.naturalHeight}));expect(hero!.height).toBeLessThan(590);expect(choices!.y).toBeLessThan(700);expect(art.nh).toBeGreaterThan(200);});
 test('uses separate source-derived art instead of the design board as UI',async({page})=>{await expect(page.locator('main img[src*=design-reference],main iframe,main canvas')).toHaveCount(0);const art=page.locator('.lgo-classes-landing img');expect(await art.count()).toBeGreaterThanOrEqual(7);for(const img of await art.all()){const d=await img.evaluate(i=>({ok:i.complete&&i.naturalWidth>0,src:i.currentSrc}));expect(d.ok).toBe(true);expect(d.src).not.toContain('design-reference');}});
 test('320px layout keeps readable copy controls and visible focus',async({page})=>{await page.setViewportSize({width:320,height:800});expect(await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth)).toBeLessThanOrEqual(0);for(const p of await page.locator('.lgo-classes-landing p').all()){if(await p.isVisible())expect(await p.evaluate(e=>parseFloat(getComputedStyle(e).fontSize))).toBeGreaterThanOrEqual(14);}for(const b of await page.locator('.lgo-classes-landing button').all()){if(await b.isVisible())expect((await b.boundingBox())!.height).toBeGreaterThanOrEqual(44);}const b=page.locator('.lgo-class-choice-card button').first();await b.focus();expect(await b.evaluate(e=>getComputedStyle(e).outlineStyle)).not.toBe('none');});
});
