# WEB-FE-WORKSPACE-DESIGN-TARGET-ATTACHMENT-v1.98

Status: WEB_CLOSED.

## SELECT

Current `WEB-NEXT-ACTION` is FE accessibility/interaction audit v1.98. After v1.97 attached public routes to design targets, Portal and Ops still needed the same runtime attachment so all three app surfaces follow Design Target First.

## SPEC_LOCK

Use existing registered design targets rather than creating new images:

- Player Portal uses `apps/web/public/design-reference/design-atlas-portal-v195.png`.
- Ops/Admin uses `apps/web/public/design-reference/design-atlas-ops-v195.png`.

Implement through shared Base UI/UX Layout in `packages/ui` by extending `WorkspaceAppShell`. Do not add backend, auth, RBAC, audit or mutation behavior.

## IMPLEMENT

Added optional `designTarget` support to `WorkspaceAppShell`. Added workspace styling in `packages/ui/src/shell.css`. Portal and Ops layouts now pass their registered targets so each workspace exposes a `Design target reference` region.

## SOURCE_VERIFY

Dedicated source validator: `tools/validate_web_fe_workspace_design_target_attachment_v198.py`.

## RUNTIME_VERIFY

- RED browser/e2e: `pnpm exec playwright test tests/e2e/fe-workspace-design-target-attachment-v198.spec.ts --project=chromium-desktop` failed because Portal/Ops had no design target region.
- GREEN desktop: `pnpm exec playwright test tests/e2e/fe-workspace-design-target-attachment-v198.spec.ts --project=chromium-desktop` passed 2/2.
- GREEN mobile: `pnpm exec playwright test tests/e2e/fe-workspace-design-target-attachment-v198.spec.ts --project=chromium-mobile` passed 2/2.

## VISUAL_REVIEW

The workspace band uses the same Design Target First component as public routes, scoped through shell CSS for Portal/Ops. It stays compact, keyboard reachable and responsive.

## HANDOFF

Future Portal/Ops UI work should first use the workspace design target reference region to open the registered atlas, then implement against that target or replace it through the registry if it is wrong.

Non-claims retained: No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT.
