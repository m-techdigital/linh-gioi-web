# WEB-FE-SHELL-KEYBOARD-REACHABILITY-v1.117

Status: WEB_CLOSED.

## SELECT

Current `WEB-NEXT-ACTION` is FE accessibility/interaction audit v1.117. After route-family audits for Public, Portal and Ops/Admin, this slice targets cross-shell keyboard reachability for skip links, navigation and Design Target First actions.

## SPEC_LOCK

Design Target First applies before implementation. Public Core, Player Portal, Ops/Admin and Component/state targets are active in `docs/design/DESIGN-TARGET-REGISTRY.md`; no new design image was required. The task changes shell interaction parity only, so no stale design target was replaced or deleted.

## IMPLEMENT

Added a desktop/mobile shell keyboard reachability browser/e2e guardrail for Public Core, Player Portal and Ops/Admin shells. The test verifies skip link first-tab behavior, skip target focus, navigation keyboard focus, visible focus outline, Design Target First link keyboard focus, horizontal overflow and nav typography caps.

The browser/e2e RED surfaced a real Public shell gap: workspace navigation could focus its nav container, but public brand navigation could only focus the inner link rail. The fix adds `tabIndex={0}` to the shared public `PublicNavigation` nav container and gives `.lgo-brand-nav:focus-visible` the same visible outline treatment as the existing link rail.

Base UI/UX Layout remained centralized: the production fix is in the public shell/navigation owner and shared public CSS, not page-local route code.

## SOURCE_VERIFY

Dedicated source validator: `tools/validate_web_fe_shell_keyboard_reachability_v1117.py`.

## RUNTIME_VERIFY

- RED browser/e2e: `pnpm exec playwright test tests/e2e/fe-shell-keyboard-reachability-v1117.spec.ts --project=chromium-desktop --project=chromium-mobile` failed on Public Core nav keyboard focus before the fix.
- Browser/e2e after fix: the same command passed 6/6.

## VISUAL_REVIEW

Public, Portal and Ops/Admin shells remain attached to their registered design targets. Focus behavior now gives public navigation a visible keyboard target consistent with workspace shell navigation.

## HANDOFF

Future shell/navigation changes must keep skip links, nav containers and Design Target First actions keyboard reachable across all three surfaces before closure.

Non-claims retained: No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT.
