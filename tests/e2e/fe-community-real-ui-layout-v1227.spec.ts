import { test, expect } from "@playwright/test";
const origin=process.env.LGO_WEB_URL ?? "http://127.0.0.1:3000";

test.describe("community orientation without a fake live network v1.227",()=>{
  test.beforeEach(async({page})=>{
    await page.goto(`${origin}/community`);
    await expect(page.getByRole("heading",{level:1,name:"Cộng đồng Linh Giới",exact:true})).toBeVisible();
  });
  test("panoramic hero and three paper panels follow real responsive composition",async({page,isMobile})=>{
    await expect(page.locator(".lgo-community-vista")).toBeVisible();
    await expect(page.locator(".lgo-community-columns > section")).toHaveCount(3);
    await expect(page.locator("main img[src*=design-reference]")).toHaveCount(0);
    const m=await page.evaluate(()=>{
      const copy=document.querySelector('.lgo-community-experience .lgo-release-hero-copy')!.getBoundingClientRect();
      const vista=document.querySelector('.lgo-community-vista')!.getBoundingClientRect();
      const cols=getComputedStyle(document.querySelector('.lgo-community-columns')!).gridTemplateColumns.split(' ').length;
      const image=document.querySelector('.lgo-community-vista img') as HTMLImageElement;
      return {copy:copy.toJSON(),vista:vista.toJSON(),cols,loaded:image.complete&&image.naturalWidth>0,overflow:document.documentElement.scrollWidth-innerWidth};
    });
    expect(m.loaded).toBe(true);expect(m.overflow).toBeLessThanOrEqual(0);
    if(isMobile){expect(m.cols).toBe(1);expect(m.vista.top).toBeGreaterThanOrEqual(m.copy.bottom);}
    else{expect(m.cols).toBe(3);expect(m.vista.left).toBeGreaterThanOrEqual(m.copy.right);}
    await page.screenshot({path:test.info().outputPath('community-layout.png'),fullPage:true});
  });
  test("onboarding and preparation links go to real explanatory pages",async({page})=>{
    const routes=page.locator('.lgo-community-start-routes');
    for(const [label,href] of [['Hiểu trạng thái hiện tại','/release/readiness'],['Hòa nhập cộng đồng','/community/onboarding'],['Chuẩn bị thử nghiệm','/release/tester-pack']]){
      const a=routes.getByRole('link',{name:label,exact:true});await expect(a).toHaveAttribute('href',href);
      expect((await a.boundingBox())!.height).toBeGreaterThanOrEqual(44);
      expect((await page.request.get(origin+href)).status()).toBe(200);
    }
    await routes.getByRole('link',{name:'Hòa nhập cộng đồng',exact:true}).click();await expect(page).toHaveURL(origin+'/community/onboarding');
  });
  test("principle medallions lead to full keyboard-readable conduct rules",async({page})=>{
    const medallions=page.locator('.lgo-principle-medallions a');await expect(medallions).toHaveCount(3);
    await medallions.first().click();await expect(page).toHaveURL(origin+'/community#community-rule-0');
    const first=page.locator('#community-rule-0');const summary=first.locator('summary');await expect(summary).toBeVisible();
    await summary.focus();await page.keyboard.press('Enter');await expect(first).toHaveAttribute('open','');
    await expect(first).toContainText('Download Trust');
    expect(await first.locator('.lgo-question-answer').evaluate(e=>getComputedStyle(e).webkitLineClamp)).toBe('none');
    await page.keyboard.press('Space');await expect(first).not.toHaveAttribute('open','');
  });
  test("existing runtime images have context and a working original-image link",async({page})=>{
    const gallery=page.locator('#community-runtime-gallery');await expect(gallery).toBeVisible();
    await expect(gallery.locator('img')).toHaveCount(2);await expect(gallery).toContainText('prototype');
    for(const img of await gallery.locator('img').all()){
      await img.scrollIntoViewIfNeeded();await expect(img).toBeVisible();
      expect(await img.evaluate(e=>(e as HTMLImageElement).complete&&(e as HTMLImageElement).naturalWidth>0)).toBe(true);
      await expect(img).toHaveAttribute('loading','lazy');
    }
    for(const visual of await gallery.locator('.lgo-media-frame-visual').all()){
      const cue=visual.locator('a > span');await expect(cue).toContainText('Mở ảnh gốc');
      const clip=await visual.boundingBox(), text=await cue.boundingBox();
      expect(text!.y+text!.height,'new-tab cue must not be clipped under the image').toBeLessThanOrEqual(clip!.y+clip!.height+1);
    }
    const popupPromise=page.waitForEvent('popup');await gallery.getByRole('link').first().click();const popup=await popupPromise;
    await popup.waitForLoadState();expect(popup.url()).toContain('/game-art/community/linh-thanh-plaza-npc-preview.png');await popup.close();
  });
  test("community is honest guidance with accessible disclosures, not a social backend",async({page})=>{
    const hub=page.locator('.lgo-community-experience');await expect(hub).toBeVisible();
    await expect(hub).toContainText('Chưa có trò chuyện, diễn đàn hoặc bang hội');
    await expect(hub).toContainText('NO_ACCEPTED_BACKEND_CONTRACT');
    await expect(hub.locator('form,input,textarea,iframe,a[download]')).toHaveCount(0);
    await expect(page.getByRole('button',{name:/Tham gia ngay|Đăng ký|Gửi phản hồi|Vào chat/i})).toHaveCount(0);
    const bad=await hub.locator('[aria-labelledby]').evaluateAll(nodes=>nodes.filter(n=>(n.getAttribute('aria-labelledby')??'').split(/\s+/).some(id=>!/^H[1-6]$/.test(document.getElementById(id)?.tagName??''))).map(n=>n.getAttribute('aria-labelledby')));expect(bad).toEqual([]);
    const rules=page.locator('#community-conduct details');for(const summary of await rules.locator('summary').all())await summary.click();
    await page.addScriptTag({path:'node_modules/axe-core/axe.min.js'});
    const violations=await page.evaluate(async()=>{const axe=(window as unknown as {axe:{run:(n:Element|null,o:unknown)=>Promise<{violations:Array<{id:string}>}>}}).axe;return (await axe.run(document.querySelector('main'),{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}})).violations.map(v=>v.id);});expect(violations).toEqual([]);
  });
});
