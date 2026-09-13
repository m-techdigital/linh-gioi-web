// v1.46 coverage: Ops/Admin blocked mutation controls are keyboard-readable and non-operational.
import { test, expect } from "@playwright/test";

const ops = process.env.LGO_OPS_URL ?? "http://127.0.0.1:3002";

type RouteCase = {
  path: string;
  heading: string | RegExp;
  actions: string[];
};

const cases: RouteCase[] = [
  { path: "/trust-safety", heading: "Trust & Safety", actions: ["Chuyển phê duyệt — chưa khả dụng", "Áp dụng biện pháp — chưa khả dụng"] },
  { path: "/content-liveops", heading: "Content & LiveOps", actions: ["Publish event — blocked", "Rollback — blocked"] },
  { path: "/support/support-fixture-001", heading: /Support review · support-fixture-001/, actions: ["Assign case — blocked", "Escalate — blocked"] },
  { path: "/player-operations/fixture-001", heading: /Player review · Fixture Player 001/, actions: ["Suspend account — blocked", "Apply moderation — blocked"] },
  { path: "/game-operations/world-fixture-001", heading: /Operation review · World session A/, actions: ["Apply operation — blocked"] },
];

type Metrics = { overflow: boolean; buttonFont: number[]; focusedOutline: string };

async function collectMetrics(page: import("@playwright/test").Page): Promise<Metrics> {
  return page.evaluate(() => {
    const buttonFont = Array.from(document.querySelectorAll("main button")).map((node) => Number.parseFloat(getComputedStyle(node).fontSize));
    const active = document.activeElement as HTMLElement | null;
    return {
      overflow: document.documentElement.scrollWidth > innerWidth,
      buttonFont,
      focusedOutline: active ? getComputedStyle(active).outlineStyle : "",
    };
  });
}

async function expectBlockedAction(page: import("@playwright/test").Page, name: string, writes: string[]) {
  const button = page.getByRole("button", { name });
  await expect(button).toHaveAttribute("aria-disabled", "true");
  await expect(button).toHaveAttribute("data-disabled", "true");
  await expect(button).toHaveAttribute("aria-describedby", /blocked-action/);
  await button.focus();
  await expect(button).toBeFocused();
  const metrics = await collectMetrics(page);
  expect(metrics.focusedOutline, "keyboard focus").not.toBe("none");
  await button.click({ force: true });
  await page.keyboard.press("Enter");
  expect(writes).toEqual([]);
  expect(metrics.overflow, "horizontal overflow").toBe(false);
  for (const size of metrics.buttonFont) expect(size, "font-size button").toBeLessThanOrEqual(18);
}

test.describe("Ops blocked action keyboard clarity", () => {
  for (const route of cases) {
    test(`${route.path} exposes focusable blocked actions without writes`, async ({ page }) => {
      const writes: string[] = [];
      page.on("request", (request) => {
        if (!["GET", "HEAD"].includes(request.method())) writes.push(`${request.method()} ${request.url()}`);
      });
      await page.goto(`${ops}${route.path}`);
      await expect(page.getByRole("heading", { name: route.heading })).toBeVisible();
      await expect(page.getByText("NO_ACCEPTED_BACKEND_CONTRACT").first()).toBeVisible();
      for (const action of route.actions) {
        await expectBlockedAction(page, action, writes);
      }
    });
  }
});
