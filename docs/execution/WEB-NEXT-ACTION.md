# WEB-NEXT-ACTION

Current task:

```text
WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.135
```

Status: WEB_TASK_CONTINUE.

User direction: continue FE work first, start again from the homepage, then complete one page at a time. Use needed game images from LinhGioiOnline where useful, verify real UI/UX layout in browser/e2e, and obey Design Target First as Priority #1. Every page, section and reusable component must be attached to a design target before implementation. Design just-in-time for the page being implemented; do not create broad multi-page design batches or edit unrelated pages in the same slice. If the current page is not covered by `docs/design/DESIGN-TARGET-REGISTRY.md`, create or replace only that page target first. New public FE design targets and visible public copy must use Vietnamese unless a route-specific owner-approved exception is recorded. If the target is stale, English-heavy, or wrong, replace/supersede it inside the current page slice before implementation.

Current FE scope: continue FE UI/UX layout completion after v1.134 homepage Vietnamese first-flow closure and closed homepage page slice. Select exactly one next page, complete that page slice fully (just-in-time design target, shared layout adjustments required by that page, implementation, source/runtime/browser/visual evidence, docs/handoff, commit/push), then select the following page. Continue accessibility and interaction audit after v1.134 homepage Vietnamese first-flow, v1.133 support safety Vietnamese design target density, v1.132 support help Vietnamese design target density, v1.131 support Vietnamese design target density, v1.130 status design target density, v1.129 tester pack design target density, v1.128 release readiness design target density, v1.127 release design target density, v1.126 download trust design target density, v1.125 download design target density, v1.124 start design target density, v1.123 journey design target density, v1.122 classes design target density, v1.121 story design target density, v1.120 game world design target density, v1.119 homepage target fold density, v1.118 homepage detailed design target, v1.117 shell keyboard reachability, v1.116 Ops/Admin expanded route audit, v1.115 Portal expanded route audit and v1.96 design-first governance. Focus on the next visible browser/e2e issue across public, Portal and Ops surfaces: keyboard reachability, accessible names, blocked/disabled state clarity, navigation continuity, typography caps, horizontal overflow, mobile readability, fixture boundary clarity and implementation alignment with the registered design target.

Base UI/UX Layout is mandatory: before adding page-local UI/layout, search shared owners and extend `packages/design-tokens` or `packages/ui` for reusable patterns. App-local duplicates of reusable layout, navigation, cards, panels, forms, tables, alerts, states or typography are forbidden unless the handoff records a concrete one-off reason.

Lifecycle: SELECT current page → SPEC_LOCK page scope → DESIGN_TARGET_ATTACH_OR_CREATE just-in-time for that page → IMPLEMENT FE-only UI/UX/accessibility improvements for that page and required shared Base UI/UX Layout only → SOURCE_VERIFY → RUNTIME_VERIFY → VISUAL_REVIEW against registered design target → HANDOFF → COMMIT_PUSH → CLOSED page slice. Do not move to another page before CLOSED.

Required evidence: source validator for the selected audit task, relevant package/app typecheck, relevant production build, Playwright desktop/mobile e2e with keyboard/focus/navigation/font-size/layout/overflow assertions, and screenshot/design-target comparison review. No independent backend, no duplicate DTO owners, no fake fetch, no forms, no enabling fixture mutation controls.

WEB-08 note: accepted backend Auth/API/DB/RBAC/audit contract is still required before any real Portal/Ops integration. The WEB-08 blocked-state spec/report/handoff and validator remain as the integration gate. A source file or a fixture alone is not owner acceptance.

Base First and Evidence Reuse / Build Once remain mandatory. Design Target First is now applied just-in-time per page: it adds a pre-implementation gate for the current page only and does not authorize broad design batches, unrelated page edits, or weakening Base First ownership, shared package reuse, backend boundaries or evidence requirements.

Historical continuity: WEB-PUBLIC-ACCESSIBILITY-READABILITY-POLISH-v1.15 remains historical evidence. WEB-01 through WEB-07 environment-limited claims are not globally upgraded by scoped later tests; rerun relevant package/runtime/browser gates before claiming them fully closed.

If WEB-01 package/runtime closure is revisited, first resolve package/runtime environment and rerun WEB-01 runtime gates. Before claiming historical environment-limited WEB-01 through WEB-07 milestones fully runtime-closed, rerun WEB-01 through WEB-07 package/runtime/browser gates.
