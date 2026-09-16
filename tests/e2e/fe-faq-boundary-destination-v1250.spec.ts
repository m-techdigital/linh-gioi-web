import {test,expect} from '@playwright/test';
const origin=process.env.LGO_WEB_URL??'http://127.0.0.1:3000';
test.describe('FAQ reading destinations retain local behavior v1.250',()=>{
  test('cold answers URL reaches the existing category index, not a search backend',async({page})=>{
    await page.goto(origin+'/support/help#faq-answers',{waitUntil:'networkidle'});
    const target=page.locator('#faq-answers');await expect(target).toBeFocused();
    await expect.poll(async()=>{const b=await target.boundingBox(),h=await page.locator('header').first().boundingBox();return !!b&&!!h&&b.y>=h.y+h.height&&b.y<500;}).toBe(true);
    await page.keyboard.press('Tab');await expect(target.getByRole('button',{name:'Tất cả',exact:true})).toBeFocused();
    await expect(target.locator('.lgo-question-group')).toHaveCount(6);await expect(target.locator('input,textarea,form')).toHaveCount(0);
  });
  test('cold privacy/search boundary URL is visible and hands focus to its real reading link',async({page})=>{
    await page.goto(origin+'/support/help#help-boundary',{waitUntil:'networkidle'});
    const target=page.locator('#help-boundary');await expect(target).toBeFocused();
    await expect.poll(async()=>{const b=await target.boundingBox(),h=await page.locator('header').first().boundingBox();return !!b&&!!h&&b.y>=h.y+h.height&&b.y<500;}).toBe(true);
    expect(await target.evaluate(e=>getComputedStyle(e).outlineStyle)).not.toBe('none');
    await expect(target).toContainText('Không có hệ thống ticket thật');
    await page.screenshot({path:test.info().outputPath('faq-boundary-arrival.png'),fullPage:false});
    await page.keyboard.press('Tab');await expect(target.getByRole('link')).toBeFocused();
    await page.keyboard.press('Enter');await expect(page).toHaveURL(origin+'/support/safety');
  });
  test('ordinary unknown and malformed fragments do not claim focus or alter local selection',async({page})=>{
    const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
    for(const hash of ['', '#not-a-question', '#%E0%A4%A']){
      await page.goto('about:blank');await page.goto(origin+'/support/help'+hash,{waitUntil:'networkidle'});
      expect(await page.evaluate(()=>scrollY)).toBe(0);await expect(page.locator('.lgo-question-group')).toHaveCount(6);
      await expect(page.locator('#help-boundary')).not.toBeFocused();await expect(page.locator('#faq-answers')).not.toBeFocused();
    }
    expect(errors).toEqual([]);
  });
});
