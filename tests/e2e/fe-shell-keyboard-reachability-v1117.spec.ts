// v1.117 coverage: public, Portal and Ops shells keep keyboard-reachable skip links, navigation and design-target actions.
import { test, expect, type Page } from "@playwright/test";

const web = process.env.LGO_WEB_URL ?? "http://127.0.0.1:3000";
const portal = process.env.LGO_PORTAL_URL ?? "http://127.0.0.1:3001";
const ops = process.env.LGO_OPS_URL ?? "http://127.0.0.1:3002";

const shellSurfaces = [
  {
    label: "Public Core",
    url: web,
    route: "/",
    skipSelector: ".lgo-skip-link",
    contentSelector: "#main-content",
    navName: /Điều hướng công khai Linh Giới Online/i,
    designScope: null,
    navFontCap: 18,
  },
  {
    label: "Player Portal",
    url: portal,
    route: "/",
    skipSelector: ".lgo-workspace-skip",
    contentSelector: "#workspace-content",
    navName: /Linh Giới navigation/i,
    designScope: /Player Portal/i,
    navFontCap: 18,
  },
  {
    label: "Ops/Admin",
    url: ops,
    route: "/",
    skipSelector: ".lgo-workspace-skip",
    contentSelector: "#workspace-content",
    navName: /Linh Giới navigation/i,
    designScope: /Ops\/Admin/i,
    navFontCap: 18,
  },
];

type ShellKeyboardMetrics = {
  overflow: number;
  skipFocused: boolean;
  contentFocused: boolean;
  navFocused: boolean;
  designFocused: boolean;
  navFontSizes: number[];
  focusedOutlineStyle: string;
};

async function metrics(page: Page, selectors: { skipSelector: string; contentSelector: string }): Promise<ShellKeyboardMetrics> {
  return page.evaluate(({ skipSelector, contentSelector }) => {
    const active = document.activeElement;
    const nav = document.querySelector<HTMLElement>("nav");
    const designLink = document.querySelector<HTMLElement>(".lgo-design-target-reference-link");
    const sizes = (selector: string) => Array.from(document.querySelectorAll<HTMLElement>(selector)).map((node) => Number.parseFloat(getComputedStyle(node).fontSize));
    return {
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      skipFocused: active === document.querySelector(skipSelector),
      contentFocused: active === document.querySelector(contentSelector),
      navFocused: active === nav || Boolean(active?.closest("nav")),
      designFocused: active === designLink || Boolean(active?.closest(".lgo-design-target-reference")),
      navFontSizes: sizes("nav a"),
      focusedOutlineStyle: active ? getComputedStyle(active as Element).outlineStyle : "none",
    };
  }, selectors);
}

test.describe("shell keyboard reachability", () => {
  for (const surface of shellSurfaces) {
    test(`${surface.label} shell exposes skip, nav and design target actions to keyboard users`, async ({ page }) => {
      await page.goto(`${surface.url}${surface.route}`);
      await expect(page.locator("main h1").first(), `${surface.label} h1`).toBeVisible();
      await expect(page.getByRole("navigation", { name: surface.navName })).toBeVisible();
      if (surface.designScope) {
        await expect(page.getByRole("region", { name: new RegExp(`Design target reference.*${surface.designScope.source}`, "i") })).toBeVisible();
      } else {
        await expect(page.locator(".lgo-design-target-band")).toHaveCount(0);
        await expect(page.locator(".lgo-nav-play")).toBeVisible();
      }

      await page.keyboard.press("Tab");
      await expect(page.locator(surface.skipSelector), `${surface.label} skip link first tab stop`).toBeFocused();
      expect((await metrics(page, surface)).skipFocused, `${surface.label} skip link focused`).toBe(true);

      await page.keyboard.press("Enter");
      await expect(page.locator(surface.contentSelector), `${surface.label} skip target focus`).toBeFocused();
      expect((await metrics(page, surface)).contentFocused, `${surface.label} main content focused after skip`).toBe(true);

      const nav = page.getByRole("navigation", { name: surface.navName });
      await nav.focus();
      const navMetrics = await metrics(page, surface);
      expect(navMetrics.navFocused, `${surface.label} nav keyboard focus`).toBe(true);
      expect(navMetrics.focusedOutlineStyle, `${surface.label} nav focus outline`).not.toBe("none");
      expect(navMetrics.overflow, `${surface.label} horizontal overflow`).toBeLessThanOrEqual(0);
      for (const size of navMetrics.navFontSizes) expect(size, `${surface.label} nav font-size`).toBeLessThanOrEqual(surface.navFontCap);

      if (surface.designScope) {
        const designLink = page.getByRole("link", { name: new RegExp(`${surface.label}.*opens in a new tab`, "i") }).first();
        await designLink.focus();
        await expect(designLink, `${surface.label} design target link keyboard focus`).toBeFocused();
        const designMetrics = await metrics(page, surface);
        expect(designMetrics.designFocused, `${surface.label} design target region keyboard focus`).toBe(true);
        expect(designMetrics.focusedOutlineStyle, `${surface.label} design target focus outline`).not.toBe("none");
      } else {
        const publicAction = page.locator(".lgo-nav-play");
        await publicAction.focus();
        await expect(publicAction, `${surface.label} primary action keyboard focus`).toBeFocused();
        const actionMetrics = await metrics(page, surface);
        expect(actionMetrics.focusedOutlineStyle, `${surface.label} primary action focus outline`).not.toBe("none");
      }
    });
  }
});
