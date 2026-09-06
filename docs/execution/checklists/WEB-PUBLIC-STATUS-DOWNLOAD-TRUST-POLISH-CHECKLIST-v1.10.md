# WEB-PUBLIC-STATUS-DOWNLOAD-TRUST-POLISH-CHECKLIST-v1.10

## Product checks

- [ ] `/download/trust` exists and is player-facing.
- [ ] Download page explains artifact/checksum/provenance/known limitations/owner approval.
- [ ] Status page separates public, internal and blocked surfaces.
- [ ] Support page states what players can expect now and what remains unavailable.
- [ ] Release trust guide exists under `/guides/release-trust-and-checksum-guide`.
- [ ] Sitemap includes `/download/trust` and the release trust guide route.

## Trust/non-claim checks

- [ ] No fake download CTA.
- [ ] No placeholder checksum.
- [ ] No production auth.
- [ ] No DB persistence.
- [ ] No independent backend.
- [ ] No CMS.
- [ ] No production deployment.
- [ ] No payment/shop/economy.
- [ ] No live community/chat/forum/guild backend.
- [ ] No portal entitlement backend.
- [ ] No public game download artifact.
- [ ] Runtime/browser/e2e is guardrail only.

## Guardrails

- [ ] Python validators pass.
- [ ] Targeted content/web typecheck passes when runtime is available.
- [ ] Targeted web build passes when runtime is available.
- [ ] Package hygiene excludes node_modules, .next, .turbo, dist, build, coverage, __pycache__ and .git.
