# LGO System, Database, Web Client & Admin Architecture Design v1

Date: 2026-09-18
Status: DESIGN FOR OWNER REVIEW — NO IMPLEMENTATION AUTHORITY
Scope: Game backend/data authority, database platform, contract platform, Player Web Client, Admin/Ops, cross-system delivery and evidence.

## 1. Design objective

Linh Giới Online must stop growing as disconnected runtime/UI slices and instead evolve through one authority chain:

**Product scenario → domain owner → durable database model → API/realtime contract → Unity/Web/Admin consumers → cross-system evidence.**

This design keeps the current accepted principles:
- server-authoritative durable outcomes;
- modular monolith business/API backend;
- separate realtime process;
- five-class 2D product direction;
- Public Web frozen;
- Portal/Ops foundations reused rather than redesigned from zero.
## 2. Architecture decisions

### A1 — Primary durable database
Use **PostgreSQL 18** as the primary durable relational database for product state.

Reasons:
- transactions, constraints and mature indexing fit account/character/inventory/economy authority;
- PostgreSQL 18 provides native `uuidv7()`, strong partitioning, Row-Level Security capability, WAL/PITR and mature diagnostics;
- scale-up, read replicas and partitioning can be added before considering sharding.

Do not introduce MongoDB or a second durable authority for core player state.

### A2 — Migration authority
Use **Flyway versioned migrations** as the only normal schema-change path.

Applied migrations are immutable. Schema changes roll forward through new migrations.
`flyway validate` is mandatory in CI and release gates.
### A3 — Database access
Use **jOOQ generated schema types** for Java SQL access.

The generation pipeline is:
Flyway migrations → temporary PostgreSQL schema → jOOQ code generation → Java compile/tests.

Reasons:
- explicit SQL remains visible and tunable;
- generated tables/columns/relationships reduce DTO/query drift;
- PostgreSQL-specific capabilities stay available without ORM magic.

JPA/Hibernate is not the default persistence layer for this program.

### A4 — Database testing
Use **Testcontainers PostgreSQL** for database integration tests.

Every DB task must prove:
- bootstrap from empty database;
- migration from previous accepted schema when applicable;
- real PostgreSQL behavior, not H2 emulation.
### A5 — Visual database management
Run a pinned **pgAdmin 4** instance in the developer database stack.

pgAdmin is required because it can:
- browse live schemas/tables/data;
- generate ERD from the existing database;
- design/inspect relationships;
- run Query Tool/PSQL;
- compare schemas with Schema Diff;
- perform pg_dump/pg_restore based backup/restore workflows.

This satisfies the requirement that the database is directly inspectable and manageable, not represented only by static diagrams.

pgAdmin is a developer/DBA tool. The LGO Admin product is not a raw database console.
## 3. Environment model

Each environment has an isolated database and credentials:

- local developer;
- automated test;
- shared integration;
- staging;
- production.

No production data is copied into local/test without an explicit sanitization process.

Initial local infrastructure target:
- PostgreSQL 18 container;
- pgAdmin 4 container with persistent settings volume;
- Mailpit or equivalent local SMTP sink for recovery testing;
- Game API connected through environment-specific datasource credentials.

Redis is deferred until a measured ephemeral-state/cache/presence need exists. It must never become durable account/inventory/economy authority.
## 4. Database logical ownership

PostgreSQL schemas are domain namespaces, not microservices.

Initial physical schemas:
- `iam` — player identity, credentials, sessions, recovery;
- `player` — characters and runtime player state;
- `world` — durable world/zone placement and shared world state when opened;
- `progression` — level, chapter, quest, skill progression;
- `inventory` — item ownership, equipment, cosmetic loadout;
- `support` — player support workflow;
- `ops` — staff identity/RBAC when opened;
- `audit` — append-only operator/system audit;
- `liveops` — event/version/schedule data when opened;
- `economy` — currency ledger/market only in a later phase.

Do not create every future schema on day one. The namespace is reserved; physical objects appear only when the corresponding domain task opens.
## 5. GameData boundary

Static gameplay definitions remain version-controlled GameData, not duplicated into mutable PostgreSQL tables by default.

Examples:
- class definitions;
- skill definitions;
- item templates;
- monster templates;
- zone definitions;
- dialogue/content packages where source-controlled authoring remains appropriate.

Database rows reference stable GameData IDs and, where required, the GameData version that produced a durable outcome.

Database owns **player-specific state and operational state**.
GameData owns **versioned game definitions**.

LiveOps may later materialize approved dynamic event configuration in PostgreSQL, but must preserve version/source provenance.
## 6. Identifier strategy

Preserve current public IDs for compatibility, while introducing database-efficient internal identity.

For core durable entities:
- internal primary key: PostgreSQL `uuid`, generated with `uuidv7()`;
- public ID: stable unique string such as current `account.product.*` / `character.*`;
- realtime `entity_id bigint` remains a separate game-runtime identifier.

Consumers use public IDs in API contracts.
Internal UUIDs are for database joins/foreign keys and are not required in player-facing responses.

Legacy class IDs remain migration inputs only. New canonical class writes use:
`vo`, `kiem`, `phap`, `co`, `linh`.
## 7. Core IAM data model

Initial IAM tables:

### iam.accounts
- id uuid PK;
- public_id text UNIQUE NOT NULL;
- display_name;
- state;
- created_at timestamptz;
- updated_at timestamptz;
- version bigint for optimistic concurrency where needed.

### iam.account_identifiers
- account_id FK;
- type;
- normalized_value;
- verified_at;
- UNIQUE(type, normalized_value).

Email is an identifier, not the account primary key.

### iam.credentials
- account_id FK;
- credential_type;
- password_hash;
- hash_scheme/version;
- created_at;
- updated_at.

Current BCrypt cost-12 hashes remain valid during migration. Password algorithm evolution is handled as rehash-on-auth/versioned policy rather than forced password invalidation.
### iam.auth_sessions
- id uuid PK;
- account_id FK;
- token_hash UNIQUE;
- created_at;
- expires_at;
- revoked_at;
- last_seen_at;
- device/session metadata that is safe to retain;
- revocation_reason.

Raw bearer tokens are never stored.

### iam.recovery_challenges
- id uuid PK;
- account_id nullable to preserve enumeration-safe request semantics;
- identifier hash/reference;
- verification_code_hash;
- attempt_count;
- expires_at;
- resend_available_at;
- consumed_at.

### iam.recovery_grants
Short-lived hashed reset grants with expiry/consumption state.
## 8. Character/world foundation

### player.characters
- id uuid PK;
- public_id UNIQUE;
- account_id FK;
- slot;
- name;
- canonical_class_id;
- realtime_entity_id bigint UNIQUE;
- created_at;
- updated_at;
- version;
- UNIQUE(account_id, slot);
- appropriate normalized name uniqueness policy.

### player.character_runtime_state
- character_id PK/FK;
- map_id;
- lane_x / future authoritative transform fields;
- facing;
- updated_at;
- version.

Map01A compatibility is mapped into this model without inventing full open-world state.

World placement and scenario progression are not packed into a single JSON blob; scenario/chapter/quest progress belongs to the `progression` domain.
## 9. Progression, inventory and social direction

These are designed now but implemented only when their product phase opens.

### progression
Separate chapter/quest/skill progression records. Avoid one mutable `progress_json` column.

### inventory
Support:
- item instances for unique/equipment objects;
- item stacks for fungible items;
- equipment assignments;
- cosmetic assignments;
- ownership transaction/history where required.

Preview/try-on is never persisted as equipped state before an accepted command.

### social
Presence remains ephemeral/realtime.
Durable friend/guild membership belongs in relational state when opened.
## 10. Economy direction

Economy is intentionally late.

When opened:
- every currency mutation is represented by an immutable ledger entry;
- balances are derived/materialized safely from ledger-backed transactions;
- every mutation has reason code, idempotency key and correlation ID;
- marketplace trade uses escrow semantics;
- Admin never exposes a generic “set balance” field.

Economy/audit tables are candidates for time partitioning only when volume/access patterns justify it.

No sharding is planned before measured need.
## 11. Audit and outbox

### audit.audit_events
Append-only record:
- event id;
- occurred_at;
- actor type/id;
- capability/role context;
- action;
- target type/id;
- reason;
- request/correlation id;
- result;
- structured metadata;
- source service/version.

Normal application roles cannot UPDATE or DELETE audit history.

### transactional outbox
Durable mutations that must publish cross-process events write an outbox record in the same transaction.
A dispatcher publishes after commit.

This prevents DB + message dual-write inconsistency and gives future extraction paths without introducing microservices now.
## 12. Concurrency and transaction rules

Every durable command declares its transaction boundary.

Examples:
- registration: account + identifier + credential in one transaction;
- password reset: credential update + session revocation intent atomically coordinated;
- equip item: ownership validation + equipment assignment in one transaction;
- reward: reward idempotency + inventory/currency mutation in one transaction;
- admin safe mutation: command result + audit/outbox consistency.

Use database uniqueness/foreign keys/check constraints as invariants, not only Java checks.

Use optimistic versioning for ordinary aggregate edits and explicit row locking for contention-sensitive inventory/economy operations.
## 13. JSONB policy

JSONB is allowed for:
- versioned metadata;
- audit/event metadata;
- extension fields that are not core relational invariants;
- external-provider payload snapshots with provenance.

JSONB is not the default home for:
- account identity;
- character slots/classes;
- inventory ownership;
- equipment assignments;
- currency balances;
- quest completion;
- permission assignments.

Any JSONB payload stored durably must have an explicit payload version or schema owner.
## 14. Indexing and scale policy

Indexes are derived from real access paths.

Initial mandatory examples:
- account identifier lookup;
- active session token hash;
- account character roster;
- character public ID;
- runtime entity ID;
- active recovery challenge lookup.

Every new index must state which query/invariant it serves.

Enable `pg_stat_statements` in integration/staging/production-equivalent environments.
Slow-query/performance review uses observed planning/execution statistics and EXPLAIN plans.

Partitioning, read replicas, PgBouncer and specialized stores are introduced only after measured thresholds.
## 15. Database change model

All changes follow **expand → migrate/backfill → switch consumers → contract**.

Safe additive change:
1. add table/column/index/constraint in compatible form;
2. deploy code that tolerates old/new states;
3. backfill if needed;
4. observe;
5. tighten constraint/drop legacy path in a later migration.

Destructive changes never combine rename/drop + consumer cutover in one risky release.

Applied Flyway versioned migrations are never edited.
A corrective change receives a new migration.
## 16. Migration classes

Class A — additive and backward-compatible:
- new table;
- nullable column;
- safe index;
- non-breaking reference data.

Class B — backfill/compatibility:
- new required field;
- data transformation;
- dual-read/write window.

Class C — destructive/contract:
- drop/rename;
- narrowing type;
- removing legacy IDs;
- breaking constraints.

Class D — sensitive correction:
- inventory/economy/account data correction.

B/C/D require explicit rehearsal evidence. C normally spans at least two application releases.
## 17. Database observability and recovery

Development:
- pgAdmin live inspection;
- Query Tool/PSQL;
- Flyway history;
- local pg_dump/pg_restore rehearsal.

Integration/staging:
- pg_stat_statements;
- slow query reporting;
- connection-pool metrics;
- DB size/index statistics;
- migration duration.

Production:
- regular backups;
- continuous WAL archiving/PITR or equivalent managed-database feature;
- restore rehearsal;
- alerting for capacity, connections, replication/backup health and migration failure.

RPO/RTO are measured and owner-approved before Alpha; they are not invented by this design document.
## 18. pgAdmin operating model

Developer stack exposes pgAdmin only on localhost/private network.

Required workflows:
- connect to local/integration DB;
- browse schemas/tables/constraints/indexes;
- generate database-level and per-domain ERDs from the live schema;
- inspect table data with least-privileged credentials;
- run Schema Diff for drift investigation;
- backup/restore development databases.

Schema Diff may diagnose drift, but **Flyway migrations remain the source of change**.
Do not click-sync production schema outside the migration process.
## 19. Database roles

At minimum:
- `lgo_migrator` — DDL/migration role;
- `lgo_api` — application DML for API-owned domains;
- `lgo_realtime` — narrowly scoped access required by realtime integration;
- `lgo_readonly` — diagnostic/read-only access;
- DBA/operator role — infrastructure only.

The LGO Admin application uses backend APIs and staff RBAC.
It does not receive DBA credentials.

Production credentials are environment secrets, not committed config.
## 20. Player Web Client architecture

Player Web is a companion portal.

The existing route/component foundation is retained.

Integration order:
1. auth/register/recovery;
2. account self-profile;
3. character roster/detail;
4. multi-session review/revoke after durable sessions exist;
5. journey/progression after canonical progression exists;
6. inventory/equipment;
7. social/events;
8. support.

Next.js server/BFF boundary adapts browser sessions to Java auth.
Raw Java bearer tokens are not stored in browser localStorage.
## 21. Player Web design gate

Before a Portal domain is implemented, its design pack must contain:
- player scenario and goal;
- route/IA;
- real backend fields and source owner;
- loading/empty/error/expired/offline states;
- permission/ownership behavior;
- desktop/mobile responsive layout;
- long-content behavior;
- accessibility;
- analytics/evidence expectations;
- explicit unavailable states for unopened systems.

A pretty fixture screenshot without data/state mapping is not an accepted design.
## 22. Admin architecture

Admin is an operations console.

Separate staff identity and staff sessions from player auth.

Security substrate precedes mutations:
- staff users;
- roles;
- capabilities;
- role assignments;
- audit.

Initial capability vocabulary includes:
`player.read`, `character.read`, `session.read`, `session.revoke`,
`support.read`, `support.assign`, `audit.read`, `world.read`.

High-risk capabilities are added only with their domain.
## 23. Admin design gate

Every Admin workflow must specify:
- operator persona;
- operational question;
- query/read model;
- required capability;
- action preconditions;
- confirmation;
- reason field;
- idempotency behavior;
- audit event;
- failure/retry state;
- rollback/recovery behavior.

Admin pages are workflow-oriented, not raw CRUD.

First real workflow target:
search player → Player 360 → inspect characters/sessions → revoke one session or perform approved unstuck → audit record.
## 24. Cross-system vertical slices

### VS1 Account/Character
Register/login → character ownership → Unity select → Portal shows same roster → Admin read-only finds same account.

### VS2 World state
Enter Map01A → durable state → reconnect → Portal current zone summary → Admin inspection.

### VS3 Combat/reward/inventory
Server-accepted combat → reward idempotency → inventory mutation → Unity update → Portal loadout → Admin/audit explanation.

### VS4 Support
Portal case → Admin triage → safe action → audit.

### VS5 Social/LiveOps
Server-owned social/event state → Unity/Portal consume → Admin observes/operates with RBAC/audit.
## 25. Evidence policy

Every implementation task produces a compact evidence bundle, not a giant duplicated handoff.

Required baseline evidence:
- exact source commit/base;
- BEFORE state;
- design/spec link;
- RED test/validator where behavior changes;
- focused GREEN tests;
- relevant integration/E2E;
- migration info/validate for DB tasks;
- DB schema/ERD evidence for schema tasks;
- representative UI screenshots for UI tasks;
- performance/EXPLAIN evidence when performance is claimed;
- rollback/recovery evidence when data risk exists;
- git clean + normal push verification;
- immutable evidence registration.

Large full-source packages stay outside repo when needed.
Do not recreate the previous multi-gigabyte handoff pattern.
## 26. Definition of Done hierarchy

A task may be source-complete without being product-complete.

DB task DoD:
- migration + constraints;
- fresh bootstrap;
- previous-version upgrade;
- Flyway validate;
- repository/integration tests;
- pgAdmin live ERD inspection;
- backup/rollback note;
- evidence.

API task DoD:
- contract;
- authorization;
- stable errors;
- positive/negative tests;
- generated consumer;
- consumer E2E.

UI task DoD:
- approved state/data design;
- real contract integration;
- desktop/mobile visual review;
- accessibility;
- failure states;
- no fixture leakage.
## 27. Source references used

Project source:
- ADR-0002 Server Authority;
- ADR-0004 Modular Monolith;
- current Game auth/character source at `404b8963`;
- current Web Portal/Ops fixture boundaries at `8b25c658`.

External official references:
- PostgreSQL 18 release/docs, Row Security, partitioning, backup/PITR and pg_stat_statements;
- pgAdmin 4 ERD Tool, Schema Diff, Backup/Restore and container deployment;
- Flyway versioned migrations, migrate and validate;
- Testcontainers PostgreSQL module;
- jOOQ generated schema/code generation.

These references inform implementation choices; LGO source/governance remains project authority.
## 28. Design approval gate

This spec deliberately does not create database containers, migrations, tables, APIs or UI changes.

After owner review:
1. accept/revise this architecture;
2. accept/revise the program task catalog;
3. only then produce task-level implementation plans and promote the first task.

The first implementation task must be a database/tooling foundation slice, not Portal/Admin feature work.
## 29. Alternatives assessed

### PostgreSQL vs MySQL / document database
PostgreSQL is selected because LGO's durable core has strong relational invariants, transaction-heavy ownership and future ledger/audit needs. A document database would make flexible prototypes easy but weakens the default path for cross-domain ownership/integrity and introduces a second data model without measured need.

### Flyway vs manual schema edits
Manual schema editing is rejected. Flyway versioned migrations provide ordered history and checksum validation.

### jOOQ vs JPA/Hibernate
jOOQ is selected for database-first, explicit/type-safe SQL and generated schema metadata. JPA is not forbidden forever, but it is not the persistence default because LGO benefits from visible queries, PostgreSQL features and predictable transaction boundaries.

### pgAdmin vs custom DB management UI
pgAdmin is selected for DBA/developer inspection. Building a custom raw DB console inside LGO Admin would duplicate mature tooling and create a dangerous privilege surface.
## 30. Production topology principle

Local development uses containers. Production topology is a separate accepted decision.

Preferred direction:
- managed PostgreSQL where feasible;
- private network access;
- TLS;
- automated backups/PITR;
- high-availability option appropriate to release stage;
- monitored connection/capacity limits.

Self-hosting remains possible only with an explicit operational reason and equivalent backup/HA/monitoring evidence.

Founder Alpha must have an accepted DB topology/RPO/RTO decision before release readiness.
## 31. Official implementation references

- PostgreSQL 18 release: https://www.postgresql.org/docs/18/release-18.html
- PostgreSQL partitioning: https://www.postgresql.org/docs/18/ddl-partitioning.html
- PostgreSQL Row Security: https://www.postgresql.org/docs/18/ddl-rowsecurity.html
- PostgreSQL backup/PITR: https://www.postgresql.org/docs/18/backup.html
- PostgreSQL pg_stat_statements: https://www.postgresql.org/docs/18/pgstatstatements.html
- pgAdmin ERD Tool: https://www.pgadmin.org/docs/pgadmin4/latest/erd_tool.html
- pgAdmin Schema Diff: https://www.pgadmin.org/docs/pgadmin4/latest/schema_diff.html
- pgAdmin container deployment: https://www.pgadmin.org/docs/pgadmin4/latest/container_deployment.html
- Flyway versioned migrations: https://documentation.red-gate.com/fd/versioned-migrations-273973333.html
- Flyway validate: https://documentation.red-gate.com/flyway/reference/commands/validate
- Testcontainers PostgreSQL: https://java.testcontainers.org/modules/databases/postgres/
- jOOQ code generation: https://www.jooq.org/doc/latest/manual/code-generation/codegen-configuration/
