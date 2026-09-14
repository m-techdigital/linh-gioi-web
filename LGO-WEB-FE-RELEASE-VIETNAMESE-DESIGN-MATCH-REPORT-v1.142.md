# LGO WEB FE Release Vietnamese Design Match Report v1.142

Task: WEB-FE-RELEASE-VIETNAMESE-DESIGN-MATCH-v1.142
Status: WEB_CLOSED
Page: Public Release `/release`

v1.142 refreshed the Public Release design target to Vietnamese for the Linh Giới game scenario and reworked the implemented `/release` first flow to match the Linh Giới release scenario: Hành trình phát hành, M0 → M1 gate, and Bằng chứng trước lời hứa before any readiness follow-up.

Changes:
- Public Release target image refreshed in both public and docs design-reference locations.
- Public design target link label changed to `Thiết kế chi tiết phát hành`.
- `/release` metadata, hero, CTA and first-flow copy changed to Vietnamese.
- The M0 → M1 SVG board visible on the page was rewritten from old runtime/combat governance text to Vietnamese release-stage text.
- `ReleaseNarrativeStageBoard` now appears before the readiness CTA and renders six compact stage cards.
- Stage fixtures now include M0 content readiness, trust checks, closed-test conditions, backend contract, owner approval and M1 closed test.
- CSS v1.142 compacts the hero, board and proof cards so the desktop first fold shows the target-led sequence.

Evidence browser/e2e screenshot:
- RED: Playwright desktop/mobile initially failed because `/release` still exposed `Release detailed design target`.
- GREEN: `tests/e2e/fe-release-vietnamese-design-match-v1142.spec.ts` passed on chromium desktop/mobile.
- Screenshot review: desktop 1280x720 metrics after fix showed hero bottom 360.922px, board top 356.125px, board bottom 537.875px, stage board top 561.875px, overflow 0.
- Visual review compared against the registered Public Release design target and corrected the component order to match the target.

Validation to keep at closure:
- `python3 tools/validate_web_fe_release_design_target_density_v1127.py`
- `python3 tools/validate_web_fe_release_vietnamese_design_match_v1142.py`
- `LGO_WEB_SKIP_WEBSERVER=1 pnpm exec playwright test tests/e2e/fe-release-design-target-density-v1127.spec.ts tests/e2e/fe-release-vietnamese-design-match-v1142.spec.ts --project=chromium-desktop --project=chromium-mobile`
- `pnpm --filter @lgo-web/content test`
- `pnpm --filter @lgo-web/web typecheck`
- `pnpm --filter @lgo-web/web build`

Process rules retained: Sequential Page Completion, Just-in-time Design, Design Target First, Layout Match Before Closure, Base UI/UX Layout.

Non-claims: No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, NO_ACCEPTED_BACKEND_CONTRACT.
