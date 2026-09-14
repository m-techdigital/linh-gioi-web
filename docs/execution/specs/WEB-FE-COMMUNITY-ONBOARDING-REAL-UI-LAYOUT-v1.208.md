# WEB-FE-COMMUNITY-ONBOARDING-REAL-UI-LAYOUT-v1.208

Status: WEB_CLOSED

Task: WEB-FE-COMMUNITY-ONBOARDING-REAL-UI-LAYOUT-v1.208

Scope: `/community/onboarding` only. Real Browser UI/UX Layout First with design target used only as a guardrail. Base First required before page-local layout/CSS.

Implementation:
- Composed `/community/onboarding` with `lgo-service-compact-proof-page`, the existing Vietnamese onboarding design board, the route board and shared native disclosure for secondary proof boards.
- Kept hero, onboarding design board and three-step route path in first-flow.
- Grouped readiness, tester expectation, trust, release narrative, content hub, route continuity, onboarding path, roadmap gate, feedback, staged release and closed tester proof boards behind `lgo-service-disclosure-stack`.
- Extended community onboarding rules in `packages/ui/src/service-layout.css`; did not add current-page CSS to `apps/web/src/app/globals.css`.

Evidence:
- browser/e2e desktop/mobile v1.208.
- screenshots `/tmp/community-onboarding-desktop-v1208.png` and `/tmp/community-onboarding-mobile-v1208.png`.
- Source validator, typechecks, build and current-state validator required for closure.

Non-claims: NO_ACCEPTED_BACKEND_CONTRACT, no forum, no guild/chat, no waitlist backend, no ticket backend, no account lookup, no production auth, no DB persistence, no production deployment.
