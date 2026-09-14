import { test, expect } from "@playwright/test";

const web = process.env.LGO_WEB_URL ?? "http://127.0.0.1:3000";

type CommunityMetrics = {
  overflow: number;
  h1Size: number;
  heroBottom: number;
  boardTop: number;
  boardBottom: number;
  focusTop: number;
  focusBottom: number;
  plazaTop: number;
  plazaBottom: number;
  onboardingTop: number;
  firstFlowText: string;
  staleLeak: string;
  designTargetScope: string;
};

async function collectCommunityMetrics(page): Promise<CommunityMetrics> {
  return page.evaluate(() => {
    const rect = (selector: string) => {
      const node = document.querySelector<HTMLElement>(selector);
      if (!node) return { top: -1, bottom: -1 };
      const r = node.getBoundingClientRect();
      return { top: r.top, bottom: r.bottom };
    };
    const hero = rect(".lgo-communitypage-stack .lgo-detail-hero-card");
    const board = rect(".lgo-communitypage-stack .lgo-community-design-board");
    const focus = rect(".lgo-communitypage-stack .lgo-community-focus-board");
    const plaza = rect(".lgo-communitypage-stack .lgo-community-real-plaza-panel");
    const onboarding = rect(".lgo-communitypage-stack .lgo-onboarding-paths, .lgo-communitypage-stack .lgo-community-onboarding-path-board");
    const h1 = document.querySelector<HTMLElement>("main h1");
    const designTarget = document.querySelector<HTMLElement>(".lgo-design-target-reference");
    const firstFlowText = [
      ".lgo-community-hero-card",
      ".lgo-community-design-board",
      ".lgo-community-focus-board",
      ".lgo-community-real-plaza-panel",
    ].map((selector) => document.querySelector<HTMLElement>(selector)?.textContent ?? "").join(" ");
    const staleLeak = /(No CMS|no backend|Real feedback|ticket flow|accepted API|RBAC|audit contract|static guidance|chat|forum|guild|friend list|ticket backend|moderation backend|Public Service|Onboarding|backend|token)/i.exec(firstFlowText)?.[0] ?? "";
    return {
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      h1Size: h1 ? Number.parseFloat(getComputedStyle(h1).fontSize) : 0,
      heroBottom: hero.bottom,
      boardTop: board.top,
      boardBottom: board.bottom,
      focusTop: focus.top,
      focusBottom: focus.bottom,
      plazaTop: plaza.top,
      plazaBottom: plaza.bottom,
      onboardingTop: onboarding.top,
      firstFlowText,
      staleLeak,
      designTargetScope: designTarget?.textContent ?? "",
    };
  });
}

test.describe("community real UI layout v1.149", () => {
  test("/community follows Vietnamese community target with compact browser layout", async ({ page, isMobile }) => {
    await page.goto(`${web}/community`);
    await expect(page.getByRole("heading", { level: 1, name: "Cộng đồng Linh Giới" })).toBeVisible();
    await expect(page.getByRole("region", { name: /Design target reference.*Cộng đồng Linh Giới/i })).toBeVisible();
    await expect(page.locator(".lgo-community-design-board img")).toHaveAttribute("alt", /Thiết kế tiếng Việt cho trang cộng đồng Linh Giới/);

    const metrics = await collectCommunityMetrics(page);
    expect(metrics.designTargetScope).toContain("Cộng đồng Linh Giới");
    expect(metrics.firstFlowText).toContain("Board tham chiếu");
    expect(metrics.firstFlowText).toContain("Quảng trường Linh Thành");
    expect(metrics.firstFlowText).toContain("Hòa nhập cộng đồng");
    expect(metrics.firstFlowText).toContain("Quy tắc ứng xử");
    expect(metrics.firstFlowText).toContain("Phản hồi an toàn");
    expect(metrics.staleLeak, "community first-flow should stay Vietnamese and avoid stale backend/chat labels").toBe("");
    expect(metrics.overflow, "community horizontal overflow").toBeLessThanOrEqual(0);
    expect(metrics.h1Size, "community h1 scale").toBeLessThanOrEqual(isMobile ? 42 : 40);

    if (!isMobile) {
      expect(metrics.heroBottom, "desktop hero compactness").toBeLessThanOrEqual(400);
      expect(metrics.boardTop, "desktop target board follows hero").toBeLessThanOrEqual(400);
      expect(metrics.boardBottom, "desktop target board remains first-fold").toBeLessThanOrEqual(590);
      expect(metrics.focusTop, "desktop focus cards follow board").toBeLessThanOrEqual(620);
      expect(metrics.focusBottom, "desktop focus cards stay compact").toBeLessThanOrEqual(900);
      expect(metrics.plazaTop, "desktop plaza screenshots remain discoverable").toBeLessThanOrEqual(930);
      expect(metrics.onboardingTop, "desktop onboarding content follows after first-flow").toBeLessThanOrEqual(2050);
    } else {
      expect(metrics.heroBottom, "mobile hero compactness").toBeLessThanOrEqual(570);
      expect(metrics.boardTop, "mobile target board follows hero").toBeLessThanOrEqual(580);
      expect(metrics.boardBottom, "mobile target board near first viewport").toBeLessThanOrEqual(880);
      expect(metrics.focusTop, "mobile focus cards follow board").toBeLessThanOrEqual(920);
      expect(metrics.focusBottom, "mobile focus cards remain compact").toBeLessThanOrEqual(1540);
      expect(metrics.plazaTop, "mobile plaza follows focus cards").toBeLessThanOrEqual(1560);
      expect(metrics.onboardingTop, "mobile onboarding content follows after first-flow").toBeLessThanOrEqual(3700);
    }
  });
});
