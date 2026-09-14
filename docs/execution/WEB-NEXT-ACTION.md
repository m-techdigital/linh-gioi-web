# WEB-NEXT-ACTION

Current task:

```text
WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.137
```

Status: WEB_TASK_CONTINUE.

User direction: continue FE work first, start again from the homepage, complete one page at a time, and use browser/e2e plus screenshot review for real UI/UX layout verification. Design Target First remains Priority #1, but design is just-in-time: use or refresh only the target for the current page. New public FE design targets and visible public copy must use Vietnamese unless a route-specific owner-approved exception is recorded. Design must follow the Linh Giới game scenario and stay coherent with already accepted page targets; if a target is stale, English-heavy, visually inconsistent, or wrong for the game scenario, replace/supersede it inside the current page slice before implementation.

Current FE scope: select `/classes` as the next single active page after v1.136 `/story` closure. Complete `/classes` fully before any other page: confirm the registered Public Classes target, refresh it if it no longer matches the game scenario or Vietnamese UI direction, implement only `/classes` UI/UX Layout and required shared Base UI/UX Layout, run source/runtime/browser/e2e evidence, perform screenshot/design-target comparison, update docs/handoff/ledger, commit and push.

Layout Match Before Closure is mandatory: after attaching or refreshing a design target, the selected page must be rendered in a real browser and compared against that target before handoff. A page is not closed until its UI/UX Layout follows the target structure for hero composition, visual hierarchy, spacing, typography scale, content order, first-fold density and mobile behavior. Copy-only or label-only fixes are not enough to close a page.

Base UI/UX Layout is mandatory: before adding page-local UI/layout, search shared owners and extend `packages/design-tokens` or `packages/ui` for reusable patterns. App-local duplicates of reusable layout, navigation, cards, panels, forms, tables, alerts, states or typography are forbidden unless the handoff records a concrete one-off reason.

Lifecycle: SELECT current page → SPEC_LOCK page scope → DESIGN_TARGET_ATTACH_OR_CREATE just-in-time for that page → IMPLEMENT FE-only UI/UX/accessibility improvements for that page and required shared Base UI/UX Layout only → SOURCE_VERIFY → RUNTIME_VERIFY → VISUAL_REVIEW against registered design target → HANDOFF → COMMIT_PUSH → CLOSED page slice. Do not move to another page before CLOSED.

Required evidence: source validator for the selected audit task, relevant package/app typecheck, relevant production build, Playwright desktop/mobile e2e with keyboard/focus/navigation/font-size/layout/overflow assertions, and screenshot/design-target comparison review. No independent backend, no duplicate DTO owners, no fake fetch, no forms, no enabling fixture mutation controls.

WEB-08 note: accepted backend Auth/API/DB/RBAC/audit contract is still required before any real Portal/Ops integration. The WEB-08 blocked-state spec/report/handoff and validator remain as the integration gate. A source file or a fixture alone is not owner acceptance.

Base First and Evidence Reuse / Build Once remain mandatory. Design Target First is now applied just-in-time per page: it adds a pre-implementation gate for the current page only and does not authorize broad design batches, unrelated page edits, or weakening Base First ownership, shared package reuse, backend boundaries or evidence requirements.

Historical continuity: WEB-PUBLIC-ACCESSIBILITY-READABILITY-POLISH-v1.15 remains historical evidence. WEB-01 through WEB-07 environment-limited claims are not globally upgraded by scoped later tests; rerun relevant package/runtime/browser gates before claiming them fully closed.

If WEB-01 package/runtime closure is revisited, first resolve package/runtime environment and rerun WEB-01 runtime gates. Before claiming historical environment-limited WEB-01 through WEB-07 milestones fully runtime-closed, rerun WEB-01 through WEB-07 package/runtime/browser gates.
