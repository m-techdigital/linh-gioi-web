import {test,expect} from '@playwright/test';
import {contentEntries} from '../../packages/content/src/fixtures';
const origin=process.env.LGO_WEB_URL??'http://127.0.0.1:3000';
const entries=contentEntries.filter(e=>e.category==='news'&&e.status==='published');
const fold=(s:string)=>s.normalize('NFD').replace(/\p{M}/gu,'').replace(/[đĐ]/g,'d').toLowerCase().replace(/\s+/g,' ').trim();

test.describe('news discovery exposes published records, not a live feed v1.253',()=>{
 test.beforeEach(async({page})=>{await page.goto(origin+'/news');await expect(page.getByRole('heading',{level:1,name:'Tin tức Linh Giới',exact:true})).toBeVisible();});
 test('featured article and full news catalog have a real responsive composition',async({page,isMobile})=>{
  const root=page.locator('.lgo-news-discovery');await expect(root).toBeVisible();await expect(root.locator('.lgo-reading-catalog-card')).toHaveCount(entries.length);
  const m=await root.evaluate(e=>{const copy=e.querySelector('.lgo-release-hero-copy')!.getBoundingClientRect(),featured=e.querySelector('.lgo-library-featured')!.getBoundingClientRect(),grid=e.querySelector('.lgo-reading-catalog-grid')!,img=e.querySelector('.lgo-library-featured img') as HTMLImageElement;return{copy:copy.toJSON(),featured:featured.toJSON(),cols:getComputedStyle(grid).gridTemplateColumns.split(' ').length,loaded:img.complete&&img.naturalWidth>0,overflow:document.documentElement.scrollWidth-innerWidth};});
  expect(m.loaded).toBe(true);expect(m.overflow).toBeLessThanOrEqual(0);
  if(isMobile){expect(m.featured.top).toBeGreaterThanOrEqual(m.copy.bottom);expect(m.cols).toBe(1);}else{expect(m.featured.left).toBeGreaterThanOrEqual(m.copy.right);expect(m.cols).toBe(3);}
  await expect(root.locator('img[src*=design-reference],.lgo-service-compact-proof-page')).toHaveCount(0);await page.screenshot({path:test.info().outputPath('news-layout.png'),fullPage:true});
 });
 test('all published source records remain ordered with exact summaries, posting dates and article links',async({page})=>{
  const catalog=page.locator('.lgo-reading-catalog'),cards=catalog.locator('article');await expect(cards).toHaveCount(entries.length);expect(entries.length).toBeGreaterThan(3);
  for(const [i,entry] of entries.entries()){
   const card=cards.nth(i);await expect(card).toHaveAttribute('data-entry-id',entry.slug);await expect(card.locator('h3')).toHaveText(entry.title);await expect(card.locator('details p')).toHaveText(entry.summary);
   await expect(card.getByRole('link')).toHaveAttribute('href',`/news/${entry.slug}`);await expect(card.locator('time')).toHaveAttribute('datetime',entry.publishedAt);await expect(card.locator('time')).toHaveText(entry.publishedAt.slice(0,10).split('-').reverse().join('/'));await expect(card).toContainText('Ngày đăng');
   expect(await card.locator('details p').evaluate(e=>getComputedStyle(e).webkitLineClamp)).toBe('none');
  }
  await expect(catalog.getByRole('status')).toHaveText(`Đang hiển thị ${entries.length}/${entries.length} bài viết`);await expect(catalog.locator('.lgo-reading-catalog-filters')).toHaveCount(0);
 });
 test('accent-insensitive title and description filtering finds items beyond the old first three',async({page})=>{
  const catalog=page.locator('.lgo-reading-catalog'),input=catalog.getByRole('searchbox',{name:'Tìm trong bản tin'});await expect(input).toHaveAttribute('maxlength','120');
  for(const phrase of ['  DỄ   TÌM  ','phat hanh','hỗ trợ'.normalize('NFD'),'WEB v1.21']){
   await input.fill(phrase);const expected=entries.filter(e=>fold(`${e.title} ${e.summary}`).includes(fold(phrase)));
   await expect(catalog.locator('article')).toHaveCount(expected.length);await expect(catalog.getByRole('status')).toContainText(`${expected.length}/${entries.length}`);
  }
  await expect(catalog.locator('article').first()).toHaveAttribute('data-entry-id','faq-search-helpfulness-polish-started');
 });
 test('empty results reset with Space and preserve stable search focus',async({page})=>{
  const catalog=page.locator('.lgo-reading-catalog'),input=catalog.getByRole('searchbox');await input.fill('zz-no-article-813');await expect(catalog.locator('article')).toHaveCount(0);await expect(catalog).toContainText('Chưa tìm thấy bài phù hợp');
  const reset=catalog.getByRole('button',{name:'Xóa bộ lọc',exact:true});await reset.focus();await page.keyboard.press('Space');await expect(input).toBeFocused();await expect(input).toHaveValue('');await expect(reset).toBeDisabled();await expect(catalog.locator('article')).toHaveCount(entries.length);
 });
 test('local discovery sends no query and persists no reader information',async({page})=>{
  const input=page.getByRole('searchbox',{name:'Tìm trong bản tin'});await expect(input).toBeVisible();await page.waitForLoadState('networkidle');
  const storage=()=>page.evaluate(()=>({local:{...localStorage},session:{...sessionStorage}}));const before=await storage();const requests:string[]=[];page.on('request',r=>{if(r.method()!=='GET'||['fetch','xhr'].includes(r.resourceType()))requests.push(r.url());});
  await input.fill('Linh');await page.locator('.lgo-reading-catalog-card').first().locator('summary').click();expect(requests).toEqual([]);expect(await storage()).toEqual(before);expect(page.url()).toBe(origin+'/news');
  await page.reload();await expect(input).toHaveValue('');await expect(page.locator('.lgo-reading-catalog-card')).toHaveCount(entries.length);
 });
 test('native summaries keep complete text accessible and independent',async({page})=>{
  const cards=page.locator('.lgo-reading-catalog-card');await expect(cards).toHaveCount(entries.length);const one=cards.nth(0).locator('details'),two=cards.nth(1).locator('details');
  await one.locator('summary').focus();await page.keyboard.press('Enter');await expect(one).toHaveAttribute('open','');await expect(one.locator('p')).toHaveText(entries[0]!.summary);
  await two.locator('summary').focus();await page.keyboard.press('Space');await expect(two).toHaveAttribute('open','');await expect(one).toHaveAttribute('open','');await page.keyboard.press('Space');await expect(two).not.toHaveAttribute('open','');await expect(one).toHaveAttribute('open','');
  await page.reload();await expect(one).not.toHaveAttribute('open','');
 });
 test('jump to catalog arrives below the header and hands focus to the real search control',async({page})=>{
  await page.getByRole('link',{name:'Tìm bài trong bản tin',exact:true}).click();const catalog=page.locator('#news-library');await expect(catalog).toBeFocused();
  await expect.poll(async()=>{const b=await catalog.boundingBox(),h=await page.locator('header').first().boundingBox();return !!b&&!!h&&b.y>=h.y+h.height&&b.y<500;}).toBe(true);
  await page.keyboard.press('Tab');await expect(page.getByRole('searchbox',{name:'Tìm trong bản tin'})).toBeFocused();
  await page.goto('about:blank');await page.goto(origin+'/news#news-library',{waitUntil:'networkidle'});await expect(catalog).toBeFocused();
  await page.goto('about:blank');await page.goto(origin+'/news#%E0%A4%A',{waitUntil:'networkidle'});await expect(catalog).not.toBeFocused();
 });
 test('every article and four reading destinations open existing pages without fake commands',async({page})=>{
  for(const entry of entries){const href=`/news/${entry.slug}`;expect((await page.request.get(origin+href)).status()).toBe(200);await page.locator(`.lgo-reading-catalog-card[data-entry-id="${entry.slug}"]`).getByRole('link').click();await expect(page).toHaveURL(origin+href);await expect(page.getByRole('heading',{level:1,name:entry.title,exact:true})).toBeVisible();await page.goBack();}
  const links=page.locator('.lgo-news-reading-routes').getByRole('link');await expect(links).toHaveCount(4);
  for(const [i,href] of ['/status','/roadmap','/guides','/support/help'].entries()){await expect(links.nth(i)).toHaveAttribute('href',href);await links.nth(i).focus();await page.keyboard.press('Enter');await expect(page).toHaveURL(origin+href);await page.goBack();}
 });
 test('featured source article uses its original summary and opens as an article, not a guide',async({page})=>{
  const featured=entries.find(e=>e.featured)??entries[0]!,cover=page.locator('.lgo-library-featured');await expect(cover.getByRole('heading')).toHaveText(featured.title);await cover.locator('summary').click();await expect(cover.locator('details p')).toHaveText(featured.summary);
  const link=cover.getByRole('link',{name:'Mở bài viết',exact:true});await expect(link).toHaveAttribute('href',`/news/${featured.slug}`);await link.click();await expect(page).toHaveURL(origin+`/news/${featured.slug}`);
 });
 test('320px filtering and summaries stay readable with visible normal and forced-colors focus',async({page})=>{
  await page.setViewportSize({width:320,height:800});const root=page.locator('.lgo-news-discovery'),input=page.getByRole('searchbox',{name:'Tìm trong bản tin'});await input.fill('WEB v1.21');const card=root.locator('.lgo-reading-catalog-card').first();await card.locator('summary').click();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth)).toBeLessThanOrEqual(0);expect(await card.locator('details p').evaluate(e=>parseFloat(getComputedStyle(e).fontSize))).toBeGreaterThanOrEqual(14);
  for(const e of await root.locator('input,button,a,summary').all()){const box=await e.boundingBox();if(box)expect(box.height).toBeGreaterThanOrEqual(44);}
  await input.focus();expect(await input.evaluate(e=>getComputedStyle(e).outlineStyle)).not.toBe('none');await page.emulateMedia({forcedColors:'active'});expect(await input.evaluate(e=>getComputedStyle(e).outlineStyle)).not.toBe('none');await page.screenshot({path:test.info().outputPath('news-forced-colors.png'),fullPage:true});
 });
 test('filtered reading has coherent labels, no subscription or live-feed surrogate, and survives missing decoration',async({page})=>{
  const root=page.locator('.lgo-news-discovery');await expect(root).toBeVisible();await expect(root).toContainText('Không phải bản tin trực tiếp');await expect(root).toContainText('NO_ACCEPTED_BACKEND_CONTRACT');await expect(root.locator('h1')).toHaveCount(1);
  await expect(root.locator('form,input[type=email],textarea,iframe,canvas,[role=timer],[role=progressbar],a[download]')).toHaveCount(0);
  await page.getByRole('searchbox').fill('FAQ');for(const s of await root.locator('.lgo-reading-catalog-card summary').all())await s.click();
  await page.addScriptTag({path:'node_modules/axe-core/axe.min.js'});const violations=await page.evaluate(async()=>{const axe=(window as unknown as {axe:{run:(e:Element|null,o:unknown)=>Promise<{violations:{id:string}[]}>}}).axe;return(await axe.run(document.querySelector('main'),{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}})).violations.map(v=>v.id);});expect(violations).toEqual([]);
  const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));await page.route('**/game-art/**',r=>r.abort());await page.reload();await expect(root.locator('.lgo-reading-catalog-card')).toHaveCount(entries.length);await root.locator('.lgo-reading-catalog-card summary').first().click();await expect(root.locator('.lgo-reading-catalog-card').first().locator('details p')).toBeVisible();expect(errors).toEqual([]);
 });
});
