# WEB-FE-COMMUNITY-REAL-UI-LAYOUT-v1.227

Status: WEB_CLOSED — public community orientation, not a live social platform.
Source baseline: `723362d3d2b8163ffa517e50229317bae415cebd`. Commit/push are owner-authorized; verify remote HEAD and source/delta/evidence ZIP/SHA256. No production deployment.

## Real Browser UI/UX Layout First / Runtime Layout Gate

Inspected the registered community-detailed-design-target-v1149.png, existing approved art and baseline captures. The page now has a wide art-backed hero with a framed Linh Thanh vista, three paper panels for onboarding/conduct/safe feedback, principle-medallion navigation, two actual prototype screenshots with original-image links and full native conduct disclosures. No embedded design board is used as page content.

Accepted header/navigation/footer stay unchanged. The target's composition, paper panels, teal/gold hierarchy and readable mobile stacking guide the implementation. Standalone character/lantern/plaza paintings from the target are unavailable as approved assets; existing concept art is reused and labelled as illustration. Pixel-identical target artwork is NOT claimed. The existing two 640×480 runtime images are explicitly described as prototype evidence, not current service availability.

## Actual defect caught by visual review

The first functional suite passed, but screenshot review showed the gallery's “Mở ảnh gốc” cue was clipped. Computed-style inspection found MediaFrame inherited a fractional/fixed grid row from globals.css. The caption extended below a hidden-overflow visual container. A added geometry test failed on this exact boundary. The shared gallery presentation now uses grid-template-rows:max-content auto, so the image and link cue stay within the visible row at desktop/mobile sizes. No broad size threshold was relaxed and the original image opens in a new tab with noopener/noreferrer.

## Base First / CSS ownership

Reuses ExperienceHero, SectionHeading, LinkButton, MediaFrame, ReleaseIcon and QuestionDisclosureList. PrincipleMedallions is a small shared navigation component in packages/ui/src/guidance.tsx. Community layout/medallion/gallery styling lives in packages/ui/src/community-layout.css. The app route composes these owners.

Removed 55 lines of obsolete gallery CSS from globals.css. The old 281-line compact-community block in service-layout.css became 106 lines of preserved sibling evidence rules. Retained sibling declarations were programmatically compared to baseline; no content/contracts/design-token/approved-art/Portal/Ops source changed. Source fixtures still drive communityPrinciples, communityReadinessSteps, communityFeedbackChannels and communityConductRules.

## Runtime verification

Initial valid RED: five new page tests failed on missing real composition/navigation/gallery. Initial GREEN: 10/10. The separate cue-clipping RED failed before the intrinsic-row fix. Final page suite: 10/10; original v1.91 asset/gallery assertions remain active, including exact files, loaded 640×480 dimensions, mobile/desktop column counts, typography and overflow.

Final selected production regression: 110/110 PASS, zero failed and zero skipped within that set. Build PASS, 63 static pages. After the interrupted turn, the successful production build was reused only after checking all 187 relevant tracked/untracked app/package inputs predated it and recording their hashes. The entire production browser regression and five-viewport capture/axe matrix were run again. UI/Web/Portal/Ops typecheck, UI/Web lint, diff check and clean-source current-state validation pass.

| Viewport | Document height | Hero bottom | Paper panels top | Overflow | Main axe violations |
|---|---:|---:|---:|---:|---:|
| 1440 × 900 | 2290 | 599.83 | 631.83 | 0 | 0 |
| 1280 × 800 | 2288 | 599.83 | 631.83 | 0 | 0 |
| 768 × 1024 | 3421 | 1011.86 | 1035.86 | 0 | 0 |
| 390 × 844 | 4264 | 1071.09 | 1095.09 | 0 | 0 |
| 360 × 800 | 4351 | 1164.88 | 1188.88 | 0 | 0 |

No JavaScript page errors in the matrix. Automated axe is scoped to main; not full manual accessibility certification. Review is inline source/browser review, not an independent subagent review. A disposable negative control restoring the clipped row is rejected by the v1.227 guard; corrupting a prototype image is rejected by retained v1.91 SHA checks. These negatives do not touch authoritative files.

## Historical guards / limitations

Only two exact legacy image/compact layout guards and E2E cases (v1.149/v1.207) are HISTORICAL_SUPERSEDED, not counted as PASS. v1.91 asset provenance/gallery coverage is retained with current DOM selectors; v1.89 multi-route heading checks remain active. Scope restrictions are checked on the extracted component rather than obsolete inline-page text.

Whole-application no-JavaScript support remains the separately recorded root-streaming limitation from v1.224, not fixed here. The gallery shows historical prototype screenshots, not a recent Unity runtime test. No player identities, live counts, generated posts, fake guilds, sign-up forms or actual feedback submission were added.

## Next / non-claims

Next: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.228, `/community/onboarding`. Build a real readable preparation route, not a signup/entitlement flow. Continue page by page after verified delivery.
No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. No independent backend. No CMS. No production deployment. No payment/shop/economy. No live community/chat/forum/guild backend. No secure ticket inbox. No moderation dashboard. NO_ACCEPTED_BACKEND_CONTRACT.
