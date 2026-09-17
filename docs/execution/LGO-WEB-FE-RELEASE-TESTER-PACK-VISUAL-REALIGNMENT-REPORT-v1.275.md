# LGO-WEB-FE-RELEASE-TESTER-PACK-VISUAL-REALIGNMENT-REPORT-v1.275

Status: WEB_CLOSED. `/release/tester-pack` đã được realign theo Public Tester Pack detailed target v1.129 và shared public/release chrome đã chấp nhận.

## Vì sao cần realign

Browser BEFORE cho thấy page v1.222/v1.144 vẫn là một trang hướng dẫn kỹ thuật dài: hero bị đóng trong khung, checklist/device/limitations kéo page rất sâu và nhịp chính chưa giống target cinematic. Target v1.129 yêu cầu hero cộng đồng + cẩm nang, năm shortcut, phản hồi an toàn và mẫu feedback ở first-flow.

## Runtime mới

`/release/tester-pack` dùng `WebAppShell variant="immersive"` và owner `.lgo-tester-pack-landing`. Hero dùng artwork dự án sạch `discovery-world.png` + `hero-traveler.png`, giữ live `FieldManual`; không render design board vào runtime.

Năm shortcut vẫn giữ đúng thứ tự và tuyến thật. `Phản hồi an toàn` + `Mẫu phản hồi` trở thành primary flow. Checklist chuẩn bị, báo cáo thiết bị và giới hạn đã biết vẫn giữ đầy đủ nhưng nằm trong một native secondary disclosure để giảm chiều dài mà không mất nội dung hay keyboard reachability.

Các ranh giới trung thực vẫn nguyên vẹn: `Chưa mở intake`, `Không hứa slot`, `NO_ACCEPTED_BACKEND_CONTRACT`; không có form/email/password/file input, download binary hoặc cơ chế tự cấp quyền tester.

## RED → GREEN và reliability

RED gốc được ghi trước source WIP: 12 fail / 2 pass trên 14 focused cases. Sau realignment, focused desktop/mobile đạt 14/14 PASS. Browser review phát hiện lead 320px chỉ 13.6px; CSS owner được sửa bằng selector đúng specificity, không hạ test threshold.
Trên production, một race riêng của test readiness làm summary đôi lúc mất focus và hero bbox tạm bằng 0 dù independent probe cho thấy UI đã render đúng. Test được siết bằng `networkidle`, `document.fonts.ready` và positive layout bounds trước assertion; không bỏ hoặc nới assertion. Production stability sau fix: 28/28 PASS, và current-authority production matrix: 110/110 PASS.

## Fresh verification

- Source commit: `b2f8b5aa9a48505899c467002a030081734fb591`, push thường và `origin/main` trùng HEAD tại source-delivery gate.
- Focused v1.275: 14/14 PASS; production readiness stability: 28/28 PASS.
- Selected dev matrix: 110/110 PASS; selected production matrix: 110/110 PASS.
- Production build: 63/63 static pages; `/release/tester-pack` prerendered.
- v1.275, v1.274 và v1.273 source validators PASS; UI/Web typecheck, Web lint và `git diff --check` PASS.
- Production AFTER desktop/mobile được review trực tiếp: không dev badge, không horizontal overflow; hero/5 shortcut/primary feedback/disclosure đều đúng nhịp target.

Historical tester-pack runtime guards v1.144/v1.20 khóa implementation cũ và được supersede bởi v1.275; chúng không được coi là runtime PASS và không được dùng để kéo UI quay về proof-board/English marker cũ. Target v1.129 vẫn là visual authority.

## Non-claims và next

Đây vẫn là public informational FE. Không có public game binary, open beta, launcher, entitlement, production auth/backend, secure tester intake, SLA, DB persistence hay production deployment. `NO_ACCEPTED_BACKEND_CONTRACT` vẫn là ranh giới.

Task kế tiếp chỉ được đăng ký queue: `/status` — `WEB-FE-STATUS-VISUAL-REALIGNMENT-v1.276`. Không triển khai `/status` trong closure v1.275.
