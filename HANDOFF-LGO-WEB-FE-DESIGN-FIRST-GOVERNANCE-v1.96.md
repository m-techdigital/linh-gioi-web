# HANDOFF — WEB-FE-DESIGN-FIRST-GOVERNANCE-v1.96

Status: WEB_CLOSED

WEB-FE-DESIGN-FIRST-GOVERNANCE-v1.96 makes Design Target First a durable repo rule.

Future FE/UI work must follow this order:

1. Check `docs/design/DESIGN-TARGET-REGISTRY.md` for the target covering the page, section or component.
2. If no design target exists, create the design target first.
3. If an existing target is wrong or stale, replace it and delete or supersede the obsolete target in the same task.
4. Implement against the saved design target.
5. Prefer Base UI/UX Layout in `packages/design-tokens` and `packages/ui` before adding page-local duplicates.
6. Record browser/e2e or source evidence and the target used in the handoff.

Current active design targets are the v1.95 atlas boards for Public Core, Public Service, Player Portal, Ops/Admin and Component/state scopes.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.97.

Non-claims retained: No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT.
