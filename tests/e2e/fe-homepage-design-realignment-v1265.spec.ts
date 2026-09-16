import { test, expect } from '@playwright/test';
import { localContentRepository } from '../../packages/content/src/repository';
const origin=process.env.LGO_WEB_URL??'http://127.0.0.1:3000';

test.describe('homepage restarts from actual v1.118 visual composition',()=>{
 test.beforeEach(async({page})=>{await page.goto(origin+'/');});
 test('full-width illustrated hero centers the brand rather than a split boxed proof layout',async({page,isMobile})=>{
  const hero=page.locator('.lgo-immersive-hero');await expect(hero).toBeVisible();await expect(hero.locator('h1')).toHaveText('Linh GiớiONLINE');
  const m=await hero.evaluate(e=>{const r=e.getBoundingClientRect(),h=e.querySelector('h1')!.getBoundingClientRect();return{hero:r.toJSON(),h:h.toJSON(),overflow:document.documentElement.scrollWidth-innerWidth,images:[...e.querySelectorAll('img')].every(i=>i.complete&&i.naturalWidth>0),center:Math.abs(h.x+h.width/2-innerWidth/2),background:getComputedStyle(e.querySelector('.lgo-immersive-art')!).position};});
  expect(m.hero.width).toBeGreaterThanOrEqual((await page.viewportSize())!.width-2);expect(m.center).toBeLessThan(4);expect(m.images).toBe(true);expect(m.background).toBe('absolute');expect(m.overflow).toBeLessThanOrEqual(0);
  expect(m.hero.height).toBeLessThan(isMobile?850:600);await expect(page.locator('.lgo-cinematic-scene,.lgo-home-discovery-grid')).toHaveCount(0);await page.screenshot({path:test.info().outputPath('homepage-first-fold.png')});
 });
 test('three real illustrated feature cards follow the hero, then discovery and news are paired',async({page,isMobile})=>{
  const cards=page.locator('.lgo-landing-features .lgo-illustrated-link');await expect(cards).toHaveCount(3);
  const geometry=await page.evaluate(()=>{const r=(s:string)=>document.querySelector(s)!.getBoundingClientRect().toJSON();return{hero:r('.lgo-immersive-hero'),feature:r('.lgo-landing-features'),discovery:r('#home-discovery'),news:r('#home-news'),cols:getComputedStyle(document.querySelector('.lgo-landing-features')!).gridTemplateColumns.split(' ').length};});
  expect(geometry.feature.top).toBeGreaterThanOrEqual(geometry.hero.bottom-48);expect(geometry.discovery.top).toBeGreaterThan(geometry.feature.bottom-1);
  if(isMobile){expect(geometry.cols).toBe(1);expect(geometry.news.top).toBeGreaterThan(geometry.discovery.bottom);}else{expect(geometry.cols).toBe(3);expect(geometry.feature.bottom).toBeLessThan(900);expect(Math.abs(geometry.discovery.top-geometry.news.top)).toBeLessThan(2);expect(geometry.news.left).toBeGreaterThan(geometry.discovery.right);}
  for(const card of await cards.all()){await expect(card.locator('img')).toBeVisible();expect(await card.locator('p').evaluate(e=>getComputedStyle(e).webkitLineClamp)).toBe('none');}
 });
 test('brand and section typography follow the design hierarchy instead of legacy global caps',async({page,isMobile})=>{
  const size=async(s:string)=>page.locator(s).first().evaluate(e=>parseFloat(getComputedStyle(e).fontSize));
  expect(await size('.lgo-immersive-hero h1')).toBeGreaterThanOrEqual(isMobile?52:95);
  if(isMobile){const span=page.locator('.lgo-immersive-hero h1 > span');expect(await span.evaluate(e=>getComputedStyle(e).whiteSpace)).toBe('nowrap');expect((await span.boundingBox())!.width).toBeLessThanOrEqual((await page.viewportSize())!.width-20);}
  expect(await size('.lgo-landing-heading h2')).toBeLessThanOrEqual(24);
  expect(await size('.lgo-landing-features h3')).toBeLessThanOrEqual(20);
  expect(await size('.lgo-media-mosaic-tiles h3')).toBeLessThanOrEqual(18);
  expect(await size('.lgo-landing-news-card h3')).toBeLessThanOrEqual(19);
 });
 test('primary actions and illustrated features navigate to real existing destinations',async({page})=>{
  for(const [i,href]of ['/game','/classes','/story'].entries()){const link=page.locator('.lgo-immersive-hero .lgo-hero-actions a').nth(i);await expect(link).toHaveAttribute('href',href);await link.focus();await page.keyboard.press('Enter');await expect(page).toHaveURL(origin+href);await expect(page.locator('main h1')).toBeVisible();await page.goBack();}
  for(const [i,href]of ['/game','/game/loop','/community'].entries()){const link=page.locator('.lgo-landing-features .lgo-illustrated-link').nth(i);await expect(link).toHaveAttribute('href',href);await link.click();await expect(page).toHaveURL(origin+href);await page.goBack();}
 });
 test('discovery mosaic is actual image navigation, not a fake video or embedded UI board',async({page})=>{
  const mosaic=page.locator('.lgo-media-mosaic');await expect(mosaic.getByRole('link')).toHaveCount(5);
  for(const link of await mosaic.getByRole('link').all()){const href=await link.getAttribute('href');expect(href).toMatch(/^\//);await link.focus();await page.keyboard.press('Enter');await expect(page).toHaveURL(origin+href);await page.goBack();}
  await expect(page.locator('main img[src*=design-reference],main iframe,main canvas,main video,main [role=timer],main a[download]')).toHaveCount(0);
 });
 test('news cards use real published entries with original date links and recoverable complete summaries',async({page})=>{
  const entries=localContentRepository.list('news').slice(0,3),cards=page.locator('#home-news .lgo-landing-news-card');await expect(cards).toHaveCount(entries.length);
  for(const [i,e]of entries.entries()){const card=cards.nth(i);await expect(card.locator('h3')).toHaveText(e.title);await expect(card.locator('time')).toHaveAttribute('datetime',e.publishedAt);await card.locator('summary').focus();await page.keyboard.press('Space');await expect(card.locator('details p')).toHaveText(e.summary);await expect(card.getByRole('link')).toHaveAttribute('href','/news/'+e.slug);}
  await expect(page.locator('main')).not.toContainText('500.000');await expect(page.locator('main')).not.toContainText('Máy chủ hoạt động ổn định');
 });
 test('availability is readable but no design-review or engineering banners dominate the homepage',async({page})=>{
  await expect(page.locator('.lgo-landing-availability')).toContainText('Bản public chưa mở');await expect(page.locator('.lgo-landing-availability a')).toHaveAttribute('href','/download');
  await expect(page.locator('.lgo-design-target-band')).toHaveCount(0);await expect(page.locator('main')).not.toContainText('NO_ACCEPTED_BACKEND_CONTRACT');await expect(page.locator('main')).not.toContainText('browser/e2e');
  await expect(page.locator('main h1')).toHaveCount(1);await expect(page.locator('main form,main input,main textarea')).toHaveCount(0);
 });
 test('320px and live resize preserve readable text complete actions and visible focus without clipping',async({page})=>{
  for(const width of [320,390,768,1440]){await page.setViewportSize({width,height:900});expect(await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth)).toBeLessThanOrEqual(0);await expect(page.locator('.lgo-landing-features a')).toHaveCount(3);}
  await page.setViewportSize({width:320,height:800});for(const p of await page.locator('.lgo-immersive-landing p').all()){if(await p.isVisible())expect(await p.evaluate(e=>parseFloat(getComputedStyle(e).fontSize))).toBeGreaterThanOrEqual(14);}
  for(const e of await page.locator('.lgo-immersive-landing a,.lgo-immersive-landing summary').all()){if(await e.isVisible())expect((await e.boundingBox())!.height).toBeGreaterThanOrEqual(44);}
  const a=page.locator('.lgo-immersive-hero .lgo-hero-actions a').first();await a.focus();expect(await a.evaluate(e=>getComputedStyle(e).outlineStyle)).not.toBe('none');await page.emulateMedia({forcedColors:'active'});expect(await a.evaluate(e=>getComputedStyle(e).outlineStyle)).not.toBe('none');
 });
 test('art failure leaves the brand and primary actions usable and reduced motion avoids animation',async({page})=>{
  await page.route('**/game-art/marketing/**',r=>r.abort());await page.reload();await expect(page.locator('.lgo-immersive-hero h1')).toBeVisible();await page.emulateMedia({reducedMotion:'reduce'});expect(await page.evaluate(()=>getComputedStyle(document.documentElement).scrollBehavior)).toBe('auto');await page.locator('.lgo-immersive-hero .lgo-hero-actions a').first().click();await expect(page).toHaveURL(origin+'/game');
 });
 test('homepage skip link and header remain usable without exposing engineering controls',async({page})=>{
  await page.keyboard.press('Tab');const skip=page.getByRole('link',{name:'Bỏ qua menu tới nội dung chính',exact:true});await expect(skip).toBeFocused();await page.keyboard.press('Enter');await expect(page.locator('#main-content')).toBeFocused();
  const nav=page.getByRole('navigation',{name:'Linh Giới Online public navigation',exact:true});const world=nav.getByRole('link',{name:'Thế giới',exact:true});await world.focus();await page.keyboard.press('Enter');await expect(page).toHaveURL(origin+'/game');await expect(world).toHaveAttribute('aria-current','page');
  await nav.getByRole('link',{name:'Linh Giới Online — Trang chủ',exact:true}).click();await expect(page).toHaveURL(origin+'/');await expect(page.locator('.lgo-immersive-hero')).toBeVisible();await expect(page.locator('.lgo-design-target-band')).toHaveCount(0);
 });
 test('main accessibility and expanded spacing remain coherent',async({page})=>{
  await page.locator('#home-news summary').first().click();await page.addScriptTag({path:'node_modules/axe-core/axe.min.js'});
  const violations=await page.evaluate(async()=>(await (window as any).axe.run(document.querySelector('main'),{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}})).violations.map((v:any)=>v.id));expect(violations).toEqual([]);
  await page.addStyleTag({content:'.lgo-immersive-landing p {letter-spacing:.12em!important;word-spacing:.16em!important;line-height:1.8!important}'});expect(await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth)).toBeLessThanOrEqual(0);await page.screenshot({path:test.info().outputPath('homepage-complete.png'),fullPage:true});
 });
});
