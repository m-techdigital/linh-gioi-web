# LGO Wave 0 Cross-System Delta Matrix v1

Date: 2026-09-18
Status: ACTIVE EXECUTION BASELINE
Web/Data task: `T-bda374e4b9dc — LGO-W0-WEB-01`
Umbrella Mission: `MS-57a638c72421`
Game authority inspected: `origin/feature/2d @ a36e8ec412aafd61cb904fa4eb95a0035d55ac87`
Web authority: `main @ 81057f8b17d2596e4b9c2c51c6793a45624b383f`

## Purpose

This matrix separates four kinds of differences so the program does not over-correct source:

1. **ALIGNED** — current authorities already agree; do not reopen.
2. **LEGACY_COMPATIBILITY** — old representation still exists and must remain readable during migration.
3. **AUTHORITY_CONFLICT** — current active sources state different product/technical rules; must be resolved explicitly.
4. **SEMANTIC_AMBIGUITY** — values look different but may represent different layers; do not rename until ownership/meaning is confirmed.

Blocked rows are parked with explicit cross-sandbox questions while independent work continues.

Live reconciliation note: during this task Game authority advanced from `7636ddd4` to `a36e8ec4` through UIF-10 fidelity/device closure commits. Exact diff was checked; it only changed UI fidelity/device governance, project state and validators, with no changes to the Product Vision/GDD, class compatibility, map/runtime IDs, persistence code or product auth/character contract paths audited by this matrix. This task therefore updates the authority pin without changing the classifications below.
## Executive delta matrix

| Area | Current Game evidence | Classification | Web/Data interpretation | Required action | Lane / task |
|---|---|---|---|---|---|
| Product category | `docs/00-VISION.md`, `docs/02-GDD.md`, 2D Direction Lock all retain Social Action MMORPG | ALIGNED | Architecture can treat social/action/progression pillars as stable | No reopen | shared |
| 2D presentation | GDD + Direction Lock lock HD 2D side-scroll/parallax | ALIGNED | DB/API design must not depend on 3D asset assumptions | No reopen | Game |
| Tutorial Shadow Slime | GDD step 8 and Direction Lock step 9 both require combat; active Map A-Z also uses Shadow Slime combat | ALIGNED | Old non-combat interpretation is not current authority | Do not reopen unless new source regresses | Game |
| Five class product identity | Direction Lock defines Võ/Kiếm/Pháp/Cơ/Linh; current Character Hub binds five profiles; backend compatibility accepts all five canonical runtime IDs | ALIGNED at identity/runtime layer | Data model must be able to represent all five canonical identities | Use five canonical runtime/new-write IDs in architecture | SYS-01/SYS-03 |
| Founder Alpha class scope | `docs/00-VISION.md` and lower GDD Founder Alpha sections still say 2 Paths/classes: `class.sword`, `class.martial` | AUTHORITY_CONFLICT with current five-class product identity unless interpreted as content staging | Identity model and Alpha content completeness must be separated | Game sandbox to confirm whether “2 classes” means two combat-complete Alpha paths rather than only two valid identities | Game SYS-01 + Mission question A |
| Legacy class IDs | `class.sword`, `class.martial` remain in GDD/GameData; backend maps them to `kiem`, `vo` | LEGACY_COMPATIBILITY | They must remain readable during migration but should not define new canonical writes | Explicit migration-only policy; no raw legacy IDs in Player Web/Admin display | SYS-03 |
| GameData class registry | `gamedata/registry.yaml` lists only `class.sword`, `class.martial` | AUTHORITY_CONFLICT / STALE CONTENT REGISTRY relative to current five-class runtime direction | Do not silently expand registry from Web lane | Game audit owns migration/registry decision | Game SYS-01/SYS-03 |
| Founder Alpha world IDs | GDD uses `map.city.linh_thanh`, fields and dungeon IDs | CURRENT GAMEDATA VOCABULARY | Suitable as high-level GameData content nodes until proven otherwise | Preserve while defining map/zone hierarchy | SYS-03 |
| Persisted Map01A ID | `CharacterRuntimeState.MAP01A_ID = map-01a-cong-dong-lam` and Unity mapper/tests use same | CURRENT RUNTIME/PERSISTENCE VOCABULARY | This may be a concrete playable tutorial map under a broader Linh Thành node, not necessarily an alias of `map.city.linh_thanh` | Do not rename. Ask Game to confirm semantic relationship and canonical owner | Game SYS-03 + Mission question B |
| Zone ID ownership | `LGO-MAP-ZONE-MODEL-v1.0.md` explicitly says ownership is not yet decided | SEMANTIC_AMBIGUITY / OPEN AUTHORITY | DB schema must not hard-code a guessed map taxonomy yet | Resolve in SYS-03 before DB character/world schema hardens IDs | shared |
| Durable account/credential | Current product stores use JSON files | PROTOTYPE AUTHORITY | PostgreSQL migration can be designed but not silently switched | DB-01..DB-07 sequence | Game DB lane |
| Auth sessions | Current `AuthSessionRegistry` is process memory | PROTOTYPE / NON-DURABLE | Portal multi-session management cannot be real yet | DB-05 before PWEB session UI integration | Game + Web |
| Recovery challenge/grant | Current recovery challenge/grant state is process memory | PROTOTYPE / NON-DURABLE | Recovery survives only process lifetime today | DB-05 before real Portal recovery guarantees | Game + Web |
| Character/runtime state | Product character API exists; JSON player profile schema v4 + Map01A runtime state | WORKING PROTOTYPE | API semantics should be preserved during PostgreSQL migration | DB-06 and CT compatibility gates | Game |
| Inventory/progression durable authority | Current UI/runtime prototypes exist, but no accepted relational durable authority found in inspected sources | NOT OPENED | Portal/Admin must not invent real inventory/progression fields | GAME-DATA-01/02 later | shared |
| Staff identity/RBAC/audit | No accepted production staff IAM/RBAC/audit backend found | NOT OPENED | Ops remains fixture/read-design until ADM foundation | ADM-02/03 later | Web/Admin + Game backend |
| DB platform | Game `infra/` has no current PostgreSQL compose; server API POM has no DB/Flyway/jOOQ dependencies | NOT IMPLEMENTED | DB-01 is first physical DB platform task after authority gates | Prepare exact implementation runbook now; implement only in Game worktree | Web W0-04 → Game DB-01 |
| Visual DB management | No pgAdmin stack exists | NOT IMPLEMENTED | Owner requirement is explicit live visual ERD, not static image only | pgAdmin 4 + live ERD gate in DB-01 | Game DB-01 |
| Contract platform | Web packages remain blocked/provisional; no accepted generated OpenAPI TS client | NOT IMPLEMENTED | Contract intake can be prepared without inventing endpoints | CT-WEB-01 + CT-01..05 | Web + Game |
## SYS-01 input status

### Already closed by current source
- 2D product direction.
- Tutorial starts at Linh Thành – Đông Môn.
- Shadow Slime is a combat tutorial/vertical-slice target in active GDD and Direction Lock.
- Five class identities Võ/Kiếm/Pháp/Cơ/Linh are active in 2D direction/runtime.
- Backend compatibility recognizes canonical runtime IDs `vo`, `kiem`, `phap`, `co`, `linh`.

### Still requires explicit closure
1. Founder Alpha staging semantics:
   - whether “2 Paths/classes” means only two valid identities;
   - or five valid identities with two combat/content-complete Alpha paths.

Web/Data recommendation for review:
- keep all five canonical identities valid from the data-contract perspective;
- stage Alpha production-complete combat/content separately;
- avoid making schema/API validity depend on temporary release-completeness.

This recommendation is **not applied to Game source from this lane** until Game-side authority confirms it.

2. Supersession register:
   - identify which old class/3D/non-combat documents are historical/reference-only;
   - active docs must not silently contradict Product Bible v2.

3. Map/zone machine-ID authority:
   - distinguish world/region/city/zone/playable-map semantics;
   - preserve current IDs until hierarchy is decided;
   - do not mass-rename assets/tests/runtime strings as a documentation cleanup.
## SYS-02 initial ownership model

The following is safe enough to prepare before Game replies because it follows accepted ADRs/current source boundaries:

| Domain/state | Durable write authority target | Read/consume surfaces | Current state |
|---|---|---|---|
| Player account/credential | Java API + PostgreSQL IAM | Unity, Player Web, Admin read model | JSON prototype |
| Product session/recovery | Java API + PostgreSQL IAM | Unity, Player Web, Admin safe ops | process-memory/session prototype |
| Character identity/ownership | Java API + PostgreSQL player schema | Unity, Player Web, Admin | JSON prototype |
| Realtime movement/combat/presence | realtime server authority | Unity; selected operational read models | realtime/runtime foundation |
| Durable reconnect position | backend/player/world persistence | Unity reconnect; Portal/Admin read | Map01A JSON runtime state |
| Static class/skill/item/map definitions | version-controlled GameData | Java, realtime, Unity, Web labels where exported | partial/legacy registry |
| Scenario/chapter/quest durable progress | progression backend + PostgreSQL | Unity, Portal, Admin read | not yet canonical |
| Inventory/equipment ownership | inventory backend + PostgreSQL | Unity, Portal, Admin read | UI/runtime prototype only |
| Currency/economy | economy backend + immutable ledger in PostgreSQL | Unity/Portal/Admin constrained views | not opened |
| Staff identity/RBAC | staff IAM backend + PostgreSQL ops schema | Admin | not opened |
| Operator audit | append-only audit service/PostgreSQL | Admin audit viewer | not opened |
| Public website content | Web repo/public content system | public browser | separate from player state |

Invariant: **Unity/Portal/Admin never become durable state writers by directly editing storage.** They submit accepted commands to the owning backend.
## SYS-03 initial ID/version/error policy input

### Class IDs
Observed:
- legacy GameData/GDD: `class.sword`, `class.martial`;
- current runtime canonical: `vo`, `kiem`, `phap`, `co`, `linh`.

Safe direction:
- accept legacy values only in compatibility/import boundaries;
- expose canonical runtime/new-write IDs through accepted product contracts;
- localize labels separately;
- never render raw IDs to players.

### Account/character IDs
Preserve current stable public IDs in API compatibility.
Future PostgreSQL internal PKs may use UUIDv7 without forcing public-ID replacement.

### Map/world IDs
No rename is authorized yet.

Proposed hierarchy for review, not yet source authority:
- high-level GameData world/city/content node;
- zone/district if required;
- concrete playable map/instance template;
- runtime instance/channel identity separately.

The key policy is semantic typing, not string cosmetics.

### Version axes
Keep separate:
- database schema/Flyway version;
- GameData version;
- REST contract version/checksum;
- realtime/protobuf contract version;
- application build commit/version.

One global “version” field must not pretend these evolve atomically.

### Error policy
Stable client behavior must branch on machine error code, not controller exception text.
Player-visible Vietnamese copy remains consumer/localization responsibility.
Correlation/request ID links Web/Admin errors to backend logs/audit.
## DB-01 readiness impact

DB-01 physical implementation does **not** need final progression/inventory/economy schemas.
It does need the following architecture gates:

Required before Game-side DB-01 closure:
- PostgreSQL 18 accepted as primary durable relational store;
- pgAdmin 4 accepted as developer/DBA visual management surface;
- environment/secret ownership;
- migration authority will be Flyway;
- app runtime role will not be DB owner;
- local stack must not expose DB/pgAdmin publicly by default.

Can proceed in parallel now in Web/Data lane:
- exact local stack runbook;
- port/volume/secret contract;
- pgAdmin live ERD acceptance procedure;
- evidence checklist;
- expected Game repo file-impact map.

Must wait before DB schema/domain migrations:
- Founder Alpha/class compatibility policy sufficient for IAM/character writes;
- map/zone semantic ownership before persistent world model expands beyond current Map01A compatibility;
- SYS-02/03 authority review.

Therefore DB-01 itself is mostly infrastructure-safe, while DB-03+ schema decisions depend more heavily on SYS-01/02/03.
## Work that continues without waiting for Game response

Dependency-ready Web/Data tasks:
1. `T-9f13d5b84287` — canonical domain ownership/write-authority matrix.
2. `T-e6cbde903e06` — ID/version/error policy draft, with map hierarchy explicitly marked pending Game semantics.
3. `T-365e3e605441` — DB-01 implementation readiness/runbook after the two policy drafts stabilize.
4. `T-9cc142654022` — Web/Admin real-data dependency matrix.
5. `T-ea0c821c8411` — contract intake/OpenAPI consumer readiness.

Game-response-dependent rows are not allowed to block unrelated policy/design work.
## Parked cross-sandbox questions

The following are posted to Umbrella Mission `MS-57a638c72421` as message `MM-c1b133e2fef5`:

- **A — Founder Alpha class staging:** Is the “2 class” wording an identity limit or a production-complete content scope?
- **B — Map IDs:** What is the intended semantic relationship between `map.city.linh_thanh` and `map-01a-cong-dong-lam`, and which source should own stable machine IDs?
- **C — Durable domain authority:** Has progression/inventory/world state acquired a current authoritative persistence path beyond the inspected JSON/Map01A prototype?
- **D — Contract drift during UIF-10:** Report any classId/runtimeClassId/mapId/account/character REST-shape changes immediately.

Status: **WAITING_CROSS_SANDBOX**, but only for those rows. The Web/Data lane continues.
## Evidence / source inventory

Game source read-only:
- `docs/00-VISION.md`
- `docs/02-GDD.md`
- `docs/design/LGO-2D-SOCIAL-ACTION-DIRECTION-LOCK-v0.1.md`
- `docs/design/LGO-MAP-ZONE-MODEL-v1.0.md`
- `server/api/.../CharacterClassCompatibility.java`
- `server/api/.../CharacterRuntimeState.java`
- `gamedata/registry.yaml`

Web/program authority:
- `docs/superpowers/specs/2026-09-18-lgo-system-database-web-admin-architecture-design.md`
- `docs/execution/LGO-DATABASE-SCHEMA-BLUEPRINT-v1.md`
- `docs/execution/LGO-DATABASE-OPERATIONS-AND-EVOLUTION-v1.md`
- `docs/execution/LGO-UNIFIED-IMPLEMENTATION-TASK-CATALOG-v1.md`
- `docs/execution/LGO-UNIFIED-MASTER-ROADMAP-v3.md`

This matrix does not claim that uninspected Game code is absent. It records what the current read-only audit supports and explicitly parks unresolved authority questions.
