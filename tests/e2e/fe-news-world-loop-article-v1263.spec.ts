import {test,expect} from '@playwright/test';
import {contentEntries,contentDetailSections,gameplayLoopStages,guideDetailSteps} from '../../packages/content/src/fixtures';
const origin=process.env.LGO_WEB_URL??'http://127.0.0.1:3000';
const slug='world-gameplay-loop-depth-started',route=`/news/${slug}`;
const entry=contentEntries.find(e=>e.slug===slug)!;
const sections=contentDetailSections.filter(s=>s.slug===slug);
const id=(i:number)=>`news-${slug}-part-${String(i+1).padStart(2,'0')}`;
const toc=`news-${slug}-contents`;
const related=contentEntries.filter(e=>e.category==='news'&&e.status==='published'&&e.slug!==slug).slice(0,3);
test.describe('source-complete world gameplay loop article v1.263',()=>{
 test.beforeEach(async({page})=>{await page.goto(origin+route);await expect(page.getByRole('heading',{level:1,name:entry.title,exact:true})).toBeVisible();});
 test('reading layout and responsive contents replace compact proof cards',async({page,isMobile})=>{
  const root=page.locator('.lgo-news-article');await expect(root).toBeVisible();await expect(root.locator('.lgo-guide-article-section')).toHaveCount(2);
  await expect(root.locator('.lgo-newsdetail-depth-card,.lgo-service-compact-proof-page,img[src*=design-reference]')).toHaveCount(0);
  const m=await root.evaluate(e=>{const toc=e.querySelector('.lgo-article-contents')!.getBoundingClientRect(),body=e.querySelector('.lgo-guide-article-body')!.getBoundingClientRect(),copy=e.querySelector('.lgo-release-hero-copy')!.getBoundingClientRect(),cover=e.querySelector('.lgo-article-cover')!.getBoundingClientRect(),img=e.querySelector('.lgo-article-cover img') as HTMLImageElement;return{toc:toc.toJSON(),body:body.toJSON(),copy:copy.toJSON(),cover:cover.toJSON(),loaded:img.complete&&img.naturalWidth>0,overflow:document.documentElement.scrollWidth-innerWidth};});
  expect(m.loaded).toBe(true);expect(m.overflow).toBeLessThanOrEqual(0);
  if(isMobile){expect(m.body.top).toBeGreaterThanOrEqual(m.toc.bottom);expect(m.cover.top).toBeGreaterThanOrEqual(m.copy.bottom);}else{expect(m.body.left).toBeGreaterThan(m.toc.right);expect(m.cover.left).toBeGreaterThan(m.copy.right);}
  await page.screenshot({path:test.info().outputPath('news-world-loop-article.png'),fullPage:true});
 });
 test('title summary body and both detail records remain exact source copy',async({page})=>{
  const root=page.locator('.lgo-news-article');await expect(root).toBeVisible();await expect(root.locator('.lgo-hero-lead')).toHaveText(entry.summary);await expect(root.locator('.lgo-guide-article-intro p')).toHaveText(entry.body);
  for(const [i,s] of sections.entries()){
   const part=root.locator(`#${id(i)}`);await expect(part.getByRole('heading',{level:2})).toHaveText(s.heading);await expect(part.locator('.lgo-article-instruction')).toHaveText(s.body);await expect(part.locator('.lgo-article-outcome p')).toHaveText(s.playerImpact);await expect(part.locator('.lgo-article-boundary p')).toHaveText(s.nonClaim);
   await expect(part.getByRole('heading',{name:'Ý nghĩa cho người chơi',exact:true})).toBeVisible();await expect(part.getByRole('heading',{name:'Phạm vi bài viết',exact:true})).toBeVisible();expect(await part.locator('.lgo-article-instruction').evaluate(e=>getComputedStyle(e).webkitLineClamp)).toBe('none');
  }
 });
 test('publication timestamp is the authored posting date not a release date',async({page})=>{
  const hero=page.locator('.lgo-news-article .lgo-release-hero');await expect(hero.locator('time')).toHaveAttribute('datetime',entry.publishedAt);await expect(hero.locator('time')).toHaveText('05/09/2026');await expect(hero).toContainText('Ngày đăng nội dung');await expect(hero).toContainText('không phải thông cáo phát hành game');
  await expect(page.locator('.lgo-news-article [role=timer],.lgo-news-article [role=progressbar],.lgo-news-article a[download]')).toHaveCount(0);
 });
 test('contents previous next and Back Forward move between the real sections',async({page})=>{
  const links=page.getByRole('navigation',{name:'Mục lục bài viết vòng lặp thế giới'}).getByRole('link');await expect(links).toHaveCount(2);
  await links.first().focus();await page.keyboard.press('Enter');await expect(page.locator(`#${id(0)}`)).toBeFocused();
  await page.locator(`#${id(0)}`).getByRole('link',{name:/Phần tiếp/}).click();await expect(page.locator(`#${id(1)}`)).toBeFocused();
  await page.goBack();await expect(page).toHaveURL(origin+route+`#${id(0)}`);await page.goForward();await expect(page).toHaveURL(origin+route+`#${id(1)}`);
  await page.locator(`#${id(1)}`).getByRole('link',{name:/Phần trước/}).click();await expect(page.locator(`#${id(0)}`)).toBeFocused();await page.locator(`#${id(0)}`).getByRole('link',{name:'Về mục lục',exact:true}).click();await expect(page.locator(`#${toc}`)).toBeFocused();
 });
 test('cold fragments arrive below the actual sticky header and invalid fragments do not seize focus',async({page})=>{
  for(const target of [id(1),toc]){
   await page.goto('about:blank');await page.goto(origin+route+'#'+target,{waitUntil:'networkidle'});const part=page.locator('#'+target);await expect(part).toBeFocused();
   await expect.poll(async()=>{const b=await part.boundingBox(),h=await page.locator('header').first().boundingBox();return !!b&&!!h&&b.y>=h.y+h.height&&b.y<600;}).toBe(true);
  }
  const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));for(const fragment of ['%E0%A4%A','not-a-section']){await page.goto('about:blank');await page.goto(origin+route+'#'+fragment,{waitUntil:'networkidle'});await expect(page.locator('.lgo-news-article')).toBeVisible();expect(await page.evaluate(()=>document.activeElement?.classList.contains('lgo-guide-article-section'))).toBe(false);}expect(errors).toEqual([]);
 });
 test('contents native disclosure can close and reopen without hiding the article',async({page})=>{
  const details=page.locator(`#${toc} details`),nav=details.locator('nav');await expect(nav).toBeVisible();await details.locator('summary').focus();await page.keyboard.press('Space');await expect(nav).not.toBeVisible();await expect(page.locator(`#${id(0)}`)).toBeVisible();await page.keyboard.press('Enter');await expect(nav).toBeVisible();
 });
 test('context links and breadcrumbs navigate to real published routes',async({page})=>{
  const links=page.locator('.lgo-news-article-action');await expect(links).toHaveCount(8);
  for(const [i,href] of ['/game','/game/loop','/guides/world-gameplay-loop-guide','/guides/beginner','/start','/download/trust','/status','/support'].entries()){await expect(links.nth(i)).toHaveAttribute('href',href);expect((await page.request.get(origin+href)).status()).toBe(200);await links.nth(i).focus();await page.keyboard.press('Enter');await expect(page).toHaveURL(origin+href);await page.goBack();}
  await page.getByRole('navigation',{name:'Đường dẫn bài viết'}).getByRole('link',{name:'Tin tức',exact:true}).click();await expect(page).toHaveURL(origin+'/news');await page.goBack();await expect(page.getByRole('heading',{level:1,name:entry.title,exact:true})).toBeVisible();
 });
 test('related articles retain the existing selection and complete summaries',async({page,isMobile})=>{
  const cards=page.locator('.lgo-news-article-related .lgo-guidance-topic-card');await expect(cards).toHaveCount(related.length);
  expect(await page.locator('.lgo-news-article-related .lgo-guidance-topic-grid').evaluate(e=>getComputedStyle(e).gridTemplateColumns.split(' ').length)).toBe(isMobile?1:3);
  for(const [i,e] of related.entries()){await expect(cards.nth(i).getByRole('heading')).toHaveText(e.title);await expect(cards.nth(i).locator('p')).toHaveText(e.summary);await expect(cards.nth(i).getByRole('link')).toHaveAttribute('href',`/news/${e.slug}`);expect(await cards.nth(i).locator('p').evaluate(e=>getComputedStyle(e).webkitLineClamp)).toBe('none');await cards.nth(i).getByRole('link').click();await expect(page.getByRole('heading',{level:1,name:e.title,exact:true})).toBeVisible();await page.goBack();}
 });
 test('320px source text and touch targets are readable with normal and forced colors focus',async({page})=>{
  await page.setViewportSize({width:320,height:800});const root=page.locator('.lgo-news-article');await expect(root).toBeVisible();expect(await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth)).toBeLessThanOrEqual(0);
  for(const p of await root.locator('.lgo-article-instruction,.lgo-article-outcome p,.lgo-article-boundary p').all())expect(await p.evaluate(e=>parseFloat(getComputedStyle(e).fontSize))).toBeGreaterThanOrEqual(14);
  for(const e of await root.locator('a,summary').all()){const b=await e.boundingBox();if(b)expect(b.height).toBeGreaterThanOrEqual(44);}
  const a=root.locator('.lgo-news-article-action').first();await a.focus();expect(await a.evaluate(e=>getComputedStyle(e).outlineStyle)).not.toBe('none');await page.emulateMedia({forcedColors:'active'});expect(await a.evaluate(e=>getComputedStyle(e).outlineStyle)).not.toBe('none');await page.screenshot({path:test.info().outputPath('article-forced-colors.png'),fullPage:true});
 });
 test('native reading performs no submission or saved progress and has coherent main accessibility',async({page})=>{
  const root=page.locator('.lgo-news-article');await expect(root).toBeVisible();await expect(root).toContainText('NO_ACCEPTED_BACKEND_CONTRACT');await expect(root.locator('form,input,textarea,iframe,canvas,video')).toHaveCount(0);await expect(page.locator('main h1')).toHaveCount(1);
  await page.waitForLoadState('networkidle');const requests:string[]=[];page.on('request',r=>{if(r.method()!=='GET'||['fetch','xhr'].includes(r.resourceType()))requests.push(r.url());});const storage=()=>page.evaluate(()=>({local:{...localStorage},session:{...sessionStorage}}));const before=await storage();await page.getByRole('navigation',{name:'Mục lục bài viết vòng lặp thế giới'}).getByRole('link').first().click();await page.locator(`#${id(0)}`).getByRole('link',{name:/Phần tiếp/}).click();expect(requests).toEqual([]);expect(await storage()).toEqual(before);
  await page.addScriptTag({path:'node_modules/axe-core/axe.min.js'});const violations=await page.evaluate(async()=>{const axe=(window as unknown as {axe:{run:(e:Element|null,o:unknown)=>Promise<{violations:{id:string}[]}>}}).axe;return(await axe.run(document.querySelector('main'),{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}})).violations.map(v=>v.id);});expect(violations).toEqual([]);
 });
 test('missing decorative artwork leaves all source sections and keyboard reading available',async({page})=>{
  await page.route('**/game-art/**',r=>r.abort());await page.goto('about:blank');await page.goto(origin+route,{waitUntil:'networkidle'});const root=page.locator('.lgo-news-article');await expect(root).toBeVisible();await expect(root.locator('.lgo-hero-lead')).toHaveText(entry.summary);await expect(root.locator('.lgo-guide-article-section')).toHaveCount(sections.length);await page.getByRole('navigation',{name:'Mục lục bài viết vòng lặp thế giới'}).getByRole('link').last().click();await expect(page.locator(`#${id(1)}`)).toBeFocused();
 });
 test('reduced motion uses immediate native section arrival rather than smooth scrolling',async({page})=>{
  await page.emulateMedia({reducedMotion:'reduce'});
  expect(await page.evaluate(()=>getComputedStyle(document.documentElement).scrollBehavior)).toBe('auto');
  await page.getByRole('navigation',{name:'Mục lục bài viết vòng lặp thế giới'}).getByRole('link').last().click();
  const target=page.locator(`#${id(1)}`);await expect(target).toBeFocused();
  const box=await target.boundingBox(),header=await page.locator('header').first().boundingBox();
  expect(box!.y).toBeGreaterThanOrEqual(header!.y+header!.height);expect(box!.y).toBeLessThan(header!.height+120);
 });

 test('resizing the same article retains complete chapters and a single coherent contents navigation',async({page})=>{
  await page.emulateMedia({reducedMotion:'reduce'});
  const nav=page.getByRole('navigation',{name:'Mục lục bài viết vòng lặp thế giới'});
  for(const viewport of [{width:1440,height:900},{width:390,height:844},{width:844,height:390},{width:768,height:1024},{width:1440,height:900}]){
   await page.setViewportSize(viewport);await expect(nav).toHaveCount(1);await nav.getByRole('link').last().click();await expect(page.locator(`#${id(1)}`)).toBeFocused();
   for(const [i,s] of sections.entries()){await expect(page.locator(`#${id(i)} .lgo-article-instruction`)).toHaveText(s.body);await expect(page.locator(`#${id(i)} .lgo-article-boundary p`)).toHaveText(s.nonClaim);}
   const geometry=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth-innerWidth,columns:getComputedStyle(document.querySelector('.lgo-guidance-topic-grid')!).gridTemplateColumns.split(' ').length}));
   expect(geometry.overflow).toBeLessThanOrEqual(0);expect(geometry.columns).toBe(viewport.width>900?3:1);
  }
 });
 test('expanded text spacing does not clip authored text or hide reading links',async({page})=>{
  await page.setViewportSize({width:390,height:844});
  await page.addStyleTag({content:'.lgo-news-article p {line-height:1.8!important;letter-spacing:.12em!important;word-spacing:.16em!important;}'});
  const root=page.locator('.lgo-news-article');await expect(root).toBeVisible();expect(await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth)).toBeLessThanOrEqual(0);
  for(const field of await root.locator('.lgo-article-instruction,.lgo-article-outcome p,.lgo-article-boundary p').all()){
   expect(await field.evaluate(e=>e.scrollHeight<=e.clientHeight+1&&getComputedStyle(e).webkitLineClamp==='none')).toBe(true);
  }
  await root.locator('.lgo-news-article-action').last().focus();await page.keyboard.press('Enter');await expect(page).toHaveURL(origin+'/support');
 });

 test('world loop destination exposes all four real source steps without saving gameplay progress',async({page})=>{
  await page.locator('.lgo-news-article-action[href="/game/loop"]').click();await expect(page).toHaveURL(origin+'/game/loop');
  const journey=page.locator('#loop-reading .lgo-reading-journey'),buttons=journey.locator('.lgo-progress-step button');await expect(buttons).toHaveCount(gameplayLoopStages.length);expect(gameplayLoopStages.length).toBe(4);
  await expect(journey.getByRole('status')).toContainText('1/4');await expect(journey.getByRole('button',{name:'Bước trước',exact:true})).toBeDisabled();
  await page.waitForLoadState('networkidle');const requests:string[]=[];page.on('request',r=>{if(r.method()!=='GET'||['fetch','xhr'].includes(r.resourceType()))requests.push(r.url());});const storage=()=>page.evaluate(()=>({local:{...localStorage},session:{...sessionStorage}}));const before=await storage();
  for(const [i,stage]of gameplayLoopStages.entries()){
   const button=buttons.nth(i);await button.focus();await page.keyboard.press('Space');await expect(button).toBeFocused();await expect(button).toHaveAttribute('aria-pressed','true');await expect(journey.locator('[aria-current=step]')).toHaveCount(1);await expect(journey.getByRole('status')).toContainText(`${i+1}/4`);
   await expect(journey.locator('.lgo-reading-journey-panel')).toContainText(stage.expectedFeeling);await expect(journey.locator('.lgo-reading-journey-panel')).toContainText(stage.currentBoundary);await expect(journey.locator('.lgo-reading-journey-panel a')).toHaveAttribute('href',stage.route);
  }
  await expect(journey.getByRole('button',{name:'Bước tiếp',exact:true})).toBeDisabled();await expect(journey.locator('[data-state=complete]')).toHaveCount(0);await expect(journey).toContainText('không lưu tiến trình nhân vật');expect(requests).toEqual([]);expect(await storage()).toEqual(before);
  await page.screenshot({path:test.info().outputPath('world-loop-from-news.png')});await page.reload();await expect(journey.getByRole('status')).toContainText('1/4');await page.goBack();await expect(page).toHaveURL(origin+route);
 });
 test('guide destination retains all four source chapters and real keyboard arrival without a game simulation',async({page})=>{
  const href='/guides/world-gameplay-loop-guide';await page.locator(`.lgo-news-article-action[href="${href}"]`).focus();await page.keyboard.press('Enter');await expect(page).toHaveURL(origin+href);
  const steps=guideDetailSteps.filter(s=>s.slug==='world-gameplay-loop-guide');expect(steps).toHaveLength(4);
  const nav=page.getByRole('navigation',{name:'Mục lục vòng lặp thế giới'});await expect(nav.getByRole('link')).toHaveCount(steps.length);
  for(const step of steps){const part=page.locator(`#world-loop-step-${step.step}`);await expect(part.locator('h2')).toHaveText(step.title);await expect(part.locator('.lgo-article-instruction')).toHaveText(step.action);await expect(part.locator('.lgo-article-outcome p')).toHaveText(step.expectedResult);await expect(part.locator('.lgo-article-boundary p')).toHaveText(step.blockedScope);}
  await page.waitForLoadState('networkidle');const requests:string[]=[];page.on('request',r=>{if(r.method()!=='GET'||['fetch','xhr'].includes(r.resourceType()))requests.push(r.url());});await nav.getByRole('link').last().focus();await page.keyboard.press('Enter');const target=page.locator(`#world-loop-step-${steps.at(-1)!.step}`);await expect(target).toBeFocused();
  await expect.poll(()=>target.evaluate(e=>e.getBoundingClientRect().top>=document.querySelector('header')!.getBoundingClientRect().bottom&&e.getBoundingClientRect().top<innerHeight-50)).toBe(true);
  await expect(page.locator('main canvas,main form,main [role=progressbar],main a[download]')).toHaveCount(0);expect(requests).toEqual([]);await page.screenshot({path:test.info().outputPath('world-guide-from-news.png')});await page.goBack();await expect(page).toHaveURL(origin+href);await page.goBack();await expect(page).toHaveURL(origin+route);
 });

});
