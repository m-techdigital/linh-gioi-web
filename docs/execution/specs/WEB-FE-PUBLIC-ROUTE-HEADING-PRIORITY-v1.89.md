# WEB-FE-PUBLIC-ROUTE-HEADING-PRIORITY-v1.89

Status: WEB_CLOSED.

## SELECT

Selected from `WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.89` after browser heading-order audit found four remaining public routes where the first visible main heading was a CTA h2 instead of the page h1: `/accessibility`, `/community`, `/game/loop` and `/performance`.

## SPEC_LOCK

Scope is FE-only heading priority and layout order. Each selected route must start main content with exactly one visible h1 before reusable CTA sections. The fix must preserve existing non-claims and must not add backend, CMS, auth, forms, fake fetches or fixture mutations.

## IMPLEMENT

Moved the shared release CTA below each page hero so the semantic reading order starts with the route title while keeping the CTA near the top of the page.

## SOURCE_VERIFY

Required source evidence:

- `tools/validate_web_fe_public_route_heading_priority_v189.py`
- `tests/e2e/fe-public-route-heading-priority-v189.spec.ts`
- route source order checks for h1 before `PlayerTrustReleaseCta`

## RUNTIME_VERIFY

Required runtime evidence: Playwright desktop and mobile e2e checks for first heading, h1 count, horizontal overflow and visible font cap.

## VISUAL_REVIEW

Visual review is covered by the same browser/e2e metrics. The task does not introduce new art; real design image usage remains in the existing page design boards and upcoming UI asset tasks.

## HANDOFF

No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.
