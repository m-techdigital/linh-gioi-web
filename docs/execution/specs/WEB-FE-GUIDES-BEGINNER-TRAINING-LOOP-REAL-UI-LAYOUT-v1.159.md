# WEB-FE-GUIDES-BEGINNER-TRAINING-LOOP-REAL-UI-LAYOUT-v1.159

Status: WEB_CLOSED.

Task ID: WEB-FE-GUIDES-BEGINNER-TRAINING-LOOP-REAL-UI-LAYOUT-v1.159.

Scope: close only `/guides/beginner-training-loop-guide` as the current page from `WEB-NEXT-ACTION`. The page must use Real Browser UI/UX Layout First, with design target only as a comparison guardrail and Base First before any local CSS/component work.

Implementation requirements:

- Render `/guides/beginner-training-loop-guide` with a Vietnamese beginner training scenario instead of placeholder English, limited to the current page because the placeholder blocked meaningful browser comparison.
- Keep the generic guide detail route and reuse the shared detail layout. Add only slug composition classes for the compact training flow.
- Put reusable compact guide-flow density, hero CTA compression, guide-step grid and generic CTA rhythm in `packages/ui/src/service-layout.css`.
- Do not add current-page CSS to `apps/web/src/app/globals.css`.
- Verify desktop and mobile layout with browser/e2e metrics, screenshot evidence, source validator, typecheck, build and current-state validator.

Non-claims: NO_ACCEPTED_BACKEND_CONTRACT; no production auth, no DB persistence, no real Portal/Ops integration, no public build, no launcher, no combat, no rewards, no inventory, no account progression backend.
