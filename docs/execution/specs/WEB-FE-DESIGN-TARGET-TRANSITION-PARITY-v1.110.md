# WEB-FE-DESIGN-TARGET-TRANSITION-PARITY-v1.110

Status: WEB_CLOSED.

## SELECT

Current `WEB-NEXT-ACTION` is FE accessibility/interaction audit v1.110. Public Design Target First links had the same hover/focus lift as workspace links, but only workspace links exposed the default transition. This made the same shared component state feel different across surfaces.

## SPEC_LOCK

Use the existing v1.95 Component/state design target for shared interaction states plus the registered Public Core/Public Service, Player Portal and Ops/Admin targets for surface attachment. Do not create a new design image because this slice aligns an already-covered interaction state with the existing Base UI/UX Layout target.

## IMPLEMENT

Added the same default transition to public Design Target First links that workspace links already use: transform, outline-color, border-color and background-color at `.18s ease`. Reduced-motion behavior from v1.109 remains in place and still disables transition and transform for reduced-motion users.

## SOURCE_VERIFY

Dedicated source validator: `tools/validate_web_fe_design_target_transition_parity_v1110.py`.

## RUNTIME_VERIFY

- RED browser/e2e: `pnpm exec playwright test tests/e2e/fe-design-target-transition-parity-v1110.spec.ts --project=chromium-desktop --project=chromium-mobile` failed for Public desktop/mobile because computed transition duration was `0`.
- GREEN browser/e2e: the same command passed 6/6 after public transition parity was added.

## VISUAL_REVIEW

Public, Portal and Ops Design Target First links now share the same default focus/hover motion timing while preserving visible outlines, visible new-tab cue, cue spacing and reduced-motion behavior. This remains attached to the v1.95 design target set.

## HANDOFF

Future Design Target First interaction changes should keep public and workspace link state styles aligned unless a new design target explicitly calls for divergence.

Non-claims retained: No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT.
