# Linh Giới Online — Unified Master Roadmap v2

Date: 2026-09-18
Status: ROADMAP DRAFT / NO IMPLEMENTATION AUTHORITY
Depends on: `LGO-FULL-SYSTEM-REASSESSMENT-v2.md`
Scope: Unity Game, Java API/realtime, GameData, Player Web Client, Admin/Ops.
Public Web: frozen; excluded unless a later product decision reopens it.

## Roadmap principle

One milestone is not complete because one repository looks finished.
A milestone closes only when all authoritative participants required by that slice agree on:
- data ownership;
- contract version;
- source implementation;
- runtime behavior;
- evidence;
- migration/rollback boundaries.

Default dependency flow:

```text
Product decision
  -> Game/backend domain authority
  -> Contract
  -> Unity integration
  -> Player Web integration
  -> Admin integration
  -> E2E evidence
```
## R0 — Authority Reset & Product Bible v2

Goal: eliminate conflicting design/source authorities before adding systems.

Must decide:
- canonical five-class vocabulary and legacy migration policy;
- Founder Alpha class scope;
- canonical early-game scenario order;
- Shadow Slime combat vs ambient-warning conflict;
- Zone Network naming and stable map IDs;
- what “Vertical Slice complete” means across repos.

Outputs:
- Product Bible v2;
- scenario authority matrix;
- ID/terminology register;
- superseded-document register;
- sealed Game contract baseline commit.

Exit gate:
No new Portal/Admin real integration before R0 is accepted.
## R1 — Backend Persistence & Session Foundation

Goal: turn the current working product auth/player prototype into an integration-safe authority.

Current reusable base:
- product register/login/recovery/session/logout;
- product character list/detail;
- five-class compatibility;
- Map01A runtime state;
- JSON persistence v4;
- in-memory bearer sessions.

Required work:
- production persistence choice and migration plan;
- transactional account/credential/character storage;
- durable session/revocation policy;
- password/recovery security review;
- environment configuration and secret handling;
- stable error envelope;
- API versioning.

Non-goals:
inventory, economy and social mutations do not enter this phase.

Exit gate:
restart/redeploy must not silently lose valid product session/account state under the chosen production contract.
## R2 — Contract Platform / WEB-08 Reframe

Goal: create the one contract pack consumed by Unity, Portal and Admin.

Deliverables:
- REST OpenAPI schema;
- protobuf/realtime version manifest;
- generated TypeScript client package;
- generated/validated C# REST models where useful;
- canonical ID policy;
- auth/session/error semantics;
- version/checksum metadata;
- integration environment procedure;
- contract compatibility tests.

Web changes:
- replace `NO_ACCEPTED_BACKEND_CONTRACT` only for domains actually accepted;
- keep fixtures for every unopened domain.

Exit gate:
no manually duplicated DTO between Java, Portal and Ops for accepted domains.
## R3 — Player Web Client MVP: Auth + Character

Goal: make the existing Portal useful with real player data without pretending the full MMO backend exists.

Scope:
- register/login/logout/recovery;
- account identity;
- current session expiry;
- character list;
- character detail;
- five-class labels;
- current map/runtime-state summary;
- truthful unavailable states for unopened features.

Architecture:
- Next.js server/BFF adapter handles browser session safely;
- Java API remains canonical authority;
- no localStorage bearer-token dependency;
- no Portal-owned database.

Definition of done:
1. create/login account through Web;
2. same account appears in Unity login flow;
3. character list is identical in Unity and Portal;
4. raw legacy class IDs never appear in player UI;
5. auth failure/expiry/logout behavior is consistent.
## R4 — Admin Foundation: Staff Identity + RBAC + Audit

Goal: build the security substrate before enabling any real Ops mutation.

Scope:
- separate staff identity from player auth;
- capabilities such as `player.read`, `session.read`, `support.read`, `audit.read`;
- role assignment;
- append-only audit envelope;
- actor, time, action, target, reason, request/correlation id;
- read-only audit UI.

Reference rule:
copy the principle of PlayFab/Nakama fine-grained operator access, not their product-specific permission names.

Exit gate:
Admin must be useful in read-only mode before any destructive command exists.
## R5 — Admin Read Model MVP / Player 360

Goal: replace existing Ops fixtures with real read-only operational data.

Scope:
- account lookup;
- character lookup;
- session state;
- class/map/last-known runtime state;
- registration/account timestamps;
- auth/recovery activity summary where safe;
- correlation to support/audit records.

Existing UI to reuse:
- Player Operations;
- Control Center;
- Audit;
- shared DataTable/CaseSummary/ActivityTimeline.

No mutation yet.

Definition of done:
an operator can locate the same account/character seen in Unity and Portal and trace its canonical IDs without database access.
## R6 — Game Vertical Slice Authority

Goal: make the first game slice authoritative end to end.

Canonical flow:
Login
-> Character Select
-> Enter World
-> Đông Môn
-> Gate Keeper
-> movement/jump/dash
-> class skill
-> Shadow Slime
-> return
-> Linh Thành/Quảng Trường unlock.

Server/contract requirements:
- character ownership;
- map/zone identity;
- scenario progress;
- authoritative combat acceptance/result for the slice;
- reward decision;
- persistence/reconnect semantics.

Web/Admin observation:
- Portal can show current chapter/map/progress summary;
- Admin can inspect the state and relevant audit/correlation data.

Exit gate:
reconnect and cross-client observation must agree on the same character state.
## R7 — Progression + Inventory + Equipment

Goal: open the first persistent build loop.

Backend first:
- item instance/stack ownership;
- equipment slots;
- cosmetic vs power ownership;
- inventory capacity;
- equip/unequip commands;
- skill/progression state;
- migration and idempotency.

Unity:
- inventory/equipment UI consumes authoritative state;
- modular 2D appearance binds to equipped/cosmetic IDs;
- preview remains temporary until server accepts apply.

Portal:
- read inventory/equipment;
- character loadout summary;
- cosmetic collection only when contract exists.

Admin:
- inspect inventory/loadout;
- no grant/remove until mutation policy/audit is accepted.
## R8 — Support + Safe Admin Mutations

Goal: enable the first privileged operator actions with strong safety.

Support:
- player-created support case;
- case state/history;
- account/character linkage;
- privacy-aware attachments only if explicitly designed.

Initial safe mutations:
- force logout/session revoke;
- unstuck/reset position to approved checkpoint;
- support assignment/escalation.

Every mutation requires:
- capability permission;
- reason;
- confirmation;
- idempotency key;
- audit event;
- stable result/error contract.

Avoid item grants, bans, currency edits and world restarts until later permissions are approved.
## R9 — Social Foundation

Goal: make “Social MMORPG” real rather than decorative.

Backend/realtime:
- presence;
- nearby/player identity;
- chat;
- friend request/list;
- party;
- guild-lite.

Unity:
- social hub interactions in Linh Thành;
- chat/friend/party UX.

Portal:
- profile;
- friends;
- guild/community discovery where privacy policy allows.

Admin:
- player/social lookup;
- chat moderation/read permissions separated from general player support.
## R10 — LiveOps & World Operations

Goal: turn current Ops Game Operations / Content & LiveOps fixtures into real operational tools.

Backend:
- event definition/version;
- schedule;
- environment targeting;
- publish/rollback;
- world/channel/session observation;
- event state machine.

Admin:
- preview before publish;
- staged rollout;
- publish permission separated from author permission;
- rollback with reason;
- full audit.

Unity/Portal:
- consume event state;
- no client-owned countdown truth.

Infrastructure observability is separate from player/game state.
## R11 — Economy / Marketplace

Goal: open economic systems only after account, inventory, audit and idempotent mutation foundations are stable.

Required authority:
- currency ledger;
- source/sink reason codes;
- item tradeability;
- escrow;
- marketplace order lifecycle;
- anti-duplication/idempotency;
- rollback/reconciliation.

Admin:
- read ledger;
- narrowly scoped corrective operations;
- no arbitrary “edit balance” textbox.

This phase is intentionally late.
## R12 — Founder Alpha Readiness

Goal: one coherent playable/social/operable product.

Game:
- Founder Alpha content scope accepted;
- production-quality first zones and class slices;
- reconnect/recovery paths;
- performance and physical-device gates.

Backend:
- DB backup/restore;
- migration rehearsal;
- rate limits;
- security review;
- observability;
- incident runbooks.

Portal:
- account/character/support/community companion experience.

Admin:
- Player 360;
- support;
- RBAC/audit;
- game/session observation;
- approved LiveOps workflows.

Release gate:
no Alpha claim from screenshots alone; require end-to-end runtime, recovery and operator evidence.
## Cross-system vertical slices

### Slice A — Account / Character
Player registers -> logs in -> creates/owns character -> Unity selects it -> Portal sees it -> Admin finds it.

### Slice B — World State
Character enters Map01A -> position/progress persists -> reconnect restores -> Portal shows current zone -> Admin inspects state.

### Slice C — Combat / Reward
Player completes authoritative combat -> reward transaction persists -> inventory changes -> Portal loadout reflects it -> Admin audit can explain it.

### Slice D — Support
Player opens support case -> Portal tracks it -> Admin triages -> safe mutation if needed -> audit records every action.

### Slice E — Social / Event
Player joins social activity -> realtime state is server-owned -> Portal surfaces companion information -> Admin observes/moderates -> LiveOps event state is auditable.

Rule: prefer finishing one vertical slice across required systems over implementing five disconnected screens.
## Web Client product map

Phase-appropriate final navigation:

- Home
- Nhân vật
- Hành trang & Trang bị
- Tiến trình
- Bạn bè / Bang hội
- Sự kiện
- Hỗ trợ
- Tài khoản & Bảo mật

Not every item is enabled at R3.
Routes appear only when the backing contract exists.

Public Web remains separate:
marketing, guides, news, status, release communication.
## Admin product map

- Control Center
- Player Operations / Player 360
- Sessions
- Support / Triage
- Trust & Safety
- Audit
- Game / World Operations
- Content & LiveOps
- Economy (later)
- System Health / Observability

Admin is not a generic CRUD generator.
Every page must answer an operator question or support a controlled command.
## Contract/versioning rules

1. Java/backend source is domain authority.
2. GameData owns stable gameplay content IDs, not account/session truth.
3. REST contracts are versioned and generated into Web clients.
4. Realtime protobuf remains explicit and backward-compatible by policy.
5. Error reason codes are stable and machine-consumable.
6. New enum/ID values require compatibility tests.
7. Admin commands require idempotency and audit.
8. Portal/Admin may add view models but never canonical domain DTOs.
9. Fixture data cannot be promoted silently into production contracts.
10. Contract changes close only with Unity + Web consumer verification where applicable.
## Immediate assessment deliverables before implementation

A. Product Bible v2 decision register.
B. Canonical Domain Map v1.
C. Game REST endpoint inventory from `404b8963`.
D. Contract Gap Matrix against Portal/Ops routes.
E. WEB-08 v2 contract intake specification.
F. Player Web R3 implementation plan.
G. Admin R4/R5 implementation plan.
H. Cross-system E2E test plan.

These are planning outputs of the current reassessment.
They are not separate implementation tasks until explicitly promoted.
## Current stop line

Do not:
- reopen Public Web optimization;
- redesign Portal/Admin from scratch;
- add a second backend;
- hand-write Web DTOs around fixture shapes;
- open economy/social/liveops mutations before their domain gates;
- modify the dirty Game worktrees from this Web assessment session.

The next allowed step inside this assessment is to produce the **Contract Gap Matrix + Domain Map** from the snapshots already inspected.
