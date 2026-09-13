# WEB Shared Data Display Foundation v1.30 — Design

## Goal
Create a reusable, neutral data-display foundation in `packages/ui` before Portal/Ops introduce independent metric/table/toolbar/pagination patterns.

## Shared API

`packages/ui/src/data.tsx` owns:
- `MetricGrid` / `MetricCard`
- `DataToolbar`
- `DataTable`
- `PaginationBar`

`packages/ui/src/data.css` owns shared responsive styling and is exported as `@lgo-web/ui/data.css`.

`DataTable` is presentation-only: it accepts column definitions and ReactNode cells. It does not define account/character/player/ops DTOs and therefore does not compete with future canonical backend contracts.

## Consumers

- Portal `/characters`: fixture metrics + fixture character rows, explicitly non-canonical and non-persistent.
- Ops `/player-operations`: fixture metrics + fixture player-operation rows, explicitly no real mutation/query/RBAC contract.
- Public Web remains unchanged; the shared data primitives are available for future public lists/rankings only when product scope justifies them.

## Safety

- No API fetch, pagination backend or mutation.
- No canonical player/character DTO.
- Pagination controls are disabled fixtures.
- Fixture rows carry explicit non-claim/status language.

## Verification

Use TDD source validator, targeted UI/Portal/Ops lint+typecheck, then one Portal and one Ops production build at closure. Reuse unchanged Public evidence.
