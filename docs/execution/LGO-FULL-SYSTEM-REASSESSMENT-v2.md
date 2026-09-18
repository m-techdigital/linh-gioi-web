# LGO Full System Reassessment v2

Date: 2026-09-18
Status: ASSESSMENT / NO FEATURE IMPLEMENTATION
Scope: Game Client, Java API/realtime, GameData, Player Web Client, Admin/Ops, product roadmap and early-game scenario.
Public Web status: frozen in review; do not reopen optimization work from this assessment.

## 1. Authority snapshots inspected

### Game
- Current remote authority inspected read-only: `origin/feature/2d = 404b89636fe76f6659935f2a099fcb9fc22ef95b`.
- Matching worktree: `.worktrees/character-hub-v22`; HEAD matches remote, with only execution-state docs locally modified at inspection.
- Root `feature/2d` checkout at `efa46a89` is stale/diverged and MUST NOT be used as the cross-project contract baseline.
- A second art/rig worktree `codex/feature-2d-latest` is active WIP and is not contract authority.

### Web
- `main = origin/main = dd578ac14cf6228d78ca1d46b012d7f71e6b7933`.
- Public Web optimization backlog v1.277 is closed through WEB-OPT-23 v1.300.
- Player Portal and Ops/Admin remain fixture-oriented behind `NO_ACCEPTED_BACKEND_CONTRACT`.
## 2. What is already real in the Game system

The Game backend is materially ahead of the older WEB-08 intake snapshot.

Product REST auth currently includes:
- `POST /auth/register`;
- `POST /auth/login`;
- `GET /auth/session`;
- `POST /auth/logout`;
- recovery request / verify / reset endpoints;
- Bearer-token session validation.

Player/character REST currently includes:
- `GET /auth/characters`;
- `GET /auth/characters/{characterId}`;
- `POST /auth/characters/{characterId}/map01a-state`;
- legacy/dev account-character endpoints remain available separately.

Current character persistence schema is v4 and preserves backward migration.
`CharacterClassCompatibility` now accepts canonical runtime IDs `vo/kiem/phap/co/linh` while mapping legacy `class.martial -> vo` and `class.sword -> kiem`.

Map01A runtime persistence has a stable product response shape with:
- stored class id;
- `runtimeClassId`;
- runtime `mapId/laneX/facing/updatedAt`;
- stable account and character ownership checks.
## 3. What is still prototype / not production authority

Auth/player persistence is still local-file oriented:
- player profiles use JSON file persistence;
- product credential store uses JSON file persistence;
- auth sessions live in an in-memory `ConcurrentHashMap`;
- recovery challenge state is process-local;
- SMTP recovery delivery is configurable but does not make the whole auth stack production-ready.

No accepted REST/admin contract was found for:
- inventory/equipment ownership;
- skill/progression/quest state;
- social graph, friends, party or guild;
- support cases;
- moderation;
- RBAC/permissions;
- audit events;
- LiveOps/event mutation;
- world/channel/session operations;
- economy/currency/marketplace.

Realtime Netty/protobuf and server-authoritative combat foundations exist, but they are not yet a complete production gameplay authority.

Therefore WEB-08 is no longer correctly described as “there is no real auth/account API”, but it remains correctly blocked on a **sealed, owner-approved cross-project contract package**.
## 4. Unity/Game product reality

Current product direction is a 2D Side-Scrolling Social Action MMORPG:
- HD 2D anime/illustrated presentation, not pixel-art;
- side-view, parallax multi-layer maps;
- fast movement with walk/run/jump/dash/skill;
- Linh Thành as social hub;
- Zone Network rather than one continuous open world;
- Social MMORPG + Action + Progression as the three product pillars.

The current opening slice is coherent around:
Login -> Character Select -> Enter World -> Đông Môn -> Gate Keeper -> Training -> movement/jump/dash -> class skill -> Shadow Slime -> return -> Linh Thành/Quảng Trường.

The latest Game branch also contains substantial runtime UI/mobile scale, HUD, Character Hub and five-class presentation work.
This assessment treats those as Game-side source authority, not as evidence that all product systems already have server contracts.
## 5. Design conflicts that must be resolved before expansion

### C1 — Shadow Slime tutorial meaning
- GDD and 2D Scenario Production Spine require the tutorial to use a class skill against Shadow Slime.
- Current runtime already follows that combat route.
- `Early Game Scenario Bible v0.1` SCN-004 instead says Shadow Slime is only an ambient warning with no combat/HP/objective.

Recommendation: do not keep both as equal authority.
Adopt the GDD/Scenario Spine combat tutorial as the canonical tutorial flow; if the non-combat “Dấu vết Âm Khí” scene is valuable, give it a separate scenario/content ID instead of reusing Shadow Slime SCN-004.

### C2 — class identifiers
- Product/runtime now uses Võ/Kiếm/Pháp/Cơ/Linh.
- Backend v4 compatibility already supports all five.
- Legacy IDs still exist for migration.

Recommendation: canonical persisted/runtime class vocabulary should be `vo/kiem/phap/co/linh`; legacy class IDs are migration inputs only and must not leak into Player Web/Admin UI.

### C3 — historical Founder Alpha scope
Older GDD text still describes only Sword/Martial for Founder Alpha while the current product direction is five paths.
This needs an explicit Product Bible v2 decision rather than silent interpretation.
## 6. Web system reality

### Public Web
Public marketing/content is mature enough for now and is frozen in review.

### Player Portal
Existing routes already cover the correct first product areas:
- access/login/register/recovery;
- account;
- security and sessions;
- characters and character detail;
- support;
- journey/home.

The problem is not missing screens. The problem is that data and controls are intentionally fixtures.

### Ops/Admin
Existing routes already cover the right operational families:
- Player Operations;
- Support/Triage;
- Audit;
- Game Operations;
- Control Center;
- Trust & Safety;
- Security Governance;
- Content & LiveOps.

Again, the missing layer is authoritative API/RBAC/audit/command contracts, not more mock screens.
## 7. Target domain ownership

| Domain | Canonical owner | Unity | Player Web | Admin |
|---|---|---|---|---|
| Identity / account | Java API | consume | self-service | read/support |
| Auth/session | Java API security | consume token/session | BFF adapter | separate staff auth |
| Character | Java API + GameData IDs | gameplay | read/profile | Player 360 |
| World/zone state | game server | realtime/REST | summarized | observe/control |
| Combat | realtime server | predict/present | summary only | observe/support |
| Progression/quest | backend + GameData | consume | read | inspect |
| Inventory/equipment | backend + GameData | consume | read/manage when allowed | inspect/grant only by permission |
| Social | backend realtime/domain | full UX | companion UX | moderation |
| LiveOps | backend config/event service | consume | event views | author/publish |
| Support | support domain | deep link | create/read | triage |
| RBAC | admin identity | none | none | mandatory |
| Audit | append-only backend | none | limited account events | mandatory |

Rule: Portal and Admin must never define canonical player DTOs independently from Game/backend contracts.
## 8. Target cross-project architecture

```text
Unity Client
   | REST: auth/profile/character/inventory/progression
   | Realtime: movement/combat/presence/chat/event
   v
Java API + Realtime Authority
   |
   +-- canonical domain models / persistence
   +-- GameData references
   +-- audit/event stream
   +-- RBAC/admin commands
   |
   +--> Player Web BFF/adapter --> Portal UI
   |
   +--> Admin BFF/adapter ------> Ops UI
```

The Web BFF layer is a transport/security adapter only:
- no duplicate canonical persistence;
- no app-local authoritative DTOs;
- browser tokens stay out of localStorage;
- player and staff authentication remain separate security domains.

Unity may continue using bearer-style product sessions, while Portal should terminate browser auth through HttpOnly/SameSite cookie handling at its server boundary.
## 9. Contract Pack required to unblock WEB-08

The cross-project contract pack should contain, at minimum:

1. sealed Game backend commit + API version;
2. OpenAPI (or equivalent generated schema) for REST;
3. protobuf version for realtime;
4. canonical IDs and enum policy;
5. account/session lifecycle and expiry semantics;
6. stable error envelope + reason codes;
7. authorization rules by endpoint;
8. player-domain ownership rules;
9. admin RBAC capability matrix;
10. audit-event envelope;
11. idempotency requirements for mutations;
12. environment/base URL and test-account procedure;
13. migration/backward compatibility rules;
14. contract generation/checksum process.

WEB-08 should be redefined as **Contract Intake & Generated Client Sync**, not hand-written DTO implementation.
## 10. External reference findings

External references are design comparisons, not LGO authority.

- Guild Wars 2 API v2 separates public resources from authenticated account/character/inventory/progression scopes. This supports LGO using capability-scoped player APIs rather than one giant “player blob”.
- Final Fantasy XIV Lodestone exposes character/community/free-company discovery outside the game client. This supports a companion Player Web product rather than trying to reproduce Unity gameplay in the browser.
- PlayFab Player Data separates client-writable, server read-only and internal data. This is a useful authority model for deciding what LGO clients may mutate.
- PlayFab Game Manager uses fine-grained roles and audit history for operational actions. LGO Admin should adopt capability-based authorization and auditable mutations.
- Nakama Console groups player accounts, storage, groups, chat moderation, matches, notifications and API exploration under an operational console, with restricted console roles. This maps closely to LGO Ops domains.
- Amazon GameLift monitoring separates system health, game-server telemetry, sessions and CloudTrail/API audit. LGO should similarly separate player/game state from infrastructure observability.

Official references researched:
- https://wiki.guildwars2.com/wiki/API:2
- https://na.finalfantasyxiv.com/lodestone/community/
- https://learn.microsoft.com/en-us/gaming/playfab/player-progression/player-data/
- https://learn.microsoft.com/en-us/gaming/playfab/identity/dev-identity/permissions/playfab-user-roles
- https://learn.microsoft.com/en-us/gaming/playfab/live-service-management/gamemanager/audit-logs
- https://heroiclabs.com/docs/nakama/getting-started/console/
- https://docs.aws.amazon.com/gameliftservers/latest/developerguide/monitoring-overview.html
## 11. Reassessment verdict

Do not restart Portal/Admin UI.
Do not reopen Public Web optimization.
Do not replace the Java backend with PlayFab/Nakama.

The shortest path to a coherent product is:
1. resolve Product Bible/scenario/class authority;
2. seal one Game backend baseline;
3. productionize persistence/session foundations enough for integration;
4. publish the Contract Pack;
5. real-integrate Portal read paths;
6. build Admin read paths + RBAC/audit;
7. expand gameplay domains one vertical slice at a time.

The next artifact in this same assessment is the unified Master Roadmap v2.
