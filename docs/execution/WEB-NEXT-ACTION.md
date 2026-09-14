# WEB-NEXT-ACTION

Current task:

```text
WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.164
```

Status: WEB_TASK_CONTINUE.

User direction: continue FE work first, complete one page at a time, and use browser/e2e plus screenshot review for real UI/UX layout verification. Real Browser UI/UX Layout First is Priority #1; design target work is only a pre-implementation guardrail and the deliverable is the real rendered UI/UX Layout. Use or refresh only the target for the current page, make the smallest Vietnamese/game-scenario correction needed for comparison, then stop design work and implement the browser page. New public FE design targets and visible public copy must use Vietnamese unless a route-specific owner-approved exception is recorded, but localization alone is not page completion. Design must follow the Linh Giới game scenario and stay coherent with already accepted page targets; if a target is stale, English-heavy, visually inconsistent, or wrong for the game scenario, replace/supersede it inside the current page slice only enough to unblock UI work.

Current FE scope: select `/guides/start-here-content-hub-guide` as the next single active page after v1.163 `/guides/community-roadmap-onboarding-guide` closure. Complete `/guides/start-here-content-hub-guide` fully before any other page: confirm the registered guide-detail target, apply only the minimal target correction needed if it blocks comparison, then prioritize the real Start Here Content Hub guide UI/UX Layout in browser. Required work is first-fold structure, visual hierarchy, spacing, typography scale, guide-step density, mobile behavior, keyboard/focus/accessibility, screenshot/design-target comparison, docs/handoff/ledger, commit and push.

Layout Match Before Closure is mandatory: after attaching or minimally correcting a design target, the selected page must be rendered in a real browser and compared against that target before handoff. A page is not closed until its UI/UX Layout follows the target structure for hero composition, visual hierarchy, spacing, typography scale, content order, first-fold density and mobile behavior. Copy-only, label-only, target-only, localization-only or validator-only fixes are not enough to close a page.

Base First Stop Gate is mandatory before each page edit: search current route siblings and `packages/ui`/`packages/design-tokens` for reusable layout owners. If the next change would recreate a similar shell, hero, proof board, route map, CTA, card grid, table, form, focus state, typography rhythm, responsive density, or CSS block, extract or extend the shared base first. Do not add bulky route-local CSS or duplicate app-local components to make quick progress. CSS must stay separated by owner: tokens in `packages/design-tokens`, reusable components/layout CSS in `packages/ui`, app routes only compose shared bases and add truly route-specific differences.

Base UI/UX Layout is mandatory and takes precedence before page-local UI/CSS: before adding page-local layout or style, search shared owners and extend `packages/design-tokens` or `packages/ui` for reusable patterns. App-local duplicates of reusable layout, navigation, cards, panels, forms, tables, alerts, states, typography, route maps, proof boards, CTA blocks, responsive density or repeated CSS blocks are forbidden unless the handoff records a concrete one-off reason. CSS must be managed by owner/role and must not keep inflating `apps/web/src/app/globals.css` with repeated route-specific patterns. If a similar UI/UX Layout appears on more than one page, build or extend Base first, consume it from the page, and keep only thin route composition locally.

Lifecycle: SELECT current page → SPEC_LOCK page scope → DESIGN_TARGET_ATTACH_OR_MINIMAL_CORRECT just-in-time for that page → REAL_BROWSER_UI_LAYOUT_IMPLEMENTATION for that page and required shared Base UI/UX Layout only → SOURCE_VERIFY → RUNTIME_VERIFY → VISUAL_REVIEW against registered design target → HANDOFF → COMMIT_PUSH → CLOSED page slice. Do not move to another page before CLOSED, and do not keep iterating on design once it is sufficient for comparison.

Required evidence: source validator for the selected audit task, relevant package/app typecheck, relevant production build, Playwright desktop/mobile e2e with keyboard/focus/navigation/font-size/layout/overflow/card-density assertions, and screenshot/design-target comparison review. Text assertions should cover only critical Vietnamese route labels and scenario boundaries. No independent backend, no duplicate DTO owners, no fake fetch, no forms, no enabling fixture mutation controls.

WEB-08 note: accepted backend Auth/API/DB/RBAC/audit contract is still required before any real Portal/Ops integration. The WEB-08 blocked-state spec/report/handoff and validator remain as the integration gate. A source file or a fixture alone is not owner acceptance.

Base First and Evidence Reuse / Build Once remain mandatory. Design target work is now applied just-in-time per page as a pre-implementation guardrail only; Real Browser UI/UX Layout First supersedes it, and it does not authorize broad design batches, repeated image iteration, localization-only closure, unrelated page edits, or weakening Base First ownership, shared package reuse, backend boundaries or evidence requirements. Real browser UI/UX Layout work takes priority once the target is sufficient for comparison.

Historical continuity: WEB-PUBLIC-ACCESSIBILITY-READABILITY-POLISH-v1.15 remains historical evidence. WEB-01 through WEB-07 environment-limited claims are not globally upgraded by scoped later tests; rerun relevant package/runtime/browser gates before claiming them fully closed.

If WEB-01 package/runtime closure is revisited, first resolve package/runtime environment and rerun WEB-01 runtime gates. Before claiming historical environment-limited WEB-01 through WEB-07 milestones fully runtime-closed, rerun WEB-01 through WEB-07 package/runtime/browser gates.

Legacy terminology mapping: older validators may refer to "Design Target First" or `DESIGN_TARGET_ATTACH_OR_CREATE just-in-time`; in the current workflow those terms mean a minimal design-target guardrail only. They are superseded by Real Browser UI/UX Layout First and must not be interpreted as priority design work, broad design batches, repeated image iteration or localization-only closure.
