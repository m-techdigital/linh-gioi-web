# WEB-FE-PUBLIC-EXPANDED-CORE-ROUTE-AUDIT-v1.114

Status: WEB_CLOSED.

## SELECT

Current `WEB-NEXT-ACTION` is FE accessibility/interaction audit v1.114. After v1.113 covered Public Service routes, the matching Public Core route family needed the same browser/e2e guardrail coverage.

## SPEC_LOCK

Use the existing v1.95 Public Core and Component/state design targets. Do not create a new design image because this slice verifies existing registered route families against the current target, without changing visual direction.

## IMPLEMENT

Added expanded public core route browser/e2e coverage for `/`, `/game`, `/game/loop`, `/classes`, `/story`, `/journey`, `/start`, `/guides`, `/guides/beginner`, `/guides/beginner-training-loop-guide`, `/news`, `/events` and `/patch-notes`. The test verifies registered Design Target First attachment, horizontal overflow, heading/nav typography caps and serious/critical axe cleanliness.

Base UI/UX Layout remains unchanged in production source; this slice verifies the existing shared route composition and Design Target First attachment.

No production source changed in this slice.

## SOURCE_VERIFY

Dedicated source validator: `tools/validate_web_fe_public_expanded_core_route_audit_v1114.py`.

## RUNTIME_VERIFY

- Browser/e2e: `pnpm exec playwright test tests/e2e/fe-public-expanded-core-route-audit-v1114.spec.ts --project=chromium-desktop --project=chromium-mobile` passed 26/26.
- This slice is an audit/guardrail expansion. It did not require a RED production-code failure because no production code was changed.

## VISUAL_REVIEW

The covered core routes remain attached to the registered Public Core design target and keep readable layout constraints on desktop and mobile.

## HANDOFF

Future public core route additions should either be added to this audit matrix or receive their own route-specific browser/e2e coverage before closure.

Non-claims retained: No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT.
