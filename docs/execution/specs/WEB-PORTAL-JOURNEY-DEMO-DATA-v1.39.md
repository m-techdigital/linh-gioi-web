# WEB-PORTAL-JOURNEY-DEMO-DATA-v1.39

Status: WEB_TASK_CONTINUE.

Goal: continue front-end progress while backend integration remains blocked by
adding a Portal journey demo backed only by fixture data.

## Allowed Scope

- Add a Portal `/journey` route.
- Add provisional journey fixture data under `apps/portal/src/lib`.
- Reuse shared UI primitives from `packages/ui`.
- Add browser/e2e layout checks for typography, overflow and non-operational
  behavior.
- Copy selected game-art derivatives into Portal public assets with manifest and
  SHA provenance.

## Forbidden Scope

- No independent backend.
- No production auth.
- No DB persistence.
- No real Portal integration.
- No API fetch, route handler, form submit, server action or mutation.
- No canonical DTOs derived from fixture data.

## Fixture Markers

- `PROVISIONAL_WEB_FIXTURE`
- `NOT_CANONICAL_BACKEND_CONTRACT`
- `NO_ACCEPTED_BACKEND_CONTRACT`

## Asset Scope

Portal uses three `game-art` assets copied from the existing audited web art
manifest: Đông Môn world concept, Võ starter development art, and Võ skill
development art. These are visual design material for the Portal demo, not
production gameplay screenshots.

## Browser Layout Requirement

The browser/e2e test must check desktop and mobile rendering, including heading,
paragraph and button font sizes. The route must not overflow horizontally, and
the layout must remain readable without hero-scale typography inside dashboard
surfaces.
