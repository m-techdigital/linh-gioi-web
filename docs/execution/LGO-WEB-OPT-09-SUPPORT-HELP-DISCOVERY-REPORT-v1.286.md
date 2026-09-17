# LGO-WEB OPT-09 Support Help Discovery Report v1.286

Status: WEB_CLOSED
Source delivery: `6a69d6ab7c8e65eb5a376a5e9f4c196c37f4fb7a`
Authority: `LGO-WEB-PUBLIC-OPTIMIZATION-BACKLOG-v1.277.md`

## Outcome

`/support/help` now reaches the real local answer directory immediately after the existing six-topic question map. The second six-card topic wall was removed from route composition; the map remains the canonical topic entry surface and all 12 source-backed FAQ questions remain in the six QuestionDirectory groups.

On mobile, the seven local category controls now use one 44px keyboard-scrollable horizontal rail instead of a three-row control block. Selection, hash/history behavior, native disclosure semantics and the full-width focused group remain owned by the existing QuestionDirectory component; no backend search or intake was introduced.

## Runtime improvement

Exact v1.285 baseline desktop height was `2,554px`; final v1.286 is `2,216px` (-13.23%). Mobile was `4,881px`; final is `4,139px` (-15.20%). The answer directory moves from `992px` to `654px` on desktop and from `1,677px` to `1,049px` on mobile.

The final directory begins only `32px` after the hero on desktop and `24px` after it on mobile. Page-level horizontal overflow remains zero; the filter rail owns its own intentional horizontal overflow on mobile.

## TDD and interaction preservation

Clean RED source evidence failed on the duplicate topic owner, missing compact filter rail, missing v1.286 registration and obsolete v1.225 route-order marker. Clean RED browser evidence failed desktop/mobile while `.lgo-guidance-topics` still existed and the mobile filter overflow remained `visible`.

Final isolated browser closure uses dedicated `/tmp` Playwright output to avoid the earlier concurrent `test-results` artifact collision: v1.286 + parent v1.285 `8/8` PASS desktop/mobile, followed by Phase-A mobile v1.279/v1.278/v1.281 `7/7` PASS. Six map links, six question groups, 12 native details, filter/reset, direct fragment focus, keyboard disclosure, no-ticket/backend boundaries and no form/input/textarea remain.

Source guards v1.286, v1.285, v1.225 Help, v1.226 Safety, v1.279 and v1.278 PASS. Web typecheck and lint PASS; exact production build generated 63 pages; clean 2,003-file source candidate `WEB CURRENT STATE` PASS; `git diff --check` PASS.

Fresh BEFORE/AFTER desktop/mobile screenshots, RED logs and geometry are stored under `handoff/web-opt-v1.286/evidence/`.

## Governance compatibility

The v1.225 Help validator remains active: only its route-order marker was migrated from Hero→Topics→Answers to Hero→Answers; its map, six topic IDs, QuestionDirectory, no-intake, stylesheet, design-reference and browser-evidence protections remain. The v1.285 predecessor validator is migrated from active-head-only state to preserved-history transition semantics so a valid successor does not invalidate the closed parent task.

## Non-claims / next

No backend search, ticket submission, account lookup, production auth, DB persistence, CMS, payment/economy or production deployment is claimed. Next: `WEB-OPT-10-SUPPORT-SAFETY-FLOW-v1.287` on `/support/safety` only; preserve v1.285/v1.286 parent/help behavior and do not batch community routes.
