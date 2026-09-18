# LGO Contract Gap Matrix + Canonical Domain Map v1

Date: 2026-09-18
Status: ASSESSMENT / NO IMPLEMENTATION AUTHORITY
Inputs:
- Game authority: `origin/feature/2d @ 404b89636fe76f6659935f2a099fcb9fc22ef95b`;
- Web authority: `main @ dd578ac14cf6228d78ca1d46b012d7f71e6b7933`;
- `LGO-FULL-SYSTEM-REASSESSMENT-v2.md`;
- `LGO-MASTER-ROADMAP-v2.md`.

## 1. Current Game REST inventory

### Product auth
| Endpoint | Current authority | Web readiness |
|---|---|---|
| POST /auth/register | product registration + credential store | candidate |
| POST /auth/login | product auth + bearer issue | candidate |
| GET /auth/session | bearer validation | candidate |
| POST /auth/logout | token invalidation | candidate |
| POST /auth/recovery/request | recovery challenge + delivery | candidate with infra caveats |
| POST /auth/recovery/verify | challenge verification | candidate |
| POST /auth/recovery/reset | credential reset + account session invalidation | candidate |

### Product character
| Endpoint | Current authority | Web readiness |
|---|---|---|
| GET /auth/characters | account-scoped roster | candidate |
| GET /auth/characters/{id} | ownership-checked detail | candidate |
| POST /auth/characters/{id}/map01a-state | ownership-checked Map01A state | Unity/game mutation; Portal read-only use only |

Legacy/dev endpoints are not candidates for Web product integration.
## 2. Current contract strengths

- Product auth endpoints already use non-enumerating style error messages for login/recovery boundaries.
- Bearer tokens are random 32-byte values and stored in-memory by hash.
- Product character endpoints resolve account identity from session instead of trusting account IDs supplied by the browser.
- Character response includes stored class ID, runtime class ID and runtime state.
- Five runtime class identities are supported with legacy compatibility.
- Character persistence has explicit schema migration to v4.
- Product account and character ownership checks exist.

These are reusable implementation assets.
They are not yet an accepted Web Contract Pack.
## 3. Current contract gaps

### G1 — persistence durability
Player profile and credential stores are JSON-file based. Sessions and recovery state are process-local.
A production deployment topology, database, transaction model and migration procedure are not yet accepted.

### G2 — contract publication
No OpenAPI/generated TypeScript contract exists in Web.
`packages/contracts` correctly remains blocked.

### G3 — error model
HTTP status/messages exist, but there is no stable machine-readable error envelope/reason-code contract for clients.

### G4 — browser session model
Unity bearer-session semantics exist, but Portal has no approved browser-cookie/BFF session contract.

### G5 — staff identity/RBAC
No canonical staff auth, role, permission or capability contract exists.

### G6 — audit
No append-only admin/player-support audit-event contract/API exists.

### G7 — product domains
Inventory, progression, quest/story, social, support, moderation, liveops and economy are not yet REST/admin authorities.
## 4. Portal route gap matrix

| Portal route | Existing UI | Game/backend source now | Missing before real integration |
|---|---|---|---|
| /login | complete fixture | POST /auth/login | BFF/cookie policy, generated client, error contract |
| /register | complete fixture | POST /auth/register | terms version contract, BFF/cookie policy |
| /recovery | complete fixture | recovery endpoints | delivery environment, UX mapping of stable reason codes |
| /access | journey fixture | auth/session endpoints | real access-state composition |
| /account | account fixture | GET /auth/session account payload | accepted account DTO, optional email/security fields policy |
| /account/security | security fixture | auth/recovery partial | password/security posture/session policy contract |
| /account/sessions | sessions fixture | current token only | durable multi-session list/revoke API |
| /characters | roster fixture | GET /auth/characters | generated contract + five-class label mapping |
| /characters/[id] | detail fixture | GET /auth/characters/{id} | progress/equipment fields remain unopened |
| /journey | journey fixture | Map01A runtime state partial | chapter/quest/progression contract |
| /support | support fixture | none | support domain/API |
## 5. Portal integration sequencing

### Portal P0 — auth transport
Enable only login/register/recovery/session/logout through generated contracts.
Use a server-side adapter/BFF to avoid browser localStorage bearer-token ownership.

### Portal P1 — account + character read
Enable account overview and character roster/detail.
Do not fabricate level, equipment, last-played or progression if backend does not own them yet.

### Portal P2 — session management
Requires durable session registry and list/revoke semantics.
Existing /account/sessions remains fixture until then.

### Portal P3 — journey/progression
Requires canonical scenario/chapter/quest state.
Map01A lane/facing alone is not a player journey model.

### Portal P4 — inventory/social/support/events
Each appears only after its domain contract exists.
## 6. Admin route gap matrix

| Ops route | Existing UI | Current backend source | Missing authority |
|---|---|---|---|
| /control-center | review dashboard | none aggregate | ops read models + metrics contract |
| /player-operations | player list | product account/characters exist but no admin query API | staff auth/RBAC + search/read model |
| /player-operations/[id] | Player 360 fixture | account/character internals exist | admin-safe aggregate endpoint |
| /support | queue fixture | none | support domain + assignment policy |
| /support/[id] | case fixture | none | support case history + safe commands |
| /audit | audit fixture | none | append-only audit/event store |
| /game-operations | world/event fixtures | realtime/game state only | operational read API + staff RBAC |
| /game-operations/[id] | operation detail | none admin-facing | command contract + idempotency + audit |
| /content-liveops | event lifecycle fixture | no LiveOps REST | event config/version/publish/rollback |
| /trust-safety | moderation fixture | none | report/moderation domain |
| /security-governance | approval fixture | none | staff roles/capabilities/approval policy |
## 7. Admin sequencing

### Admin A0 — staff security substrate
Separate staff identity, roles and capabilities from player auth.
Minimum capabilities:
- player.read
- character.read
- session.read
- support.read
- audit.read

### Admin A1 — read-only Player 360
Expose account/character/session read model without DB access.

### Admin A2 — audit first
Create actor/action/target/reason/correlation/result envelope before mutation.

### Admin A3 — support
Create/triage/assign/escalate support cases with capability checks.

### Admin A4 — safe commands
Start with revoke session / unstuck.
Do not begin with arbitrary grants, bans, currency edits or world restart.

### Admin A5 — world/liveops
Only after event/world authoritative models exist.
## 8. Canonical domain map

### Identity
Owner: Java API.
Current: product registration/login/recovery exists.
Next contract: identity, credential and session lifecycle.

### Character
Owner: Java API with GameData identity references.
Current: three slots, five runtime classes, Map01A state.
Next contract: canonical character profile read model.

### World
Owner: game server/world runtime.
Current: Map01A state only in product API; larger Zone Network is game design/runtime.
Next contract: stable zone/map IDs and reconnect state.

### Combat
Owner: realtime server.
Current: server-authoritative design/foundation.
Next contract: intent/accepted/rejected/result/snapshot production semantics.

### Progression
Owner: backend + GameData.
Current: design only / local slices.
Next contract: level/skill/chapter/quest authority.
### Inventory & Equipment
Owner: backend + GameData.
Current: Unity presentation/runtime experiments; no canonical REST ownership model.
Next contract: item instance/stack, slots, equip/unequip, cosmetics.

### Social
Owner: backend/realtime.
Current: social.proto intent shapes only; product service not open.
Next contract: presence/chat/friend/party/guild-lite.

### Support
Owner: backend support domain.
Current: Web fixtures only.
Next contract: case, message/timeline, ownership/privacy, staff workflow.

### LiveOps
Owner: backend config/event service.
Current: design/event concepts + Web fixtures.
Next contract: event version/schedule/publish/rollback/state.

### Administration
Owner: dedicated staff security domain.
Current: Ops UI only.
Next contract: staff identity, RBAC capabilities, approval policy.

### Audit
Owner: append-only backend service/store.
Current: no canonical API.
Next contract: immutable actor/action/target/reason/correlation/result event.
## 9. Contract Pack v1 recommended structure

```text
contract-pack/
  manifest.json
  rest/
    openapi.yaml
  realtime/
    protocol-version.json
    *.proto
  ids/
    canonical-ids.json
  errors/
    error-codes.json
  security/
    player-auth.md
    staff-rbac.md
  audit/
    audit-event.schema.json
  compatibility/
    migrations.md
    compatibility-matrix.md
  environments/
    integration.md
    test-accounts.md
  SHA256SUMS.txt
```

Web should ingest this pack through a deterministic sync/generation step.
No app route may define a competing canonical DTO.
## 10. Error contract recommendation

Minimum envelope:

```json
{
  "code": "AUTH_SESSION_EXPIRED",
  "message": "Player-safe localized/fallback message",
  "requestId": "req_...",
  "details": {}
}
```

Rules:
- `code` stable and machine-consumable;
- HTTP status remains meaningful;
- player-safe `message` must not leak account existence/secrets;
- Admin may receive privileged details only through staff-authorized APIs;
- request/correlation ID flows through Portal/Admin/Java logs and audit.
## 11. Session/auth split recommendation

### Unity
Continue token-based product session semantics where appropriate.

### Player Web
Use Next.js server boundary as an adapter:
- credentials submitted to server-side action/BFF;
- Java product auth remains authority;
- browser receives HttpOnly + Secure + SameSite session representation;
- do not store raw backend access token in localStorage;
- session expiry/logout maps to canonical backend semantics.

### Admin
Do NOT reuse player sessions.
Staff identity and staff authorization are independent.
## 12. Contract acceptance gates

A domain is accepted for Web only when:
1. Game/backend commit is sealed;
2. schema/version is explicit;
3. generated client succeeds;
4. positive and negative contract tests pass;
5. auth/permission semantics are documented;
6. error codes are stable;
7. integration environment exists;
8. fixture fallback remains for unopened domains;
9. consumer E2E verifies real data without hidden local DTOs.

Until then, `NO_ACCEPTED_BACKEND_CONTRACT` remains correct for that domain.
## 13. Immediate conclusions

Ready to prepare for Web integration:
- product auth core;
- account/session self identity;
- product character roster/detail;
- five-class mapping;
- Map01A state as a narrow runtime field.

Not ready:
- multi-device sessions;
- progression/journey;
- inventory/equipment;
- social;
- support;
- staff RBAC;
- audit;
- moderation;
- LiveOps;
- economy.

The next planning artifact is **WEB-08 Contract Intake v2**, built from this matrix.
