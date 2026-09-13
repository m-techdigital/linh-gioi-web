# LGO Web FE Blocked Action Keyboard Report v1.45

Task: WEB-FE-BLOCKED-ACTION-KEYBOARD-v1.45
Status: WEB_CLOSED.

## Result

v1.45 closes a keyboard accessibility gap in the Portal access fixtures. Login, register and recovery no longer expose their primary blocked action as an unfocusable native disabled button. They now use a shared `BlockedActionButton` that is keyboard-reachable, marked with `aria-disabled="true"`, and described by an explicit `NO_ACCEPTED_BACKEND_CONTRACT` reason.

## Implemented

- Added shared `BlockedActionButton` to `packages/ui`.
- Added shared CSS for `aria-disabled`/`data-disabled` blocked buttons and visible focus.
- Replaced native disabled action buttons on Portal `/login`, `/register` and `/recovery`.
- Added Playwright coverage for focusability, no write requests, font-size and horizontal overflow across desktop/mobile.

## Boundaries retained

No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT remains active. The buttons are still blocked; no form, fetch, session, account creation or recovery mutation was added.

## Evidence

- RED: Playwright v1.45 failed before implementation because Portal access buttons were native `disabled` and lacked `aria-disabled`.
- Source validator: `python3 tools/validate_web_fe_blocked_action_keyboard_v145.py` PASS.
- UI/Portal typecheck: PASS.
- Portal production build: PASS.
- Playwright desktop/mobile: `tests/e2e/fe-blocked-action-keyboard-v145.spec.ts` PASS.
- Screenshot review: Portal `/login`, `/register`, `/recovery` inspected at desktop/mobile with focusable blocked action and no horizontal overflow.
