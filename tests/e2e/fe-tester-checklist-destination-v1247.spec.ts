import { expect, test } from '@playwright/test';
const origin = process.env.LGO_WEB_URL ?? 'http://127.0.0.1:3000';

async function expectChecklistArrival(page: import('@playwright/test').Page) {
  const checklist = page.locator('#tester-checklist');
  await expect(checklist).toBeFocused();
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe('auto');
  await expect.poll(async () => {
    const box = await checklist.boundingBox();
    const header = await page.locator('header').first().boundingBox();
    return !!box && !!header && box.y >= header.y + header.height && box.y <= 400;
  }).toBe(true);
  await expect(checklist.locator('input:checked')).toHaveCount(0);
  return checklist;
}

test.describe('real arrival at the checklist referenced by player-trust guide v1.247', () => {
  test('keyboard activation reaches the checklist below the header and hands focus to its controls', async ({ page }) => {
    await page.goto(origin + '/guides/player-trust-release-guide');
    const group = page.getByRole('navigation', { name: 'Đọc checklist và điều kiện thử nghiệm', exact: true });
    const link = group.getByRole('link', { name: /Mở checklist chuẩn bị/ });
    await link.focus(); await page.keyboard.press('Enter');
    await expect(page).toHaveURL(origin + '/release/tester-pack#tester-checklist');
    const checklist = await expectChecklistArrival(page);
    expect(await checklist.evaluate(e => getComputedStyle(e).outlineStyle)).not.toBe('none');
    expect(await checklist.evaluate(e => parseFloat(getComputedStyle(e).outlineWidth))).toBeGreaterThanOrEqual(2);
    await page.keyboard.press('Tab'); await expect(checklist.getByRole('checkbox').first()).toBeFocused();
    await page.keyboard.press('Space'); await expect(checklist.getByRole('status')).toContainText('1/4');
    await expect(checklist.getByRole('checkbox').first()).toBeFocused();
    await page.screenshot({ path: test.info().outputPath('tester-checklist-arrival.png'), fullPage: false });
  });
  test('cold direct URL restores the requested checklist, reload resets only local choices', async ({ page }) => {
    await page.goto('about:blank');
    await page.goto(origin + '/release/tester-pack#tester-checklist', { waitUntil: 'networkidle' });
    const checklist = await expectChecklistArrival(page);
    await checklist.getByRole('checkbox').first().check();
    await page.reload({ waitUntil: 'networkidle' });
    await expectChecklistArrival(page);
    await expect(checklist.getByRole('status')).toContainText('0/4');
    await expect(page.locator('main form,main input[type=password],main input[type=email]')).toHaveCount(0);
  });
  test('without the whitelisted fragment ordinary and malformed URLs do not steal focus or scroll', async ({ page }) => {
    const errors: string[] = []; page.on('pageerror', error => errors.push(error.message));
    for (const fragment of ['', '#%E0%A4%A', '#unlisted-section']) {
      await page.goto('about:blank');
      await page.goto(origin + '/release/tester-pack' + fragment, { waitUntil: 'networkidle' });
      await expect(page.getByRole('heading', { level: 1, name: 'Gói tester cộng đồng', exact: true })).toBeVisible();
      await expect(page.locator('#tester-checklist')).not.toBeFocused();
      expect(await page.evaluate(() => scrollY)).toBe(0);
      await expect(page.locator('#tester-checklist input:checked')).toHaveCount(0);
    }
    expect(errors).toEqual([]);
  });
});
