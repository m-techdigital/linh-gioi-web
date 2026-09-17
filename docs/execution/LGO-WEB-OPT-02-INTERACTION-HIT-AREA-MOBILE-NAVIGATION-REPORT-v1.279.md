# LGO-WEB OPT-02 Interaction Hit-Area & Mobile Navigation Report v1.279

Status: WEB_CLOSED
Source delivery: `5de43e8de9378d57162ad741dd5b3a4e87609417`
Authority: `LGO-WEB-PUBLIC-OPTIMIZATION-BACKLOG-v1.277.md`

## Outcome

WEB-OPT-02 raises real mobile action hit areas without changing public IA, route copy or backend boundaries. The change stays in shared owners: Release landing action geometry, Status filter/disclosure geometry, legacy service proof-card/news-detail actions, and the public marketing navigation rail.

The public mobile navigation keeps the existing keyboard-focus auto-reveal behavior and now exposes an explicit 5px WebKit scrollbar cue in addition to the existing Firefox `scrollbar-color` styling.

Checkbox/radio controls were audited by their associated label hit area; the task does not inflate checkbox glyphs merely to satisfy the geometry rule.

## RED → GREEN evidence

Fresh exact-v1.278 baseline at 390×844: 59 routes, 1,927 audited actionable controls, 72 controls below 44px across 8 routes. Failures were concentrated in `/release` (10), `/status` (8) and six News fallback articles (9 each).
Source RED correctly detected the old Release 40/38px actions, Status 40/38px controls, News 31px mobile actions, missing WebKit nav cue and missing current-state registration. Browser RED reproduced the 72 sub-44px controls and absent WebKit scrollbar geometry.

Final exact clean build at 390×844: 59 routes, zero audited actionable controls below 44px, zero routes with hit-area violations and zero horizontal-overflow routes. Focused v1.279 browser checks pass 2/2.

The v1.278 CSS ownership/payload regression suite passes 4/4 across desktop/mobile on the same exact v1.279 build, proving the ergonomic fix did not reintroduce the removed global CSS payload or overflow.

## Visual review

Representative BEFORE/AFTER captures were reviewed for homepage navigation, `/release`, `/status` and a News fallback article on desktop/mobile. The intended effect is limited to hit-area growth and the nav scrollbar cue; content order, typography hierarchy and page composition remain unchanged.

Measured page-height changes are bounded and expected: homepage unchanged; `/release` desktop +10px/mobile +48px; `/status` desktop +4px/mobile +16px; sampled News fallback desktop unchanged/mobile +82px. These increases correspond to larger touch targets rather than added content.

No horizontal overflow appeared in the 59-route AFTER audit.
## Source/build gates

- `validate_web_opt_interaction_hit_area_v1279.py`: PASS.
- `validate_web_opt_public_css_ownership_v1278.py`: PASS.
- `@lgo-web/ui` typecheck: PASS.
- `@lgo-web/web` typecheck: PASS.
- Web lint: PASS.
- Exact clean production build: 63 static/SSG pages.
- Clean-source `validate_web_current_state.py`: PASS with v1.279 registered as active authority.
- `git diff --check`: PASS before source delivery.

No content rewrite, route IA change, backend feature, Portal/Ops feature or production deployment is included. The next allowed optimization task is WEB-OPT-03 v1.280, Public Asset Boundary & Image Delivery.
