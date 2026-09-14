# HANDOFF — WEB-FE-SHELL-KEYBOARD-REACHABILITY-v1.117

Status: WEB_CLOSED

WEB-FE-SHELL-KEYBOARD-REACHABILITY-v1.117 closes a cross-shell keyboard reachability gap.

What changed:

Base UI/UX Layout and Design Target First behavior were verified across Public Core, Player Portal and Ops/Admin.

- Added desktop/mobile browser/e2e coverage for skip link first-tab behavior, skip target focus, nav focus and Design Target First link focus.
- Fixed Public Core navigation so the nav container is keyboard focusable and has a visible focus outline.
- Kept the fix in the public shell/navigation owner instead of duplicating page-local behavior.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.118.

Non-claims retained: No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT.
