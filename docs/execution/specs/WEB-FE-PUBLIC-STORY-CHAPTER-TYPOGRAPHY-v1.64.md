# WEB-FE-PUBLIC-STORY-CHAPTER-TYPOGRAPHY-v1.64

Status: WEB_CLOSED

## SELECT

The selected v1.64 issue is the public `/story` `NarrativeChapterGrid` decorative chapter number scale. Browser audit on mobile found the visible chapter numbers `01`, `02`, `03` at 60.8px, larger than the page heading scale and visually too dominant.

## SPEC_LOCK

Scope is FE-only CSS and browser coverage. Mobile `/story` chapter numbers must stay decorative, stay below 48px, remain subordinate to headings, and not introduce horizontal overflow. This task does not add backend calls, forms, DTOs, route handlers or fixture mutation.

## IMPLEMENT

- Added a post-base mobile override in `apps/web/src/app/globals.css` for `.lgo-chapter-visual` and `.lgo-chapter-visual span`.
- Mobile chapter visuals now use `height: 5.8rem` and the decorative chapter number uses `font-size: 2.75rem`.
- Added Playwright coverage for mobile `/story` font caps and overflow.

## SOURCE_VERIFY

- `python3 tools/validate_web_fe_public_story_chapter_typography_v164.py` PASS.
- `pnpm --filter @lgo-web/web typecheck` PASS.
- No independent backend, app API route, fetch adapter or canonical DTO was added.

## RUNTIME_VERIFY

- RED: `pnpm exec playwright test tests/e2e/fe-public-story-chapter-typography-v164.spec.ts --project=chromium-mobile` failed with chapter number `01` at 60.8px.
- GREEN: same Playwright mobile e2e PASS after implementation.
- Public story-related regression: `pnpm exec playwright test tests/e2e/fe-public-story-chapter-typography-v164.spec.ts --project=chromium-desktop --project=chromium-mobile` PASS with desktop skipped by design and mobile verified.
- Production build: `pnpm --filter @lgo-web/web build` PASS.

## VISUAL_REVIEW

Browser review verified `/story` on mobile: pageOverflow <= 0, exactly three chapter visual numbers were inspected, each number is <= 48px and no wider than 84px, while heading scale remains readable. This directly addresses the user's concern that some FE typography still felt oversized.

## HANDOFF

Closed as FE-only v1.64. Continue FE/browser/e2e audit under `WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.65`.

Non-claims retained: No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT. Browser keyboard/layout audit evidence remains part of the v1.64 closure.
