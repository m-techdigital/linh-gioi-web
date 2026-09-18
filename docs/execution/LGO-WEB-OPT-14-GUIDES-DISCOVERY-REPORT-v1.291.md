# LGO-WEB OPT-14 Guides Discovery Report v1.291

Status: WEB_CLOSED
Source delivery: `5fcb4c07b6959d67eeee670c06d068b7e87cd9f2`
Authority: `LGO-WEB-PUBLIC-OPTIMIZATION-BACKLOG-v1.277.md`

## Outcome

`/guides` now opens on the curated **Nhập môn** intent shelf instead of rendering all 16 published guides at once. Players see three starter guides first, while **Tất cả (16)** remains one action away and exposes every published title, description and route.

The shared `ReadingCatalog` gains only an optional `initialGroupId`; its default remains `all`, so other consumers keep prior behavior. On mobile, only the `/guides` filter row becomes a one-line horizontal intent rail; search, reset, native disclosures and local-only filtering remain unchanged.

## Runtime improvement

Exact v1.290 baseline: desktop `2,912px`, mobile `5,028px`. Final: desktop `1,526px` (-47.60%) and mobile `2,608px` (-48.13%).
The guide-library region drops desktop `1,973px → 587px` and mobile `3,441px → 1,020px`. Initial rendered guide cards drop `16 → 3`, while the result status truthfully reports `3/16` until the user selects another intent or **Tất cả**.

Mobile filter controls fall `423px → 325px`; category choices change from three grid rows to one horizontal rail (`scrollWidth 695px / clientWidth 362px`) with zero page-level overflow.

## Browser and regression evidence

Fresh production-static BEFORE/RED on the verified v1.290 artifact produced 3/8 PASS and five expected failures: default group was still All on desktop/mobile/reload and the mobile filters were still a grid. BEFORE desktop/mobile screenshots and metrics are retained under `handoff/web-opt-v1.291/evidence/before`.

Final exact-WIP production browser run is **28/28 PASS** across desktop/mobile: v1.291 discovery checks plus the complete v1.234 guide-directory regression. This proves all 16 source guides remain reachable, title/summary text is unchanged, search is accent-insensitive/local-only, reset/focus/reload behavior remains valid, compact touch targets remain >=44px and axe A/AA/2.1AA remains clean.

The numeric guard requires initial discovery height `<=1,800px` desktop and `<=3,000px` mobile; the measured final is comfortably below both.
## Closure verification

Clean temporary production build: 63/63 routes. Content tests: 20/20. Content/UI/Web typecheck, Web lint, v1.291/v1.234/v1.290/v1.284 source guards and `git diff --check` PASS. Clean 2,018-file `WEB CURRENT STATE` candidate PASS.

The v1.234 compatibility migration changes only assertions superseded by v1.291: initial view is curated Nhập môn, but selecting **Tất cả** still verifies all 16 titles/descriptions/routes and manual reset still returns to the full catalog.

## Non-claims / next

No backend search, personalization, saved reading state, account data, CMS, production auth, DB persistence, payment/economy or production deployment is introduced.

Next: `WEB-OPT-15-NEWS-PLAYER-DISCOVERY-v1.292` on `/news` only.
