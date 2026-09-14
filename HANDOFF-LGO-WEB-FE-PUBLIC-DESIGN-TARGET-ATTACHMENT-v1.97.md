# HANDOFF — WEB-FE-PUBLIC-DESIGN-TARGET-ATTACHMENT-v1.97

Status: WEB_CLOSED

WEB-FE-PUBLIC-DESIGN-TARGET-ATTACHMENT-v1.97 adds runtime Design Target First attachment for public routes.

What changed:

- Shared Base UI/UX Layout component: `DesignTargetReference` in `packages/ui`.
- Public route mapping: `apps/web/src/components/PublicDesignTargetReference.tsx`.
- Public shell placement: `apps/web/src/components/PublicSiteShell.tsx`.
- Public styling: `apps/web/src/app/globals.css`.
- browser/e2e coverage: `tests/e2e/fe-public-design-target-attachment-v197.spec.ts`.

The current public route now exposes a `Design target reference` region linking to Public Core or Public Service design atlas targets. Future public UI work should use that band as the first runtime check before changing layout.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.98.

Non-claims retained: No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT.
