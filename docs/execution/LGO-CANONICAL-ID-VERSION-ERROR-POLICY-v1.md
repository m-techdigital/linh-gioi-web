# LGO Canonical ID, Version & Error Policy v1

Date: 2026-09-18
Status: ACTIVE WAVE-0 CONTRACT POLICY
Task: `T-e6cbde903e06 — LGO-W0-WEB-03`
Umbrella Mission: `MS-57a638c72421`
Game authority consumed: `docs/LGO-PRODUCT-BIBLE-v2.md` + `docs/LGO-PRODUCT-BIBLE-v2.json`
Current REST source inspected: ProductAuthController / ProductCharacterController
Current Web contract state: `NO_ACCEPTED_BACKEND_CONTRACT`

## 1. Purpose

This policy defines the cross-system rules for:

- stable machine identifiers;
- public vs internal identifiers;
- compatibility aliases;
- database/GameData/API/realtime version axes;
- request/correlation identifiers;
- stable error codes and future API error envelope.

The policy is intentionally backward-compatible. It does **not** authorize mass-renaming shared IDs, changing current REST URLs, or rewriting existing persisted legacy values.
## 2. ID categories

Every machine identifier must have an explicit semantic category. Similar display names do not make IDs interchangeable.

### 2.1 Product identity IDs

Canonical new-write class IDs:

`vo`, `kiem`, `phap`, `co`, `linh`.

Legacy read compatibility:
- `class.martial → vo`
- `class.sword → kiem`

Historical planning labels:
- `class.arcane`
- `class.tech`
- `class.spirit`

are **not** automatic persistence aliases.

Rule:
- new domain/product writes use canonical IDs;
- old values remain readable where already shared/stored;
- no silent rewrite merely to modernize vocabulary;
- migration/alias removal requires an explicit compatibility task.

### 2.2 Public account/character IDs

Existing public IDs remain stable API identities.

Examples already used by the product contracts:
- account public ID;
- character public ID.

Future PostgreSQL may use internal UUIDv7 primary keys without replacing public API IDs.

Rule:
- API consumers do not depend on DB primary keys;
- internal UUIDs never become player-facing labels;
- changing a public ID format is a contract migration, not a schema refactor.
### 2.3 World/map identifiers

Product Bible v2 defines typed purposes:

- `map.city.linh_thanh` — **content-zone** ID owned by GameData/world taxonomy;
- `map-01a-cong-dong-lam` — **runtime-playable-map** ID persisted by current Map01A runtime state;
- `dong-mon` — **authoring-local-map-key**, not a stable cross-system persistence/API ID.

Rules:
- content-zone and runtime-playable-map IDs are not aliases;
- parent/containment relationship must be explicit data when required;
- names/strings do not imply hierarchy;
- a stable shared ID is never silently renamed;
- future runtime instance/channel IDs are separate from map-template identity.

### 2.4 Realtime entity IDs

Realtime entity IDs such as numeric entity IDs are session/runtime identifiers.

Rules:
- they do not replace public account/character IDs;
- they do not replace PostgreSQL internal UUIDs;
- lifetime/uniqueness semantics must be documented by realtime domain;
- APIs expose them only when a consumer genuinely needs runtime correlation.

### 2.5 Request/correlation IDs

Every accepted external request should eventually receive one correlation/request ID.

Properties:
- opaque;
- globally unique enough for operational tracing;
- safe to log and display to support/operators;
- not derived from access token/credential data.

The same correlation ID should connect:
client error → API log → domain command → audit/outbox/event chain where applicable.
## 3. ID display/localization policy

Machine IDs are not user copy.

Player-facing surfaces must map:
- `vo → Võ`
- `kiem → Kiếm`
- `phap → Pháp`
- `co → Cơ`
- `linh → Linh`

and use localized location names rather than exposing raw map IDs.

Admin may display raw IDs only in diagnostic contexts, paired with readable labels.

Portal/Admin must never expose:
- raw password hashes;
- auth token hashes/raw tokens;
- recovery verification codes;
- secret DB identifiers that have no support/operations value.
## 4. Version axes

LGO has multiple independent compatibility axes. They must not be collapsed into one generic version field.

| Axis | Authority | Purpose | Compatibility rule |
|---|---|---|---|
| Product Bible version | Product/Game docs | product vocabulary/staging policy | explicit supersession |
| Database schema version | Flyway schema history | durable storage shape | ordered migrations + checksum |
| GameData version | GameData registry/build output | static game/content definitions | versioned compiled package |
| GameData schema version | GameData schema/validator | structure of GameData payloads | validator-backed migration |
| REST contract version | accepted OpenAPI artifact | player/admin HTTP contract | compatibility + checksum |
| Realtime protocol version | `protocol/*.proto` | realtime wire contract | generated Java/C#; no manual generated edits |
| Web generated client version | Web contract package | exact REST snapshot consumed | generated from accepted REST contract |
| Application build/source commit | Git/build metadata | executable provenance | evidence/release trace only |

A deploy may change one axis without changing all the others.
## 5. REST contract version policy

Current product endpoints are unversioned paths such as:
- `/auth/register`
- `/auth/login`
- `/auth/session`
- `/auth/logout`
- `/auth/recovery/*`
- `/auth/characters`
- `/auth/characters/{characterId}`
- `/auth/characters/{characterId}/map01a-state`

This policy does not rename/prefix them now.

CT-01 must create an accepted OpenAPI snapshot with:
- contract semantic version;
- content checksum;
- source commit;
- generated-at/build metadata;
- domain/endpoint ownership.

Compatibility rules:
- additive optional response fields may remain within the same major contract when consumers tolerate them;
- removing/renaming required fields or changing semantics is breaking;
- breaking changes require compatibility window, migration plan, or new major contract surface;
- path versioning is introduced only if/when a breaking HTTP surface requires it, not pre-emptively.
## 6. Realtime/protobuf version policy

ADR-0003 remains authoritative:
`protocol/*.proto` is the single wire-contract source for realtime messages.

Rules:
- Java/C# generated sources are not manually edited;
- field-number reuse is forbidden;
- removal follows protobuf compatibility practice rather than renumbering;
- incompatible semantic changes require explicit protocol compatibility handling;
- source commit/proto checksum must be evidence for release integration.

Realtime protocol versioning is independent from REST/OpenAPI versioning.
## 7. Database version policy

Flyway is the schema-change authority.

Each deployed environment must be able to report:
- latest applied Flyway version;
- migration checksums/status;
- application source/build version.

Rules:
- applied versioned migrations are immutable;
- no manual production schema edits become implicit authority;
- expand → backfill → switch → contract for breaking changes;
- database schema version does not equal product version or REST version.
## 8. GameData version policy

Current GameData registry exposes:
- `gamedata_version`
- `schema_version`

These remain separate concepts:
- `gamedata_version`: content/package revision;
- `schema_version`: structure/format revision.

Future compiled GameData artifacts should also expose checksum/source provenance.

Database player-state rows reference stable GameData IDs and, where required for durable interpretation, the relevant GameData/content version. They do not duplicate the entire definition payload by default.
## 9. Current REST error reality

Current ProductAuthController and ProductCharacterController use Spring `ResponseStatusException` with HTTP status plus free-text reason.

Examples:
- 400 — `invalid registration request`
- 409 — `identifier already registered`
- 429 — `recovery request rate limited`
- 503 — `recovery service unavailable`
- 401 — `invalid or expired recovery grant`
- 401 — `invalid credentials`
- 401 — `invalid or expired session`
- 404 — `character not found`
- 400 — `invalid Map01A runtime state`

This is working prototype behavior, **not** an accepted stable client error contract.

Web currently correctly refuses integration with:
`NO_ACCEPTED_BACKEND_CONTRACT`.

Consumers must not begin parsing those reason strings.
## 10. Target error envelope

CT-02 should introduce a stable JSON envelope for non-2xx REST responses:

```json
{
  "error": {
    "code": "auth.invalid_credentials",
    "message": "Invalid credentials.",
    "requestId": "req_...",
    "details": {}
  }
}
```

Contract:
- `code` is stable machine behavior.
- `message` is a safe fallback/debug message, not the primary branching contract.
- `requestId` is safe operational correlation.
- `details` is optional structured safe context and must not leak secrets/internal stack traces.

For responses with no body, correlation remains available through an accepted request-ID response header.

Player-facing Vietnamese copy is selected/localized by the consumer from `code`, unless a server-owned message is explicitly part of a domain contract.
## 11. Initial stable error-code registry

| Code | HTTP | Current source behavior mapped | Consumer meaning |
|---|---:|---|---|
| `request.invalid` | 400 | malformed/invalid generic request | request shape/value rejected |
| `auth.registration_invalid` | 400 | `invalid registration request` | registration input invalid |
| `auth.identifier_conflict` | 409 | `identifier already registered` | identifier cannot be registered |
| `auth.recovery_request_invalid` | 400 | `invalid recovery request` | recovery request shape/value invalid |
| `auth.recovery_rate_limited` | 429 | `recovery request rate limited` | retry later |
| `auth.recovery_unavailable` | 503 | `recovery service unavailable` | delivery/service unavailable |
| `auth.recovery_grant_invalid` | 401 | `invalid or expired recovery grant` | verify/reset grant unusable |
| `auth.invalid_credentials` | 401 | `invalid credentials` | login rejected without revealing which credential failed |
| `auth.session_invalid` | 401 | `invalid or expired session` | auth required/re-login |
| `auth.forbidden` | 403 | future privileged routes | authenticated actor lacks capability |
| `character.not_found` | 404 | missing or foreign character returns same not-found path | resource unavailable; do not reveal other-account ownership |
| `character.runtime_state_invalid` | 400 | `invalid Map01A runtime state` | supplied reconnect/runtime state invalid |
| `resource.conflict` | 409 | future optimistic/idempotency/domain conflict | state changed or command conflicts |
| `rate_limited` | 429 | future generic throttle | retry according to policy |
| `service.unavailable` | 503 | future dependency outage | temporary service unavailability |
| `internal.error` | 500 | unhandled safe fallback | unexpected server failure; use requestId for support |

Domain-specific codes may be added without changing existing code meanings.
Codes are never recycled for a different semantic.
## 12. HTTP status semantics

Use HTTP status and stable error code together.

- **400** — malformed or invalid request input.
- **401** — authentication/session/recovery credential invalid or expired.
- **403** — authenticated but lacks permission/capability.
- **404** — resource unavailable; may intentionally conceal ownership.
- **409** — conflict with current durable state / uniqueness / idempotent command semantics.
- **422** — reserve for validated request shape whose domain semantics are unacceptable only if a domain needs the distinction; do not introduce casually.
- **429** — throttled/rate limited.
- **500** — unexpected server fault with safe envelope.
- **503** — temporary service/dependency unavailable.

Changing the HTTP status for an existing accepted error code is a contract change and must be reviewed.
## 13. Error security rules

1. Login failure must not distinguish “unknown account” from “wrong password”.
2. Character ownership mismatch may return the same `character.not_found` as a nonexistent character.
3. Recovery request semantics must preserve enumeration resistance.
4. No error payload includes:
   - raw access/reset token;
   - password/hash;
   - verification code;
   - stack trace;
   - JDBC/SQL error text;
   - filesystem/internal secret paths.
5. Admin permission denial uses stable code/correlation and does not reveal hidden privileged data.
6. Logs may contain richer diagnostics but must be correlated by request ID and follow secret-redaction policy.
## 14. Compatibility and migration rules

### ID changes
A shared stable ID can change semantics only through:
1. proposal in Umbrella Mission;
2. owning-domain decision;
3. compatibility/migration design;
4. producer update;
5. consumer compatibility window;
6. evidence;
7. explicit legacy retirement later.

### Error-code changes
- adding a new code is additive when existing semantics remain;
- changing a code's meaning is breaking;
- removing a code requires proof no accepted consumer depends on it;
- consumers must have a generic fallback for unknown future codes.

### Version changes
Each contract artifact publishes its own version/checksum.
No consumer may infer REST compatibility from database or GameData version alone.
## 15. Web/Portal/Admin consumption rules

Until CT-01/02 are accepted:
- `packages/contracts` remains blocked/provisional;
- `packages/api-client` continues throwing `BackendContractUnavailableError`;
- fixture DTOs do not become canonical types.

After contract acceptance:
- generated TypeScript owns backend DTO shape;
- Web application code maps stable error codes to UX states;
- no route parses Spring reason text;
- raw class/map IDs are mapped to readable labels;
- Admin may surface correlation/public IDs for diagnostics, not credentials/internal DB keys.
## 16. Required contract metadata

An accepted REST contract package must expose enough provenance to answer:

- contract semantic version;
- source Game commit;
- OpenAPI checksum;
- generation tool/version;
- generation timestamp/build ID where useful;
- compatible GameData/protocol constraints if any;
- list of domains/endpoints included.

Generated clients embed or export contract version/checksum for runtime/support diagnostics.
## 17. Change examples

### Add Pháp character response
No new identity schema is required because `phap` is already canonical.
Backend/DB must accept canonical new writes; Portal maps `phap → Pháp`.

### Existing `class.sword` record
Read as legacy-compatible Kiếm. Do not rewrite on read.
A future migration may canonicalize storage only with an explicit audited migration decision.

### Add a Linh Thành district
Do not derive its stable ID by concatenating display text.
Register an owned content/runtime ID with explicit kind and relation to parent content node.

### Rename “Đông Môn”
Display copy may change without changing a stable machine ID.
Machine-ID change requires compatibility/migration.

### Add backend field
If optional/additive and consumers tolerate it, it can stay within the REST major.
If required/semantic-breaking, use a compatibility window/new major surface as needed.

### Add new error condition
Create a new stable code; do not overload `request.invalid` if the client needs distinct behavior.
## 18. Acceptance gate

This policy is ready when:
- five canonical class new-write IDs and legacy aliases match Product Bible v2;
- content-zone/runtime-map/authoring-local ID kinds are distinct;
- public/internal/realtime IDs are not conflated;
- database/GameData/REST/realtime/application versions are separate axes;
- current free-text REST errors are documented as prototype-only;
- target envelope and initial stable error registry are explicit;
- security/error compatibility rules are explicit;
- Web packages remain blocked until CT-01/02, so policy text cannot be mistaken for an implemented backend contract.

Implementation ownership:
- Game SYS-03 validates current source compatibility.
- CT-01 creates the accepted OpenAPI artifact.
- CT-02 implements stable errors/correlation.
- CT-03 generates Web contracts/client.
