# Linh Giới Online — Unified Master Roadmap v3

Date: 2026-09-18
Status: DRAFT FOR OWNER REVIEW
Task authority detail: `LGO-UNIFIED-IMPLEMENTATION-TASK-CATALOG-v1.md`

## North-star delivery model

Every major capability advances through four synchronized lanes:

| Lane | Responsibility |
|---|---|
| Game/Product | scenario, gameplay, GameData, Unity/realtime behavior |
| Data/Backend | PostgreSQL authority, transactions, persistence, API/realtime contract |
| Player Web | companion self-service/read experience |
| Admin/Ops | operator read/action workflow with RBAC/audit |

A lane may design ahead, but it cannot claim a real feature before its authority dependencies exist.
## Milestone M0 — Authority Lock

Tasks: SYS-01..SYS-04.

Outcome:
- Product Bible v2 conflicts resolved;
- canonical domain ownership;
- canonical IDs/version/errors;
- system/database architecture accepted.

Game: scenario/class/map decisions locked.
DB: architecture only.
Web/Admin: existing fixtures frozen as design references.

Exit:
DB-01 has no unresolved product/ownership ambiguity.
## Milestone M1 — Database Development Platform

Tasks: DB-01, DB-02, DB-03.

Outcome:
- PostgreSQL + pgAdmin live local environment;
- Flyway migrations;
- Testcontainers;
- jOOQ generation;
- IAM core schema.

Game: Java server can build/test against real PostgreSQL.
DB: live ERD visible in pgAdmin.
Web/Admin: no real integration yet.

Exit:
fresh database can be created deterministically from Git and inspected visually.
## Milestone M2 — Product Persistence Cutover

Tasks: DB-04..DB-10.

Outcome:
- legacy JSON data migrates safely;
- durable sessions/recovery;
- characters/runtime state in PostgreSQL;
- JSON write authority retired;
- backup/restore, observability and drift gates exist.

Game: current account/character flow preserved across restart.
DB: durable authority accepted.
Web/Admin: contract preparation can begin.

Exit:
PostgreSQL is the only normal durable product state authority for opened domains.
## Milestone M3 — Contract Platform

Tasks: CT-01..CT-05.

Outcome:
- OpenAPI;
- stable error envelope;
- generated TypeScript client;
- Unity compatibility gate;
- shared integration environment.

Game: backend contract is sealed/versioned.
DB: schema version tied to environment manifest.
Web: packages/contracts/api-client become real for accepted domains.
Admin: still read-only fixture until staff contract exists.

Exit:
Java/Unity/Web share the same machine-readable contract version/checksum.
## Milestone M4 — Player Web MVP

Tasks: PWEB-01..PWEB-05 plus XSYS-01.

Outcome:
- approved real-data Portal design;
- BFF/browser session boundary;
- real auth/register/recovery;
- real account/character views;
- durable session management.

Game: same account/character authority used by Unity.
DB: IAM/player schemas support real Portal data.
Web: fixture warnings removed only from opened routes.
Admin: Player 360 design may proceed in parallel.

Exit:
one account/character can be verified consistently in Java, Unity and Portal.
## Milestone M5 — Admin Security & Player 360

Tasks: ADM-01..ADM-05 plus ADM-03/04.

Outcome:
- staff identity/RBAC;
- append-only audit;
- real Player Search/360;
- first safe commands: session revoke / approved unstuck.

Game: exposes only accepted admin read/command contracts.
DB: ops/audit schemas active.
Web Admin: no direct DB access.

Exit:
operator can diagnose and perform one narrow audited action without database credentials.
## Milestone M6 — Authoritative Game Progression Slice

Tasks: GAME-DATA-01, GAME-DATA-02, GAME-DATA-03, PWEB-06/07, XSYS-02/03.

Outcome:
- scenario/progression persists;
- inventory/equipment persists;
- combat reward grants exactly once;
- Unity/Portal/Admin observe the same player state.

Game: tutorial/chapter vertical slice becomes genuinely durable.
DB: progression/inventory schemas active.
Portal: journey/loadout real.
Admin: Player 360 gains progression/inventory read context.

Exit:
combat → reward → reconnect → Web/Admin observation is one coherent authority chain.
## Milestone M7 — Support & Player Operations

Tasks: ADM-06, PWEB-08, XSYS-04.

Outcome:
- player support case authority;
- operator triage/assignment/escalation;
- safe action correlation;
- full audit trail.

Game/Backend: support links to canonical player/character IDs.
Portal: own-case UX.
Admin: real support queue/workflow.

Exit:
one end-to-end support scenario is recoverable, permission-safe and auditable.
## Milestone M8 — World Operations & LiveOps

Tasks: GAME-DATA-04, ADM-07, ADM-08.

Outcome:
- server-owned event state;
- real world/session observation;
- controlled LiveOps draft/approve/publish/rollback.

Game: consumes published server event state.
DB: liveops version/schedule records.
Portal: events may become player-visible companion data.
Admin: author/publisher capabilities separated.

Exit:
event lifecycle can be rehearsed and rolled back with version/audit evidence.
## Milestone M9 — Scale / Security / Recovery

Tasks: DB-11, OPS-01, SEC-01, OPS-02, XSYS-05.

Outcome:
- measured DB/query capacity;
- focused security review;
- expand/contract migration rehearsal;
- whole-system restore drill.

Game/Web/Admin all participate in recovery verification.

Exit:
data recovery, migration compatibility and security risks are measured rather than assumed.
## Milestone M10 — Founder Alpha Readiness

Task: ALPHA-01.

Review:
- Product Bible scope;
- database authority;
- migration/backup/recovery;
- auth/account/character;
- gameplay vertical slice;
- progression/inventory opened scope;
- Player Web opened routes;
- Admin safe operations;
- observability/performance;
- security;
- evidence integrity.

Alpha is blocked by unresolved critical data-loss/security/recovery issues.
## Parallel-development rules

Allowed parallel examples:
- PWEB-01 design while CT contract draft is reviewed;
- ADM-01 design while Player Web is implemented;
- visual/art work in Game when it does not change shared data contracts;
- DB observability work after persistence cutover while Web reads integrate.

Forbidden parallelism:
- two tasks change the same schema contract independently;
- Portal invents fields while backend domain is unresolved;
- Admin opens mutation before RBAC/audit;
- GameData and DB both become writable authority for the same definition;
- destructive migration runs while old consumer compatibility is unknown.
## Continuous design/change rule

Game reality will change during development.

When a new requirement appears:
1. classify it as presentation-only, contract-compatible, schema additive, schema breaking or new domain;
2. update scenario/design first;
3. determine domain owner;
4. update schema/contract through the accepted change process;
5. update Unity/Web/Admin consumers only as required;
6. add migration/compatibility evidence;
7. never preserve a bad schema only because it already exists.

The architecture is stable; individual schemas/content remain evolvable.
## Evidence and storage rule

Each milestone reuses predecessor evidence.
Do not rebuild/repackage everything for every task.

Keep in repo:
- canonical reports/specs;
- compact test logs/metrics;
- representative screenshots;
- evidence manifest.

Keep large immutable evidence in Manager artifact storage or external handoff location.
Never return to multi-gigabyte duplicated browser screenshot trees inside the repo.
## Promotion rule

This roadmap and its task catalog are planning artifacts.

After owner approval:
- promote only the next dependency-ready task;
- write a task-level implementation plan;
- execute it to REVIEW with evidence;
- review/accept before opening the successor.

First implementation candidate after approval:
**DB-01 — Local PostgreSQL + pgAdmin Management Stack**,
but only after SYS-01..SYS-04 are accepted/closed.
