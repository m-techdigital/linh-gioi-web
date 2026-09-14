// v1.92 coverage: public UI has visible atmospheric layers and card/navigation depth, not a flat single-color layout.
import { test, expect, type Page } from "@playwright/test";

const web = process.env.LGO_WEB_URL ?? "http://127.0.0.1:3000";
const routes = ["/", "/community"];

type VisualAtmosphereMetrics = {
  pageOverflow: number;
  maxFont: number;
  shellBefore: { content: string; position: string; backgroundImage: string; opacity: number };
  nav: { backgroundImage: string; boxShadow: string; backdropFilter: string; borderColor: string } | null;
  card: { backgroundImage: string; boxShadow: string; borderColor: string; beforeContent: string; beforeBackground: string } | null;
  button: { backgroundImage: string; boxShadow: string } | null;
};

async function collectVisualAtmosphere(page: Page): Promise<VisualAtmosphereMetrics> {
  return page.evaluate(() => {
    const visibleElements = Array.from(document.querySelectorAll<HTMLElement>("body *")).filter((element) => {
      const rect = element.getBoundingClientRect();
      const style = getComputedStyle(element);
      return rect.width > 0 && rect.height > 0 && style.visibility !== "hidden" && style.display !== "none";
    });
    const shell = document.querySelector<HTMLElement>(".lgo-public-shell");
    const shellBefore = shell ? getComputedStyle(shell, "::before") : null;
    const nav = document.querySelector<HTMLElement>(".lgo-site-header");
    const navStyle = nav ? getComputedStyle(nav) : null;
    const card = document.querySelector<HTMLElement>("main .lgo-card, main .lgo-panel");
    const cardStyle = card ? getComputedStyle(card) : null;
    const cardBefore = card ? getComputedStyle(card, "::before") : null;
    const button = document.querySelector<HTMLElement>("main .lgo-link-button, main .lgo-button");
    const buttonStyle = button ? getComputedStyle(button) : null;
    return {
      pageOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      maxFont: Math.max(...visibleElements.map((element) => Number.parseFloat(getComputedStyle(element).fontSize) || 0)),
      shellBefore: {
        content: shellBefore?.content ?? "none",
        position: shellBefore?.position ?? "static",
        backgroundImage: shellBefore?.backgroundImage ?? "none",
        opacity: Number.parseFloat(shellBefore?.opacity ?? "0") || 0,
      },
      nav: navStyle ? {
        backgroundImage: navStyle.backgroundImage,
        boxShadow: navStyle.boxShadow,
        backdropFilter: navStyle.backdropFilter,
        borderColor: navStyle.borderBottomColor,
      } : null,
      card: cardStyle ? {
        backgroundImage: cardStyle.backgroundImage,
        boxShadow: cardStyle.boxShadow,
        borderColor: cardStyle.borderTopColor,
        beforeContent: cardBefore?.content ?? "none",
        beforeBackground: cardBefore?.backgroundImage ?? "none",
      } : null,
      button: buttonStyle ? {
        backgroundImage: buttonStyle.backgroundImage,
        boxShadow: buttonStyle.boxShadow,
      } : null,
    };
  });
}

test.describe("public visual atmosphere", () => {
  for (const route of routes) {
    test(`${route} has layered visual depth without layout overflow`, async ({ page, isMobile }) => {
      await page.goto(`${web}${route}`);
      const metrics = await collectVisualAtmosphere(page);

      expect(metrics.shellBefore.content, `${route} shell ambient layer`).not.toBe("none");
      expect(metrics.shellBefore.position, `${route} shell ambient position`).toBe("fixed");
      expect(metrics.shellBefore.backgroundImage, `${route} shell ambient background`).toContain("radial-gradient");
      expect(metrics.shellBefore.opacity, `${route} shell ambient opacity`).toBeGreaterThan(0.2);

      expect(metrics.nav?.backgroundImage ?? "none", `${route} nav glass background`).toContain("linear-gradient");
      expect(metrics.nav?.boxShadow ?? "none", `${route} nav shadow`).not.toBe("none");
      expect(metrics.nav?.backdropFilter ?? "none", `${route} nav blur`).toContain("blur");

      expect(metrics.card?.backgroundImage ?? "none", `${route} card layered background`).toContain("radial-gradient");
      expect(metrics.card?.beforeContent ?? "none", `${route} card accent layer`).not.toBe("none");
      expect(metrics.card?.beforeBackground ?? "none", `${route} card accent background`).toContain("linear-gradient");
      expect(metrics.card?.boxShadow ?? "none", `${route} card depth shadow`).not.toBe("none");

      expect(metrics.button?.backgroundImage ?? "none", `${route} button gradient tone`).toContain("linear-gradient");
      expect(metrics.pageOverflow, `${route} visual polish overflow`).toBeLessThanOrEqual(0);
      expect(metrics.maxFont, `${route} visual polish font cap`).toBeLessThanOrEqual(isMobile ? 48 : 64);
    });
  }
});
