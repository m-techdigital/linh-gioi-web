import { test, expect } from "@playwright/test";

const origin = process.env.LGO_WEB_URL ?? "http://127.0.0.1:3000";
const topics = ["Tải game", "Tham gia test", "Báo lỗi an toàn", "Tài khoản", "Lối chơi", "Ranh giới dữ liệu"];
const ids = ["faq-download", "faq-test", "faq-report", "faq-account", "faq-gameplay", "faq-privacy"];

test.describe("FAQ help real question navigation v1.225", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${origin}/support/help`);
    await expect(page.getByRole("heading", { level: 1, name: "FAQ nhanh", exact: true })).toBeVisible();
  });

  test("six-topic parchment map replaces embedded mockup with real layout", async ({ page, isMobile }) => {
    const map = page.getByRole("navigation", { name: "Bản đồ câu hỏi", exact: true });
    await expect(map).toBeVisible();
    await expect(map.getByRole("link")).toHaveCount(6);
    await expect(page.locator("main img[src*=design-reference]")).toHaveCount(0);
    for (let i=0;i<ids.length;i++) await expect(map.getByRole("link").nth(i)).toHaveAttribute("href",`#${ids[i]}`);
    const metrics = await page.evaluate(() => {
      const copy=document.querySelector(".lgo-help-hub .lgo-release-hero-copy")!.getBoundingClientRect();
      const map=document.querySelector(".lgo-guidance-map")!.getBoundingClientRect();
      const art=document.querySelector(".lgo-help-hub .lgo-release-hero-art") as HTMLImageElement;
      return {copy:copy.toJSON(),map:map.toJSON(),loaded:art.complete&&art.naturalWidth>0,overflow:document.documentElement.scrollWidth-innerWidth};
    });
    expect(metrics.loaded).toBe(true);expect(metrics.overflow).toBeLessThanOrEqual(0);
    if(isMobile) expect(metrics.map.top).toBeGreaterThanOrEqual(metrics.copy.bottom);
    else expect(metrics.map.left).toBeGreaterThanOrEqual(metrics.copy.right);
    await page.screenshot({path:test.info().outputPath("help-layout.png"),fullPage:true});
  });

  test("topic controls filter real answer groups and reset without a backend", async ({ page }) => {
    const directory=page.locator(".lgo-question-directory");
    const controls=directory.getByRole("group",{name:"Chọn chủ đề câu hỏi"});
    await expect(directory.locator(".lgo-question-group:visible")).toHaveCount(6);
    const requests:string[]=[];page.on("request",r=>{if(["fetch","xhr"].includes(r.resourceType())||r.method()!=="GET")requests.push(`${r.method()} ${r.url()}`);});
    for (let i=0;i<topics.length;i++) {
      const button=controls.getByRole("button",{name:topics[i],exact:true});await button.click();
      await expect(button).toHaveAttribute("aria-pressed","true");
      await expect(directory.locator(".lgo-question-group:visible")).toHaveCount(1);
      await expect(page.locator(`#${ids[i]}`)).toBeVisible();
      await expect(directory.getByRole("status")).toContainText("1/6");
      const groupBox=await page.locator(`#${ids[i]}`).boundingBox();const listBox=await directory.boundingBox();
      expect(groupBox!.width).toBeGreaterThan(listBox!.width*.85);
    }
    await controls.getByRole("button",{name:"Tất cả",exact:true}).click();
    await expect(directory.locator(".lgo-question-group:visible")).toHaveCount(6);
    expect(requests).toEqual([]);
  });

  test("map deep links and browser history select the matching answer group", async ({ page }) => {
    const map=page.getByRole("navigation",{name:"Bản đồ câu hỏi",exact:true});
    await expect(map).toBeVisible();await map.getByRole("link").nth(3).click();
    await expect(page).toHaveURL(`${origin}/support/help#faq-account`);
    await expect(page.locator(".lgo-question-group:visible")).toHaveCount(1);
    await expect(page.locator("#faq-account")).toBeVisible();
    await page.reload();await expect(page.locator("#faq-account")).toBeVisible();
    await expect(page.locator(".lgo-question-group:visible")).toHaveCount(1);
    await page.getByRole("group",{name:"Chọn chủ đề câu hỏi"}).getByRole("button",{name:"Tải game",exact:true}).click();
    await expect(page.locator("#faq-download")).toBeVisible();await page.goBack();
    await expect(page.locator("#faq-account")).toBeVisible();
    await expect(page.locator(".lgo-question-group:visible")).toHaveCount(1);
  });

  test("keyboard controls and native answers remain readable", async ({ page }) => {
    const button=page.getByRole("group",{name:"Chọn chủ đề câu hỏi"}).getByRole("button",{name:"Tải game",exact:true});
    await expect(button).toBeVisible();await button.focus();await expect(button).toBeFocused();await page.keyboard.press("Enter");
    const details=page.locator("#faq-download details").first();const summary=details.locator("summary");
    await expect(summary).toBeVisible();await summary.focus();await page.keyboard.press("Space");await expect(details).toHaveAttribute("open","");
    await expect(details.locator(".lgo-question-answer")).toContainText("Chưa.");
    expect(await details.locator(".lgo-question-answer").evaluate(e=>getComputedStyle(e).webkitLineClamp)).toBe("none");
    await page.keyboard.press("Enter");await expect(details).not.toHaveAttribute("open","");
    expect((await summary.boundingBox())!.height).toBeGreaterThanOrEqual(44);
  });

  test("each answer offers a real onward route and privacy remains explicit", async ({ page }) => {
    const directory=page.locator(".lgo-question-directory");await expect(directory).toBeVisible();
    const expected=["/download/trust","/release/tester-pack","/support/safety","/status","/game/loop","/support"];
    for(let i=0;i<ids.length;i++) {
      const link=page.locator(`#${ids[i]} > .lgo-link-button`);await expect(link).toHaveAttribute("href",expected[i]);
      expect((await page.request.get(`${origin}${expected[i]}`)).status()).toBe(200);
    }
    await expect(page.locator("#help-boundary")).toContainText("Không có hệ thống ticket thật");
    await expect(page.locator("#help-boundary")).toContainText("mật khẩu");
    await expect(page.locator("main form, main input, main textarea, main a[download]")).toHaveCount(0);
    await expect(page.locator("main")).toContainText("NO_ACCEPTED_BACKEND_CONTRACT");
  });

  test("expanded answers, heading labels and mobile layout pass accessibility checks", async ({ page }) => {
    const hub=page.locator(".lgo-help-hub");await expect(hub).toBeVisible();
    await expect(page.locator("main h1")).toHaveCount(1);
    const bad=await hub.locator("[aria-labelledby]").evaluateAll(nodes=>nodes.filter(n=>(n.getAttribute("aria-labelledby")??"").split(/\s+/).some(id=>!/^H[1-6]$/.test(document.getElementById(id)?.tagName??""))).map(n=>n.getAttribute("aria-labelledby")));
    expect(bad).toEqual([]);
    await hub.locator("#faq-download summary").first().click();
    await page.addScriptTag({path:"node_modules/axe-core/axe.min.js"});
    const violations=await page.evaluate(async()=>{
      const axe=(window as unknown as {axe:{run:(n:Element|null,o:unknown)=>Promise<{violations:Array<{id:string}>}>}}).axe;
      return (await axe.run(document.querySelector("main"),{runOnly:{type:"tag",values:["wcag2a","wcag2aa","wcag21aa"]}})).violations.map(v=>v.id);
    });
    expect(violations).toEqual([]);
    expect(await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth)).toBeLessThanOrEqual(0);
  });
});
