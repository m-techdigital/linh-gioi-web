# LGO Web Client & Admin Product Design Program v1

Date: 2026-09-18
Status: DESIGN BACKLOG FOR OWNER REVIEW

## Design rule

Do not design from fixture copy outward.
Design from:
**user/operator scenario → authoritative data → action/permission → states → layout → evidence**.

Existing Portal/Ops UI is a reusable foundation, not final product authority.

## Player Web product role

Player Web is a companion portal, not browser gameplay.

Primary navigation target:
- Tổng quan
- Nhân vật
- Tiến trình
- Hành trang & Trang bị
- Bạn bè / Bang hội
- Sự kiện
- Hỗ trợ
- Tài khoản & Bảo mật

Routes remain hidden/blocked until their contract exists.
## Player flow P1 — Access

Screens:
- Login
- Register
- Recovery request
- Recovery verify/reset
- Access/session-expired handoff

Required states:
idle, submitting, success, invalid input, invalid credentials, duplicate identifier, rate limited, recovery unavailable, expired grant, network/offline.

Design evidence:
- desktop + mobile layouts;
- keyboard/focus flow;
- error placement;
- password/recovery privacy review;
- contract code → UI state map.
## Player flow P2 — Account & Security

Screens:
- Account overview
- Security posture
- Session list
- Revoke session confirmation

Data:
display identity, verified identifiers when contract exists, created time, session/device metadata allowed by privacy policy.

Design must not invent:
trust score, verification state, device location precision or security status not owned by backend.

Evidence:
- 0/1/many sessions;
- current/expired/revoked state;
- long device labels;
- confirmation/error states.
## Player flow P3 — Character

Screens:
- roster;
- empty slots;
- character detail.

Data:
name, slot, canonical class, current known zone/map, future progression/loadout only after their domains exist.

Required scenarios:
0/1/2/3 characters, legacy-migrated class, missing character, ownership failure, server unavailable.

Visual design:
game identity can be rich, but art must never replace missing data or imply equipment/progression that backend does not own.
## Player flow P4 — Journey / Progression

Opens only after GAME-DATA-01.

Screens:
- current chapter;
- current objective;
- completed milestones;
- class progression;
- next recommended activity.

States:
new character, tutorial in progress, chapter complete, no active objective, data version mismatch/degraded.

The Portal is read-oriented; it does not advance quests by clicking UI.
## Player flow P5 — Inventory / Equipment

Opens only after GAME-DATA-02.

Screens:
- equipped loadout;
- inventory summary/grid;
- item detail;
- cosmetic appearance summary.

Required:
pagination, empty category, locked/unavailable slot, stale item version, large inventory.

No Web equip mutation in first release unless separately designed and authorized.
## Player flow P6 — Support

Opens with the real Support domain.

Screens:
- choose topic;
- create case;
- own-case list;
- case detail/timeline;
- recovery/support handoff.

Required design:
privacy notice, account/character linkage, attachment policy if ever opened, status wording, retry behavior, closed/reopened semantics.

Evidence:
player can understand who owns the next action without seeing operator-only metadata.
# Admin product role

Admin is a secure operations console, desktop-first.

Primary navigation target:
- Control Center
- Player Operations
- Sessions
- Support
- Trust & Safety
- Audit
- World Operations
- Content & LiveOps
- Economy later
- System Health

The Admin UI never exposes generic SQL/database editing.
Database administration remains pgAdmin/DBA scope.
## Admin flow A1 — Control Center

Questions answered:
- what needs attention now?
- what is degraded?
- what queue needs operator action?
- what game/world state is noteworthy?

Data must be real and timestamped.
Every widget shows freshness/source.

States:
healthy, warning, partial outage, stale source, no permission, empty queue.

No fake operational counts.
## Admin flow A2 — Player Search / Player 360

Flow:
search account/character/public ID
→ open Player 360
→ account summary
→ characters
→ sessions
→ progression/inventory summaries when available
→ support/audit links.

Required:
bounded search, pagination, permission-aware redaction, stable canonical IDs, copied correlation/request IDs.

Never show password hashes, raw tokens, recovery codes or secrets.
## Admin flow A3 — Safe Player Action

First actions:
- revoke session;
- approved unstuck/reset state.

Flow:
inspect context
→ choose action
→ capability check
→ enter reason
→ confirmation
→ idempotent command
→ result
→ audit link.

Required states:
forbidden, stale state, already applied, conflict, backend error, success.

No generic free-form database mutation.
## Admin flow A4 — Support Triage

Flow:
queue
→ case detail
→ linked player context
→ assignment
→ escalation
→ response/state transition
→ audit trail.

Design must distinguish:
support assistance, security recovery, moderation and technical incident.

Do not place ban/sanction controls inside support merely because operator context is available.
## Admin flow A5 — Audit

Screens:
- audit search/filter;
- event detail;
- correlation/request trace.

Filters:
time, actor, action, target, result, request/correlation ID.

Design:
append-only semantics visible;
no edit/delete controls;
sensitive metadata redacted;
links back to Player/Support/World context when permission permits.
## Admin flow A6 — World Operations

Read-only first:
- world/zone/channel status;
- session/load summary;
- event state;
- telemetry freshness.

Mutation later:
restart/drain/maintenance actions require separate design, capability, confirmation, reason, blast-radius preview and rollback/runbook.

No world control button is enabled merely because a UI fixture exists.
## Admin flow A7 — Content & LiveOps

Lifecycle:
draft
→ review
→ approved
→ scheduled/published
→ observed
→ rollback if necessary.

Design requirements:
version/checksum,
environment,
schedule/timezone,
diff preview,
author vs publisher capability,
confirmation,
rollback target,
audit.

Player/Unity consumes published server state only.
## Design deliverable template for every screen/workflow

Each design task must provide:
1. scenario/user or operator job;
2. entry/exit route;
3. authoritative data fields;
4. command/action list;
5. permission ownership;
6. loading/empty/error/offline/stale states;
7. confirmation/undo/retry behavior;
8. desktop/mobile or desktop/tablet layout target;
9. accessibility/focus behavior;
10. data density/long-content cases;
11. telemetry/audit expectations;
12. visual reference and component reuse;
13. acceptance checklist;
14. evidence capture list.

Implementation cannot start from a single “happy-path” mockup.
