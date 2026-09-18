# LGO DB-01 Local PostgreSQL + pgAdmin Implementation Readiness Runbook v1

Date: 2026-09-18
Status: IMPLEMENTATION-READY PLAN — GAME SOURCE NOT MODIFIED BY THIS TASK
Task: `T-365e3e605441 — LGO-W0-WEB-04`
Target implementation owner: Game lane `T-ece40c175753 — LGO-DB-01`
Umbrella Mission: `MS-57a638c72421`

## 1. Objective

DB-01 establishes a real local database-management environment before production schemas are opened:

- PostgreSQL 18;
- pgAdmin 4;
- persistent local volumes;
- localhost-only host exposure;
- deterministic start/stop/status commands;
- safe local secrets;
- live database browsing;
- pgAdmin ERD visual workflow, including drag/drop design smoke;
- compact runtime/evidence gates.

DB-01 does **not** migrate the JSON prototype, create production IAM tables, or add Flyway/jOOQ dependencies. Those belong to DB-02+.
## 2. Verified local environment

Observed on the authorized development Mac:

- macOS Darwin arm64 / Apple Silicon;
- Docker client/server 29.7.2;
- Docker Compose v5.3.1;
- Docker daemon architecture `aarch64`;
- 10 Docker-visible CPUs;
- about 8.3 GB Docker-visible memory;
- no active Compose projects at audit time;
- ports 5432 and 5050 were free at audit time;
- Game `infra/` contains only `.gitkeep`;
- Game server has no current JDBC/PostgreSQL/Flyway/jOOQ/Testcontainers dependencies.

This means DB-01 can be introduced without reconciling an existing database stack.
## 3. Pinned local image baseline

Verified against current official releases on 2026-09-18.

### PostgreSQL

Version: **18.6**

Compose image reference:

`postgres:18.6@sha256:4ef4dbc939d61acea57712655ddb4b4ab27419c913f94cca0cd57cb3ea3c2280`

This is the multi-architecture manifest-list digest; the current Mac selects the verified `linux/arm64/v8` image.

### pgAdmin

Version: **9.18**

Compose image reference:

`dpage/pgadmin4:9.18@sha256:c332c5f6dfba995d9ebc4af261d93506d6876085d712eaaa3defc8dd1a3f26de`

The manifest includes verified `linux/arm64` and `linux/amd64` variants.

### Pin rule

DB-01 implementation records both:
- human-readable version tag;
- immutable pulled manifest/image digest in evidence.

Do not replace these with `latest`.

Minor-version upgrade later is its own reviewed dependency update.
## 4. Proposed Game-repo file map

DB-01 implementation should stay narrow.

Create:
- `infra/database/compose.yaml` — PostgreSQL + pgAdmin local services.
- `infra/database/.env.example` — variable names and non-secret guidance only.
- `infra/database/pgadmin/servers.json` — safe local server registration without password.
- `infra/database/README.md` — developer visual-management instructions.
- `tools/lgo_db_local.sh` — single lifecycle entrypoint.
- `tools/validate_lgo_db_local_stack.py` — static/source/config validator.
- `tools/test_validate_lgo_db_local_stack.py` — validator tests.

Modify:
- root `.gitignore` — ignore `infra/database/.env.local` and local DB evidence/backups when needed.
- `server/.env.example` only if DB-01 chooses to expose future DB variable names; do not connect the API yet.
- governance/next-action docs only for normal task evidence/closure.

Do not modify:
- JSON persistence implementations;
- ProductAuth/ProductCharacter API behavior;
- GameData;
- Unity;
- protocol;
- production deployment configuration.
## 5. Local secret/env contract

Committed `.env.example` defines names without usable secret values:

- `LGO_DB_NAME=linhgioi_dev`
- `LGO_DB_USER=lgo_local_admin`
- `LGO_DB_PASSWORD=`
- `LGO_DB_PORT=5432`
- `LGO_PGADMIN_EMAIL=`
- `LGO_PGADMIN_PASSWORD=`
- `LGO_PGADMIN_PORT=5050`

Local developer copies it to:

`infra/database/.env.local`

Rules:
- `.env.local` is gitignored;
- startup fails if password/email/password are blank;
- no password appears in compose source, docs evidence, screenshots or command output;
- production/staging secrets do not reuse this local file.
## 6. Compose service contract

### Service: postgres

Requirements:
- pinned PostgreSQL image/digest from section 3;
- environment sourced from local env;
- database `linhgioi_dev`;
- named persistent volume `lgo_postgres_data`;
- dedicated network `lgo_database`;
- host binding only:
  `127.0.0.1:${LGO_DB_PORT}:5432`;
- health check using `pg_isready` with configured DB/user;
- UTF-8/default PostgreSQL initialization;
- no production tuning in DB-01.

DB-09 owns measured query/tuning changes. DB-01 must not pre-optimize arbitrary PostgreSQL settings.

### Service: pgadmin

Requirements:
- pinned pgAdmin image/digest from section 3;
- `PGADMIN_DEFAULT_EMAIL` / `PGADMIN_DEFAULT_PASSWORD` from local env;
- named persistent volume `lgo_pgadmin_data`;
- same dedicated network;
- host binding only:
  `127.0.0.1:${LGO_PGADMIN_PORT}:80`;
- startup depends on PostgreSQL health;
- safe `servers.json` registers host `postgres`, port 5432, maintenance DB/name/user but stores no password.

Do not publish PostgreSQL or pgAdmin on `0.0.0.0`.
## 7. Developer command contract

One supported entrypoint:

`./tools/lgo_db_local.sh <command>`

Required commands:

### `up`
- validate `.env.local`;
- fail if required secrets are blank;
- verify ports are available or already owned by this compose project;
- run Compose project `lgo-db-dev`;
- wait for PostgreSQL healthy and pgAdmin running;
- print only safe URLs/status.

### `status`
- show compose service state/health;
- show PostgreSQL server version;
- do not echo secrets.

### `logs [postgres|pgadmin]`
- bounded service logs;
- secret filtering where applicable.

### `psql`
- attach an interactive or one-shot psql to the container without requiring a host PostgreSQL installation.

### `down`
- stop/remove containers/network only;
- **must not delete volumes**.

### `restart`
- normal down/up preserving volumes.

### `reset --confirm`
- destructive local-only command;
- requires explicit confirmation flag;
- may delete DB/pgAdmin named volumes;
- refuses execution without confirmation.

Backup/restore commands may be included for a local smoke, but DB-08 remains the authority for the full recovery workflow.
## 8. pgAdmin visual-management workflow

The owner requirement is not satisfied by “database starts successfully.” The DB must be directly inspectable.

### DB-01 live-management proof

1. Run `./tools/lgo_db_local.sh up`.
2. Open `http://127.0.0.1:5050`.
3. Sign in using local pgAdmin credentials from `.env.local`.
4. Confirm Object Explorer can browse:
   - registered LGO Local server;
   - database `linhgioi_dev`;
   - schemas;
   - tables/views when later migrations create them.
5. Open Query Tool and run:
   - `SELECT version();`
   - `SELECT current_database();`
   - `SELECT current_user;`
6. Open ERD Tool from the live database/schema context.
7. For DB-01 only, prove drag/drop design capability on an **unsaved scratch ERD canvas**:
   - add two temporary design-only tables such as `demo_account` and `demo_character`;
   - connect a FK relation;
   - move/rearrange the tables;
   - generate SQL from the design;
   - capture evidence;
   - discard the scratch design without applying it to the canonical DB.
8. Save/export a pgAdmin ERD project only if it contains no credentials/secrets.

### Real production-shape ERD evidence

DB-03, not DB-01, owns the first real relationship ERD:
- IAM tables created by Flyway;
- generated live from the actual migrated DB;
- expected PK/FK/unique lines visible;
- representative row inspection;
- evidence captured after tests.

This prevents a fake demo schema from becoming accidental product authority.
## 9. Persistence smoke without fake production schema

DB-01 still needs to prove volume persistence.

Use a temporary smoke object in an isolated scratch schema:

`db01_smoke.persistence_probe`

Procedure:
1. create scratch schema/table;
2. insert one known random/non-secret marker;
3. run normal `restart`;
4. query the marker and prove it survived;
5. drop the scratch schema;
6. verify `linhgioi_dev` remains available;
7. run `down` and confirm named volumes still exist.

The scratch schema is evidence infrastructure only and must be removed before closure.

Do not create IAM/player tables before DB-03.
## 10. Security and resource rules

### Local exposure
- PostgreSQL binds only to `127.0.0.1`.
- pgAdmin binds only to `127.0.0.1`.
- no router/LAN/public bind in DB-01.
- no production credentials.

### Privilege
DB-01 may bootstrap with one local administration role because application schemas do not yet exist.

DB-02/03 must introduce separate roles:
- migrator/DDL;
- API runtime DML;
- readonly diagnostics as required.

The application must not remain on local superuser credentials once integration begins.

### Resource discipline
- only one `lgo-db-dev` compose project;
- do not launch one DB stack per test;
- Testcontainers later owns ephemeral per-test DBs;
- no premature Postgres tuning in DB-01;
- stop the local stack when not needed if machine pressure matters;
- do not delete volumes just to reclaim RAM; stopped containers consume disk, not active runtime memory.

### Secret discipline
- no password in Git;
- no password in screenshot evidence;
- no copy of `.env.local` in handoff;
- logs are reviewed/redacted before evidence registration.
## 11. DB-01 static validation gates

The Game implementation task should add a validator that fails when:

- image tag uses `latest`;
- expected exact version/digest markers are missing;
- postgres port binds `0.0.0.0` or bare host port;
- pgAdmin port binds `0.0.0.0` or bare host port;
- compose hard-codes passwords;
- `.env.local` is not ignored;
- pgAdmin `servers.json` contains a password;
- `down` command deletes volumes;
- `reset` does not require explicit confirmation;
- stack/service names drift from the runbook;
- DB-01 introduces JDBC/Flyway/jOOQ or production schema changes outside scope.

Validator tests must include deliberate RED fixtures for at least:
- public bind;
- floating image;
- hard-coded password;
- destructive down/reset behavior.
## 12. DB-01 runtime acceptance sequence

Run from exact Game source:

1. static validator/unit tests RED→GREEN;
2. shell syntax check for `tools/lgo_db_local.sh`;
3. verify Docker daemon/Compose availability;
4. inspect pinned image manifests for current architecture;
5. `up`;
6. `status`;
7. PostgreSQL health/version query;
8. pgAdmin HTTP reachability;
9. manual/browser pgAdmin login;
10. Object Explorer inspection;
11. Query Tool smoke;
12. ERD Tool scratch drag/drop/FK/generate-SQL proof;
13. scratch persistence probe across `restart`;
14. scratch cleanup;
15. `down` without `-v`;
16. verify named volumes remain;
17. `up` again and verify DB available;
18. final `down`;
19. secret scan;
20. git diff/source-scope audit.

DB-01 does not need Unity Player build because no player-visible Game behavior changes.
## 13. Required evidence bundle

Keep evidence compact.

Machine/runtime:
- Docker/Compose versions;
- host architecture;
- image refs + manifest digests;
- `docker compose ps`;
- PostgreSQL `SELECT version()`;
- service health output;
- port/listener proof showing localhost-only exposure;
- restart persistence probe result.

Visual:
- pgAdmin login/home after connection;
- Object Explorer showing LGO Local / `linhgioi_dev`;
- Query Tool result;
- ERD canvas with two design-only scratch tables and FK;
- generated SQL preview from the scratch ERD.

Source:
- validator RED/GREEN logs;
- changed-file list;
- secret scan;
- exact commit;
- local/origin/remote equal.

Do not store:
- full database volumes;
- raw secret env files;
- multi-gigabyte screenshot trees;
- Docker image tarballs.
## 14. Interaction with current Game SYS-02 audit

Game checkpoint `MM-77bcafc34839` confirms:

- `players-v4.json` owns account profiles, characters, legacy XYZ/yaw and Map01A lane/facing runtime state;
- `auth-credentials-v1.json` owns product identifier/password hashes;
- registration currently coordinates both stores with compensating delete;
- auth sessions and recovery grants/challenges are memory-only;
- realtime movement/combat state is server-authoritative but non-durable;
- inventory/progression/equipment have no server durable store today;
- GameData YAML/registry is content authority;
- legacy XYZ/yaw and Map01A lane/facing are separate compatibility representations.

DB-01 must **not** migrate or normalize any of these.

Impact on later tasks:
- DB-03/04 should make account + identifier + credential registration one relational transaction rather than preserving the cross-file pseudo-transaction.
- DB-05 makes session/recovery state durable.
- DB-06 must preserve both legacy position representation and Map01A state compatibility until an explicit migration closes one.
- GAME-DATA-01/02 open progression/inventory authority later.
## 15. Scalability/evolution stance

DB-01 optimizes for a clean, evolvable development platform rather than speculative scale.

Do now:
- stable PostgreSQL major/minor;
- persistent volume;
- explicit network/ports;
- visual management;
- deterministic lifecycle;
- migration-ready file layout;
- evidence and secret hygiene.

Do later with evidence:
- Flyway/Testcontainers/jOOQ (DB-02);
- schemas/roles/transactions (DB-03+);
- query/index measurement (DB-09);
- PgBouncer/read replicas/partitioning only after measured need;
- production managed-PostgreSQL/HA decision in DB-11.

Do not introduce Redis, Kafka, MongoDB, sharding or microservice persistence in DB-01.
## 16. Exact implementation handoff to Game sandbox

When `T-ece40c175753 — LGO-DB-01` becomes dependency-ready, Game sandbox should:

1. re-read current `origin/feature/2d`;
2. compare actual repo state to this runbook;
3. post a Mission START message;
4. create RED static validator cases first;
5. implement only DB-01 file map;
6. run runtime stack and visual pgAdmin evidence;
7. post any deviation/question into Umbrella Mission;
8. commit/push exact source;
9. register immutable evidence;
10. close DB-01 and advance to DB-02 automatically if no unresolved blocker.

If the selected Docker image/version changed upstream, do not silently float. Post a dependency-update finding and record the new version/digest explicitly.
## 17. Official version references

Verified on 2026-09-18:

- PostgreSQL versioning policy/current 18 minor: https://www.postgresql.org/support/versioning/
- PostgreSQL 18.6 release notes: https://www.postgresql.org/docs/release/18.6/
- pgAdmin 4 current documentation/releases: https://www.pgadmin.org/docs/
- pgAdmin 4 v9.18 release notes: https://www.pgadmin.org/docs/pgadmin4/9.18/release_notes_9_18.html
- pgAdmin ERD Tool: https://www.pgadmin.org/docs/pgadmin4/9.18/erd_tool.html
- pgAdmin container deployment: https://www.pgadmin.org/docs/pgadmin4/9.18/container_deployment.html

Current tool/image facts were also verified directly on the authorized Mac/Docker daemon rather than inferred from documentation alone.
## 18. Readiness verdict

DB-01 is implementation-ready when this runbook is accepted into the execution baseline.

No unresolved Game SYS-02 finding blocks **infrastructure setup** because DB-01 does not change product data ownership.

Schema migration remains correctly gated to later tasks.

The Game DB-01 implementation must still revalidate:
- current branch/worktree;
- image availability/digests;
- port availability;
- no conflicting DB stack;
- Mission decisions;
before source mutation.
