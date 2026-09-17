# HANDOFF — WEB-FE-RELEASE-READINESS-VISUAL-REALIGNMENT-v1.274

`/release/readiness` đã được realign theo Public Release Readiness target v1.128 và shared public/release chrome đã chấp nhận. Page dùng immersive full-width hero với hai artwork sạch, live readiness console, đúng bốn `ownerReleaseGates` canonical, tester guidance và ba tuyến thật `/download/trust`, `/status`, `/support/safety`. Không bịa gate thứ năm, phần trăm readiness, public binary, tester entitlement hay backend state.

Browser evidence đã được review trên exact source commit `fed86b406e673243d0ebcb56442df8bb8005dbc0`: focused v1.274 12/12 PASS, active v1.221 10/10 PASS, selected dev 96/96 PASS, production 96/96 PASS, build63. Production desktop/mobile AFTER không có dev badge; clean archive `WEB CURRENT STATE` PASS.

Một lỗi mobile thực đã được phát hiện bằng browser review: CSS grid auto-track tạo hero >1000px nhưng bị shell clip, làm CTA trông như thanh trống. v1.274 thêm RED `heroWidth <= viewportWidth` và fix nguồn bằng `minmax(0,1fr)`/`min-width:0`; không che lỗi bằng overflow clipping. Mobile owner cards dùng horizontal rail để giữ đầy đủ evidence mà không kéo page quá dài.

Historical readiness board/density/layout guards v1.171/v1.128/v1.143/v1.201 được supersede bởi v1.274 và không tính runtime PASS. v1.221 vẫn active và được cập nhật để kiểm cả hai hero image, keyboard evidence disclosures, axe semantics và safe routes.

Non-claims: không có public build, open beta, launcher, account entitlement, production auth/backend, secure tester intake, SLA hoặc deployment. `NO_ACCEPTED_BACKEND_CONTRACT` vẫn là ranh giới.

Next: `/release/tester-pack` — `WEB-FE-RELEASE-TESTER-PACK-VISUAL-REALIGNMENT-v1.275`. Dùng registered Public Tester Pack target v1.129; không batch `/status` hoặc route sau vào v1.275.
