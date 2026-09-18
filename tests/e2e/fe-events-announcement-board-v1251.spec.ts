import { test, expect, type BrowserContext } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import { contentEntries } from '../../packages/content/src/fixtures';

const STATIC_BUILD=process.env.LGO_STATIC_BUILD_PATH;
const origin=STATIC_BUILD?'http://wip.local':(process.env.LGO_WEB_URL??'http://127.0.0.1:3000');
const entries=contentEntries.filter(entry=>entry.category==='events'&&entry.status==='published');

function appRouteFile(app:string,pathname:string,extension:'.html'|'.rsc'){
  const route=pathname.replace(/\/$/,'')||'/';
  return path.join(app,'.next/server/app',(route==='/'?'index':route.slice(1))+extension);
}
async function mountStaticBuild(context:BrowserContext){
  if(!STATIC_BUILD)return;
  await context.route('http://wip.local/**',async route=>{
    const url=new URL(route.request().url());let file:string|undefined;let contentType='application/octet-stream';
    if(url.searchParams.has('_rsc')){file=appRouteFile(STATIC_BUILD,url.pathname,'.rsc');contentType='text/x-component';}
    else if(url.pathname.startsWith('/_next/static/'))file=path.join(STATIC_BUILD,'.next',url.pathname.slice('/_next/'.length));
    else if(url.pathname==='/_next/image'){const source=url.searchParams.get('url');if(source?.startsWith('/'))file=path.join(STATIC_BUILD,'public',source);}
    else {const publicFile=path.join(STATIC_BUILD,'public',url.pathname);if(url.pathname!=='/'&&fs.existsSync(publicFile)&&fs.statSync(publicFile).isFile())file=publicFile;else{file=appRouteFile(STATIC_BUILD,url.pathname,'.html');contentType='text/html';}}
    if(!file||!fs.existsSync(file))return route.fulfill({status:404,body:'not found'});
    if(file.endsWith('.css'))contentType='text/css';else if(file.endsWith('.js'))contentType='application/javascript';
    else if(file.endsWith('.png'))contentType='image/png';else if(file.endsWith('.webp'))contentType='image/webp';else if(file.endsWith('.svg'))contentType='image/svg+xml';else if(file.endsWith('.woff2'))contentType='font/woff2';
    return route.fulfill({status:200,contentType,body:fs.readFileSync(file)});
  });
}

test.describe('events are readable announcements, not live operations v1.251',()=>{
  test.beforeEach(async({context,page})=>{await mountStaticBuild(context);await page.goto(origin+'/events');await expect(page.getByRole('heading',{level:1,name:'Sự kiện Linh Giới',exact:true})).toBeVisible();});
  test('illustrated hero and full-width editorial announcement replace tiny proof cards',async({page,isMobile})=>{
    const root=page.locator('.lgo-events-experience');await expect(root).toBeVisible();
    await expect(root.locator('.lgo-announcement-card')).toHaveCount(entries.length);
    const archive=root.locator('#events-fixture-archive');await expect(archive).not.toHaveAttribute('open','');await archive.locator(':scope > summary').click();
    await expect(root.locator('img[src*=design-reference],.lgo-service-compact-proof-page')).toHaveCount(0);
    const metrics=await root.evaluate(e=>{
      const copy=e.querySelector('.lgo-release-hero-copy')!.getBoundingClientRect(),note=e.querySelector('.lgo-performance-priority-console')!.getBoundingClientRect(),board=e.querySelector('.lgo-announcement-board')!.getBoundingClientRect(),card=e.querySelector('.lgo-announcement-card')!.getBoundingClientRect();
      const img=e.querySelector('.lgo-release-hero-art') as HTMLImageElement;
      return {copy:copy.toJSON(),note:note.toJSON(),board:board.toJSON(),card:card.toJSON(),loaded:img.complete&&img.naturalWidth>0,overflow:document.documentElement.scrollWidth-innerWidth};
    });
    expect(metrics.loaded).toBe(true);expect(metrics.overflow).toBeLessThanOrEqual(0);expect(metrics.card.width).toBeGreaterThan(metrics.board.width*.9);
    if(isMobile)expect(metrics.note.top).toBeGreaterThanOrEqual(metrics.copy.bottom);else expect(metrics.note.left).toBeGreaterThanOrEqual(metrics.copy.right);
    await page.screenshot({path:test.info().outputPath('events-layout.png'),fullPage:true});
  });
  test('only published event records appear, with exact descriptions and posting time not event dates',async({page})=>{
    await page.locator('#events-fixture-archive > summary').click();
    const cards=page.locator('.lgo-announcement-card');await expect(cards).toHaveCount(entries.length);
    for(const [index,entry] of entries.entries()){
      const card=cards.nth(index);await expect(card).toHaveAttribute('data-announcement-id',entry.slug);
      await expect(card.getByRole('heading',{level:3})).toHaveText(entry.title);await expect(card.locator('.lgo-announcement-description')).toHaveText(entry.summary);
      await expect(card.locator('time')).toHaveAttribute('datetime',entry.publishedAt);
      await expect(card.locator('time')).toHaveText(entry.publishedAt.slice(0,10).split('-').reverse().join('/'));
      await expect(card).toContainText('Ngày đăng nội dung');await expect(card).toContainText('Không phải ngày tổ chức');
      expect(await card.locator('.lgo-announcement-description').evaluate(e=>getComputedStyle(e).webkitLineClamp)).toBe('none');
      await card.locator('summary').click();await expect(card.locator('.lgo-announcement-body')).toHaveText(entry.body);
    }
    for(const entry of contentEntries.filter(entry=>entry.category==='events'&&entry.status!=='published'))await expect(page.locator(`[data-announcement-id="${entry.slug}"]`)).toHaveCount(0);
  });
  test('native disclosure opens the complete body with Enter and Space without requests or saved state',async({page})=>{
    await page.locator('#events-fixture-archive > summary').click();
    const card=page.locator('.lgo-announcement-card').first(),details=card.locator('details'),summary=details.locator('summary');await expect(summary).toBeVisible();
    const requests:string[]=[];page.on('request',r=>{if(r.method()!=='GET'||['fetch','xhr'].includes(r.resourceType()))requests.push(r.url());});
    await summary.focus();await page.keyboard.press('Enter');await expect(details).toHaveAttribute('open','');await expect(card.locator('.lgo-announcement-body')).toHaveText(entries[0]!.body);
    expect(await summary.evaluate(e=>getComputedStyle(e).outlineStyle)).not.toBe('none');
    await page.keyboard.press('Space');await expect(details).not.toHaveAttribute('open','');await expect(summary).toBeFocused();
    expect(requests).toEqual([]);await page.reload();await expect(details).not.toHaveAttribute('open','');
  });
  test('announcement and boundary links arrive below the header and keep native history',async({page})=>{
    await page.getByRole('link',{name:'Xem trạng thái sự kiện',exact:true}).click();
    const board=page.locator('#events-announcements');await expect(board).toBeFocused();
    await expect.poll(async()=>{const b=await board.boundingBox(),h=await page.locator('header').first().boundingBox();return !!b&&!!h&&b.y>=h.y+h.height&&b.y<500;}).toBe(true);
    await page.keyboard.press('Tab');await expect(page.locator('#events-fixture-archive > summary')).toBeFocused();
    await page.goto('about:blank');await page.goto(origin+'/events#events-announcements',{waitUntil:'networkidle'});await expect(board).toBeFocused();
    await page.goto('about:blank');await page.goto(origin+'/events#%E0%A4%A',{waitUntil:'networkidle'});await expect(page.locator('.lgo-events-experience')).toBeVisible();await expect(board).not.toBeFocused();
    await page.goto(origin+'/events');await page.locator('.lgo-events-reading-routes').getByRole('link',{name:'Đọc Trạng thái',exact:true}).click();await expect(page).toHaveURL(origin+'/status');await page.goBack();await expect(page.getByRole('heading',{level:1,name:'Sự kiện Linh Giới'})).toBeVisible();
  });
  test('status roadmap community and support routes are real reading destinations',async({page})=>{
    const routes=page.locator('.lgo-events-reading-routes');await expect(routes).toBeVisible();
    const links=routes.getByRole('link');await expect(links).toHaveCount(4);
    for(const [i,href] of ['/status','/roadmap','/community','/support/help'].entries()){
      await expect(links.nth(i)).toHaveAttribute('href',href);if(!STATIC_BUILD)expect((await page.request.get(origin+href)).status()).toBe(200);
      await links.nth(i).focus();await page.keyboard.press('Enter');await expect(page).toHaveURL(origin+href);await expect(page.locator('main h1')).toBeVisible();await page.goBack();
    }
    await links.first().focus();await page.keyboard.press('Tab');await expect(links.nth(1)).toBeFocused();
  });
  test('no countdown registration reward or live-event controls are manufactured',async({page})=>{
    const root=page.locator('.lgo-events-experience');await expect(root).toBeVisible();await expect(root).toContainText('Chưa có lịch live, đăng ký tham gia hoặc phần thưởng sự kiện.');await expect(root).toContainText('NO_ACCEPTED_BACKEND_CONTRACT');
    await expect(root.locator('form,input,textarea,iframe,canvas,video,[role=timer],[role=progressbar],a[download]')).toHaveCount(0);
    await expect(page.getByRole('button',{name:/Đăng ký|Nhận thưởng|Tham gia ngay|Đặt lịch/i})).toHaveCount(0);
    const text=await root.innerText();expect(text).not.toMatch(/\d+\s*(người đang|suất còn|ngày còn|giờ còn)/i);
    const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));await page.route('**/game-art/**',r=>r.abort());await page.reload();
    await root.locator('#events-fixture-archive > summary').click();await root.locator('.lgo-announcement-card summary').first().click();await expect(root.locator('.lgo-announcement-body').first()).toHaveText(entries[0]!.body);expect(errors).toEqual([]);
  });
  test('320px body and controls remain readable and focused under normal and forced colors',async({page})=>{
    await page.setViewportSize({width:320,height:800});const root=page.locator('.lgo-events-experience');await expect(root).toBeVisible();
    expect(await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth)).toBeLessThanOrEqual(0);
    await root.locator('#events-fixture-archive > summary').click();
    const summary=root.locator('.lgo-announcement-card summary').first();await summary.click();
    for(const body of await root.locator('.lgo-announcement-description,.lgo-announcement-body').all())expect(await body.evaluate(e=>parseFloat(getComputedStyle(e).fontSize))).toBeGreaterThanOrEqual(14);
    for(const action of await root.locator('a,summary').all())expect((await action.boundingBox())!.height).toBeGreaterThanOrEqual(44);
    await page.keyboard.press('Tab');await page.keyboard.press('Shift+Tab');await expect(summary).toBeFocused();expect(await summary.evaluate(e=>getComputedStyle(e).outlineStyle)).not.toBe('none');
    await page.emulateMedia({forcedColors:'active'});expect(await summary.evaluate(e=>getComputedStyle(e).outlineStyle)).not.toBe('none');
    await page.screenshot({path:test.info().outputPath('events-forced-colors.png'),fullPage:true});
  });
  test('expanded notices and navigation have coherent labels and accessible main content',async({page})=>{
    const root=page.locator('.lgo-events-experience');await expect(root).toBeVisible();await expect(root.locator('h1')).toHaveCount(1);
    await root.locator('#events-fixture-archive > summary').click();
    for(const summary of await root.locator('.lgo-announcement-card summary').all())await summary.click();
    const bad=await root.locator('[aria-labelledby]').evaluateAll(nodes=>nodes.filter(n=>(n.getAttribute('aria-labelledby')??'').split(/\s+/).some(id=>!/^H[1-6]$/.test(document.getElementById(id)?.tagName??''))).map(n=>n.getAttribute('aria-labelledby')));expect(bad).toEqual([]);
    await page.addScriptTag({path:'node_modules/axe-core/axe.min.js'});const violations=await page.evaluate(async()=>{const axe=(window as unknown as {axe:{run:(n:Element|null,o:unknown)=>Promise<{violations:{id:string}[]}>}}).axe;return (await axe.run(document.querySelector('main'),{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}})).violations.map(v=>v.id);});expect(violations).toEqual([]);
  });
});
