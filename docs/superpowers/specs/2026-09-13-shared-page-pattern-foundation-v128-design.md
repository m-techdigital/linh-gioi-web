# WEB Shared Page Pattern Foundation v1.28 — Design

## Goal
Continue Base First across Public Web, Player Portal and Ops/Admin by making reusable page-level patterns owned by `packages/ui` before Portal/Ops add more app-local variants.

## Design
`packages/ui` owns neutral page structure and state presentation. Portal/Ops consume those primitives through thin app composition; Public Web may consume only neutral primitives and keeps its game/story personality.

Shared page-pattern API:

- `PageHeader`: eyebrow/status/title/description/actions for page introductions.
- `BoundaryBanner`: reusable contract/environment/status boundary message with tone.
- `DataList` / `DataListItem`: semantic repeated-data presentation for shell lists.
- `PageStateGroup`: consistent empty/loading/error state cluster.
- `WorkspacePage`: structural page wrapper that composes `PageHeader`, optional `BoundaryBanner`, and page body.

Existing `WorkspaceBoundaryNotice` becomes a compatibility wrapper around `BoundaryBanner`. Existing `ProvisionalFeatureShell` becomes a compatibility composition over `WorkspacePage` rather than a separate page-pattern owner.

## Migration

- Portal home uses `WorkspacePage` + `DataList` for fixture state discovery.
- Ops home uses `WorkspacePage` + `DataList` for workspace discovery while retaining ops-only placeholders.
- Portal/Ops provisional feature routes continue using `ProvisionalFeatureShell`, which is internally rebased onto the shared page pattern.
- App-local CSS must not duplicate shared page/list/state selectors.

## Constraints

- No backend/API/auth/RBAC contract claims are opened.
- No new app-local reusable page primitives.
- No redesign of Public Web personality.
- Base First remains mandatory.
- Evidence Reuse / Build Once remains mandatory.
- Browser visual review may remain environment-limited if localhost policy still blocks Chromium.

## Closure

Required source gates: dedicated v1.28 validator, Base First, Shared Base, Portal, Ops, WEB CURRENT STATE, targeted lint/typecheck.

Runtime closure: build Portal and Ops only because those consumers change; reuse unchanged Public Web v1.26 build evidence. Smoke built Portal/Ops routes from the same build outputs.
