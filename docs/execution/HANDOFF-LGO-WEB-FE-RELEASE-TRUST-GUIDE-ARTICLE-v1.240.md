# WEB-FE-RELEASE-TRUST-GUIDE-ARTICLE-v1.240

Status: WEB_VERIFY_PASSED. Close as WEB_CLOSED only when the external delivery manifest confirms this commit, normal origin/main push and verified source/delta/evidence packages.
Baseline: `fc1e33af336653d0cf489f40e5018c0572839d73`.

## Real Browser UI/UX Layout First

Started after the v1.239 commit/push, source replay, clean archive validator and all package checksums were verified. Read current governance and the exact published release-trust-and-checksum-guide entry and four guideDetailSteps. The baseline was a 2779px desktop / 4127px mobile page with compact clipped steps and a long generic CTA chain.

The actual page now has a framed illustrated editorial header, desktop sticky/mobile-collapsible contents, four full parchment chapters and a focused related-reading panel. Native previous/contents/next links, keyboard disclosure, Back/Forward and direct chapter URLs work; the correct chapter receives visible focus. Malformed fragments do not break the article. Links lead to /download, /download/trust, /release and /status; related links lead to existing readiness, FAQ and download-guide pages, not a build file.

The original title/summary/body, step order/title/action/expectedResult/blockedScope are passed directly to the shared article. In particular, the source instruction to use the correct artifact SHA256 and not a sample hash stays intact. No hash value, provenance result, approval, certificate, download entitlement or release schedule was invented. The opening boundary distinguishes an explanatory guide from artifact verification and delivery.

## Design / Base First / isolation

Reused GuideArticle, GuideChapterBody, ExperienceHero, LinkButton, SectionHeading and the existing fragment-restoration helper with no changes. No extra template owner, client state/controller, CSS pattern, dependency, font or asset. Removed 46 exclusive legacy trust/checksum-guide CSS lines; every remaining service-layout.css byte matches baseline. globals.css, article CSS, tokens, content, contracts, assets, Portal and Ops are unchanged.

The registered Public Core comparison family, accepted article presentation, navy/gold/jade palette, framed illustration, hierarchy and reading order were compared with real desktop/mobile captures. The exact-route label points to the same existing atlas. Artwork is labelled illustrative; no pixel-identical reconstruction or live-build screenshot claim. The accepted common header/navigation/footer is unchanged.

Only this explicit published slug receives a new renderer after the original category guard. dynamicParams=false stays in place. Production comparisons for world/beginner/gate/training/download/support/player-safety guide pages give 14/14 exact main DOM and measured geometry matches across desktop/mobile.

## Verification

Seven test-first RED failures were observed on the old page. Implemented targeted regression: 44/44 PASS. Fresh production regression: 296/296 PASS, zero failed/skipped in the selected suite; new trust guide suite 14/14. Build: 63 static pages, exit 0. Existing source/HTTP/category and previously completed public-page tests remain active.

| Viewport | Document height | Hero bottom | Article top | Overflow | Main axe violations |
|---|---:|---:|---:|---:|---:|
| 1440 × 900 | 3325 | 615.69 | 647.69 | 0 | 0 |
| 1280 × 800 | 3300 | 609.52 | 641.52 | 0 | 0 |
| 768 × 1024 | 3792 | 826.95 | 850.95 | 0 | 0 |
| 390 × 844 | 4740 | 933.09 | 957.09 | 0 | 0 |
| 360 × 800 | 4973 | 995.52 | 1019.52 | 0 | 0 |

All five production records have no JavaScript page errors or overflowing headings. Extra 320px checks require body text >=14px, chapter/action targets >=44px, visible focus and full source text. Tests require the SHA256 instruction, reject an invented 64-character checksum and ensure links are internal reading destinations with no download attribute or outgoing reading mutations. Main-content axe and Chromium emulation are not WCAG, screen-reader or physical-device certification.

Final gate: UI/Web/Portal/Ops typecheck, UI/Web lint, seven next-route unit tests, clean-source current-state validator and git diff --check. Negative controls replace an authored result, insert a fake checksum and enable unknown dynamic guide slugs; each must fail. Source hashes lock production inputs through the delivery check.

Only the obsolete exact compact trust/checksum v1.162 validator and E2E are HISTORICAL_SUPERSEDED, not runtime PASS. No other layout threshold was weakened. Inline source/browser review, not independent-agent review. One MCP image-read timeout recovered on read-only retry; no mutation was retried or inferred from missing output. The local production harness now streams logs for observability; test commands/thresholds are unchanged.

## Boundaries and delivery

No checksum calculator, signing, artifact verification, upload/download, launcher, account gate, registration, entitlement, gameplay, support intake or saved reading state. No production auth. No DB persistence. No independent backend. No CMS. No real Portal integration. No real Ops/Admin mutation. No payment/shop/economy. No production deployment. NO_ACCEPTED_BACKEND_CONTRACT.

Whole-app JavaScript-disabled streaming remains open; cold-fragment restoration uses the existing client helper. The earlier non-reproduced development fragment-coordinate observation remains recorded; it is not claimed fixed here.

Delivery: reviewed source/test/docs commit, normal origin/main push, exact remote HEAD match and full/delta/evidence ZIP/SHA256 with byte-for-byte source replay. Actual commit/package results are in the external manifest. No force-push, deployment or handoff ZIPs in source Git.
Next: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.241, `/guides/community-roadmap-onboarding-guide`.
