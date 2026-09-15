# WEB-FE-TRAINING-LOOP-GUIDE-ARTICLE-v1.237

Status: WEB_CLOSED — source-authored reading guide, not gameplay or saved progress.
Baseline: `ccafe9bd8ea8a03d9e48de74951e40532cae8b15`.
Delivery: normal commit/push to origin/main, exact remote HEAD verification, full/delta/evidence ZIP and SHA256. The external manifest records actual commit/package results. No deployment.

## Rendered UI and comparison

Verified v1.236 handoff checksums and clean tracked source before following WEB-NEXT-ACTION. Read the published beginner-training-loop-guide entry and its four guideDetailSteps. Inspected the registered Public Core atlas and captured the old desktop/mobile page with four tiny clipped step cards and a long stack of generic CTA panels.

The actual browser page now uses an illustrated editorial header, sticky desktop/mobile-collapsible contents, four full parchment chapters, chapter-specific reading destinations and a short related-reading panel. Native previous/contents/next links focus the section, cold fragment links restore the requested chapter after streaming, and malformed fragments leave the article usable. No reference-board image is used as page content. Compared fresh production desktop/mobile captures against the accepted article presentation and atlas hierarchy/palette; this is not a pixel-identical recreation of every atlas illustration.

Entry title/summary/body and every step title/action/expectedResult/blockedScope are consumed directly and in original order. Existing Gate Keeper/Training Stone/source terminology remains intact; no game history or uploaded M0 material was used to replace these records. Four added destinations are navigation metadata only: /game, /guides/gate-entry-guide, /game/loop, /download/trust.

## Shared ownership and isolation

GuideArticle, ExperienceHero, existing native navigation and ArticleFragmentRestoration are reused. Added GuideChapterBody to packages/ui/src/guide-article.tsx for reusable instruction/result/boundary content plus an optional reading link, avoiding another page-owned repeated body pattern. Its values are escaped text; it has no client state, effects or request. The original GuideArticle implementation is unchanged. No article CSS, global stylesheet, content fixture, token, asset, contract, dependency, Portal or Ops change. Exactly 46 obsolete training-only legacy CSS lines were removed; all other bytes of service-layout.css match baseline.

Fresh production compatibility checks for world, beginner, gate and player-safety guides show eight exact main DOM and measured-geometry matches over desktop/mobile. No broad rewrite of the dynamic guide renderer: only the explicit existing training slug is added after the published-content/category guard. dynamicParams=false and HTTP category boundaries stay in force.

## Verification and failures retained

Seven test-first RED failures observed against the original page. First combined run: 42 passed, two failed because an older sibling test still required the old training renderer. Updated only that exact training-slug branch to require the new owner and source-backed count; published HTTP 200/category 404, heading and overflow assertions were retained. Fixed combined suite: 44/44 PASS. Strict web typecheck then caught a possibly undefined indexed action spread with exactOptionalPropertyTypes; narrowed the destination and omitted absent optional props instead of relaxing TypeScript settings. Fixed typecheck passed.

Final freshly built production regression: 254/254 PASS, zero failed/skipped in the selected set. New training suite: 14/14. Build: 63 static pages, exit 0. Additional coverage includes source-exact fields, true destination navigation, full text, 320px reflow, body text >=14px, controls >=44px, visible focus, malformed/cold fragments, native Back/Forward and no outgoing reading mutations.

| Viewport | Document height | Hero bottom | Article top | Overflow | Main axe violations |
|---|---:|---:|---:|---:|---:|
| 1440 × 900 | 3325 | 562.14 | 594.14 | 0 | 0 |
| 1280 × 800 | 3291 | 556.98 | 588.98 | 0 | 0 |
| 768 × 1024 | 3767 | 790.67 | 814.67 | 0 | 0 |
| 390 × 844 | 4843 | 971.20 | 995.20 | 0 | 0 |
| 360 × 800 | 5114 | 1021.44 | 1045.44 | 0 | 0 |

All five records contain zero JavaScript page errors. Automated main-content axe and Chromium viewport emulation are not WCAG/screen-reader/physical-device certification. The selected regression covers previously closed public routes; not all historical tests are in that selected run. Final all-app typechecks, UI/Web lint, route-tool unit tests, clean-source validator, negative controls and production-input hashes are recorded in external evidence.

## Guard migration / review

Only the exact obsolete compact training validator/E2E v1.159 is HISTORICAL_SUPERSEDED, not PASS. New guard protects source mapping, shared body, native navigation, published route guard and no gameplay surrogate. Negative controls deliberately replace a source result, drop the shared boundary and enable unknown dynamic slugs; each must fail. Inline source/browser review performed; no independent-agent review claimed.

## Limits and next

Whole-app JavaScript-disabled streaming limitation remains open. Fragment restoration still uses the existing client helper. The earlier non-reproduced dev fragment-coordinate observation remains recorded in v1.235; it is not claimed fixed here. No gameplay, damage, combat input, reward, inventory, account progression, quest completion, saved reading state or online session. No production auth. No DB persistence. No independent backend. No real Portal integration. No real Ops/Admin mutation. No CMS. No payment/shop/economy. No production deployment. NO_ACCEPTED_BACKEND_CONTRACT.

Next: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.238, `/guides/download-readiness-guide`. Keep the source-authored article and actual reading destinations; no download entitlement or readiness fabrication.
