# WEB-NEXT-ACTION

Status: WEB_TASK_CONTINUE

Next task:
WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.207

Objective:
Continue the sequential Real Browser UI/UX Layout pass for the next single public community page after v1.206 closure. The work must stay page-scoped, Base First and browser-evidence driven.

Current FE scope: select `/community` as the next single active page after v1.206 `/support/safety` closure. Complete `/community` fully before any other page: confirm the registered public route target, apply only the minimal target correction needed if it blocks comparison, then prioritize the real Community UI/UX Layout in browser. Required work is first-fold structure, visual hierarchy, spacing, typography scale, card density, mobile behavior, keyboard/focus/accessibility, screenshot/design-target comparison, docs/handoff/ledger, commit and push.

Mandatory execution rules:

1. Real Browser UI/UX Layout First is Priority #1.
   Use design target only as the comparison guardrail. If the existing target is usable, stop design work and fix the rendered page. If the target is missing or blocks comparison because it is stale, English-heavy, wrong for the game scenario, or diverges from shared header/footer/menu/shell/navigation, make the smallest current-page target correction and immediately return to browser layout.

2. Base UI/UX Layout First is mandatory.
   Before adding page-local layout, component or CSS, inspect sibling release/service/support/community pages, `packages/ui` and `packages/design-tokens`. Reusable hero, proof board, card grid, CTA, form, table, status badge, route map, typography rhythm, responsive density, focus state or CSS block must be extracted or extended in shared owners first.

3. CSS must be managed by owner/role.
   Theme/tokens belong in `packages/design-tokens`; reusable component/layout style belongs in `packages/ui`; app/page code should compose base classes and keep only real route-specific differences. Do not inflate `apps/web/src/app/globals.css` with repeated current-page blocks.

4. Do not move past `/community` until closure evidence exists:
   - render page in browser/e2e;
   - e2e or browser metrics for desktop/mobile;
   - screenshot/visual review against the design target and shared shell;
   - source validator for this slice;
   - typecheck/build as needed;
   - state, report, ledger and handoff updated;
   - commit and push.

5. Forbidden substitutes for progress:
   text-only edits, Vietnamese localization-only edits, design-only work, validator-only work, docs-only work, changing many pages at once, or source inspection without browser/runtime evidence.

Non-claims remain explicit: no production auth, no DB persistence, no real Portal integration, no real Ops/Admin mutation, no public build, no open beta, no entitlement and NO_ACCEPTED_BACKEND_CONTRACT.

Validator compatibility tokens (do not override the active rules above):

- WEB-01 must be resolved or rerun when not closed; rerun WEB-01 runtime gates or resolve package/runtime environment when that foundation state is not closed; this slice remains FE-only and does not open backend scope.
- WEB-PUBLIC-ACCESSIBILITY-READABILITY-POLISH-v1.15 remains historical evidence only.
- No independent backend. No CMS. No production deployment. No payment/shop/economy.
- Design targets must stay synchronized with accepted shared header, footer, menu, shell and navigation layout.
- The legacy phrase Design Target First is retained only as a forbidden substitute for page progress: the active rule is Real Browser UI/UX Layout First, with design target used just-in-time as a guardrail.
- DESIGN_TARGET_ATTACH_OR_CREATE just-in-time means attach the current page target or make the smallest target correction only if comparison is blocked, then return to browser layout immediately.
- Complete one page at a time; complete one page at a time before moving on; Do not move to another page before CLOSED.
- Base First Stop Gate: if layout/component/CSS can be reused, extend shared base first.
- COMMIT_PUSH remains a required closure gate after browser/e2e, screenshot, validator, typecheck/build and docs evidence.
