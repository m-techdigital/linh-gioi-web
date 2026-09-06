# WEB-SECURITY-BASELINE

## Baseline classes

Public web low-risk baseline.

Portal auth-sensitive baseline.

Ops high-risk baseline.

OWASP ASVS-aligned controls for Portal/Ops.

HttpOnly Secure cookies for sessions when backend integration exists.

CSRF/session policy to be finalized with backend contract.

No secrets in repo.

No admin route public exposure without explicit security gate.

## Public web

- Static/file-backed content only until live content architecture is accepted.
- No user secrets.
- No account mutation.
- No admin-only data.

## Portal

- Requires accepted Auth/DB/API contract before real integration.
- Auth-required states must be explicit.
- Session expiry and logout behavior must come from contract.

## Ops/Admin

- High-risk by default.
- No public exposure without explicit gate.
- No mutation without RBAC/audit/security contract.
- Destructive actions require separate confirmation and audit semantics once integrated.
