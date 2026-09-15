# WEB-FE-START-HERE-GUIDE-ARTICLE-v1.242

Status: WEB_VERIFY_PASSED. WEB_CLOSED requires external confirmation of this exact commit, normal origin/main push and verified source/delta/evidence packages.
Baseline: `97c0d828b5b830cbaf28caed90b81c974f05a8ac`.

## Actual UI / Real Browser UI/UX Layout First

Selected only `/guides/start-here-content-hub-guide` after v1.241 source replay, clean archive validation and all package checksums. Read current governance, existing shared owners and the exact published entry/four guideDetailSteps. The registered Public Core comparison remains available. Before captures show a compact header, four clipped cards and many generic CTAs: 2734px desktop / 4115px mobile.

The real page now has a framed illustrated header, responsive contents, four full parchment chapters and focused related reading. Each chapter keeps its instruction, expected result and boundary. Chapter two exposes three useful native links: understand the world, compare download trust and read the roadmap, corresponding to the alternatives in its authored paragraph. Other chapters lead to /start, /release/readiness and /support/help. Six chapter destinations in total work; no input, selected preference or saved reading progress is introduced.

All source title/summary/body and ordered step title/action/expectedResult/blockedScope values are consumed directly, with no translation or silent rewriting. Added labels/destinations are editorial navigation metadata, not new source-backed gameplay or release claims. Existing world artwork is labelled illustration. No mockup screenshot replaces the actual HTML.

## Base First / shared implementation

Reused GuideArticle, ExperienceHero, GuideChapterBody and the existing cold-fragment restoration. GuideArticle and fragment logic are unchanged. GuideChapterBody gained an optional labelled group of plain links with an empty-group guard; its original singular action rendering remains intact. The group has no client state or requests. Shared guide-article.css adds wrapping/mobile width for this group and shares the existing ink-on-parchment/hover declarations; existing focus treatment already covers its links.

Removed 46 obsolete start-guide-only CSS lines from service-layout.css; all remaining bytes match baseline. No globals.css growth, new dependency, font or art. Fixtures, tokens, contracts, Portal and Ops are unchanged. Only this published slug receives a new renderer after the original category guard. dynamicParams=false remains.

Compared fresh desktop/mobile layout with the accepted editorial guide pattern and Public Core hierarchy, frame/palette and art treatment. Common header/menu/footer remain unchanged. This is not a pixel-identical reconstruction of all atlas artwork. Nine sibling guides have identical main DOM and measured geometry on desktop/mobile: 18/18 matches, confirming default shared-body consumers did not visually change.

## Runtime evidence

Test-first RED: eight tests failed on the old route. First implemented targeted regression: 46/46 PASS. Fresh production regression: 326/326 PASS, zero failed/skipped in the selected suite; this page suite 16/16. Build: 63 static pages, exit 0. Published-guide HTTP 200 and category/unknown-slug 404 coverage remains active.

Tests cover source-exact fields, all six chapter links, the three-choice group's Tab/Enter/focus and Back navigation, solid ink backgrounds, native previous/contents/next, cold/malformed fragments, complete text and no reading mutation or intake. At 320px, body text >=14px, navigation/action targets >=44px and no horizontal overflow. The new group wraps into full-width links instead of shrinking text.

| Viewport | Document height | Hero bottom | Article top | Overflow | Main axe violations |
|---|---:|---:|---:|---:|---:|
| 1440 × 900 | 3406 | 615.69 | 647.69 | 0 | 0 |
| 1280 × 800 | 3380 | 609.52 | 641.52 | 0 | 0 |
| 768 × 1024 | 3889 | 826.95 | 850.95 | 0 | 0 |
| 390 × 844 | 4993 | 933.09 | 957.09 | 0 | 0 |
| 360 × 800 | 5179 | 979.16 | 1003.16 | 0 | 0 |

All five production records have no JavaScript page errors or heading overflow. Automated main-content axe and Chromium viewport emulation are not physical-device, screen-reader or full WCAG certification. Final all-app typechecks, UI/Web lint, seven next-route tooling tests, clean-source validation and git diff --check are stored with command/exit evidence.

Negative controls replace an authored result, break the grouped destination href, insert a personalization form and enable unknown dynamic slugs; each is rejected. Production-input hashes are locked until delivery. Only obsolete compact v1.164 validator/E2E is explicitly HISTORICAL_SUPERSEDED, not runtime PASS. No existing runtime threshold was relaxed. Inline source/browser review, not independent-agent review.

## Limits and delivery

No preferences form, personalization service, login, account progress, enrollment, ticket intake, public download, entitlement, event schedule or gameplay. No production auth. No DB persistence. No independent backend. No CMS. No real Portal integration. No real Ops/Admin mutation. No payment/shop/economy. No production deployment. NO_ACCEPTED_BACKEND_CONTRACT.

Whole-app JavaScript-disabled streaming remains open; the existing helper is still needed for cold fragment restoration. The earlier non-reproduced dev fragment observation is not claimed fixed. One MCP start_process request timed out; a read-only check found its review/check files absent. Only that preparation was retried, never a commit/push or production mutation based on missing output. The first production browser run subsequently disappeared with no exit marker, its log stopped at test 50 and port 3222 was no longer listening. This partial run is INTERRUPTED, not PASS; no application assertion failure or root cause was established. The successful 63-page build was retained only after all 271 production input hashes matched, its BUILD_ID timestamp matched the build log and its rendered page contained the new grouped-link owner. The entire suite was rerun, not resumed from a partial test count, under a local detached supervisor to separate execution from MCP-session lifetime. Original partial logs/results and resume provenance are retained.

Delivery: reviewed source/test/docs commit, normal origin/main push, exact remote HEAD match and full/delta/evidence ZIP/SHA256 with byte-for-byte replay. Actual closure requires the external delivery manifest. No force-push, deployment or handoff ZIP in source Git.
Next: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.243, `/guides/player-safety-support-guide`. The world-loop guide earlier in the legacy order is already closed at v1.233; do not reopen it as a new page.
