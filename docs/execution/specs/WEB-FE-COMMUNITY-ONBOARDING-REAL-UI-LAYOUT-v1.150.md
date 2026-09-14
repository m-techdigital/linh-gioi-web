# WEB-FE-COMMUNITY-ONBOARDING-REAL-UI-LAYOUT-v1.150

Status: WEB_CLOSED.

Scope: close `/community/onboarding` as a Real Browser UI/UX Layout First slice. The existing Public Service target was sufficient as a guardrail, so no new design batch was created. Work focused on the rendered page: Vietnamese first-flow, compact hero, gameplay-loop board, route-step board, mobile density and Base First CSS ownership.

Implementation: `/community/onboarding` now starts with `Hòa nhập cộng đồng Linh Giới`, a compact Vietnamese boundary, a shared onboarding board and a three-step reading path. The old page-local `lgo-community-onboarding-design-board` CSS was removed from `apps/web/src/app/globals.css` and rebuilt in `packages/ui/src/service-layout.css` with shared `lgo-community-onboardingpage-stack`, design board and route-step classes.

Evidence: browser/e2e desktop and mobile passed for `tests/e2e/fe-community-onboarding-real-ui-layout-v1150.spec.ts` and the historical v1.75 onboarding-board test. Screenshots were captured at `/tmp/community-onboarding-desktop-v1150.png` and `/tmp/community-onboarding-mobile-v1150.png`. Source validator, typecheck, build and current-state closure are required before final commit.

Non-claims: No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, NO_ACCEPTED_BACKEND_CONTRACT. No forum, bang hội, ticket intake, waitlist or community backend is added.
