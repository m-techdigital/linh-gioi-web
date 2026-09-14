# HANDOFF LGO Web FE Closed Tester Information Pack Real UI Layout v1.172

Task: WEB-FE-GUIDES-CLOSED-TESTER-INFORMATION-PACK-REAL-UI-LAYOUT-v1.172

Status: WEB_CLOSED

Process: Real Browser UI/UX Layout First; Base First; browser/e2e evidence before closure.

Closed page: `/guides/closed-tester-information-pack-guide`.

What changed:

- Added closed tester information pack guide composition in `apps/web/src/app/guides/[slug]/page.tsx`.
- Converted the selected guide slug and its four steps into Vietnamese, game-scenario-correct public guidance.
- Extended `packages/ui/src/service-layout.css` with closed-tester-pack theme selectors that compose the shared compact guide-flow base.
- Corrected the shared `ClosedTesterInformationPackCta` copy in its component owner so the current page does not carry stale English-heavy tester CTA text.
- Added browser/e2e coverage with desktop/mobile metrics, overflow checks, keyboard focus navigation and screenshot capture.
- Updated project state, next action, task ledger, spec, report and handoff.

Verification summary:

- Browser/e2e desktop/mobile closed tester information pack guide layout checks passed.
- Source validator passed after docs were updated.
- Web/UI typechecks, Web build and clean current-state validator are required closure gates for the final commit.
- Screenshot review paths: `/tmp/guides-closed-tester-information-pack-desktop-v1172.png`, `/tmp/guides-closed-tester-information-pack-mobile-v1172.png`.

Base First / CSS ownership:

- Reused shared guide-flow layout base.
- New style lives in `packages/ui/src/service-layout.css` because it is reusable guide-detail component/layout styling.
- Shared tester CTA copy was fixed in `apps/web/src/components/PublicClosedTesterInformationPackSections.tsx` instead of route-local duplication.
- No closed-tester selectors were added to `apps/web/src/app/globals.css`.

Next allowed task: `WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.173`, selecting `/guides/faq-search-helpfulness-guide` as the single active page.

NO_ACCEPTED_BACKEND_CONTRACT retained. No production auth, DB persistence, entitlement, live ticket/support, tester intake, guaranteed closed-test access or production release claim was added.
