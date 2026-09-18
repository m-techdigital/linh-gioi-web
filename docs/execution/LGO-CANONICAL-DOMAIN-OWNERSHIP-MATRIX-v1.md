# LGO Canonical Domain Ownership & Write-Authority Matrix v1

Date: 2026-09-18
Status: ACTIVE WAVE-0 AUTHORITY BASELINE
Task: `T-9f13d5b84287 — LGO-W0-WEB-02`
Umbrella Mission: `MS-57a638c72421`
Game source authority: `origin/feature/2d @ 3a50d4faa95b823e15c0b1c88252088ed79d9a71`
Cross-sandbox confirmation: `MM-4986a47d150d`

## 1. Purpose

This document answers one question for every important LGO domain:

> **Who may author the durable truth, and who may only request, observe, predict or render it?**

The target architecture follows the accepted server-authoritative and modular-monolith ADRs. A UI, client or operational console can submit commands, but it does not become storage authority by rendering/editing a field.

## 2. Core ownership rules

1. Every durable business fact has exactly one canonical write authority.
2. PostgreSQL is the target durable store, but **the database itself is not the domain owner**; Java domain services own business mutations and transactions.
3. Static version-controlled game definitions belong to GameData/content source, not duplicated into mutable player-state tables by default.
4. Unity may predict/render gameplay but cannot declare durable outcomes.
5. Player Web and Admin never write PostgreSQL directly.
6. Admin mutations go through privileged backend commands with RBAC, reason, idempotency and audit.
7. Realtime simulation may author realtime state, but blocking durable DB I/O must not run on the simulation loop; durable commits cross an explicit asynchronous/domain boundary.
8. Public Web is presentation/content and has no authority over player state.
## 3. Canonical authority matrix

| Domain / state | Definition authority | Durable write authority target | Realtime authority | Consumers | Current implementation | Status / next |
|---|---|---|---|---|---|---|
| Player account identity | IAM domain rules | Java API IAM service → PostgreSQL `iam` | none | Unity, Portal, Admin read | JSON player/account prototype | DB-03/04/07 |
| Login identifiers | IAM domain rules | Java API IAM service → `iam.account_identifiers` | none | auth flows | JSON credential index | DB-03/04 |
| Password credential | IAM security policy | Java API IAM service → `iam.credentials` | none | auth only | BCrypt hash in JSON credential store | DB-03/04 |
| Product sessions | IAM/session policy | Java API session service → `iam.auth_sessions` | none | Unity, Portal, Admin safe ops | process-memory registry | DB-05 |
| Recovery challenges/grants | IAM/recovery policy | Java API recovery service → PostgreSQL IAM | none | recovery UI | process-memory maps | DB-05 |
| Character identity/ownership | Character domain | Java API character service → `player.characters` | none | Unity, Portal, Admin | JSON profile store | DB-06/07 |
| Character class identity | Product Bible + GameData compatibility | character service writes canonical ID; DB stores canonical new-write value | realtime consumes canonical runtime class | Unity, Portal, Admin | backend accepts `vo/kiem/phap/co/linh` plus legacy `class.sword/class.martial` | SYS-01/SYS-03 then DB-06 |
| Founder Alpha class availability | Product/release configuration | release/content policy, not character schema validity | combat/runtime availability | Unity + product UI | Product Bible v2 now locks five identities with Võ + Kiếm as the two combat-complete Alpha Paths | RESOLVED by Game SYS-01 |
| Static class definitions | GameData/content | version-controlled GameData | loaded/compiled by runtime | Java, realtime, Unity, Web labels when exported | registry is legacy two-class today | Game SYS-01/SYS-03 |
| Static skill/item/monster definitions | GameData/content | version-controlled GameData | runtime consumes definitions | Java/realtime/Unity/Web reads | partial content pipelines | later GameData tasks |
| City/world content node | GameData | GameData | runtime routing consumes | Unity/Portal/Admin labels | `map.city.linh_thanh` confirmed as city/zone content ID | SYS-03 |
| Concrete playable Map01A identity | runtime-map contract | Game/runtime map registry + persistence contract | runtime map instance | Unity; Portal/Admin read summary | `map-01a-cong-dong-lam` in CharacterRuntimeState/mapper | SYS-03, no rename |
| Runtime map instance/channel identity | runtime infrastructure | runtime/session authority; durable reference only when required | realtime | Unity/Admin ops | not production-opened | later world/runtime task |
| Character reconnect state | Character/world persistence domain | Java backend persistence transaction | realtime supplies/validates accepted state as integration evolves | Unity reconnect; Portal/Admin read | Map01A state saved through product API/JSON | DB-06 + world contract |
| Movement position during active session | realtime movement authority | no per-frame durable DB write | realtime server | Unity | realtime foundation | Game runtime |
| Combat outcome/health | realtime combat authority | durable results committed through backend/domain transaction when persistence opens | realtime server | Unity/Admin read | combat foundations, not full production authority | GAME-DATA-03 |
| Scenario/chapter/quest progress | Progression domain | Java progression service → PostgreSQL `progression` | realtime emits accepted triggers/events | Unity, Portal, Admin read | no canonical durable path confirmed in this audit | WAITING_GAME_SYS02 → GAME-DATA-01 |
| Level/experience | Progression domain | Java progression service → PostgreSQL | realtime may originate accepted reward events | Unity, Portal, Admin | no canonical relational authority yet | GAME-DATA-01 |
| Skill progression/unlocks | Progression + GameData definition | progression service → PostgreSQL; definitions from GameData | realtime consumes unlocked state | Unity, Portal, Admin | UI/runtime data exists; durable authority pending audit | WAITING_GAME_SYS02 |
| Item ownership | Inventory domain | Java inventory service → PostgreSQL `inventory` | realtime may originate loot result | Unity, Portal, Admin | UI/try-on/runtime prototype; no relational durable authority confirmed | WAITING_GAME_SYS02 → GAME-DATA-02 |
| Equipment assignment | Inventory domain | Java inventory service → PostgreSQL | realtime consumes equipped combat state | Unity, Portal, Admin | UI/runtime prototype | GAME-DATA-02 |
| Cosmetic assignment | Inventory/cosmetic domain | backend inventory/cosmetic service → PostgreSQL | presentation consumed by realtime/client | Unity, Portal | modular art/runtime work exists | GAME-DATA-02 |
| Currency balance | Economy domain | economy service → ledger-backed PostgreSQL transaction | realtime may request reward command | Unity, Portal, Admin constrained view | not opened | later economy |
| Currency mutation history | Economy domain | immutable ledger append | none | Admin/audit/read models | not opened | later economy |
| Marketplace order/trade | Economy domain | economy/market service → PostgreSQL escrow transaction | none | Portal/Unity/Admin | not opened | later economy |
| Friend/guild membership | Social domain | Java social service → PostgreSQL | presence layer consumes | Unity, Portal, Admin safe read | not opened | later social |
| Presence | realtime/social session authority | normally ephemeral; only history if explicitly required | realtime server | Unity/Portal/Admin ops | future | later social |
| Chat transport | realtime/social authority | realtime; durable moderation/history only by explicit policy | realtime server | Unity/Admin moderation | future | later social |
| Support case | Support domain | Java support service → PostgreSQL `support` | none | Portal/Admin | Web fixtures only | ADM-06/PWEB-08 |
| Staff identity/session | Staff IAM, separate from player IAM | privileged Java staff-auth service → PostgreSQL `ops` | none | Admin | not opened | ADM-02 |
| Role/capability assignment | Staff IAM/RBAC | privileged RBAC service → PostgreSQL | none | Admin/API authorization | not opened | ADM-02 |
| Operator audit event | Audit domain | append-only audit service → PostgreSQL `audit` | event sources may publish context | Admin audit view | not opened | ADM-03 |
| LiveOps definition source | GameData/content + LiveOps governance | immutable/versioned content source | runtime consumes published version | Unity/Portal/Admin | not opened | GAME-DATA-04/ADM-08 |
| LiveOps schedule/publish state | LiveOps domain | privileged LiveOps service → PostgreSQL `liveops` | runtime observes published state | Unity/Portal/Admin | not opened | GAME-DATA-04/ADM-08 |
| Public website content | Web/public content | Web repo/content pipeline | none | public browser | implemented separately | frozen unless reopened |
## 4. Command and write-boundary rules

### Unity
Unity can:
- authenticate through accepted product APIs;
- submit player commands/input;
- predict movement/presentation;
- request equip/use/interact/combat actions;
- cache presentation state.

Unity cannot:
- insert/update PostgreSQL directly;
- declare inventory/currency/progression outcomes;
- invent a canonical class/map ID not accepted by GameData/backend;
- use a local UI state change as proof of durable completion.

### Player Web
Player Web can:
- read account/character/progression/inventory/support data through accepted APIs;
- submit explicitly supported self-service commands such as login/logout/session revoke/support case creation.

Player Web cannot:
- write database rows directly;
- redefine GameData;
- invent progression/equipment fields because a fixture shows them;
- perform operator-only actions.

### Admin/Ops
Admin can:
- query privileged read models;
- submit capability-gated operational commands;
- request session revoke/unstuck/support/liveops actions when their domains open.

Admin cannot:
- expose a generic SQL editor;
- mutate arbitrary rows;
- bypass domain invariants;
- use player auth as staff auth.

### Java API / modular monolith
The Java backend owns:
- transaction boundaries for durable player/business state;
- authorization and validation;
- idempotency for durable commands;
- persistence repositories;
- outbox/audit integration.

A repository is a storage adapter. It does not become the domain owner.

### Realtime server
Realtime owns:
- active-session simulation truth;
- movement/combat/presence timing;
- validation of realtime commands.

Durable outcomes cross into the durable domain through an explicit command/event boundary. The simulation thread must not block on database/network I/O.
## 5. GameData vs PostgreSQL boundary

### GameData owns definitions
Examples:
- class definition;
- skill definition;
- item template;
- monster template;
- city/zone/map content descriptors;
- dialogue/content packages where source-controlled authoring is appropriate.

### PostgreSQL owns player/operational facts
Examples:
- which account owns a character;
- which canonical class that character currently belongs to;
- current durable reconnect map/state;
- quest completion;
- item ownership and equipment assignment;
- currency ledger entries;
- support cases;
- staff roles;
- audit events;
- published LiveOps operational state when opened.

A database ownership row references a stable GameData ID. It does not duplicate the complete mutable definition into each player row.
## 6. Cross-domain transaction boundaries

| Command | Required durable transaction |
|---|---|
| Register account | account + identifier + credential |
| Password reset | credential replacement + session invalidation semantics |
| Create character | account ownership + slot uniqueness + canonical class validation |
| Save reconnect state | owned character + accepted concrete map/state + optimistic version |
| Equip item | item ownership + slot compatibility + equipment assignment |
| Grant reward | idempotency receipt + progression/inventory/economy mutation as applicable |
| Admin session revoke | capability check + session revoke + audit/outbox |
| Admin unstuck | capability/reason + safe checkpoint state + audit/outbox |
| Publish LiveOps version | approved immutable version + schedule/publish state + audit |

Cross-domain operations that cannot be one local transaction should use explicit outbox/saga-style orchestration rather than hidden dual writes.
## 7. Confirmed ID hierarchy from Game collaboration

Game message `MM-4986a47d150d` and source commit `a66a67a4` / `docs/LGO-PRODUCT-BIBLE-v2.md` confirm:

- `map.city.linh_thanh` is a **GameData city/zone content ID**.
- `map-01a-cong-dong-lam` is the **concrete persisted Map01A runtime map ID**.
- They are not aliases and must not be silently renamed.
- Five canonical class identities are `vo/kiem/phap/co/linh`.
- `class.sword → kiem` and `class.martial → vo` remain compatibility mappings.
- Founder Alpha uses Võ + Kiếm as the first two combat-complete Paths while the account/profile identity vocabulary remains all five canonical values.
- `docs/00-VISION.md` and `docs/02-GDD.md` now encode this staging rule directly; the prior ambiguity is closed.
- `docs/LGO-PRODUCT-BIBLE-v2.md` is authoritative when older Vision/GDD/content-registry prose conflicts on class identity cardinality, Founder Alpha staging, or the meaning of current world/map machine IDs.

This resolves the ownership question sufficiently for architecture:
- GameData owns the high-level content node/definition;
- runtime/persistence owns the concrete playable-map contract;
- a later SYS-03 policy must formalize typed ID namespaces and compatibility without flattening the hierarchy.
## 8. Current unresolved ownership audit

Game SYS-02 is explicitly auditing whether any progression/inventory/world durable path exists beyond the currently inspected prototypes.

Until that response:
- progression rows remain **target authority**, not claimed existing authority;
- inventory/equipment rows remain **target authority**, not claimed existing authority;
- world durable state beyond current Map01A reconnect persistence remains **target authority**, not claimed existing authority.

Status: `WAITING_GAME_SYS02`.

This does not block:
- IAM/database infrastructure planning;
- ID/version/error policy;
- Player Web/Admin dependency mapping;
- contract-intake preparation.
## 9. Read-model policy

Consumers may need denormalized views without creating a second write authority.

Preferred order:
1. backend SQL projection/join;
2. optimized query/view;
3. materialized view with explicit refresh/provenance;
4. separately maintained read model only after measured need.

Examples:
- Admin Player 360 is a read model over IAM/character/session/progression/inventory/support/audit.
- Portal character overview is a read model over player/progression/inventory domains.
- Neither becomes a canonical `player_360` or `portal_character` writable table.
## 10. Ownership anti-patterns explicitly prohibited

- Unity writes a JSON/file/DB record to “save” an authoritative reward.
- Portal writes directly to inventory/equipment tables.
- Admin uses DB credentials to edit a player row.
- GameData and PostgreSQL each expose independently editable copies of the same class/item definition.
- Realtime loop performs blocking JDBC writes per frame/tick.
- A UI fixture becomes the reason to add a backend field with no domain requirement.
- A migration renames `map.city.linh_thanh` to `map-01a-cong-dong-lam` merely because both are “Linh Thành/Map01A”.
- New writes continue legacy `class.sword/class.martial` values after canonical class policy is accepted.
## 11. Implementation dependency impact

### Safe to implement before progression/inventory audit returns
- DB-01 local PostgreSQL + pgAdmin stack.
- DB-02 migration/testing/codegen spine after DB-01.
- IAM schema design/implementation when SYS-03 identity conventions are accepted.
- Portal/Admin design packs and contract dependency matrices.
- OpenAPI inventory/current contract analysis.

### Must wait for specific authority
- progression tables/APIs: Game SYS-02 + GAME-DATA-01 design.
- inventory/equipment tables/APIs: Game SYS-02 + GAME-DATA-02 design.
- expanded world persistence: SYS-03 map hierarchy + Game world persistence design.
- economy/liveops mutations: their dedicated domain designs and RBAC/audit foundations.
## 12. Evidence and acceptance

This matrix is acceptable when:
- each durable domain has one target write authority;
- GameData vs PostgreSQL ownership is explicit;
- Unity/Portal/Admin direct-write boundaries are explicit;
- realtime vs durable-state ownership is explicit;
- current vs target implementation state is not conflated;
- Game collaboration confirmation is incorporated;
- unresolved progression/inventory/world ownership is parked explicitly rather than guessed;
- no Product/Public Web feature work is reopened.

Source/evidence:
- Game source read-only at `3a50d4faa95b823e15c0b1c88252088ed79d9a71` (Product Bible policy introduced at `a66a67a4` and unchanged on audited authority paths through this pin);
- cross-system delta matrix `LGO-WAVE0-CROSS-SYSTEM-DELTA-MATRIX-v1.md`;
- Game Mission response `MM-4986a47d150d`;
- accepted architecture spec/database blueprint/roadmap in Web repo.
