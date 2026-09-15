import {test,expect} from '@playwright/test';
import {contentEntries} from '../../packages/content/src/fixtures';
const origin=process.env.LGO_WEB_URL??'http://127.0.0.1:3000';
const guides=contentEntries.filter(e=>e.category==='guides'&&e.status==='published');
const fold=(s:string)=>s.normalize('NFD').replace(/\p{M}/gu,'').replace(/[đĐ]/g,'d').toLowerCase();

test.describe('published guide discovery and local filters v1.234',()=>{
 test.beforeEach(async({page})=>{await page.goto(origin+'/guides');await expect(page.getByRole('heading',{level:1,name:'Hướng dẫn cho Người Thức Tỉnh',exact:true})).toBeVisible();});
 test('illustrated lead article and discovery shelf have a real responsive composition',async({page,isMobile})=>{
  await expect(page.locator('.lgo-library-featured')).toBeVisible();await expect(page.locator('.lgo-reading-catalog')).toBeVisible();
  await expect(page.locator('main img[src*=design-reference], main img[src*=design-boards]')).toHaveCount(0);
  const m=await page.evaluate(()=>{const copy=document.querySelector('.lgo-guides-discovery .lgo-release-hero-copy')!.getBoundingClientRect();const featured=document.querySelector('.lgo-library-featured')!.getBoundingClientRect();const img=document.querySelector('.lgo-library-featured img') as HTMLImageElement;const grid=document.querySelector('.lgo-reading-catalog-grid')!;return {copy:copy.toJSON(),featured:featured.toJSON(),loaded:img.complete&&img.naturalWidth>0,cols:getComputedStyle(grid).gridTemplateColumns.split(' ').length,overflow:document.documentElement.scrollWidth-innerWidth};});
  expect(m.loaded).toBe(true);expect(m.overflow).toBeLessThanOrEqual(0);
  if(isMobile){expect(m.featured.top).toBeGreaterThanOrEqual(m.copy.bottom);expect(m.cols).toBe(1);}else{expect(m.featured.left).toBeGreaterThanOrEqual(m.copy.right);expect(m.cols).toBe(3);}
  await page.screenshot({path:test.info().outputPath('guides-directory.png'),fullPage:true});
 });
 test('catalog preserves all published source titles and descriptions, not invented aliases',async({page})=>{
  const catalog=page.locator('.lgo-reading-catalog');await expect(catalog.locator('article')).toHaveCount(guides.length);
  for(const entry of guides){const card=catalog.locator(`article[data-entry-id="${entry.slug}"]`);await expect(card.getByRole('heading',{level:3})).toHaveText(entry.title);await expect(card.locator('p')).toHaveText(entry.summary);await expect(card.getByRole('link')).toHaveAttribute('href',`/guides/${entry.slug}`);expect(await card.locator('p').evaluate(e=>getComputedStyle(e).webkitLineClamp)).toBe('none');}
  await expect(catalog.getByRole('status')).toContainText(`${guides.length}/${guides.length}`);
  await catalog.locator('[data-entry-id="world-gameplay-loop-guide"]').getByRole('link').click();await expect(page).toHaveURL(origin+'/guides/world-gameplay-loop-guide');
 });
 test('topic and accent-insensitive keyword filters intersect and announce the actual result count',async({page})=>{
  const catalog=page.locator('.lgo-reading-catalog'),input=catalog.getByRole('searchbox',{name:'Tìm trong thư viện'});
  const group=catalog.getByRole('button',{name:/^Nhập môn/});await group.focus();await page.keyboard.press('Enter');await expect(group).toHaveAttribute('aria-pressed','true');await expect(catalog.locator('article')).toHaveCount(3);
  await input.fill('  ĐÁ   LUYỆN  ');await expect(catalog.locator('article')).toHaveCount(2);
  await input.fill('cong linh');await expect(catalog.locator('article')).toHaveCount(2);
  await catalog.getByRole('button',{name:/^Tất cả/}).click();await input.fill('  PHÁT HÀNH '.normalize('NFD'));
  const expected=guides.filter(e=>fold(`${e.title} ${e.summary}`).includes('phat hanh'));await expect(catalog.locator('article')).toHaveCount(expected.length);await expect(catalog.getByRole('status')).toContainText(`${expected.length}/${guides.length}`);
 });
 test('empty results can reset without losing keyboard focus or the published catalog',async({page})=>{
  const catalog=page.locator('.lgo-reading-catalog'),input=catalog.getByRole('searchbox');await input.fill('khongkhop-zz123-no-match');await expect(catalog.locator('article')).toHaveCount(0);await expect(catalog).toContainText('Chưa tìm thấy bài phù hợp');
  const reset=catalog.getByRole('button',{name:'Xóa bộ lọc',exact:true});await reset.focus();await page.keyboard.press('Space');await expect(input).toBeFocused();await expect(input).toHaveValue('');await expect(catalog.locator('article')).toHaveCount(guides.length);await expect(reset).toBeDisabled();
  await page.screenshot({path:test.info().outputPath('guides-reset-focus.png'),fullPage:true});
 });
 test('filtering never submits or persists entered words, reload resets only local discovery',async({page})=>{
  const catalog=page.locator('.lgo-reading-catalog'),input=catalog.getByRole('searchbox');await expect(input).toBeVisible();await page.waitForLoadState('networkidle');
  const requests:string[]=[];page.on('request',r=>{if(['fetch','xhr'].includes(r.resourceType())||r.method()!=='GET')requests.push(r.url());});
  await input.fill('Linh');await catalog.getByRole('button',{name:/^Đọc website/}).click();await expect(catalog.locator('article')).not.toHaveCount(0);expect(requests).toEqual([]);expect(page.url()).toBe(origin+'/guides');
  await page.reload();await expect(input).toHaveValue('');await expect(catalog.getByRole('button',{name:/^Tất cả/})).toHaveAttribute('aria-pressed','true');await expect(catalog.locator('article')).toHaveCount(guides.length);
 });
 test('featured article and beginner links navigate to existing source pages',async({page})=>{
  const featured=page.locator('.lgo-library-featured');await expect(featured.getByRole('heading')).toHaveText('Vòng lặp thế giới nhập môn');await expect(featured.getByRole('link')).toHaveAttribute('href','/guides/world-gameplay-loop-guide');await featured.getByRole('link').click();await expect(page).toHaveURL(origin+'/guides/world-gameplay-loop-guide');
  for(const path of ['/guides/beginner','/start','/support/safety'])expect((await page.request.get(origin+path)).status()).toBe(200);
 });
 test('narrow controls and filtered results remain readable and accessible without live-wiki claims',async({page})=>{
  await page.setViewportSize({width:320,height:800});const catalog=page.locator('.lgo-reading-catalog');await catalog.getByRole('button',{name:/^Nhập môn/}).click();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth)).toBeLessThanOrEqual(0);await expect(page.locator('main h1')).toHaveCount(1);
  for(const el of await catalog.locator('input,button,a').all()){const box=await el.boundingBox();if(box)expect(box.height).toBeGreaterThanOrEqual(44);}
  await expect(page.locator('main')).toContainText('Không phải wiki trực tuyến');await expect(catalog.locator('form,input[type=password],textarea,iframe')).toHaveCount(0);
  await catalog.getByRole('searchbox').focus();expect(await catalog.getByRole('searchbox').evaluate(e=>getComputedStyle(e).outlineStyle)).not.toBe('none');
  await page.addScriptTag({path:'node_modules/axe-core/axe.min.js'});
  const violations=await page.evaluate(async()=>{const axe=(window as unknown as {axe:{run:(e:Element|null,o:unknown)=>Promise<{violations:{id:string}[]}>}}).axe;return (await axe.run(document.querySelector('main'),{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}})).violations.map(v=>v.id);});expect(violations).toEqual([]);
 });
 test('summary disclosures keep the full source available without a wall of expanded text',async({page})=>{
  const cards=page.locator('.lgo-reading-catalog-card');await expect(cards).toHaveCount(guides.length);
  const first=cards.first(),details=first.locator('details');await expect(details).not.toHaveAttribute('open','');
  await expect(first.locator('p')).not.toBeVisible();const summary=details.locator('summary');
  await summary.focus();await page.keyboard.press('Enter');await expect(details).toHaveAttribute('open','');
  await expect(details.locator('p')).toBeVisible();await expect(details.locator('p')).toHaveText(guides[0]!.summary);
  expect(await details.locator('p').evaluate(e=>getComputedStyle(e).webkitLineClamp)).toBe('none');
  await page.keyboard.press('Space');await expect(details).not.toHaveAttribute('open','');
  const feature=page.locator('.lgo-library-featured details');await feature.locator('summary').click();
  await expect(feature.locator('p')).toHaveText(guides.find(e=>e.slug==='world-gameplay-loop-guide')!.summary);
 });

 test('mobile catalog rows keep the title and two actions compact without reducing touch targets',async({page})=>{
  await page.setViewportSize({width:390,height:844});const card=page.locator('.lgo-reading-catalog-card').first();await expect(card).toBeVisible();
  expect((await card.boundingBox())!.height).toBeLessThanOrEqual(190);
  const summary=await card.locator('summary').boundingBox(),link=await card.getByRole('link').boundingBox();
  expect(Math.abs(summary!.y-link!.y)).toBeLessThanOrEqual(2);expect(summary!.height).toBeGreaterThanOrEqual(44);expect(link!.height).toBeGreaterThanOrEqual(44);
  await card.locator('summary').click();await expect(card.locator('p')).toBeVisible();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth)).toBeLessThanOrEqual(0);
 });

});
