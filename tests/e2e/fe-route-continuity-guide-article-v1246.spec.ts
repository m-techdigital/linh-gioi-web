import { test, expect } from '@playwright/test';
import { contentEntries, guideDetailSteps } from '../../packages/content/src/fixtures';
const origin = process.env.LGO_WEB_URL ?? 'http://127.0.0.1:3000';
const route = '/guides/route-continuity-conversion-guide';
const entry = contentEntries.find(item => item.slug === 'route-continuity-conversion-guide')!;
const steps = guideDetailSteps.filter(item => item.slug === entry.slug);

test.describe('route continuity guide explains destinations without granting access v1.246', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(origin + route);
    await expect(page.getByRole('heading', { level: 1, name: entry.title, exact: true })).toBeVisible();
  });
  test('four full article chapters and responsive contents replace compact proof boards', async ({ page, isMobile }) => {
    const guide = page.locator('.lgo-route-continuity-guide');
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
    await page.screenshot({ path: test.info().outputPath('continuity-guide-article.png'), fullPage: true });
  });
  test('original summary body and all four instruction result boundary records are exact', async ({ page }) => {
    const guide = page.locator('.lgo-route-continuity-guide'); await expect(guide).toBeVisible();
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
    const contents = page.getByRole('navigation', { name: 'Mục lục đi tiếp đúng luồng đọc' });
    const links = contents.locator('a'); await expect(links).toHaveCount(4);
    await links.nth(1).focus(); await page.keyboard.press('Enter'); await expect(page.locator('#continuity-guide-step-02')).toBeFocused();
    await page.locator('#continuity-guide-step-02').getByRole('link', { name: /Phần tiếp/ }).click();
    await expect(page).toHaveURL(origin + route + '#continuity-guide-step-03'); await expect(page.locator('#continuity-guide-step-03')).toBeFocused();
    await page.goBack(); await expect(page).toHaveURL(origin + route + '#continuity-guide-step-02');
    await page.goForward(); await expect(page).toHaveURL(origin + route + '#continuity-guide-step-03');
    await page.locator('#continuity-guide-step-03').getByRole('link', { name: 'Về mục lục', exact: true }).click();
    await expect(page.locator('#continuity-guide-contents')).toBeFocused();
    const summary = page.locator('#continuity-guide-contents summary'); await summary.focus(); await page.keyboard.press('Space');
    await expect(contents).not.toBeVisible(); await page.keyboard.press('Enter'); await expect(contents).toBeVisible();
  });
  test('cold direct URLs land visibly at the requested chapter and malformed fragments are harmless', async ({ page }) => {
    await page.goto('about:blank'); await page.goto(origin + route + '#continuity-guide-step-03', { waitUntil: 'networkidle' });
    const section = page.locator('#continuity-guide-step-03'); await expect(section).toBeFocused();
    await expect.poll(async () => { const box = await section.boundingBox(); return !!box && box.y >= 70 && box.y <= 600; }).toBe(true);
    const errors: string[] = []; page.on('pageerror', error => errors.push(error.message));
    await page.goto('about:blank'); await page.goto(origin + route + '#%E0%A4%A', { waitUntil: 'networkidle' });
    await expect(page.locator('.lgo-guide-article-section')).toHaveCount(4); expect(errors).toEqual([]);
  });
  test('chapter actions and related destinations navigate to existing guidance, not commands', async ({ page }) => {
    const actions = page.locator('.lgo-route-continuity-guide-action'); await expect(actions).toHaveCount(6);
    const routes = ['/start', '/journey', '/game/loop', '/download/trust', '/status', '/support/safety'];
    for (let i = 0; i < routes.length; i++) {
      await expect(actions.nth(i)).toHaveAttribute('href', routes[i]!);
      expect((await page.request.get(origin + routes[i])).status()).toBe(200);
    }
    await expect(actions.nth(1)).toHaveAttribute('href','/journey');
    await actions.last().click(); await expect(page).toHaveURL(origin + '/support/safety');
  });
  test('source paper typography and actions remain legible at 320px with visible focus', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 800 });
    const guide = page.locator('.lgo-route-continuity-guide'); await expect(guide).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(0);
    const style = await guide.locator('.lgo-article-instruction').first().evaluate(e => ({ font: parseFloat(getComputedStyle(e).fontSize), color: getComputedStyle(e).color, ink: getComputedStyle(document.documentElement).getPropertyValue('--lgo-color-art-ink').trim() }));
    expect(style.font).toBeGreaterThanOrEqual(14); expect(style.color).toBe('rgb(7, 19, 28)');
    for (const link of await guide.locator('.lgo-article-section-navigation a,.lgo-route-continuity-guide-action').all()) expect((await link.boundingBox())!.height).toBeGreaterThanOrEqual(44);
    const action = guide.locator('.lgo-route-continuity-guide-action').first(); await action.focus(); await expect(action).toBeFocused();
    expect(await action.evaluate(e => getComputedStyle(e).outlineStyle)).not.toBe('none');
    await page.addScriptTag({ path: 'node_modules/axe-core/axe.min.js' });
    const violations = await page.evaluate(async () => { const axe = (window as unknown as { axe: { run: (e: Element | null, o: unknown) => Promise<{ violations: { id: string }[] }> } }).axe; return (await axe.run(document.querySelector('main'), { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa'] } })).violations.map(v => v.id); });
    expect(violations).toEqual([]);
  });
  test('reading has no submission saved progress access award or gameplay surrogate', async ({ page }) => {
    const guide = page.locator('.lgo-route-continuity-guide'); await expect(guide).toBeVisible();
    await expect(guide).toContainText('Các liên kết chỉ mở trang hướng dẫn, không cấp quyền chơi'); await expect(guide).toContainText('NO_ACCEPTED_BACKEND_CONTRACT');
    await expect(guide.locator('canvas,video,iframe,form,input,textarea,[role=progressbar],a[download]')).toHaveCount(0);
    const requests: string[] = []; page.on('request', r => { if (r.method() !== 'GET' || ['xhr', 'fetch'].includes(r.resourceType())) requests.push(r.url()); });
    await page.getByRole('navigation', { name: 'Mục lục đi tiếp đúng luồng đọc' }).locator('a').first().click();
    await page.locator('#continuity-guide-step-01').getByRole('link', { name: /Phần tiếp/ }).click();
    expect(requests).toEqual([]); await expect(page.locator('main h1')).toHaveCount(1);
    expect(await guide.innerText()).not.toMatch(/\b[a-f0-9]{64}\b/i);
    for (const a of await guide.getByRole('link').all()) expect(await a.getAttribute('href')).toMatch(/^(?:#|\/)/);
  });
  test('five linked waypoints follow the source summary and navigate to real pages', async ({ page }) => {
    const panel=page.getByRole('region', {name:'Năm đường đọc chính',exact:true});
    await expect(panel).toBeVisible();const links=panel.getByRole('link');await expect(links).toHaveCount(5);
    const routes=['/start','/game/loop','/download/trust','/status','/support/safety'];
    const labels=['Bắt đầu','Vòng lặp thế giới','Tin cậy tải game','Trạng thái','Hỗ trợ an toàn'];
    await expect(panel.locator('li strong')).toHaveText(labels);
    for (let i=0;i<routes.length;i++) {
      await expect(links.nth(i)).toHaveAttribute('href',routes[i]!);
      expect((await links.nth(i).boundingBox())!.height).toBeGreaterThanOrEqual(44);
      await links.nth(i).click();await expect(page).toHaveURL(origin+routes[i]);
      await expect(page.locator('main h1')).toHaveCount(1);
      await page.goBack();await expect(panel).toBeVisible();
    }
    await expect(panel).toContainText('không phải tiến trình tài khoản');
  });
  test('waypoint focus and grouped chapter links remain usable at 320px without a keyboard trap', async ({ page }) => {
    await page.setViewportSize({width:320,height:800});
    const panel=page.getByRole('region',{name:'Năm đường đọc chính',exact:true});
    const links=panel.getByRole('link');await expect(links).toHaveCount(5);
    await links.first().focus();await page.keyboard.press('Tab');await expect(links.nth(1)).toBeFocused();
    expect(await links.nth(1).evaluate(e=>getComputedStyle(e).outlineStyle)).not.toBe('none');
    await links.last().focus();await page.keyboard.press('Tab');await expect(page.locator('#continuity-guide-contents summary')).toBeFocused();
    const choices=page.getByRole('navigation',{name:'Đối chiếu tải game và trạng thái',exact:true}).getByRole('link');
    await expect(choices).toHaveCount(2);await choices.first().focus();await page.keyboard.press('Tab');await expect(choices.nth(1)).toBeFocused();
    await page.keyboard.press('Enter');await expect(page).toHaveURL(origin+'/status');
    await page.goBack();
    expect(await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth)).toBeLessThanOrEqual(0);
    await expect(page.locator('.lgo-route-continuity-guide img,.lgo-route-continuity-guide form')).toHaveCount(0);
  });
});
