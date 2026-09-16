import {expect,type Page} from '@playwright/test';

/** The streamed subtree may exist under [hidden] after load. Only interact with the real visible homepage. */
export async function waitForHomepage(page:Page) {
  await expect(page.locator('.lgo-immersive-hero')).toBeVisible();
  await expect(page.locator('main h1')).toBeVisible();
  await expect(page.locator('header .lgo-brand-links a[href="/"]')).toHaveAttribute('aria-current','page');
}
