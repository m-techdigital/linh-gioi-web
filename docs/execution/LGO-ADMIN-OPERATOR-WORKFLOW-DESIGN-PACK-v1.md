# LGO Admin / Ops Operator Workflow Design Pack v1

Date: 2026-09-18
Status: IMPLEMENTATION DESIGN BASELINE — REAL OPS INTEGRATION NOT YET OPEN
Task: T-f7829053d3f0 — LGO-ADM-01
Umbrella Mission: MS-57a638c72421

## 1. Product role

LGO Admin is a privileged operations console.

It helps authorized staff:
- find a player/account/character;
- inspect canonical state;
- investigate support/security/game-runtime context;
- perform a small set of explicitly approved safe mutations;
- inspect the audit trail;
- operate LiveOps/world controls only after dedicated authority/runbooks exist.

It is not:
- a raw database editor;
- a SQL console;
- a generic CRUD generator;
- a substitute for pgAdmin/DBA tooling;
- an alternate player client.

## 2. Core operator personas

### Support operator
Needs:
- player lookup;
- account/character context;
- support case queue/detail;
- limited safe actions;
- audit visibility relevant to a case.

### Player operations operator
Needs:
- bounded search;
- Player 360;
- session inspection/revoke;
- approved unstuck/reset command;
- cross-links to support/audit.

### Trust & Safety reviewer
Needs:
- reports/evidence/review state;
- policy/capability context;
- sanctions only through a dedicated moderation domain;
- strict audit.

### Game operations operator
Needs:
- world/zone/channel/session health/read models;
- freshness indicators;
- incident context;
- later restart/drain/maintenance commands with runbook and blast-radius review.

### LiveOps operator
Needs:
- event version/diff;
- environment;
- schedule;
- approval;
- publish/rollback;
- audit.

### Security/administrator
Needs:
- staff accounts;
- roles/capabilities;
- staff sessions;
- audit access;
- security governance.

One staff user may hold multiple capabilities, but UI workflow remains capability-driven.
## 3. Staff identity and authorization

Staff identity is separate from player identity.

Required foundation:
- staff_users;
- staff_sessions;
- roles;
- capabilities;
- role assignments;
- role-capability mapping.

Rules:
- player credentials cannot log into Admin;
- hiding a button is not authorization;
- backend checks capability on every privileged API;
- disabled/revoked staff accounts/sessions fail server-side;
- sensitive actions may require stronger re-auth/approval later;
- session/audit context records staff actor identity.

Initial capabilities:
- player.read
- character.read
- session.read
- session.revoke
- support.read
- support.assign
- audit.read
- world.read

Later capabilities open only with their domains.
## 4. Mutation contract

Every privileged mutation defines:

- command name;
- required capability;
- target type/id;
- preconditions;
- required operator reason;
- confirmation text;
- idempotency key;
- correlation/request ID;
- resulting audit event;
- success/failure semantics;
- retry behavior;
- rollback/recovery strategy where meaningful.

No mutation is implemented as:
- direct SQL;
- PATCH arbitrary fields;
- generic “update player” form;
- hidden superuser override.

First candidate mutations:
- revoke selected player session;
- approved unstuck/reset-to-safe-checkpoint.

Both require backend domain support before UI opens.
## 5. Information architecture

Primary:
1. Control Center
2. Player Operations
3. Support
4. Trust & Safety
5. Game Operations
6. Content & LiveOps
7. Audit
8. Security & Governance

Future:
- Economy Operations
- Social/Guild Operations
- Incident/Release Operations

Home route redirects/acts as operator start context rather than a second dashboard competing with Control Center.

Navigation is capability-aware:
- unauthorized routes are absent or access-denied according to policy;
- deep links still enforce backend permission.
## 6. Control Center workflow

Operator question:
“What needs attention now, and which queue should I open?”

Real widgets may include only authoritative sources:
- support queue counts;
- trust/safety queue counts;
- world/runtime degradation;
- LiveOps scheduled/published state;
- security alerts if a canonical source exists.

Every widget shows:
- source/domain;
- freshness timestamp;
- stale/degraded state;
- required capability.

Do not show:
- fixture counts;
- guessed health;
- fake “all systems green” status.

Visual game art may orient the operator, but operational data has higher hierarchy.
## 7. Player search

Search inputs should support only indexed/canonical lookup fields:
- public account ID;
- display name only if bounded policy allows;
- character ID;
- character name according to accepted uniqueness/search policy;
- later safe identifiers such as normalized email only if staff permission/privacy policy explicitly allows.

Rules:
- bounded page size;
- server-side pagination;
- no unrestricted wildcard dump;
- no password/token/hash fields;
- no trust score unless a real moderation domain defines one;
- search reason/audit requirement may be introduced for sensitive identity searches.

Result row:
- readable player/account identity;
- character summary;
- state only if canonical;
- open Player 360.
## 8. Player 360

Player 360 is a read model over canonical domains, not a writable player table.

Initial sections:

### Account
- public account ID;
- display name;
- lifecycle state if canonical;
- created/updated.

### Characters
- character public ID;
- name;
- canonical class;
- slot;
- current known map/runtime summary;
- timestamps where useful.

### Sessions
Only after durable session domain:
- active/revoked/expired summaries;
- current/last-seen metadata allowed by privacy policy.

### Progression
Only after GAME-DATA-01.

### Inventory/equipment
Only after GAME-DATA-02.

### Support
Links to canonical support cases.

### Audit
Relevant events/correlation traces.

No credentials, tokens, password hashes or recovery secrets are ever shown.
## 9. Player 360 action rail

Actions are separated from data inspection.

Initial safe candidates:
- revoke selected session;
- unstuck character to a defined safe checkpoint.

Each action:
1. opens dedicated confirmation;
2. displays target and current state;
3. requires reason;
4. checks capability;
5. submits idempotent command;
6. renders canonical result;
7. links to audit event.

Explicitly not opened by default:
- arbitrary account suspension;
- arbitrary class change;
- arbitrary inventory grant;
- arbitrary currency set;
- arbitrary position edit;
- “fix JSON/DB” button.
## 10. Support workflow

Support remains distinct from moderation.

Flow:
queue → case detail → linked player context → assign → investigate → respond/state transition → close/reopen according to policy → audit.

Required domain concepts:
- case;
- category;
- state;
- case events/timeline;
- assignment;
- escalation;
- player/account/character references;
- public player-visible messages vs internal staff notes if introduced.

Capabilities:
- support.read
- support.assign
- later support.respond / support.transition.

Support must not:
- silently ban/suspend;
- edit inventory/currency;
- alter character state unless invoking a separately authorized safe command;
- expose moderation evidence through the player case timeline.

## 11. Trust & Safety workflow

Current route is a UX fixture only.
Real integration requires dedicated moderation domain task T-f426b7436ddf.

Flow:
report queue → report detail → evidence/context → reviewer decision → approval if required → sanction command → player notification/policy path → audit.

Required concepts:
- report;
- reporter/subject references;
- evidence references;
- review status;
- policy reason;
- sanction type/duration;
- appeal/review hooks if product later opens them.

Rules:
- support case is not a moderation report;
- trust score is not invented;
- sanctions are explicit domain commands;
- every sanction records reason/capability/correlation/audit;
- evidence access follows least privilege.

Until moderation backend exists, all enforcement controls remain blocked.
## 12. Audit workflow

Audit is append-only evidence, not an editable activity feed.

Search/filter dimensions:
- time range;
- actor;
- action;
- target type/id;
- result;
- request/correlation ID;
- source/domain.

Event detail shows:
- timestamp;
- actor;
- capability context;
- action;
- target;
- reason;
- result;
- safe metadata;
- correlation/request ID;
- source version if available.

No edit/delete controls.
Sensitive metadata is redacted by backend policy, not only UI.

Admin should deep-link from:
Player 360 action result → audit event;
Support transition → audit event;
LiveOps publish → audit event;
Trust & Safety sanction → audit event.
## 13. Game Operations — read first

Initial Game Operations is observation only.

Potential real read models:
- world/zone/channel identity;
- online/session summary;
- runtime service state;
- event state;
- build/protocol/GameData version;
- telemetry freshness.

Every value includes freshness/source.

States:
- healthy/readable;
- stale;
- partial;
- source unavailable;
- permission denied.

Do not infer “healthy” from lack of error data.

No restart/drain/kick/teleport/server-control action opens in the first read-only release.
## 14. Game Operations — future commands

Any runtime control command requires separate design/runbook.

Examples:
- drain channel;
- enter maintenance;
- restart selected process/instance;
- move players only through domain-safe migration;
- disable a broken event.

Required before UI button:
- exact capability;
- blast-radius preview;
- affected players/sessions;
- preconditions;
- confirmation phrase/reason;
- idempotency;
- rollback/recovery/runbook;
- audit;
- incident correlation.

A “Restart server” generic button is prohibited.
## 15. LiveOps workflow

Lifecycle:
draft → review → approved → scheduled/published → observed → rollback/expired.

Every content/event version has:
- immutable version ID;
- checksum;
- source/provenance;
- author;
- environment;
- schedule/timezone;
- diff;
- approval state;
- publish result;
- rollback target.

Role separation:
- author capability;
- approve capability;
- publish capability;
- rollback capability.

Do not let one fixture button imply all roles.

Client/Unity consumes published server state.
Admin edits draft/versioned content or schedule through backend contracts, never directly edits GameData files or DB rows.
## 16. Security & Governance workflow

Purpose:
- inspect staff accounts;
- roles/capabilities;
- assignments;
- staff sessions;
- governance/audit posture.

Initial operations:
- read staff/roles/capabilities;
- assign role only after capability/audit design;
- revoke staff session;
- disable staff account only with strict capability and audit.

Do not show:
- password hashes;
- raw staff tokens;
- secrets;
- DB credentials.

“Governance” is not a generic settings page for every system.
## 17. Home vs Control Center

Current Ops has both / and /control-center.

Target:
- / is a lightweight authenticated landing/resume surface;
- /control-center is the operational queue/health workspace.

Avoid duplicating the same metrics on both routes.

Home may show:
- operator identity;
- last/assigned queue shortcuts;
- notices;
- navigation.

Control Center owns live operational summaries.
## 18. Route matrix

| Route | Operator job | First real data | First real command | Dependency | Status |
|---|---|---|---|---|---|
| / | resume work | staff identity/navigation | none | ADM-02 | READY_DESIGN |
| /control-center | see what needs attention | composed live queues/read models | none initially | ADM-02/03 + opened domains | READY_DESIGN |
| /player-operations | find player | bounded player search | none | ADM-02/03/04 | READY_DESIGN |
| /player-operations/[id] | inspect Player 360 | account/characters/runtime/session read model | session revoke/unstuck later | ADM-04 then ADM-05 | READY_DESIGN |
| /audit | trace privileged/system actions | append-only audit events | none | ADM-03 | READY_DESIGN |
| /support | triage queue | support case summaries | assign later | ADM-06 | BLOCKED_BY_DOMAIN |
| /support/[id] | investigate case | case/timeline/player links | assign/transition later | ADM-06 | BLOCKED_BY_DOMAIN |
| /game-operations | inspect runtime/world | world/session/event read models | none initially | ADM-07 | BLOCKED_BY_DOMAIN |
| /game-operations/[id] | inspect one runtime surface | selected world/session state | future runbook command | ADM-07 + future command tasks | BLOCKED_BY_DOMAIN |
| /content-liveops | operate event lifecycle | version/schedule/publish state | publish/rollback later | GAME-DATA-04 + ADM-08 | BLOCKED_BY_DOMAIN |
| /security-governance | manage staff security | staff/RBAC/session/audit | role/session/admin actions later | ADM-02/03 | READY_DESIGN |
| /trust-safety | moderation review | report/evidence/review state | sanction later | T-f426b7436ddf | BLOCKED_BY_DOMAIN |
## 19. Capability matrix

| Workflow | Minimum capability |
|---|---|
| Search/view player | player.read |
| View character | character.read |
| View sessions | session.read |
| Revoke player session | session.revoke |
| View support queue/case | support.read |
| Assign support case | support.assign |
| View audit | audit.read |
| View world/runtime | world.read |
| View staff/RBAC | staff.read or governance.read — to be defined in ADM-02 |
| Manage staff roles | governance.assign — future |
| Trust & Safety review | moderation.read — future |
| Apply sanction | moderation.sanction — future |
| LiveOps view | liveops.read — future |
| Publish LiveOps | liveops.publish — future |

Capability names beyond the initial accepted set are design candidates and must be locked with the owning backend task before implementation.
## 20. Operator state matrix

Every real Ops screen must handle:

Authentication:
- no staff session;
- valid staff session;
- expired/revoked staff session;
- disabled staff account.

Authorization:
- route allowed;
- route denied;
- row/detail partially redacted;
- mutation denied.

Data:
- loading;
- empty;
- populated;
- partial source;
- stale;
- unavailable.

Mutation:
- ready;
- precondition changed;
- submitting;
- success;
- idempotent replay;
- conflict;
- permission denied;
- service unavailable;
- ambiguous/unknown result only when truly unavoidable.

Operational read models display freshness explicitly.
Fixture rows are never fallback data after a real query fails.
## 21. Confirmation pattern for risky actions

Confirmation dialog must show:
- action name;
- target name + stable ID;
- current relevant state;
- impact summary;
- required reason field;
- idempotency/request reference where useful;
- irreversible/reversible status;
- confirm/cancel.

For high-risk actions:
- require typed confirmation phrase or secondary approval only if policy calls for it;
- show blast radius;
- link runbook.

Do not use a generic “Are you sure?” modal for every privileged command.
## 22. Responsive design

Admin is desktop-first.

Primary reviewed widths:
- wide desktop;
- standard laptop;
- tablet/narrow diagnostic layout.

Rules:
- high-density tables may horizontally scroll within owned containers;
- filters/actions wrap intentionally;
- detail panes may stack on narrow screens;
- long IDs are copyable/wrappable;
- sticky headers/toolbars must not cover content.

Mobile-phone operation is not part of first-release acceptance.
The UI should fail safely/readably on narrow browsers, but risky operational commands are not considered production-supported there until separately tested.

Viewport width is not authorization; backend capability checks remain mandatory.
## 23. Visual hierarchy

Admin should feel related to LGO, but operational clarity outranks decorative game art.

Priority:
1. current operational question;
2. authoritative state/freshness;
3. action/risk boundary;
4. supporting history/context;
5. game-art/world context.

Avoid:
- giant decorative hero art above queues;
- fake dashboard metrics;
- visual status colors without text;
- one generic “admin dashboard” card grid for every workflow.

Shared WorkspaceAppShell / PageHeader / DataTable / DataList / CaseSummary / Timeline / forms remain the component foundation.
## 24. Accessibility

Required:
- full keyboard navigation;
- visible focus;
- table captions/headers;
- filter labels;
- accessible status text beyond color;
- confirmation focus management;
- error summaries;
- mutation progress announcements;
- skip navigation;
- no focus trap on blocked controls;
- reduced motion.

Operator workflows often involve long sessions; readability and focus ergonomics are production requirements.
## 25. Fixture-to-real migration

Stage A1:
- staff auth shell only;
- keep all operational data blocked.

Stage A2:
- audit foundation;
- real operator identity/capability context.

Stage A3:
- Player Search + Player 360 read-only.

Stage A4:
- first safe mutation: session revoke / approved unstuck.

Stage A5:
- support domain.

Stage A6:
- world operations read models.

Stage A7:
- moderation domain.

Stage A8:
- LiveOps.

Each route removes NO_REAL_OPS_MUTATION only for exact operations that are actually open.
## 26. Evidence plan

Design task evidence:
- route/persona/workflow matrix;
- capability/action matrix;
- state matrix;
- current fixture/source audit;
- cross-sandbox Game/backend review asks.

Implementation task evidence:
- staff auth/RBAC negative tests;
- audit event proof;
- permission-denied browser E2E;
- mutation idempotency;
- before/after canonical state;
- request/audit correlation;
- desktop/laptop/narrow visual captures;
- manual visual review;
- exact commit/push.

No production Admin mutation can close on screenshots alone.
## 27. Cross-system dependencies

Game/backend owns:
- account/character state;
- session authority;
- runtime/world read models;
- progression/inventory;
- support/moderation domain APIs where implemented;
- LiveOps authority;
- audit/domain mutation semantics.

Web/Ops owns:
- operator interaction;
- workflow/navigation;
- typed contract consumption;
- safe display/redaction;
- confirmation/retry UX.

Database tooling/pgAdmin remains separate from Admin application.
## 28. Acceptance

The Admin design pack is accepted when:
- every current Ops route has operator job/read-model/action/dependency mapping;
- staff auth is separate from player auth;
- every privileged mutation requires capability/reason/idempotency/audit;
- Player 360 is a read model, not writable aggregate table;
- Support and Trust & Safety are separate domains;
- world ops starts read-only;
- LiveOps lifecycle/version/approval is explicit;
- fixture metrics/trust/capacity do not become backend requirements;
- desktop-first responsive/a11y/state rules are explicit;
- cross-sandbox backend assumptions are reviewed or parked with explicit ASK IDs.

This document does not claim production Admin integration is active.
