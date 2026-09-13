# LGO Web Contracts Package

No production web API contract accepted yet.

Game backend contracts must be synced explicitly from the canonical Java/Spring Boot backend in `LinhGioiOnline/server` before portal or ops integration can be claimed.

Current package status:

- `NO_ACCEPTED_BACKEND_CONTRACT`
- `NOT_CANONICAL_BACKEND_CONTRACT`
- No hand-written canonical account/character DTOs.
- Fixture data is provisional and cannot become a backend contract by usage.

## WEB-08-GAME-CONTRACT-SYNC-v1.0 intake gate

WEB-08 remains blocked until the web repo receives an owner-approved
contract package from the canonical Java/Spring Boot backend.

Required acceptance inputs:

- canonical repository commit and API version;
- owner-approved endpoint inventory/schema;
- auth/session/expiry/error semantics;
- permission and audit requirements;
- integration environment and test-account procedure.

Observed source documents from the game repo may inform the intake review, but
they do not become accepted web contracts by themselves.
