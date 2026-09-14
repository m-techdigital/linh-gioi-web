# WEB-NEXT-ACTION

Current task:

```text
WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.110
```

Status: WEB_TASK_CONTINUE.

User direction: continue FE work first, use needed game images from LinhGioiOnline where useful, verify real UI/UX layout in browser/e2e, and obey Design Target First as Priority #1. Every page, section and reusable component must be attached to a design target before implementation. If the current work is not covered by `docs/design/DESIGN-TARGET-REGISTRY.md`, create the design target first. If the target is stale or wrong, replace it and delete or supersede the old target before implementation.

Current FE scope: continue accessibility and interaction audit after v1.96 design-first governance. Focus on the next visible browser/e2e issue across public, Portal and Ops surfaces: keyboard reachability, accessible names, blocked/disabled state clarity, navigation continuity, typography caps, horizontal overflow, mobile readability, fixture boundary clarity and implementation alignment with the registered design target.

Base UI/UX Layout is mandatory: before adding page-local UI/layout, search shared owners and extend `packages/design-tokens` or `packages/ui` for reusable patterns. App-local duplicates of reusable layout, navigation, cards, panels, forms, tables, alerts, states or typography are forbidden unless the handoff records a concrete one-off reason.

Lifecycle: SELECT → SPEC_LOCK → DESIGN_TARGET_ATTACH_OR_CREATE → IMPLEMENT FE-only accessibility/interaction improvements → SOURCE_VERIFY → RUNTIME_VERIFY → VISUAL_REVIEW against registered design target → HANDOFF → CLOSED.

Required evidence: source validator for the selected audit task, relevant package/app typecheck, relevant production build, Playwright desktop/mobile e2e with keyboard/focus/navigation/font-size/layout/overflow assertions, and screenshot/design-target comparison review. No independent backend, no duplicate DTO owners, no fake fetch, no forms, no enabling fixture mutation controls.

WEB-08 note: accepted backend Auth/API/DB/RBAC/audit contract is still required before any real Portal/Ops integration. The WEB-08 blocked-state spec/report/handoff and validator remain as the integration gate. A source file or a fixture alone is not owner acceptance.

Base First and Evidence Reuse / Build Once remain mandatory. Design Target First adds a pre-implementation gate, but does not weaken Base First ownership, shared package reuse, backend boundaries or evidence requirements.

Historical continuity: WEB-PUBLIC-ACCESSIBILITY-READABILITY-POLISH-v1.15 remains historical evidence. WEB-01 through WEB-07 environment-limited claims are not globally upgraded by scoped later tests; rerun relevant package/runtime/browser gates before claiming them fully closed.

If WEB-01 package/runtime closure is revisited, first resolve package/runtime environment and rerun WEB-01 runtime gates. Before claiming historical environment-limited WEB-01 through WEB-07 milestones fully runtime-closed, rerun WEB-01 through WEB-07 package/runtime/browser gates.
