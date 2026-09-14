# LGO WEB FE Download Trust Vietnamese Design Match Report v1.141

Task: WEB-FE-DOWNLOAD-TRUST-VIETNAMESE-DESIGN-MATCH-v1.141
Status: WEB_CLOSED
Page: Public Download Trust `/download/trust`

v1.141 replaced the stale English-heavy Public Download Trust target/copy with Vietnamese trust-gate language aligned to the Linh Giới game scenario. The implemented page now follows the target structure: hero → cổng kiểm tin tải game → six player-facing evidence gates → readiness/owner follow-up.

Changes:
- Public Download Trust target image refreshed in both public and docs design-reference locations.
- Public design target link label changed to `Thiết kế chi tiết tin cậy tải game`.
- `/download/trust` metadata, hero, CTA and first-flow copy changed to Vietnamese.
- `DownloadTrustGateBoard` now appears immediately after the hero before the “vì sao cần trang này” explanation.
- Trust fixtures now expose six Vietnamese game-release gates: Có gói build thật, SHA256 hiển thị cạnh link tải, Nguồn gốc đọc được bởi người chơi, Giới hạn đã biết đặt cạnh CTA, Kỳ vọng hỗ trợ đã sẵn sàng, Phê duyệt chủ sở hữu.
- CSS v1.141 removes the old overlap-prone readiness-first layout and keeps the trust gate in the opening flow.

Evidence browser/e2e screenshot:
- RED: Playwright desktop/mobile initially failed because the page still exposed `Download trust detailed design target`.
- GREEN: `tests/e2e/fe-download-trust-vietnamese-design-match-v1141.spec.ts` passed on chromium desktop/mobile.
- Screenshot review: desktop 1280x720 metrics after fix showed hero bottom 416.328px, trust gate top 421.922px, no horizontal overflow, h1 39.68px. The first fold now shows hero and trust gate cards instead of overlapping readiness cards.
- Visual review compared against the registered Public Download Trust design target and corrected the component order to match the target.

Validation to keep at closure:
- `python3 tools/validate_web_fe_download_trust_vietnamese_design_match_v1141.py`
- `LGO_WEB_SKIP_WEBSERVER=1 pnpm exec playwright test tests/e2e/fe-download-trust-design-target-density-v1126.spec.ts tests/e2e/fe-download-trust-vietnamese-design-match-v1141.spec.ts --project=chromium-desktop --project=chromium-mobile`
- `pnpm --filter @lgo-web/content test`
- `pnpm --filter @lgo-web/web typecheck`
- `pnpm --filter @lgo-web/web build`

Process rules retained: Sequential Page Completion, Just-in-time Design, Design Target First, Layout Match Before Closure, Base UI/UX Layout.

Non-claims: No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, NO_ACCEPTED_BACKEND_CONTRACT.
