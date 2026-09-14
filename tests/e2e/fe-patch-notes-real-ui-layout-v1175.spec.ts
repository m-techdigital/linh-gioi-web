// v1.175 coverage: /patch-notes must render as a compact release-note surface, not raw fixtures.
import { test, expect, type Page } from "@playwright/test";

const web = process.env.LGO_WEB_URL ?? "http://127.0.0.1:3000";

type PatchMetrics = {
  h1Font: number;
  maxFont: number;
  pageOverflow: number;
  heroTop: number;
  heroBottom: number;
  boardTop: number;
  firstCardTop: number;
  actionBandTop: number;
  scrollHeight: number;
  columns: number;
};

async function collectPatchMetrics(page: Page): Promise<PatchMetrics> {
  return page.evaluate(() => {
    const visibleElements = Array.from(document.querySelectorAll<HTMLElement>("body *")).filter((element) => {
      const rect = element.getBoundingClientRect();
      const style = getComputedStyle(element);
      return rect.width > 0 && rect.height > 0 && style.visibility !== "hidden" && style.display !== "none";
    });
    const rect = (selector: string) => {
      const element = document.querySelector<HTMLElement>(selector);
      if (!element) throw new Error(`Missing ${selector}`);
      const box = element.getBoundingClientRect();
      return { top: box.top, bottom: box.bottom };
    };
    const h1 = document.querySelector<HTMLElement>("h1");
    const hero = rect(".lgo-patchnotes-hero-card");
    const board = rect(".lgo-patchnotes-board");
    const firstCard = rect(".lgo-patchnotes-card");
    const actionBand = rect(".lgo-action-band");
    const grid = document.querySelector<HTMLElement>(".lgo-patchnotes-grid");
    if (!h1 || !grid) throw new Error("Missing patch notes layout anchors");
    return {
      h1Font: Number.parseFloat(getComputedStyle(h1).fontSize) || 0,
      maxFont: Math.max(...visibleElements.map((element) => Number.parseFloat(getComputedStyle(element).fontSize) || 0)),
      pageOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      heroTop: hero.top,
      heroBottom: hero.bottom,
      boardTop: board.top,
      firstCardTop: firstCard.top,
      actionBandTop: actionBand.top,
      scrollHeight: document.documentElement.scrollHeight,
      columns: getComputedStyle(grid).gridTemplateColumns.split(" ").length,
    };
  });
}

test.describe("patch notes real UI layout v1.175", () => {
  test("/patch-notes renders compact release-note boundary layout without raw fixture CMS claims", async ({ page, isMobile }) => {
    await page.goto(`${web}/patch-notes`);

    await expect(page.getByRole("heading", { level: 1, name: "Ghi chú cập nhật Linh Giới" })).toBeVisible();
    await expect(page.getByText("Nhật ký cập nhật tĩnh", { exact: true })).toBeVisible();
    await expect(page.getByRole("heading", { level: 2, name: "Bản ghi hiện là nhật ký phát triển công khai" })).toBeVisible();
    await expect(page.locator(".lgo-patchnotes-hero-card")).toBeVisible();
    await expect(page.locator(".lgo-patchnotes-board")).toBeVisible();
    await expect(page.locator(".lgo-patchnotes-card").first()).toBeVisible();
    await expect(page.locator(".lgo-action-band")).toBeVisible();

    const bodyText = await page.locator("main").innerText();
    expect(bodyText).not.toMatch(/Local content|Fixture entries|PROVISIONAL_WEB_FIXTURE · No CMS · No backend|No CMS|No backend|Patch notes hiện là fixture|CMS live|release production/i);

    const heroStatusLink = page.locator(".lgo-patchnotes-hero-card").getByRole("link", { name: "Trạng thái chơi" });
    await heroStatusLink.focus();
    await expect(heroStatusLink).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/\/status$/);
    await page.goBack();
    await expect(page.getByRole("heading", { level: 1, name: "Ghi chú cập nhật Linh Giới" })).toBeVisible();

    const metrics = await collectPatchMetrics(page);
    expect(metrics.pageOverflow, "body horizontal overflow").toBeLessThanOrEqual(0);
    if (isMobile) {
      expect(metrics.h1Font, "mobile h1 scale").toBeLessThanOrEqual(31);
      expect(metrics.maxFont, "mobile visible font cap").toBeLessThanOrEqual(31);
      expect(metrics.heroTop, "mobile hero starts after shell").toBeLessThanOrEqual(150);
      expect(metrics.heroBottom, "mobile hero compact").toBeLessThanOrEqual(630);
      expect(metrics.boardTop, "mobile board follows hero").toBeLessThanOrEqual(645);
      expect(metrics.firstCardTop, "mobile first patch card near first fold").toBeLessThanOrEqual(860);
      expect(metrics.actionBandTop, "mobile action band not pushed by raw fixtures").toBeLessThanOrEqual(1350);
      expect(metrics.scrollHeight, "mobile patch notes page height compact").toBeLessThanOrEqual(2200);
      expect(metrics.columns).toBe(1);
    } else {
      expect(metrics.h1Font, "desktop h1 scale").toBeLessThanOrEqual(50);
      expect(metrics.maxFont, "desktop visible font cap").toBeLessThanOrEqual(50);
      expect(metrics.heroTop, "desktop hero starts first").toBeLessThanOrEqual(115);
      expect(metrics.heroBottom, "desktop hero compact").toBeLessThanOrEqual(430);
      expect(metrics.boardTop, "desktop board follows hero").toBeLessThanOrEqual(445);
      expect(metrics.firstCardTop, "desktop first patch card near first fold").toBeLessThanOrEqual(660);
      expect(metrics.actionBandTop, "desktop action band stays visible soon after board").toBeLessThanOrEqual(850);
      expect(metrics.scrollHeight, "desktop patch notes page height compact").toBeLessThanOrEqual(1500);
      expect(metrics.columns).toBeGreaterThanOrEqual(1);
    }

    await page.screenshot({ path: `/tmp/patch-notes-${isMobile ? "mobile" : "desktop"}-v1175.png`, fullPage: true });
  });
});
