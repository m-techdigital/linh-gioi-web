# WEB-DESIGN-FIRST-GOVERNANCE

Design Target First is Priority #1 for all FE/UI/UX work in Linh Giới Online Web.

Every page, section and reusable component must be attached to a design target before implementation. The design target may be a full page board, a section board, a component/state atlas, or a scoped replacement image, but it must be explicit enough to compare browser output against it.

If the current task has no matching design target, create the design target first, save it under project design-reference paths, register it in `docs/design/DESIGN-TARGET-REGISTRY.md`, and only then implement the page, section or component.

If an existing design target is no longer reasonable, misleading, visually inconsistent, or superseded by a better direction, delete or supersede the old design target in the same task. The handoff must state what replaced it so future work does not compare against the wrong destination.

## Required development order

1. Identify the page, section or reusable component being changed.
2. Check `docs/design/DESIGN-TARGET-REGISTRY.md` for the attached design target.
3. If no target exists, create the target first with the same UI/UX language as the current atlas.
4. If the target is stale or wrong, replace it and delete or supersede the old design target.
5. Implement against the approved/saved target.
6. Verify in browser/e2e and record design comparison evidence in the handoff.

## Base UI/UX Layout

Base UI/UX Layout is mandatory before page-local duplication. Shared primitives, layout shells, typography caps, spacing, cards, panels, navigation, tables, forms, alerts and state patterns must be owned by `packages/design-tokens` or `packages/ui` when more than one app or page can reuse them.

Apps compose those shared building blocks. Page-local code is allowed only for genuinely page-specific composition, domain copy or one-off art placement. If a task keeps a page-local layout, the handoff must record why it was not promoted to shared Base UI/UX Layout.

## Registry and evidence

The active design registry is `docs/design/DESIGN-TARGET-REGISTRY.md`. Each future UI task must either cite an existing registry row or add/replace a row before implementation.

Non-claims remain unchanged: No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT is still required before real backend integration.
