import { test, expect } from '@playwright/test';
import { contentEntries, guideDetailSteps } from '../../packages/content/src/fixtures';
const origin = process.env.LGO_WEB_URL ?? 'http://127.0.0.1:3000';
const route = '/guides/release-readiness-hub-guide';
const entry = contentEntries.find(item => item.slug === 'release-readiness-hub-guide')!;
const steps = guideDetailSteps.filter(item => item.slug === entry.slug);

test.describe('readiness guide explains evidence, not owner approval v1.248', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(origin + route);
    await expect(page.getByRole('heading', { level: 1, name: entry.title, exact: true })).toBeVisible();
  });
  test('four full article chapters and responsive contents replace compact proof boards', async ({ page, isMobile }) => {
    const guide = page.locator('.lgo-readiness-guide');
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
    await page.screenshot({ path: test.info().outputPath('readiness-guide-article.png'), fullPage: true });
  });
  test('original summary body and all four instruction result boundary records are exact', async ({ page }) => {
    const guide = page.locator('.lgo-readiness-guide'); await expect(guide).toBeVisible();
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
    const contents = page.getByRole('navigation', { name: 'Mục lục kiểm sẵn sàng phát hành' });
    const links = contents.locator('a'); await expect(links).toHaveCount(4);
    await links.nth(1).focus(); await page.keyboard.press('Enter'); await expect(page.locator('#readiness-guide-step-02')).toBeFocused();
    await page.locator('#readiness-guide-step-02').getByRole('link', { name: /Phần tiếp/ }).click();
    await expect(page).toHaveURL(origin + route + '#readiness-guide-step-03'); await expect(page.locator('#readiness-guide-step-03')).toBeFocused();
    await page.goBack(); await expect(page).toHaveURL(origin + route + '#readiness-guide-step-02');
    await page.goForward(); await expect(page).toHaveURL(origin + route + '#readiness-guide-step-03');
    await page.locator('#readiness-guide-step-03').getByRole('link', { name: 'Về mục lục', exact: true }).click();
    await expect(page.locator('#readiness-guide-contents')).toBeFocused();
    const summary = page.locator('#readiness-guide-contents summary'); await summary.focus(); await page.keyboard.press('Space');
    await expect(contents).not.toBeVisible(); await page.keyboard.press('Enter'); await expect(contents).toBeVisible();
  });
  test('cold direct URLs land visibly at the requested chapter and malformed fragments are harmless', async ({ page }) => {
    await page.goto('about:blank'); await page.goto(origin + route + '#readiness-guide-step-03', { waitUntil: 'networkidle' });
    const section = page.locator('#readiness-guide-step-03'); await expect(section).toBeFocused();
    await expect.poll(async () => { const box = await section.boundingBox(); return !!box && box.y >= 70 && box.y <= 600; }).toBe(true);
    const errors: string[] = []; page.on('pageerror', error => errors.push(error.message));
    await page.goto('about:blank'); await page.goto(origin + route + '#%E0%A4%A', { waitUntil: 'networkidle' });
    await expect(page.locator('.lgo-guide-article-section')).toHaveCount(4); expect(errors).toEqual([]);
  });
  test('chapter actions and related destinations navigate to existing guidance, not commands', async ({ page }) => {
    const actions = page.locator('.lgo-readiness-guide-action'); await expect(actions).toHaveCount(7);
    const routes = ['/release/readiness', '/release/readiness', '/guides/release-trust-and-checksum-guide', '/download/trust', '/status', '/support/safety', '/release/tester-pack#tester-checklist'];
    for (let i = 0; i < routes.length; i++) {
      await expect(actions.nth(i)).toHaveAttribute('href', routes[i]!);
      expect((await page.request.get(origin + routes[i])).status()).toBe(200);
    }
    await expect(actions.nth(1)).toHaveAttribute('href','/release/readiness');
    await actions.last().click(); await expect(page).toHaveURL(origin + '/release/tester-pack#tester-checklist');
  });
  test('source paper typography and actions remain legible at 320px with visible focus', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 800 });
    const guide = page.locator('.lgo-readiness-guide'); await expect(guide).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(0);
    const style = await guide.locator('.lgo-article-instruction').first().evaluate(e => ({ font: parseFloat(getComputedStyle(e).fontSize), color: getComputedStyle(e).color, ink: getComputedStyle(document.documentElement).getPropertyValue('--lgo-color-art-ink').trim() }));
    expect(style.font).toBeGreaterThanOrEqual(14); expect(style.color).toBe('rgb(7, 19, 28)');
    for (const link of await guide.locator('.lgo-article-section-navigation a,.lgo-readiness-guide-action').all()) expect((await link.boundingBox())!.height).toBeGreaterThanOrEqual(44);
    const action = guide.locator('.lgo-readiness-guide-action').first(); await action.focus(); await expect(action).toBeFocused();
    expect(await action.evaluate(e => getComputedStyle(e).outlineStyle)).not.toBe('none');
    await page.addScriptTag({ path: 'node_modules/axe-core/axe.min.js' });
    const violations = await page.evaluate(async () => { const axe = (window as unknown as { axe: { run: (e: Element | null, o: unknown) => Promise<{ violations: { id: string }[] }> } }).axe; return (await axe.run(document.querySelector('main'), { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa'] } })).violations.map(v => v.id); });
    expect(violations).toEqual([]);
  });
  test('reading has no submission saved progress access award or gameplay surrogate', async ({ page }) => {
    const guide = page.locator('.lgo-readiness-guide'); await expect(guide).toBeVisible();
    await expect(guide).toContainText('Bài hướng dẫn không phê duyệt phát hành hoặc mở quyền test'); await expect(guide).toContainText('NO_ACCEPTED_BACKEND_CONTRACT');
    await expect(guide.locator('canvas,video,iframe,form,input,textarea,[role=progressbar],a[download]')).toHaveCount(0);
    const requests: string[] = []; page.on('request', r => { if (r.method() !== 'GET' || ['xhr', 'fetch'].includes(r.resourceType())) requests.push(r.url()); });
    await page.getByRole('navigation', { name: 'Mục lục kiểm sẵn sàng phát hành' }).locator('a').first().click();
    await page.locator('#readiness-guide-step-01').getByRole('link', { name: /Phần tiếp/ }).click();
    expect(requests).toEqual([]); await expect(page.locator('main h1')).toHaveCount(1);
    await expect(guide.locator('.lgo-article-boundary').nth(1)).toContainText('Chưa có bypass phê duyệt, checksum thật');
    await expect(guide.locator('.lgo-article-boundary').last()).toContainText('Chưa có đăng ký mở, phần thưởng/kinh tế');
    expect(await guide.innerText()).not.toMatch(/\b[a-f0-9]{64}\b/i);
    for (const a of await guide.getByRole('link').all()) expect(await a.getAttribute('href')).toMatch(/^(?:#|\/)/);
  });

  test('four source chapter shortcuts restore focus without pretending to be gate states', async ({ page }) => {
    const panel = page.locator('.lgo-readiness-guide .lgo-performance-priority-console'); await expect(panel).toBeVisible();
    const links = panel.locator('li a'); await expect(links).toHaveCount(steps.length);
    await expect(links.locator('strong')).toHaveText(steps.map(step => step.title));
    await expect(panel).toContainText('không phải kết quả phê duyệt');
    await expect(panel.locator('[data-state],[role=progressbar],input,button')).toHaveCount(0);
    for (const [index, step] of steps.entries()) {
      await expect(links.nth(index)).toHaveAttribute('href', `#readiness-guide-step-${step.step}`);
      await links.nth(index).focus(); await page.keyboard.press('Enter');
      const section = page.locator(`#readiness-guide-step-${step.step}`); await expect(section).toBeFocused();
      await expect.poll(async () => { const box = await section.boundingBox(); const header = await page.locator('header').first().boundingBox(); return !!box && !!header && box.y >= header.y + header.height && box.y <= 600; }).toBe(true);
      await section.getByRole('link', { name: 'Về mục lục', exact: true }).click(); await expect(page.locator('#readiness-guide-contents')).toBeFocused();
    }
    await page.setViewportSize({ width: 320, height: 800 });
    for (const a of await links.all()) expect((await a.boundingBox())!.height).toBeGreaterThanOrEqual(44);
    await links.first().focus(); await page.keyboard.press('Tab'); await expect(links.nth(1)).toBeFocused();
    await links.last().focus(); await page.keyboard.press('Tab'); await expect(page.locator('#readiness-guide-contents summary')).toBeFocused();
  });
  test('download status and support form a real keyboard-ordered set, not approval controls', async ({ page }) => {
    const group = page.getByRole('navigation', { name: 'Đọc Tải game, Trạng thái và Hỗ trợ cùng nhau', exact: true });
    const links = group.getByRole('link'); await expect(links).toHaveCount(3);
    for (const [index, path] of ['/download/trust', '/status', '/support/safety'].entries()) {
      await expect(links.nth(index)).toHaveAttribute('href', path);
      await links.nth(index).focus(); await page.keyboard.press('Enter'); await expect(page).toHaveURL(origin + path);
      await expect(page.locator('main h1')).toBeVisible(); await page.goBack(); await expect(group).toBeVisible();
    }
    await links.first().focus(); await page.keyboard.press('Tab'); await expect(links.nth(1)).toBeFocused();
    await page.keyboard.press('Tab'); await expect(links.nth(2)).toBeFocused();
    expect(await links.nth(2).evaluate(e => getComputedStyle(e).outlineStyle)).not.toBe('none');
  });
  test('gate and tester links reach usable existing evidence and preparation without approval', async ({ page }) => {
    const evidence = page.getByRole('navigation', { name: 'Đối chiếu cổng và bằng chứng bản tải', exact: true });
    await evidence.getByRole('link', { name: 'Mở bảng cổng phê duyệt', exact: true }).click();
    await expect(page).toHaveURL(origin + '/release/readiness');
    await page.getByRole('link', { name: 'Xem các cổng duyệt', exact: true }).click();
    const gate = page.locator('#owner-release-gates');
    await expect.poll(async () => { const box = await gate.boundingBox(); const header = await page.locator('header').first().boundingBox(); return !!box && !!header && box.y >= header.y + header.height && box.y < 450; }).toBe(true);
    await expect(gate.locator('.lgo-release-gate-card')).toHaveCount(4);
    await gate.locator('summary').first().click(); await expect(gate.locator('details').first()).toHaveAttribute('open', '');
    await gate.screenshot({ path: test.info().outputPath('readiness-gate-evidence.png') });
    await page.goto(origin + route);
    await page.getByRole('link', { name: 'Mở checklist chuẩn bị', exact: true }).click();
    const checklist = page.locator('#tester-checklist'); await expect(checklist).toBeFocused();
    await expect.poll(async () => { const box = await checklist.boundingBox(); const header = await page.locator('header').first().boundingBox(); return !!box && !!header && box.y >= header.y + header.height && box.y < 450; }).toBe(true);
    await expect(checklist.locator('input:checked')).toHaveCount(0);
    await page.screenshot({ path: test.info().outputPath('readiness-checklist-arrival.png') });
    await page.keyboard.press('Tab'); await expect(checklist.getByRole('checkbox').first()).toBeFocused();
    await page.keyboard.press('Space'); await expect(checklist.getByRole('status')).toContainText('1/4');
    await page.reload(); await expect(checklist.getByRole('status')).toContainText('0/4');
  });
});
