// v1.59 coverage: shared DataTable horizontal scroll wrappers are keyboard-reachable named regions.
import { test, expect } from "@playwright/test";

const ops = process.env.LGO_OPS_URL ?? "http://127.0.0.1:3002";

type Metrics = {
  pageOverflow: number;
  tableWraps: Array<{
    role: string | null;
    tabIndex: number;
    ariaLabel: string | null;
    focused: boolean;
    scrollWidth: number;
    clientWidth: number;
    overflowX: string;
    outlineStyle: string;
  }>;
  linkFontSizes: number[];
};

async function collectMetrics(page: import("@playwright/test").Page): Promise<Metrics> {
  return page.evaluate(() => ({
    pageOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    tableWraps: Array.from(document.querySelectorAll<HTMLElement>(".lgo-data-table-wrap")).map((wrap) => ({
      role: wrap.getAttribute("role"),
      tabIndex: wrap.tabIndex,
      ariaLabel: wrap.getAttribute("aria-label"),
      focused: document.activeElement === wrap,
      scrollWidth: wrap.scrollWidth,
      clientWidth: wrap.clientWidth,
      overflowX: getComputedStyle(wrap).overflowX,
      outlineStyle: getComputedStyle(wrap).outlineStyle,
    })),
    linkFontSizes: Array.from(document.querySelectorAll("main a, main button")).map((node) => Number.parseFloat(getComputedStyle(node).fontSize)),
  }));
}

test.describe("shared DataTable scroll region", () => {
  test("Ops support table wrapper is keyboard reachable and named", async ({ page }) => {
    await page.goto(`${ops}/support`);
    await expect(page.getByRole("heading", { name: "Support triage" })).toBeVisible();
    await expect(page.getByRole("table", { name: "Fixture support triage rows" })).toBeVisible();

    const region = page.getByRole("region", { name: /Fixture support triage rows/ });
    await expect(region).toBeVisible();
    await region.focus();
    await expect(region).toBeFocused();

    const metrics = await collectMetrics(page);
    expect(metrics.pageOverflow, "page horizontal overflow").toBeLessThanOrEqual(0);
    expect(metrics.tableWraps, "data table wrappers").toHaveLength(1);
    const [wrap] = metrics.tableWraps;
    expect(wrap.role, "scroll wrapper role").toBe("region");
    expect(wrap.tabIndex, "scroll wrapper tabindex").toBe(0);
    expect(wrap.ariaLabel, "scroll wrapper aria-label").toContain("Fixture support triage rows");
    expect(wrap.focused, "scroll wrapper focus").toBe(true);
    expect(wrap.overflowX, "scroll wrapper overflow-x").toBe("auto");
    expect(wrap.scrollWidth, "scroll wrapper scroll width").toBeGreaterThanOrEqual(wrap.clientWidth);
    expect(wrap.outlineStyle, "keyboard focus outline").not.toBe("none");
    for (const size of metrics.linkFontSizes) expect(size, "link/button font-size cap").toBeLessThanOrEqual(18);
  });
});
