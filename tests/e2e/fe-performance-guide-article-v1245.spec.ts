import { test, expect } from '@playwright/test';
import { contentEntries, guideDetailSteps } from '../../packages/content/src/fixtures';
const origin = process.env.LGO_WEB_URL ?? 'http://127.0.0.1:3000';
const route = '/guides/performance-copy-budget-guide';
const entry = contentEntries.find(item => item.slug === 'performance-copy-budget-guide')!;
const steps = guideDetailSteps.filter(item => item.slug === entry.slug);

test.describe('performance guide explains reading, not measured production speed v1.245', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(origin + route);
    await expect(page.getByRole('heading', { level: 1, name: entry.title, exact: true })).toBeVisible();
  });
  test('four full article chapters and responsive contents replace compact proof boards', async ({ page, isMobile }) => {
    const guide = page.locator('.lgo-performance-guide');
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
    await page.screenshot({ path: test.info().outputPath('performance-guide-article.png'), fullPage: true });
  });
  test('original summary body and all four instruction result boundary records are exact', async ({ page }) => {
    const guide = page.locator('.lgo-performance-guide'); await expect(guide).toBeVisible();
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
    const contents = page.getByRole('navigation', { name: 'Mục lục giữ web nhẹ và rõ' });
    const links = contents.locator('a'); await expect(links).toHaveCount(4);
    await links.nth(1).focus(); await page.keyboard.press('Enter'); await expect(page.locator('#performance-guide-step-02')).toBeFocused();
    await page.locator('#performance-guide-step-02').getByRole('link', { name: /Phần tiếp/ }).click();
    await expect(page).toHaveURL(origin + route + '#performance-guide-step-03'); await expect(page.locator('#performance-guide-step-03')).toBeFocused();
    await page.goBack(); await expect(page).toHaveURL(origin + route + '#performance-guide-step-02');
    await page.goForward(); await expect(page).toHaveURL(origin + route + '#performance-guide-step-03');
    await page.locator('#performance-guide-step-03').getByRole('link', { name: 'Về mục lục', exact: true }).click();
    await expect(page.locator('#performance-guide-contents')).toBeFocused();
    const summary = page.locator('#performance-guide-contents summary'); await summary.focus(); await page.keyboard.press('Space');
    await expect(contents).not.toBeVisible(); await page.keyboard.press('Enter'); await expect(contents).toBeVisible();
  });
  test('cold direct URLs land visibly at the requested chapter and malformed fragments are harmless', async ({ page }) => {
    await page.goto('about:blank'); await page.goto(origin + route + '#performance-guide-step-03', { waitUntil: 'networkidle' });
    const section = page.locator('#performance-guide-step-03'); await expect(section).toBeFocused();
    await expect.poll(async () => { const box = await section.boundingBox(); return !!box && box.y >= 70 && box.y <= 600; }).toBe(true);
    const errors: string[] = []; page.on('pageerror', error => errors.push(error.message));
    await page.goto('about:blank'); await page.goto(origin + route + '#%E0%A4%A', { waitUntil: 'networkidle' });
    await expect(page.locator('.lgo-guide-article-section')).toHaveCount(4); expect(errors).toEqual([]);
  });
  test('chapter actions and related destinations navigate to existing guidance, not commands', async ({ page }) => {
    const actions = page.locator('.lgo-performance-guide-action'); await expect(actions).toHaveCount(6);
    const routes = ['/guides', '/performance#performance-preview', '/status', '/download/trust', '/release/readiness', '/support/safety'];
    for (let i = 0; i < routes.length; i++) {
      await expect(actions.nth(i)).toHaveAttribute('href', routes[i]!);
      expect((await page.request.get(origin + routes[i])).status()).toBe(200);
    }
    await expect(actions.nth(1)).toHaveAttribute('href','/performance#performance-preview');
    await actions.last().click(); await expect(page).toHaveURL(origin + '/support/safety');
  });
  test('source paper typography and actions remain legible at 320px with visible focus', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 800 });
    const guide = page.locator('.lgo-performance-guide'); await expect(guide).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(0);
    const style = await guide.locator('.lgo-article-instruction').first().evaluate(e => ({ font: parseFloat(getComputedStyle(e).fontSize), color: getComputedStyle(e).color, ink: getComputedStyle(document.documentElement).getPropertyValue('--lgo-color-art-ink').trim() }));
    expect(style.font).toBeGreaterThanOrEqual(14); expect(style.color).toBe('rgb(7, 19, 28)');
    for (const link of await guide.locator('.lgo-article-section-navigation a,.lgo-performance-guide-action').all()) expect((await link.boundingBox())!.height).toBeGreaterThanOrEqual(44);
    const action = guide.locator('.lgo-performance-guide-action').first(); await action.focus(); await expect(action).toBeFocused();
    expect(await action.evaluate(e => getComputedStyle(e).outlineStyle)).not.toBe('none');
    await page.addScriptTag({ path: 'node_modules/axe-core/axe.min.js' });
    const violations = await page.evaluate(async () => { const axe = (window as unknown as { axe: { run: (e: Element | null, o: unknown) => Promise<{ violations: { id: string }[] }> } }).axe; return (await axe.run(document.querySelector('main'), { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa'] } })).violations.map(v => v.id); });
    expect(violations).toEqual([]);
  });
  test('reading has no submission saved progress access award or gameplay surrogate', async ({ page }) => {
    const guide = page.locator('.lgo-performance-guide'); await expect(guide).toBeVisible();
    await expect(guide).toContainText('Bài hướng dẫn cách đọc, không phải kết quả đo tốc độ'); await expect(guide).toContainText('NO_ACCEPTED_BACKEND_CONTRACT');
    await expect(guide.locator('canvas,video,iframe,form,input,textarea,[role=progressbar],a[download]')).toHaveCount(0);
    const requests: string[] = []; page.on('request', r => { if (r.method() !== 'GET' || ['xhr', 'fetch'].includes(r.resourceType())) requests.push(r.url()); });
    await page.getByRole('navigation', { name: 'Mục lục giữ web nhẹ và rõ' }).locator('a').first().click();
    await page.locator('#performance-guide-step-01').getByRole('link', { name: /Phần tiếp/ }).click();
    expect(requests).toEqual([]); await expect(page.locator('main h1')).toHaveCount(1);
    expect(await guide.innerText()).not.toMatch(/\b[a-f0-9]{64}\b/i);
    for (const a of await guide.getByRole('link').all()) expect(await a.getAttribute('href')).toMatch(/^(?:#|\/)/);
  });
  test('shared priority panel exposes all four source principles without fetching illustration assets', async ({ page }) => {
    const images: string[] = [];
    page.on('request', request => { if (request.resourceType() === 'image' && !request.url().includes('favicon')) images.push(request.url()); });
    await page.route('**/game-art/**', request => request.abort());
    await page.goto('about:blank'); await page.goto(origin + route, { waitUntil: 'networkidle' });
    const guide = page.locator('.lgo-performance-guide'); await expect(guide).toBeVisible();
    const panel = guide.locator('.lgo-performance-priority-console'); await expect(panel).toBeVisible();
    await expect(panel.locator('li strong')).toHaveText(steps.map(step => step.title));
    await expect(panel.locator('li > span')).toHaveText(steps.map(step => step.step));
    await expect(guide.locator('img,picture,video,canvas')).toHaveCount(0);
    expect(images).toEqual([]);
    await expect(panel).toContainText('không phải điểm số');
    const style = await panel.getByRole('heading', { level: 2 }).evaluate(e => getComputedStyle(e).color);
    expect(style).not.toBe('rgba(0, 0, 0, 0)');
  });
  test('reading groups retain keyboard order and the illustration link opens the existing workshop', async ({ page }) => {
    const group = page.getByRole('navigation', { name: 'Đối chiếu ranh giới trước hành động', exact: true });
    const links = group.getByRole('link'); await expect(links).toHaveCount(3);
    await links.first().focus(); await page.keyboard.press('Tab'); await expect(links.nth(1)).toBeFocused();
    await page.keyboard.press('Enter'); await expect(page).toHaveURL(origin + '/release/readiness');
    await page.goBack(); await expect(group).toBeVisible();
    await page.locator('.lgo-performance-guide-action').nth(1).click();
    await expect(page).toHaveURL(origin + '/performance#performance-preview');
    await expect(page.locator('#performance-preview')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Thoáng hơn', exact: true })).toBeVisible();
  });

});
