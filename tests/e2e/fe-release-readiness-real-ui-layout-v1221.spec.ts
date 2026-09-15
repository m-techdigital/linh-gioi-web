import { expect, test } from "@playwright/test";
import axe from "axe-core";

const web = process.env.LGO_WEB_URL ?? "http://127.0.0.1:3000";
test.describe("release readiness real visual composition v1.221", () => {
  test.beforeEach(async ({ page }) => { await page.goto(`${web}/release/readiness`); });
  test("art-backed hero, readable gates and honest release seal", async ({ page }, info) => {
    const hero = page.locator(".lgo-release-hero");
    await expect(hero).toBeVisible();
    await expect(hero.locator("h1")).toHaveText("Sẵn sàng phát hành");
    await expect(hero.locator(".lgo-release-seal")).toContainText("Chưa sẵn sàng");
    await expect(hero.locator("img")).toHaveJSProperty("complete", true);
    expect(await hero.locator("img").evaluate((e: HTMLImageElement) => e.naturalWidth)).toBeGreaterThan(0);
    await expect(hero.locator("[role=progressbar]")).toHaveCount(0);
    const metrics = await page.evaluate(() => {
      const r = (s: string) => document.querySelector<HTMLElement>(s)!.getBoundingClientRect().toJSON();
      return { overflow: document.documentElement.scrollWidth - innerWidth, hero:r(".lgo-release-hero"),
        copy:r(".lgo-release-hero-copy"), gates:r(".lgo-release-gate-console"),
        owner:r(".lgo-release-owner-section"), font:parseFloat(getComputedStyle(document.querySelector("h1")!).fontSize) };
    });
    expect(metrics.overflow).toBeLessThanOrEqual(0);
    expect(metrics.font).toBeGreaterThanOrEqual(30);
    if (info.project.name.includes("desktop")) {
      expect(metrics.copy.x + metrics.copy.width).toBeLessThanOrEqual(metrics.gates.x + 2);
      expect(metrics.owner.top).toBeLessThan(780);
    } else {
      expect(metrics.gates.top).toBeGreaterThan(metrics.copy.top);
      expect(metrics.owner.top).toBeLessThan(1250);
    }
    await info.attach("layout-metrics", {body:JSON.stringify(metrics,null,2),contentType:"application/json"});
    await page.screenshot({path:info.outputPath("readiness-full.png"),fullPage:true});
  });
  test("gate evidence is reachable by keyboard and never line-clamped", async ({ page }) => {
    const owner = page.locator(".lgo-release-owner-section");
    await expect(owner.locator(".lgo-release-gate-card")).toHaveCount(4);
    const gate = owner.locator(".lgo-release-gate-card").first();
    const disclosure = gate.locator("details");
    // Next streams this server-rendered section inside a hidden boundary before revealing it.
    await expect(disclosure.locator("summary")).toBeVisible();
    await disclosure.locator("summary").focus();
    await expect(disclosure.locator("summary")).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(disclosure).toHaveAttribute("open", "");
    await expect(disclosure).toContainText("SHA256");
    const proof = disclosure.locator("p").first();
    expect(await proof.evaluate(e => getComputedStyle(e).webkitLineClamp)).toBe("none");
    await page.keyboard.press("Enter");
    await expect(disclosure).not.toHaveAttribute("open", "");
  });
  test("public sections use real heading labels and safe next actions", async ({ page }) => {
    await expect(page.locator(".lgo-release-owner-section")).toBeVisible();
    const bad = await page.locator(".lgo-release-layout section[aria-labelledby]").evaluateAll(sections => sections.flatMap(s => {
      const id=s.getAttribute("aria-labelledby")!; const target=document.getElementById(id);
      return !target || !/^H[1-6]$/.test(target.tagName) ? [id] : [];
    }));
    expect(bad).toEqual([]);
    const actions = page.locator(".lgo-release-next-routes");
    await expect(actions.getByRole("link",{name:/Tải game/})).toHaveAttribute("href","/download/trust");
    await expect(actions.getByRole("link",{name:/Trạng thái/})).toHaveAttribute("href","/status");
    await expect(actions.getByRole("link",{name:/Hỗ trợ/})).toHaveAttribute("href","/support/safety");
    await expect(page.locator(".lgo-release-layout a[download], .lgo-release-layout form")).toHaveCount(0);
    await expect(page.locator(".lgo-release-layout [role=progressbar]")).toHaveCount(0);
  });
  test("keyboard tab sequence reaches native evidence disclosures", async ({ page }) => {
    await expect(page.locator(".lgo-release-owner-section")).toBeVisible();
    await page.locator(".lgo-skip-link").focus();
    const summary = page.locator(".lgo-release-gate-proof summary").first();
    for (let i = 0; i < 45; i += 1) {
      if (await summary.evaluate(e => e === document.activeElement)) break;
      await page.keyboard.press("Tab");
    }
    await expect(summary).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(summary.locator("..")).toHaveAttribute("open", "");
    await page.keyboard.press("Enter");
    await expect(summary.locator("..")).not.toHaveAttribute("open", "");
  });
  test("main content retains accessible contrast and semantics", async ({ page }, info) => {
    await expect(page.locator(".lgo-release-hero")).toBeVisible();
    await page.addScriptTag({content: axe.source});
    const result = await page.evaluate(async () => {
      const runtime = globalThis as unknown as { axe: typeof import("axe-core") };
      return runtime.axe.run(document.querySelector("main")!, {runOnly: {type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa"]}});
    });
    await info.attach("axe-results", {body: JSON.stringify(result.violations, null, 2), contentType: "application/json"});
    expect(result.violations).toEqual([]);
    await expect(page.locator("main h1")).toHaveCount(1);
    expect(await page.locator("main h1, main h2").first().evaluate(e => e.tagName)).toBe("H1");
  });

});
