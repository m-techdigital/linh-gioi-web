Current phase: WEB-FE-GUIDES-RELEASE-READINESS-HUB-REAL-UI-LAYOUT-v1.171 WEB_CLOSED.

Current decision: v1.171 closed the active `/guides/release-readiness-hub-guide` page slice as a real browser UI/UX Layout task. The existing guide-detail direction remained the design guardrail; work focused on the rendered Release Readiness Hub guide, Sẵn sàng phát hành → cổng phê duyệt → Tải game/Trạng thái/Hỗ trợ → closed test có điều kiện flow, Vietnamese public copy and shared Base First guide-flow layout. Entire program is NOT production-complete.

- v1.171 did not create a design batch because the existing guide-detail direction was sufficient for comparison after minimal current-page scenario correction in the rendered page.
- v1.171 browser baseline showed generic guide badge, English title/copy labels, missing compact guide-flow classes, desktop h1 55.2px, desktop page 4335px, mobile hero 723.14px and mobile page 7319px.
- v1.171 replaced the stale first-flow with Vietnamese readiness hub → cổng phê duyệt → Tải game/Trạng thái/Hỗ trợ → closed test có điều kiện expectations and four compact release-readiness steps.
- v1.171 reused the shared compact guide-flow base in `packages/ui/src/service-layout.css` and added only the current page release-readiness visual theme there, while keeping current page CSS out of `apps/web/src/app/globals.css`.
- v1.171 final browser/e2e metrics: desktop hero bottom 434px, detail top 446.47px, first step top 714.33px, world CTA top 887.31px, route CTA top 1041.42px, player trust CTA top 1217.64px, release readiness CTA top 1570.08px, action band top 2213.42px, scrollHeight 2949px, h1 48px, 4 desktop columns, overflow 0; mobile hero bottom 568.38px, detail top 578.28px, first step top 740.72px, world CTA top 1274.55px, route CTA top 1537.14px, player trust CTA top 1817.34px, release readiness CTA top 2342.53px, action band top 3392.91px, scrollHeight 4422px, h1 27.52px, overflow 0.
- v1.171 evidence: browser/e2e desktop/mobile v1.171; source validator; Web/UI checks; Web build; clean current-state closure validator; screenshots `/tmp/guides-release-readiness-hub-desktop-v1171.png` and `/tmp/guides-release-readiness-hub-mobile-v1171.png`.
- Base First/CSS ownership remains mandatory: similar UI/UX Layout must be extracted or consolidated in `packages/design-tokens`/`packages/ui` before page-local code; repeated route CSS must not inflate `apps/web/src/app/globals.css`.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.172. Select `/guides/closed-tester-information-pack-guide` as the next single active page and complete it fully before moving onward.

Current phase: WEB-FE-GUIDES-PLAYER-TRUST-RELEASE-REAL-UI-LAYOUT-v1.170 WEB_CLOSED.

Current decision: v1.170 closed the active `/guides/player-trust-release-guide` page slice as a real browser UI/UX Layout task. The existing guide-detail direction remained the design guardrail; work focused on the rendered Player Trust Release guide, Phát hành → Tin cậy tải game → Trạng thái → Hỗ trợ an toàn flow, Vietnamese public copy and shared Base First guide-flow layout. Entire program is NOT production-complete.

- v1.170 did not create a design batch because the existing guide-detail direction was sufficient for comparison after minimal current-page scenario correction in the rendered page.
- v1.170 browser baseline showed generic guide badge, English title/copy labels, missing compact guide-flow classes, desktop h1 55.2px, desktop page 4387px, mobile hero 751.72px and mobile page 7318px.
- v1.170 replaced the stale first-flow with Vietnamese phát hành hiện tại → kiểm chứng CTA tải → trạng thái/hỗ trợ → điều kiện closed test expectations and four compact player-trust steps.
- v1.170 reused the shared compact guide-flow base in `packages/ui/src/service-layout.css` and added only the current page player-trust-release visual theme there, while keeping current page CSS out of `apps/web/src/app/globals.css`.
- v1.170 final browser/e2e metrics: desktop hero bottom 434px, detail top 446.47px, first step top 714.33px, world CTA top 887.31px, route CTA top 1041.42px, player trust CTA top 1217.64px, action band top 2213.42px, scrollHeight 2949px, h1 48px, 4 desktop columns, overflow 0; mobile hero bottom 568.38px, detail top 578.28px, first step top 740.72px, world CTA top 1274.55px, route CTA top 1537.14px, player trust CTA top 1817.34px, action band top 3392.91px, scrollHeight 4422px, h1 27.52px, overflow 0.
- v1.170 evidence: browser/e2e desktop/mobile v1.170; source validator; Web/UI checks; Web build; clean current-state closure validator; screenshots `/tmp/guides-player-trust-release-desktop-v1170.png` and `/tmp/guides-player-trust-release-mobile-v1170.png`.
- Base First/CSS ownership remains mandatory: similar UI/UX Layout must be extracted or consolidated in `packages/design-tokens`/`packages/ui` before page-local code; repeated route CSS must not inflate `apps/web/src/app/globals.css`.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.171. Select `/guides/release-readiness-hub-guide` as the next single active page and complete it fully before moving onward.

Current phase: WEB-FE-GUIDES-ROUTE-CONTINUITY-CONVERSION-REAL-UI-LAYOUT-v1.169 WEB_CLOSED.

Current decision: v1.169 closed the active `/guides/route-continuity-conversion-guide` page slice as a real browser UI/UX Layout task. The existing guide-detail direction remained the design guardrail; work focused on the rendered Route Continuity Conversion guide, Bắt đầu → Vòng lặp thế giới → Tin cậy tải game → Trạng thái → Hỗ trợ flow, Vietnamese public copy and shared Base First guide-flow layout. Entire program is NOT production-complete.

- v1.169 did not create a design batch because the existing guide-detail direction was sufficient for comparison after minimal current-page scenario correction in the rendered page.
- v1.169 browser baseline showed generic guide badge, English title/copy labels, missing compact guide-flow classes, desktop h1 55.2px, desktop page 4387px, mobile hero 751.72px and mobile page 7363px.
- v1.169 replaced the stale first-flow with Vietnamese Bắt đầu → Vòng lặp thế giới → Tin cậy tải game/Trạng thái → Hỗ trợ an toàn expectations and four compact route-continuity steps.
- v1.169 reused the shared compact guide-flow base in `packages/ui/src/service-layout.css` and added only the current page route-continuity visual theme there, while keeping current page CSS out of `apps/web/src/app/globals.css`.
- v1.169 final browser/e2e metrics: desktop hero bottom 434px, detail top 446.47px, first step top 714.33px, world CTA top 887.31px, route CTA top 1041.42px, action band top 2213.42px, scrollHeight 2949px, h1 48px, 4 desktop columns, overflow 0; mobile hero bottom 568.38px, detail top 578.28px, first step top 740.72px, world CTA top 1274.55px, route CTA top 1537.14px, action band top 3392.91px, scrollHeight 4422px, h1 27.52px, overflow 0.
- v1.169 evidence: browser/e2e desktop/mobile v1.169; source validator; Web/UI checks; Web build; clean current-state closure validator; screenshots `/tmp/guides-route-continuity-conversion-desktop-v1169.png` and `/tmp/guides-route-continuity-conversion-mobile-v1169.png`.
- Base First/CSS ownership remains mandatory: similar UI/UX Layout must be extracted or consolidated in `packages/design-tokens`/`packages/ui` before page-local code; repeated route CSS must not inflate `apps/web/src/app/globals.css`.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.170. Select `/guides/player-trust-release-guide` as the next single active page and complete it fully before moving onward.

Current phase: WEB-FE-GUIDES-PERFORMANCE-COPY-BUDGET-REAL-UI-LAYOUT-v1.168 WEB_CLOSED.

Current decision: v1.168 closed the active `/guides/performance-copy-budget-guide` page slice as a real browser UI/UX Layout task. The existing guide-detail direction remained the design guardrail; work focused on the rendered Performance Copy Budget guide, nội dung ngắn → visual nhẹ → route tĩnh → ranh giới cạnh CTA flow, Vietnamese public copy and shared Base First guide-flow layout. Entire program is NOT production-complete.

- v1.168 did not create a design batch because the existing guide-detail direction was sufficient for comparison after minimal current-page scenario correction in the rendered page.
- v1.168 browser baseline showed generic guide badge, English title/copy labels, missing compact guide-flow classes, no guide detail board, desktop h1 51.2px, mobile hero 723.14px and page 6507px.
- v1.168 replaced the first-flow with Vietnamese nội dung ngắn → visual nhẹ → route tĩnh → ranh giới cạnh CTA expectations and four compact performance/copy-budget steps.
- v1.168 reused the shared compact guide-flow base in `packages/ui/src/service-layout.css` and added only the current page performance visual theme there, while keeping current page CSS out of `apps/web/src/app/globals.css`.
- v1.168 final browser/e2e metrics: desktop hero bottom 424.38px, detail top 436.84px, world CTA top 845.38px, route CTA top 997.42px, action band top 2144.67px, scrollHeight 2862px, h1 42.88px, 4 desktop columns, overflow 0; mobile hero bottom 568.38px, detail top 578.28px, first step top 740.72px, world CTA top 1274.55px, action band top 3392.91px, scrollHeight 4422px, h1 27.52px, overflow 0.
- v1.168 evidence: browser/e2e desktop/mobile v1.168; source validator; Web/UI checks; Web build; clean current-state closure validator; screenshots `/tmp/guides-performance-copy-budget-desktop-v1168.png` and `/tmp/guides-performance-copy-budget-mobile-v1168.png`.
- Base First/CSS ownership remains mandatory: similar UI/UX Layout must be extracted or consolidated in `packages/design-tokens`/`packages/ui` before page-local code; repeated route CSS must not inflate `apps/web/src/app/globals.css`.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.169. Select `/guides/route-continuity-conversion-guide` as the next single active page and complete it fully before moving onward.

Current phase: WEB-FE-GUIDES-ACCESSIBILITY-READABILITY-REAL-UI-LAYOUT-v1.167 WEB_CLOSED.

Current decision: v1.167 closed the active `/guides/accessibility-readability-guide` page slice as a real browser UI/UX Layout task. The existing guide-detail direction remained the design guardrail; work focused on the rendered Accessibility Readability guide, quét tiêu đề → trang Bắt đầu → đọc mobile theo thẻ → đọc ranh giới expectation flow, Vietnamese public copy and shared Base First guide-flow layout. Entire program is NOT production-complete.

- v1.167 did not create a design batch because the existing guide-detail direction was sufficient for comparison after minimal current-page scenario correction in the rendered page.
- v1.167 browser baseline showed generic guide badge, mixed English Start hub/headings/mobile cards/safety-download boundaries/formal audit copy, missing compact guide-flow classes, no guide detail board, desktop h1 51.2px, mobile hero 723.14px and page 6507px.
- v1.167 replaced the mixed-English first-flow with Vietnamese tiêu đề → trang Bắt đầu → thẻ mobile → ranh giới expectations and four compact readability steps.
- v1.167 reused the shared compact guide-flow base in `packages/ui/src/service-layout.css` and added only the current page accessibility-readability visual theme there, while keeping current page CSS out of `apps/web/src/app/globals.css`.
- v1.167 final browser/e2e metrics: desktop hero bottom 424.38px, detail top 436.84px, world CTA top 861.22px, route CTA top 1013.27px, action band top 2160.52px, scrollHeight 2877px, h1 42.88px, 4 desktop columns, overflow 0; mobile hero bottom 568.38px, detail top 578.28px, first step top 740.72px, world CTA top 1274.55px, action band top 3392.91px, scrollHeight 4422px, h1 27.52px, overflow 0.
- v1.167 evidence: browser/e2e desktop/mobile v1.167; source validator; Web/UI checks; Web build; clean current-state closure validator; screenshots `/tmp/guides-accessibility-readability-desktop-v1167.png` and `/tmp/guides-accessibility-readability-mobile-v1167.png`.
- Base First/CSS ownership remains mandatory: similar UI/UX Layout must be extracted or consolidated in `packages/design-tokens`/`packages/ui` before page-local code; repeated route CSS must not inflate `apps/web/src/app/globals.css`.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.168. Select `/guides/performance-copy-budget-guide` as the next single active page and complete it fully before moving onward.

Current phase: WEB-FE-GUIDES-PLAYER-SAFETY-SUPPORT-REAL-UI-LAYOUT-v1.166 WEB_CLOSED.

Current decision: v1.166 closed the active `/guides/player-safety-support-guide` page slice as a real browser UI/UX Layout task. The existing guide-detail direction remained the design guardrail; work focused on the rendered Player Safety Support guide, FAQ hỗ trợ → báo lỗi an toàn → cộng đồng đúng phạm vi → kiểm trạng thái flow, Vietnamese public copy and shared Base First guide-flow layout. Entire program is NOT production-complete.

- v1.166 did not create a design batch because the existing guide-detail direction was sufficient for comparison after minimal current-page scenario correction in the rendered page.
- v1.166 browser baseline showed generic guide badge, mixed English support FAQ/bug report/closed-test support copy, missing compact guide-flow classes and no `.lgo-guide-detail-depth` board for the current slug.
- v1.166 replaced the mixed-English first-flow with Vietnamese FAQ hỗ trợ → báo lỗi an toàn → Cộng đồng → Trạng thái expectations and four compact safety/support steps.
- v1.166 reused the shared compact guide-flow base in `packages/ui/src/service-layout.css` and added only the current page player-safety visual theme there, while keeping current page CSS out of `apps/web/src/app/globals.css`.
- v1.166 final browser/e2e metrics: desktop hero bottom 464.67px, detail top 477.14px, world CTA top 901.52px, route CTA top 1053.56px, action band top 2200.81px, scrollHeight 2918px, h1 42.88px, 4 desktop columns, overflow 0; mobile hero bottom 594.23px, detail top 604.14px, first step top 766.58px, world CTA top 1300.41px, action band top 3418.77px, scrollHeight 4448px, h1 27.52px, overflow 0.
- v1.166 evidence: browser/e2e desktop/mobile v1.166; source validator; Web/UI checks; Web build; clean current-state closure validator; screenshots `/tmp/guides-player-safety-support-desktop-v1166.png` and `/tmp/guides-player-safety-support-mobile-v1166.png`.
- Base First/CSS ownership remains mandatory: similar UI/UX Layout must be extracted or consolidated in `packages/design-tokens`/`packages/ui` before page-local code; repeated route CSS must not inflate `apps/web/src/app/globals.css`.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.167. Select `/guides/accessibility-readability-guide` as the next single active page and complete it fully before moving onward.

Current phase: WEB-FE-GUIDES-WORLD-GAMEPLAY-LOOP-REAL-UI-LAYOUT-v1.165 WEB_CLOSED.

Current decision: v1.165 closed the active `/guides/world-gameplay-loop-guide` page slice as a real browser UI/UX Layout task. The existing guide-detail direction remained the design guardrail; work focused on the rendered World Gameplay Loop guide, Cổng Linh → Người Gác Cổng → Đá Luyện Tập expectation flow, Vietnamese public copy and shared Base First guide-flow layout. Entire program is NOT production-complete.

- v1.165 did not create a design batch because the existing guide-detail direction was sufficient for comparison after minimal current-page scenario correction in the rendered page.
- v1.165 browser baseline showed generic guide badge, mixed English Spirit Gate/Gate Keeper/Training Stone first-flow, missing compact guide-flow classes, desktop h1 51.2px, desktop action band around 3248.52px, mobile hero around 751.72px and page around 7333px.
- v1.165 replaced the mixed-English first-flow with Vietnamese Cổng Linh → Người Gác Cổng → Đá Luyện Tập → kiểm trạng thái tải game expectations and four compact world-loop steps.
- v1.165 reused the shared compact guide-flow base in `packages/ui/src/service-layout.css` and added only the current page world-loop visual theme there, while keeping current page CSS out of `apps/web/src/app/globals.css`.
- v1.165 final browser/e2e metrics: desktop hero bottom 424.38px, detail top 436.84px, world CTA top 845.38px, route CTA top 997.42px, action band top 2144.67px, scrollHeight 2862px, h1 42.88px, 4 desktop columns, overflow 0; mobile hero bottom 568.38px, detail top 578.28px, first step top 740.72px, world CTA top 1274.55px, action band top 3392.91px, scrollHeight 4422px, h1 27.52px, overflow 0.
- v1.165 evidence: browser/e2e desktop/mobile v1.165; source validator; Web/UI checks; Web build; clean current-state closure validator; screenshots `/tmp/guides-world-gameplay-loop-desktop-v1165.png` and `/tmp/guides-world-gameplay-loop-mobile-v1165.png`.
- Base First/CSS ownership remains mandatory: similar UI/UX Layout must be extracted or consolidated in `packages/design-tokens`/`packages/ui` before page-local code; repeated route CSS must not inflate `apps/web/src/app/globals.css`.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.166. Select `/guides/player-safety-support-guide` as the next single active page and complete it fully before moving onward.

Current phase: WEB-FE-GUIDES-START-HERE-REAL-UI-LAYOUT-v1.164 WEB_CLOSED.

Current decision: v1.164 closed the active `/guides/start-here-content-hub-guide` page slice as a real browser UI/UX Layout task. The existing guide-detail direction remained the design guardrail; work focused on the rendered Start Here guide, first-reading route selection flow, Vietnamese public copy and shared Base First guide-flow layout. Entire program is NOT production-complete.

- v1.164 did not create a design batch because the existing guide-detail direction was sufficient for comparison after minimal current-page scenario correction in the rendered page.
- v1.164 browser baseline showed generic guide badge, mixed English Start/download trust/roadmap/status/support/community copy, missing compact guide-flow classes, 3 guide steps, desktop action band around 3217px, mobile hero around 614px and page around 7209px.
- v1.164 replaced the mixed-English first-flow with Vietnamese Bắt đầu → nhóm trang phù hợp → kiểm ranh giới → đường dẫn an toàn expectations and four compact route-selection steps.
- v1.164 reused the shared compact guide-flow base in `packages/ui/src/service-layout.css` and added only the current page start-hub visual theme there, while keeping current page CSS out of `apps/web/src/app/globals.css`.
- v1.164 final browser/e2e metrics: desktop hero bottom 424.38px, detail top 436.84px, world CTA top 861.22px, action band top 2160.52px, scrollHeight 2877px, h1 42.88px, 4 desktop columns, overflow 0; mobile hero bottom 568.38px, detail top 578.28px, world CTA top 1274.55px, action band top 3392.91px, scrollHeight 4422px, h1 27.52px, overflow 0.
- v1.164 evidence: browser/e2e desktop/mobile v1.164; source validator; Web/UI checks; Web build; clean current-state closure validator; screenshots `/tmp/guides-start-here-desktop-v1164.png` and `/tmp/guides-start-here-mobile-v1164.png`.
- Base First/CSS ownership remains mandatory: similar UI/UX Layout must be extracted or consolidated in `packages/design-tokens`/`packages/ui` before page-local code; repeated route CSS must not inflate `apps/web/src/app/globals.css`.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.165. Select `/guides/world-gameplay-loop-guide` as the next single active page and complete it fully before moving onward.

Current phase: WEB-FE-GUIDES-COMMUNITY-ROADMAP-REAL-UI-LAYOUT-v1.163 WEB_CLOSED.

Current decision: v1.163 closed the active `/guides/community-roadmap-onboarding-guide` page slice as a real browser UI/UX Layout task. The existing guide-detail direction remained the design guardrail; work focused on the rendered Community Roadmap guide, status/roadmap/community expectation flow, Vietnamese public copy and shared Base First guide-flow layout. Entire program is NOT production-complete.

- v1.163 did not create a design batch because the existing guide-detail direction was sufficient for comparison after minimal current-page scenario correction in the rendered page.
- v1.163 browser baseline showed generic guide badge, missing compact guide-flow classes, 3 guide steps, desktop hero 429px with action band around 3265px, mobile hero 642px with action band around 5722px and page around 7222px.
- v1.163 replaced mixed English roadmap/status/community wording with Vietnamese Trạng thái chơi → Lộ trình → phản hồi đúng phạm vi → thông báo chủ sở hữu expectations and four compact community-roadmap steps.
- v1.163 reused the shared compact guide-flow base in `packages/ui/src/service-layout.css` and added only the current page community-roadmap visual theme there, while keeping current page CSS out of `apps/web/src/app/globals.css`.
- v1.163 final browser/e2e metrics: desktop hero bottom 464.67px, detail top 477.14px, world CTA top 901.52px, action band top 2200.81px, scrollHeight 2918px, h1 42.88px, 4 desktop columns, overflow 0; mobile hero bottom 594.23px, detail top 604.14px, world CTA top 1300.41px, action band top 3418.77px, scrollHeight 4448px, h1 27.52px, overflow 0.
- v1.163 evidence: browser/e2e desktop/mobile v1.163; source validator; Web/UI checks; Web build; clean current-state closure validator; screenshots `/tmp/guides-community-roadmap-desktop-v1163.png` and `/tmp/guides-community-roadmap-mobile-v1163.png`.
- Base First/CSS ownership remains mandatory: similar UI/UX Layout must be extracted or consolidated in `packages/design-tokens`/`packages/ui` before page-local code; repeated route CSS must not inflate `apps/web/src/app/globals.css`.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.164. Select `/guides/start-here-content-hub-guide` as the next single active page and complete it fully before moving onward.

Current phase: WEB-FE-GUIDES-RELEASE-TRUST-REAL-UI-LAYOUT-v1.162 WEB_CLOSED.

Current decision: v1.162 closed the active `/guides/release-trust-and-checksum-guide` page slice as a real browser UI/UX Layout task. The existing guide-detail direction remained the design guardrail; work focused on the rendered Release Trust guide, artifact/checksum/provenance/owner-approval proof flow, Vietnamese public copy and shared Base First guide-flow layout. Entire program is NOT production-complete.

- v1.162 did not create a design batch because the existing guide-detail direction was sufficient for comparison after minimal current-page scenario correction in the rendered page.
- v1.162 browser baseline showed placeholder English first-flow, missing compact guide-flow classes, 3 guide steps, desktop action band around 3136px, mobile action band around 5635px and mobile page around 7136px.
- v1.162 replaced the placeholder first-flow with Vietnamese gói build → checksum → giới hạn build → trạng thái/hỗ trợ expectations and four compact proof-before-download steps.
- v1.162 reused the shared compact guide-flow base in `packages/ui/src/service-layout.css` and added only the current page release-trust visual theme there, while keeping current page CSS out of `apps/web/src/app/globals.css`.
- v1.162 final browser/e2e metrics: desktop hero bottom 464.67px, detail top 477.14px, world CTA top 885.67px, action band top 2184.97px, scrollHeight 2902px, h1 42.88px, 4 desktop columns, overflow 0; mobile hero bottom 594.23px, detail top 604.14px, world CTA top 1286.86px, action band top 3405.22px, scrollHeight 4435px, h1 27.52px, overflow 0.
- v1.162 evidence: browser/e2e desktop/mobile v1.162; source validator; Web/UI checks; Web build; clean current-state closure validator; screenshots `/tmp/guides-release-trust-desktop-v1162.png` and `/tmp/guides-release-trust-mobile-v1162.png`.
- Base First/CSS ownership remains mandatory: similar UI/UX Layout must be extracted or consolidated in `packages/design-tokens`/`packages/ui` before page-local code; repeated route CSS must not inflate `apps/web/src/app/globals.css`.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.163. Select `/guides/community-roadmap-onboarding-guide` as the next single active page and complete it fully before moving onward.

Current phase: WEB-FE-GUIDES-SUPPORT-COMMUNITY-REAL-UI-LAYOUT-v1.161 WEB_CLOSED.

Current decision: v1.161 closed the active `/guides/support-and-community-guide` page slice as a real browser UI/UX Layout task. The existing guide-detail direction remained the design guardrail; work focused on the rendered Support and Community guide, safe-feedback first-flow, Vietnamese FAQ/feedback/ticket scenario and shared Base First layout. Entire program is NOT production-complete.

- v1.161 did not create a new design batch because the existing guide-detail direction was sufficient for comparison after minimal current-page scenario correction in the rendered page.
- v1.161 replaced the English placeholder first-flow with Vietnamese FAQ → safe feedback → community update → support boundary expectations and four compact safe-feedback steps.
- v1.161 reused the shared compact guide-flow base in `packages/ui/src/service-layout.css` and added only the current page support/community visual theme there, while keeping current page CSS out of `apps/web/src/app/globals.css`.
- v1.161 evidence: browser/e2e desktop/mobile v1.161; source validator; Web/UI checks; Web build; clean current-state closure validator; screenshots `/tmp/guides-support-community-desktop-v1161.png` and `/tmp/guides-support-community-mobile-v1161.png`.
- Base First/CSS ownership remains mandatory: similar UI/UX Layout must be extracted or consolidated in `packages/design-tokens`/`packages/ui` before page-local code; repeated route CSS must not inflate `apps/web/src/app/globals.css`.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.162. Select `/guides/release-trust-and-checksum-guide` as the next single active page and complete it fully before moving onward.

Current phase: WEB-FE-GUIDES-DOWNLOAD-READINESS-REAL-UI-LAYOUT-v1.160 WEB_CLOSED.

Current decision: v1.160 closed the active `/guides/download-readiness-guide` page slice as a real browser UI/UX Layout task. The existing guide-detail direction remained the design guardrail; work focused on the rendered Download Readiness guide, proof-before-download first-flow, Vietnamese release artifact/checksum scenario and shared Base First layout. Entire program is NOT production-complete.

- v1.160 did not create a new design batch because the existing guide-detail direction was sufficient for comparison after minimal current-page scenario correction in the rendered page.
- v1.160 replaced the English placeholder first-flow with Vietnamese build artifact → checksum → release note → entitlement boundary expectations and four compact proof-before-download steps.
- v1.160 reused the shared compact guide-flow base in `packages/ui/src/service-layout.css` and added only the current page download-readiness visual theme there, while keeping current page CSS out of `apps/web/src/app/globals.css`.
- v1.160 evidence: browser/e2e desktop/mobile v1.160; source validator; Web/UI checks; Web build; clean current-state closure validator; screenshots `/tmp/guides-download-readiness-desktop-v1160.png` and `/tmp/guides-download-readiness-mobile-v1160.png`.
- Base First/CSS ownership remains mandatory: similar UI/UX Layout must be extracted or consolidated in `packages/design-tokens`/`packages/ui` before page-local code; repeated route CSS must not inflate `apps/web/src/app/globals.css`.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.161. Select `/guides/support-and-community-guide` as the next single active page and complete it fully before moving onward.

Current phase: WEB-FE-GUIDES-BEGINNER-TRAINING-LOOP-REAL-UI-LAYOUT-v1.159 WEB_CLOSED.

Current decision: v1.159 closed the active `/guides/beginner-training-loop-guide` page slice as a real browser UI/UX Layout task. The existing guide-detail direction remained the design guardrail; work focused on the rendered Beginner Training Loop guide, first-fold density, Vietnamese onboarding/training scenario and shared Base First layout. Entire program is NOT production-complete.

- v1.159 did not create a new design batch because the existing guide-detail direction was sufficient for comparison after minimal current-page scenario correction in the rendered page.
- v1.159 replaced the English placeholder first-flow with Vietnamese Cổng Linh → Gate Keeper → Training Stone expectations and four compact training steps.
- v1.159 introduced the shared compact guide-flow base in `packages/ui/src/service-layout.css` and let both compact guide-detail variants compose it, while keeping current page CSS out of `apps/web/src/app/globals.css`.
- v1.159 evidence: browser/e2e desktop/mobile v1.159; source validator; Web/UI checks; Web build; clean current-state closure validator; screenshots `/tmp/guides-beginner-training-loop-desktop-v1159.png` and `/tmp/guides-beginner-training-loop-mobile-v1159.png`.
- Base First/CSS ownership remains mandatory: similar UI/UX Layout must be extracted or consolidated in `packages/design-tokens`/`packages/ui` before page-local code; repeated route CSS must not inflate `apps/web/src/app/globals.css`.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.160. Select `/guides/download-readiness-guide` as the next single active page and complete it fully before moving onward.

Current phase: WEB-FE-GUIDES-GATE-ENTRY-REAL-UI-LAYOUT-v1.158 WEB_CLOSED.

Current decision: v1.158 closed the active `/guides/gate-entry-guide` page slice as a real browser UI/UX Layout task. The existing guide-detail direction remained the design guardrail; work focused on the rendered Gate Entry guide, first-fold density, Vietnamese Cổng Linh scenario and shared Base First layout. Entire program is NOT production-complete.

- v1.158 did not create a new design batch because the existing guide-detail direction was sufficient for comparison after minimal current-page scenario correction in the rendered page.
- v1.158 replaced the English placeholder first-flow with Vietnamese Cổng Linh → Người Giữ Cổng → Đá Luyện expectations and three compact guide steps.
- v1.158 extended shared `packages/ui/src/service-layout.css` with a Gate Entry composition class for dense guide-detail cards and generic CTA rhythm, while keeping Gate Entry route CSS out of `apps/web/src/app/globals.css`.
- v1.158 also fixed the existing mobile app-shell brand link wrap in `apps/web/src/app/globals.css` because browser metrics found visible nav overflow on this page.
- v1.158 evidence: browser/e2e desktop/mobile v1.158; source validator; Web/UI checks; Web build; clean current-state closure validator; screenshots `/tmp/guides-gate-entry-desktop-v1158.png` and `/tmp/guides-gate-entry-mobile-v1158.png`.
- Base First/CSS ownership remains mandatory: similar UI/UX Layout must be extracted or consolidated in `packages/design-tokens`/`packages/ui` before page-local code; repeated route CSS must not inflate `apps/web/src/app/globals.css`.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.159. Select `/guides/beginner-training-loop-guide` as the next single active page and complete it fully before moving onward.

Current phase: WEB-FE-GUIDES-BEGINNER-REAL-UI-LAYOUT-v1.157 WEB_CLOSED.

Current decision: v1.157 closed the active `/guides/beginner` page slice as a real browser UI/UX Layout task. The existing beginner-guide direction remained the design guardrail; work focused on the rendered beginner guide, first-fold density, Vietnamese game-scenario labels and shared Base First layout. Entire program is NOT production-complete.

- v1.157 did not create a new design batch because the existing beginner-guide direction was sufficient for comparison after minimal Vietnamese alignment in the rendered page.
- v1.157 replaced the tall v1.8 raw information flow with a compact hero, world-story cards, four beginner steps, download status and FAQ.
- v1.157 moved reusable game-information depth CSS out of `apps/web/src/app/globals.css` and into shared `packages/ui/src/service-layout.css`.
- v1.157 evidence: browser/e2e desktop/mobile v1.157; source validator; Web/UI checks; Web build; clean current-state closure validator; screenshots `/tmp/guides-beginner-desktop-v1157.png` and `/tmp/guides-beginner-mobile-v1157.png`.
- Base First/CSS ownership remains mandatory: similar UI/UX Layout must be extracted or consolidated in `packages/design-tokens`/`packages/ui` before page-local code; repeated route CSS must not inflate `apps/web/src/app/globals.css`.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.158. Select `/guides/gate-entry-guide` as the next single active page and complete it fully before moving onward.

Current phase: WEB-FE-GUIDES-INDEX-REAL-UI-LAYOUT-v1.156 WEB_CLOSED.

Current decision: v1.156 closed the active `/guides` page slice as a real browser UI/UX Layout task. The existing public guide/index direction remained the design guardrail; work focused on the rendered guide index, first-fold structure, Vietnamese scenario labels and shared Base First layout. Entire program is NOT production-complete.

- v1.156 did not create a new design batch because the existing guide/index target direction was sufficient for comparison after minimal Vietnamese alignment in the rendered page.
- v1.156 replaced the raw long guide list with a compact hero, reading map, featured world-loop guide, primary guide grid and archive grid.
- v1.156 added shared guide-index layout CSS in `packages/ui/src/service-layout.css` and kept `apps/web/src/app/globals.css` from growing with guide-index route CSS.
- v1.156 evidence: browser/e2e desktop/mobile v1.156; source validator; Web/UI checks; Web build; clean current-state closure validator; screenshots `/tmp/guides-index-desktop-v1156.png` and `/tmp/guides-index-mobile-v1156.png`.
- Base First/CSS ownership remains mandatory: similar UI/UX Layout must be extracted or consolidated in `packages/design-tokens`/`packages/ui` before page-local code; repeated route CSS must not inflate `apps/web/src/app/globals.css`.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.157. Select `/guides/beginner` as the next single active page and complete it fully before moving onward.

Current phase: WEB-FE-GUIDE-WORLD-LOOP-REAL-UI-LAYOUT-v1.155 WEB_CLOSED.

Current decision: v1.155 closed the active `/guides/world-gameplay-loop-guide` page slice as a real browser UI/UX Layout task. The existing guide/detail target and current gameplay-loop scenario remained the design guardrail; work focused on the rendered guide page, first-heading order, Vietnamese scenario boundaries and shared Base First layout. Entire program is NOT production-complete.

- v1.155 did not create a new design batch because the existing public guide/detail target was sufficient for comparison after minimal Vietnamese alignment in the rendered page.
- v1.155 moved guide detail content before generic CTAs so the page starts with `Vòng lặp thế giới: từ Spirit Gate tới Training Stone` and guide steps.
- v1.155 moved guide detail layout CSS out of `apps/web/src/app/globals.css` and into shared `packages/ui/src/service-layout.css`.
- v1.155 evidence: browser/e2e desktop/mobile v1.155; source validator; Web/content/UI checks; Web build; clean current-state closure validator; screenshots `/tmp/guide-world-loop-desktop-v1155.png` and `/tmp/guide-world-loop-mobile-v1155.png`.
- Base First/CSS ownership remains mandatory: similar UI/UX Layout must be extracted or consolidated in `packages/design-tokens`/`packages/ui` before page-local code; repeated route CSS must not inflate `apps/web/src/app/globals.css`.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.156. Select `/guides` as the next single active page and complete it fully before moving onward.

Current phase: WEB-FE-GAME-LOOP-REAL-UI-LAYOUT-v1.154 WEB_CLOSED.

Current decision: v1.154 closed the active `/game/loop` page slice as a real browser UI/UX Layout task. The existing gameplay-loop board remained the design guardrail; work focused on the rendered page, first-fold order, Vietnamese game-scenario boundaries and shared Base First layout. Entire program is NOT production-complete.

- v1.154 did not create a new design batch because the existing gameplay-loop board was sufficient for comparison after minimal Vietnamese alignment in the rendered page.
- v1.154 replaced the old English-heavy first-flow with Vietnamese `Vòng lặp gameplay thế giới`, a compact boundary, the gameplay-loop board and a three-step loop gate path.
- v1.154 moved gameplay-loop board/stage layout CSS out of `apps/web/src/app/globals.css` and into shared `packages/ui/src/service-layout.css`.
- v1.154 evidence: browser/e2e desktop/mobile v1.154 and historical v1.82/v1.89 compatibility; source validator; Web/content/UI checks; Web build; clean current-state closure validator; screenshots `/tmp/game-loop-desktop-v1154.png` and `/tmp/game-loop-mobile-v1154.png`.
- Base First/CSS ownership remains mandatory: similar UI/UX Layout must be extracted or consolidated in `packages/design-tokens`/`packages/ui` before page-local code; repeated route CSS must not inflate `apps/web/src/app/globals.css`.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.155. Select `/guides/world-gameplay-loop-guide` as the next single active page and complete it fully before moving onward.

Current phase: WEB-FE-ROADMAP-REAL-UI-LAYOUT-v1.153 WEB_CLOSED.

Current decision: v1.153 closed the active `/roadmap` page slice as a real browser UI/UX Layout task. The existing roadmap board remained the design guardrail; work focused on the rendered page, first-flow hierarchy, Vietnamese game-scenario boundaries and shared Base First layout. Entire program is NOT production-complete.

- v1.153 did not create a new design batch because the existing roadmap board was sufficient for comparison after minimal Vietnamese alignment in the rendered page.
- v1.153 replaced the old English-heavy first-flow with Vietnamese `Roadmap phát triển web`, a compact boundary, the roadmap flow board and a three-step roadmap gate path.
- v1.153 moved roadmap board/layout CSS out of `apps/web/src/app/globals.css` and into shared `packages/ui/src/service-layout.css`.
- v1.153 evidence: browser/e2e desktop/mobile v1.153 and historical v1.70 roadmap-board compatibility; source validator; Web/content/UI checks; Web build; clean current-state closure validator; screenshots `/tmp/roadmap-desktop-v1153.png` and `/tmp/roadmap-mobile-v1153.png`.
- Base First/CSS ownership remains mandatory: similar UI/UX Layout must be extracted or consolidated in `packages/design-tokens`/`packages/ui` before page-local code; repeated route CSS must not inflate `apps/web/src/app/globals.css`.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.154. Select `/game/loop` as the next single active page and complete it fully before moving onward.

Current phase: WEB-FE-ACCESSIBILITY-REAL-UI-LAYOUT-v1.152 WEB_CLOSED.

Current decision: v1.152 closed the active `/accessibility` page slice as a real browser UI/UX Layout task. The existing Public Service design target remained the guardrail; work focused on the rendered page and shared Base First layout. Entire program is NOT production-complete.

- v1.152 did not create a new design batch because the registered Public Service target was sufficient for comparison.
- v1.152 replaced the old English-heavy first-flow with Vietnamese `Dễ đọc và dễ thao tác`, a compact boundary, the route-map board and a three-step readability path.
- v1.152 moved accessibility board/layout CSS out of `apps/web/src/app/globals.css` and into shared `packages/ui/src/service-layout.css`.
- v1.152 evidence: browser/e2e desktop/mobile v1.152 and historical v1.78/v1.89 compatibility; source validator; Web/content/UI checks; Web build; clean current-state closure validator; screenshots `/tmp/accessibility-desktop-v1152.png` and `/tmp/accessibility-mobile-v1152.png`.
- Base First/CSS ownership remains mandatory: similar UI/UX Layout must be extracted or consolidated in `packages/design-tokens`/`packages/ui` before page-local code; repeated route CSS must not inflate `apps/web/src/app/globals.css`.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.153. Select `/roadmap` as the next single active page and complete it fully before moving onward.

Current phase: WEB-FE-PERFORMANCE-REAL-UI-LAYOUT-v1.151 WEB_CLOSED.

Current decision: v1.151 closed the active `/performance` page slice as a real browser UI/UX Layout task. The existing Public Service design target remained the guardrail; work focused on the rendered page and shared Base First layout. Entire program is NOT production-complete.

- v1.151 did not create a new design batch because the registered Public Service target was sufficient for comparison.
- v1.151 replaced the old English-heavy first-flow with Vietnamese `Hiệu năng và ngân sách nội dung`, a compact boundary, the HUD board and a three-step performance budget path.
- v1.151 moved performance board/layout CSS out of `apps/web/src/app/globals.css` and into shared `packages/ui/src/service-layout.css`.
- v1.151 evidence: browser/e2e desktop/mobile v1.151 and historical v1.76 performance-board compatibility; source validator; Web/content/UI checks; Web build; clean current-state closure validator; screenshots `/tmp/performance-desktop-v1151.png` and `/tmp/performance-mobile-v1151.png`.
- Base First/CSS ownership remains mandatory: similar UI/UX Layout must be extracted or consolidated in `packages/design-tokens`/`packages/ui` before page-local code; repeated route CSS must not inflate `apps/web/src/app/globals.css`.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.152. Select `/accessibility` as the next single active page and complete it fully before moving onward.

Current phase: WEB-FE-COMMUNITY-ONBOARDING-REAL-UI-LAYOUT-v1.150 WEB_CLOSED.

Current decision: v1.150 closed the active `/community/onboarding` page slice as a real browser UI/UX Layout task. The existing Public Service design target remained the guardrail; work focused on the rendered page and shared Base First layout. Entire program is NOT production-complete.

- v1.150 did not create a new design batch because the registered Public Service target was sufficient for comparison.
- v1.150 replaced the old English first-flow with Vietnamese `Hòa nhập cộng đồng Linh Giới`, a compact boundary, the gameplay-loop board and a three-step reading path.
- v1.150 moved community onboarding board/layout CSS out of `apps/web/src/app/globals.css` and into shared `packages/ui/src/service-layout.css`.
- v1.150 evidence: browser/e2e desktop/mobile v1.150 and historical v1.75 onboarding-board compatibility; source validator; Web/content/UI checks; Web build; clean current-state closure validator; screenshots `/tmp/community-onboarding-desktop-v1150.png` and `/tmp/community-onboarding-mobile-v1150.png`.
- Base First/CSS ownership remains mandatory: similar UI/UX Layout must be extracted or consolidated in `packages/design-tokens`/`packages/ui` before page-local code; repeated route CSS must not inflate `apps/web/src/app/globals.css`.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.151. Select `/performance` as the next single active page and complete it fully before moving onward.

Current phase: WEB-FE-COMMUNITY-REAL-UI-LAYOUT-v1.149 WEB_CLOSED.

Current decision: v1.149 closed the active `/community` page slice as a real browser UI/UX Layout task. `/community` now has its own Vietnamese community design target, registered under Public Community, and uses shared Base First community layout from `packages/ui/src/service-layout.css`. Entire program is NOT production-complete.

- v1.149 created `community-detailed-design-target-v1149.png` because `/community` only had the broad Public Service atlas and needed a concrete page target for comparison.
- v1.149 used the target only as a guardrail, then repaired the real browser page.
- v1.149 updated `/community` first-flow: compact Cộng đồng Linh Giới hero → community board → Hòa nhập/Quy tắc/Phản hồi cards → Linh Thành screenshots.
- v1.149 evidence: RED browser metrics showed desktop h1 64px, first-flow leaked chat/forum/guild/No CMS/Real feedback, plaza top 1055.641, onboarding top 2387.266; mobile hero bottom 15080.172 due broad stack measurement, plaza top 1891.484, onboarding top 4372.531, first-flow leaked chat/forum/guild/backend labels; GREEN browser metrics show desktop overflow 0, h1 34.816px, hero bottom 373.125, board top 372.484, board bottom 564.234, focus top 593.188, focus bottom 871.375, plaza top 889.922, onboarding top 1957.422; mobile overflow 0, h1 39px, hero bottom 542.797, board top 550.797, board bottom 847.875, focus top 879.063, focus bottom 1487.297, plaza top 1502.484, onboarding top 3574.563.
- Base First/CSS ownership remains mandatory: similar UI/UX Layout must be extracted or consolidated in `packages/design-tokens`/`packages/ui` before page-local code; repeated route CSS must not inflate `apps/web/src/app/globals.css`.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.150. Select `/community/onboarding` as the next single active page and complete it fully before moving onward.

Current phase: WEB-FE-SUPPORT-SAFETY-REAL-UI-LAYOUT-v1.148 WEB_CLOSED.

Current decision: v1.148 closed the active `/support/safety` page slice as a real browser UI/UX Layout task. `/support/safety` kept its existing Vietnamese support-safety target, removed stale support-safety CSS from `apps/web/src/app/globals.css`, and now uses shared Base First safe-reporting layout from `packages/ui/src/service-layout.css`. Entire program is NOT production-complete.

- v1.148 did not regenerate design because the existing `/support/safety` target was already Vietnamese and usable for comparison.
- v1.148 replaced stale first-flow `Design Target First` copy with `Board tham chiếu` and localized the target scope to `Hỗ trợ an toàn`.
- v1.148 moved support-safety board/checklist/principles/issue density away from `apps/web/src/app/globals.css` and into reusable shared support/safety classes.
- v1.148 updated `/support/safety` first-flow: compact Báo lỗi an toàn hero → safety board → safety checklist → player-safety principles → issue categories.
- v1.148 evidence: RED browser metrics showed desktop hero bottom 456.406, board bottom 719.578, checklist bottom 1034.938, principles top 1060.531, issue top 1641.672; mobile hero bottom 899.922, board bottom 1431.859, checklist bottom 3100.203, principles top 3156.203, issue top 5020.328; GREEN browser metrics show desktop overflow 0, h1 34.816px, hero bottom 368.953, board top 368.313, board bottom 560.063, heading top 590.609, checklist bottom 845.625, principles top 864.172, issue top 1329.75; mobile overflow 0, h1 39px, hero bottom 516.547, board top 524.547, board bottom 821.625, heading top 852.813, checklist bottom 1425.188, principles top 1440.375, issue top 2524.813.
- Base First/CSS ownership remains mandatory: similar UI/UX Layout must be extracted or consolidated in `packages/design-tokens`/`packages/ui` before page-local code; repeated route CSS must not inflate `apps/web/src/app/globals.css`.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.149. Select `/community` as the next single active page and complete it fully before moving onward.

Current phase: WEB-FE-SUPPORT-HELP-REAL-UI-LAYOUT-v1.147 WEB_CLOSED.

Current decision: v1.147 closed the active `/support/help` page slice as a real browser UI/UX Layout task. `/support/help` kept its existing Vietnamese support-help target, removed stale support-help route CSS from `apps/web/src/app/globals.css`, and now uses shared Base First FAQ route-map layout from `packages/ui/src/service-layout.css`. Entire program is NOT production-complete.

- v1.147 did not regenerate design because the existing `/support/help` target was already Vietnamese and usable for comparison.
- v1.147 replaced stale first-flow `Design Target First` copy with `Board tham chiếu` and localized the target scope to `Trung tâm trợ giúp`.
- v1.147 moved support-help route-map/discovery/issue density away from `apps/web/src/app/globals.css` and into reusable shared support/help classes.
- v1.147 updated `/support/help` first-flow: compact FAQ nhanh hero → support-help board → route map → FAQ discovery groups → issue categories.
- v1.147 evidence: RED browser metrics showed desktop hero 493.266, board 494.063–756.438, routes top 926.625, discovery top 1169.484; mobile hero 955.344, board bottom 1489.75, routes top 1855.188, discovery top 3809.844; GREEN browser metrics show desktop overflow 0, h1 34.816px, hero bottom 400.75, board top 396.109, board bottom 587.859, route board top 616.813, route board bottom 883.453, discovery top 902.0, issue top 1322.109; mobile overflow 0, h1 39px, hero bottom 531.547, board top 539.547, board bottom 879.859, route board top 911.047, route board bottom 1474.328, discovery top 1489.516, issue top 2745.391.
- Base First/CSS ownership was strengthened: similar UI/UX Layout must be extracted or consolidated in `packages/design-tokens`/`packages/ui` before page-local code; repeated route CSS must not inflate `apps/web/src/app/globals.css`.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.148. Select `/support/safety` as the next single active page and complete it fully before moving onward.

Current phase: WEB-FE-SUPPORT-REAL-UI-LAYOUT-v1.146 WEB_CLOSED.

Current decision: v1.146 closed the active `/support` page slice as a real browser UI/UX Layout task. `/support` kept its existing Vietnamese support target, removed stale page-local v1.131 support CSS, and now uses shared Base First support/service layout from `packages/ui/src/service-layout.css`. Entire program is NOT production-complete.

- v1.146 did not regenerate design because the existing `/support` target was already Vietnamese and usable for comparison.
- v1.146 replaced stale first-flow `Design Target First` copy with `Board tham chiếu` and localized the target scope to `Hỗ trợ cộng đồng`.
- v1.146 moved support density away from `apps/web/src/app/globals.css` and into reusable shared service/support classes.
- v1.146 updated `/support` first-flow: compact Hỗ trợ cộng đồng hero → support station board → support topic board → FAQ → safety CTA.
- v1.146 evidence: RED browser metrics showed mobile board bottom 1949.375px and FAQ top 2558.531px; GREEN browser metrics show desktop overflow 0, h1 34.816px, hero bottom 363.094px, board bottom 550.203px, topic board top 584.75px, FAQ top 870.766px; mobile overflow 0, h1 46.8px, hero bottom 497.453px, board bottom 802.531px, topic board top 833.719px and FAQ top 1330.063px.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.147. Select `/support/help` as the next single active page and complete it fully before moving onward.

Current phase: WEB-FE-STATUS-REAL-UI-LAYOUT-v1.145 WEB_CLOSED.

Current decision: v1.145 closed the active `/status` page slice as a real browser UI/UX Layout task. `/status` now uses a Vietnamese status target, Vietnamese public status signal board, compact shared service/proof layout, and Base First proof cards from `packages/ui/src/service-layout.css`. Entire program is NOT production-complete.

- v1.145 corrected only the current status design target because the existing target was English-heavy and blocked comparison.
- v1.145 replaced the stale status HUD SVG with a Vietnamese Board tín hiệu trạng thái công khai.
- v1.145 moved status density away from page-local v1.130 CSS in `apps/web/src/app/globals.css` and into reusable shared service/proof classes.
- v1.145 updated `/status` first-flow: compact Trạng thái công khai hero → status signal board → public fixture cards → status explainers → trust surfaces.
- v1.145 evidence: RED browser metrics showed English leaks and stale Maintenance/Status labels; GREEN browser metrics after fix show desktop overflow 0, h1 34.816px, hero bottom 486.797px, board top 482.156px, board bottom 673.906px, fixture top 708.453px, fixture board bottom 835.281px, explainers top 853.828px, trust top 1126.859px; mobile overflow 0 and h1 46.8px.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.146. Select `/support` as the next single active page and complete it fully before moving onward.

Current phase: WEB-FE-TESTER-PACK-REAL-UI-LAYOUT-v1.144 WEB_CLOSED.

Current decision: v1.144 closed the active `/release/tester-pack` page slice as a real browser UI/UX Layout task. `/release/tester-pack` now uses a Vietnamese tester-pack target, Vietnamese closed tester board, compact shared service/proof layout, and Base First proof list/card density from `packages/ui/src/service-layout.css`. Entire program is NOT production-complete.

- v1.144 corrected only the current tester-pack design target because the existing target was English-heavy and blocked comparison.
- v1.144 replaced the old English closed tester workflow SVG with a Vietnamese Gói tester cộng đồng board.
- v1.144 moved tester-pack density away from page-local v1.129 CSS in `apps/web/src/app/globals.css` and into reusable `packages/ui/src/service-layout.css` proof list/item classes.
- v1.144 updated `/release/tester-pack` first-flow: compact Gói tester cộng đồng hero → board → tester guidance → checklist → feedback an toàn → giới hạn đã biết → mẫu báo cáo thiết bị.
- v1.144 evidence: RED browser metrics showed desktop hero 409.656px, mobile hero 859.703px and first-flow English leaks; GREEN browser metrics after fix show desktop overflow 0, h1 34.816px, hero bottom 471.797px, board top 467.156px, board bottom 658.906px, checklist top 845.688px; mobile overflow 0 and h1 46.8px.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.145. Select `/status` as the next single active page and complete it fully before moving onward.

Current phase: WEB-FE-RELEASE-READINESS-REAL-UI-LAYOUT-v1.143 WEB_CLOSED.

Current decision: v1.143 closed the active `/release/readiness` page slice as a real browser UI/UX Layout task. `/release/readiness` now prioritizes rendered layout over design iteration: compact Sẵn sàng phát hành hero, blocked-readiness seal, readiness board, readiness hub and owner gates. Entire program is NOT production-complete.

- v1.143 changed governance: Real Browser UI/UX Layout First supersedes Design Target First; design target work is only a minimal comparison guardrail.
- v1.143 added Base First/CSS ownership guardrails: similar layouts must be consolidated into `packages/design-tokens` or `packages/ui`, and repeated route CSS must not inflate `apps/web/src/app/globals.css`.
- v1.143 moved reusable compact service/proof layout to `packages/ui/src/service-layout.css` and imported it in the web app layout.
- v1.143 updated `/release/readiness` first-flow under `.lgo-service-compact-proof-page`: hero → readiness board → readiness hub → owner gates.
- v1.143 evidence: RED browser/e2e reproduced stale heading/layout and mobile owner gate distance 2352.39px after hub; GREEN Playwright desktop/mobile PASS 2/2 after Base First layout fix; screenshot metrics reviewed: 1280x720 overflow 0, h1 34.816px, hero bottom 391.5, board top 386.859, board bottom 575.609, hub top 598.156.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.144. Select `/release/tester-pack` as the next single active page and complete it fully before moving onward.

Current phase: WEB-FE-RELEASE-VIETNAMESE-DESIGN-MATCH-v1.142 WEB_CLOSED.

Current decision: v1.142 closed the active `/release` page slice after refreshing the Public Release design target to Vietnamese and matching the implemented page in browser. `/release` now follows the target release-stage scenario more closely: compact Hành trình phát hành hero, M0 → M1 board, six proof-before-promise stage cards and delayed readiness follow-up. Entire program is NOT production-complete.

- v1.142 refreshed `release-detailed-design-target-v1127.png` with built-in imagegen and mirrored it under `docs/design/reference`.
- v1.142 translated Public Release target/page labels and the visible M0 → M1 design-board SVG to Vietnamese.
- v1.142 reworked `/release` first-flow under `.lgo-releasepage-stack`: hero → M0/M1 board → proof stage cards → readiness follow-up.
- v1.142 evidence: RED browser/e2e reproduced stale English target label; Playwright desktop/mobile `/release` Vietnamese design-match PASS 2/2 after fix; screenshot metrics reviewed: 1280x720 hero 360.922, board top 356.125, board bottom 537.875, stages top 561.875, overflow 0.
- Design must follow the Linh Giới game scenario and stay coherent with accepted targets; stale, English-heavy or scenario-wrong targets must be replaced before implementation.
- Real UI/Layout First is now mandatory: after the smallest target correction needed for comparison, stop design iteration and prioritize rendered browser layout, spacing, typography, first-fold density, responsiveness and accessibility. Localization-only or target-only work cannot close a page.
- Base First/CSS ownership is mandatory: similar UI/UX Layout patterns must be extracted or consolidated in `packages/design-tokens`/`packages/ui` before page-local code; repeated CSS must not keep inflating `apps/web/src/app/globals.css` without a one-off reason in handoff.
- Sequential Page Completion, Real Browser UI/UX Layout First, minimal design-target guardrail, Layout Match Before Closure and Base UI/UX Layout remain mandatory.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.143. Select `/release/readiness` as the next single active page and complete it fully before moving onward.

Current phase: WEB-FE-DOWNLOAD-TRUST-VIETNAMESE-DESIGN-MATCH-v1.141 WEB_CLOSED.

Current decision: v1.141 closed the active `/download/trust` page slice after refreshing the Public Download Trust design target to Vietnamese and matching the implemented page in browser. `/download/trust` now follows the target trust-gate scenario more closely: compact trust hero, immediate cổng kiểm tin tải game board, six Vietnamese release-evidence gates and delayed readiness/owner follow-up. Entire program is NOT production-complete.

- v1.141 refreshed `download-trust-detailed-design-target-v1126.png` with built-in imagegen and mirrored it under `docs/design/reference`.
- v1.141 translated Public Download Trust target/page labels, trust components and release gate fixture labels to Vietnamese.
- v1.141 reworked `/download/trust` first-flow under `.lgo-downloadtrustpage-stack`: hero → trust gate board → why/readiness → owner gates.
- v1.141 evidence: RED browser/e2e reproduced stale English target label; Playwright desktop/mobile `/download/trust` Vietnamese design-match PASS 2/2 after fix; screenshot metrics reviewed: 1280x720 hero 416.328, trust gate top 421.922, first gates top 1160.734, overflow 0.
- Design must follow the Linh Giới game scenario and stay coherent with accepted targets; stale, English-heavy or scenario-wrong targets must be replaced before implementation.
- Sequential Page Completion, Real Browser UI/UX Layout First, minimal design-target guardrail, Layout Match Before Closure and Base UI/UX Layout remain mandatory.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.142. Select `/release` as the next single active page and complete it fully before moving onward.

Current phase: WEB-FE-DOWNLOAD-VIETNAMESE-DESIGN-MATCH-v1.140 WEB_CLOSED.

Current decision: v1.140 closed the active `/download` page slice after refreshing the Public Download design target to Vietnamese and matching the implemented page in browser. `/download` now follows the target release-gate scenario more closely: sealed public gate hero, five readiness gates, official channel cards and delayed trust/detail sections. Entire program is NOT production-complete.

- v1.140 refreshed `download-detailed-design-target-v1125.png` with built-in imagegen and mirrored it under `docs/design/reference`.
- v1.140 translated Public Download target/page labels, readiness gates and build/channel labels to Vietnamese.
- v1.140 reworked `/download` first-flow under `.lgo-downloadpage-stack`: hero → readiness board → official channels → deeper trust/detail sections.
- v1.140 evidence: RED browser/e2e reproduced stale English target label; Playwright desktop/mobile `/download` Vietnamese design-match PASS 2/2 after fix; screenshot metrics reviewed: 1280x720 hero 319.266, gate 250, readiness top 434.422, channels top 701.953, overflow 0.
- Design must follow the Linh Giới game scenario and stay coherent with accepted targets; stale, English-heavy or scenario-wrong targets must be replaced before implementation.
- Sequential Page Completion, Real Browser UI/UX Layout First, minimal design-target guardrail, Layout Match Before Closure and Base UI/UX Layout remain mandatory.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.141. Select `/download/trust` as the next single active page and complete it fully before moving onward.

Current phase: WEB-FE-START-VIETNAMESE-DESIGN-MATCH-v1.139 WEB_CLOSED.

Current decision: v1.139 closed the active `/start` page slice after refreshing the Public Start design target to Vietnamese and matching the implemented page in browser. `/start` now follows the target scenario more closely: Đông Môn cinematic hero, tutorial step rail, localized gameplay-loop board and delayed real onboarding screenshots. Entire program is NOT production-complete.

- v1.139 refreshed `start-detailed-design-target-v1124.png` with built-in imagegen and mirrored it under `docs/design/reference`.
- v1.139 translated Public Start target/page labels, tutorial board labels and onboarding screenshot labels to Vietnamese.
- v1.139 reused the shared `CinematicWorldScene` in `/start` instead of creating duplicate page-local visual code.
- v1.139 evidence: RED browser/e2e reproduced stale English target label and missing shared Đông Môn scene; Playwright desktop/mobile `/start` Vietnamese design-match PASS 2/2 after fix; screenshot metrics reviewed: 1280x720 hero 420, scene 374.5, board top 566.031, board visible 153.969, overflow 0.
- Design must follow the Linh Giới game scenario and stay coherent with accepted targets; stale, English-heavy or scenario-wrong targets must be replaced before implementation.
- Sequential Page Completion, Real Browser UI/UX Layout First, minimal design-target guardrail, Layout Match Before Closure and Base UI/UX Layout remain mandatory.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.140. Select `/download` as the next single active page and complete it fully before moving onward.

Current phase: WEB-FE-JOURNEY-VIETNAMESE-DESIGN-MATCH-v1.138 WEB_CLOSED.

Current decision: v1.138 closed the active `/journey` page slice after refreshing the Public Journey design target to Vietnamese and matching the implemented page in browser. `/journey` now follows the target structure: hero, immediate 20-minute journey loop, world route and delayed reference/boundary board. Entire program is NOT production-complete.

- v1.138 refreshed `journey-detailed-design-target-v1123.png` with built-in imagegen and mirrored it under `docs/design/reference`.
- v1.138 translated Public Journey target/page labels and 20-minute loop labels to Vietnamese.
- v1.138 reordered `/journey` first-flow under `.lgo-journeypage-stack`: hero → session loop → world route → reference board.
- v1.138 evidence: RED browser/e2e reproduced stale English label and session loop top 712.641px; Playwright desktop/mobile `/journey` Vietnamese design-match PASS 2/2 after fix; screenshot metrics reviewed: 1280x720 hero 400.406px, session top 611.609, first card visible 108.391, overflow 0.
- Sequential Page Completion, Real Browser UI/UX Layout First, minimal design-target guardrail, Layout Match Before Closure and Base UI/UX Layout remain mandatory.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.139. Select `/start` as the next single active page and complete it fully before moving onward.

Current phase: WEB-FE-CLASSES-VIETNAMESE-DESIGN-MATCH-v1.137 WEB_CLOSED.

Current decision: v1.137 closed the active `/classes` page slice after reviewing the registered Public Classes design target and matching the implemented page in browser. The target remains valid because it is Vietnamese, coherent with the Linh Giới Năm Lộ scenario, and visually aligned with the accepted dark fantasy direction. `/classes` now uses Vietnamese page/target labels, removes stale English first-flow labels, and keeps the five class cards visible in the desktop first fold. Entire program is NOT production-complete.

- v1.137 retained `classes-detailed-design-target-v1122.png` after design review instead of replacing a still-valid target.
- v1.137 translated Public Classes target/page labels and class art fixture labels used by `/classes`.
- v1.137 compacted desktop `/classes` first-flow under `.lgo-classespage-stack`: hero → compact Năm Lộ heading → first class-card row → identity deck → Võ art board.
- v1.137 evidence: RED browser/e2e reproduced only 92.266px of the first class card visible at 1280x720; Playwright desktop/mobile `/classes` Vietnamese design-match PASS 2/2 after fix; screenshot metrics reviewed: 1280x720 hero 360.375px, class grid top 569.828, first card visible 150.172, overflow 0.
- Sequential Page Completion, Real Browser UI/UX Layout First, minimal design-target guardrail, Layout Match Before Closure and Base UI/UX Layout remain mandatory.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.138. Select `/journey` as the next single active page and complete it fully before moving onward.

Current phase: WEB-FE-STORY-VIETNAMESE-DESIGN-MATCH-v1.136 WEB_CLOSED.

Current decision: v1.136 closed the active `/story` page slice after refreshing the Public Story design target to Vietnamese and reviewing the implemented page in browser against that target. `/story` now follows the target structure more closely: cinematic Vết Nứt Đông Môn hero, immediate opening chapter cards, Vietnamese story labels and delayed boundary/reference board after the first-flow content. Entire program is NOT production-complete.

- v1.136 refreshed `story-detailed-design-target-v1121.png` with built-in imagegen and mirrored it under `docs/design/reference`.
- v1.136 translated visible Public Story labels and chapter labels to Vietnamese.
- v1.136 reworked desktop `/story` hero into a poster-style overlay and compacted chapter card density under `.lgo-storypage-stack`.
- v1.136 evidence: RED browser/e2e reproduced stale English label and insufficient first-fold chapter visibility; Playwright desktop/mobile `/story` Vietnamese design-match PASS 2/2 after fix; screenshot metrics reviewed: hero 385.234px, chapters top 519.594, first card top 559.75, first card visible 367.188, overflow 0.
- Sequential Page Completion, Real Browser UI/UX Layout First, minimal design-target guardrail, Layout Match Before Closure and Base UI/UX Layout remain mandatory.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.137. Select `/classes` as the next single active page and complete it fully before moving onward.

Current phase: WEB-FE-GAME-WORLD-VIETNAMESE-FIRST-FLOW-v1.135 WEB_CLOSED.

Current decision: v1.135 closed the active `/game` page slice after browser/e2e and screenshot review against the registered Public Game World design target. `/game` now follows the target structure more closely: cinematic hero, immediate Linh Thành → Đông Môn → Linh Lâm → Cổ Di Tích → Âm Giới route strip, first-flow world atlas preview, and Vietnamese boundary messaging after the design-led flow. Entire program is NOT production-complete.

- v1.135 refreshed `game-world-detailed-design-target-v1120.png` with built-in image_gen and mirrored it under `docs/design/reference`.
- v1.135 removed the old wireframe/reference board from `/game` first-flow product UI and replaced it with route/atlas layout that follows the game scenario.
- v1.135 translated visible design/page labels for Public Game World to Vietnamese, including route-kind labels shared by route and atlas components.
- v1.135 evidence: RED browser/e2e reproduced route gap 347.625px after hero; Playwright desktop/mobile `/game` Vietnamese first-flow/layout PASS 2/2 after fix; screenshot metrics reviewed: hero 430px, route top 557.875, atlas top 820.141, overflow 0.
- Sequential Page Completion, Real Browser UI/UX Layout First, minimal design-target guardrail, Layout Match Before Closure and Base UI/UX Layout remain mandatory.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.136. Select `/story` as the next single active page and complete it fully before moving onward.

Current phase: WEB-FE-HOMEPAGE-VIETNAMESE-FIRST-FLOW-v1.134 WEB_CLOSED.

Current decision: v1.134 restarted FE/UI UX layout completion from the homepage and closed the first sequential page slice. Public Homepage now has refreshed Vietnamese first-flow visible copy, a refreshed homepage design target with Vietnamese footer label, and shared design-target reference labels needed by the homepage translated through Base UI/UX Layout. Entire program is NOT production-complete.

- sequential page completion is now mandatory: finish one page slice with design target, implementation, browser/e2e, docs, commit and push before moving to another page.
- Just-in-time Design is mandatory: create or replace only the target needed for the current page/section/component; do not design broad multi-page batches upfront.
- v1.134 refreshed `homepage-detailed-design-target-v1118.png` with built-in image_gen and mirrored it under `docs/design/reference`.
- v1.134 translated homepage first-flow labels and the shared design target reference cue used by the homepage to Vietnamese.
- v1.134 evidence: RED browser/e2e reproduced stale English homepage target label; Playwright desktop/mobile homepage Vietnamese first-flow PASS after fix; dedicated validator and closure checks recorded in report/handoff.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.135.


Current phase: WEB-FE-SUPPORT-SAFETY-DESIGN-TARGET-DENSITY-v1.133 WEB_CLOSED.

Current decision: v1.133 FE support safety design target density slice closed. Public `/support/safety` now has a dedicated high-fidelity Vietnamese `Public Support Safety` design target and runtime desktop/mobile browser/e2e guardrails for safe-reporting density. Entire program is NOT production-complete.

- v1.133 created `support-safety-detailed-design-target-v1133.png` with built-in image_gen and mirrored it under `docs/design/reference`.
- v1.133 registered `Public Support Safety`, routed `/support/safety` to that page-specific target and kept Public Service as the broader target for remaining service routes.
- v1.133 compacted desktop `/support/safety` hero, design board, sensitive-data checklist, safety principles and issue routing under `lgo-supportsafetypage-stack` while preserving mobile behavior.
- v1.133 evidence: RED browser/e2e reproduced missing `Public Support Safety` target attachment; Playwright desktop/mobile support safety design target density PASS after fix; dedicated validator and closure checks recorded in report/handoff.
- Vietnamese design targets remain mandatory for new public FE work unless a route-specific owner-approved exception is recorded. Existing English-heavy targets must be replaced when their page is revisited.
- Real Browser UI/UX Layout First supersedes Design Target First: use or minimally correct the selected page target only enough for comparison, then implement and verify the rendered page layout in browser.
- Base UI/UX Layout remains mandatory in `packages/design-tokens` and `packages/ui` before page-local layout is added.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.134.

Current phase: WEB-FE-SUPPORT-HELP-DESIGN-TARGET-DENSITY-v1.132 WEB_CLOSED.

Current decision: v1.132 FE support help design target density slice closed. Public `/support/help` now has a dedicated high-fidelity Vietnamese `Public Support Help` design target and runtime desktop/mobile browser/e2e guardrails for FAQ route-map density. Entire program is NOT production-complete.

- v1.132 created `support-help-detailed-design-target-v1132.png` with built-in image_gen and mirrored it under `docs/design/reference`.
- v1.132 registered `Public Support Help`, routed `/support/help` to that page-specific target and kept Public Service as the broader target for remaining service routes.
- v1.132 compacted desktop `/support/help` hero, design board, route cards, FAQ discovery and issue routing under `lgo-supporthelppage-stack` while preserving mobile behavior.
- v1.132 evidence: RED browser/e2e reproduced missing `Public Support Help` target attachment; Playwright desktop/mobile support help design target density PASS after fix; dedicated validator and closure checks recorded in report/handoff.
- Vietnamese design targets remain mandatory for new public FE work unless a route-specific owner-approved exception is recorded. Existing English-heavy targets must be replaced when their page is revisited.
- Real Browser UI/UX Layout First supersedes Design Target First: use or minimally correct the selected page target only enough for comparison, then implement and verify the rendered page layout in browser.
- Base UI/UX Layout remains mandatory in `packages/design-tokens` and `packages/ui` before page-local layout is added.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.133.

Current phase: WEB-FE-SUPPORT-DESIGN-TARGET-DENSITY-v1.131 WEB_CLOSED.

Current decision: v1.131 FE support design target density slice closed. Public `/support` now has a dedicated high-fidelity Vietnamese `Public Support` design target and runtime desktop/mobile browser/e2e guardrails for first-flow support station density. Entire program is NOT production-complete.

- v1.131 created `support-detailed-design-target-v1131.png` with built-in image_gen and mirrored it under `docs/design/reference`.
- v1.131 registered `Public Support`, routed `/support` to that page-specific target and kept Public Service as the broader target for remaining support/service routes.
- v1.131 compacted desktop `/support` hero, support boundary note, design board, topic cards and FAQ/safety path under `lgo-supportpage-stack` while preserving mobile behavior.
- v1.131 evidence: RED browser/e2e reproduced missing `Public Support` target attachment; Playwright desktop/mobile support design target density PASS after fix; dedicated validator and closure checks recorded in report/handoff.
- Vietnamese design targets are mandatory for new public FE work unless a route-specific owner-approved exception is recorded. Existing English-heavy targets must be replaced when their page is revisited.
- Real Browser UI/UX Layout First supersedes Design Target First: use or minimally correct the selected page target only enough for comparison, then implement and verify the rendered page layout in browser.
- Base UI/UX Layout remains mandatory in `packages/design-tokens` and `packages/ui` before page-local layout is added.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.132.

Current phase: WEB-FE-STATUS-DESIGN-TARGET-DENSITY-v1.130 WEB_CLOSED.

Current decision: v1.130 FE status design target density slice closed. Public `/status` now has a dedicated high-fidelity `Public Status` design target and runtime desktop/mobile browser/e2e guardrails for first-fold maintenance/status density. Entire program is NOT production-complete.

- v1.130 created `status-detailed-design-target-v1130.png` with built-in image_gen and mirrored it under `docs/design/reference`.
- v1.130 registered `Public Status`, routed `/status` to that page-specific target and kept Public Service as the broader target for remaining service routes.
- v1.130 compacted desktop `/status` page header, status signal board, status explanation and trust surfaces under `lgo-statuspage-stack` while preserving mobile behavior.
- v1.130 evidence: RED browser/e2e reproduced missing `Public Status` target attachment; Playwright desktop/mobile status design target density PASS after fix; dedicated validator and closure checks recorded in report/handoff.
- Real Browser UI/UX Layout First supersedes Design Target First: use or minimally correct the selected page target only enough for comparison, then implement and verify the rendered page layout in browser.
- Base UI/UX Layout remains mandatory in `packages/design-tokens` and `packages/ui` before page-local layout is added.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.131.

Current phase: WEB-FE-TESTER-PACK-DESIGN-TARGET-DENSITY-v1.129 WEB_CLOSED.

Current decision: v1.129 FE tester pack design target density slice closed. Public `/release/tester-pack` now has a dedicated high-fidelity `Public Tester Pack` design target and runtime desktop/mobile browser/e2e guardrails for first-fold tester guidance density. Entire program is NOT production-complete.

- v1.129 created `tester-pack-detailed-design-target-v1129.png` with built-in image_gen and mirrored it under `docs/design/reference`.
- v1.129 registered `Public Tester Pack`, routed `/release/tester-pack` to that page-specific target and kept Public Service as the broader target for remaining service routes.
- v1.129 compacted desktop `/release/tester-pack` hero, production board, checklist and safe feedback template under `lgo-testerpackpage-stack` while preserving mobile behavior.
- v1.129 evidence: RED browser/e2e reproduced missing `Public Tester Pack` target attachment; Playwright desktop/mobile tester pack design target density PASS after fix; dedicated validator and closure checks recorded in report/handoff.
- Real Browser UI/UX Layout First supersedes Design Target First: use or minimally correct the selected page target only enough for comparison, then implement and verify the rendered page layout in browser.
- Base UI/UX Layout remains mandatory in `packages/design-tokens` and `packages/ui` before page-local layout is added.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.130.

Current phase: WEB-FE-RELEASE-READINESS-DESIGN-TARGET-DENSITY-v1.128 WEB_CLOSED.

Current decision: v1.128 FE release readiness design target density slice closed. Public `/release/readiness` now has a dedicated high-fidelity `Public Release Readiness` design target and runtime desktop/mobile browser/e2e guardrails for first-fold readiness/owner-gate density. Entire program is NOT production-complete.

- v1.128 created `release-readiness-detailed-design-target-v1128.png` with built-in image_gen and mirrored it under `docs/design/reference`.
- v1.128 registered `Public Release Readiness`, routed `/release/readiness` to that page-specific target and kept Public Service as the broader target for remaining service routes.
- v1.128 compacted desktop `/release/readiness` hero, production board, readiness hub and owner gates under `lgo-releasereadinesspage-stack` while preserving mobile behavior.
- v1.128 evidence: RED browser/e2e reproduced missing `Public Release Readiness` target attachment; Playwright desktop/mobile release readiness design target density PASS after fix; dedicated validator and closure checks recorded in report/handoff.
- Real Browser UI/UX Layout First supersedes Design Target First: use or minimally correct the selected page target only enough for comparison, then implement and verify the rendered page layout in browser.
- Base UI/UX Layout remains mandatory in `packages/design-tokens` and `packages/ui` before page-local layout is added.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.129.

Current phase: WEB-FE-RELEASE-DESIGN-TARGET-DENSITY-v1.127 WEB_CLOSED.

Current decision: v1.127 FE release design target density slice closed. Public `/release` now has a dedicated high-fidelity `Public Release` design target and runtime desktop/mobile browser/e2e guardrails for first-fold release narrative density. Entire program is NOT production-complete.

- v1.127 created `release-detailed-design-target-v1127.png` with built-in image_gen and mirrored it under `docs/design/reference`.
- v1.127 registered `Public Release`, routed `/release` to that page-specific target and kept Public Service as the broader target for remaining service routes.
- v1.127 compacted desktop `/release` hero, M0→M1 board, proof heading and release readiness CTA under `lgo-releasepage-stack` while preserving mobile behavior.
- v1.127 evidence: RED browser/e2e reproduced missing `Public Release` target attachment; Playwright desktop/mobile release design target density PASS after fix; dedicated validator and closure checks recorded in report/handoff.
- Real Browser UI/UX Layout First supersedes Design Target First: use or minimally correct the selected page target only enough for comparison, then implement and verify the rendered page layout in browser.
- Base UI/UX Layout remains mandatory in `packages/design-tokens` and `packages/ui` before page-local layout is added.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.128.

Current phase: WEB-FE-DOWNLOAD-TRUST-DESIGN-TARGET-DENSITY-v1.126 WEB_CLOSED.

Current decision: v1.126 FE download trust design target density slice closed. Public `/download/trust` now has a dedicated high-fidelity `Public Download Trust` design target and runtime desktop/mobile browser/e2e guardrails for first-fold trust/checksum/provenance density. Entire program is NOT production-complete.

- v1.126 created `download-trust-detailed-design-target-v1126.png` with built-in image_gen and mirrored it under `docs/design/reference`.
- v1.126 registered `Public Download Trust`, routed `/download/trust` to that page-specific target and kept Public Service as the broader target for remaining service routes.
- v1.126 compacted desktop `/download/trust` hero, release readiness CTA, owner gate board and trust gate sequence under `lgo-downloadtrustpage-stack` while preserving mobile behavior.
- v1.126 evidence: RED browser/e2e reproduced missing `Public Download Trust` target attachment; Playwright desktop/mobile download trust design target density PASS after fix; dedicated validator and closure checks recorded in report/handoff.
- Real Browser UI/UX Layout First supersedes Design Target First: use or minimally correct the selected page target only enough for comparison, then implement and verify the rendered page layout in browser.
- Base UI/UX Layout remains mandatory in `packages/design-tokens` and `packages/ui` before page-local layout is added.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.127.

Current phase: WEB-FE-DOWNLOAD-DESIGN-TARGET-DENSITY-v1.125 WEB_CLOSED.

Current decision: v1.125 FE download design target density slice closed. Public `/download` now has a dedicated high-fidelity `Public Download` design target and runtime desktop/mobile browser/e2e guardrails for first-fold release readiness density. Entire program is NOT production-complete.

- v1.125 created `download-detailed-design-target-v1125.png` with built-in image_gen and mirrored it under `docs/design/reference`.
- v1.125 registered `Public Download`, routed `/download` to that page-specific target and kept Public Service as the broader target for remaining service routes.
- v1.125 compacted desktop `/download` hero, sealed gate and readiness checklist under `lgo-downloadpage-stack` while preserving mobile behavior.
- v1.125 evidence: RED browser/e2e reproduced missing `Public Download` target attachment; Playwright desktop/mobile download design target density PASS 2/2 after fix; dedicated validator and closure checks recorded in report/handoff.
- Real Browser UI/UX Layout First supersedes Design Target First: use or minimally correct the selected page target only enough for comparison, then implement and verify the rendered page layout in browser.
- Base UI/UX Layout remains mandatory in `packages/design-tokens` and `packages/ui` before page-local layout is added.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.126.

Current phase: WEB-FE-START-DESIGN-TARGET-DENSITY-v1.124 WEB_CLOSED.

Current decision: v1.124 FE start design target density slice closed. Public `/start` now has a dedicated high-fidelity `Public Start` design target and runtime desktop/mobile browser/e2e guardrails for first-fold onboarding board/screenshot density. Entire program is NOT production-complete.

- v1.124 created `start-detailed-design-target-v1124.png` with built-in image_gen and mirrored it under `docs/design/reference`.
- v1.124 registered `Public Start`, routed `/start` to that page-specific target and left Public Core as a broad fallback for public patterns outside page-specific targets.
- v1.124 compacted desktop `/start` hero, tutorial steps, start board and screenshot panel spacing under `lgo-startpage-stack` while preserving mobile behavior.
- v1.124 evidence: RED browser/e2e reproduced missing `Public Start` target attachment; Playwright desktop/mobile start design target density PASS 2/2 after fix; dedicated validator and closure checks recorded in report/handoff.
- Real Browser UI/UX Layout First supersedes Design Target First: use or minimally correct the selected page target only enough for comparison, then implement and verify the rendered page layout in browser.
- Base UI/UX Layout remains mandatory in `packages/design-tokens` and `packages/ui` before page-local layout is added.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.125.

Current phase: WEB-FE-JOURNEY-DESIGN-TARGET-DENSITY-v1.123 WEB_CLOSED.

Current decision: v1.123 FE journey design target density slice closed. Public `/journey` now has a dedicated high-fidelity `Public Journey` design target and runtime desktop/mobile browser/e2e guardrails for first-fold journey board/session-loop density. Entire program is NOT production-complete.

- v1.123 created `journey-detailed-design-target-v1123.png` with built-in image_gen and mirrored it under `docs/design/reference`.
- v1.123 registered `Public Journey`, routed `/journey` to that page-specific target and kept Public Core as the broader target for remaining public core routes.
- v1.123 compacted desktop `/journey` hero, route-flow board and session-loop spacing under `lgo-journeypage-stack` while preserving mobile behavior.
- v1.123 evidence: RED browser/e2e reproduced missing `Public Journey` target attachment; Playwright desktop/mobile journey design target density PASS 2/2 after fix; dedicated validator and closure checks recorded in report/handoff.
- Real Browser UI/UX Layout First supersedes Design Target First: use or minimally correct the selected page target only enough for comparison, then implement and verify the rendered page layout in browser.
- Base UI/UX Layout remains mandatory in `packages/design-tokens` and `packages/ui` before page-local layout is added.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.124.

Current phase: WEB-FE-CLASSES-DESIGN-TARGET-DENSITY-v1.122 WEB_CLOSED.

Current decision: v1.122 FE classes design target density slice closed. Public `/classes` now has a dedicated high-fidelity `Public Classes` design target and runtime desktop/mobile browser/e2e guardrails for first-fold class-card density. Entire program is NOT production-complete.

- v1.122 created `classes-detailed-design-target-v1122.png` with built-in image_gen and mirrored it under `docs/design/reference`.
- v1.122 registered `Public Classes`, routed `/classes` to that page-specific target and kept Public Core as the broader target for remaining public core routes.
- v1.122 compacted desktop `/classes` hero, first class-card heading and class-card grid under `lgo-classespage-stack` while preserving mobile behavior.
- v1.122 evidence: RED browser/e2e reproduced missing `Public Classes` target attachment; Playwright desktop/mobile classes design target density PASS 2/2 after fix; dedicated validator and closure checks recorded in report/handoff.
- Real Browser UI/UX Layout First supersedes Design Target First: use or minimally correct the selected page target only enough for comparison, then implement and verify the rendered page layout in browser.
- Base UI/UX Layout remains mandatory in `packages/design-tokens` and `packages/ui` before page-local layout is added.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.123.

Current phase: WEB-FE-STORY-DESIGN-TARGET-DENSITY-v1.121 WEB_CLOSED.

Current decision: v1.121 FE story design target density slice closed. Public `/story` now has a dedicated high-fidelity `Public Story` design target and runtime desktop/mobile browser/e2e guardrails for first-fold chapter density. Entire program is NOT production-complete.

- v1.121 created `story-detailed-design-target-v1121.png` with built-in image_gen and mirrored it under `docs/design/reference`.
- v1.121 registered `Public Story`, routed `/story` to that page-specific target and kept Public Core as the broader target for remaining public core routes.
- v1.121 reordered `/story` to match the target: hero, chapters, story arc, then reference art; desktop density is scoped under `lgo-storypage-stack` while preserving mobile behavior.
- v1.121 evidence: RED desktop browser/e2e reproduced first chapter card not visible in the first fold; Playwright desktop/mobile story design target density PASS 2/2 after fix; dedicated validator and closure checks recorded in report/handoff.
- Real Browser UI/UX Layout First supersedes Design Target First: use or minimally correct the selected page target only enough for comparison, then implement and verify the rendered page layout in browser.
- Base UI/UX Layout remains mandatory in `packages/design-tokens` and `packages/ui` before page-local layout is added.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.122.

Current phase: WEB-FE-GAME-WORLD-DESIGN-TARGET-DENSITY-v1.120 WEB_CLOSED.

Current decision: v1.120 FE game world design target density slice closed. Public `/game` now has a dedicated high-fidelity `Public Game World` design target and runtime desktop/mobile browser/e2e guardrails for first-fold density. Entire program is NOT production-complete.

- v1.120 created `game-world-detailed-design-target-v1120.png` with built-in image_gen and mirrored it under `docs/design/reference`.
- v1.120 registered `Public Game World`, routed `/game` to that page-specific target and kept Public Core as the broader target for the remaining public core routes.
- v1.120 compacted desktop `/game` hero/design-board/route spacing under `lgo-gamepage-stack` while preserving mobile behavior.
- v1.120 evidence: RED desktop browser/e2e reproduced the game design board starting below target first-fold density; Playwright desktop/mobile game world design target density PASS 2/2 after fix; dedicated validator and closure checks recorded in report/handoff.
- Real Browser UI/UX Layout First supersedes Design Target First: use or minimally correct the selected page target only enough for comparison, then implement and verify the rendered page layout in browser.
- Base UI/UX Layout remains mandatory in `packages/design-tokens` and `packages/ui` before page-local layout is added.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.121.

Current phase: WEB-FE-HOMEPAGE-TARGET-FOLD-DENSITY-v1.119 WEB_CLOSED.

Current decision: v1.119 FE homepage target fold density slice closed. Public `/` now follows the v1.118 `Public Homepage` design target more closely in browser/e2e: desktop first fold shows hero content plus a visible first pillar card instead of a hero-only viewport. Entire program is NOT production-complete.

- v1.119 uses the existing `Public Homepage` target; no new design target was required and no stale target was replaced.
- v1.119 compacted desktop homepage hero density and first-pillar spacing while preserving mobile behavior.
- v1.119 evidence: RED desktop browser/e2e reproduced insufficient first-card fold visibility; runtime DOM inspection confirmed a real layout-density issue; Playwright desktop/mobile homepage target fold density PASS 2/2 after fix; dedicated validator and closure checks recorded in report/handoff.
- Real Browser UI/UX Layout First supersedes Design Target First: use or minimally correct the selected page target only enough for comparison, then implement and verify the rendered page layout in browser.
- Base UI/UX Layout remains mandatory in `packages/design-tokens` and `packages/ui` before page-local layout is added.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.120.

Current phase: WEB-FE-HOMEPAGE-DETAILED-DESIGN-TARGET-v1.118 WEB_CLOSED.

Current decision: v1.118 FE homepage detailed design target slice closed. Public `/` now has a dedicated high-fidelity Public Homepage design target before further homepage UI changes. Entire program is NOT production-complete.

- v1.118 created `homepage-detailed-design-target-v1118.png` with built-in image_gen and mirrored it under `docs/design/reference`.
- v1.118 registered `Public Homepage` in the Design Target First registry and updated `/` to expose the page-specific target instead of only the broad Public Core atlas.
- v1.118 evidence: RED browser/e2e reproduced missing Public Homepage target attachment; Playwright desktop/mobile homepage detailed design target PASS 4/4 after attachment; dedicated validator and closure checks recorded in report/handoff.
- Real Browser UI/UX Layout First supersedes Design Target First: use or minimally correct the selected page target only enough for comparison, then implement and verify the rendered page layout in browser.
- Base UI/UX Layout remains mandatory in `packages/design-tokens` and `packages/ui` before page-local layout is added.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.119.

Current phase: WEB-FE-SHELL-KEYBOARD-REACHABILITY-v1.117 WEB_CLOSED.

Current decision: v1.117 FE shell keyboard reachability slice closed. Public Core, Player Portal and Ops/Admin shells now have desktop/mobile browser/e2e guardrail coverage for skip-link focus flow, nav keyboard focus, Design Target First link focus, readable nav typography and horizontal overflow. Entire program is NOT production-complete.

- v1.117 fixed a real Public shell keyboard gap by making `PublicNavigation` nav focusable and giving `.lgo-brand-nav:focus-visible` a visible outline.
- v1.117 uses existing v1.95 Public Core, Player Portal, Ops/Admin and Component/state design targets; no new design target was required and no stale target was replaced.
- v1.117 evidence: RED browser/e2e reproduced Public Core nav focus failure; Playwright desktop/mobile shell keyboard reachability PASS 6/6 after fix; dedicated validator and closure checks recorded in report/handoff.
- Real Browser UI/UX Layout First supersedes Design Target First: use or minimally correct the selected page target only enough for comparison, then implement and verify the rendered page layout in browser.
- Base UI/UX Layout remains mandatory in `packages/design-tokens` and `packages/ui` before page-local layout is added.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.118.

Current phase: WEB-FE-OPS-EXPANDED-ROUTE-AUDIT-v1.116 WEB_CLOSED.

Current decision: v1.116 FE Ops/Admin expanded route audit slice closed. Twelve Ops/Admin routes now have desktop/mobile browser/e2e guardrail coverage for registered design-target attachment, readable layout caps, horizontal overflow and serious/critical axe cleanliness. Entire program is NOT production-complete.

- v1.116 changes test/evidence only; no production source changed and no duplicate route/layout owner was added.
- v1.116 uses existing v1.95 Ops/Admin and Component/state design targets; no new design target was required and no stale target was replaced.
- v1.116 evidence: Playwright desktop/mobile expanded Ops/Admin route audit PASS 24/24; dedicated validator and closure checks recorded in report/handoff.
- Real Browser UI/UX Layout First supersedes Design Target First: use or minimally correct the selected page target only enough for comparison, then implement and verify the rendered page layout in browser.
- Base UI/UX Layout remains mandatory in `packages/design-tokens` and `packages/ui` before page-local layout is added.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.117.

Current phase: WEB-FE-PORTAL-EXPANDED-ROUTE-AUDIT-v1.115 WEB_CLOSED.

Current decision: v1.115 FE Portal expanded route audit slice closed. Twelve Player Portal routes now have desktop/mobile browser/e2e guardrail coverage for registered design-target attachment, readable layout caps, horizontal overflow and serious/critical axe cleanliness. Entire program is NOT production-complete.

- v1.115 changes test/evidence only; no production source changed and no duplicate route/layout owner was added.
- v1.115 uses existing v1.95 Player Portal and Component/state design targets; no new design target was required and no stale target was replaced.
- v1.115 evidence: Playwright desktop/mobile expanded Portal route audit PASS 24/24; dedicated validator and closure checks recorded in report/handoff.
- Real Browser UI/UX Layout First supersedes Design Target First: use or minimally correct the selected page target only enough for comparison, then implement and verify the rendered page layout in browser.
- Base UI/UX Layout remains mandatory in `packages/design-tokens` and `packages/ui` before page-local layout is added.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.116.

Current phase: WEB-FE-PUBLIC-EXPANDED-CORE-ROUTE-AUDIT-v1.114 WEB_CLOSED.

Current decision: v1.114 FE public expanded core route audit slice closed. Thirteen Public Core routes now have desktop/mobile browser/e2e guardrail coverage for registered design-target attachment, readable layout caps, horizontal overflow and serious/critical axe cleanliness. Entire program is NOT production-complete.

- v1.114 changes test/evidence only; no production source changed and no duplicate route/layout owner was added.
- v1.114 uses existing v1.95 Public Core and Component/state design targets; no new design target was required and no stale target was replaced.
- v1.114 evidence: Playwright desktop/mobile expanded core route audit PASS 26/26; dedicated validator and closure checks recorded in report/handoff.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.115.

Current phase: WEB-FE-PUBLIC-EXPANDED-SERVICE-ROUTE-AUDIT-v1.113 WEB_CLOSED.

Current decision: v1.113 FE public expanded service route audit slice closed. Eight Public Service routes now have desktop/mobile browser/e2e guardrail coverage for registered design-target attachment, readable layout caps, horizontal overflow and serious/critical axe cleanliness. Entire program is NOT production-complete.

- v1.113 changes test/evidence only; no production source changed and no duplicate route/layout owner was added.
- v1.113 uses existing v1.95 Public Service and Component/state design targets; no new design target was required and no stale target was replaced.
- v1.113 evidence: Playwright desktop/mobile expanded service route audit PASS 16/16; dedicated validator and closure checks recorded in report/handoff.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.114.

Current phase: WEB-FE-PUBLIC-DOWNLOAD-NAV-SECTION-v1.112 WEB_CLOSED.

Current decision: v1.112 FE public download navigation section slice closed. Public `/download/trust` now keeps `Trạng thái chơi` marked current through shared `RouteAwareLink` section matching while staying attached to the v1.95 Public Service design target. Entire program is NOT production-complete.

- v1.112 updates public nav composition only; shared `RouteAwareLink` section behavior already existed and no duplicate route-state code was added.
- v1.112 uses existing v1.95 Public Service and Component/state design targets; no new design target was required and no stale target was replaced.
- v1.112 evidence: RED browser/e2e reproduced missing `/download/trust` current state; Playwright desktop/mobile download-section nav PASS; dedicated validator and closure checks recorded in report/handoff.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.113.

Current phase: WEB-FE-DESIGN-TARGET-LINK-SCOPE-NAME-v1.111 WEB_CLOSED.

Current decision: v1.111 FE design-target scoped link-name slice closed. Public, Portal and Ops Design Target First primary and companion links now include the active surface scope in their accessible names while preserving visible labels and registered v1.95 visual targets. Entire program is NOT production-complete.

- v1.111 updates shared `DesignTargetReference` in `packages/ui` instead of app-local accessible-name overrides.
- v1.111 uses existing v1.95 Component/state, Public Core/Public Service, Player Portal and Ops/Admin design targets; no new design target was required and no stale target was replaced.
- v1.111 evidence: RED browser/e2e reproduced unscoped companion link accessible names; Playwright desktop/mobile scoped-link-name PASS; dedicated validator and closure checks recorded in report/handoff.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.112.

Current phase: WEB-FE-DESIGN-TARGET-TRANSITION-PARITY-v1.110 WEB_CLOSED.

Current decision: v1.110 FE design-target transition parity slice closed. Public, Portal and Ops Design Target First links now share default transition timing while preserving visible focus outlines, cue spacing and reduced-motion behavior. Entire program is NOT production-complete.

- v1.110 updates shared public Design Target First interaction styles instead of page-local transition overrides.
- v1.110 uses existing v1.95 Component/state, Public Core/Public Service, Player Portal and Ops/Admin design targets; no new design target was required and no stale target was replaced.
- v1.110 evidence: RED browser/e2e reproduced missing public transition; Playwright desktop/mobile transition-parity PASS; dedicated validator and closure checks recorded in report/handoff.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.111.

Current phase: WEB-FE-DESIGN-TARGET-REDUCED-MOTION-v1.109 WEB_CLOSED.

Current decision: v1.109 FE design-target reduced-motion slice closed. Public, Portal and Ops Design Target First focus/hover lift now respects `prefers-reduced-motion` while preserving visible focus outlines and registered v1.95 visual targets. Entire program is NOT production-complete.

- v1.109 updates shared public/workspace Design Target First interaction styles instead of page-local motion overrides.
- v1.109 uses existing v1.95 Component/state, Public Core/Public Service, Player Portal and Ops/Admin design targets; no new design target was required and no stale target was replaced.
- v1.109 evidence: RED browser/e2e reproduced reduced-motion transform/transition; Playwright desktop/mobile reduced-motion PASS; dedicated validator and closure checks recorded in report/handoff.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.110.

Current phase: WEB-FE-DESIGN-TARGET-CUE-SPACING-v1.108 WEB_CLOSED.

Current decision: v1.108 FE design-target cue spacing slice closed. Public, Portal and Ops Design Target First links now keep a visible gap between labels and the `↗` cue while preserving registered v1.95 visual targets. Entire program is NOT production-complete.

- v1.108 updates shared public/workspace Design Target First link styles instead of page-local spacing overrides.
- v1.108 uses existing v1.95 Component/state, Public Core/Public Service, Player Portal and Ops/Admin design targets; no new design target was required and no stale target was replaced.
- v1.108 evidence: RED browser/e2e reproduced missing computed cue gap; Playwright desktop/mobile cue spacing PASS; dedicated validator and closure checks recorded in report/handoff.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.109.

Current phase: WEB-FE-DESIGN-TARGET-VISIBLE-NEW-TAB-CUE-v1.107 WEB_CLOSED.

Current decision: v1.107 FE design-target visible new-tab cue slice closed. Public, Portal and Ops Design Target First links now show a visible `↗` cue while preserving accessible new-tab labels and registered v1.95 visual targets. Entire program is NOT production-complete.

- v1.107 updates shared `DesignTargetReference` in `packages/ui` instead of app-local link decorations.
- v1.107 uses existing v1.95 Component/state, Public Core/Public Service, Player Portal and Ops/Admin design targets; no new design target was required and no stale target was replaced.
- v1.107 evidence: RED browser/e2e reproduced missing visible cue; Playwright desktop/mobile visible new-tab cue PASS; dedicated validator and closure checks recorded in report/handoff.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.108.

Current phase: WEB-FE-DESIGN-TARGET-ACTIONS-GROUP-v1.106 WEB_CLOSED.

Current decision: v1.106 FE design-target actions group slice closed. Public, Portal and Ops Design Target First primary/companion links now sit inside a named `role="group"` action set while preserving registered v1.95 visual targets. Entire program is NOT production-complete.

- v1.106 updates shared `DesignTargetReference` in `packages/ui` instead of app-local action grouping.
- v1.106 uses existing v1.95 Component/state, Public Core/Public Service, Player Portal and Ops/Admin design targets; no new design target was required and no stale target was replaced.
- v1.106 evidence: RED browser/e2e reproduced missing named action group; Playwright desktop/mobile action-group PASS; dedicated validator and closure checks recorded in report/handoff.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.107.

Current phase: WEB-FE-DESIGN-TARGET-REGION-DESCRIPTION-v1.105 WEB_CLOSED.

Current decision: v1.105 FE design-target region description slice closed. Public, Portal and Ops Design Target First regions now connect their visible comparison notes through `aria-describedby` while preserving registered v1.95 visual targets. Entire program is NOT production-complete.

- v1.105 updates shared `DesignTargetReference` in `packages/ui` with `useId()` note linkage instead of app-local region descriptions.
- v1.105 uses existing v1.95 Component/state, Public Core/Public Service, Player Portal and Ops/Admin design targets; no new design target was required and no stale target was replaced.
- v1.105 evidence: RED browser/e2e reproduced missing `aria-describedby`; Playwright desktop/mobile described-region PASS; dedicated validator and closure checks recorded in report/handoff.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.106.

Current phase: WEB-FE-DESIGN-TARGET-REGION-SCOPE-v1.104 WEB_CLOSED.

Current decision: v1.104 FE design-target region scope slice closed. Public, Portal and Ops Design Target First regions now include the registered surface scope in their accessible names while preserving the v1.95 visual targets. Entire program is NOT production-complete.

- v1.104 updates shared `DesignTargetReference` in `packages/ui` instead of adding app-local region labels.
- v1.104 uses existing v1.95 Public Core/Public Service, Player Portal, Ops/Admin and Component/state design targets; no new design target was required and no stale target was replaced.
- v1.104 evidence: RED browser/e2e reproduced generic region names; Playwright desktop/mobile scoped-region accessible name PASS; dedicated validator and closure checks recorded in report/handoff.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.105.

Current phase: WEB-FE-DESIGN-TARGET-LINK-REL-v1.103 WEB_CLOSED.

Current decision: v1.103 FE design-target link rel slice closed. Public, Portal and Ops Design Target First links now use explicit `noopener noreferrer` while preserving the registered v1.95 design targets and new-tab accessible names. Entire program is NOT production-complete.

- v1.103 updates shared `DesignTargetReference` in `packages/ui` instead of adding app-local link variants.
- v1.103 uses existing v1.95 Component/state plus page/workspace design targets; no new design target was required and no stale target was replaced.
- v1.103 evidence: RED browser/e2e reproduced missing `noopener`; Playwright desktop/mobile new-tab rel safety PASS; dedicated validator and closure checks recorded in report/handoff.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.104.

Current phase: WEB-FE-DESIGN-TARGET-FOCUS-MOTION-v1.102 WEB_CLOSED.

Current decision: v1.102 FE design-target focus-motion slice closed. Portal and Ops workspace design-target links now share the same visible focus lift as public links while staying attached to the registered v1.95 Component/state and workspace design targets. Entire program is NOT production-complete.

- v1.102 updates the shared workspace shell CSS in `packages/ui` rather than adding app-local Portal/Ops focus styles.
- v1.102 uses existing v1.95 Component/state, Player Portal and Ops/Admin design targets; no new design target was required and no stale target was replaced.
- v1.102 evidence: RED browser/e2e reproduced workspace `transform: none`; Playwright desktop/mobile focus-motion parity PASS; dedicated validator and closure checks recorded in report/handoff.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.103.

Current phase: WEB-FE-DESIGN-TARGET-LINK-A11Y-v1.101 WEB_CLOSED.

Current decision: v1.101 FE design-target link accessibility slice closed. Public, Portal and Ops Design Target First links now announce `opens in a new tab` through the shared Base UI/UX Layout primitive while preserving the registered v1.95 design targets. Entire program is NOT production-complete.

- v1.101 extends shared `DesignTargetReference` accessible names for primary and Component/state companion links instead of adding app-local link variants.
- v1.101 uses existing v1.95 Public Core, Public Service, Player Portal, Ops/Admin and Component/state design targets; no new design target was required and no stale target was replaced.
- v1.101 evidence: RED browser/e2e reproduced missing new-tab accessible names; Playwright desktop/mobile design-target link a11y PASS; dedicated validator and closure checks recorded in report/handoff.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.102.

Current phase: WEB-FE-COMPONENT-STATE-DESIGN-TARGET-v1.100 WEB_CLOSED.

Current decision: v1.100 FE component/state design target slice closed. Public, Portal and Ops now expose a Component/state atlas companion link in their Design Target First region so shared Base UI/UX Layout work can be compared before implementation. Entire program is NOT production-complete.

- v1.100 extends shared `DesignTargetReference` with companion targets instead of duplicating per-surface UI.
- v1.100 uses the existing v1.95 Component/state atlas and mirrors it to Portal/Ops runtime; no new design target was required and no stale target was replaced.
- v1.100 evidence: RED browser/e2e reproduced missing Component/state design-target link; Playwright desktop/mobile component target loading PASS; dedicated validator and closure checks recorded in report/handoff.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.101.

Current phase: WEB-FE-WORKSPACE-DESIGN-TARGET-ASSET-v1.99 WEB_CLOSED.

Current decision: v1.99 FE workspace design-target asset slice closed. Portal and Ops/Admin now serve their registered design target PNGs from their own app runtimes, so Design Target First links can be opened directly during browser review. Entire program is NOT production-complete.

- v1.99 mirrors the existing v1.95 Player Portal and Ops/Admin atlas targets into Portal/Ops public design-reference folders.
- v1.99 does not create a new design and does not replace a target; it makes the registered target reachable where the UI link lives.
- v1.99 evidence: RED browser/e2e reproduced 404 design-target links; Playwright desktop/mobile asset loading PASS; dedicated validator and closure checks recorded in report/handoff.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.100.

Current phase: WEB-FE-WORKSPACE-DESIGN-TARGET-ATTACHMENT-v1.98 WEB_CLOSED.

Current decision: v1.98 FE workspace design-target attachment slice closed. Portal and Ops now expose a runtime Design Target First band linked to their registered Player Portal and Ops/Admin atlas targets through shared WorkspaceAppShell. Entire program is NOT production-complete.

- v1.98 extends shared Base UI/UX Layout in `packages/ui` rather than duplicating target bands in Portal/Ops.
- v1.98 uses existing v1.95 Player Portal and Ops/Admin design atlas targets; no new design target was required and no stale target was replaced.
- v1.98 evidence: RED browser/e2e reproduced missing workspace design-target region; Playwright desktop/mobile workspace design-target attachment PASS; dedicated validator and closure checks recorded in report/handoff.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.99.

Current phase: WEB-FE-PUBLIC-DESIGN-TARGET-ATTACHMENT-v1.97 WEB_CLOSED.

Current decision: v1.97 FE public design-target attachment slice closed. Public routes now expose a compact runtime Design Target First band linked to the registered Public Core or Public Service atlas, implemented through shared Base UI/UX Layout in packages/ui. Entire program is NOT production-complete.

- v1.97 adds shared `DesignTargetReference` in `packages/ui` and route-to-design mapping in `apps/web`.
- v1.97 uses existing v1.95 Public Core and Public Service design atlas targets; no new design target was required and no stale target was replaced.
- v1.97 evidence: RED browser/e2e reproduced missing design-target region; Playwright desktop/mobile design-target attachment PASS; dedicated validator and closure checks recorded in report/handoff.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.98.

Current phase: WEB-FE-DESIGN-FIRST-GOVERNANCE-v1.96 WEB_CLOSED.

Current decision: v1.96 FE design-first governance slice closed after user made design images the primary source of truth for UI/UX implementation. Continue UI work only after attaching each page, section or reusable component to a registered design target or creating/replacing the target first. Entire program is NOT production-complete.

- v1.96 adds Design Target First governance and a design target registry mapping the v1.95 atlas to Public Core, Public Service, Player Portal, Ops/Admin and Component/state scopes.
- v1.96 adds Base UI/UX Layout guidance requiring reusable UI layout to live in packages/design-tokens and packages/ui before page-local duplication.
- v1.96 evidence: source validator RED reproduced missing governance; dedicated validator PASS after implementation; current-state validator includes the governance gate.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.97.

Current phase: WEB-FE-COMPLETE-DESIGN-ATLAS-v1.95 WEB_CLOSED.

Current decision: v1.95 FE complete design atlas slice closed after user requested full-screen/page and component-level professional design references instead of one or two screens. Continue UI/UX implementation next against these saved targets. Entire program is NOT production-complete.

- v1.95 adds five high-fidelity raster design atlas boards for Public Core, Public Service, Player Portal, Ops/Admin and Component/state references.
- The atlas is saved under public assets and docs design reference, so browser/e2e and human visual review can use the same destination images.
- v1.95 evidence: RED browser/e2e reproduced missing atlas assets; Playwright desktop/mobile atlas availability/dimension PASS; source validator and closure checks recorded in the handoff/report.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.96.

Current phase: WEB-FE-PUBLIC-PROFESSIONAL-DESIGN-TARGET-v1.94 WEB_CLOSED.

Current decision: v1.94 FE public professional design target slice closed after user clarified that the SVG target was not enough and requested real professional design images for comparison. Continue UI/UX layout work next by matching live pages against this high-fidelity target. Entire program is NOT production-complete.

- v1.94 adds a high-fidelity raster design target PNG for Homepage and Community public surfaces.
- The target is saved under public assets and docs design reference, so browser/e2e and human visual review can use the same destination image.
- v1.94 evidence: RED browser/e2e reproduced missing professional design target; source validator PASS; Web typecheck PASS; Web production build PASS; Playwright desktop/mobile design-target availability/dimension PASS.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.95.

Current phase: WEB-FE-PUBLIC-HOME-VISUAL-TARGET-v1.93 WEB_CLOSED.

Current decision: v1.93 FE public homepage visual target slice closed after user asked for professional design images saved as destinations for comparison. Continue UI/UX layout work next using saved references before more visual edits. Entire program is NOT production-complete.

- v1.93 adds a saved 1440x900 homepage visual target SVG under public assets and docs design reference.
- The live homepage now has browser/e2e guardrails proving the hero, h1, primary CTA and cinematic scene render visible boxes in the first viewport.
- v1.93 evidence: RED browser/e2e reproduced missing design reference; source validator PASS; Web typecheck PASS; Web production build PASS; Playwright desktop/mobile design-reference/hero-box/font-size/overflow PASS.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.94.

Current phase: WEB-FE-PUBLIC-VISUAL-ATMOSPHERE-v1.92 WEB_CLOSED.

Current decision: v1.92 FE public visual atmosphere/layout slice closed after user feedback that the website looked too raw, too monochrome and visually poor. Continue UI/UX layout work next before adding more content. Entire program is NOT production-complete.

- v1.92 adds layered ambient public-shell backgrounds, sticky glass navigation, stronger panel/card depth, accent lines and tone-specific button gradients.
- The change focuses on visual hierarchy and atmosphere rather than content volume, while preserving existing no-backend/no-production claims.
- v1.92 evidence: RED browser/e2e reproduced missing ambient shell layer; source validator PASS; Web typecheck PASS; Web production build PASS; Playwright desktop/mobile visual-layer/font-size/overflow PASS.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.93.

Current phase: WEB-FE-PUBLIC-COMMUNITY-REAL-PLAZA-GALLERY-v1.91 WEB_CLOSED.

Current decision: v1.91 FE public community real plaza screenshot gallery slice closed; continue FE/browser UI work next and keep using real LinhGioiOnline images where useful. Entire program is NOT production-complete.

- v1.91 copies two lightweight Linh Thanh plaza PNG screenshots from the sibling LinhGioiOnline repo into `apps/web/public/game-art/community`.
- `/community` now presents those screenshots as static reference art with accessible names, compact captions, desktop 2-column layout and mobile 1-column layout.
- v1.91 evidence: RED browser/e2e reproduced missing real community plaza gallery; source validator PASS; Web typecheck PASS; Web production build PASS; Playwright desktop/mobile image-loading/font-size/overflow/column-layout PASS; visual metric review completed with pageOverflow 0.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.92.

Current phase: WEB-FE-PUBLIC-START-REAL-ONBOARDING-GALLERY-v1.90 WEB_CLOSED.

Current decision: v1.90 FE public start real onboarding screenshot gallery slice closed; continue FE/browser UI work next and keep using real LinhGioiOnline images where useful. Entire program is NOT production-complete.

- v1.90 copies three lightweight Dong Mon onboarding PNG screenshots from the sibling LinhGioiOnline repo into `apps/web/public/game-art/onboarding`.
- `/start` now presents those screenshots as static reference art with accessible names, compact captions, desktop 3-column layout and mobile 1-column layout.
- v1.90 evidence: RED browser/e2e reproduced missing real screenshot gallery; source validator PASS; Web typecheck PASS; Web production build PASS; Playwright desktop/mobile image-loading/font-size/overflow/column-layout PASS; visual metric review completed with pageOverflow 0.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.91.

Current phase: WEB-FE-PUBLIC-ROUTE-HEADING-PRIORITY-v1.89 WEB_CLOSED.

Current decision: v1.89 FE public remaining-route heading-priority slice closed; continue FE/browser UI work next, including real image/design usage from LinhGioiOnline where useful. Entire program is NOT production-complete.

- v1.89 moves the shared release CTA below the page h1 on `/accessibility`, `/community`, `/game/loop` and `/performance`.
- The selected public routes now start main content with exactly one visible h1 while keeping no-audit/no-community-backend/no-live-combat/no-performance-certification non-claims explicit.
- v1.89 evidence: RED browser/e2e reproduced CTA h2 headings before route h1; source validator PASS; Web typecheck PASS; Web production build PASS; Playwright desktop/mobile heading-order/font-size/overflow PASS; visual metric review completed with pageOverflow 0.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.90.

Current phase: WEB-FE-PUBLIC-TRUST-HEADING-PRIORITY-v1.88 WEB_CLOSED.

Current decision: v1.88 FE public trust heading-priority slice closed; continue FE/browser UI work next. Entire program is NOT production-complete.

- v1.88 moves CTA sections below the page h1 on `/download/trust`, `/roadmap` and `/community/onboarding`.
- The selected trust/onboarding routes now start main content with exactly one visible h1 while keeping no-download/no-community-backend/no-waitlist non-claims explicit.
- v1.88 evidence: RED browser/e2e reproduced CTA h2 headings before trust h1; source validator PASS; Web typecheck PASS; Web production build PASS; Playwright desktop/mobile heading-order/font-size/overflow PASS; visual metric review completed with pageOverflow 0.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.89.

Current phase: WEB-FE-PUBLIC-SUPPORT-HEADING-PRIORITY-v1.87 WEB_CLOSED.

Current decision: v1.87 FE public support heading-priority slice closed; continue FE/browser UI work next. Entire program is NOT production-complete.

- v1.87 moves CTA sections below the page h1 on `/support`, `/support/help` and `/support/safety`.
- The selected support routes now start main content with exactly one visible h1 while keeping no-ticket/no-account-lookup/no-live-search/no-moderation-backend non-claims explicit.
- v1.87 evidence: RED browser/e2e reproduced CTA h2 headings before support h1; source validator PASS; Web typecheck PASS; Web production build PASS; Playwright desktop/mobile heading-order/font-size/overflow PASS; visual metric review completed with pageOverflow 0.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.88.

Current phase: WEB-FE-PUBLIC-RELEASE-HEADING-PRIORITY-v1.86 WEB_CLOSED.

Current decision: v1.86 FE public release heading-priority slice closed; continue FE/browser UI work next. Entire program is NOT production-complete.

- v1.86 moves CTA sections below the page h1 on `/release`, `/release/readiness` and `/release/tester-pack`.
- The selected release routes now start main content with exactly one visible h1 while keeping release/tester/backend/entitlement non-claims explicit.
- v1.86 evidence: RED browser/e2e reproduced CTA h2 headings before release h1; source validator PASS; Web typecheck PASS; Web production build PASS; Playwright desktop/mobile heading-order/font-size/overflow PASS; visual metric review completed with pageOverflow 0.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.87.

Current phase: WEB-FE-PUBLIC-CONTENT-HEADING-ORDER-v1.85 WEB_CLOSED.

Current decision: v1.85 FE public content heading-order slice closed; continue FE/browser UI work next. Entire program is NOT production-complete.

- v1.85 adds first-heading h1 order to `/events`, `/patch-notes`, `/news` and `/status`.
- The selected content/status routes now start main content with exactly one visible page h1 while keeping fixture/no-backend/CMS non-claims explicit.
- v1.85 evidence: RED browser/e2e reproduced missing or misordered page h1 headings; source validator PASS; Web typecheck PASS; Web production build PASS; Playwright desktop/mobile heading-order/font-size/overflow PASS; visual metric review completed with pageOverflow 0.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.86.

Current phase: WEB-FE-PUBLIC-STORY-FRACTURE-DESIGN-BOARD-v1.84 WEB_CLOSED.

Current decision: v1.84 FE public story fracture design-board slice closed; continue FE/browser UI work next. Entire program is NOT production-complete.

- v1.84 adds the audited LinhGioiOnline Dong Mon world concept image to `/story`.
- The story fracture board renders with accessible name `Dong Mon fracture story concept art`, eager loading and responsive layout while keeping live portal/quest/player/account/world-simulation non-claims explicit.
- v1.84 evidence: RED browser/e2e reproduced missing story fracture concept image on `/story`; source validator PASS; Web typecheck PASS; Web production build PASS; Playwright desktop/mobile image-loading/font-size/overflow PASS; visual metric review completed with pageOverflow 0 and loaded image natural dimensions.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.85.

Current phase: WEB-FE-PUBLIC-GAME-WORLD-DESIGN-BOARD-v1.83 WEB_CLOSED.

Current decision: v1.83 FE public game world design-board slice closed; continue FE/browser UI work next. Entire program is NOT production-complete.

- v1.83 adds a real LinhGioiOnline world-hub reference-art SVG to `/game`.
- The game world atlas board renders with accessible name `Game world atlas hub board`, eager loading and responsive layout while keeping live map/account position/quest/world-server non-claims explicit.
- v1.83 evidence: RED browser/e2e reproduced missing game world atlas hub board on `/game`; source validator PASS; Web typecheck PASS; Web production build PASS; Playwright desktop/mobile image-loading/font-size/overflow PASS; visual metric review completed with pageOverflow 0 and loaded SVG natural dimensions.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.84.

Current phase: WEB-FE-PUBLIC-GAME-LOOP-DESIGN-BOARD-v1.82 WEB_CLOSED.

Current decision: v1.82 FE public game loop design-board slice closed; continue FE/browser UI work next. Entire program is NOT production-complete.

- v1.82 adds a real LinhGioiOnline core gameplay-loop reference-art SVG to `/game/loop`.
- The game loop board renders with accessible name `World gameplay loop board`, eager loading and responsive layout while keeping live combat/inventory/party/account integration non-claims explicit.
- v1.82 evidence: RED browser/e2e reproduced missing world gameplay-loop board on `/game/loop`; source validator PASS; Web typecheck PASS; Web production build PASS; Playwright desktop/mobile image-loading/font-size/overflow PASS; visual metric review completed with pageOverflow 0 and loaded SVG natural dimensions.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.83.

Current phase: WEB-FE-PUBLIC-STATUS-DESIGN-BOARD-v1.81 WEB_CLOSED.

Current decision: v1.81 FE public status design-board slice closed; continue FE/browser UI work next. Entire program is NOT production-complete.

- v1.81 adds a real LinhGioiOnline HUD/status reference-art SVG to `/status`.
- The status maintenance board renders with accessible name `Status maintenance signal board`, eager loading and responsive layout while keeping CMS/monitoring/incident/live-server-health non-claims explicit.
- v1.81 evidence: RED browser/e2e reproduced missing status maintenance signal board on `/status`; source validator PASS; Web typecheck PASS; Web production build PASS; Playwright desktop/mobile image-loading/font-size/overflow PASS; visual metric review completed with pageOverflow 0 and loaded SVG natural dimensions.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.82.

Current phase: WEB-FE-PUBLIC-JOURNEY-DESIGN-BOARD-v1.80 WEB_CLOSED.

Current decision: v1.80 FE public journey design-board slice closed; continue FE/browser UI work next. Entire program is NOT production-complete.

- v1.80 adds a real LinhGioiOnline route-flow reference-art SVG to `/journey`.
- The journey route-flow board renders with accessible name `Journey session route flow board`, eager loading and responsive layout while keeping live guild/account/inventory/backend non-claims explicit.
- v1.80 evidence: RED browser/e2e reproduced missing journey route-flow board on `/journey`; source validator PASS; Web typecheck PASS; Web production build PASS; Playwright desktop/mobile image-loading/font-size/overflow PASS; visual metric review completed with pageOverflow 0 and loaded SVG natural dimensions.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.81.

Current phase: WEB-FE-PUBLIC-START-DESIGN-BOARD-v1.79 WEB_CLOSED.

Current decision: v1.79 FE public start design-board slice closed; continue FE/browser UI work next. Entire program is NOT production-complete.

- v1.79 adds a real LinhGioiOnline core gameplay-loop reference-art SVG to `/start`.
- The start tutorial board renders with accessible name `Start tutorial gameplay loop board`, eager loading and responsive layout while keeping download/account/login/entitlement non-claims explicit.
- v1.79 evidence: RED browser/e2e reproduced missing start tutorial gameplay-loop board on `/start`; source validator PASS; Web typecheck PASS; Web production build PASS; Playwright desktop/mobile image-loading/font-size/overflow PASS; visual metric review completed with pageOverflow 0 and loaded SVG natural dimensions.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.80.

Current phase: WEB-FE-PUBLIC-ACCESSIBILITY-DESIGN-BOARD-v1.78 WEB_CLOSED.

Current decision: v1.78 FE public accessibility design-board slice closed; continue FE/browser UI work next. Entire program is NOT production-complete.

- v1.78 adds a real LinhGioiOnline world-hub route-map reference-art SVG to `/accessibility`.
- The accessibility readability board renders with accessible name `Accessibility readability route map board`, eager loading and responsive layout while keeping formal WCAG/legal/settings-backend non-claims explicit.
- v1.78 evidence: RED browser/e2e reproduced missing accessibility route-map board on `/accessibility`; source validator PASS; Web typecheck PASS; Web production build PASS; Playwright desktop/mobile image-loading/font-size/overflow PASS; visual metric review completed with pageOverflow 0 and loaded SVG natural dimensions.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.79.

Current phase: WEB-FE-PUBLIC-CLOSED-TESTER-DESIGN-BOARD-v1.77 WEB_CLOSED.

Current decision: v1.77 FE public closed tester design-board slice closed; continue FE/browser UI work next. Entire program is NOT production-complete.

- v1.77 adds a real LinhGioiOnline production-board reference-art SVG to `/release/tester-pack`.
- The closed tester board renders with accessible name `Closed tester information production board`, eager loading and responsive layout while keeping live intake/sign-up/tester-slot/backend collection non-claims explicit.
- v1.77 evidence: RED browser/e2e reproduced missing closed tester production board on `/release/tester-pack`; source validator PASS; Web typecheck PASS; Web production build PASS; Playwright desktop/mobile image-loading/font-size/overflow PASS; visual metric review completed with pageOverflow 0 and loaded SVG natural dimensions.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.78.

Current phase: WEB-FE-PUBLIC-PERFORMANCE-DESIGN-BOARD-v1.76 WEB_CLOSED.

Current decision: v1.76 FE public performance design-board slice closed; continue FE/browser UI work next. Entire program is NOT production-complete.

- v1.76 adds a real LinhGioiOnline HUD reference-art SVG to `/performance`.
- The performance board renders with accessible name `Performance copy budget HUD board`, eager loading and responsive layout while keeping Lighthouse/CDN/Core Web Vitals/monitoring non-claims explicit.
- v1.76 evidence: RED browser/e2e reproduced missing performance HUD board on `/performance`; source validator PASS; Web typecheck PASS; Web production build PASS; Playwright desktop/mobile image-loading/font-size/overflow PASS; visual metric review completed with pageOverflow 0 and loaded SVG natural dimensions.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.77.

Current phase: WEB-FE-PUBLIC-COMMUNITY-ONBOARDING-DESIGN-BOARD-v1.75 WEB_CLOSED.

Current decision: v1.75 FE public community onboarding design-board slice closed; continue FE/browser UI work next. Entire program is NOT production-complete.

- v1.75 adds a real LinhGioiOnline core gameplay-loop reference-art SVG to `/community/onboarding`.
- The community onboarding board renders with accessible name `Community onboarding gameplay loop board`, eager loading and responsive layout while keeping live forum/chat/guild/ticket/waitlist backend non-claims explicit.
- v1.75 evidence: RED browser/e2e reproduced missing community onboarding gameplay-loop board on `/community/onboarding`; source validator PASS; Web typecheck PASS; Web production build PASS; Playwright desktop/mobile image-loading/font-size/overflow PASS; visual metric review completed with pageOverflow 0 and loaded SVG natural dimensions.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.76.

Current phase: WEB-FE-PUBLIC-RELEASE-NARRATIVE-DESIGN-BOARD-v1.74 WEB_CLOSED.

Current decision: v1.74 FE public release narrative design-board slice closed; continue FE/browser UI work next. Entire program is NOT production-complete.

- v1.74 adds a real LinhGioiOnline M0-to-M1 gate reference-art SVG to `/release`.
- The release narrative gate board renders with accessible name `Release narrative M0 to M1 gate board`, eager loading and responsive layout while keeping public build/open beta/entitlement/backend non-claims explicit.
- v1.74 evidence: RED browser/e2e reproduced missing release narrative M0-to-M1 gate board on `/release`; source validator PASS; Web typecheck PASS; Web production build PASS; Playwright desktop/mobile image-loading/font-size/overflow PASS; visual metric review completed with pageOverflow 0 and loaded SVG natural dimensions.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.75.

Current phase: WEB-FE-PUBLIC-SUPPORT-HELP-DESIGN-BOARD-v1.73 WEB_CLOSED.

Current decision: v1.73 FE public support help design-board slice closed; continue FE/browser UI work next. Entire program is NOT production-complete.

- v1.73 adds a real LinhGioiOnline world-hub reference-art SVG to `/support/help`.
- The support help route-map board renders with accessible name `Support help route map board`, eager loading and responsive layout while keeping live search/ticket backend/account lookup/sensitive-data intake non-claims explicit.
- v1.73 evidence: RED browser/e2e reproduced missing support help route-map board on `/support/help`; source validator PASS; Web typecheck PASS; Web production build PASS; Playwright desktop/mobile image-loading/font-size/overflow PASS; visual metric review completed with pageOverflow 0 and loaded SVG natural dimensions.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.74.

Current phase: WEB-FE-PUBLIC-SAFETY-SUPPORT-DESIGN-BOARD-v1.72 WEB_CLOSED.

Current decision: v1.72 FE public safety support design-board slice closed; continue FE/browser UI work next. Entire program is NOT production-complete.

- v1.72 adds a real LinhGioiOnline HUD reference-art SVG to `/support/safety`.
- The safety support board renders with accessible name `Player safety support HUD board`, eager loading and responsive layout while keeping account lookup/moderation backend/live ticketing/SLA non-claims explicit.
- v1.72 evidence: RED browser/e2e reproduced missing safety support HUD board on `/support/safety`; source validator PASS; Web typecheck PASS; Web production build PASS; Playwright desktop/mobile image-loading/font-size/overflow PASS; visual metric review completed with pageOverflow 0 and loaded SVG natural dimensions.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.73.

Current phase: WEB-FE-PUBLIC-RELEASE-READINESS-DESIGN-BOARD-v1.71 WEB_CLOSED.

Current decision: v1.71 FE public release readiness design-board slice closed; continue FE/browser UI work next. Entire program is NOT production-complete.

- v1.71 adds a real LinhGioiOnline production-board reference-art SVG to `/release/readiness`.
- The release readiness board renders with accessible name `Release readiness production board`, eager loading and responsive layout while keeping public build/entitlement/ticket backend/launch non-claims explicit.
- v1.71 evidence: RED browser/e2e reproduced missing release readiness production board on `/release/readiness`; source validator PASS; Web typecheck PASS; Web production build PASS; Playwright desktop/mobile image-loading/font-size/overflow PASS; visual metric review completed with pageOverflow 0 and loaded SVG natural dimensions.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.72.

Current phase: WEB-FE-PUBLIC-ROADMAP-DESIGN-BOARD-v1.70 WEB_CLOSED.

Current decision: v1.70 FE public roadmap design-board slice closed; continue FE/browser UI work next. Entire program is NOT production-complete.

- v1.70 adds a real LinhGioiOnline reference-art SVG to `/roadmap`.
- The public roadmap flow board renders with accessible name `Public roadmap flow design board`, eager loading and responsive layout while keeping production auth/download/CMS/backend non-claims explicit.
- v1.70 evidence: RED browser/e2e reproduced missing roadmap design board on `/roadmap`; source validator PASS; Web typecheck PASS; Web production build PASS; Playwright desktop/mobile image-loading/font-size/overflow PASS; visual metric review completed with pageOverflow 0 and loaded SVG natural dimensions.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.71.

Current phase: WEB-FE-OPS-AUDIT-VISUAL-v1.69 WEB_CLOSED.

Current decision: v1.69 FE Ops audit visual slice closed; continue FE/browser UI work next. Entire program is NOT production-complete.

- v1.69 updates Ops `/audit` in `apps/ops`.
- The visual-only audit route now renders real game-art with accessible name `Ops audit trail visual`, eager loading and responsive layout while keeping NO_REAL_OPS_MUTATION and RBAC/audit/API blocked-state copy explicit.
- v1.69 evidence: RED browser/e2e reproduced missing Ops audit image on `/audit`; source validator PASS; Ops typecheck PASS; Ops production build PASS; Playwright desktop/mobile image-loading/locked-filter/font-size/overflow PASS; visual metric review completed with pageOverflow 0 and loaded image natural dimensions.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.70.

Current phase: WEB-FE-PORTAL-ACCESS-JOURNEY-VISUAL-v1.68 WEB_CLOSED.

Current decision: v1.68 FE Portal access journey visual slice closed; continue FE/browser UI work next. Entire program is NOT production-complete.

- v1.68 updates shared Portal `AccessJourney` in `apps/portal`.
- Portal access/auth fixture routes now render real game-art with accessible name `Portal access gate art`, eager loading and responsive layout while keeping Auth/DB/API blocked-state copy explicit.
- v1.68 evidence: RED browser/e2e reproduced missing Portal access image on `/login`; source validator PASS; Portal typecheck PASS; Portal production build PASS; Playwright desktop/mobile image-loading/keyboard/font-size/overflow PASS; visual metric review completed with pageOverflow 0 and loaded image natural dimensions.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.69.

Current phase: WEB-FE-PUBLIC-DOWNLOAD-TRUST-DESIGN-BOARD-v1.67 WEB_CLOSED.

Current decision: v1.67 FE public download trust design-board slice closed; continue FE/browser UI work next. Entire program is NOT production-complete.

- v1.67 adds a real LinhGioiOnline reference-art SVG to `/download/trust`.
- The release trust gate board renders with an accessible image name, eager loading, responsive layout and zero mobile overflow.
- v1.67 evidence: RED browser/e2e reproduced missing design board image on `/download/trust`; source validator PASS; Web typecheck PASS; Web production build PASS; Playwright desktop/mobile image-loading/font-size/overflow PASS; visual metric review completed with pageOverflow 0 and loaded SVG natural dimensions.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.68.

Current phase: WEB-FE-SHARED-PAGINATION-BOUNDARY-REASON-v1.66 WEB_CLOSED.

Current decision: v1.66 FE shared pagination boundary reason slice closed; continue FE/browser UI work next. Entire program is NOT production-complete.

- v1.66 updates shared `PaginationBar` in `packages/ui`.
- Disabled fixture pagination boundary controls now keep keyboard focus and expose a visible unavailable reason through `aria-describedby`.
- v1.66 evidence: RED browser/e2e reproduced missing `aria-describedby` on Ops `/support` pagination boundary controls; source validator PASS; UI/Ops typecheck PASS; Ops production build PASS; Playwright mobile keyboard/reason/font-size/overflow PASS; visual metric review completed with pageOverflow 0 and pagination button fonts <= 18px.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.67.

Current phase: WEB-FE-EXPANDED-ROUTE-READABILITY-v1.65 WEB_CLOSED.

Current decision: v1.65 FE expanded route readability audit guardrail closed; continue FE/browser UI work next. Entire program is NOT production-complete.

- v1.65 adds a permanent Playwright mobile route readability matrix in `tests/e2e/fe-expanded-route-readability-v165.spec.ts`.
- The matrix covers 16 public/detail/Portal/Ops route cases and checks serious/critical axe violations, horizontal overflow, visible typography caps, nav/action font caps and named keyboard-readable scroll regions.
- v1.65 evidence: temporary browser audits covered 44 mobile routes, 17 axe routes and 10 detail routes; permanent v1.65 Playwright matrix PASS 16/16; source validator PASS; relevant app typecheck/build evidence recorded in handoff.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.66.

Current phase: WEB-FE-PUBLIC-STORY-CHAPTER-TYPOGRAPHY-v1.64 WEB_CLOSED.

Current decision: v1.64 FE public story chapter typography slice closed; continue FE/browser UI work next. Entire program is NOT production-complete.

- v1.64 updates mobile `/story` narrative chapter visual typography in `apps/web/src/app/globals.css`.
- Decorative `NarrativeChapterGrid` numbers now cap to `2.75rem` on mobile after browser audit found 60.8px chapter numbers that dominated the heading scale.
- v1.64 evidence: RED browser/e2e reproduced oversized mobile `/story` chapter number `01` at 60.8px; source validator PASS; Web typecheck PASS; Web production build PASS; Playwright story typography mobile font-size/overflow PASS; visual metric review completed with pageOverflow 0 and chapter numbers <= 48px.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.65.

Current phase: WEB-FE-PUBLIC-BRAND-NAV-SCROLL-REGION-v1.63 WEB_CLOSED.

Current decision: v1.63 FE public brand nav scroll-region slice closed; continue FE/browser UI work next. Entire program is NOT production-complete.

- v1.63 updates the public header route-link rail in `apps/web` and the shared legacy `SiteNavigation` owner in `packages/ui`.
- Mobile public route links now expose a named keyboard-focusable scroll region with `role="region"`, `aria-label="Public primary route links"`, `tabIndex={0}` and visible focus styling.
- v1.63 evidence: RED browser/e2e reproduced the missing named region on mobile `/classes` and `/download`; source validator PASS; UI/Web typecheck PASS; Web production build PASS; Playwright public brand-nav mobile keyboard/font-size/overflow PASS; public navigation desktop/mobile regression PASS; screenshot/visual metric review completed with pageOverflow 0 and nav fonts <= 18px.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.64.

Current phase: WEB-FE-PORTAL-HOME-VISUAL-LCP-IMAGES-v1.62 WEB_CLOSED.

Current decision: v1.62 FE Portal home visual LCP image slice closed; continue FE/browser UI work next. Entire program is NOT production-complete.

- v1.62 updates Portal home visual panel image loading in `apps/portal/src/app/page.tsx`.
- Both Portal home visual images now render with `loading="eager"` after browser review reported the Võ development-art image as LCP-sensitive on mobile.
- v1.62 evidence: RED browser/e2e reproduced `Portal home development art Võ` with `loading="lazy"`; source validator PASS; Portal typecheck PASS; Portal production build PASS; Playwright desktop/mobile image-loading/font-size/overflow PASS; screenshot review completed with console warnings empty, eager complete images and pageOverflow 0.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.63.

Current phase: WEB-FE-WORKSPACE-NAV-SCROLL-REGION-v1.61 WEB_CLOSED.

Current decision: v1.61 FE shared workspace nav scroll-region slice closed; continue FE/browser UI work next. Entire program is NOT production-complete.

- v1.61 updates shared `WorkspaceNavigation` in `packages/ui`.
- Portal/Ops mobile workspace navigation now keeps horizontal scrolling but exposes the nav container as a keyboard-focusable scroll region with `tabIndex={0}` and visible focus styling.
- v1.61 evidence: RED browser/e2e reproduced mobile workspace nav `tabIndex === -1`; source validator PASS; UI/Portal/Ops typecheck PASS; Portal/Ops production build PASS; Playwright desktop/mobile keyboard/nav/font-size/overflow PASS; screenshot review completed with mobile pageOverflow 0, solid 2px nav focus outline and 16px max nav link font.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.62.

Current phase: WEB-FE-SHARED-FIXTURE-FORM-CONTROLS-v1.60 WEB_CLOSED.

Current decision: v1.60 FE shared fixture form controls slice closed; continue FE/browser UI work next. Entire program is NOT production-complete.

- v1.60 updates shared `TextInput`, `SelectInput` and `CheckboxField` locked fixture behavior in `packages/ui`.
- Portal/Ops fixture controls no longer rely on native `disabled`; locked text inputs are readonly focusable controls, and locked select/checkbox controls render keyboard-readable ARIA readouts with `aria-disabled`/`data-disabled`.
- v1.60 evidence: RED browser/e2e reproduced native disabled Portal auth inputs and Ops support select; source validator PASS; UI/Portal/Ops typecheck PASS; Portal/Ops production build PASS; Playwright desktop/mobile keyboard/no-mutation/font-size/overflow PASS; screenshot review completed with pageOverflow 0 and 16px focused controls.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.61.

Current phase: WEB-FE-SHARED-DATA-TABLE-SCROLL-REGION-v1.59 WEB_CLOSED.

Current decision: v1.59 FE shared DataTable scroll-region slice closed; continue FE/browser UI work next. Entire program is NOT production-complete.

- v1.59 updates shared `DataTable` horizontal scroll wrappers in `packages/ui`.
- Data table wrappers now expose `role="region"`, caption-derived labels, `tabIndex={0}`, and focus-visible styling for keyboard access to scrollable data tables.
- v1.59 evidence: RED browser/e2e reproduced missing named region on Ops `/support` table wrapper; source validator PASS; UI typecheck PASS; Ops typecheck PASS; Ops production build PASS; Playwright desktop/mobile keyboard/region/font-size/overflow PASS; screenshot review completed.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.60.

Current phase: WEB-FE-ACCESSIBILITY-AXE-MATRIX-v1.58 WEB_CLOSED.

Current decision: v1.58 FE accessibility axe matrix slice closed; continue FE/browser UI work next. Entire program is NOT production-complete.

- v1.58 adds an axe-powered browser/e2e accessibility route matrix across public, Portal and Ops representative routes.
- The matrix found and closed Ops `/support` mobile overflow caused by long metric fixture/contract tokens; shared metric card text now wraps safely.
- v1.58 evidence: RED browser/e2e reproduced Ops `/support` mobile overflow 19px; source validator PASS; UI/Web/Portal/Ops typecheck PASS; Web/Portal/Ops production build PASS; Playwright desktop/mobile axe/font-size/overflow matrix PASS; screenshot review completed.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.59.

Current phase: WEB-FE-SHARED-PAGINATION-BOUNDARY-v1.57 WEB_CLOSED.

Current decision: v1.57 FE shared pagination boundary slice closed; continue FE/browser UI work next. Entire program is NOT production-complete.

- v1.57 updates shared `PaginationBar` boundary control accessibility in `packages/ui`.
- Pagination boundary controls now use `aria-disabled`, `data-disabled`, and unavailable labels instead of native disabled buttons, keeping them keyboard-focusable and clear in Ops `/support`.
- v1.57 evidence: RED browser/e2e reproduced native disabled pagination without `aria-disabled`; source validator PASS; UI typecheck PASS; Ops typecheck PASS; Ops production build PASS; Playwright desktop/mobile keyboard/no-write/font-size/overflow PASS; screenshot review completed.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.58.

Current phase: WEB-FE-PORTAL-SUPPORT-BLOCKED-ACTION-v1.56 WEB_CLOSED.

Current decision: v1.56 FE Portal support blocked action slice closed; continue FE/browser UI work next. Entire program is NOT production-complete.

- v1.56 updates Portal `/support` new-case blocked action accessibility.
- The action now uses shared `BlockedActionButton` with `aria-disabled`, `data-disabled`, and `aria-describedby` instead of native disabled `SpiritButton`.
- v1.56 evidence: RED browser/e2e reproduced missing `aria-disabled` on native disabled support action; source validator PASS; Portal typecheck PASS; Portal production build PASS; Playwright desktop/mobile keyboard/no-write/font-size/overflow PASS; screenshot review completed.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.57.

Current phase: WEB-FE-PUBLIC-CLASS-ART-TYPOGRAPHY-v1.55 WEB_CLOSED.

Current decision: v1.55 FE public class art typography slice closed; continue FE/browser UI work next. Entire program is NOT production-complete.

- v1.55 updates the public `/classes` class art spotlight typography scale.
- Decorative VÕ pseudo lettering is capped from the previous viewport-dominant 281.6px browser result to a bounded atmospheric scale, and the mobile class art heading clamp is reduced.
- v1.55 evidence: RED browser/e2e reproduced oversized decorative VÕ at 281.6px; source validator PASS; Web typecheck PASS; Web production build PASS; Playwright desktop/mobile font-size/overflow PASS; screenshot review completed.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.56.

Current phase: WEB-FE-PUBLIC-CLASS-ART-LOADING-v1.54 WEB_CLOSED.

Current decision: v1.54 FE public class art loading slice closed; continue FE/browser UI work next. Entire program is NOT production-complete.

- v1.54 updates public ClassArtSpotlight image loading intent on `/classes`.
- Both Võ class art board images now render with explicit `loading="eager"` after browser review reported the starter art board as LCP-sensitive.
- v1.54 evidence: RED source validator reproduced missing explicit loading intent on both class art board images, and browser review reported the starter art board as LCP-sensitive; source validator PASS; Web typecheck PASS; Web production build PASS; Playwright desktop/mobile image-loading/font-size/overflow PASS; screenshot review completed.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.55.

Current phase: WEB-FE-PUBLIC-CINEMATIC-IMAGE-LOADING-v1.53 WEB_CLOSED.

Current decision: v1.53 FE public cinematic image loading slice closed; continue FE/browser UI work next. Entire program is NOT production-complete.

- v1.53 updates public `CinematicWorldScene` image loading intent.
- Public cinematic world concept image now renders with `loading="eager"` across homepage and compact route hero variants after browser review showed `/game` compact scene can also be LCP-sensitive.
- v1.53 evidence: RED e2e reproduced missing `loading="eager"` under the old priority path; source validator PASS; Web typecheck PASS; Web production build PASS; Playwright desktop/mobile image-loading/font-size/overflow PASS; screenshot review completed.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.54.

Current phase: WEB-FE-PORTAL-JOURNEY-LCP-IMAGE-v1.52 WEB_CLOSED.

Current decision: v1.52 FE Portal journey LCP image slice closed; continue FE/browser UI work next. Entire program is NOT production-complete.

- v1.52 updates Portal `/journey` visual image loading for the above-fold art row.
- The Portal journey art row now renders with `loading="eager"` for all three reviewed images after browser review showed development art could also be LCP-sensitive.
- v1.52 evidence: RED e2e reproduced missing `loading="eager"` under the old priority path and lazy development-art images after the runtime LCP warning; source validator PASS; Portal typecheck PASS; Portal production build PASS; Playwright desktop/mobile image-loading/font-size/overflow PASS; screenshot review completed.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.53.

Current phase: WEB-FE-PORTAL-HOME-LCP-IMAGE-v1.51 WEB_CLOSED.

Current decision: v1.51 FE Portal home LCP image slice closed; continue FE/browser UI work next. Entire program is NOT production-complete.

- v1.51 updates Portal home visual image loading for the WORLD_CONCEPT panel.
- The Portal home WORLD_CONCEPT image now renders with `loading="eager"`; non-WORLD_CONCEPT visual panels remain lazy-loaded.
- v1.51 evidence: RED e2e reproduced `loading="lazy"`; source validator PASS; Portal typecheck PASS; Portal production build PASS; Playwright desktop/mobile image-loading/font-size/overflow PASS; screenshot review completed.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.52.

Current phase: WEB-FE-PUBLIC-SKIP-LINK-VISUAL-v1.50 WEB_CLOSED.

Current decision: v1.50 FE public skip link visual slice closed; continue FE/browser UI work next. Entire program is NOT production-complete.

- v1.50 updates `.lgo-skip-link` in the public web app to match the safer transform-hidden pattern used by workspace shells.
- Hidden public skip link now stays anchored at `top: 0`, uses bounded transform hiding, has viewport max-width and wraps safely on mobile.
- Focused skip link remains the first keyboard target and still jumps to `#main-content`.
- v1.50 evidence: RED e2e reproduced old `top: 12px`/`translateY(-200%)` behavior; source validator PASS; Web typecheck PASS; Web production build PASS; Playwright desktop/mobile hidden/focused/font-size/overflow PASS; screenshot review completed.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.51.

Current phase: WEB-FE-OPS-VISUAL-LCP-IMAGE-v1.49 WEB_CLOSED.

Current decision: v1.49 FE Ops visual LCP image slice closed; continue FE/browser UI work next. Entire program is NOT production-complete.

- v1.49 updates Ops home, Control Center and Security & Governance visual image loading for WORLD_CONCEPT panels.
- WORLD_CONCEPT visuals now render with `loading="eager"`; secondary visual panels remain lazy-loaded.
- v1.49 evidence: RED e2e reproduced `loading="lazy"` across three Ops routes; source validator PASS; Ops typecheck PASS; Ops production build PASS; Playwright desktop/mobile image-loading/font-size/overflow PASS; screenshot review completed.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.50.

Current phase: WEB-FE-PORTAL-SECURITY-LCP-IMAGE-v1.48 WEB_CLOSED.

Current decision: v1.48 FE Portal security LCP image slice closed; continue FE/browser UI work next. Entire program is NOT production-complete.

- v1.48 updates Portal `/account/security` image loading for the browser-reported LCP visual.
- The WORLD_CONCEPT security image now renders with `loading="eager"`; secondary visuals remain lazy-loaded.
- v1.48 evidence: RED e2e reproduced `loading="lazy"`; source validator PASS; Portal typecheck PASS; Portal production build PASS; Playwright desktop/mobile image-loading/font-size/overflow PASS; screenshot review completed.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.49.

Current phase: WEB-FE-WORKSPACE-SKIP-LINK-VISUAL-v1.47 WEB_CLOSED.

Current decision: v1.47 FE shared workspace skip link visual slice closed; continue FE/browser UI work next. Entire program is NOT production-complete.

- v1.47 updates shared `.lgo-workspace-skip` behavior in `packages/ui` for Portal and Ops workspaces.
- Hidden skip link now stays anchored at `top: 0` and hides with `transform`, avoiding full-page screenshot overlay artifacts after scroll.
- Focused skip link remains the first keyboard target, appears near the viewport top, keeps readable font size and does not create horizontal overflow on desktop/mobile.
- v1.47 evidence: RED e2e reproduced negative-top hidden skip link; source validator PASS; UI/Portal/Ops typecheck PASS; Portal/Ops production build PASS; Playwright desktop/mobile hidden/focused/font-size/overflow PASS; screenshot review completed.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.48.

Current phase: WEB-FE-OPS-BLOCKED-ACTION-KEYBOARD-v1.46 WEB_CLOSED.

Current decision: v1.46 FE Ops/Admin blocked action keyboard slice closed; continue FE/browser UI work next. Entire program is NOT production-complete.

- v1.46 reuses shared `BlockedActionButton` for Ops/Admin fixture mutation actions on Trust & Safety, Content & LiveOps, Support review, Player review and Game Operations review.
- Ops blocked actions now expose keyboard focus, `aria-disabled="true"`, `data-disabled="true"`, visible reason text and `aria-describedby` while remaining non-operational.
- v1.46 evidence: RED e2e reproduced missing visible contract reason/blocked-action semantics; source validator PASS; Ops typecheck PASS; Ops production build PASS; Playwright desktop/mobile keyboard/no-write/font-size/overflow PASS; screenshot review completed.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.47.

Current phase: WEB-FE-BLOCKED-ACTION-KEYBOARD-v1.45 WEB_CLOSED.

Current decision: v1.45 FE blocked action keyboard slice closed; continue FE/browser UI work next. Entire program is NOT production-complete.

- v1.45 adds shared `BlockedActionButton` in `packages/ui` for focusable blocked actions with `aria-disabled`, `data-disabled` and explicit reason text.
- Portal `/login`, `/register` and `/recovery` now expose blocked primary actions that keyboard users can focus and read without enabling auth/account/recovery flows.
- v1.45 evidence: RED e2e reproduced native disabled action issue; source validator PASS; UI/Portal typecheck PASS; Portal production build PASS; Playwright desktop/mobile keyboard/no-write/font-size/overflow PASS; screenshot review completed.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.46.

Current phase: WEB-FE-PUBLIC-NAVIGATION-INTERACTION-v1.44 WEB_CLOSED.

Current decision: v1.44 FE public navigation interaction slice closed; continue FE/browser UI work next. Entire program is NOT production-complete.

- v1.44 adds shared `RouteAwareLink` in `packages/ui` for exact/section active route state without depending on Next.js routing APIs.
- Public header navigation now marks `/classes` and the `/download` play/status CTA with `aria-current="page"` and visible active styling.
- Workspace navigation now consumes the same shared route-aware link logic introduced for public navigation.
- v1.44 evidence: RED e2e reproduced missing public `aria-current`; source validator PASS; UI/Web typecheck PASS; Web production build PASS; Playwright desktop/mobile keyboard/navigation/font-size/overflow PASS; screenshot review completed.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.45.

Current phase: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.43 WEB_CLOSED.

Current decision: v1.43 FE accessibility/interaction audit closed; continue FE/browser UI work next. Entire program is NOT production-complete.

- v1.43 adds shared workspace active navigation with `aria-current="page"` and visible current/focus styles.
- Workspace skip link remains first keyboard target and now has explicit focus-visible styling to move focus to `#workspace-content`.
- Portal nested `/account/security` keeps Account nav continuity; Ops `/security-governance` now has direct Governance nav continuity.
- v1.43 evidence: source validator PASS; UI/Portal/Ops typecheck PASS; Portal/Ops production build PASS; Playwright desktop/mobile keyboard/focus/navigation/font-size/overflow PASS; screenshot review completed.
- No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.44.

Current phase: WEB-PORTAL-JOURNEY-DEMO-DATA-v1.39 WEB_CLOSED.

Current decision: v1.39 FE/demo data slice closed; continue FE visual/layout review next. Entire program is NOT production-complete.

- User accepted continuing FE first with demo data while BE is not ready.
- v1.39 adds `/journey` in Portal with provisional data only, copied game-art derivatives with Portal provenance, plus browser/e2e layout guards for typography, image loading and overflow.
- v1.39 evidence: source validator PASS; Portal/UI typecheck PASS; Portal production build PASS; Playwright desktop/mobile 4/4 PASS; production screenshots inspected at 1440 and 390 widths.
- No production auth, No DB persistence, No real Portal integration, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.
- WEB-08 blocked-state spec/report/handoff and validator now record the missing acceptance inputs.
- Sibling game repo `../LinhGioiOnline` was inspected at commit `efa46a898b738cb84f275463e6449a8cde48e177`; it had a dirty worktree, so it is not a sealed accepted web-contract baseline.
- Existing accepted game-side governance/combat markers, including `M6_COMBAT_PROTOCOL_GAMEDATA_CONTRACT_ACCEPTED_v0.40.0`, are useful context but not sufficient for Portal/Ops web integration.
- Required missing inputs remain: canonical Java/Spring Boot commit/API version, owner-approved endpoint inventory/schema, auth/session/expiry/error semantics, permission and audit requirements, integration environment and test-account procedure.
- packages/contracts/src/index.ts still explicitly declares NO_ACCEPTED_BACKEND_CONTRACT. WEB-09/10 remain incomplete.

Next task: WEB-FE-VISUAL-ASSET-LAYOUT-REVIEW-v1.40.

Current phase: WEB-FE-VISUAL-ASSET-LAYOUT-REVIEW-v1.40 WEB_CLOSED.

Current decision: v1.40 FE visual/layout slice closed; continue FE surface polish next. Entire program is NOT production-complete.

- v1.40 reduced oversized Public typography caps and clipped decorative Public hero overflow.
- v1.40 introduced shared `VisualProofGrid`/`VisualProofCard` ownership in `packages/ui`.
- Portal `/journey` now consumes shared visual proof cards; Ops Control Center now has three game-art visual proof cards copied from existing web derivatives with Ops manifest provenance.
- v1.40 keeps all visual data provisional: no production auth, no DB persistence, no real Portal integration, no real Ops/Admin mutation, and `NO_ACCEPTED_BACKEND_CONTRACT` remains active.
- v1.40 evidence: source validator, UI/Web/Portal/Ops typecheck, browser/e2e desktop/mobile, production builds and screenshot review.

Next task: WEB-FE-CONTINUED-SURFACE-POLISH-v1.41.

Current phase: WEB-FE-CONTINUED-SURFACE-POLISH-v1.41 WEB_CLOSED.

Current decision: v1.41 FE continued surface polish closed; continue route-depth continuity next. Entire program is NOT production-complete.

- v1.41 added shared visual proof sections to Portal home and Ops home using existing game-art derivatives.
- Portal home now shows `portalHomeVisualPanels`; Ops home now shows `opsHomeVisualPanels`.
- v1.41 keeps all data provisional: no production auth, no DB persistence, no real Portal integration, no real Ops/Admin mutation, and `NO_ACCEPTED_BACKEND_CONTRACT` remains active.
- v1.41 evidence: source validator, Portal/Ops typecheck, browser/e2e desktop/mobile, production builds and screenshot review.

Next task: WEB-FE-ROUTE-DEPTH-CONTINUITY-v1.42.

Current phase: WEB-FE-ROUTE-DEPTH-CONTINUITY-v1.42 WEB_CLOSED.

Current decision: v1.42 FE route-depth continuity closed; continue accessibility/interaction audit next. Entire program is NOT production-complete.

- v1.42 refactored Portal `/account/security` and Ops `/security-governance` from disabled form/control pages into read-only route continuity pages.
- Both routes now use shared visual proof cards, read-only route actions and browser-verified navigation links.
- v1.42 keeps all data provisional: no production auth, no DB persistence, no real Portal integration, no real Ops/Admin mutation, and `NO_ACCEPTED_BACKEND_CONTRACT` remains active.
- v1.42 evidence: source validator, Portal/Ops typecheck, browser/e2e desktop/mobile, production builds and screenshot review.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.43.

## Previous checkpoint records

Current phase: WEB-OPS-REVIEW-WORKSPACE-DEPTH-v1.38 WEB_CLOSED (fixture UX scope).

Current decision: WEB_BLOCKED_EXTERNAL_CONTRACT for WEB-08-GAME-CONTRACT-SYNC-v1.0. Entire program is NOT production-complete.

- v1.36 access/onboarding source/runtime complete; v1.37 closed its visual repair.
- v1.38 Control Center and Trust & Safety now contain review compositions; home links reach every workspace; Security consumes shared ProgressSteps.
- Ops lint/typecheck/build PASS; HTTP smoke 7/7 PASS; final access/workspace/review Playwright matrix 14/14 PASS across desktop/mobile. Portal rebuilt for reviewed /access banner fix; Public evidence reused.
- Ops changed-route screenshots inspected; six axe WCAG A/AA checks report zero violations. Evidence is scoped, not full-site certification.
- packages/contracts/src/index.ts still explicitly declares NO_ACCEPTED_BACKEND_CONTRACT. No accepted endpoint, session, RBAC or audit contracts were supplied; WEB-08/09/10 remain incomplete.
- Baseline imported from workspace as cc74182; authoritative v1.35 ZIP was not attached. Full/delta package comparisons use named git baselines and do not claim original ZIP identity.
- Local runtime Node 26.8.1 / pnpm 10.15.0 / Next 16.3.4; Node 24.20.0 target not verified.

Current phase: WEB-SHARED-WORKSPACE-VISUAL-CLOSURE-v1.37 WEB_CLOSED. v1.36 visual repair closed by v1.37 evidence.

Current decision: WEB_VERIFY_PASSED for changed workspace surfaces. Next WEB-OPS-REVIEW-WORKSPACE-DEPTH-v1.38.

- Shared container/button/mobile boundary CSS fixed in packages/ui/shell.css.
- UI/Portal/Ops lint/typecheck PASS; Portal/Ops production builds PASS; browser 12/12 PASS.
- Visual review of representative Portal/Ops desktop/mobile screenshots PASS; axe WCAG A/AA: zero violations across login/register/recovery/access/security-governance at 1440/390. This is scoped evidence, not full-site accessibility certification.

Current phase: v1.36 source/runtime verified; visual review found inherited workspace layout defects. Next task WEB-SHARED-WORKSPACE-VISUAL-CLOSURE-v1.37.

Current decision: WEB_FIX_REQUIRED (visual); source/runtime evidence retained.

- Shared ProgressSteps and Portal access journey implemented; /access connects preview account and characters.
- Portal build PASS; HTTP 7/7; Playwright desktop/mobile 8/8 PASS.
- Visual inspection executed: missing shared container/button styling and cramped mobile boundary banner require v1.37.
- Ops v1.35 build now PASS; 4/4 HTTP smoke. Actual local runtime Node 26.8.1 / pnpm 10.15.0 / Next 16.3.4; target Node 24.20.0 not verified.
- Imported workspace baseline cc74182; supplied attachment contained no authoritative ZIP.

Current phase: WEB-OPS-GAME-OPERATIONS-UX-DEPTH-v1.35 closed at source level; next implementation task is WEB-PORTAL-ACCESS-ONBOARDING-UX-DEPTH-v1.36.

Current decision: LGO_WEB_OPS_GAME_OPERATIONS_UX_DEPTH_SOURCE_READY_RUNTIME_ENV_LIMITED_v1.35

## Ops game operations UX depth v1.35

- Ops Game Operations now presents fixture world/session/event overview → dynamic operation detail.
- Content & LiveOps is rebased onto shared `ProvisionalFeatureShell`, `CaseSummary` and `ActivityTimeline`.
- Existing shared page/data/case/timeline/form foundations fully cover the feature; no unnecessary new base primitive was added.
- All restart/drain/publish/rollback controls remain disabled fixtures.
- No world/session/event query API, scheduler, server mutation, RBAC/audit contract or canonical operations DTO is introduced.
- Ops targeted typecheck/lint PASS. Closure build attempt reached compile + TypeScript before environment timeout; retry exited 9. Production build and route smoke are not claimed.

Current phase: WEB-OPS-SUPPORT-TRIAGE-UX-DEPTH-v1.34 closed; next implementation task is WEB-OPS-GAME-OPERATIONS-UX-DEPTH-v1.35.

Current decision: LGO_WEB_OPS_SUPPORT_TRIAGE_UX_DEPTH_RUNTIME_READY_VISUAL_ENV_LIMITED_v1.34

## Ops support / triage UX depth v1.34

- Ops Support now presents fixture queue → support case detail → activity review using existing shared page/data/case/timeline/form primitives.
- No new base primitive was introduced because the v1.28–v1.33 shared foundation already covers the triage composition.
- Ops-owned support fixture data lives in `apps/ops/src/lib/ops-fixtures.ts`.
- Assignment, escalation, support lookup and moderation actions remain disabled fixture UX.
- No ticket backend, player query API, RBAC/audit contract or mutation endpoint is introduced.
- Targeted UI/Ops typecheck/lint PASS; Ops production build PASS, 11 routes; runtime route smoke PASS, 6/6 HTTP 200.

Current phase: WEB-PORTAL-SUPPORT-RECOVERY-UX-DEPTH-v1.33 closed; next implementation task is WEB-OPS-SUPPORT-TRIAGE-UX-DEPTH-v1.34.

Current decision: LGO_WEB_PORTAL_SUPPORT_RECOVERY_UX_DEPTH_RUNTIME_READY_VISUAL_ENV_LIMITED_v1.33

## Portal support / recovery UX depth v1.33

- Portal Support now presents fixture support topics, case summary and case activity using shared base primitives.
- Portal Recovery now presents a fixture recovery case, disabled identity field and explicit recovery stages.
- `packages/ui` owns `CaseSummary` / `CaseSummaryItem`; Portal does not own reusable case-state markup.
- Portal support/recovery fixture data lives in `apps/portal/src/lib/portal-fixtures.ts`.
- No support-ticket backend, account lookup, email delivery, recovery token or credential mutation is introduced.
- Base First / Evidence Reuse / Build Once remain mandatory.
- Portal production build: PASS, 11 routes; runtime route smoke: PASS, 6/6 HTTP 200.
- Public Web and Ops source are unchanged; accepted runtime evidence is reused.

Current phase: WEB-OPS-PLAYER-OPERATIONS-UX-DEPTH-v1.32 closed; next implementation task is WEB-PORTAL-SUPPORT-RECOVERY-UX-DEPTH-v1.33.

Current decision: LGO_WEB_OPS_PLAYER_OPERATIONS_UX_DEPTH_RUNTIME_READY_VISUAL_ENV_LIMITED_v1.32

## Ops player operations UX depth v1.32

- Ops now presents a fixture review journey from player queue → Player 360 detail → activity timeline.
- `packages/ui` owns `ActivityTimeline` and `ActivityTimelineItem`; Ops does not own reusable activity markup.
- Audit reuses the same shared timeline instead of a second app-local timeline pattern.
- Ops fixture records live in `apps/ops/src/lib/ops-fixtures.ts` and remain `PROVISIONAL_WEB_FIXTURE` / `NO_REAL_OPS_MUTATION` / `NOT_CANONICAL_BACKEND_CONTRACT`.
- No player query API, RBAC/audit contract, mutation endpoint or canonical player DTO is introduced.
- Base First / Evidence Reuse / Build Once remain mandatory.
- Ops production build: PASS, 11 routes; runtime route smoke: PASS, 5/5 HTTP 200.
- Public Web and Portal source are unchanged; accepted runtime evidence is reused and no redundant build is run.
- Browser visual review remains environment-limited by the existing localhost policy (`ERR_BLOCKED_BY_ADMINISTRATOR`).

Current phase: WEB-PORTAL-ACCOUNT-CHARACTER-UX-DEPTH-v1.31 closed; next implementation task is WEB-OPS-PLAYER-OPERATIONS-UX-DEPTH-v1.32.

Current decision: LGO_WEB_PORTAL_ACCOUNT_CHARACTER_UX_DEPTH_RUNTIME_READY_VISUAL_ENV_LIMITED_v1.31

## Portal account / character UX depth v1.31

- Player Portal now presents one coherent fixture journey across overview → account → security/sessions → characters → character detail.
- `packages/ui` owns `KeyValueGrid` and `KeyValueItem`; Portal does not own reusable detail-layout markup.
- Portal fixture records live in `apps/portal/src/lib/portal-fixtures.ts` and are explicitly `PROVISIONAL_WEB_FIXTURE` / `NOT_CANONICAL_BACKEND_CONTRACT`.
- No production auth, DB persistence, canonical account/session/character DTO or API request is introduced.
- Base First / Evidence Reuse / Build Once remain mandatory.
- Portal production build: PASS, 11 routes; runtime route smoke: PASS, 6/6 HTTP 200.
- Public Web and Ops source are unchanged; their accepted runtime evidence is reused and no redundant build is run.
- Browser visual review remains environment-limited by the existing localhost policy (`ERR_BLOCKED_BY_ADMINISTRATOR`).

Current phase: WEB-SHARED-DATA-DISPLAY-FOUNDATION-v1.30 closed; next implementation task is WEB-PORTAL-ACCOUNT-CHARACTER-UX-DEPTH-v1.31.

Current decision: LGO_WEB_SHARED_DATA_DISPLAY_FOUNDATION_RUNTIME_READY_VISUAL_ENV_LIMITED_v1.30

## Shared data display v1.30

- `packages/ui/data.tsx` owns `MetricGrid`, `MetricCard`, `DataToolbar`, `DataTable`, and `PaginationBar`.
- `@lgo-web/ui/data.css` owns responsive metric/table/toolbar/pagination presentation.
- `DataTable` accepts presentation columns/rows only and does not define canonical player/character/ops DTOs.
- Portal Characters and Ops Player Operations consume fixture rows through the shared data-display base.
- No API fetch, live pagination, mutation or backend contract is introduced.
- Public Web is unchanged and accepted evidence is reused.
- Portal production build: PASS, 11 routes; runtime smoke: PASS, 5/5 HTTP 200.
- Ops production build: PASS, 11 routes; runtime smoke: PASS, 5/5 HTTP 200.
- Public Web source/build evidence is unchanged and reused; no redundant Public build was run.
- Browser visual review remains environment-limited by existing localhost policy (`ERR_BLOCKED_BY_ADMINISTRATOR`).

Current phase: WEB-SHARED-FORM-CONTROL-FOUNDATION-v1.29 closed; next implementation task is WEB-SHARED-DATA-DISPLAY-FOUNDATION-v1.30.

Current decision: LGO_WEB_SHARED_FORM_CONTROL_FOUNDATION_RUNTIME_READY_VISUAL_ENV_LIMITED_v1.29

## Shared form controls v1.29

- `packages/ui/forms.tsx` owns `FormField`, `TextInput`, `SelectInput`, `CheckboxField`, `FormActions` and `InlineFeedback`.
- `@lgo-web/ui/forms.css` owns neutral form/control/help/error/action presentation.
- `ProvisionalFeatureShell` accepts children so fixture surfaces can reuse shared page + form base without app-local wrappers.
- Portal login/register/recovery use disabled fixture controls only; no auth submit or credential collection is introduced.
- Ops Security/Audit use disabled fixture controls only; no RBAC/audit query/mutation contract is introduced.
- Public Web is unchanged and no fake public search/ticket form is added.
- Portal production build: PASS, 11 routes; runtime smoke: PASS, 6/6 HTTP 200.
- Ops production build: PASS, 11 routes; runtime smoke: PASS, 6/6 HTTP 200.
- Public Web source/build evidence is unchanged and reused; no redundant Public build was run.
- Browser visual review remains environment-limited by the existing localhost policy (`ERR_BLOCKED_BY_ADMINISTRATOR`).

Current phase: WEB-SHARED-PAGE-PATTERN-FOUNDATION-v1.28 closed; next implementation task is WEB-SHARED-FORM-CONTROL-FOUNDATION-v1.29.

Current decision: LGO_WEB_SHARED_PAGE_PATTERN_FOUNDATION_RUNTIME_READY_VISUAL_ENV_LIMITED_v1.28

## Shared page patterns v1.28

- `packages/ui` owns `PageHeader`, `BoundaryBanner`, `DataList`, `DataListItem`, `PageStateGroup` and `WorkspacePage`.
- `WorkspaceBoundaryNotice` delegates to `BoundaryBanner`; `ProvisionalFeatureShell` delegates to `WorkspacePage`.
- Portal and Ops home pages consume shared page/list patterns instead of duplicating `SpiritPanel + Grid + GameCard` structures.
- Public Web keeps its game/story personality and may consume only neutral shared primitives where appropriate.
- Base First and Evidence Reuse / Build Once remain mandatory.
- Portal production build: PASS, 11 routes; runtime smoke: PASS, 5/5 HTTP 200.
- Ops production build: PASS, 11 routes; runtime smoke: PASS, 6/6 HTTP 200.
- Public Web source/build evidence is unchanged and reused; no redundant Public build was run.
- Browser visual review remains environment-limited by the existing localhost policy (`ERR_BLOCKED_BY_ADMINISTRATOR`).

Current phase: WEB-SHARED-APP-SHELL-FOUNDATION-v1.27 closed; next implementation task is WEB-SHARED-PAGE-PATTERN-FOUNDATION-v1.28.

Current decision: LGO_WEB_SHARED_APP_SHELL_FOUNDATION_RUNTIME_READY_VISUAL_ENV_LIMITED_v1.27

# WEB-PROJECT-STATE

## Shared base v1.27

- Portal and Ops consume `WorkspaceAppShell`, `WorkspaceNavigation` and `WorkspaceBoundaryNotice` from `packages/ui`.
- Shared workspace shell CSS lives in `@lgo-web/ui/shell.css`; duplicated app-local shell selectors were removed.
- Direct design-token dependency ownership is explicit for Portal/Ops.
- Public Web keeps its brand-specific shell while sharing lower-level primitives.
- Portal production build: PASS; route smoke 5/5 PASS.
- Ops production build: PASS; route smoke 6/6 PASS.
- Browser visual review remains environment-limited by localhost policy.


Current phase: WEB-PUBLIC-CLASS-WORLD-STORY-DEPTH-v1.25 closed at source/package level; next implementation task is WEB-PUBLIC-HOMEPAGE-DISCOVERY-AND-MEDIA-STORYTELLING-v1.26.

Current decision: LGO_WEB_PUBLIC_CLASS_WORLD_STORY_DEPTH_RUNTIME_READY_VISUAL_ENV_LIMITED_v1.25

Base First governance: ACTIVE across Public Web, Player Portal and Ops/Admin. Shared/base owners are extended before reusable app-local duplication; Evidence Reuse / Build Once is mandatory.

v1.24 keeps the scenario-first v1.22/v1.23 information architecture, but gives the website its own editorial/cinematic visual language. Audited game art is treated as material for web composition, not as a layout contract.


## Public web v1.25

- Five Lộ now expose battle rhythm, world lens, team fantasy and signature verbs rather than only combat labels.
- Linh Thành → Đông Môn → Linh Lâm → Cổ Di Tích → Âm Giới now reads as five different emotional/player promises, not only a route list.
- The opening three chapters now expose opening image, stakes and closing turn so escalation is readable as a story arc.
- New editorial sections remain asset-independent and preserve v1.24 art-provenance boundaries.

## Public web v1.24

- Đông Môn is used as a **world concept** layer inside the cinematic hero, not as a gameplay screenshot.
- Võ starter/skill sheets are presented as a **development art preview** in an editorial class spotlight.
- All five Lộ remain equal in navigation and class identity; Võ is only the first art-backed example.
- Web composition, typography, overlays, responsive behavior and CTA hierarchy remain website-owned so assets can be replaced independently later.
- No production-final artwork, public build or gameplay screenshot claim is introduced.

## Current public identity

- 2D Side-Scrolling Social Action MMORPG.
- HD 2D anime / illustrated direction, not pixel-art.
- Linh Thành is the social heart.
- Three pillars: Social MMORPG / Action / Progression.
- Five Lộ: Võ / Kiếm / Pháp / Cơ / Linh.
- Opening world route: Linh Thành → Đông Môn → Linh Lâm → Cổ Di Tích → Âm Giới.
- Opening narrative: Vết Nứt Đông Môn → Những Cánh Cổng Không Thuộc Về Thế Giới Này → Âm Giới Xâm Lăng.

## Public web v1.23

- Homepage retains fantasy-first narrative and adds a stronger cinematic visual system.
- Hero CTA hierarchy is `Khám phá Linh Giới` → `Chọn Lộ của bạn` → `Bắt đầu câu chuyện`.
- Five Lộ use class-specific emblem treatment without pretending to show production character art.
- Opening route uses a world panorama presentation rather than a technical/status timeline.
- Header CTA is `Trạng thái chơi`, not an unconditional `Tải game` promise.
- Download page starts with public-access status and player guidance before release-governance detail.
- CSS motion respects `prefers-reduced-motion`.

## Creative-source rule

The website is designed from the game scenario, world, class fantasy, narrative and player journey. Game source/runtime is used only to verify technical/public claims; it does not dictate website information architecture.

## Public web v1.26

- Homepage uses one discovery showcase instead of duplicating class/world/story deep sections.
- Discovery configuration references canonical typed content.
- Generic media framing lives in `packages/ui`; homepage composition remains app-owned.
- Base First / Shared Base governance remains active.

## Runtime evidence

### v1.26

- Canonical runtime: Node 24.20.0, Next.js 16.3.4.
- Dedicated v1.26 / Base First / Shared Base / WEB CURRENT STATE validators: PASS.
- Content tests: PASS, 14/14.
- Production build on tmpfs: PASS.
- Static generation: PASS, 63/63 pages.
- Runtime route smoke from the same build: PASS, 5/5 primary routes.
- Browser visual review: UNVERIFIED_ENV; existing Chromium localhost policy returns `ERR_BLOCKED_BY_ADMINISTRATOR`.

### v1.25

- Fresh runtime: Node 24.20.0, pnpm 10.15.0.
- Workspace lint: PASS, 11/11 packages.
- Direct web TypeScript: PASS.
- `@lgo-web/content` tests: PASS, 13/13.
- v1.22/v1.23/v1.24/v1.25 validators: PASS.
- WEB CURRENT STATE: PASS.
- Production build on `/mnt/data`: UNVERIFIED_ENV due sandbox `EIO: i/o error, fsync`.
- Production build on `/dev/shm`: fsync succeeds, but Turbopack first rejects external dependency symlinks; after dependencies are copied inside tmpfs, `next build` exits 139/SIGSEGV.
- Browser/visual runtime review: UNVERIFIED_ENV; no browser PASS is claimed.

### v1.24

- Fresh minimal runtime: Node 24.20.0, pnpm 10.15.0.
- Workspace lint: PASS, 11/11 packages.
- `@lgo-web/web` TypeScript: PASS.
- `@lgo-web/content` tests: PASS, 12/12.
- v1.22 continuity validator: PASS.
- v1.23 continuity validator: PASS.
- v1.24 dedicated art/provenance validator: PASS.
- WEB CURRENT STATE: PASS.
- Art derivative SHA256 + dimensions + claim boundaries: PASS.
- Next.js production build: UNVERIFIED_ENV / sandbox `EIO: i/o error, fsync`.
- Browser/visual review: UNVERIFIED_ENV because Next.js cannot stay alive past sandbox fsync failure.

### v1.23

- Runtime kit archive SHA verified before use.
- Fresh minimal runtime: Node 24.20.0, pnpm 10.15.0.
- Workspace lint: PASS, 11/11 packages.
- `@lgo-web/web` TypeScript: PASS.
- `@lgo-web/content` tests: PASS, 11/11.
- v1.22 continuity validator: PASS.
- v1.23 dedicated validator: PASS.
- WEB CURRENT STATE: PASS.
- Next.js production build: UNVERIFIED_ENV / blocked by sandbox `EIO: i/o error, fsync` after compilation begins.
- Next.js dev server: reaches Ready, then the same sandbox `fsync` EIO terminates the process before browser/curl review.
- Browser/visual review: UNVERIFIED_ENV.

## Backend / availability boundaries

- Production auth: NOT CLAIMED.
- Database persistence: NOT CLAIMED.
- Portal integration: NOT CLAIMED.
- Ops production readiness: NOT CLAIMED.
- Public game build: NOT CLAIMED.
- Production deployment: NOT CLAIMED.
- WEB-08-GAME-CONTRACT-SYNC-v1.0 remains blocked until accepted backend Auth/API/DB/RBAC/audit contract exists.

## Historical continuity markers

- LGO_WEB_PUBLIC_PLAYER_SAFETY_SUPPORT_FAQ_POLISH_READY_v1.14
- LGO_WEB_PUBLIC_ACCESSIBILITY_READABILITY_POLISH_READY_v1.15
- LGO_WEB_PUBLIC_FAQ_SEARCH_HELPFULNESS_POLISH_READY_v1.21
- LGO_WEB_PUBLIC_GAME_EXPERIENCE_BRAND_REALIGNMENT_READY_v1.22
- LGO_WEB_PUBLIC_GAME_VISUAL_ASSET_CTA_POLISH_SOURCE_READY_ENV_LIMITED_v1.23
- LGO_WEB_PUBLIC_APPROVED_ART_INGEST_VISUAL_REVIEW_SOURCE_READY_ENV_LIMITED_v1.24
- LGO_WEB_PUBLIC_CLASS_WORLD_STORY_DEPTH_RUNTIME_READY_VISUAL_ENV_LIMITED_v1.25

- LGO_WEB_PUBLIC_HOMEPAGE_DISCOVERY_MEDIA_STORYTELLING_RUNTIME_READY_VISUAL_ENV_LIMITED_v1.26
