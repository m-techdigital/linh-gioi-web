# LGO Cross-Sandbox Mission Collaboration Design

Date: 2026-09-18
Status: OWNER APPROVED

## Goal

Create one durable MCP Session Manager Mission where the active LGO Web/coordinator sandbox and Game sandbox can discuss architecture, exchange findings, record decisions, share evidence, and coordinate successor work without either sandbox writing outside its declared worktree.

## Participants

- `S-LGO-WEB-20260916-E6A1` — coordinator for system architecture, database, contracts, Player Web/Admin planning.
- `S-LGO-HUB-20260917-D4F1` — coordinator for current Game authority, Unity/runtime and Java backend impact.
- Operator remains the Mission-level authority for participant, delivery, decision and task-link operations.

Initial Mission scope covers:
- `/Users/minhdc/Projects/LinhGioiOnline-Web`
- `/Users/minhdc/Projects/LinhGioiOnline/.worktrees/character-hub-v22`

## Important Manager scope constraint

Mission source roles `executor/reviewer/auditor` require the participant session to cover the Mission source scope in its registered worktrees. The Web and Game sessions intentionally own different worktrees, so the umbrella Mission MUST NOT bypass this guard by changing session worktrees or assigning cross-repo source roles.

Therefore:
- both current sessions participate as `coordinator`;
- they use Mission Thread, Decisions, History, Evidence references and safe Chat delivery for cross-sandbox collaboration;
- source execution remains in the authoritative task/session for that repo;
- if formal Mission review/finding lifecycle is required for a repo task, create a repo-scoped child Mission whose source scope fits executor/reviewer session declarations rather than weakening umbrella scope controls.

## Collaboration protocol

Before a cross-system change:
1. executor/coordinator posts intent, current authority and impacted contracts in Mission Thread;
2. other coordinator reads source impact and replies in the thread;
3. unresolved product/architecture choices become Mission Decisions;
4. accepted decision is recorded before implementation changes shared contracts;
5. implementation occurs only in the owning worktree/session;
6. evidence IDs and exact commits are posted back to Mission;
7. other coordinator posts review notes/findings in Mission Thread;
8. source task closes only after required review opportunity and task-local evidence gates.

For a task marked `NO_CROSS_SYSTEM_IMPACT`, Mission review may be informational only.

## Initial baseline

Approved planning baseline:
- Web commit `31c8200c7b5eddf48afb56bfe8d452338748e42f`
- system/database architecture design evidence `5f91f6191bf8483c8aa63c8a29f95a2d`
- unified implementation catalog evidence `4d5196f4c74a4e84820fb5a25e5ce940`
- unified roadmap evidence `3a3a1274527344af86e7dd9a36647f0d`

Game authority observed at Mission setup:
- `origin/feature/2d = 7636ddd41d6773ef39a600308e040b68eca2830c`
- current Game task remains `LGO-UIF-10 · Authoritative fidelity/device gates`.

Mission setup MUST NOT interrupt or replace UIF-10.

## First coordinated successor

After UIF-10 closes, the shared planning target is `SYS-01 — Product Bible v2 Conflict Closure`.

Fresh source reconciliation already shows:
- Shadow Slime combat is aligned across current GDD/Direction Lock/Map A-Z; the old conflicting scenario-bible file is no longer active at its former path;
- backend supports canonical runtime class IDs `vo/kiem/phap/co/linh`;
- remaining SYS-01 work is primarily Founder Alpha class staging, stable machine world/map ID policy, and an explicit Product Bible/supersession register.

## Acceptance

Mission setup is accepted when:
- one active Mission exists with both scope worktrees;
- both sessions are active participants without expanding their worktree permissions;
- initial architecture baseline is posted with evidence references;
- the message is queued/delivered to the Game session through Mission delivery;
- architecture/collaboration decisions are recorded;
- Game current task remains unchanged;
- Mission workspace/history shows both participants and the baseline discussion.
