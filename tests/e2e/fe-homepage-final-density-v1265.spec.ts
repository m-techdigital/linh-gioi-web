import {test,expect} from '@playwright/test';
import {waitForHomepage} from './helpers/homepage-ready';
const origin=process.env.LGO_WEB_URL??'http://127.0.0.1:3236';
test.describe('homepage final target density v1.265',()=>{
 test.beforeEach(async({page})=>{await page.goto(origin+'/');await waitForHomepage(page);});
 test('immersive navigation keeps six truthful target-rhythm routes',async({page})=>{
  const nav=page.locator('header .lgo-brand-links');const links=nav.getByRole('link');await expect(links).toHaveCount(6);
  await expect(links).toHaveText(['Trang chủ','Thế giới','Lộ phái','Tính năng','Cộng đồng','Tin tức']);
  for(const [i,href]of ['/','/game','/classes','/game/loop','/community','/news'].entries())await expect(links.nth(i)).toHaveAttribute('href',href);
 });
 test('hero removes redundant technical badge and prose line while preserving live motto actions and signals',async({page})=>{
  const hero=page.locator('.lgo-immersive-hero');await expect(hero.locator('.lgo-status-badge')).toHaveCount(0);await expect(hero.locator('.lgo-hero-lead')).toHaveCount(0);
  await expect(hero.locator('.lgo-hero-motto')).toHaveText('KIẾP NÀY, THẾ GIỚI RỘNG LỚN HƠN BẠN NGHĨ');await expect(hero.locator('.lgo-hero-actions a')).toHaveCount(3);await expect(hero.locator('.lgo-landing-signals span')).toHaveCount(4);
 });
 test('compact header stays keyboard reachable at desktop and mobile without horizontal page overflow',async({page})=>{
  for(const width of [320,390,768,1440]){await page.setViewportSize({width,height:900});const links=page.locator('header .lgo-brand-links a');await expect(links).toHaveCount(6);for(const link of await links.all()){await link.focus();await expect(link).toBeFocused();expect((await link.boundingBox())!.height).toBeGreaterThanOrEqual(44);}expect(await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth)).toBeLessThanOrEqual(0);}
 });
});
