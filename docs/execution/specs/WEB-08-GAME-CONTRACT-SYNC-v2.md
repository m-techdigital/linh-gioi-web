# WEB-08 Game Contract Intake & Generated Client Sync v2

Status: ASSESSMENT_READY / CONTRACT_NOT_ACCEPTED
Date: 2026-09-18
Supersedes the assumptions of v1.0, not its safety boundary.

## Purpose

WEB-08 v1.0 correctly blocked fake Web integration, but its upstream snapshot is stale.
Game authority inspected for v2:
`origin/feature/2d @ 404b89636fe76f6659935f2a099fcb9fc22ef95b`.

The Game backend now has real product auth and character APIs.
WEB-08 v2 therefore changes from “wait for any backend” to:
**seal, publish, review and generate clients from the existing canonical backend contract candidates.**

No Portal/Ops route becomes production-integrated merely because source endpoints exist.
## Candidate contract domains

### Candidate A — Product Auth
Observed endpoints:
- POST /auth/register
- POST /auth/login
- GET /auth/session
- POST /auth/logout
- POST /auth/recovery/request
- POST /auth/recovery/verify
- POST /auth/recovery/reset

Observed semantics:
- bearer access token;
- configurable session TTL;
- session token stored server-side by hash;
- registration duplicate handling;
- recovery cooldown/unavailable/invalid-grant boundaries.

### Candidate B — Product Character Read
Observed endpoints:
- GET /auth/characters
- GET /auth/characters/{characterId}

Observed semantics:
- account derived from authenticated session;
- ownership mismatch returns not-found behavior;
- runtime class ID exposed;
- runtime state may be null.
### Candidate C — Map01A Runtime State
Observed endpoint:
- POST /auth/characters/{characterId}/map01a-state

Observed semantics:
- character ownership enforced;
- laneX/facing stored under Map01A runtime state;
- response returns updated product CharacterResponse.

This mutation is a Game/Unity contract first.
Player Portal should only consume a read projection unless an explicit browser use case is approved.

## Explicitly not accepted by this spec

- legacy /dev/auth/login;
- /accounts/{accountId}/characters dev/admin-style paths;
- raw file persistence as a Web contract;
- app-local Web fixture DTOs;
- invented inventory/progression/support/admin endpoints.
## Required owner acceptance package

Before `packages/contracts` can leave blocked mode for Candidate A/B:

1. sealed Game commit;
2. API semantic version;
3. OpenAPI or owner-approved equivalent schema;
4. exact request/response models;
5. stable error-code envelope;
6. session expiry/revocation policy;
7. password and recovery policy;
8. CORS/browser/BFF integration decision;
9. environment/base URL;
10. test account procedure;
11. migration/compatibility statement;
12. checksum/manifest.

The inspected source is evidence for preparation, not owner acceptance by itself.
## Persistence caveat

Current product implementation still uses:
- JSON file player persistence;
- JSON file product credential persistence;
- in-memory auth session registry;
- process-local recovery state.

WEB-08 may integrate against an explicit development/integration environment before database migration only if the contract is labeled non-production and restart-loss semantics are accepted.

Production Web release must not imply durable production auth until R1 persistence/session gates close.
## Generated client target

Proposed package ownership:

```text
packages/contracts/
  generated/
  manifest.ts
  errors.ts

packages/api-client/
  player/
    auth-client.ts
    character-client.ts
  transport/
    server-http.ts

packages/auth/
  portal-session.ts
  portal-cookie.ts
```

Rules:
- generated transport/domain types come from accepted contract;
- view models remain app/UI-local;
- no canonical DTO is handwritten in Portal/Ops;
- fixture types remain visibly provisional until replaced.
## Portal browser security adapter

Recommended browser flow:

```text
Browser
  -> Next.js server action / route handler
  -> Java /auth/*
  -> backend bearer session
  -> encrypted/server-held or HttpOnly cookie adapter
  -> Browser receives no localStorage backend token
```

The BFF does not become account authority.
It only adapts browser session/security mechanics to the Java API.

Logout and expiry must propagate to the canonical backend session semantics.
## Staged route adoption

### Stage WEB-08A
- /login
- /register
- /recovery
- /access

### Stage WEB-08B
- /account
- /characters
- /characters/[id]

### Keep blocked
- /account/sessions until multi-session listing/revocation exists;
- /journey until progression/chapter contract exists;
- /support until support domain exists.

No all-at-once fixture removal.
## Ops/Admin position

WEB-08 v2 does **not** unblock Ops mutations.

Existing account/character APIs are player-scoped and are not an Admin contract.
Ops remains blocked until:
- staff identity;
- RBAC capabilities;
- admin-safe player lookup/read model;
- audit event contract.

Do not reuse player bearer tokens for Ops.
## Error model acceptance target

Current controller messages must be normalized into a stable client contract.

Required shape:

```json
{
  "code": "AUTH_INVALID_CREDENTIALS",
  "message": "Invalid credentials",
  "requestId": "req_...",
  "details": {}
}
```

Examples of required stable codes:
- AUTH_INVALID_CREDENTIALS
- AUTH_SESSION_EXPIRED
- AUTH_IDENTIFIER_EXISTS
- AUTH_RECOVERY_RATE_LIMITED
- AUTH_RECOVERY_UNAVAILABLE
- AUTH_RECOVERY_GRANT_INVALID
- CHARACTER_NOT_FOUND
- CHARACTER_STATE_INVALID
## Contract tests

Before integration:
- registration success/duplicate/invalid;
- login success/wrong credential;
- session valid/expired/missing token;
- logout invalidates session;
- recovery enumeration-safe behavior;
- character roster account isolation;
- character detail account isolation;
- legacy class ID -> canonical runtime class mapping;
- five canonical runtime classes accepted;
- unknown class rejected;
- Map01A state finite/range rules;
- contract JSON samples parse identically in Java and generated TS client.

Consumer E2E must run against an integration API, not fixture interception.
## Migration compatibility rules

- `class.martial` remains readable and maps to `vo`.
- `class.sword` remains readable and maps to `kiem`.
- new writes should use canonical `vo/kiem/phap/co/linh` once owner policy is accepted.
- Web player-facing labels use Võ/Kiếm/Pháp/Cơ/Linh only.
- raw legacy IDs are never displayed in Portal/Ops.
- persistence schema migration must remain backward-compatible or fail closed with owner intervention.
## Exit criteria

WEB-08 v2 closes only when:
1. owner approves a sealed contract pack;
2. generated TS client is deterministic;
3. Portal auth integration works without localStorage bearer ownership;
4. account/character read integration is real and account-isolated;
5. unopened domains remain fixtures;
6. source/typecheck/build/browser contract tests pass;
7. Game and Web record the same contract checksum/version;
8. no Ops mutation is opened accidentally.

Until then:
`NO_ACCEPTED_BACKEND_CONTRACT` remains truthful at package level.
