import {test,expect} from '@playwright/test';
const origin=process.env.LGO_WEB_URL??'http://127.0.0.1:3236';
test.describe('homepage native-scale original artwork v1.265 revision2',()=>{
 test.beforeEach(async({page})=>{await page.goto(origin+'/');});
 test('uses the original brush wordmark as a separate image with one real accessible title',async({page})=>{
  const h1=page.locator('main h1'),brand=h1.locator('.lgo-art-wordmark');await expect(brand).toBeVisible();await expect(h1).toHaveAccessibleName('Linh Giới Online');
  const image=brand.locator('img');await expect(image).toHaveAttribute('src','/game-art/marketing/wordmark-brush.png');
  const info=await image.evaluate(i=>{const r=i.getBoundingClientRect();return{complete:i.complete,width:i.naturalWidth,height:i.naturalHeight,ratio:r.width/i.naturalWidth,center:Math.abs(r.x+r.width/2-innerWidth/2)};});
  expect(info.complete).toBe(true);expect(info.width).toBeGreaterThan(400);expect(info.height).toBeGreaterThan(140);expect(info.ratio).toBeLessThanOrEqual(1.06);expect(info.center).toBeLessThan(3);await expect(page.locator('main h1')).toHaveCount(1);
 });
 test('the scene is no longer a tiny zoomed city crop, preserving actual source-pixel scale',async({page,isMobile})=>{
  await page.waitForLoadState('networkidle');const images=await page.locator('.lgo-immersive-art img').evaluateAll(nodes=>nodes.map(i=>{const r=i.getBoundingClientRect();return{src:i.currentSrc,w:i.naturalWidth,h:i.naturalHeight,ratio:Math.max(r.width/i.naturalWidth,r.height/i.naturalHeight)};}));
  expect(images.length).toBeGreaterThan(0);if(isMobile)expect(images[0]!.src).toContain('/hero-mobile.png');for(const i of images){expect(i.w).toBeGreaterThanOrEqual(isMobile?565:1600);expect(i.ratio).toBeLessThanOrEqual(1.02);expect(i.src).not.toContain('hero-moon-city.png');}
  await expect(page.locator('main img[src*=design-reference],main iframe,main canvas')).toHaveCount(0);
 });
 test('brand load failure uses readable live fallback, without duplicating the accessible name',async({page})=>{
  await page.route('**/wordmark-brush.png',r=>r.abort());await page.reload();const brand=page.locator('.lgo-art-wordmark');await expect(brand).toHaveAttribute('data-fallback','true');await expect(brand.locator('.lgo-art-wordmark-fallback')).toBeVisible();await expect(page.locator('h1')).toHaveAccessibleName('Linh Giới Online');
  const link=page.locator('.lgo-immersive-hero .lgo-hero-actions a').first();await link.focus();await page.keyboard.press('Enter');await expect(page).toHaveURL(origin+'/game');
 });
 test('forced colors retains a live legible brand and source-art failure never blocks actions',async({page})=>{
  await page.emulateMedia({forcedColors:'active'});await expect(page.locator('.lgo-art-wordmark-fallback')).toBeVisible();await expect(page.locator('.lgo-art-wordmark img')).toBeHidden();await page.locator('.lgo-immersive-hero .lgo-hero-actions a').last().focus();await page.keyboard.press('Enter');await expect(page).toHaveURL(origin+'/story');
 });
 test('responsive brand and real first-fold actions fit at narrow wide and short screens',async({page})=>{
  for(const [width,height]of [[320,800],[390,844],[768,1024],[1440,900],[1920,1080],[844,390]]){
   await page.setViewportSize({width,height});await page.waitForTimeout(50);expect(await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth)).toBeLessThanOrEqual(0);
   const box=(await page.locator('h1').boundingBox())!;expect(box.x).toBeGreaterThanOrEqual(0);expect(box.x+box.width).toBeLessThanOrEqual(width+1);
   for(const a of await page.locator('.lgo-immersive-hero .lgo-hero-actions a').all()){expect((await a.boundingBox())!.height).toBeGreaterThanOrEqual(44);await expect(a).toBeVisible();}
  }
 });
 test('news titles are the primary article links, with one separate complete-summary disclosure',async({page})=>{
  const cards=page.locator('#home-news .lgo-landing-news-card');await expect(cards).toHaveCount(3);
  for(const card of await cards.all()){await expect(card.locator('h3 a')).toHaveCount(1);await expect(card.getByRole('link')).toHaveCount(1);await expect(card.locator('summary')).toHaveCount(1);expect((await card.locator('h3 a').boundingBox())!.height).toBeGreaterThanOrEqual(44);}
  const title=cards.first().locator('h3 a'),href=await title.getAttribute('href');await title.focus();await page.keyboard.press('Enter');await expect(page).toHaveURL(origin+href);await page.goBack();await expect(page.locator('.lgo-art-wordmark')).toBeVisible();
 });

});
