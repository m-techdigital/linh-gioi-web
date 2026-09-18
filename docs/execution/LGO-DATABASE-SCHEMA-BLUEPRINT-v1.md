# LGO Database Schema Blueprint v1

Date: 2026-09-18
Status: CONCEPTUAL SCHEMA FOR OWNER REVIEW — NOT MIGRATION SQL

## 1. Scope

This blueprint defines the initial relational shape that DB-03 through DB-07 should implement.

It is intentionally split into:
- **Foundation Now** — required for auth/account/character integration;
- **Near-Term** — progression/inventory/support/admin foundations;
- **Later** — social/liveops/economy.

No future table is created merely because it appears in this blueprint.
## 2. Foundation relationship map

```text
iam.accounts
  ├──< iam.account_identifiers
  ├──1 iam.credentials
  ├──< iam.auth_sessions
  ├──< iam.recovery_challenges
  └──< player.characters
          └──1 player.character_runtime_state
```

Internal joins use UUID keys.
Public API identity uses stable public IDs.
Realtime entity ID remains separate from database identity.
## 3. iam.accounts

Purpose: canonical player account identity.

Key fields:
- `id uuid PRIMARY KEY DEFAULT uuidv7()`
- `public_id text NOT NULL UNIQUE`
- `display_name varchar(254) NOT NULL`
- `state text NOT NULL`
- `created_at timestamptz NOT NULL`
- `updated_at timestamptz NOT NULL`
- `version bigint NOT NULL DEFAULT 0`

Initial state values should remain a validated application/domain vocabulary rather than prematurely creating a PostgreSQL enum that becomes costly to evolve.
## 4. iam.account_identifiers

Purpose: login/recovery identifiers independent from account primary key.

Key fields:
- `id uuid PK`
- `account_id uuid FK -> iam.accounts(id)`
- `identifier_type text`
- `normalized_value text`
- `verified_at timestamptz NULL`
- `created_at timestamptz`

Constraint:
- UNIQUE(identifier_type, normalized_value)

Initial type: email.
Future username/provider identifiers can be added without changing account PK.
## 5. iam.credentials

Purpose: authentication credential owned by an account.

Key fields:
- `id uuid PK`
- `account_id uuid FK`
- `credential_type text`
- `password_hash text`
- `hash_scheme text`
- `created_at`
- `updated_at`

Constraints:
- one active password credential per account initially;
- no plaintext password column;
- current BCrypt encoded hashes migrate without rehash requirement.
## 6. iam.auth_sessions

Purpose: durable product sessions.

Key fields:
- `id uuid PK`
- `account_id uuid FK`
- `token_hash char(64) UNIQUE NOT NULL`
- `created_at`
- `expires_at`
- `last_seen_at`
- `revoked_at NULL`
- `revocation_reason NULL`
- safe `device_label/user_agent_hash/metadata` only after privacy review.

Indexes:
- token hash lookup;
- account active sessions partial/index strategy;
- expiry cleanup access path.

Raw token is never stored.
## 7. iam.recovery_challenges / recovery_grants

Purpose: survive restart while preserving enumeration-safe recovery.

Challenge fields:
- id;
- account_id nullable;
- identifier reference/hash;
- verification_code_hash;
- attempts;
- expires_at;
- resend_available_at;
- consumed_at.

Grant fields:
- id;
- account_id;
- reset_token_hash;
- expires_at;
- consumed_at.

Cleanup uses expiry indexes and bounded retention jobs.
## 8. player.characters

Purpose: durable character identity and account ownership.

Key fields:
- `id uuid PK DEFAULT uuidv7()`
- `public_id text UNIQUE NOT NULL`
- `account_id uuid FK`
- `slot smallint NOT NULL CHECK 1..3`
- `name varchar(16) NOT NULL`
- `normalized_name text`
- `canonical_class_id text NOT NULL`
- `realtime_entity_id bigint UNIQUE NOT NULL`
- `created_at`
- `updated_at`
- `version bigint`

Constraints:
- UNIQUE(account_id, slot);
- class ID validated against accepted canonical vocabulary;
- name uniqueness policy finalized in SYS-03/Product Bible rather than guessed.
## 9. player.character_runtime_state

Purpose: current durable reconnect state, initially Map01A-compatible.

Key fields:
- `character_id uuid PK/FK`
- `map_id text NOT NULL`
- `lane_x numeric/real according to accepted runtime precision`
- `facing smallint`
- `updated_at`
- `version bigint`

Do not persist every rendered transform/frame.
Only state required for authoritative reconnect belongs here.

Future map model may expand position/state through a compatible migration instead of replacing this table ad hoc.
## 10. Near-term progression tables

Open only with GAME-DATA-01.

Candidate structure:
- `progression.character_progression`
- `progression.chapter_progress`
- `progression.quest_progress`
- `progression.skill_progress`

Relationships:
character → progression rows by character UUID;
definitions referenced by stable GameData IDs.

Core completion/state fields remain relational.
Optional versioned metadata may use JSONB only with explicit payload version.
## 11. Near-term inventory tables

Open only with GAME-DATA-02.

Candidate structure:
- `inventory.item_instances` for unique/equipment items;
- `inventory.item_stacks` for fungible stackable items;
- `inventory.equipment_assignments`;
- `inventory.cosmetic_assignments`;
- optional `inventory.mutation_receipts` for idempotency/provenance.

Each row references a stable GameData item/template ID.
Do not copy full item definition blobs into every ownership row.
## 12. Support and admin foundation

Open with ADM-02/03/06.

Candidate tables:
- `ops.staff_users`
- `ops.roles`
- `ops.capabilities`
- `ops.staff_role_assignments`
- `ops.role_capabilities`
- `support.cases`
- `support.case_events`
- `audit.audit_events`

Player and staff identities are separate.
Support events are mutable workflow history only through accepted service transitions.
Audit events are append-only.
## 13. Transactional outbox

Candidate table:
`audit.outbox_events` or dedicated infrastructure schema after ownership review.

Fields:
- id uuid;
- topic/type;
- aggregate type/id;
- payload jsonb with version;
- occurred_at;
- published_at nullable;
- retry metadata.

Outbox records are written in the same transaction as the durable mutation they describe.
Publisher retries are idempotent.
## 14. Index policy by access path

Required initial access paths:

IAM:
- normalized identifier → account;
- token hash → active session;
- account → active sessions;
- recovery challenge/grant → expiry/lookup.

Player:
- public character ID;
- account → ordered slots;
- realtime entity ID;
- runtime state by character.

Indexes are not added “for every FK/column” blindly.
Each migration names the expected query and measures the resulting plan.
## 15. Foreign-key deletion policy

Do not default all relations to CASCADE.

Suggested principles:
- deleting an account is a controlled domain workflow, not raw SQL cascade;
- credentials/sessions can be removed/revoked as part of account lifecycle;
- characters/inventory/progression require explicit retention/deletion policy;
- audit history must preserve necessary actor/target references without depending on live FK rows indefinitely.

Actual ON DELETE rules are finalized per migration with retention requirements.
## 16. Economy blueprint

Open only in the economy phase.

Candidate tables:
- `economy.currency_accounts`
- `economy.currency_ledger`
- `economy.market_orders`
- `economy.market_trades`

Principles:
- ledger entry is immutable;
- idempotency/correlation required;
- balance update and ledger entry share one transaction;
- marketplace uses escrow semantics;
- Admin corrections are explicit audited commands, not direct row edits.
## 17. Partitioning candidates

Do not partition small core tables.

Candidates after measured growth:
- audit events;
- economy ledger;
- high-volume event history;
- operational/session history if retained long enough.

Partition key is usually time for append-heavy history.
Before partitioning, record query pattern, row count and maintenance benefit.

PostgreSQL declarative partitioning is available when needed; it is not a substitute for good indexes/modeling.
## 18. Read model policy

Portal/Admin may require aggregate read models, but they do not become new canonical write stores by default.

Options in order:
1. SQL join/projection through backend;
2. optimized query/view;
3. materialized view with refresh/provenance;
4. separately maintained read model only when measured need justifies synchronization complexity.

Player 360 is therefore an API read model over canonical domains, not one giant `player_360` table.
## 19. Schema evolution examples

### Add character level
Do not simply add a UI fixture field.
Open progression domain, add compatible relational state, migrate/default explicitly, update contract and consumers.

### Rename map identity
Add canonical map ID representation, support old IDs during compatibility window, migrate rows, switch consumers, remove old representation later.

### Add new class
Update accepted GameData/class vocabulary and compatibility tests before accepting new DB writes.

### Add item property
Prefer GameData template evolution if the property belongs to item definition; use ownership table only if it is per-instance mutable state.
## 20. Blueprint acceptance

The blueprint is accepted when:
- Game/backend architects agree Foundation Now entities match current product source;
- no table duplicates GameData definition ownership;
- public/internal/realtime IDs have clear purposes;
- session/recovery restart durability is modeled;
- schema can be rendered from live migrations through pgAdmin;
- future domains are reserved without prematurely creating their tables.

Implementation begins with DB-01/DB-02 after architecture approval.
