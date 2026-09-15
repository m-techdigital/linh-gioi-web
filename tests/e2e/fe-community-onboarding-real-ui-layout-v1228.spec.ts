import { test, expect } from "@playwright/test";
const origin=process.env.LGO_WEB_URL ?? "http://127.0.0.1:3000";

test.describe("community onboarding is a reading journey, not enrollment v1.228",()=>{
  test.beforeEach(async({page})=>{
    await page.goto(`${origin}/community/onboarding`);
    await expect(page.getByRole("heading",{level:1,name:"Hòa nhập cộng đồng Linh Giới",exact:true})).toBeVisible();
  });
  test("illustrated manual and real step controls replace the unrelated combat board",async({page,isMobile})=>{
    await expect(page.locator('.lgo-onboarding-experience .lgo-field-manual')).toBeVisible();
    await expect(page.locator('main img[src*=design-boards],main img[src*=design-reference]')).toHaveCount(0);
    await expect(page.locator('.lgo-reading-journey .lgo-progress-step')).toHaveCount(3);
    await expect(page.getByRole('link',{name:'Bố cục hòa nhập cộng đồng cho Hòa nhập cộng đồng · Ba bước đọc, không đăng ký — mở trong tab mới',exact:true})).toHaveAttribute('href','/design-reference/community-detailed-design-target-v1149.png');
    const m=await page.evaluate(()=>{
      const copy=document.querySelector('.lgo-onboarding-experience .lgo-release-hero-copy')!.getBoundingClientRect(),manual=document.querySelector('.lgo-onboarding-experience .lgo-field-manual')!.getBoundingClientRect();
      return {copy:copy.toJSON(),manual:manual.toJSON(),overflow:document.documentElement.scrollWidth-innerWidth,columns:getComputedStyle(document.querySelector('.lgo-reading-journey .lgo-progress-steps')!).gridTemplateColumns.split(' ').length};
    });
    expect(m.overflow).toBeLessThanOrEqual(0);expect(m.columns).toBe(isMobile?1:3);
    if(isMobile)expect(m.manual.top).toBeGreaterThanOrEqual(m.copy.bottom);else expect(m.manual.left).toBeGreaterThanOrEqual(m.copy.right);
    await page.screenshot({path:test.info().outputPath('onboarding-layout.png'),fullPage:true});
  });
  test("next and previous reading controls respect both boundaries without completing an entitlement",async({page})=>{
    const journey=page.locator('.lgo-reading-journey');await expect(journey).toBeVisible();
    await expect(journey.getByRole('status')).toContainText('1/3');
    await expect(journey.getByRole('button',{name:'Bước trước',exact:true})).toBeDisabled();
    const disabledOpacity=Number(await journey.getByRole('button',{name:'Bước trước',exact:true}).evaluate(e=>getComputedStyle(e).opacity));
    const enabledOpacity=Number(await journey.getByRole('button',{name:'Bước tiếp',exact:true}).evaluate(e=>getComputedStyle(e).opacity));
    expect(disabledOpacity,'disabled navigation must be visually distinct').toBeLessThan(enabledOpacity);
    await journey.getByRole('button',{name:'Bước tiếp',exact:true}).click();
    await expect(journey.getByRole('status')).toContainText('2/3');
    await expect(journey.locator('.lgo-reading-journey-panel')).toContainText('Đọc mốc mở dần');
    await journey.getByRole('button',{name:'Bước tiếp',exact:true}).click();
    await expect(journey.getByRole('status')).toContainText('3/3');
    await expect(journey.getByRole('button',{name:'Bước tiếp',exact:true})).toBeDisabled();
    await expect(journey).toContainText('không cấp quyền thử nghiệm');
    await expect(page.getByRole('button',{name:/Đăng ký|Gửi yêu cầu|Tham gia ngay|Nhận quyền/i})).toHaveCount(0);
    await journey.getByRole('button',{name:'Bước trước',exact:true}).click();await expect(journey.getByRole('status')).toContainText('2/3');
  });
  test("keyboard selects any step, all destinations work, and reload resets reading state",async({page})=>{
    const journey=page.locator('.lgo-reading-journey');await expect(journey).toBeVisible();
    const expected=['/status','/roadmap','/community'];
    for(let i=0;i<3;i++){
      const select=journey.getByRole('button',{name:new RegExp(`^Xem bước ${i+1}:`)});
      await select.focus();await page.keyboard.press('Space');await expect(select).toHaveAttribute('aria-pressed','true');
      await expect(journey.locator('.lgo-progress-step[aria-current=step]')).toHaveCount(1);
      const action=journey.locator('.lgo-reading-journey-panel').getByRole('link');await expect(action).toHaveAttribute('href',expected[i]);
      expect((await page.request.get(origin+expected[i])).status()).toBe(200);
      expect((await select.boundingBox())!.height).toBeGreaterThanOrEqual(44);
    }
    await page.reload();await expect(journey.getByRole('status')).toContainText('1/3');
    await journey.locator('.lgo-reading-journey-panel').getByRole('link').click();await expect(page).toHaveURL(origin+'/status');
  });
  test("four source-backed audience paths are readable and not fake registrations",async({page})=>{
    const paths=page.locator('#onboarding-audiences .lgo-question-list details');await expect(paths).toHaveCount(4);
    for(const item of await paths.all()){
      await item.locator('summary').click();await expect(item.locator('.lgo-question-answer')).toBeVisible();
      expect(await item.locator('.lgo-question-answer').evaluate(e=>getComputedStyle(e).webkitLineClamp)).toBe('none');
    }
    await expect(page.locator('#onboarding-boundary')).toContainText('Chưa có danh sách chờ');
    await expect(page.locator('main form,main input,main textarea,main iframe,main a[download]')).toHaveCount(0);
    await expect(page.locator('main')).toContainText('NO_ACCEPTED_BACKEND_CONTRACT');
  });
  test("step interaction performs no enrollment or persistent writes",async({page})=>{
    await page.waitForLoadState('networkidle');const journey=page.locator('.lgo-reading-journey');await expect(journey).toBeVisible();
    const requests:string[]=[];page.on('request',r=>{if(['fetch','xhr'].includes(r.resourceType())||r.method()!=='GET')requests.push(r.url());});
    const before=await page.evaluate(()=>({local:{...localStorage},session:{...sessionStorage}}));
    await journey.getByRole('button',{name:'Bước tiếp',exact:true}).click();
    await journey.getByRole('button',{name:'Bước trước',exact:true}).click();
    expect(await page.evaluate(()=>({local:{...localStorage},session:{...sessionStorage}}))).toEqual(before);expect(requests).toEqual([]);
  });
  test("active and expanded states preserve headings, focus and accessible reading",async({page})=>{
    const hub=page.locator('.lgo-onboarding-experience');await expect(hub).toBeVisible();
    await expect(page.locator('main h1')).toHaveCount(1);
    const select=hub.getByRole('button',{name:/^Xem bước 2:/});await select.focus();await page.keyboard.press('Enter');await expect(select).toBeFocused();
    expect(await select.evaluate(e=>getComputedStyle(e).outlineStyle)).not.toBe('none');
    const summary=page.locator('#onboarding-audiences summary').first();await summary.focus();await page.keyboard.press('Enter');
    const bad=await hub.locator('[aria-labelledby]').evaluateAll(nodes=>nodes.filter(n=>(n.getAttribute('aria-labelledby')??'').split(/\s+/).some(id=>!/^H[1-6]$/.test(document.getElementById(id)?.tagName??''))).map(n=>n.getAttribute('aria-labelledby')));expect(bad).toEqual([]);
    await page.addScriptTag({path:'node_modules/axe-core/axe.min.js'});
    const violations=await page.evaluate(async()=>{const axe=(window as unknown as {axe:{run:(n:Element|null,o:unknown)=>Promise<{violations:Array<{id:string}>}>}}).axe;return (await axe.run(document.querySelector('main'),{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}})).violations.map(v=>v.id);});expect(violations).toEqual([]);
  });
});
