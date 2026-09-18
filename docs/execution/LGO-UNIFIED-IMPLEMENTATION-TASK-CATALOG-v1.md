# LGO Unified Implementation Task Catalog v1

Date: 2026-09-18
Status: PROGRAM BACKLOG FOR OWNER REVIEW — NOT YET PROMOTED
Authority: `2026-09-18-lgo-system-database-web-admin-architecture-design.md`

## Global execution rules

Every task:
1. begins from exact current source and accepted predecessor evidence;
2. has a scenario/design before implementation;
3. defines domain owner and write authority;
4. uses RED→GREEN where behavior changes;
5. runs only relevant expensive suites after source stabilizes;
6. records compact immutable evidence;
7. commits and normal-pushes only after exact-source verification;
8. ends in REVIEW, never silently opens its successor;
9. does not claim another domain is ready just because UI/source exists.

Database-changing tasks additionally follow `LGO-DATABASE-OPERATIONS-AND-EVOLUTION-v1.md`.
## Evidence minimum for every task

Required:
- BEFORE/current-state record;
- exact base commit;
- accepted spec/design path;
- changed-file list;
- focused tests;
- integration/runtime evidence appropriate to the task;
- failure/negative-path evidence;
- exact final commit;
- remote-equal verification;
- immutable evidence registration;
- concise final report.

Additional by type:
- DB: Flyway info/validate, fresh+upgrade DB tests, ERD/schema evidence;
- API: contract examples, auth/permission negative tests;
- Unity: Player/runtime evidence where player-visible;
- Web/Admin: desktop/mobile screenshots and browser E2E;
- destructive/sensitive: rollback/recovery rehearsal.
# WAVE 0 — PRODUCT / AUTHORITY LOCK

## SYS-01 — Product Bible v2 Conflict Closure

Owner: Product/Game design.
Goal: resolve the remaining authority conflicts before database contracts harden them.

Scope:
- Founder Alpha five-class staging decision;
- Shadow Slime combat vs ambient-warning conflict;
- stable machine world/map ID policy;
- canonical five-class new-write IDs;
- onboarding sequence authority;
- document supersession map.

Dependencies: none beyond current reassessment.

Acceptance:
- one canonical decision per conflict;
- no two active docs claim contradictory tutorial/class/map semantics;
- legacy IDs are explicitly migration-only where applicable;
- Game/Web roadmaps reference the same decision set.

Evidence:
- decision register before/after;
- superseded-doc list;
- source search showing conflicting active markers removed/qualified;
- owner acceptance record.
## SYS-02 — Canonical Domain Ownership Map

Owner: Architecture.
Goal: define exactly which module owns each durable state and command.

Scope:
IAM, Character, World, Combat, Progression, Inventory, Social, Support, LiveOps, Economy, Staff IAM, Audit.

Acceptance:
- every domain has read/write authority;
- Unity/Portal/Admin responsibilities are explicit;
- no durable state has two writers;
- GameData vs PostgreSQL ownership is explicit;
- cross-domain dependencies are directional and documented.

Evidence:
- domain map;
- write-authority matrix;
- at least one example command/data flow per domain;
- review checklist with no unresolved duplicate owner.
## SYS-03 — Canonical ID, Version & Error Policy

Owner: Architecture/API.
Goal: prevent ID and contract drift across Java, Unity and Web.

Scope:
- internal UUIDv7 vs public IDs;
- realtime entity IDs;
- class IDs;
- world/map/zone IDs;
- API version;
- GameData version;
- correlation/request IDs;
- stable error-code naming.

Acceptance:
- examples for account/character/map/class/error;
- legacy compatibility rules;
- no raw legacy class ID in player-facing UI contract;
- machine-readable error-code registry format chosen.

Evidence:
- ID/version/error policy doc;
- validation examples;
- grep/audit of current conflicting IDs;
- compatibility matrix.
## SYS-04 — System Architecture & Database Design Acceptance

Owner: Architecture/Product.
Goal: formally accept or revise the PostgreSQL/Flyway/jOOQ/pgAdmin/Testcontainers design.

Acceptance:
- database technology stack accepted;
- schema ownership accepted;
- migration/change policy accepted;
- Player Web BFF and Admin separation accepted;
- evidence/retention policy accepted;
- no implementation ambiguity remains for DB-01.

Evidence:
- accepted design spec revision;
- owner review notes resolved;
- exact first implementation task boundary.
# WAVE 1 — DATABASE PLATFORM

## DB-01 — Local PostgreSQL + pgAdmin Management Stack

Owner repo: Game / infra.
Goal: create the first real database environment with visual management.

Dependencies: SYS-04 accepted architecture.

Scope:
- pinned PostgreSQL 18;
- pinned pgAdmin 4;
- persistent local volumes;
- private localhost access;
- ignored local credentials;
- documented one-command start/stop/status;
- local recovery-mail sink if needed.

Acceptance:
- clean machine can start stack;
- pgAdmin opens and connects;
- user can browse database and run Query Tool;
- database-level ERD can be generated from the live DB;
- stop/restart preserves local DB volume;
- no secret committed.

Evidence:
- compose/config diff;
- container health/status;
- pgAdmin screenshot: object tree + live ERD;
- connectivity log;
- restart persistence proof;
- secret scan.
## DB-02 — Flyway + Testcontainers + jOOQ Build Spine

Owner repo: Game / server.
Goal: make schema creation, validation and typed SQL generation deterministic.

Scope:
- Flyway dependency/config;
- migration folder/convention;
- PostgreSQL Testcontainers;
- jOOQ codegen from migrated schema;
- Maven lifecycle integration;
- no production tables beyond minimal bootstrap metadata if DB-03 owns them.

Dependencies: DB-01.

Acceptance:
- empty Testcontainer migrates successfully;
- Flyway schema-history exists;
- `flyway validate` passes;
- jOOQ generated types compile;
- second run is idempotent;
- deliberate checksum mutation causes validation failure.

Evidence:
- RED checksum/absent-spine test;
- GREEN Maven logs;
- Flyway info/validate;
- generated-code manifest;
- clean rebuild evidence.
## DB-03 — IAM Core Relational Schema

Owner repo: Game / server-api.
Goal: replace JSON-shape assumptions with a normalized IAM relational contract.

Scope:
- iam.accounts;
- iam.account_identifiers;
- iam.credentials;
- constraints/indexes;
- roles/grants required for runtime/migrator;
- no session migration yet.

Dependencies: DB-02, SYS-03.

Acceptance:
- unique normalized identifier guaranteed by DB;
- raw password/token cannot be stored by schema path;
- current BCrypt hashes can be represented;
- account public IDs preserved;
- fresh and previous-schema upgrade tests pass;
- pgAdmin ERD displays expected relationships.

Evidence:
- migration SQL;
- ERD;
- constraint negative tests;
- Flyway validate;
- Testcontainers logs;
- query/index rationale.
## DB-04 — Legacy JSON Account/Credential Migration

Owner repo: Game / server-api.
Goal: migrate current accepted JSON persistence into PostgreSQL without breaking existing dev/product accounts.

Scope:
- import `players-v4.json`;
- import `auth-credentials-v1.json`;
- legacy/public ID preservation;
- deterministic conflict/failure rules;
- rollback leaves source JSON untouched;
- migration/import report.

Dependencies: DB-03.

Acceptance:
- representative v1/v2/v3/v4 legacy fixtures reach same product-visible account data;
- duplicate/corrupt input fails closed;
- no plaintext dev key/password introduced;
- rerun is idempotent or explicitly rejected safely;
- parity API tests pass.

Evidence:
- BEFORE fixture hashes;
- importer report;
- row counts/checksums;
- API parity JSON;
- negative migration cases;
- retained-source proof.
## DB-05 — Durable Auth Sessions & Recovery

Owner repo: Game / server-api.
Goal: remove restart-loss from product sessions/recovery.

Scope:
- iam.auth_sessions;
- iam.recovery_challenges/grants;
- hashed tokens/codes;
- expiry/revocation;
- multi-session metadata foundation;
- recovery attempt/cooldown persistence.

Dependencies: DB-03/04.

Acceptance:
- valid session survives API restart;
- logout/revoke invalidates exact session;
- password reset invalidates all account sessions per accepted policy;
- expired/revoked tokens reject consistently;
- recovery attempt limits survive restart;
- enumeration-safe behavior retained.

Evidence:
- restart integration tests;
- DB rows inspected through pgAdmin;
- auth negative matrix;
- Flyway/test logs;
- security field audit.
## DB-06 — Character & Runtime-State PostgreSQL Migration

Owner repo: Game / server-api.
Goal: move character ownership and Map01A runtime state into relational authority.

Scope:
- player.characters;
- player.character_runtime_state;
- three-slot invariant;
- canonical five-class IDs;
- legacy class mapping;
- public ID/entity ID preservation;
- optimistic version field.

Dependencies: DB-03/04, SYS-03.

Acceptance:
- current product character API behavior preserved;
- account isolation preserved;
- slot uniqueness enforced by DB;
- all five canonical classes round-trip;
- legacy `class.sword/class.martial` read compatibility passes;
- Map01A state survives restart and reconnect.

Evidence:
- migration + ERD;
- current API golden samples before/after;
- class compatibility tests;
- restart persistence test;
- query/index evidence.
## DB-07 — JSON Persistence Retirement & Repository Cutover

Owner repo: Game / server-api.
Goal: make PostgreSQL the default authority without deleting rollback provenance prematurely.

Scope:
- Postgres repository implementations;
- configuration/profile switch;
- JSON stores moved to explicit legacy/import-only path;
- dual-authority paths removed;
- startup fail-closed when DB required but unavailable.

Dependencies: DB-04/05/06.

Acceptance:
- normal product profile performs no durable write to JSON;
- database outage does not silently fall back to JSON;
- legacy importer remains separately callable/tested;
- full auth/character focused suite passes against PostgreSQL;
- no parallel DTO/repository authority.

Evidence:
- filesystem write audit;
- database outage negative test;
- repository selection tests;
- source scan for legacy write path;
- Postgres integration logs.
## DB-08 — Backup, Restore & Recovery Rehearsal

Owner: Infra/DB.
Goal: prove data can be restored before Alpha.

Scope:
- local/integration pg_dump/pg_restore;
- documented production PITR approach;
- restore into separate DB;
- schema + representative account/character/session data verification;
- backup retention configuration draft.

Dependencies: DB-07.

Acceptance:
- backup created;
- independent restore succeeds;
- restored application passes auth/character smoke;
- restore does not overwrite source DB;
- actual restore duration recorded;
- proposed RPO/RTO presented for owner acceptance.

Evidence:
- backup manifest/checksum;
- restore logs;
- row/invariant checks;
- smoke results;
- timing report.
## DB-09 — Database Observability & Query Budget Baseline

Owner: Backend/Infra.
Goal: make database performance measurable before data volume grows.

Scope:
- pg_stat_statements enablement;
- connection pool metrics;
- baseline key queries;
- EXPLAIN evidence;
- slow-query threshold policy;
- database size/index report.

Dependencies: DB-07.

Acceptance:
- account login/identifier lookup, roster, character detail and session validation queries are identifiable;
- query plans use intended indexes;
- baseline timings/row counts recorded;
- no N+1 regression in current API read flows;
- dashboard/report can be regenerated.

Evidence:
- pg_stat_statements extract;
- EXPLAIN plans;
- query budget report;
- focused load sample;
- index inventory.
## DB-10 — Schema Drift & Change-Control Gate

Owner: DB/CI.
Goal: prevent manual drift as continuous development accelerates.

Scope:
- Flyway validate in CI;
- fresh DB rebuild gate;
- migration checksum guard;
- pgAdmin Schema Diff review procedure;
- migration class metadata/checklist;
- expand/contract validator/checklist.

Dependencies: DB-02 through DB-07.

Acceptance:
- edited applied migration fails CI;
- out-of-band schema drift is detected in test/rehearsal;
- clean rebuild reaches exact expected version;
- destructive migration cannot pass checklist without compatibility/recovery fields.

Evidence:
- deliberate RED drift fixture;
- GREEN CI output;
- schema version/checksum report;
- reviewed change template.

## DB-11 — Production Database Topology & HA Decision

Owner: Architecture/Infra/DB.
Goal: select the production PostgreSQL deployment topology before Alpha infrastructure hardens.

Scope:
- managed PostgreSQL vs self-hosted comparison;
- network/private access;
- TLS;
- primary/standby/HA policy;
- backup/PITR;
- connection limits/pooling;
- storage growth;
- staging parity;
- operational ownership and cost envelope.

Dependencies: DB-08/09 and measured current workload.

Acceptance:
- one deployment model selected with explicit tradeoffs;
- RPO/RTO targets owner-approved;
- backup/PITR and failover responsibilities assigned;
- staging topology is representative enough for migration/recovery rehearsal;
- no production database is exposed publicly by default;
- fallback/self-hosting obligations documented if managed service is not used.

Evidence:
- architecture decision record;
- topology/network diagram;
- capacity/cost baseline;
- backup/restore/failover rehearsal plan;
- owner acceptance.
# WAVE 2 — CONTRACT PLATFORM

## CT-01 — REST OpenAPI Baseline

Owner repo: Game / server-api.
Goal: publish the accepted product REST surface as a machine-readable contract.

Scope:
- product auth;
- recovery;
- session;
- product characters;
- Map01A state where appropriate;
- exclude dev/legacy endpoints from player Web contract.

Dependencies: DB-05/06/07, SYS-03.

Acceptance:
- OpenAPI schema generated/maintained from canonical backend source;
- request/response examples parse;
- ownership/auth requirements documented;
- legacy/dev endpoints marked internal or excluded;
- contract version/checksum generated.

Evidence:
- OpenAPI artifact;
- schema validation;
- endpoint inventory diff;
- example request/response tests;
- checksum manifest.
## CT-02 — Stable Error Envelope & Reason Codes

Owner repo: Game / server-api.
Goal: replace controller-message interpretation with stable client semantics.

Scope:
- canonical error envelope;
- request/correlation ID;
- auth/recovery/character codes;
- player-safe messages;
- negative-path mapping.

Dependencies: CT-01.

Acceptance:
- every accepted Portal endpoint returns stable code on defined failure paths;
- account enumeration remains protected;
- no consumer branches on free-text exception message;
- request ID visible in logs and response.

Evidence:
- error registry;
- negative endpoint matrix;
- golden JSON;
- source scan for consumer message parsing.
## CT-03 — Generated TypeScript Contract & API Client

Owner repo: Web / packages/contracts + api-client.
Goal: consume Game contract without hand-written canonical DTOs.

Scope:
- deterministic generation;
- generated types;
- server-side HTTP transport;
- contract checksum/version;
- no UI integration yet.

Dependencies: CT-01/02.

Acceptance:
- generation from same OpenAPI yields byte-stable output;
- TypeScript compile passes;
- fixture DTOs are not used as canonical contract types;
- generated client handles error envelope;
- package exposes version/checksum.

Evidence:
- generation command/log;
- generated manifest;
- repeat-generation diff=0;
- typecheck;
- sample integration against test API.
## CT-04 — Unity REST Contract Compatibility Gate

Owner repo: Game / Unity + server.
Goal: prevent Web contract work from silently breaking existing Unity product account/character flow.

Scope:
- accepted REST samples/compat tests;
- Unity product auth parsing;
- character response runtimeClassId/runtimeState;
- stable endpoint behavior.

Dependencies: CT-01/02.

Acceptance:
- Unity focused account/character tests pass against accepted contract;
- server and Unity agree on contract version;
- new fields remain backward-compatible by policy;
- removed/renamed fields require explicit migration task.

Evidence:
- Unity EditMode contract tests;
- server contract tests;
- sample JSON hash;
- compatibility report.
## CT-05 — Shared Integration Environment & Test Accounts

Owner: Backend/Infra.
Goal: give Unity/Web/Admin one safe real environment for contract verification.

Scope:
- integration API base URL/config;
- PostgreSQL integration DB;
- deterministic seed/test-account procedure;
- reset strategy;
- no production credentials/data.

Dependencies: DB-07, CT-01/02.

Acceptance:
- repeatable environment bootstrap;
- test account creation/reset documented;
- Portal generated client reaches API;
- Unity reaches same account/character data;
- environment version and DB schema version queryable.

Evidence:
- environment manifest;
- smoke logs;
- test-account procedure;
- shared account/character parity proof.
# WAVE 3 — PLAYER WEB CLIENT

## PWEB-01 — Player Web Product Design Pack

Owner repo: Web / Portal.
Goal: convert the existing fixture Portal into an approved real-data product design before integration.

Scope:
- IA/navigation;
- player personas/scenarios;
- auth/access/account/characters/security/sessions/journey/support;
- field-to-screen data mapping;
- state matrix;
- responsive design;
- accessibility;
- fixture-to-real transition map.

Dependencies: SYS-01/02/03, CT-01 draft.

Acceptance:
- every visible field maps to an accepted backend field or explicit future placeholder;
- loading/empty/error/expired/offline states exist;
- no route implies unopened inventory/progression/support capability;
- desktop and mobile layouts reviewed;
- destructive/security actions have confirmation/error states.

Evidence:
- route/flow diagrams;
- state matrix;
- wireframes/mockups;
- data-binding matrix;
- visual review notes;
- owner acceptance.
## PWEB-02 — Portal BFF / Browser Session Boundary

Owner repo: Web / packages/auth + Portal.
Goal: safely adapt Java product auth to browser sessions.

Scope:
- Next.js server-side auth adapter;
- HttpOnly/Secure/SameSite cookie strategy;
- backend token containment;
- session expiry/logout;
- CSRF/replay considerations;
- no localStorage bearer token.

Dependencies: CT-03/05, PWEB-01.

Acceptance:
- browser never exposes backend access token to client JS storage;
- login creates valid server-side session context;
- logout invalidates backend session and browser cookie;
- expired backend session clears Portal access consistently;
- unauthorized route protection works.

Evidence:
- security-focused tests;
- browser storage inspection;
- cookie attributes screenshot/log;
- login/logout/expiry E2E;
- negative CSRF/session tests where applicable.
## PWEB-03 — Real Auth/Register/Recovery Portal

Owner repo: Web / Portal.
Goal: replace fixture access flows with real contract-backed behavior.

Scope:
- /login;
- /register;
- /recovery;
- /access state;
- canonical errors and disabled states.

Dependencies: PWEB-02, CT-03/05.

Acceptance:
- real register/login/recovery success paths;
- duplicate identifier/invalid credentials/rate limit/unavailable recovery mapped by code;
- no enumeration leakage;
- loading and network failure states;
- desktop/mobile visual fidelity;
- fixture warnings removed only from opened surfaces.

Evidence:
- Playwright real-API E2E;
- screenshots desktop/mobile;
- accessibility checks;
- contract log/correlation IDs;
- negative-path matrix.
## PWEB-04 — Real Account & Character Portal

Owner repo: Web / Portal.
Goal: make account and character roster/detail read from the canonical backend.

Scope:
- /account;
- /characters;
- /characters/[id];
- five-class labels;
- runtime map summary where appropriate;
- ownership failures.

Dependencies: PWEB-02/03, CT-03/05.

Acceptance:
- Portal roster equals Unity/backend roster for the same account;
- three slots render truthfully;
- all five canonical class labels map correctly;
- raw legacy IDs never display;
- missing/foreign character resolves safely;
- no invented level/equipment/last-played field.

Evidence:
- cross-client parity fixture;
- API/browser E2E;
- screenshots;
- class mapping tests;
- empty roster and 1/2/3-slot cases.
## PWEB-05 — Durable Session Management Portal

Owner: Game IAM + Web Portal.
Goal: make /account/sessions real only after durable multi-session semantics exist.

Scope:
- backend list own sessions;
- current-session marker;
- revoke another session;
- revoke-all-except-current policy if approved;
- device metadata privacy.

Dependencies: DB-05, CT contract update, PWEB-02.

Acceptance:
- session list survives API restart;
- user cannot inspect/revoke another account;
- current session handling explicit;
- revoke immediately invalidates selected token;
- Portal states cover no-other-session, expired, network error.

Evidence:
- backend integration tests;
- multi-browser E2E;
- session DB/pgAdmin inspection;
- Portal screenshots;
- audit/security report.
## PWEB-06 — Journey / Progression Portal

Owner: Game Progression + Web Portal.
Goal: expose real chapter/quest/progression state after the Game domain exists.

Scope:
- current chapter;
- current objective;
- completed milestones;
- class progression summary;
- next recommended activity;
- no client-authored progression.

Dependencies: GAME-DATA-01, contract update.

Acceptance:
- Portal state matches server-authoritative progression after reconnect;
- no progress can be advanced from the Portal unless an explicit command exists;
- missing/unopened progression renders truthfully;
- scenario IDs map to player-facing Vietnamese labels.

Evidence:
- progression DB/API tests;
- Unity→Portal parity E2E;
- screenshots/state matrix;
- stale-data/reconnect test.
## PWEB-07 — Inventory / Equipment Companion

Owner: Game Inventory + Web Portal.
Goal: provide read-oriented character loadout/inventory once item ownership is authoritative.

Scope:
- equipped items;
- cosmetic loadout;
- inventory summary;
- item detail;
- no browser equip mutation until separately approved.

Dependencies: GAME-DATA-02, contract update.

Acceptance:
- item ownership matches Unity/backend;
- equipment slot truth preserved;
- cosmetics separated from power/stat equipment;
- no fixture items;
- large inventory pagination/empty state works.

Evidence:
- API parity tests;
- browser E2E;
- item/slot invariant checks;
- responsive screenshots.
## PWEB-08 — Real Player Support Portal

Owner: Support domain + Web Portal.
Goal: replace support fixtures with account-linked cases.

Scope:
- create case;
- list own cases;
- case detail/timeline;
- category;
- privacy-safe character/account linkage;
- recovery handoff where applicable.

Dependencies: ADM-06 support domain, CT update.

Acceptance:
- player only sees own cases;
- create is idempotent against duplicate retry;
- case state transitions are server-owned;
- no operator-only data leaks;
- offline/network retry state is safe.

Evidence:
- support API tests;
- Portal E2E;
- authorization negative tests;
- screenshots;
- case/audit correlation proof.
# WAVE 4 — ADMIN / OPERATIONS

## ADM-01 — Admin Product & Operator Workflow Design Pack

Owner repo: Web / Ops.
Goal: turn current fixture pages into an approved operator workflow design.

Scope:
- Control Center;
- Player Search/360;
- Sessions;
- Support;
- Trust & Safety;
- Audit;
- World Operations;
- LiveOps;
- permission/state/action matrices.

Dependencies: SYS-02/03, PWEB-01 principles.

Acceptance:
- every route answers an operator question;
- every action names required capability and audit event;
- read-only vs mutation boundaries explicit;
- destructive actions define confirmation/reason/recovery;
- desktop-first layout and constrained responsive behavior reviewed.

Evidence:
- workflow diagrams;
- capability matrix;
- state/action matrix;
- route wireframes;
- owner/operator review notes.
## ADM-02 — Staff Identity & RBAC Foundation

Owner: Game backend / ops security.
Goal: create staff authentication independent from player accounts.

Scope:
- ops.staff_users;
- roles;
- capabilities;
- role assignment;
- staff sessions;
- initial read-only capabilities;
- bootstrap procedure for first operator.

Dependencies: DB platform, ADM-01.

Acceptance:
- player credentials cannot authenticate as staff;
- least-privilege role assignment enforced;
- disabled/revoked staff session rejected;
- capability checks occur server-side;
- no Admin page relies only on UI hiding.

Evidence:
- ERD/migrations;
- auth/RBAC positive and negative tests;
- pgAdmin inspection;
- staff session/revocation tests;
- threat review.
## ADM-03 — Append-Only Audit Service

Owner: Backend / audit domain.
Goal: make all privileged operations traceable before mutations open.

Scope:
- audit.audit_events;
- correlation/request IDs;
- staff actor/capability context;
- read-only audit query API;
- write path inaccessible to ordinary business callers except through service API.

Dependencies: ADM-02, DB platform.

Acceptance:
- staff login/read/action events produce expected audit entries where policy requires;
- normal runtime DB role cannot UPDATE/DELETE audit history;
- query by actor/target/request works;
- sensitive payloads are redacted by policy.

Evidence:
- migration/ERD;
- DB privilege negative tests;
- audit event golden records;
- Admin audit query smoke.
## ADM-04 — Real Player Search & Player 360 Read Model

Owner: Backend + Web Ops.
Goal: replace player-operation fixtures with real read-only operational data.

Scope:
- account search;
- character summary;
- session summary;
- current map/runtime state;
- account timestamps/state;
- correlation links to audit/support when available.

Dependencies: ADM-02/03, DB-06, CT admin read contract.

Acceptance:
- operator needs `player.read`;
- search is paginated/bounded;
- no raw credential/token/hash fields exposed;
- same account/character IDs match Unity/Portal;
- nonexistent player and permission denied states distinct.

Evidence:
- admin API tests;
- permission negative tests;
- browser E2E;
- Player 360 screenshots;
- cross-system ID parity.
## ADM-05 — Safe Session Revoke / Unstuck Commands

Owner: Backend + Ops.
Goal: open the first narrow real mutations with full RBAC/audit/idempotency.

Scope:
- revoke selected session;
- approved character unstuck/reset-to-checkpoint;
- reason required;
- confirmation;
- idempotency key;
- audit/outbox.

Dependencies: ADM-02/03/04, durable sessions/world-state.

Acceptance:
- unauthorized capability rejected;
- retry with same idempotency key has one effect;
- successful action changes canonical state;
- audit contains actor/target/reason/result/correlation;
- failure leaves state consistent.

Evidence:
- command tests;
- duplicate-retry tests;
- before/after DB/API;
- audit record;
- Admin browser E2E.
## ADM-06 — Support Domain & Triage Workflow

Owner: Backend Support + Ops + Portal.
Goal: create one support authority shared by player and operator surfaces.

Scope:
- support cases;
- case events/timeline;
- assignment;
- escalation;
- player/character references;
- staff capabilities;
- audit.

Dependencies: ADM-02/03 and the support scenarios/state requirements already defined by PWEB-01/ADM-01 design packs.

Acceptance:
- player can create/read own case;
- operator queue filters/pagination real;
- assign/escalate requires capability;
- every state change audited;
- closed/reopened semantics explicit;
- no moderation action smuggled into support workflow.

Evidence:
- migration/ERD;
- API state-machine tests;
- Portal/Ops E2E;
- permission negatives;
- audit correlation.
## ADM-07 — World / Session Operations Read Model

Owner: Game realtime/world + Ops.
Goal: replace world/session fixtures with authoritative observation.

Scope:
- world/zone/channel status;
- online session summary;
- event state summary where available;
- no restart/drain/publish commands yet.

Dependencies: Admin RBAC/audit, canonical world IDs.

Acceptance:
- data comes from authoritative runtime/operational source;
- stale/offline telemetry indicated explicitly;
- read capability enforced;
- no fake capacity/session values;
- Admin UI survives partial component outage.

Evidence:
- backend read API tests;
- telemetry freshness tests;
- browser E2E;
- degraded-state screenshots.
## ADM-08 — LiveOps Version / Publish / Rollback

Owner: LiveOps backend + Ops.
Goal: open controlled event configuration only after event authority exists.

Scope:
- immutable event versions;
- draft/approved/published state;
- schedule/environment targeting;
- publish;
- rollback to known version;
- capability separation author vs publish;
- audit.

Dependencies: ADM-02/03/07, GAME-DATA-04.

Acceptance:
- published content has version/checksum;
- author cannot publish without capability;
- rollback restores a known accepted version;
- client consumes server-owned event state;
- retries idempotent;
- audit complete.

Evidence:
- event lifecycle tests;
- before/after version snapshots;
- Unity/Portal consumer smoke;
- Admin E2E;
- rollback rehearsal.
# WAVE 5 — GAME DATA / PLAYER STATE EXPANSION

## GAME-DATA-01 — Authoritative Scenario / Progression Persistence

Owner repo: Game.
Goal: persist the canonical onboarding/chapter state instead of inferring progress from local UI.

Scope:
- scenario/chapter/objective IDs;
- current/completed state;
- server-authoritative transitions;
- reconnect/replay semantics;
- no reward/economy coupling beyond explicit accepted result.

Dependencies: SYS-01, DB platform, CT platform.

Acceptance:
- progression survives restart/reconnect;
- invalid/out-of-order transition rejected;
- Unity cannot complete objective by closing UI alone;
- Portal can read current progress;
- Admin can inspect without mutating.

Evidence:
- migration/ERD;
- state-machine tests;
- Unity runtime smoke;
- reconnect test;
- Portal/Admin parity sample.
## GAME-DATA-02 — Inventory / Equipment Authority

Owner repo: Game.
Goal: establish durable item ownership and equipment state before deeper loot/economy.

Scope:
- item instances/stacks;
- equipment slots;
- cosmetic assignments;
- GameData item-template references;
- equip/unequip commands;
- idempotency/concurrency;
- migration from any accepted prototype state.

Dependencies: DB platform, GameData ID policy.

Acceptance:
- item cannot belong to two owners;
- equip requires ownership/slot compatibility;
- retry does not duplicate item/equip effect;
- preview/try-on remains non-durable until apply accepted;
- Unity visual equipment matches backend state after reconnect.

Evidence:
- DB constraints;
- concurrency/idempotency tests;
- Unity equip runtime evidence;
- pgAdmin ERD/rows;
- Portal read parity when PWEB-07 opens.
## GAME-DATA-03 — Combat Reward Transaction Slice

Owner: Realtime combat + backend inventory/progression.
Goal: make the first combat outcome produce one durable, explainable reward.

Scope:
- authoritative combat result correlation;
- reward idempotency;
- inventory/progression mutation;
- transaction/outbox;
- retry/reconnect.

Dependencies: GAME-DATA-01/02 and accepted combat contract.

Acceptance:
- client cannot self-declare reward;
- same combat/reward correlation cannot grant twice;
- crash/retry reaches one consistent durable outcome;
- reconnect returns correct inventory/progression;
- Admin/audit can explain reward source.

Evidence:
- duplicate reward RED/GREEN;
- transactional integration tests;
- runtime combat E2E;
- DB before/after;
- outbox/audit correlation.
## GAME-DATA-04 — Live Event State Model

Owner: Game/LiveOps.
Goal: define event state needed for later Admin LiveOps without prematurely opening economy/world-scale features.

Scope:
- event definition/version reference;
- schedule;
- runtime state machine;
- environment/channel targeting;
- client-visible status;
- contribution contract placeholder only when actually required.

Dependencies: canonical world IDs, DB platform.

Acceptance:
- event state is server-owned;
- schedule/version immutable once published by policy;
- client countdown derives from server timestamps;
- restart preserves published event state;
- Admin read model can observe it.

Evidence:
- migration/state-machine tests;
- restart test;
- Unity event-state smoke;
- API/admin read evidence.
# WAVE 6 — CROSS-SYSTEM E2E / OPERATIONS

## XSYS-01 — Account & Character Cross-System Slice

Goal: prove one identity/character authority across Game, Portal and Admin.

Scenario:
register/login → create/own character → Unity selects → Portal reads same roster → Admin finds same account/character.

Dependencies: DB/CT/PWEB/ADM read foundations.

Acceptance:
- one canonical account ID;
- one canonical character ID;
- same class/slot data on all consumers;
- unauthorized cross-account access rejected;
- logout/session expiry consistent.

Evidence:
- one scripted E2E;
- API traces/correlation IDs;
- Unity screenshot/runtime log;
- Portal screenshot;
- Admin screenshot;
- DB row references.
## XSYS-02 — World State / Reconnect Slice

Goal: prove durable game state crosses reconnect and observation surfaces.

Scenario:
character enters Map01A → changes accepted runtime state → disconnect/restart → reconnect → Portal shows current zone → Admin inspects same state.

Dependencies: DB-06, world contract, PWEB-04/06, ADM-04/07.

Acceptance:
- no client-only authoritative state;
- restart/reconnect preserves expected state;
- stale/out-of-range state rejected;
- Portal/Admin show same canonical map ID.

Evidence:
- restart E2E;
- DB before/after;
- Unity/Portal/Admin visual evidence;
- negative invalid-state test.
## XSYS-03 — Combat Reward / Inventory Slice

Goal: prove one authoritative combat reward becomes one durable inventory result across systems.

Scenario:
server accepts combat result → reward once → Unity inventory updates → Portal reflects loadout/inventory → Admin can inspect/audit source.

Dependencies: GAME-DATA-02/03, PWEB-07, ADM-04/03.

Acceptance:
- duplicate retry grants once;
- item ownership and slot invariant intact;
- all surfaces converge after refresh/reconnect;
- audit/correlation explains origin.

Evidence:
- cross-system E2E;
- duplicate replay test;
- DB/ledger records;
- representative UI evidence.
## XSYS-04 — Player Support / Safe Operator Action Slice

Goal: prove a player-to-operator workflow with RBAC/audit.

Scenario:
Portal creates support case → Ops triages → approved session revoke or unstuck → player sees outcome → audit contains complete trail.

Dependencies: PWEB-08, ADM-05/06.

Acceptance:
- ownership/permissions enforced;
- operator reason required;
- action idempotent;
- case and audit correlation intact;
- failure path does not leave partial state.

Evidence:
- Portal/Ops E2E;
- audit event;
- before/after canonical state;
- permission negative tests.
## XSYS-05 — Database Restore & Whole-System Recovery Drill

Goal: prove the platform can recover without inventing success from backups alone.

Scope:
- restore database into isolated target;
- start API against restored DB;
- validate auth/character/world/inventory domains currently opened;
- run representative Unity/Portal/Admin smoke;
- record actual recovery time.

Dependencies: DB-08 plus opened system domains.

Acceptance:
- restored environment passes invariants;
- no source DB overwritten;
- migration version/checksum correct;
- actual recovery metrics recorded;
- unresolved gaps become explicit follow-up tasks.

Evidence:
- backup/restore logs;
- schema/version check;
- system smoke logs/screenshots;
- recovery timeline;
- immutable evidence bundle.
# WAVE 7 — SCALE / SECURITY / ALPHA READINESS

## OPS-01 — Database Capacity & Load Baseline

Goal: measure the accepted Alpha query/connection envelope before scale claims.

Scope:
- representative account/session/roster/player-search workloads;
- connection pool behavior;
- pg_stat_statements;
- DB CPU/memory/storage;
- p95/p99 query latency;
- write contention.

Dependencies: DB-09 and representative real domains.

Acceptance:
- workload and dataset size documented;
- slowest queries identified;
- no unexplained connection exhaustion;
- indexes justified by measured query patterns;
- capacity risks translated into concrete tasks.

Evidence:
- load command/config;
- database metrics;
- pg_stat_statements report;
- EXPLAIN plans;
- before/after if tuning occurs.
## SEC-01 — Auth / Database / Admin Security Review

Goal: perform a focused security review before Founder Alpha.

Scope:
- credential storage;
- session token handling;
- recovery;
- DB roles/secrets;
- Portal BFF/cookies;
- staff IAM/RBAC;
- audit integrity;
- rate limiting;
- sensitive logging;
- backup access.

Acceptance:
- no raw password/token stored or logged;
- player/staff auth separated;
- least-privilege DB roles verified;
- common auth/recovery abuse cases tested;
- critical/high findings resolved or explicitly block Alpha.

Evidence:
- threat model;
- configuration audit;
- security tests;
- secret scan;
- remediation report.
## OPS-02 — Migration / Expand-Contract Rehearsal

Goal: prove future schema evolution can occur while Game/Web/Admin versions overlap.

Scenario:
introduce a representative backward-compatible field → deploy compatible consumer → backfill → switch → contract in later migration.

Dependencies: DB-10 and at least one shared domain.

Acceptance:
- N-1 and N application compatibility window demonstrated;
- migration does not require manual live SQL;
- backfill restart safe;
- Flyway history valid throughout;
- contract step occurs only after old consumer retired.

Evidence:
- staged migration logs;
- N-1/N compatibility tests;
- backfill progress;
- schema diffs/ERDs;
- rollback/recovery note.
## ALPHA-01 — Founder Alpha System Readiness Review

Goal: decide readiness using system evidence, not isolated feature screenshots.

Required review areas:
- Product Bible scope;
- database migration/recovery;
- auth/session;
- account/character;
- accepted gameplay vertical slice;
- opened progression/inventory;
- Portal;
- Admin read/safe ops;
- security;
- performance;
- observability;
- evidence integrity.

Acceptance:
- every required domain PASS or documented blocker;
- restore drill current;
- no production surface backed by fixture data;
- unresolved critical data-loss/security issue blocks Alpha;
- owner receives one consolidated readiness report.

Evidence:
- readiness matrix;
- links to immutable evidence from predecessor tasks;
- exact release commits/contracts;
- blocker register;
- final owner review.
# Sequential promotion order

Default sequence:

1. SYS-01 → SYS-02 → SYS-03 → SYS-04
2. DB-01 → DB-02 → DB-03 → DB-04
3. DB-05 and DB-06 after shared IAM base
4. DB-07 → DB-08 → DB-09 → DB-10; DB-11 may begin after DB-09 and must close before Alpha infrastructure readiness
5. CT-01 → CT-02 → CT-03/CT-04 → CT-05
6. PWEB-01 may design in parallel after CT drafts; PWEB-02→05 integrate sequentially
7. ADM-01 may design in parallel; ADM-02 → ADM-03 → ADM-04 → ADM-05/06
8. GAME-DATA-01 → GAME-DATA-02 → GAME-DATA-03; GAME-DATA-04 only when LiveOps is opened
9. PWEB-06/07/08 and ADM-07/08 open only when their backend domains exist
10. XSYS slices close each major capability across consumers
11. OPS-01/SEC-01/OPS-02 before ALPHA-01.

Parallelism is allowed only when tasks do not mutate the same authority and dependencies are already accepted.
