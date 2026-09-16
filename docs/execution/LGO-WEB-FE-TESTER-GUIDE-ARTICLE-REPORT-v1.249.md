# WEB-FE-TESTER-GUIDE-ARTICLE-v1.249

Status: WEB_VERIFY_PASSED. Effective WEB_CLOSED requires the external delivery manifest to verify commit, normal origin/main push, matching remote HEAD, ZIP integrity/SHA256 and full-source/delta replay.
Baseline: `26d2e20fba8773fccad4d5af0b4bf6e48c7fab24`.
Session: `S-LGO-WEB-20260916-E6A1`. Existing main and `/Users/minhdc/Projects/LinhGioiOnline-Web` retained.

## Real Browser UI/UX Layout First

Scope: `/guides/closed-tester-information-pack-guide`. Before: four small clipped cards and repeated unrelated CTA bands. After: an illustrated editorial header, responsive contents rail, four complete parchment chapters and a compact related-reading area. The Public Core navy/gold/jade/editorial family, accepted shell/header/footer/navigation and existing world illustration are reused. The route comparison target is explicitly registered. The illustration is captioned as illustration, not a test invitation or released build. Pixel-identical atlas reconstruction is not claimed.

The source entry title, summary, body and the four ordered title/action/expectedResult/blockedScope records are consumed directly from existing provisional Web fixtures. No old game attachment or external source is used to replace their wording or infer gameplay/backend readiness. Long content is not line-clamped to force a shorter page.

Nine contextual native links expose the destinations required by those instructions. Chapter 1: checklist and device preparation. Chapter 2: feedback template and privacy guidance. Chapter 3: known limitations and status. Chapter 4: readiness, download trust and safe support. The three choices in the final chapter keep that order and stack on mobile. These are reading links, not form submissions, registration actions, downloads or access grants. No checklist or template state is duplicated inside the article.

Desktop contents remain sticky; mobile contents can be expanded/collapsed. Native previous/contents/next, keyboard Tab/Enter/Space, Back/Forward, direct chapter URLs and malformed fragments are tested. Losing the illustration does not hide the source content or article navigation. Related links lead to the existing tester pack, readiness guide and catalog.

## Required destination fix / Base First

The guide directly addresses existing tester-checklist, tester-device, tester-feedback and tester-limits sections. Baseline had mount-time fragment restoration and programmatic focus only for the checklist. Three cold-URL regressions failed for the other targets before changes, while ordinary/unknown/malformed URLs passed their control.

The fix consumes the unchanged ArticleFragmentRestoration separately at each of those three owning sections with an explicit single-ID whitelist and tabindex=-1. The original checklist helper is unchanged. One selector extends the shared focus ring to focusable tester limitations. Existing release reading-panel focus and the v1.247 opt-in native-scroll coordination remain intact; no timers, polling, new global observer or custom click handler.

End-to-end tests follow all four links from the article and require the destination to be visible below the actual header and focused. Tab reaches real controls. Cold direct URLs and reload are tested for the three new targets. Feedback tabs retain their native Arrow/Home/End behavior; disclosures open with Enter and keep focus; no checkbox is preselected and local interaction sends no intake request. Ordinary/unknown/malformed fragment loads do not steal focus or scroll. No OS clipboard mutation is introduced.

ExperienceHero, GuideArticle, GuideChapterBody, grouped actions, buttons and fragment behavior owners are reused without changing their implementations. The old 50-line tester-guide-only CSS block is removed; all remaining service-layout.css bytes match baseline. The only new shared CSS is the extra focus-selector arm. Globals, tokens, assets/fonts, dependency manifests, content/contracts, site shell, Portal/Ops and common article/fragment source are unchanged. Tester copy, native controls and state logic are unchanged apart from the required focus/mount bindings.

## Verification

RED: 10 article tests failed against the old renderer; 3 cold destination tests failed; the ordinary/malformed URL control passed. GREEN: 44/44 for the guide, three destinations, existing tester pack and prior checklist regression. Strict Web typecheck then rejected an explicit undefined optional actionGroup from Record indexing. The fix omits that optional property when no mapping exists; neither strictness flags nor shared prop types were relaxed. The failure log is preserved; this is a type correction, not an invented runtime fix.

One final production build succeeded with 63 static pages. A fresh complete production run after the source/type fix executed 468/468 PASS, zero failed/skipped/flaky, across 39 selected E2E files. New guide contributes 20 tests; new tester destination suite contributes 8. All 283 runtime-source/config input hashes are pinned and must match at final source and delivery gates.

| Viewport | Document height | Hero bottom | Article top | Horizontal overflow | Main axe violations |
|---|---:|---:|---:|---:|---:|
| 1440 × 900 | 3435 | 615.69 | 647.69 | 0 | 0 |
| 1280 × 800 | 3407 | 609.52 | 641.52 | 0 | 0 |
| 768 × 1024 | 3941 | 826.95 | 850.95 | 0 | 0 |
| 390 × 844 | 5172 | 995.52 | 1019.52 | 0 | 0 |
| 360 × 800 | 5397 | 1031.83 | 1055.83 | 0 | 0 |

Five production captures have zero page JavaScript errors/heading overflow and load the existing cover. Main-content axe is scoped to selected WCAG tags. 320px reflow tests require authored body copy >=14px, navigation/actions >=44px and visible focus. This is Chromium emulation, not physical-device/screen-reader testing or a WCAG certificate. Failed-image behavior is tested separately.

Sibling compatibility across 17 pages: 32 raw exact main-DOM matches and 2 generated-ID-only matches; all 34 measured geometries match. The existing exception is only /performance, with bijective generated-ID normalization, unique/resolved references and a negative altered-copy control. Normalized DOM is not called byte-identical. The tester page is compared separately: both default-view geometries match, and only the three intended tabindex attributes plus generated-ID spelling may differ. Changed visible copy is rejected and ordinary scrollY remains zero.

Final source gate runs after report/state edits: UI/Web/Portal/Ops typecheck, UI/Web lint, seven next-route tooling tests, clean-source current-state validation and git diff --check. Eleven negative controls reject altered source outcomes, broken device/feedback/limits/support destinations, a registration/access claim, false invitation wording, missing feedback restoration/device focus/limits focus styling and an unexpected dynamic route. Logs/closure-checks.json record actual exits; this report does not replace execution.

Only the exact obsolete compact v1.172 validator/E2E is HISTORICAL_SUPERSEDED. The shared multi-guide test checks this exact specialized renderer and adds faq-search-helpfulness-guide as a still-generic control; published URL/category/source/heading/overflow checks remain. Inline source/browser review performed; no independent reviewer-agent result claimed.

## Coordination, delivery and non-claims

Owner waiver for stored-PID capacity remains. This session records command/PID metadata in local-process-journal.jsonl and retains pause/worktree/runtime/port/branch checks. Already-enrolled v2 status has no assigned task/batch/run. No identity data is copied and no Manager/registry configuration, cleanup or other session is changed. Existing processes are not stopped. New production preview uses own claimed loopback port 3227. A listener is not background assistant work.

Reviewed source/test/docs only enter Git; handoff ZIPs, screenshots, logs/cache/secrets stay outside source commits. Normal push, remote HEAD and verified ZIP/SHA256 replay are required for effective closure. No force-push or deployment command.

No open registration, guaranteed slot, automatic entitlement, upload/intake, real checksum/build distribution, ticket inbox/account lookup/support SLA, live game controls, rewards/economy or telemetry. No production auth. No DB persistence. No independent backend. No CMS. No production deployment. NO_ACCEPTED_BACKEND_CONTRACT.
Whole-app JavaScript-disabled streaming remains open; helper use does not claim no-JavaScript support or universal fragment fixes elsewhere.

After verified delivery only: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.250, `/guides/faq-search-helpfulness-guide`.
