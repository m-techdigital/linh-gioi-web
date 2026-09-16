import {test, expect} from '@playwright/test';
const origin=process.env.LGO_WEB_URL??'http://127.0.0.1:3000';
const route='/release/tester-pack';

test.describe('tester section destinations keep native state and explicit focus v1.249',()=>{
  for(const id of ['tester-device','tester-feedback','tester-limits']) {
    test(`cold ${id} URL restores visible focus without preselecting or submitting`,async({page})=>{
      const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
      await page.goto('about:blank');await page.goto(origin+route+'#'+id,{waitUntil:'networkidle'});
      const target=page.locator('#'+id);await expect(target).toBeFocused();
      await expect.poll(()=>target.evaluate(e=>{const t=e.getBoundingClientRect().top,h=document.querySelector('header')!.getBoundingClientRect().bottom;return t>=h&&t<innerHeight-50;})).toBe(true);
      expect(await target.evaluate(e=>getComputedStyle(e).outlineStyle)).not.toBe('none');
      await expect(page.locator('#tester-checklist input:checked')).toHaveCount(0);
      await page.screenshot({path:test.info().outputPath(id+'-direct.png')});
      await page.keyboard.press('Tab');expect(await target.evaluate(e=>e!==document.activeElement&&e.contains(document.activeElement))).toBe(true);
      const changes:string[]=[];page.on('request',r=>{if(r.method()!=='GET'||['xhr','fetch'].includes(r.resourceType()))changes.push(r.url());});
      if(id==='tester-feedback'){
        await page.keyboard.press('End');await expect(target.getByRole('tab',{name:'Góp ý',exact:true})).toBeFocused();
        await expect(target.getByRole('tab',{name:'Góp ý',exact:true})).toHaveAttribute('aria-selected','true');
      }else{
        const summary=target.locator('summary').first();await expect(summary).toBeFocused();await page.keyboard.press('Enter');
        await expect(summary.locator('..')).toHaveAttribute('open','');await expect(summary).toBeFocused();
      }
      expect(changes).toEqual([]);expect(errors).toEqual([]);
      await page.reload({waitUntil:'networkidle'});await expect(target).toBeFocused();await expect(page.locator('#tester-checklist input:checked')).toHaveCount(0);
    });
  }
  test('ordinary unknown and malformed fragments do not steal focus or change document state',async({page})=>{
    for(const fragment of ['', '#missing-tester-section', '#%E0%A4%A']){
      const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
      await page.goto('about:blank');await page.goto(origin+route+fragment,{waitUntil:'networkidle'});
      await expect(page.locator('main h1')).toBeVisible();expect(await page.evaluate(()=>scrollY)).toBe(0);
      expect(await page.evaluate(()=>document.activeElement?.id??'')).not.toMatch(/^tester-/);
      await expect(page.locator('#tester-checklist input:checked')).toHaveCount(0);expect(errors).toEqual([]);
    }
  });
});
