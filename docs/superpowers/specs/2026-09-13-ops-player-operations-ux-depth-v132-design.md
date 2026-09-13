# Ops Player Operations UX Depth v1.32 — Design

## Goal
Deepen Ops/Admin player review UX from a flat fixture table into a coherent list → detail → activity review journey without introducing real moderation, RBAC, audit or API behavior.

## Base First
Add neutral `ActivityTimeline` and `ActivityTimelineItem` presentation primitives to `packages/ui`. Ops fixture records remain under `apps/ops/src/lib` and do not define canonical player/audit DTOs.

## Ops journey
- `/player-operations`: fixture player review table with safe navigation into a detail surface.
- `/player-operations/[id]`: fixture Player 360 review using shared key/value detail + activity timeline + disabled actions.
- `/audit`: reuse the shared activity timeline for audit-event presentation rather than creating a second app-local timeline pattern.

## Boundaries
- No real player query API.
- No DB mutation.
- No real moderation/ban/suspension action.
- No canonical RBAC/audit/player DTO.
- No live audit event store.

## Verification
Dedicated v1.32 validator, UI/Ops lint+typecheck, master validators, one Ops production build at closure and route smoke from the same output.
