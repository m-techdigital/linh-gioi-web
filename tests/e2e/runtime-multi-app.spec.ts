import { expect, test } from "@playwright/test";

type RuntimeApp = {
  name: string;
  baseURL: string;
  routes: Array<{ path: string; heading: RegExp; requiredText: RegExp }>;
};

const apps: RuntimeApp[] = [
  {
    name: "public web",
    baseURL: process.env.LGO_WEB_PUBLIC_BASE_URL ?? "http://127.0.0.1:3000",
    routes: [
      { path: "/", heading: /Linh Giới Online/i, requiredText: /WEB v1.8 game info depth/i },
      { path: "/game", heading: /Thế giới Linh Giới/i, requiredText: /No production auth, DB persistence/i },
      { path: "/roadmap", heading: /Roadmap phát triển web/i, requiredText: /WEB-08/i },
      { path: "/download", heading: /Trạng thái tải game/i, requiredText: /WEB v1.8 download status depth/i },
      { path: "/guides/beginner", heading: /Hướng dẫn người chơi mới/i, requiredText: /WEB v1.8 beginner guide/i }
    ]
  },
  {
    name: "player portal",
    baseURL: process.env.LGO_WEB_PORTAL_BASE_URL ?? "http://127.0.0.1:3001",
    routes: [
      { path: "/", heading: /Player Portal Shell/i, requiredText: /No production auth is claimed/i },
      { path: "/login", heading: /Login shell/i, requiredText: /PROVISIONAL_WEB_FIXTURE/i },
      { path: "/characters", heading: /Characters shell/i, requiredText: /NOT_CANONICAL_BACKEND_CONTRACT/i }
    ]
  },
  {
    name: "ops admin",
    baseURL: process.env.LGO_WEB_OPS_BASE_URL ?? "http://127.0.0.1:3002",
    routes: [
      { path: "/", heading: new RegExp("Ops/Admin Shell", "i"), requiredText: new RegExp("No real ops/admin mutation is claimed", "i") },
      { path: "/control-center", heading: /Control Center/i, requiredText: /No real mutation endpoints/i },
      { path: "/audit", heading: /Audit/i, requiredText: /NO_REAL_OPS_MUTATION/i }
    ]
  }
];

for (const app of apps) {
  test.describe(`${app.name} runtime route matrix`, () => {
    for (const route of app.routes) {
      test(`${app.name} ${route.path} renders with explicit non-claim markers`, async ({ page }) => {
        await page.goto(new URL(route.path, app.baseURL).toString());
        await expect(page.getByRole("heading", { name: route.heading })).toBeVisible();
        await expect(page.locator("body")).toContainText(route.requiredText);
      });
    }
  });
}
