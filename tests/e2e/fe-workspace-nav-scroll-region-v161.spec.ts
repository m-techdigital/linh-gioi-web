// v1.61 coverage: mobile workspace navigation overflow is a keyboard-readable scroll region.
import { test, expect, type Page } from "@playwright/test";

const portal = process.env.LGO_PORTAL_URL ?? "http://127.0.0.1:3001";
const ops = process.env.LGO_OPS_URL ?? "http://127.0.0.1:3002";

type NavMetrics = {
  pageOverflow: number;
  nav: {
    tabIndex: number;
    focused: boolean;
    ariaLabel: string | null;
    scrollWidth: number;
    clientWidth: number;
    overflowX: string;
    outlineStyle: string;
    fontSizes: number[];
    offscreenLinks: number;
  };
};

async function collectNavMetrics(page: Page): Promise<NavMetrics> {
  return page.evaluate(() => {
    const nav = document.querySelector<HTMLElement>(".lgo-workspace-nav");
    if (!nav) throw new Error("missing workspace nav");
    const navRect = nav.getBoundingClientRect();
    const linkMetrics = Array.from(nav.querySelectorAll<HTMLElement>("a")).map((link) => {
      const rect = link.getBoundingClientRect();
      return {
        fontSize: Number.parseFloat(getComputedStyle(link).fontSize),
        offscreen: rect.right > navRect.right + 1 || rect.left < navRect.left - 1,
      };
    });
    return {
      pageOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      nav: {
        tabIndex: nav.tabIndex,
        focused: document.activeElement === nav,
        ariaLabel: nav.getAttribute("aria-label"),
        scrollWidth: nav.scrollWidth,
        clientWidth: nav.clientWidth,
        overflowX: getComputedStyle(nav).overflowX,
        outlineStyle: getComputedStyle(nav).outlineStyle,
        fontSizes: linkMetrics.map((item) => item.fontSize),
        offscreenLinks: linkMetrics.filter((item) => item.offscreen).length,
      }
    };
  });
}

async function expectWorkspaceNavReadable(page: Page, base: string, route: string, heading: string, label: string) {
  await page.goto(`${base}${route}`);
  await expect(page.getByRole("heading", { name: heading })).toBeVisible();
  const nav = page.getByRole("navigation", { name: label });
  await expect(nav).toBeVisible();
  await nav.focus();
  await expect(nav).toBeFocused();
  const metrics = await collectNavMetrics(page);
  expect(metrics.pageOverflow, `${label} page overflow`).toBeLessThanOrEqual(0);
  expect(metrics.nav.ariaLabel, `${label} aria-label`).toBe(label);
  expect(metrics.nav.tabIndex, `${label} nav tabindex`).toBe(0);
  expect(metrics.nav.focused, `${label} nav focused`).toBe(true);
  expect(metrics.nav.scrollWidth, `${label} nav scroll width`).toBeGreaterThan(metrics.nav.clientWidth);
  expect(metrics.nav.overflowX, `${label} overflow-x`).toBe("auto");
  expect(metrics.nav.outlineStyle, `${label} focus outline`).not.toBe("none");
  expect(metrics.nav.offscreenLinks, `${label} has horizontally hidden links to scroll`).toBeGreaterThan(0);
  for (const size of metrics.nav.fontSizes) expect(size, `${label} nav font-size`).toBeLessThanOrEqual(18);
}

test.describe("workspace navigation scroll region", () => {
  test("Portal mobile workspace nav is keyboard-readable when horizontally scrollable", async ({ page, isMobile }) => {
    test.skip(!isMobile, "mobile-only horizontal nav scroll coverage");
    await expectWorkspaceNavReadable(page, portal, "/", "Tổng quan người chơi", "Linh Giới navigation");
  });

  test("Ops mobile workspace nav is keyboard-readable when horizontally scrollable", async ({ page, isMobile }) => {
    test.skip(!isMobile, "mobile-only horizontal nav scroll coverage");
    await expectWorkspaceNavReadable(page, ops, "/support", "Support triage", "Linh Giới navigation");
  });
});
