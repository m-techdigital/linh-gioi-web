import { test, expect } from '@playwright/test';
import { contentEntries, guideDetailSteps } from '../../packages/content/src/fixtures';
const origin = process.env.LGO_WEB_URL ?? 'http://127.0.0.1:3000';
const route = '/guides/faq-search-helpfulness-guide';
const entry = contentEntries.find(item => item.slug === 'faq-search-helpfulness-guide')!;
const steps = guideDetailSteps.filter(item => item.slug === entry.slug);

test.describe('FAQ guide explains existing reading tools, not support intake v1.250', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(origin + route);
    await expect(page.getByRole('heading', { level: 1, name: entry.title, exact: true })).toBeVisible();
  });
  test('four full article chapters and responsive contents replace compact proof boards', async ({ page, isMobile }) => {
    const guide = page.locator('.lgo-faq-guide');
    await expect(guide).toBeVisible();
    await expect(guide.locator('.lgo-guide-article-section')).toHaveCount(4);
    await expect(guide.locator('img[src*=design-reference],img[src*=design-boards],.lgo-detail-next-steps')).toHaveCount(0);
    const boxes = await guide.evaluate(root => {
      const contents = root.querySelector('.lgo-article-contents')!.getBoundingClientRect();
      const body = root.querySelector('.lgo-guide-article-body')!.getBoundingClientRect();
      return { contents: contents.toJSON(), body: body.toJSON(), overflow: document.documentElement.scrollWidth - innerWidth };
    });
    expect(boxes.overflow).toBeLessThanOrEqual(0);
    if (isMobile) expect(boxes.body.top).toBeGreaterThanOrEqual(boxes.contents.bottom);
    else expect(boxes.body.left).toBeGreaterThan(boxes.contents.right);
    await page.screenshot({ path: test.info().outputPath('faq-guide-article.png'), fullPage: true });
  });
  test('original summary body and all four instruction result boundary records are exact', async ({ page }) => {
    const guide = page.locator('.lgo-faq-guide'); await expect(guide).toBeVisible();
    await expect(guide.locator('.lgo-hero-lead')).toHaveText(entry.summary);
    await expect(guide.locator('.lgo-guide-article-intro p')).toHaveText(entry.body);
    const chapters = guide.locator('.lgo-guide-article-section'); await expect(chapters).toHaveCount(steps.length);
    for (const [index, step] of steps.entries()) {
      const section = chapters.nth(index);
      await expect(section.getByRole('heading', { level: 2 })).toHaveText(step.title);
      await expect(section.locator('.lgo-article-instruction')).toHaveText(step.action);
      await expect(section.locator('.lgo-article-outcome p')).toHaveText(step.expectedResult);
      await expect(section.locator('.lgo-article-boundary p')).toHaveText(step.blockedScope);
      expect(await section.locator('.lgo-article-instruction').evaluate(e => getComputedStyle(e).webkitLineClamp)).toBe('none');
    }
  });
  test('native contents next previous and browser history follow the real chapter IDs', async ({ page }) => {
    const contents = page.getByRole('navigation', { name: 'Mục lục tìm FAQ hữu ích' });
    const links = contents.locator('a'); await expect(links).toHaveCount(4);
    await links.nth(1).focus(); await page.keyboard.press('Enter'); await expect(page.locator('#faq-guide-step-02')).toBeFocused();
    await page.locator('#faq-guide-step-02').getByRole('link', { name: /Phần tiếp/ }).click();
    await expect(page).toHaveURL(origin + route + '#faq-guide-step-03'); await expect(page.locator('#faq-guide-step-03')).toBeFocused();
    await page.goBack(); await expect(page).toHaveURL(origin + route + '#faq-guide-step-02');
    await page.goForward(); await expect(page).toHaveURL(origin + route + '#faq-guide-step-03');
    await page.locator('#faq-guide-step-03').getByRole('link', { name: 'Về mục lục', exact: true }).click();
    await expect(page.locator('#faq-guide-contents')).toBeFocused();
    const summary = page.locator('#faq-guide-contents summary'); await summary.focus(); await page.keyboard.press('Space');
    await expect(contents).not.toBeVisible(); await page.keyboard.press('Enter'); await expect(contents).toBeVisible();
  });
  test('cold direct URLs land visibly at the requested chapter and malformed fragments are harmless', async ({ page }) => {
    await page.goto('about:blank'); await page.goto(origin + route + '#faq-guide-step-03', { waitUntil: 'networkidle' });
    const section = page.locator('#faq-guide-step-03'); await expect(section).toBeFocused();
    await expect.poll(async () => { const box = await section.boundingBox(); return !!box && box.y >= 70 && box.y <= 600; }).toBe(true);
    const errors: string[] = []; page.on('pageerror', error => errors.push(error.message));
    await page.goto('about:blank'); await page.goto(origin + route + '#%E0%A4%A', { waitUntil: 'networkidle' });
    await expect(page.locator('.lgo-guide-article-section')).toHaveCount(4); expect(errors).toEqual([]);
  });
  test('chapter actions and related destinations navigate to existing guidance, not commands', async ({ page }) => {
    const actions = page.locator('.lgo-faq-guide-action'); await expect(actions).toHaveCount(9);
    const routes = ['/support/help#faq-answers', '/support', '/support/safety', '/download/trust', '/status', '/release/tester-pack', '/support/help#help-boundary', '/release/tester-pack#tester-feedback', '/support/safety'];
    for (let i = 0; i < routes.length; i++) {
      await expect(actions.nth(i)).toHaveAttribute('href', routes[i]!);
      expect((await page.request.get(origin + routes[i])).status()).toBe(200);
    }
    await expect(actions.nth(1)).toHaveAttribute('href','/support');
    await actions.last().click(); await expect(page).toHaveURL(origin + '/support/safety');
  });
  test('source paper typography and actions remain legible at 320px with visible focus', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 800 });
    const guide = page.locator('.lgo-faq-guide'); await expect(guide).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(0);
    const style = await guide.locator('.lgo-article-instruction').first().evaluate(e => ({ font: parseFloat(getComputedStyle(e).fontSize), color: getComputedStyle(e).color, ink: getComputedStyle(document.documentElement).getPropertyValue('--lgo-color-art-ink').trim() }));
    expect(style.font).toBeGreaterThanOrEqual(14); expect(style.color).toBe('rgb(7, 19, 28)');
    for (const link of await guide.locator('.lgo-article-section-navigation a,.lgo-faq-guide-action').all()) expect((await link.boundingBox())!.height).toBeGreaterThanOrEqual(44);
    const action = guide.locator('.lgo-faq-guide-action').first(); await action.focus(); await expect(action).toBeFocused();
    expect(await action.evaluate(e => getComputedStyle(e).outlineStyle)).not.toBe('none');
    await page.addScriptTag({ path: 'node_modules/axe-core/axe.min.js' });
    const violations = await page.evaluate(async () => { const axe = (window as unknown as { axe: { run: (e: Element | null, o: unknown) => Promise<{ violations: { id: string }[] }> } }).axe; return (await axe.run(document.querySelector('main'), { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa'] } })).violations.map(v => v.id); });
    expect(violations).toEqual([]);
  });
  test('reading has no submission saved progress access award or gameplay surrogate', async ({ page }) => {
    const guide = page.locator('.lgo-faq-guide'); await expect(guide).toBeVisible();
    await expect(guide).toContainText('Cẩm nang không phải tìm kiếm trực tuyến hoặc kênh nhận phản hồi'); await expect(guide).toContainText('NO_ACCEPTED_BACKEND_CONTRACT');
    await expect(guide.locator('canvas,video,iframe,form,input,textarea,[role=progressbar],a[download]')).toHaveCount(0);
    const requests: string[] = []; page.on('request', r => { if (r.method() !== 'GET' || ['xhr', 'fetch'].includes(r.resourceType())) requests.push(r.url()); });
    await page.getByRole('navigation', { name: 'Mục lục tìm FAQ hữu ích' }).locator('a').first().click();
    await page.locator('#faq-guide-step-01').getByRole('link', { name: /Phần tiếp/ }).click();
    expect(requests).toEqual([]); await expect(page.locator('main h1')).toHaveCount(1);
    await expect(guide.locator('.lgo-article-boundary').nth(1)).toContainText('Chưa có tuyến phiếu hỗ trợ, chatbot hỗ trợ');
    await expect(guide.locator('.lgo-article-boundary').last()).toContainText('Chưa có tiếp nhận trực tuyến, SLA hỗ trợ production');
    expect(await guide.innerText()).not.toMatch(/\b[a-f0-9]{64}\b/i);
    for (const a of await guide.getByRole('link').all()) expect(await a.getAttribute('href')).toMatch(/^(?:#|\/)/);
  });

  test('four source chapter shortcuts restore focus without duplicating search or support state', async ({ page }) => {
    const panel = page.locator('.lgo-faq-guide .lgo-performance-priority-console'); await expect(panel).toBeVisible();
    const links = panel.locator('li a'); await expect(links).toHaveCount(steps.length);
    await expect(links.locator('strong')).toHaveText(steps.map(step => step.title));
    await expect(panel).toContainText('không phải kết quả tìm kiếm');
    await expect(panel.locator('[data-state],[role=progressbar],input,button')).toHaveCount(0);
    for (const [index, step] of steps.entries()) {
      await expect(links.nth(index)).toHaveAttribute('href', `#faq-guide-step-${step.step}`);
      await links.nth(index).focus(); await page.keyboard.press('Enter');
      const section = page.locator(`#faq-guide-step-${step.step}`); await expect(section).toBeFocused();
      await expect.poll(async () => { const box = await section.boundingBox(); const header = await page.locator('header').first().boundingBox(); return !!box && !!header && box.y >= header.y + header.height && box.y <= 600; }).toBe(true);
      await section.getByRole('link', { name: 'Về mục lục', exact: true }).click(); await expect(page.locator('#faq-guide-contents')).toBeFocused();
    }
    await page.setViewportSize({ width: 320, height: 800 });
    for (const a of await links.all()) expect((await a.boundingBox())!.height).toBeGreaterThanOrEqual(44);
    await links.first().focus(); await page.keyboard.press('Tab'); await expect(links.nth(1)).toBeFocused();
    await links.last().focus(); await page.keyboard.press('Tab'); await expect(page.locator('#faq-guide-contents summary')).toBeFocused();
  });
  test('article opens the real local FAQ category controls, complete answers and onward link', async ({ page }) => {
    await page.locator('.lgo-faq-guide-action').first().click();
    await expect(page).toHaveURL(origin + '/support/help#faq-answers');
    const target=page.locator('#faq-answers'); await expect(target).toBeFocused();
    await expect.poll(async()=>{const b=await target.boundingBox(),h=await page.locator('header').first().boundingBox();return !!b&&!!h&&b.y>=h.y+h.height&&b.y<500;}).toBe(true);
    await page.keyboard.press('Tab'); await expect(target.getByRole('button',{name:'Tất cả',exact:true})).toBeFocused();
    const requests:string[]=[];page.on('request',r=>{if(r.method()!=='GET'||['xhr','fetch'].includes(r.resourceType()))requests.push(r.url());});
    const controls=target.getByRole('group',{name:'Chọn chủ đề câu hỏi'});
    for(const label of ['Tải game','Tham gia test','Báo lỗi an toàn','Tài khoản','Lối chơi','Ranh giới dữ liệu']){
      const button=controls.getByRole('button',{name:label,exact:true});await button.focus();await page.keyboard.press('Enter');
      await expect(button).toBeFocused();await expect(button).toHaveAttribute('aria-pressed','true');
      await expect(target.locator('.lgo-question-group:visible')).toHaveCount(1);await expect(target.getByRole('status')).toContainText('1/6');
    }
    await controls.getByRole('button',{name:'Tất cả',exact:true}).click();await expect(target.locator('.lgo-question-group:visible')).toHaveCount(6);
    await controls.getByRole('button',{name:'Tải game',exact:true}).click();
    const answer=page.locator('#faq-download details').first(),summary=answer.locator('summary');await summary.focus();await page.keyboard.press('Space');
    await expect(summary).toBeFocused();await expect(answer).toHaveAttribute('open','');await expect(answer).toContainText('Chưa.');
    expect(await answer.locator('.lgo-question-answer').evaluate(e=>getComputedStyle(e).webkitLineClamp)).toBe('none');expect(requests).toEqual([]);
    await page.screenshot({path:test.info().outputPath('faq-category-answer.png'),fullPage:false});
    await page.locator('#faq-download > .lgo-link-button').click();await expect(page).toHaveURL(origin+'/download/trust');
  });
  test('support choices preserve source order and search-boundary reading reaches the requested panel',async({page})=>{
    const group=page.getByRole('navigation',{name:'Đọc tiếp theo đúng vấn đề',exact:true}),links=group.getByRole('link');
    await expect(links).toHaveCount(5);
    for(const [i,path] of ['/support','/support/safety','/download/trust','/status','/release/tester-pack'].entries())await expect(links.nth(i)).toHaveAttribute('href',path);
    await links.first().focus();for(let i=1;i<5;i++){await page.keyboard.press('Tab');await expect(links.nth(i)).toBeFocused();}
    await page.locator('#faq-guide-step-03 .lgo-faq-guide-action').click();
    await expect(page).toHaveURL(origin+'/support/help#help-boundary');const target=page.locator('#help-boundary');await expect(target).toBeFocused();
    await expect.poll(async()=>{const b=await target.boundingBox(),h=await page.locator('header').first().boundingBox();return !!b&&!!h&&b.y>=h.y+h.height&&b.y<500;}).toBe(true);
    await expect(target).toContainText('không có tìm kiếm backend');await page.keyboard.press('Tab');await expect(target.getByRole('link')).toBeFocused();
    await page.keyboard.press('Enter');await expect(page).toHaveURL(origin+'/support/safety');
  });
  test('feedback guidance reuses the existing template without collecting user input',async({page})=>{
    const group=page.getByRole('navigation',{name:'Chuẩn bị phản hồi không chứa dữ liệu riêng tư',exact:true});
    await group.getByRole('link',{name:'Đọc mẫu phản hồi an toàn',exact:true}).click();
    await expect(page).toHaveURL(origin+'/release/tester-pack#tester-feedback');const target=page.locator('#tester-feedback');await expect(target).toBeFocused();
    await expect.poll(async()=>{const b=await target.boundingBox(),h=await page.locator('header').first().boundingBox();return !!b&&!!h&&b.y>=h.y+h.height&&b.y<500;}).toBe(true);
    await page.keyboard.press('Tab');await expect(target.getByRole('tab').first()).toBeFocused();
    await page.keyboard.press('End');await expect(target.getByRole('tab').last()).toBeFocused();await expect(target.getByRole('tab').last()).toHaveAttribute('aria-selected','true');
    await expect(target.locator('input,textarea,form')).toHaveCount(0);await expect(target).toContainText('không gửi phản hồi');
    await page.screenshot({path:test.info().outputPath('faq-feedback-reading.png'),fullPage:false});
  });
});
