import { expect, test } from "@playwright/test";
import axe from "axe-core";
const web = process.env.LGO_WEB_URL ?? "http://127.0.0.1:3000";

test.describe("public status visibility not live health v1.223", () => {
  test.beforeEach(async ({page}) => { await page.goto(`${web}/status`); });
  test("illustrated hero has real visibility signals and readable composition", async ({page},info) => {
    const root=page.locator(".lgo-status-experience");await expect(root).toBeVisible();
    await expect(root.locator("h1")).toHaveText("Trạng thái công khai");
    await expect(root.locator(".lgo-visibility-signal")).toHaveCount(3);
    const metrics=await root.evaluate(e=>({overflow:document.documentElement.scrollWidth-innerWidth,hero:e.querySelector(".lgo-release-hero")!.getBoundingClientRect().toJSON(),copy:e.querySelector(".lgo-release-hero-copy")!.getBoundingClientRect().toJSON(),signal:e.querySelector(".lgo-visibility-console")!.getBoundingClientRect().toJSON(),surfaces:e.querySelector("#status-surfaces")!.getBoundingClientRect().toJSON()}));
    expect(metrics.overflow).toBeLessThanOrEqual(0);
    if(info.project.name.includes("desktop")){
      expect(metrics.copy.x+metrics.copy.width).toBeLessThanOrEqual(metrics.signal.x+2);
      expect(metrics.surfaces.top).toBeLessThan(780);
    } else expect(metrics.signal.top).toBeGreaterThan(metrics.copy.top);
    await expect(root.locator("[role=progressbar],form,a[download]")).toHaveCount(0);
    await page.screenshot({path:info.outputPath("status-full.png"),fullPage:true});
  });
  test("filters consume actual public/internal/blocked source items", async ({page}) => {
    const catalog=page.locator(".lgo-visibility-catalog");await expect(catalog).toBeVisible();
    await expect(catalog.locator(".lgo-visibility-card")).toHaveCount(4);
    await catalog.getByRole("button",{name:"Tạm khóa",exact:true}).click();
    await expect(catalog.locator(".lgo-visibility-card")).toHaveCount(2);
    await expect(catalog).toContainText("Gói tải game");await expect(catalog).toContainText("Tài khoản / quyền Portal");
    await expect(catalog.getByRole("status")).toContainText("2/4");
    await catalog.getByRole("button",{name:"Công khai",exact:true}).click();
    await expect(catalog.locator(".lgo-visibility-card")).toHaveCount(1);
    await expect(catalog.locator(".lgo-visibility-card")).toContainText("Website công khai");
    await catalog.getByRole("button",{name:"Nội bộ",exact:true}).click();
    await expect(catalog.locator(".lgo-visibility-card")).toHaveCount(1);
    await catalog.getByRole("button",{name:"Tất cả",exact:true}).click();
    await expect(catalog.locator(".lgo-visibility-card")).toHaveCount(4);
  });
  test("keyboard filtering and evidence disclosures work without hidden truncation", async ({page}) => {
    const catalog=page.locator(".lgo-visibility-catalog");await expect(catalog).toBeVisible();
    const blocked=catalog.getByRole("button",{name:"Tạm khóa",exact:true});await blocked.focus();await page.keyboard.press("Enter");
    await expect(blocked).toHaveAttribute("aria-pressed","true");
    const summary=catalog.locator(".lgo-visibility-card summary").first();await expect(summary).toBeVisible();await summary.focus();await page.keyboard.press("Enter");
    await expect(summary.locator("..")).toHaveAttribute("open","");
    await expect(summary.locator("..")).toContainText("SHA256");
    expect(await summary.locator("..").locator("p").first().evaluate(e=>getComputedStyle(e).webkitLineClamp)).toBe("none");
  });
  test("maintenance fixture and absent monitoring are never live service claims", async ({page}) => {
    const root=page.locator(".lgo-status-experience");await expect(root).toBeVisible();
    await expect(root).toContainText("Không có dữ liệu giám sát trực tiếp");
    await expect(root).toContainText("NO_ACCEPTED_BACKEND_CONTRACT");
    const history=root.locator(".lgo-status-maintenance");
    await expect(history).toContainText("Trạng thái bảo trì chỉ là fixture local");
    await expect(history).toContainText("Không phải lịch bảo trì hoặc sự cố đang diễn ra");
    await expect(root.locator(".lgo-status-live-metrics,[data-live=true]")).toHaveCount(0);
    await expect(root.getByRole("link",{name:"Điều kiện phát hành",exact:true})).toHaveAttribute("href","/release/readiness");
    await expect(root.getByRole("link",{name:"Hỗ trợ an toàn",exact:true})).toHaveAttribute("href","/support/safety");
  });
  test("main headings, contrast and filtered state stay accessible", async ({page}) => {
    await expect(page.locator(".lgo-visibility-catalog")).toBeVisible();
    const bad=await page.locator(".lgo-status-experience section[aria-labelledby]").evaluateAll(sections=>sections.flatMap(s=>{const id=s.getAttribute("aria-labelledby")!;const h=document.getElementById(id);return !h||!/^H[1-6]$/.test(h.tagName)?[id]:[];}));
    expect(bad).toEqual([]);
    await page.addScriptTag({content:axe.source});
    const result=await page.evaluate(async()=> (globalThis as unknown as {axe:typeof import("axe-core")}).axe.run(document.querySelector("main")!,{runOnly:{type:"tag",values:["wcag2a","wcag2aa","wcag21aa"]}}));
    expect(result.violations).toEqual([]);
  });
  test("visibility artwork resolves canonical palette and secondary title scale", async ({page}) => {
    const console = page.locator(".lgo-visibility-console");await expect(console).toBeVisible();
    const style = await console.evaluate(e => {
      const signal = e.querySelector<HTMLElement>('[data-visibility="public"]')!;
      return { signal:getComputedStyle(signal).getPropertyValue("--signal").trim(),
        jade:getComputedStyle(document.documentElement).getPropertyValue("--lgo-color-jade-teal").trim(),
        h2:parseFloat(getComputedStyle(e.querySelector("h2")!).fontSize) };
    });
    expect(style.jade).not.toBe("");
    expect(style.signal).toBe(style.jade);
    expect(style.h2).toBeLessThanOrEqual(28);
  });

});
