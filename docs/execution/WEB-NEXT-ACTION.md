# WEB-NEXT-ACTION

Status: WEB_TASK_CONTINUE

Owner delivery override: Do not push. Close each page with a local source checkpoint, verified ZIP/SHA256 and browser evidence, then continue without asking for confirmation.

Next task:
WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.223

Objective:
Continue the sequential Real Browser UI/UX Layout pass for the next single public service status page after v1.222 `/release/tester-pack` closure. The work must stay page-scoped, Base First and browser-evidence driven.

Current FE scope: select `/status` as the next single active page after v1.222 `/release/tester-pack` closure. Complete `/status` fully before any other page: confirm the registered public route target, apply only the minimal target correction needed if it blocks comparison, then prioritize the real Status UI/UX Layout in browser. Required work is first-fold honest service state and incident/maintenance reading structure, visual hierarchy, spacing, typography scale, service component and history density, mobile behavior, keyboard/focus/accessibility, screenshot/design-target comparison, docs/handoff/ledger, local commit and ZIP/SHA256 handoff (push waived).

Mandatory execution rules:

1. Real Browser UI/UX Layout First is Priority #1.
   Use design target only as the comparison guardrail. If the existing target is usable, stop design work and fix the rendered page. If the target is missing or blocks comparison because it is stale, English-heavy, wrong for the game scenario, or diverges from shared header/footer/menu/shell/navigation, make the smallest current-page target correction and immediately return to browser layout.

2. Base UI/UX Layout First is mandatory.
   Before adding page-local layout, component or CSS, inspect sibling release/download/download-trust/status/support/performance/accessibility pages, `packages/ui` and `packages/design-tokens`. Reusable hero, proof board, card grid, CTA, form, table, status badge, route map, typography rhythm, responsive density, focus state or CSS block must be extracted or extended in shared owners first.

3. CSS must be managed by owner/role.
   Theme/tokens belong in `packages/design-tokens`; reusable component/layout style belongs in `packages/ui`; app/page code should compose base classes and keep only real route-specific differences. Do not inflate `apps/web/src/app/globals.css` with repeated current-page blocks.

4. Do not move past `/status` until closure evidence exists:
   - render page in browser/e2e;
   - e2e or browser metrics for desktop/mobile;
   - screenshot/visual review against the design target and shared shell;
   - source validator for this slice;
   - typecheck/build as needed;
   - state, report, ledger and handoff updated;
   - local commit and ZIP/SHA256 handoff (push waived).

5. Forbidden substitutes for progress:
   - text-only/copy-only changes;
   - translation-only changes;
   - design-only work;
   - validator/doc-only work;
   - content edits without browser evidence;
   - multiple pages at once.

6. If execution drifts, stop and reset to this page:
   - return to `/status`;
   - inspect the rendered browser layout;
   - check Base First owners;
   - modify shared base if a pattern repeats;
   - continue until `/release/tester-pack` is closed.

Non-claims: FE-only until accepted game backend contracts exist; no independent backend, no production auth, no DB persistence, no CMS, no production deployment, no payment/shop/economy.

Validator compatibility and anti-drift guardrails:
- resolve package/runtime environment or rerun WEB-01 runtime gates if foundation evidence is ever invalidated; rerun WEB-01 through WEB-07 package/runtime/browser gates only when their closed evidence is invalidated.
- Historical closed marker: WEB-PUBLIC-ACCESSIBILITY-READABILITY-POLISH-v1.15.
- No independent backend. No CMS. No production deployment. No payment/shop/economy.
- Vietnamese is required for user-facing design/layout evidence unless a file is an external technical identifier.
- Design targets must stay synchronized with accepted shared header, footer, menu, shell and navigation layout.
- Deprecated phrase marker for old validators: Design Target First. Active interpretation for this task is not design-first execution; design remains only a just-in-time guardrail after Real Browser UI/UX Layout First.
- complete one page at a time; DESIGN_TARGET_ATTACH_OR_CREATE just-in-time only when comparison is blocked; LOCAL_HANDOFF after closure evidence; COMMIT_PUSH is a historical marker only; Do not move to another page before CLOSED.
- Base First Stop Gate: inspect shared owners and reuse/extend shared layout before page-local component or CSS work.
- just-in-time design correction is allowed only for the current page and must immediately return to browser layout.
