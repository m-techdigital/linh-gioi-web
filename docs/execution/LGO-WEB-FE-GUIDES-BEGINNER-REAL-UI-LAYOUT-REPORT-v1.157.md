# LGO-WEB-FE-GUIDES-BEGINNER-REAL-UI-LAYOUT-REPORT-v1.157

Status: WEB_CLOSED.

Task: WEB-FE-GUIDES-BEGINNER-REAL-UI-LAYOUT-v1.157.

The `/guides/beginner` page now renders as a compact beginner path instead of a tall v1.8 information dump. The page starts with a Vietnamese hero for Cổng Linh, Đá Luyện and download trust, then shows world story, beginner steps, download status and FAQ in dense shared grids. The change followed Real Browser UI/UX Layout First: browser measurements drove hero height, first-fold story placement, mobile two-column density, typography scale and overflow checks.

Base First decision: reusable game-information depth styles were moved out of `apps/web/src/app/globals.css` into `packages/ui/src/service-layout.css`; `/guides/beginner` consumes the shared compact beginner page layout through `lgo-beginnerpage-stack` and `lgo-beginner-hero-card`.

browser/e2e evidence:

- `LGO_WEB_SKIP_WEBSERVER=1 pnpm exec playwright test tests/e2e/fe-guides-beginner-real-ui-layout-v1157.spec.ts --project=chromium-desktop --project=chromium-mobile` — 2/2 passed.
- Baseline before implementation: mobile scrollHeight about 8279px; story panel about 1930px; guide panel about 1938px; FAQ about 2168px.
- Final browser metrics: mobile scrollHeight about 2902px; mobile h1 about 30px; first story card appears in first fold; no horizontal overflow; desktop page height about 2179px.
- Screenshots reviewed: `/tmp/guides-beginner-desktop-v1157.png`, `/tmp/guides-beginner-mobile-v1157.png`.

Verification completed: source validator, Web/UI typecheck, Web production build and clean current-state closure validator.

Non-claims retained: No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, NO_ACCEPTED_BACKEND_CONTRACT.
