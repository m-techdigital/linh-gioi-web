import { test, expect } from '@playwright/test';
import { contentEntries, guideDetailSteps } from '../../packages/content/src/fixtures';
const origin = process.env.LGO_WEB_URL ?? 'http://127.0.0.1:3000';
const route = '/guides/world-gameplay-loop-guide';
const steps = guideDetailSteps.filter(step => step.slug === 'world-gameplay-loop-guide');
const entry = contentEntries.find(item => item.slug === 'world-gameplay-loop-guide')!;

test.describe('world-loop guide article and native navigation v1.233', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(origin + route);
    await expect(page.getByRole('heading', { level: 1, name: entry.title, exact: true })).toBeVisible();
  });

  test('illustrated article has four complete sections and a responsive contents rail', async ({ page, isMobile }) => {
    await expect(page.locator('.lgo-guide-article-layout')).toBeVisible();
    await expect(page.locator('.lgo-guide-article-section')).toHaveCount(4);
    await expect(page.locator('.lgo-article-contents nav a')).toHaveCount(4);
    await expect(page.locator('main img[src*=design-reference],main img[src*=design-boards]')).toHaveCount(0);
    const metrics = await page.evaluate(() => {
      const rail = document.querySelector('.lgo-article-contents')!.getBoundingClientRect();
      const content = document.querySelector('.lgo-guide-article-body')!.getBoundingClientRect();
      const image = document.querySelector('.lgo-guide-article-hero img') as HTMLImageElement;
      return { rail: rail.toJSON(), content: content.toJSON(), loaded: image.complete && image.naturalWidth > 0,
        position: getComputedStyle(document.querySelector('.lgo-article-contents')!).position,
        overflow: document.documentElement.scrollWidth - innerWidth, h1Size: parseFloat(getComputedStyle(document.querySelector('h1')!).fontSize) };
    });
    expect(metrics.loaded).toBe(true); expect(metrics.overflow).toBeLessThanOrEqual(0);
    expect(metrics.h1Size).toBeLessThanOrEqual(isMobile ? 48 : 64);
    if (isMobile) expect(metrics.rail.bottom).toBeLessThanOrEqual(metrics.content.top);
    else {
      expect(metrics.position).toBe('sticky'); expect(metrics.rail.right).toBeLessThanOrEqual(metrics.content.left);
      await page.evaluate(() => scrollTo(0, 1500));
      const stickyTop = (await page.locator('.lgo-article-contents').boundingBox())!.y;
      expect(stickyTop).toBeGreaterThanOrEqual(70); expect(stickyTop).toBeLessThanOrEqual(180);
      await page.evaluate(() => scrollTo(0, 0));
    }
    await page.screenshot({ path: test.info().outputPath('guide-article.png'), fullPage: true });
  });

  test('all authored instructions expected results and scope boundaries are preserved', async ({ page }) => {
    const hub = page.locator('.lgo-world-loop-guide'); await expect(hub).toBeVisible();
    await expect(hub).toContainText(entry.summary); await expect(hub).toContainText(entry.body);
    for (const step of steps) {
      const section = page.locator(`#world-loop-step-${step.step}`);
      await expect(section.getByRole('heading', { level: 2, name: step.title, exact: true })).toBeVisible();
      for (const text of [step.action, step.expectedResult, step.blockedScope]) await expect(section).toContainText(text);
      const clipped = await section.locator('p').evaluateAll(nodes => nodes.filter(n => getComputedStyle(n).webkitLineClamp !== 'none' || n.scrollWidth > n.clientWidth + 1).map(n => n.textContent));
      expect(clipped).toEqual([]);
    }
    await expect(hub.locator('.lgo-article-section-navigation')).toHaveCount(4);
  });

  test('keyboard contents links focus the chapter and return to the contents without a trap', async ({ page }) => {
    const toc = page.getByRole('navigation', { name: 'Mục lục vòng lặp thế giới' });
    const link = toc.getByRole('link').nth(2); await link.focus(); await page.keyboard.press('Enter');
    await expect(page).toHaveURL(origin + route + '#world-loop-step-03');
    const target = page.locator('#world-loop-step-03'); await expect(target).toBeFocused();
    expect(await target.evaluate(e => e.matches(':target'))).toBe(true);
    const bounds = (await target.boundingBox())!; expect(bounds.y).toBeGreaterThanOrEqual(70);
    await page.keyboard.press('Tab');
    await expect(target.getByRole('link', { name: /Phần trước/ })).toBeFocused();
    await target.getByRole('link', { name: 'Về mục lục', exact: true }).click();
    await expect(page).toHaveURL(origin + route + '#world-loop-contents');
    await expect(page.locator('#world-loop-contents')).toBeFocused();
  });

  test('native fragment history and direct chapter URLs preserve the whole article', async ({ page }) => {
    // Force a document navigation: an already-open article only exercises native same-document scrolling.
    await page.goto('about:blank');
    await page.goto(origin + route + '#world-loop-step-04');
    const chapter = page.locator('#world-loop-step-04'); await expect(chapter).toBeVisible();
    await expect(chapter).toBeFocused();
    await expect.poll(() => chapter.evaluate(e => e.getBoundingClientRect().top), { message: 'A direct chapter URL must actually scroll into view after streaming' }).toBeLessThanOrEqual(600);
    expect((await chapter.boundingBox())!.y).toBeGreaterThanOrEqual(70);
    await expect(page.locator('.lgo-guide-article-section')).toHaveCount(4);
    const requests: string[] = []; page.on('request', r => { if (r.method() !== 'GET' || ['xhr', 'fetch'].includes(r.resourceType())) requests.push(r.url()); });
    await chapter.getByRole('link', { name: /Phần trước/ }).click(); await expect(page).toHaveURL(origin + route + '#world-loop-step-03');
    await page.goBack(); await expect(page).toHaveURL(origin + route + '#world-loop-step-04');
    await page.goForward(); await expect(page).toHaveURL(origin + route + '#world-loop-step-03');
    expect(requests).toEqual([]);
    await page.goto(origin + route + '#unknown-chapter'); await expect(page.locator('.lgo-guide-article-section')).toHaveCount(4);
    expect((await page.request.get(origin + '/guides/not-an-existing-lgo-guide')).status()).toBe(404);
  });

  test('contents disclosure and related routes are real keyboard and navigation controls', async ({ page }) => {
    const contents = page.locator('.lgo-article-contents details'), summary = contents.locator('summary');
    await expect(contents).toHaveAttribute('open', ''); await summary.focus(); await page.keyboard.press('Space');
    await expect(contents).not.toHaveAttribute('open', ''); await page.keyboard.press('Enter'); await expect(contents).toHaveAttribute('open', '');
    const related = page.locator('#world-loop-guide-related');
    for (const href of ['/game/loop', '/download/trust', '/support/safety']) {
      const link = related.locator(`a[href="${href}"]`); await expect(link).toBeVisible();
      expect((await link.boundingBox())!.height).toBeGreaterThanOrEqual(44);
      expect((await page.request.get(origin + href)).status()).toBe(200);
    }
    await related.locator('a[href="/game/loop"]').click(); await expect(page).toHaveURL(origin + '/game/loop');
  });

  test('article has coherent headings, readable narrow reflow and no game simulation', async ({ page }) => {
    const hub = page.locator('.lgo-world-loop-guide'); await expect(hub).toBeVisible();
    await expect(page.locator('main h1')).toHaveCount(1); await expect(hub).toContainText('NO_ACCEPTED_BACKEND_CONTRACT');
    await expect(hub.locator('canvas,video,iframe,form,input,textarea,[role=progressbar]')).toHaveCount(0);
    const badLabels = await hub.locator('[aria-labelledby]').evaluateAll(nodes => nodes.filter(n => (n.getAttribute('aria-labelledby') ?? '').split(/\s+/).some(id => !/^H[1-6]$/.test(document.getElementById(id)?.tagName ?? ''))).map(n => n.getAttribute('aria-labelledby')));
    expect(badLabels).toEqual([]);
    await page.addScriptTag({ path: 'node_modules/axe-core/axe.min.js' });
    const violations = await page.evaluate(async () => {
      const axe = (window as unknown as { axe: { run: (n: Element | null, o: unknown) => Promise<{ violations: Array<{ id: string }> }> } }).axe;
      return (await axe.run(document.querySelector('main'), { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa'] } })).violations.map(v => v.id);
    }); expect(violations).toEqual([]);
    await page.setViewportSize({ width: 320, height: 800 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(0);
  });
  test('chapter navigation remains legible and reachable on a narrow screen', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 800 });
    const navigation = page.locator('#world-loop-step-03 .lgo-article-section-navigation');
    await navigation.scrollIntoViewIfNeeded();
    const sizes = await navigation.locator('a, a > span').evaluateAll(nodes => nodes.map(e => parseFloat(getComputedStyle(e).fontSize)));
    expect(Math.min(...sizes)).toBeGreaterThanOrEqual(12);
    for (const link of await navigation.getByRole('link').all()) expect((await link.boundingBox())!.height).toBeGreaterThanOrEqual(44);
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(0);
  });

  test('published guide URLs remain available and non-guide content cannot become a guide', async ({ page }) => {
    const published = contentEntries.filter(item => item.category === 'guides' && item.status === 'published');
    expect(published.length).toBeGreaterThan(0);
    for (const item of published) expect((await page.request.get(`${origin}/guides/${item.slug}`)).status(), item.slug).toBe(200);
    const news = contentEntries.find(item => item.category === 'news' && item.status === 'published')!;
    expect((await page.request.get(`${origin}/guides/${news.slug}`)).status()).toBe(404);
    for (const slug of ['gate-entry-guide', 'beginner-training-loop-guide', 'player-safety-support-guide']) {
      await page.goto(`${origin}/guides/${slug}`);
      const expected = contentEntries.find(item => item.slug === slug)!;
      await expect(page.getByRole('heading', { level: 1, name: expected.title, exact: true })).toBeVisible();
      await expect(page.locator('.lgo-guide-detail-steps')).toBeVisible();
      await expect(page.locator('.lgo-world-loop-guide')).toHaveCount(0);
      expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(0);
    }
  });

});
