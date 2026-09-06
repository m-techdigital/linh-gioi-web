# WEB-PUBLIC-STATUS-DOWNLOAD-TRUST-POLISH-v1.10

Final focus: continue building the actual Linh Giới Online public web product by improving status/download trust, release-readiness wording, checksum/provenance explanation, support expectation clarity and route-level player copy.

Runtime/browser/e2e is guardrail only. It supports regression detection after product web changes; it is not the content goal and must not be marketed as release readiness.

## Product changes

- Add a dedicated `/download/trust` route explaining download evidence, checksum, provenance, limitations and support expectations.
- Add typed local content for download trust gates, release evidence requirements, status trust surfaces and player support expectations.
- Update Download page to explain why fake download buttons are not allowed.
- Update Status page to separate public, internal and blocked surfaces with explicit source-of-truth and forbidden claim copy.
- Update Support page to show what players can expect now and what is not available without backend contracts.
- Add a guide fixture for release trust and checksum reading.

## Required non-claims

- No production auth.
- No DB persistence.
- No real account portal integration.
- No real ops/admin mutation.
- No independent backend.
- No CMS.
- No production deployment.
- No payment/shop/economy.
- No live community/chat/forum/guild backend.
- No public game download artifact.
- No fake download CTA.
- No placeholder checksum.
- No portal entitlement backend.
- Runtime/browser/e2e is guardrail only.

## WEB-08 boundary

WEB-08-GAME-CONTRACT-SYNC-v1.0 remains blocked until an accepted backend Auth/API/DB/RBAC/audit contract exists from the canonical game backend. This task must not implement real account login, real download entitlement, production support ticket workflow or operations mutation.
