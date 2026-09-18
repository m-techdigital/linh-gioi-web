# LGO Database Operations & Evolution v1

Date: 2026-09-18
Status: DESIGN FOR OWNER REVIEW
Depends on: `docs/superpowers/specs/2026-09-18-lgo-system-database-web-admin-architecture-design.md`

## 1. Purpose

This document defines how LGO database changes are designed, viewed, migrated, verified, recovered and evolved during continuous game development.

The database is expected to change frequently as gameplay reality changes. The process therefore optimizes for **safe evolution**, not for freezing an early schema.
## 2. Toolchain baseline

Required development tools:
- PostgreSQL 18;
- pgAdmin 4, pinned version;
- Flyway migrations;
- jOOQ code generation;
- Testcontainers PostgreSQL;
- pg_dump / pg_restore;
- Maven integration with Game server.

Optional later tools must justify their operational cost.

pgAdmin is the primary visual/live management surface. It must be able to show the actual database created by migrations, not a manually maintained drawing.
## 3. Local database workspace

Target local developer command eventually starts:
- PostgreSQL;
- pgAdmin;
- local recovery-mail sink;
- optional API profile configured to that DB.

Persistent PostgreSQL data and pgAdmin settings use local volumes.
Credentials come from ignored environment files or local secret tooling.

Acceptance for the future tooling task includes opening pgAdmin in a browser and generating an ERD from the **live migrated database**.
## 4. Source of truth hierarchy

1. Accepted domain design.
2. Flyway versioned migrations in Git.
3. Database created by those migrations.
4. jOOQ generated schema types.
5. repositories/services.
6. API contracts/consumers.
7. pgAdmin visualization.

An ERD or manually edited live database never outranks migrations.

If pgAdmin Schema Diff finds drift, the drift is fixed through a migration or environment rebuild; it is not silently accepted.
## 5. Migration naming and immutability

Versioned SQL migrations use a stable sortable convention such as:

`V0001__create_iam_core.sql`
`V0002__create_player_character.sql`
`V0003__migrate_legacy_accounts.sql`

Once a migration has run in a persistent shared environment:
- do not edit its contents;
- do not renumber it;
- do not delete it to “clean history”.

A correction gets a new migration.
Flyway validation must fail on checksum drift.
## 6. Migration review requirements

Every migration review states:
- domain owner;
- migration class A/B/C/D;
- expected row/table size;
- locking risk;
- index/build cost;
- backward compatibility window;
- application versions that can run before/after;
- data backfill strategy;
- rollback/recovery path;
- evidence to collect.

Schema changes without this review are not promotable.
## 7. Expand/contract workflow

For a breaking model change:

1. **Expand** — add new compatible structure.
2. **Dual compatibility** — code can read old and new forms.
3. **Backfill** — resumable, observable and idempotent.
4. **Switch** — new writes/read authority changes.
5. **Observe** — verify metrics and data invariants.
6. **Contract** — remove legacy structure in a later release.

This workflow is mandatory for renames, required-field introduction, ID migration and other destructive changes.
## 8. Backfill rules

Backfills must:
- be restartable;
- use bounded batches;
- record progress/checkpoint;
- avoid holding large transactions;
- expose rows scanned/changed/failed;
- be safe to rerun or protected by idempotency;
- preserve source data until verification completes.

Do not hide a multi-million-row data rewrite inside application startup migration.
Large backfills become explicit jobs with a migration gate.
## 9. Fresh and upgrade tests

Every DB change is tested in at least two paths:

### Fresh
Empty PostgreSQL → all Flyway migrations → current schema → tests.

### Upgrade
Previous accepted schema/data fixture → new migration(s) → current app → invariant tests.

For legacy JSON-to-Postgres migration tasks, a third path is mandatory:
accepted legacy fixture → importer/migrator → Postgres → API parity checks.
## 10. Visual schema verification

For every milestone that changes tables/relationships:
- open the migrated database in pgAdmin;
- generate whole-database or relevant schema ERD;
- verify expected PK/FK/unique links;
- inspect representative rows;
- capture one compact ERD screenshot/export for evidence;
- record the actual Flyway schema-history state.

The live ERD is evidence, not the schema authority.
## 11. Backup and restore

Local/integration:
- pg_dump/pg_restore workflow documented and tested;
- backup files stay outside Git;
- restore target is a separate database.

Staging/production:
- use managed PITR or continuous WAL archiving;
- schedule base backups;
- monitor backup freshness;
- perform restore rehearsals.

A backup is not considered valid until a restore has succeeded and application invariants have been checked.
## 12. Data correction policy

Never fix production data by an untracked ad-hoc UPDATE.

Corrections use one of:
- versioned migration for deterministic global correction;
- reviewed idempotent correction job for selected rows;
- audited Admin domain command when the product explicitly supports it.

Sensitive corrections record:
who/why/target/before-after summary/request ID/result.
## 13. Schema drift policy

Expected drift: none.

Detection:
- Flyway validate;
- clean database rebuild;
- pgAdmin Schema Diff for investigation;
- schema metadata checksum/report in CI where practical.

Response:
- shared/prod drift blocks promotion;
- do not use Flyway repair to hide an unexplained difference;
- repair requires a documented incident/reconciliation decision.
## 14. Performance policy

Performance claims require query evidence.

For important queries record:
- access pattern;
- representative row count;
- EXPLAIN / EXPLAIN ANALYZE in safe environments;
- index used;
- query latency;
- rows read vs returned.

Use pg_stat_statements for aggregate planning/execution statistics.
Indexes are reviewed for write cost as well as read benefit.
## 15. Growth thresholds

Do not pre-shard.

Escalation order:
1. fix query/model/index;
2. tune connection pools;
3. vertical DB resources;
4. archive/retention;
5. partition append-heavy tables;
6. read replicas for read pressure;
7. PgBouncer when connection pressure is measured;
8. extract domain/service only for measured scale/fault-isolation reasons;
9. sharding only with evidence that prior stages are insufficient.

This follows the accepted modular-monolith-first ADR.
## 16. Security and least privilege

Database roles are scoped to duties.
Application services do not run as database owner.

Rules:
- migration role separate from runtime role;
- read-only diagnostics role separate from DML roles;
- secrets outside Git;
- pgAdmin never exposed publicly by default;
- no Portal/Ops feature receives raw database credentials;
- production direct DBA access is exceptional and auditable at infrastructure level.
## 17. Retention and deletion

Retention is domain-specific.

Do not apply one blanket soft-delete rule.

Examples:
- active account/character state: normal mutable lifecycle;
- sessions/recovery grants: short retention after expiry/revocation;
- support data: policy-controlled;
- audit/economy ledger: append-only retention according to security/legal/operational policy;
- telemetry: separate operational retention.

Retention periods remain a product/security decision until explicitly approved.
## 18. Evidence bundle for DB tasks

Required files/records:
- task report;
- migration list and checksums;
- `flyway info`;
- `flyway validate`;
- fresh Testcontainers bootstrap;
- upgrade-path test;
- schema/ERD evidence;
- focused repository/service/API tests;
- data invariant report;
- migration timing;
- backup/rollback note;
- representative query plan if relevant;
- exact commit/push;
- immutable evidence IDs.

Do not store entire database volumes or repetitive full-source copies in repo evidence.
## 19. Database change decision record

Every significant schema change records:
- problem being solved;
- existing model;
- proposed model;
- affected Game/API/Web/Admin consumers;
- compatibility strategy;
- migration class;
- query/index implications;
- security/privacy implications;
- rollback/recovery;
- owner approval status.

This decision record is updated as game reality changes rather than forcing the game to preserve an outdated early schema.
## 20. Operational outcome

The desired developer experience is:

1. start local database stack;
2. open pgAdmin and visually inspect the real schema;
3. run Game API against the same DB;
4. change schema only through a migration;
5. run fresh + upgrade tests;
6. regenerate jOOQ types;
7. verify API/Unity/Web/Admin consumers;
8. collect compact immutable evidence;
9. commit/push;
10. promote only after gates pass.

This is the database development spine for subsequent LGO milestones.
