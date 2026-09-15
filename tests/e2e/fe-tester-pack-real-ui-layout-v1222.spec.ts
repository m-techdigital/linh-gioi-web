import { expect, test } from "@playwright/test";
import axe from "axe-core";
const web = process.env.LGO_WEB_URL ?? "http://127.0.0.1:3000";

test.describe("tester pack real preparation tools v1.222", () => {
  test.beforeEach(async ({ page }) => { await page.goto(`${web}/release/tester-pack`); });
  test("illustrated manual and five real destinations replace the schematic", async ({ page }, info) => {
    const root = page.locator(".lgo-tester-experience");
    await expect(root).toBeVisible();
    await expect(root.locator("h1")).toHaveText("Gói tester cộng đồng");
    await expect(root.locator(".lgo-field-manual")).toBeVisible();
    await expect(root.locator(".lgo-tester-shortcuts a")).toHaveCount(5);
    await expect(root.getByRole("link", { name: /Điều kiện phát hành/ })).toHaveAttribute("href", "/release/readiness");
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
    await page.screenshot({path: info.outputPath("tester-pack.png"),fullPage: true});
  });
  test("checklist is local, keyboard usable and reset on a fresh page", async ({ page }) => {
    const checklist = page.locator(".lgo-local-checklist");
    await expect(checklist).toBeVisible();
    const boxes = checklist.getByRole("checkbox");
    await expect(boxes).toHaveCount(4);
    await expect(checklist.getByRole("status")).toContainText("0/4");
    await boxes.first().check();
    await boxes.nth(1).focus(); await page.keyboard.press("Space");
    await expect(checklist.getByRole("status")).toContainText("2/4");
    await checklist.getByRole("button",{name:"Bỏ các đánh dấu"}).click();
    await expect(checklist.getByRole("status")).toContainText("0/4");
    await boxes.first().check(); await page.reload();
    await expect(page.locator(".lgo-local-checklist").getByRole("status")).toContainText("0/4");
  });
  test("template tabs support arrows, Home and End", async ({ page }) => {
    const tabs = page.getByRole("tablist", {name:"Mẫu phản hồi"});
    await expect(tabs).toBeVisible();
    await tabs.getByRole("tab", {name:"Báo lỗi"}).focus();
    await page.keyboard.press("ArrowRight");
    await expect(tabs.getByRole("tab", {name:"Vòng chơi"})).toBeFocused();
    await expect(tabs.getByRole("tab", {name:"Vòng chơi"})).toHaveAttribute("aria-selected","true");
    await expect(page.getByRole("tabpanel")).toContainText("Điều đã quan sát");
    await page.keyboard.press("End");
    await expect(tabs.getByRole("tab", {name:"Góp ý"})).toBeFocused();
    await page.keyboard.press("Home");
    await expect(tabs.getByRole("tab", {name:"Báo lỗi"})).toBeFocused();
  });
  test("copy state reflects the clipboard result without touching the Mac clipboard", async ({ page }) => {
    // Deliberately isolate the OS side effect while testing the browser/API contract.
    await page.addInitScript(() => {
      const scope = globalThis as unknown as { __lgoCopy?: string; __lgoReject?: boolean };
      Object.defineProperty(navigator, "clipboard", { configurable:true, value:{writeText: async (text:string) => {
        if(scope.__lgoReject) throw new Error("Permission denied"); scope.__lgoCopy=text;
      }}});
    });
    await page.reload();
    const copy = page.getByRole("button", {name:"Sao chép mẫu"}); await expect(copy).toBeVisible();
    await copy.click();
    await expect(page.locator(".lgo-template-feedback")).toContainText("Đã sao chép mẫu");
    expect(await page.evaluate(() => (globalThis as unknown as {__lgoCopy:string}).__lgoCopy)).toContain("Bước tái hiện");
    await page.evaluate(() => { (globalThis as unknown as {__lgoReject:boolean}).__lgoReject=true; });
    await copy.click();
    await expect(page.locator(".lgo-template-feedback")).toContainText("Chưa sao chép");
    await expect(page.locator(".lgo-template-feedback")).not.toContainText("Đã sao chép mẫu");
  });
  test("privacy boundaries, limits and accessible semantics remain real", async ({ page }) => {
    const root = page.locator(".lgo-tester-experience");await expect(root).toBeVisible();
    await expect(root).toContainText("Chưa mở intake");await expect(root).toContainText("Không hứa slot");
    await expect(root.locator("form,input[type=email],input[type=password],input[type=file]")).toHaveCount(0);
    await expect(root.locator(".lgo-tester-limitations details")).toHaveCount(4);
    await root.locator(".lgo-tester-limitations summary").first().click();
    await expect(root.locator(".lgo-tester-limitations details").first()).toContainText("SHA256");
    await page.addScriptTag({content:axe.source});
    const result = await page.evaluate(async () => (globalThis as unknown as {axe:typeof import("axe-core")}).axe.run(document.querySelector("main")!,{runOnly:{type:"tag",values:["wcag2a","wcag2aa","wcag21aa"]}}));
    expect(result.violations).toEqual([]);
  });
});
