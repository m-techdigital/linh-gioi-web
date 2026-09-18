# LGO Cross-Sandbox Mission Collaboration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create one MCP Mission workroom for durable cross-sandbox LGO planning and review without granting cross-worktree write authority.

**Architecture:** The umbrella Mission spans the Web and Game worktrees, while existing sessions join only as coordinators because Manager source-role guards correctly prevent cross-repo executor/reviewer authority. Mission Thread, decisions, evidence references and safe chat delivery provide the shared communication channel; repo-local task execution remains authoritative.

**Tech Stack:** MCP Session Manager Mission API, Remote Desktop Commander, Git.

**Spec:** `docs/superpowers/specs/2026-09-18-lgo-cross-sandbox-mission-collaboration-design.md`

## Global Constraints

- Do not change either session's declared worktree.
- Do not interrupt `S-LGO-HUB-20260917-D4F1` current `LGO-UIF-10` task.
- Do not create duplicate Game implementation work.
- Do not bypass Mission source-role scope guards.
- Do not directly edit Manager SQLite.
- Mission delivery must use the existing safe SessionHub transport.
- Initial shared evidence references are the immutable architecture/task-catalog/roadmap artifacts from Web commit `31c8200c7b5eddf48afb56bfe8d452338748e42f`.

---

### Task 1: Persist Mission collaboration authority

**Files:**
- Create: `docs/superpowers/specs/2026-09-18-lgo-cross-sandbox-mission-collaboration-design.md`
- Create: `docs/superpowers/plans/2026-09-18-lgo-cross-sandbox-mission-collaboration.md`

**Interfaces:**
- Consumes: approved architecture baseline and current Session Manager Mission capability.
- Produces: version-controlled collaboration rules used by Mission messages/decisions.

- [ ] Verify docs contain no placeholders or conflicting source-role guidance.
- [ ] Run `git diff --check`.
- [ ] Commit and normal-push docs-only baseline.

### Task 2: Create umbrella Mission and participants

**Files:** No repository source changes.

**Interfaces:**
- Consumes: Mission API `mission.create`, `mission.participant.add`.
- Produces: one Mission ID with Web and Game sessions as coordinator participants.

- [ ] Re-check both sessions for pause/recovery/current task.
- [ ] Create ACTIVE high-priority Mission covering the two declared worktrees.
- [ ] Add Web session with role `coordinator`.
- [ ] Add Game session with role `coordinator`.
- [ ] Confirm participant list; do not assign cross-repo source roles.

### Task 3: Seed shared baseline and decisions

**Files:** No repository source changes.

**Interfaces:**
- Consumes: Mission Thread and Decision APIs plus immutable evidence IDs.
- Produces: durable baseline discussion and decided collaboration rules.

- [ ] Post a Mission Thread handoff containing Web baseline commit, Game authority commit, architecture evidence IDs, current UIF-10 status and SYS-01 successor intent.
- [ ] Record decision: umbrella Mission coordinates; source writes remain repo/session-local.
- [ ] Record decision: current UIF-10 is not interrupted; SYS-01 is next shared planning target after closure.
- [ ] Record decision: approved database/system architecture baseline is `31c8200...`.

### Task 4: Deliver and verify cross-sandbox communication

**Files:** No repository source changes.

**Interfaces:**
- Consumes: `mission.delivery.request`.
- Produces: safe SessionHub delivery to Game sandbox and verifiable Mission workspace/history.

- [ ] Queue the baseline Mission message to `S-LGO-HUB-20260917-D4F1`.
- [ ] Confirm delivery record exists without changing the Game task.
- [ ] Read Mission workspace/thread/history as Web participant.
- [ ] Update Web session result/next with Mission ID and coordination protocol.
