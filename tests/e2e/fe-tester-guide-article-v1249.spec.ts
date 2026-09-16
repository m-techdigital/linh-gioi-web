import { test, expect } from '@playwright/test';
import { contentEntries, guideDetailSteps } from '../../packages/content/src/fixtures';
const origin = process.env.LGO_WEB_URL ?? 'http://127.0.0.1:3000';
const route = '/guides/closed-tester-information-pack-guide';
const entry = contentEntries.find(item => item.slug === 'closed-tester-information-pack-guide')!;
const steps = guideDetailSteps.filter(item => item.slug === entry.slug);

test.describe('closed-tester guide explains preparation, not registration v1.249', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(origin + route);
    await expect(page.getByRole('heading', { level: 1, name: entry.title, exact: true })).toBeVisible();
  });
  test('four full article chapters and responsive contents replace compact proof boards', async ({ page, isMobile }) => {
    const guide = page.locator('.lgo-tester-guide');
    await expect(guide).toBeVisible();
    await expect(guide.locator('.lgo-guide-article-section')).toHaveCount(4);
    await expect(guide.locator('img[src*=design-reference],img[src*=design-boards],.lgo-detail-next-steps')).toHaveCount(0);
    const boxes = await guide.evaluate(root => {
      const contents = root.querySelector('.lgo-article-contents')!.getBoundingClientRect();
      const body = root.querySelector('.lgo-guide-article-body')!.getBoundingClientRect();
      const image = root.querySelector('.lgo-article-cover img') as HTMLImageElement;
      return { contents: contents.toJSON(), body: body.toJSON(), loaded: image.complete && image.naturalWidth > 0, overflow: document.documentElement.scrollWidth - innerWidth };
    });
    expect(boxes.loaded).toBe(true); expect(boxes.overflow).toBeLessThanOrEqual(0);
    if (isMobile) expect(boxes.body.top).toBeGreaterThanOrEqual(boxes.contents.bottom);
    else expect(boxes.body.left).toBeGreaterThan(boxes.contents.right);
    await page.screenshot({ path: test.info().outputPath('tester-guide-article.png'), fullPage: true });
  });
  test('original summary body and all four instruction result boundary records are exact', async ({ page }) => {
    const guide = page.locator('.lgo-tester-guide'); await expect(guide).toBeVisible();
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
    const contents = page.getByRole('navigation', { name: 'Mục lục chuẩn bị thông tin tester' });
    const links = contents.locator('a'); await expect(links).toHaveCount(4);
    await links.nth(1).focus(); await page.keyboard.press('Enter'); await expect(page.locator('#tester-guide-step-02')).toBeFocused();
    await page.locator('#tester-guide-step-02').getByRole('link', { name: /Phần tiếp/ }).click();
    await expect(page).toHaveURL(origin + route + '#tester-guide-step-03'); await expect(page.locator('#tester-guide-step-03')).toBeFocused();
    await page.goBack(); await expect(page).toHaveURL(origin + route + '#tester-guide-step-02');
    await page.goForward(); await expect(page).toHaveURL(origin + route + '#tester-guide-step-03');
    await page.locator('#tester-guide-step-03').getByRole('link', { name: 'Về mục lục', exact: true }).click();
    await expect(page.locator('#tester-guide-contents')).toBeFocused();
    const summary = page.locator('#tester-guide-contents summary'); await summary.focus(); await page.keyboard.press('Space');
    await expect(contents).not.toBeVisible(); await page.keyboard.press('Enter'); await expect(contents).toBeVisible();
  });
  test('cold direct URLs land visibly at the requested chapter and malformed fragments are harmless', async ({ page }) => {
    await page.goto('about:blank'); await page.goto(origin + route + '#tester-guide-step-03', { waitUntil: 'networkidle' });
    const section = page.locator('#tester-guide-step-03'); await expect(section).toBeFocused();
    await expect.poll(async () => { const box = await section.boundingBox(); return !!box && box.y >= 70 && box.y <= 600; }).toBe(true);
    const errors: string[] = []; page.on('pageerror', error => errors.push(error.message));
    await page.goto('about:blank'); await page.goto(origin + route + '#%E0%A4%A', { waitUntil: 'networkidle' });
    await expect(page.locator('.lgo-guide-article-section')).toHaveCount(4); expect(errors).toEqual([]);
  });
  test('chapter actions and related destinations navigate to existing guidance, not commands', async ({ page }) => {
    const actions = page.locator('.lgo-tester-guide-action'); await expect(actions).toHaveCount(9);
    const routes = ['/release/tester-pack#tester-checklist', '/release/tester-pack#tester-device', '/release/tester-pack#tester-feedback', '/support/safety', '/release/tester-pack#tester-limits', '/status', '/release/readiness', '/download/trust', '/support/safety'];
    for (let i = 0; i < routes.length; i++) {
      await expect(actions.nth(i)).toHaveAttribute('href', routes[i]!);
      expect((await page.request.get(origin + routes[i])).status()).toBe(200);
    }
    await expect(actions.nth(1)).toHaveAttribute('href','/release/tester-pack#tester-device');
    await actions.last().click(); await expect(page).toHaveURL(origin + '/support/safety');
  });
  test('source paper typography and actions remain legible at 320px with visible focus', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 800 });
    const guide = page.locator('.lgo-tester-guide'); await expect(guide).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(0);
    const style = await guide.locator('.lgo-article-instruction').first().evaluate(e => ({ font: parseFloat(getComputedStyle(e).fontSize), color: getComputedStyle(e).color, ink: getComputedStyle(document.documentElement).getPropertyValue('--lgo-color-art-ink').trim() }));
    expect(style.font).toBeGreaterThanOrEqual(14); expect(style.color).toBe('rgb(7, 19, 28)');
    for (const link of await guide.locator('.lgo-article-section-navigation a,.lgo-tester-guide-action').all()) expect((await link.boundingBox())!.height).toBeGreaterThanOrEqual(44);
    const action = guide.locator('.lgo-tester-guide-action').first(); await action.focus(); await expect(action).toBeFocused();
    expect(await action.evaluate(e => getComputedStyle(e).outlineStyle)).not.toBe('none');
    await page.addScriptTag({ path: 'node_modules/axe-core/axe.min.js' });
    const violations = await page.evaluate(async () => { const axe = (window as unknown as { axe: { run: (e: Element | null, o: unknown) => Promise<{ violations: { id: string }[] }> } }).axe; return (await axe.run(document.querySelector('main'), { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa'] } })).violations.map(v => v.id); });
    expect(violations).toEqual([]);
  });
  test('reading has no submission saved progress access award or gameplay surrogate', async ({ page }) => {
    const guide = page.locator('.lgo-tester-guide'); await expect(guide).toBeVisible();
    await expect(guide).toContainText('Hướng dẫn chuẩn bị, không phải form đăng ký'); await expect(guide).toContainText('NO_ACCEPTED_BACKEND_CONTRACT');
    await expect(guide.locator('canvas,video,iframe,form,input,textarea,[role=progressbar],a[download]')).toHaveCount(0);
    const requests: string[] = []; page.on('request', r => { if (r.method() !== 'GET' || ['xhr', 'fetch'].includes(r.resourceType())) requests.push(r.url()); });
    await page.getByRole('navigation', { name: 'Mục lục chuẩn bị thông tin tester' }).locator('a').first().click();
    await page.locator('#tester-guide-step-01').getByRole('link', { name: /Phần tiếp/ }).click();
    expect(requests).toEqual([]); await expect(page.locator('main h1')).toHaveCount(1);
    await expect(guide.locator('.lgo-article-boundary').nth(1)).toContainText('Chưa có hộp ticket bảo mật');
    await expect(guide.locator('.lgo-article-boundary').last()).toContainText('Chưa có bỏ qua phê duyệt owner');
    expect(await guide.innerText()).not.toMatch(/\b[a-f0-9]{64}\b/i);
    for (const a of await guide.getByRole('link').all()) expect(await a.getAttribute('href')).toMatch(/^(?:#|\/)/);
  });

  test('three owner-boundary destinations keep their full keyboard order', async ({ page }) => {
    const group = page.getByRole('navigation', { name: 'Đối chiếu điều kiện trước khi gửi phản hồi', exact: true });
    const links = group.getByRole('link'); await expect(links).toHaveCount(3);
    await links.first().focus(); await page.keyboard.press('Tab'); await expect(links.nth(1)).toBeFocused();
    await page.keyboard.press('Tab'); await expect(links.nth(2)).toBeFocused();
    await page.keyboard.press('Enter'); await expect(page).toHaveURL(origin + '/support/safety');
    await page.goBack(); await expect(group).toBeVisible();
  });
  test('four tester destinations arrive on screen and transfer keyboard focus to real controls', async ({ page }) => {
    for (const [index, id] of [[0,'tester-checklist'],[1,'tester-device'],[2,'tester-feedback'],[4,'tester-limits']] as const) {
      await page.locator('.lgo-tester-guide-action').nth(index).focus(); await page.keyboard.press('Enter');
      await expect(page).toHaveURL(origin + '/release/tester-pack#' + id);
      const target = page.locator('#' + id); await expect(target).toBeFocused();
      await expect.poll(() => target.evaluate(e => {const box=e.getBoundingClientRect(),header=document.querySelector('header')!.getBoundingClientRect();return box.top>=header.bottom&&box.top<innerHeight-50;})).toBe(true);
      await expect(page.locator('#tester-checklist input:checked')).toHaveCount(0);
      await page.screenshot({path:test.info().outputPath(id+'-arrival.png')});
      await page.keyboard.press('Tab');
      expect(await target.evaluate(e => e !== document.activeElement && e.contains(document.activeElement))).toBe(true);
      await page.goBack(); await expect(page.locator('.lgo-tester-guide')).toBeVisible();
    }
  });
  test('losing the illustration does not hide source guidance or simulate a tester invitation', async ({ page }) => {
    await page.route('**/game-art/**', request => request.abort());
    await page.goto('about:blank'); await page.goto(origin + route, { waitUntil: 'networkidle' });
    const guide = page.locator('.lgo-tester-guide'); await expect(guide).toBeVisible();
    await expect(guide.locator('.lgo-article-cover figcaption')).toContainText('Tranh minh họa');
    await expect(guide.locator('.lgo-article-cover figcaption')).toContainText('Không phải lời mời thử nghiệm');
    await expect(guide.locator('.lgo-guide-article-section')).toHaveCount(4);
    await expect(guide.locator('.lgo-hero-lead')).toHaveText(entry.summary);
    await page.getByRole('navigation', { name: 'Mục lục chuẩn bị thông tin tester' }).locator('a').last().click();
    await expect(page.locator('#tester-guide-step-04')).toBeFocused();
    await expect(page.locator('#tester-guide-step-04 .lgo-article-instruction')).toHaveText(steps[3]!.action);
    await expect(guide.locator('form,input,textarea,iframe,[role=progressbar],a[download]')).toHaveCount(0);
  });
});
