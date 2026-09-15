# WEB-FE-SUPPORT-REAL-UI-LAYOUT-v1.224

Status: WEB_CLOSED — frontend guidance page, not a ticket service.
Source baseline: b4ac1b335f0553dd8b60deed376cd191b1a0f8fb. Delivery: reviewed commit and normal push to origin/main, followed by verified ZIP/SHA256. No production deployment.

## Real Browser UI/UX Layout First / Runtime Layout Gate

Inspected support-detailed-design-target-v1131.png and captured the actual baseline. Baseline topicLinks = 0 on desktop/mobile: four apparent actions were only bold text. A small embedded screenshot of the target was being shown instead of implementing its layout.

Rebuilt the page as an art-backed hero and parchment navigation station, four actionable topic cards, six keyboard-operable FAQ disclosures, a prominent no-ticket paper notice and an honest scope panel. Buttons navigate to /download/trust, /support/help, /release/tester-pack#tester-feedback and /support/safety. No dummy click handlers or dead visual buttons.

The shared header/footer/navigation stays accepted and unchanged. Registered target composition is followed; its separate character, lanterns and detailed paper illustration are not available as standalone approved assets. Existing world concept art is reused. The result is not a pixel-identical copy or new production character artwork. The reference image remains in the design-reference band, not embedded in main content.

## Base First

ExperienceHero, ReleaseIcon, LinkButton and SectionHeading are reused. GuidanceStation, GuidanceTopicGrid and QuestionDisclosureList are shared in packages/ui/src/guidance.tsx; all new CSS is in packages/ui/src/guidance-layout.css. The old 119-line support-only compact block was removed from service-layout.css; globals.css is unchanged. Page composition is 18 lines. supportFaqs and playerSupportExpectations remain the source-backed FAQ/scope data; no canonical backend contract or fixture was rewritten.

## Runtime verification

Initial RED: five new page tests failed on missing real station/topic links/native FAQ. An initial test-loader error from import.meta in this repo's test module mode was corrected before recording valid RED failures. Final scoped support suite: 10/10 PASS. The full production regression set: 66/66 PASS, 0 failed and 0 skipped within that set. It covers support, support/help and support/safety heading order, prior release/readiness/tester/status/download-trust pages and content headings.

UI/Web typecheck and lint PASS. Production Web build PASS, 63 static pages. No browser JavaScript errors or main-content axe violations in the five-viewport production review:

| Viewport | Document height | Hero bottom | Topics top | Overflow | Axe violations |
|---|---:|---:|---:|---:|---:|
| 1440 × 900 | 1873 | 515.83 | 547.83 | 0 | 0 |
| 1280 × 800 | 1870 | 512.38 | 544.38 | 0 | 0 |
| 768 × 1024 | 2992 | 924.83 | 948.83 | 0 | 0 |
| 390 × 844 | 3362 | 993.16 | 1017.16 | 0 | 0 |
| 360 × 800 | 3617 | 1056.19 | 1080.19 | 0 | 0 |

Baseline heights: desktop 2282px, mobile 3354px. Current mobile keeps full readable answers instead of hiding text merely to shorten the page. All four card actions have at least 44px height. Expanded FAQ, Enter/Space, anchor navigation and destination routes are tested. Automated axe is not a full manual accessibility certification.

## Separate failed capability probe — not counted as PASS

An extra whole-application no-JavaScript navigation probe failed in both viewports: the existing root loading boundary leaves streamed body content hidden until the framework reveal script runs. The same HTML structure is present on unchanged pages. This capability was not in the page's locked acceptance criteria. The exact failing test/config, logs and traces are retained separately in the evidence archive; it is not silently skipped or called PASS. Full no-JavaScript application access remains an explicit foundation limitation, not a claim for this page. The required native FAQ keyboard tests run on the real application and remain unchanged. See evidence/NOSCRIPT-LIMITATION.md and reproduce/noscript-diagnostic.*.

## Guard compatibility / review

Old v1.131/v1.146/v1.204 image-and-card presentation checks are HISTORICAL_SUPERSEDED by v1.224 source and real interaction coverage; they are not counted as runtime passes. Multi-route v1.87 retains h1 order/count, typography and overflow checks. Its two obsolete help/safety title expectations were aligned with the unchanged committed baseline, not by weakening assertions. A clean-source current-state run passes; removing real topic hrefs in a disposable copy is rejected by the new guard.

The stale no-push line left in the former project-state header was corrected: the current owner instruction authorizes commit/push. Local evidence/ZIPs are not staged.

## Non-claims / next

No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. No independent backend. No CMS. No production deployment. No payment/shop/economy. NO_ACCEPTED_BACKEND_CONTRACT. No live ticket intake, recovery, account lookup or support SLA.
Next: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.225, /support/help. Reuse shared guidance/FAQ components and prioritize a useful real question-navigation experience. Do not invent search, ticket or account backends.
