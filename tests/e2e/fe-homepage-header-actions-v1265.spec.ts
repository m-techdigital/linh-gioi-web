import {waitForHomepage} from './helpers/homepage-ready';
import {test,expect} from '@playwright/test';
const origin=process.env.LGO_WEB_URL??'http://127.0.0.1:3236';
const actions=[['/game','Khám phá Linh Giới','Thế giới và nhân vật'],['/classes','Chọn Lộ của bạn','Tìm con đường riêng'],['/story','Bắt đầu câu chuyện','Đọc mở đầu hành trình']] as const;
test.describe('homepage header and main actions v1.265 revision3',()=>{
 test.beforeEach(async({page})=>{await page.goto(origin+'/');await waitForHomepage(page);});
 test('header reuses the source brush brand and explicitly marks the homepage as current',async({page})=>{
  const header=page.locator('header.lgo-site-header'),brand=header.getByRole('link',{name:'Linh Giới Online — Trang chủ',exact:true});await expect(brand.locator('.lgo-art-wordmark')).toHaveCount(1);await expect(brand.locator('.lgo-art-wordmark img')).toHaveAttribute('src','/game-art/marketing/wordmark-brush.png');await expect(brand).toHaveAttribute('href','/');
  const root=header.locator('.lgo-brand-links').getByRole('link',{name:'Trang chủ',exact:true});await expect(root).toHaveAttribute('aria-current','page');await expect(root).toHaveAttribute('href','/');await expect(header.locator('.lgo-brand-links [aria-current=page]')).toHaveCount(1);
  const metrics=await brand.evaluate(e=>({w:e.getBoundingClientRect().width,h:e.getBoundingClientRect().height,wordmark:e.querySelector('.lgo-art-wordmark')!.getBoundingClientRect().width,loaded:e.querySelector('.lgo-art-wordmark img')!.naturalWidth}));expect(metrics.w).toBeGreaterThanOrEqual(165);expect(metrics.w).toBeLessThanOrEqual(200);expect(metrics.wordmark).toBeGreaterThanOrEqual(120);expect(metrics.wordmark).toBeLessThanOrEqual(170);expect(metrics.h).toBeGreaterThanOrEqual(44);expect(metrics.loaded).toBe(422);await expect(page.locator('main h1')).toHaveAccessibleName('Linh Giới Online');
 });
 test('header includes the original cyan portal sigil without changing the accessible brand link',async({page})=>{
  const brand=page.getByRole('link',{name:'Linh Giới Online — Trang chủ',exact:true});const sigil=brand.locator('.lgo-nav-sigil-art');await expect(sigil).toHaveCount(1);const img=sigil.locator('img');await expect(img).toHaveAttribute('src','/game-art/marketing/header-sigil.png');await expect(sigil).toHaveAttribute('aria-hidden','true');const m=await img.evaluate(i=>({loaded:i.complete&&i.naturalWidth>0,w:i.naturalWidth,h:i.naturalHeight}));expect(m.loaded).toBe(true);expect(m.w).toBeGreaterThanOrEqual(36);expect(m.h).toBeGreaterThanOrEqual(36);await expect(brand).toHaveAccessibleName('Linh Giới Online — Trang chủ');
 });
 test('hero motto is live text with decorative separators, not baked into the background',async({page})=>{
  const motto=page.locator('.lgo-hero-motto');await expect(motto).toHaveText('KIẾP NÀY, THẾ GIỚI RỘNG LỚN HƠN BẠN NGHĨ');await expect(motto).toBeVisible();await expect(page.locator('main img[src*=design-reference]')).toHaveCount(0);const m=await motto.evaluate(e=>({before:getComputedStyle(e,'::before').display,after:getComputedStyle(e,'::after').display,font:parseFloat(getComputedStyle(e).fontSize)}));expect(m.before).not.toBe('none');expect(m.after).not.toBe('none');expect(m.font).toBeGreaterThanOrEqual(12);
 });
 test('three framed actions have actual decorative icons distinct captions and native link navigation',async({page})=>{
  const links=page.locator('.lgo-immersive-hero .lgo-hero-actions a');await expect(links).toHaveCount(3);
  for(const [i,[href,label,description]]of actions.entries()){
   const link=links.nth(i);await expect(link).toHaveClass(/lgo-action-link/);await expect(link.locator('.lgo-action-link-label')).toHaveText(label);await expect(link.locator('.lgo-action-link-description')).toHaveText(description);await expect(link.locator('.lgo-action-link-icon svg')).toHaveCount(1);await expect(link.locator('.lgo-action-link-icon')).toHaveAttribute('aria-hidden','true');await expect(link).toHaveAttribute('href',href);
   const shape=await link.evaluate(e=>({clip:getComputedStyle(e).clipPath,frame:getComputedStyle(e,'::before').clipPath,childInteractive:e.querySelectorAll('a,button,[tabindex]').length}));expect(shape.clip).toBe('none');expect(shape.frame).toContain('polygon');expect(shape.childInteractive).toBe(0);
   await link.focus();await page.keyboard.press('Enter');await expect(page).toHaveURL(origin+href);await page.goBack();await waitForHomepage(page);
  }
  await expect(page.locator('main video,main iframe,main a[download]')).toHaveCount(0);
 });
 test('mobile keyboard can reach every menu entry with44px targets and no page overflow',async({page})=>{
  for(const width of [320,390,768,1280]){
   await page.setViewportSize({width,height:900});const links=page.locator('header .lgo-brand-links a');await expect(links).toHaveCount(8);
   await page.keyboard.press('Tab');await links.first().focus();
   for(const [index,link]of (await links.all()).entries()){if(index)await page.keyboard.press('Tab');await expect(link).toBeFocused();const r=(await link.boundingBox())!;expect(r.height).toBeGreaterThanOrEqual(44);expect(r.x).toBeGreaterThanOrEqual(0);expect(r.x+r.width).toBeLessThanOrEqual(width+1);expect(await link.evaluate(e=>getComputedStyle(e).outlineStyle)).not.toBe('none');}
   expect(await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth)).toBeLessThanOrEqual(0);
  }
 });
 test('image failure keeps both header and hero brands readable and focus survives forced colors',async({page})=>{
  await page.route('**/wordmark-brush.png',r=>r.abort());await page.reload();await waitForHomepage(page);const brands=page.locator('header .lgo-art-wordmark, main h1 .lgo-art-wordmark');await expect(brands).toHaveCount(2);
  for(const brand of await brands.all()){await expect(brand).toHaveAttribute('data-fallback','true');await expect(brand.locator('.lgo-art-wordmark-fallback')).toBeVisible();const r=(await brand.locator('.lgo-art-wordmark-fallback > span').boundingBox())!;expect(r.x).toBeGreaterThanOrEqual(0);expect(r.x+r.width).toBeLessThanOrEqual((await page.viewportSize())!.width+1);}
  await page.emulateMedia({forcedColors:'active'});const link=page.locator('.lgo-hero-actions a').first();await link.focus();expect(await link.evaluate(e=>getComputedStyle(e).outlineStyle)).not.toBe('none');await expect(link).toContainText('Khám phá Linh Giới');await page.keyboard.press('Enter');await expect(page).toHaveURL(origin+'/game');
 });
 test('captions remain readable with enlarged spacing and header plus main pass scoped axe',async({page})=>{
  await page.setViewportSize({width:320,height:900});await expect(page.locator('.lgo-action-link-description')).toHaveCount(3);
  for(const caption of await page.locator('.lgo-action-link-description').all()){expect(await caption.evaluate(e=>parseFloat(getComputedStyle(e).fontWeight))).toBeLessThanOrEqual(500);expect(await caption.evaluate(e=>parseFloat(getComputedStyle(e).fontSize))).toBe(14);}
  await page.addStyleTag({content:'.lgo-action-link-description,.lgo-action-link-label{letter-spacing:.12em!important;word-spacing:.16em!important;line-height:1.7!important}'});
  for(const part of await page.locator('.lgo-action-link-description').all()){expect(await part.evaluate(e=>parseFloat(getComputedStyle(e).fontSize))).toBeGreaterThanOrEqual(14);expect(await part.evaluate(e=>e.scrollWidth-e.clientWidth)).toBeLessThanOrEqual(1);}
  expect(await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth)).toBeLessThanOrEqual(0);await page.addScriptTag({path:'node_modules/axe-core/axe.min.js'});
  const violations=await page.evaluate(async()=>(await (window as any).axe.run({include:[['header.lgo-site-header'],['main']]},{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}})).violations.map((v:any)=>v.id));expect(violations).toEqual([]);await page.screenshot({path:test.info().outputPath('header-actions-expanded-text.png'),fullPage:true});
 });
});
