# LGO Web Client & Admin Real-Data Contract Dependency Matrix v1

Date: 2026-09-18
Status: ACTIVE WAVE-0 PRODUCT/CONTRACT BASELINE
Task: `T-9cc142654022 — LGO-W0-WEB-05`
Umbrella Mission: `MS-57a638c72421`
Web source authority: current `main`
Game source authority inspected: `origin/feature/2d @ 3a50d4faa95b823e15c0b1c88252088ed79d9a71`

## 1. Purpose

This matrix prevents Portal/Ops fixture UX from outrunning backend reality.

For every route it answers:
- what the screen is allowed to show now;
- which current fields are real vs illustrative;
- which backend/domain/contract is required to open real data;
- which state must remain blocked;
- which implementation task owns the transition.

Rules:
1. Existing UI/component/layout work is reused where useful.
2. Fixture fields never become canonical backend requirements merely because the UI already shows them.
3. A route removes `PROVISIONAL_WEB_FIXTURE` / `NOT_CANONICAL_BACKEND_CONTRACT` only for the exact portions backed by an accepted real contract.
4. Mixed real/blocked screens must label unavailable sections explicitly rather than filling them with invented data.
5. Public Web remains frozen and is not part of this matrix.

Current boundary tokens remain authoritative until each exact surface is integrated:
- `PROVISIONAL_WEB_FIXTURE`
- `NOT_CANONICAL_BACKEND_CONTRACT`
- `NO_ACCEPTED_BACKEND_CONTRACT`
- `NO_REAL_OPS_MUTATION`
## 2. Current real backend facts usable by future Portal contracts

### Product account/session
Current Game API already has:
- `POST /auth/register`;
- `POST /auth/login`;
- `GET /auth/session`;
- `POST /auth/logout`;
- recovery request/verify/reset endpoints.

Current account response exposes:
- `accountId`;
- `displayName`;
- `createdAtUnixMs`;
- `updatedAtUnixMs`.

Current login response also exposes:
- `accessToken`;
- `expiresAtUnixMs`.

Current session model is process-memory and therefore not yet sufficient for production multi-session Portal semantics.

### Product character
Current Game API already has:
- `GET /auth/characters`;
- `GET /auth/characters/{characterId}`;
- `POST /auth/characters/{characterId}/map01a-state`.

Current character response exposes:
- `characterId`;
- `accountId`;
- `name`;
- stored `classId`;
- canonical `runtimeClassId`;
- optional `runtimeState.mapId/laneX/facing/updatedAtUnixMs`;
- `entityId`;
- legacy `x/y/z/yawDegrees`;
- created/updated timestamps;
- slot.

These responses do **not** currently expose:
- level;
- experience/progression;
- equipment/inventory;
- last-played label;
- account email/verified-email state;
- security posture;
- multi-session device/location list;
- support cases;
- trust score;
- moderation state;
- audit trail;
- live world capacity;
- live event scheduler state.

Web must not infer those fields.
## 3. Player Web route matrix

| Route | Current fixture claims/data | Real data available now in Game source | Required dependencies to open | Initial real scope | Must remain blocked/removed |
|---|---|---|---|---|---|
| `/login` | disabled identifier/password fixture | `POST /auth/login` exists | DB-05/07 durable auth, CT-01/02/03/05, PWEB-02 BFF | identifier/password submit; canonical auth errors; expiry | no client-local bearer storage; no free-text error parsing |
| `/register` | email/form/terms fixture | `POST /auth/register` exists | DB-03/04/07, CT-01/02/03/05, PWEB-02 | registration fields accepted by backend; conflict/validation states | no invented email verification unless backend opens it |
| `/recovery` | four-stage fixture | recovery request/verify/reset exists | DB-05 durable challenges/grants, accepted delivery policy, CT/BFF | real request→verify→reset flow | no fake ownership check, delivery-success claim or token exposure |
| `/access` | access journey presentation | derives from login/session/recovery | PWEB-02/03 | authenticated/expired/recovery handoff state | no separate “access backend” |
| `/` Portal home | account/characters/session counts/recent activity fixtures | account + roster can eventually be composed | PWEB-03/04; PWEB-05 for session count; later domains for progression/support | identity summary + real character roster shortcuts | fixture activity/session/support counts stay hidden until real |
| `/account` | display name, account ID, email state, security state, session/character counts | account ID/displayName/timestamps; roster can produce character count | PWEB-03/04; PWEB-05 for session count | account identity + created/updated + real roster-derived character count | email/security/session fields not shown as real yet |
| `/account/security` | security posture fixture | no canonical posture model | PWEB-02; future security read model if product needs it | static guidance + current-session boundary only if backed | trust/posture/verification status remains blocked |
| `/account/sessions` | device/location/lastSeen/current-state fixtures | only current bearer session validation exists; no list/revoke model | DB-05 + session list/revoke API + CT update + PWEB-05 | own sessions, current marker, revoke allowed session | precise location/device confidence not invented |
| `/characters` | name/path/level/zone/state/lastPlayed fixtures | name, canonical class, slot, runtime map/state, timestamps | CT-01/03/05 + PWEB-04 | roster: name, class label, slot, known runtime map | level/state/lastPlayed hidden until owning domains exist |
| `/characters/[id]` | detail fixture | full current CharacterResponse fields | CT-01/03/05 + PWEB-04 | identity/class/slot/map/reconnect summary; diagnostics only where player-safe | legacy x/y/z/entity IDs not automatically player-facing; no invented equipment/progression |
| `/journey` | chapter/journey-style fixture | no canonical progression store/API | GAME-DATA-01 + progression contract + PWEB-06 | chapter/objective/progress once real | must remain blocked before progression authority |
| `/support` | topics/case/timeline fixture | no support backend | ADM-06 support domain + PWEB-08 contract | create/list/detail own cases | no live case state before domain exists |

### Portal field migration rule

A fixture field becomes real only when:
1. the owning domain exists;
2. the accepted API exposes the field or read-model value;
3. generated Web contracts include it;
4. route states cover loading/empty/error/expired/offline;
5. browser E2E proves the real path.

No route is allowed to keep an illustrative value beside a real value without an explicit “illustrative/design preview” label.
## 4. Portal-specific fixture fields that must NOT drive backend design

From `portal-fixtures.ts`:

- `emailState` — no accepted backend field today.
- `securityState` — no canonical security-posture model.
- `sessionCount` — only meaningful after durable session list semantics.
- character `level` — belongs to Progression, currently not authoritative.
- character `zone` fixture labels — only current runtime map ID is available today.
- character `state` such as “Ready/Resting” — not a backend domain concept today.
- `lastPlayed` — no accepted source field today.
- illustrative session `device/location/lastSeen/state` — no current multi-session API.
- support timeline/case status — no support domain.

These may guide UX state design, but backend tasks must independently justify whether each field belongs in the product model.
## 5. Player Web opening sequence

### Stage P0 — fixture shell only
Current state.

### Stage P1 — Auth access
Open only:
- login;
- register;
- recovery;
- session-expired/access boundaries.

Dependencies:
DB IAM/session durability + CT + BFF.

### Stage P2 — Account + Character
Open:
- account identity;
- character roster;
- character detail;
- known runtime map summary.

Do **not** wait for inventory/progression to make character identity real.

### Stage P3 — Session management
Open durable own-session list/revoke.

### Stage P4 — Progression/Journey
Open only after GAME-DATA-01.

### Stage P5 — Inventory/Equipment
Add companion views only after GAME-DATA-02; current route set may be extended then.

### Stage P6 — Support
Open player cases only after the shared Support domain exists.

Each stage removes fixture warnings only from the exact opened surface.
## 6. Admin/Ops route matrix

| Route | Current fixture claims/data | Real authority required | Dependencies to open | Initial real scope | Must remain blocked/removed |
|---|---|---|---|---|---|
| `/` Ops home | queue metrics, visual panels, blocked links | composed operational read models | ADM-02/03/04/06/07 progressively | show only live queues/read models whose domains are open | no fake totals/health metrics |
| `/control-center` | fixture review queues + visual proof | real queue/read-model aggregation + freshness | ADM-02/03 plus each source domain | operator “what needs attention” overview | no invented health/capacity/queue counts |
| `/player-operations` | fixture player rows | staff IAM/RBAC + bounded player search API | ADM-02 → ADM-03 → ADM-04 | paginated account/character search | no trust score; no credential/token/hash exposure |
| `/player-operations/[id]` | Player 360 fixture + blocked suspend/moderation | privileged Player 360 read model | ADM-02/03/04 | account/characters/sessions/current map; later progression/inventory/support links | suspend/moderation blocked until dedicated commands/domains exist |
| `/audit` | fixture audit events/filters | append-only audit store/query API | ADM-02 → ADM-03 | search/filter/detail/correlation trace | no edit/delete controls; no fixture actor/action schema |
| `/support` | support queue fixtures | shared Support domain | ADM-02/03/06 | real bounded queue/filter/pagination | no invented priority/SLA/owner |
| `/support/[id]` | case/timeline/assignment/escalation fixtures | Support case/event state machine + player linkage + audit | ADM-06 | case detail, assignment, escalation, state transition | no moderation sanctions hidden in support |
| `/game-operations` | world/session/event fixture rows | world/realtime operational read model | ADM-02/03/07 | read-only world/zone/channel/session/event freshness | no restart/drain/publish buttons yet |
| `/game-operations/[id]` | fixture operation detail/actions | authoritative runtime ops command/read model | ADM-07 plus separate mutation tasks if opened | inspect selected runtime/world surface | destructive operations blocked until runbook/capability/audit design |
| `/content-liveops` | scheduled event fixture + publish/rollback buttons blocked | LiveOps version/schedule/publish authority | GAME-DATA-04 + ADM-02/03/08 | draft/review/publish/rollback only after versioned backend exists | no client-only event state/publish |
| `/security-governance` | governance fixture | staff IAM/RBAC/session/audit policy read models | ADM-02/03 | roles/capabilities/session/security operational information actually exposed | no fake “security posture”; no policy mutation without domain |
| `/trust-safety` | safety review fixture + blocked enforcement | **dedicated Moderation/Trust & Safety domain** | future `LGO-ADM-BE-09` + staff IAM/RBAC/audit | report/review/sanction workflow only after canonical domain exists | no generic “suspend account”; support ≠ moderation |

## 7. Admin data that must never become direct DB/UI authority

Ops routes are deliberately workflow clients.

They may not:
- edit arbitrary account/character rows;
- expose a generic SQL console;
- write Postgres directly;
- change GameData directly;
- treat UI-hidden buttons as authorization;
- treat fixture `trustState` as a product score;
- mutate world/runtime without a backend command/runbook;
- create sanctions through a support-case field.

Every real Admin mutation must specify:
- capability;
- target;
- preconditions;
- reason;
- idempotency;
- confirmation;
- audit event;
- conflict/failure behavior;
- recovery/rollback semantics where relevant.
## 8. Fixture data audit — Ops

Current fixture fields that are useful only as UX examples until a domain opens:

### Player Operations
- `accountState`
- `characterSummary`
- `trustState`
- `surface`

Only account/character identity/read data can be grounded early.
`trustState` has no canonical backend and must not silently become a score.

### Support
- illustrative priority;
- case age;
- owner;
- escalation state;
- timeline.

All must come from the Support state machine when ADM-06 opens.

### Game Operations
- `capacity: 24/100`
- `region: East realm`
- scheduled event preview.

These are explicitly illustrative and must not survive into real Ops as hard-coded values.

### Audit
- fixture actor/action/timestamps are presentation samples only.
- real audit schema comes from ADM-03.

### Trust & Safety
- current case/evidence/timeline is a visual review scenario only.
- no real moderation report/evidence/sanction model exists today.
## 9. Shared UI foundation reuse policy

Existing `@lgo-web/ui` primitives are reusable:
- `WorkspaceAppShell`
- `WorkspacePage`
- `ProvisionalFeatureShell`
- `PageHeader`
- `BoundaryBanner`
- `DataTable` / `DataList`
- `MetricCard`
- `KeyValueGrid`
- `LoadingState`, `EmptyState`, `ErrorState`
- form/action primitives.

Transition rule:
- replace fixture data source, not the whole visual system;
- remove provisional/boundary copy only when the underlying section is real;
- preserve responsive/accessibility behavior;
- do not fork a new “real backend component library” beside the existing shared base.

A route may need redesigned information hierarchy when real data differs from fixtures, but common primitives/tokens remain shared.
## 10. Real-data state requirements

Every opened Portal/Admin screen must implement:

### Network/data states
- initial loading;
- refresh/revalidation;
- empty;
- partial data;
- backend unavailable;
- timeout/network failure;
- auth/session expired;
- permission denied where relevant;
- stale operational telemetry where relevant.

### Contract states
- unknown additive enum/code;
- missing optional field;
- incompatible/unsupported contract version must fail safely rather than render fixture fallback.

### Mutation states
- idle;
- submitting;
- success;
- validation/domain conflict;
- duplicate/idempotent retry;
- permission denied;
- temporary unavailable;
- ambiguous result only when the backend contract truly cannot determine final state.

Fixture data is never used as an automatic fallback for a failed real request.
## 11. Real-data rollout dependency graph

```text
DB IAM persistence
   ↓
CT-01 OpenAPI + CT-02 stable errors
   ↓
CT-03 generated TS client + CT-05 integration env
   ↓
PWEB-02 browser/BFF session
   ├─→ PWEB-03 auth/register/recovery
   ├─→ PWEB-04 account/character
   └─→ PWEB-05 durable session management

Game progression/inventory domains
   ├─→ PWEB-06 journey/progression
   └─→ PWEB-07 inventory/equipment

Staff IAM/RBAC
   ↓
ADM-03 audit
   ↓
ADM-04 Player 360
   ├─→ ADM-05 safe session/unstuck
   ├─→ ADM-06 support → PWEB-08 support
   ├─→ ADM-07 world ops read model
   ├─→ ADM-08 LiveOps (with GAME-DATA-04)
   └─→ ADM-BE-09 moderation/trust-safety
```

This graph allows UI/product design to proceed ahead, but real integration claims follow authority dependencies.
## 12. Route opening verdict

### Can become real relatively early
After DB/CT/BFF:
- login;
- register;
- recovery;
- account identity;
- characters roster/detail.

### Requires new backend capability before real integration
- multi-session management;
- progression/journey;
- inventory/equipment;
- support;
- Player 360;
- audit;
- world operations;
- LiveOps;
- staff security governance;
- Trust & Safety.

### Must never be opened merely because current UI exists
- trust score;
- generic account suspension;
- arbitrary player mutation;
- world restart/drain;
- LiveOps publish/rollback;
- audit event editing;
- direct database editing.
## 13. Evidence / source basis

Web source inspected:
- all current Portal routes under `apps/portal/src/app`;
- all current Ops routes under `apps/ops/src/app`;
- `apps/portal/src/lib/portal-fixtures.ts`;
- `apps/ops/src/lib/ops-fixtures.ts`;
- `packages/contracts`;
- `packages/api-client`;
- shared UI primitives/tokens.

Game source inspected:
- ProductAuthController and auth response types;
- ProductCharacterController;
- AccountResponse;
- CharacterResponse;
- CharacterRuntimeStateResponse;
- Product Bible v2;
- current Game SYS-02 Mission checkpoint `MM-77bcafc34839`.

Planning authority:
- canonical domain ownership matrix;
- canonical ID/version/error policy;
- DB-01 readiness runbook;
- unified task catalog/master roadmap.

Any backend field not supported by those sources is marked blocked rather than inferred.
## 14. Follow-up tasks created/found by this audit

Existing tasks remain:
- PWEB-01..08;
- ADM-01..08;
- CT-01..05;
- GAME-DATA-01..04.

New gap explicitly registered:
- `LGO-ADM-BE-09 — Trust & Safety moderation domain foundation` (`T-f426b7436ddf`).

Separate shared-planning task created from owner Mission direction:
- `LGO-W0-WEB-06 — Unified gameplay scenario/class/skill/design roadmap reconciliation` (`T-f9c2c132c769`).

The moderation task stays dependency-blocked until staff IAM/RBAC/audit are available.
The gameplay-roadmap task may proceed through historical/current-authority research without blocking current Web/Admin contract work.
## 15. Acceptance

This matrix is accepted when:
- every current Portal/Ops route has a real authority/dependency classification;
- existing backend fields are distinguished from fixture-only fields;
- routes do not invent level/security/trust/session/support/liveops data;
- fixture UI does not force backend schema design;
- shared component reuse remains the default;
- Trust & Safety backend gap is explicit;
- opening sequence follows DB/domain/contract authority;
- source evidence is current and no production integration is falsely claimed.

This document is a planning/control artifact. It does not itself remove fixture guards or connect Portal/Ops to the Game backend.
