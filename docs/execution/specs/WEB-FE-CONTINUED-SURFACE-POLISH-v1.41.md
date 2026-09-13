# WEB-FE-CONTINUED-SURFACE-POLISH-v1.41

Status: WEB_CLOSED.

## Goal

Continue FE-only surface polish after v1.40 by improving the remaining workspace entry routes: Portal home `/` and Ops home `/`.

## Scope

- Add visual proof cards to Portal home using existing Portal game-art derivatives.
- Add visual proof cards to Ops home using existing Ops game-art derivatives.
- Keep shared UI ownership through `VisualProofGrid` and `VisualProofCard` from `packages/ui`.
- Preserve fixture-only boundaries and block all real auth/session/RBAC/audit/mutation claims.
- Add Playwright desktop/mobile assertions for font-size/layout/image/overflow and absence of mutation controls.

## Non-scope

- No independent backend.
- No production auth.
- No DB persistence.
- No real Portal integration.
- No real Ops/Admin mutation.
- `NO_ACCEPTED_BACKEND_CONTRACT` remains active.

## Acceptance evidence

- Source validator for v1.41 passes.
- Portal/Ops typecheck passes.
- Portal/Ops production builds pass.
- Playwright v1.41 passes across desktop/mobile.
- Screenshot review covers Portal home and Ops home desktop/mobile.
