import { test, expect } from "@playwright/test";

const origin = process.env.LGO_WEB_URL ?? "http://127.0.0.1:3000";
const routes = ["/download/trust", "/support/help", "/release/tester-pack#tester-feedback", "/support/safety"];

test.describe("support real guidance station v1.224", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${origin}/support`);
    await expect(page.getByRole("heading", { level: 1, name: "Hỗ trợ cộng đồng" })).toBeVisible();
  });

  test("parchment station and art-backed hero are real HTML", async ({ page, isMobile }) => {
    const station = page.getByRole("navigation", { name: "Trạm hỗ trợ người chơi" });
    await expect(station).toBeVisible();
    await expect(station.getByRole("link")).toHaveCount(4);
    await expect(page.locator("main img[src*='design-reference']")).toHaveCount(0);
    const boxes = await page.evaluate(() => {
      const hero = document.querySelector(".lgo-support-hub .lgo-experience-hero")!;
      const copy = hero.querySelector(".lgo-release-hero-copy")!.getBoundingClientRect();
      const station = hero.querySelector(".lgo-guidance-station")!.getBoundingClientRect();
      const art = hero.querySelector("img") as HTMLImageElement;
      return { copy:copy.toJSON(),station:station.toJSON(), imageReady:art.complete && art.naturalWidth>0,
        overflow:document.documentElement.scrollWidth-innerWidth,
        paper:getComputedStyle(hero.querySelector(".lgo-guidance-station")!).backgroundColor };
    });
    expect(boxes.imageReady).toBe(true);
    expect(boxes.overflow).toBeLessThanOrEqual(0);
    if(isMobile) expect(boxes.station.top).toBeGreaterThanOrEqual(boxes.copy.bottom);
    else expect(boxes.station.left).toBeGreaterThanOrEqual(boxes.copy.right);
    expect(boxes.paper).not.toBe("rgba(0, 0, 0, 0)");
  });

  test("all four topic actions navigate to real guidance, not fake buttons", async ({ page }) => {
    const cards = page.locator(".lgo-guidance-topic-grid .lgo-guidance-topic-card");
    await expect(cards).toHaveCount(4);
    for (let i=0;i<routes.length;i++) {
      const link = cards.nth(i).getByRole("link");
      await expect(link).toHaveAttribute("href",routes[i]);
      expect((await link.boundingBox())!.height).toBeGreaterThanOrEqual(44);
      const response = await page.request.get(`${origin}${routes[i].split("#")[0]}`);
      expect(response.status()).toBe(200);
    }
    await cards.nth(2).getByRole("link").click();
    await expect(page).toHaveURL(`${origin}/release/tester-pack#tester-feedback`);
    await expect(page.locator("#tester-feedback")).toBeVisible();
  });

  test("FAQ opens with keyboard, exposes full answers and closes", async ({ page }) => {
    const list=page.locator("#support-faq .lgo-question-list");
    await expect(list.locator("details")).toHaveCount(6);
    const first=list.locator("details").first();const summary=first.locator("summary");
    await expect(summary).toBeVisible();await summary.focus();await expect(summary).toBeFocused();
    await page.keyboard.press("Enter");await expect(first).toHaveAttribute("open","");
    await expect(first.locator(".lgo-question-answer")).toContainText("Chưa.");
    expect(await first.locator(".lgo-question-answer").evaluate(e=>getComputedStyle(e).webkitLineClamp)).toBe("none");
    await page.keyboard.press("Space");await expect(first).not.toHaveAttribute("open","");
    await page.getByRole("link",{name:"FAQ nhanh",exact:true}).click();
    await expect(page).toHaveURL(`${origin}/support#support-faq`);
  });

  test("support is guidance only with no intake or sensitive-data controls", async ({ page }) => {
    const boundary=page.locator("#support-boundary");await expect(boundary).toBeVisible();
    await expect(boundary).toContainText("Không có hệ thống ticket thật");
    await expect(boundary).toContainText("mật khẩu");
    await expect(page.locator("main form, main input, main textarea, main a[download]")).toHaveCount(0);
    const body=await page.locator("main").innerText();
    expect(body).toContain("NO_ACCEPTED_BACKEND_CONTRACT");
    expect(body).not.toMatch(/(Hỗ trợ 24\/7|Đã gửi ticket|Thời gian phản hồi:)/);
  });

  test("headings, expanded FAQ and touch targets remain accessible", async ({ page }) => {
    const hub=page.locator(".lgo-support-hub");await expect(hub).toBeVisible();
    await expect(page.locator("main h1")).toHaveCount(1);
    const badLabels=await hub.locator("[aria-labelledby]").evaluateAll(nodes=>nodes.filter(n=>{
      const ids=(n.getAttribute("aria-labelledby")??"").split(/\s+/);
      return ids.some(id=>!/^H[1-6]$/.test(document.getElementById(id)?.tagName??""));
    }).map(n=>n.getAttribute("aria-labelledby")));
    expect(badLabels).toEqual([]);
    await hub.locator("#support-faq summary").first().click();
    await page.addScriptTag({path:"node_modules/axe-core/axe.min.js"});
    const violations=await page.evaluate(async()=>{
      const axe=(window as unknown as {axe:{run:(n:Element|null,o:unknown)=>Promise<{violations:Array<{id:string}>}>}}).axe;
      return (await axe.run(document.querySelector("main"),{runOnly:{type:"tag",values:["wcag2a","wcag2aa","wcag21aa"]}})).violations.map(v=>v.id);
    });
    expect(violations).toEqual([]);
  });

});
