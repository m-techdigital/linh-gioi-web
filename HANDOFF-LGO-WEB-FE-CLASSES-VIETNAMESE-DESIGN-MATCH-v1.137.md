# HANDOFF-LGO-WEB-FE-CLASSES-VIETNAMESE-DESIGN-MATCH-v1.137

Status: WEB_CLOSED.

## Handoff

`/classes` is the current completed page slice under Sequential Page Completion. Continue only after this commit is pushed. The next task advances to v1.138 and selects `/journey` as the next single page slice, using its registered Public Journey design target before implementation.

## What changed

- Design Target First: Public Classes target was reviewed and retained because it is Vietnamese, coherent with the Linh Giới scenario, and suitable as the `/classes` destination.
- UI/UX Layout: `/classes` desktop first-flow now keeps the Năm Lộ hero, compact heading and first card row inside the design-led browser fold.
- Copy: Public Classes target label, Năm Lộ section labels and Võ art-reference notes are Vietnamese.
- Evidence: Playwright covers target link, English leak prevention, first-fold card visibility, mobile density and overflow.

## Evidence

- RED: `/classes` browser/e2e failed on desktop first-card visibility, with only 92.266px visible at 1280x720.
- GREEN: `/classes` Vietnamese design-match browser/e2e passed desktop/mobile 2/2.
- Screenshot/metrics: 1440x900 first card visible 282.953, 1280x720 first card visible 150.172, overflow 0, screenshots reviewed at `/tmp/lgo-classes-page-v1137-*.png`.
- Dedicated validator, typecheck, production build and current-state validator should be rerun after this handoff when verifying closure.

Process gates: Sequential Page Completion, Just-in-time Design, Design Target First, Layout Match Before Closure and Base UI/UX Layout were applied before closure.

## Non-claims

No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT remains explicit. This slice does not add independent backend behavior.
