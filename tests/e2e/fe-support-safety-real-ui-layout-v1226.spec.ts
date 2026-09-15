import { test, expect } from "@playwright/test";
const origin=process.env.LGO_WEB_URL ?? "http://127.0.0.1:3000";

test.describe("safe report preparation not ticket intake v1.226",()=>{
  test.beforeEach(async({page})=>{
    await page.goto(`${origin}/support/safety`);
    await expect(page.getByRole("heading",{level:1,name:"Báo lỗi an toàn",exact:true})).toBeVisible();
  });

  test("privacy panel and five preparation steps are real accessible HTML",async({page,isMobile})=>{
    await expect(page.locator(".lgo-privacy-notice")).toBeVisible();
    await expect(page.locator(".lgo-privacy-notice-item")).toHaveCount(3);
    await expect(page.locator("main img[src*=design-reference]")).toHaveCount(0);
    await expect(page.locator("#safety-checklist input[type=checkbox]")).toHaveCount(5);
    const metrics=await page.evaluate(()=>{
      const copy=document.querySelector(".lgo-safety-hub .lgo-release-hero-copy")!.getBoundingClientRect();
      const notice=document.querySelector(".lgo-privacy-notice")!.getBoundingClientRect();
      const art=document.querySelector(".lgo-safety-hub .lgo-release-hero-art") as HTMLImageElement;
      return {copy:copy.toJSON(),notice:notice.toJSON(),loaded:art.complete&&art.naturalWidth>0,overflow:document.documentElement.scrollWidth-innerWidth};
    });
    expect(metrics.loaded).toBe(true);expect(metrics.overflow).toBeLessThanOrEqual(0);
    if(isMobile)expect(metrics.notice.top).toBeGreaterThanOrEqual(metrics.copy.bottom);
    else expect(metrics.notice.left).toBeGreaterThanOrEqual(metrics.copy.right);
    await page.screenshot({path:test.info().outputPath("safety-layout.png"),fullPage:true});
  });

  test("checklist responds to keyboard and resets without persisting or sending data",async({page})=>{
    const list=page.locator("#safety-checklist .lgo-local-checklist");await expect(list).toBeVisible();
    const requests:string[]=[];page.on("request",r=>{if(["xhr","fetch"].includes(r.resourceType())||r.method()!=="GET")requests.push(r.url());});
    const first=list.getByRole("checkbox").first();await first.focus();await page.keyboard.press("Space");await expect(first).toBeChecked();
    await expect(list.getByRole("status")).toContainText("1/5");
    for(const item of await list.getByRole("checkbox").all())await item.check();
    await expect(list.getByRole("status")).toContainText("5/5");
    await expect(page.locator("#safety-checklist")).toContainText("không tự che ảnh/log");
    await expect(page.getByRole("button",{name:/Gửi (ticket|báo lỗi|phản hồi)/i})).toHaveCount(0);
    await list.getByRole("button",{name:"Bỏ các đánh dấu"}).click();
    await expect(list.getByRole("status")).toContainText("0/5");
    expect(requests).toEqual([]);
    await first.check();await page.reload();await expect(list.getByRole("status")).toContainText("0/5");
  });

  test("data boundary separates prepared descriptions from secrets and identifiers",async({page})=>{
    const boundary=page.locator("#safety-data-boundary");await expect(boundary).toBeVisible();
    await expect(boundary.locator(".lgo-data-boundary-allowed")).toContainText("bước tái hiện");
    await expect(boundary.locator(".lgo-data-boundary-withheld")).toContainText("mật khẩu");
    await expect(boundary.locator(".lgo-data-boundary-withheld")).toContainText("IMEI");
    await expect(page.locator("#safety-no-intake")).toContainText("Chưa có ticket thật");
    await expect(page.locator("main form, main input:not([type=checkbox]), main textarea, main input[type=file], main a[download]")).toHaveCount(0);
    await expect(page.locator("main")).toContainText("NO_ACCEPTED_BACKEND_CONTRACT");
  });

  test("four issue paths expose source guidance and navigate to existing routes",async({page})=>{
    const paths=page.locator("#safety-issue-paths .lgo-question-list details");await expect(paths).toHaveCount(4);
    const expected=["/download/trust","/game/loop","/support/safety","/community/onboarding"];
    for(let i=0;i<4;i++){
      const item=paths.nth(i);await item.locator("summary").click();
      await expect(item.locator(".lgo-question-answer")).toBeVisible();
      const link=item.getByRole("link");await expect(link).toHaveAttribute("href",expected[i]);
      expect((await page.request.get(`${origin}${expected[i]}`)).status()).toBe(200);
      expect(await item.locator(".lgo-question-answer").evaluate(e=>getComputedStyle(e).webkitLineClamp)).toBe("none");
    }
    await page.getByRole("link",{name:"Tự kiểm tra trước",exact:true}).click();await expect(page).toHaveURL(`${origin}/support/safety#safety-checklist`);
  });

  test("keyboard disclosure and expanded privacy guidance pass accessibility",async({page})=>{
    const hub=page.locator(".lgo-safety-hub");await expect(hub).toBeVisible();
    await expect(page.locator("main h1")).toHaveCount(1);
    const bad=await hub.locator("[aria-labelledby]").evaluateAll(nodes=>nodes.filter(n=>(n.getAttribute("aria-labelledby")??"").split(/\s+/).some(id=>!/^H[1-6]$/.test(document.getElementById(id)?.tagName??""))).map(n=>n.getAttribute("aria-labelledby")));
    expect(bad).toEqual([]);
    const first=hub.locator("#safety-issue-paths details").first();const summary=first.locator("summary");
    await expect(summary).toBeVisible();await summary.focus();await page.keyboard.press("Enter");await expect(first).toHaveAttribute("open","");
    expect((await summary.boundingBox())!.height).toBeGreaterThanOrEqual(44);
    await page.addScriptTag({path:"node_modules/axe-core/axe.min.js"});
    const violations=await page.evaluate(async()=>{
      const axe=(window as unknown as {axe:{run:(n:Element|null,o:unknown)=>Promise<{violations:Array<{id:string}>}>}}).axe;
      return (await axe.run(document.querySelector("main"),{runOnly:{type:"tag",values:["wcag2a","wcag2aa","wcag21aa"]}})).violations.map(v=>v.id);
    });expect(violations).toEqual([]);
  });
  test("checked preparation cards visibly change and reset restores the unselected state",async({page})=>{
    const list=page.locator("#safety-checklist .lgo-local-checklist");
    const card=list.locator(".lgo-checkbox-field").first();
    const checkbox=card.getByRole("checkbox");
    await expect(card).toBeVisible();
    const before=await card.evaluate(e=>({border:getComputedStyle(e).borderTopColor,background:getComputedStyle(e).backgroundImage}));
    await card.click();await expect(checkbox).toBeChecked();
    await expect.poll(async()=>card.evaluate(e=>getComputedStyle(e).borderTopColor)).not.toBe(before.border);
    expect(await card.evaluate(e=>getComputedStyle(e).backgroundImage)).not.toBe(before.background);
    await page.screenshot({path:test.info().outputPath("checked-preparation.png"),fullPage:true});
    await list.getByRole("button",{name:"Bỏ các đánh dấu"}).click();await expect(checkbox).not.toBeChecked();
    expect(await card.evaluate(e=>getComputedStyle(e).borderTopColor)).toBe(before.border);
  });

});
