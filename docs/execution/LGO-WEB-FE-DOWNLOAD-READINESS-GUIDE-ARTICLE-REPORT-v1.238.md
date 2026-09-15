# WEB-FE-DOWNLOAD-READINESS-GUIDE-ARTICLE-v1.238

Status: WEB_CLOSED — source-authored evidence guidance, not a download or access service.
Baseline: `a94f22f0c06aa3ada9c842bfdf6a6ad51dd8782d`.
Delivery: reviewed commit and normal origin/main push, exact remote HEAD verification and full/delta/evidence ZIP/SHA256. Actual delivery results live in the external manifest. No production deployment command.

## Actual page and source

Started after v1.237 was pushed, packaged, replay-verified and all checksums rechecked. Read current governance and the published download-readiness-guide entry and four guideDetailSteps. Captured the baseline desktop/mobile page before edits: clipped multi-column proof cards and a long generic CTA stack. Used the registered Public Core comparison family and existing editorial guide presentation, not unrelated old game/M0 material.

The actual `/guides/download-readiness-guide` now presents an illustrated editorial header, desktop sticky/mobile-collapsible contents, four complete parchment chapters and a small related-reading area. Each condition has the original instruction, expected result and current boundary plus a real reading destination. Previous/contents/next links and Back/Forward remain native; cold direct fragments focus/scroll to the right chapter and malformed fragments do not break the article. Illustrative artwork is not a build or live-game screenshot. No reference-board image replaces the HTML page.

The original entry title/summary/body, step order/title/action/expectedResult/blockedScope are rendered directly from source. Build, checksum, release-note and entitlement terminology stays as authored. No released artifact, hash, approval, download permission or schedule is inferred. The four added destinations are explanatory internal routes: /download, /download/trust, /release, /status. No download attribute, form, account lookup or generated checksum appears in this guide.

## Base First and isolation

Reused GuideArticle, GuideChapterBody, ExperienceHero, LinkButton, SectionHeading, ReleaseIcon and the existing whitelisted fragment restoration without modifying them. No extra article component, client controller, CSS pattern, dependency, asset or font was added. A route-owned view supplies authored content and navigation metadata. Removed exactly 46 obsolete download-guide-only lines from service-layout.css; all remaining bytes match baseline. globals.css, guide-article.css, tokens, fixtures, assets, contracts, Portal and Ops are unchanged.

The dynamic route adds only this explicit published slug after the original category/published-content guard. dynamicParams=false remains. Production comparison of world, beginner, gate, training and player-safety guides gives ten exact main DOM and measured-geometry matches across desktop/mobile. No other guide was visually reworked during this slice.

## Verification

Seven genuine RED tests failed against the old page. Initial implemented combined suite: 44/44 PASS. No existing runtime assertion was weakened. Final fresh production regression: 268/268 PASS, zero failed/skipped in the selected set. New page suite: 14/14. Production build: 63 static pages, exit 0.

Tests preserve all source values, validate real destinations and chapter keyboard navigation, check native history, cold/malformed fragments, no reading mutations, coherent headings and expanded main-content axe. At 320px body text stays >=14px, chapter/action targets >=44px, focus is visible and content does not overflow horizontally. The guide has no fabricated 64-digit checksum or outgoing download link.

| Viewport | Document height | Hero bottom | Article top | Overflow | Main axe violations |
|---|---:|---:|---:|---:|---:|
| 1440 × 900 | 3379 | 615.69 | 647.69 | 0 | 0 |
| 1280 × 800 | 3353 | 609.52 | 641.52 | 0 | 0 |
| 768 × 1024 | 3830 | 826.95 | 850.95 | 0 | 0 |
| 390 × 844 | 4821 | 979.16 | 1003.16 | 0 | 0 |
| 360 × 800 | 5019 | 979.16 | 1003.16 | 0 | 0 |

All five production records have zero JavaScript page errors. Fresh desktop/mobile screenshots were visually compared with the registered atlas hierarchy, shared frame/palette and accepted article pattern. No pixel-identical reproduction of every atlas panel is claimed. Chromium emulation/main-content axe do not certify all physical devices, screen readers or WCAG conformance.

Final source gate runs UI/Web/Portal/Ops typecheck, UI/Web lint, seven next-route tooling tests, clean-source current-state validator and git diff --check. Negative controls replace an authored result, inject a fake 64-character checksum and reopen unknown dynamic slugs; each is rejected. Source hashes ensure production inputs have not changed after the build. External evidence holds exact commands, outputs and final checks.

## Guard migration and remaining limits

Only the exact obsolete compact download-readiness v1.160 layout validator/E2E is HISTORICAL_SUPERSEDED, not PASS. The new guard checks source mapping, reused owners, fragment boundaries and no simulated download/access behavior. Other category/HTTP and existing guide coverage stays active. Review is inline source/browser review, not an independent-agent review.

Whole-application JavaScript-disabled streaming remains open; native article HTML still uses the existing mount helper for cold fragment restoration. The earlier non-reproduced dev fragment-coordinate observation stays in v1.235 evidence and is not claimed fixed. No production auth. No DB persistence. No independent backend. No CMS. No real Portal integration. No real Ops/Admin mutation. No payment/shop/economy. No production deployment. No build entitlement, public artifact, launcher or download checksum is created. NO_ACCEPTED_BACKEND_CONTRACT.

Next: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.239, `/guides/support-and-community-guide`. Continue one page at a time, preserving the authored guidance and actual reading/navigation behavior.
