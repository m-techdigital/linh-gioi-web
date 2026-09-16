# WEB-ACTIVE-GOAL

## Owner override — full public-page visual remediation (2026-09-17)

A full browser audit found 27 concrete public routes and16 page-specific visual targets. Do not infer visual completion from historical validators/tests. Process one page at a time using the existing target, real browser screenshots and shared Base First owners. Current order: `/story`, `/classes`, `/journey`, `/start`, then service and support/community families. The old `/news` queue is historical, not active authority.

## Owner priority override — homepage first (2026-09-17)

Restart the visual pass at `/` from the existing detailed homepage design. Remaining news articles are deferred. Earlier homepage/entry-page CLOSED markers and passing tests are historical engineering evidence, not current visual acceptance. Compare actual desktop/mobile rendering against the page-specific design before claiming completion; do not replace the design with a simpler target that matches old code. Reuse source and shared components, preserve runtime/branch/worktree. After homepage review, continue main entry pages sequentially, not the old news queue.


## Owner delivery policy — commit and push authorized

The owner's latest instruction is “hãy commit push rồi sau đó làm tiếp”. This supersedes the prior no-push waiver. Commit reviewed source/test/docs and push normally to origin/main; never force-push or include local handoff ZIPs/cache/secrets. Verify remote HEAD, complete the ZIP/SHA256 handoff, then continue the next single page without another confirmation. This authorizes repository delivery, not production deployment.

Mục tiêu bắt buộc cho LinhGioiOnline-Web:

Hoàn thiện FE theo từng page một cách tuần tự, ưu tiên UI/UX Layout thật trong browser và Base First. Không được quay lại quy trình cũ “Design Target First” theo nghĩa sa đà tạo/sửa design, sửa tiếng Anh, sửa text hoặc chạy validator thay cho hoàn thiện layout thật.

## Luật xử lý bắt buộc

1. Chỉ xử lý đúng 1 page hiện tại theo WEB-NEXT-ACTION.
   Không chuyển page khác khi page hiện tại chưa đóng bằng browser/e2e/screenshot/validator/build và commit + push.

2. Ưu tiên số 1 là Real UI/UX Layout trong browser.
   Mọi thay đổi phải hướng đến page thật đang render: bố cục, spacing, typography, density, responsive, first-fold, visual hierarchy, interaction/focus/accessibility.

3. Design target chỉ là mốc đối chiếu tối thiểu.
   Nếu page đã có design đủ dùng thì dùng ngay và sửa layout thật.
   Nếu chưa có hoặc design sai nghiêm trọng, chỉ tạo/sửa design vừa đủ cho phần đang làm, bằng tiếng Việt, đúng kịch bản game, rồi quay lại browser layout ngay.
   Không batch design, không redesign lan man, không sửa tiếng Anh/text/design-only rồi coi là tiến độ chính. Nếu design target không đồng bộ UI/UX Layout chung như header, footer, menu, shell hoặc navigation đã được chấp nhận, phải sửa/supersede design đó vừa đủ cho page hiện tại để đồng bộ trước khi đối chiếu, rồi quay lại browser layout ngay.

4. Base First là luật chặn bắt buộc.
   Trước khi thêm layout/component/CSS page-local, phải kiểm tra pattern tương tự trong page siblings, packages/ui và packages/design-tokens.
   Nếu layout, card, hero, board, CTA, form, table, route map, typography rhythm, responsive density, focus state hoặc CSS block có thể tái sử dụng, phải tách hoặc mở rộng base trước.
   Không được tự build riêng gây trùng lặp code.

5. CSS phải đúng owner.
   Theme/tokens ở packages/design-tokens.
   Reusable component/layout style ở packages/ui.
   App/page chỉ compose base và thêm khác biệt thật sự riêng cho route.
   Không làm phình apps/web/src/app/globals.css bằng các block lặp lại.

6. Một page chỉ được đóng khi có đủ bằng chứng:

   - Render thật trong browser.
   - E2E hoặc browser metrics cho desktop/mobile.
   - Screenshot/visual review so với design target.
   - Source validator liên quan.
   - Typecheck/build cần thiết.
   - Docs/state/ledger/handoff cập nhật.
   - Commit + push.

7. Không được dùng các việc sau để thay thế hoàn thiện UI/UX Layout:

   - sửa text/copy;
   - dịch tiếng Anh sang tiếng Việt;
   - tạo thêm design;
   - chỉnh validator;
   - cập nhật docs;
   - sửa content nhưng không kiểm browser;
   - làm nhiều page cùng lúc.

8. Nếu phát hiện bản thân đang quay lại cách cũ, phải dừng ngay và tự sửa hướng:

   - quay về page hiện tại;
   - mở browser kiểm layout thật;
   - kiểm tra Base First;
   - sửa shared base nếu có pattern lặp;
   - tiếp tục page thật cho đến khi đóng.

Page hiện tại phải theo repo WEB-NEXT-ACTION. Không dùng goal cũ nhắc /game hoặc “Design Target First” làm nguồn điều hướng nữa.

## Runtime Layout Gate — chống quay lại quy trình cũ

Đối với mọi task FE/UI, bằng chứng chính phải là trang thật trong browser. Trước khi validator/docs/handoff/commit được xem là hợp lệ, task phải có screenshot desktop/mobile mới và browser metrics/e2e chứng minh layout thật đã thay đổi theo mục tiêu page hiện tại. Nếu thay đổi chính của task chỉ là design, dịch text, sửa copy, sửa validator, cập nhật docs hoặc nới test mà không có layout thật được xem lại trong browser, task đó là sai quy trình và phải quay lại page hiện tại ngay.

Không được dùng validator/docs như tiến độ chính. Validator chỉ được chạy sau khi screenshot/browser layout đã được kiểm bằng mắt và đạt nhịp UI/UX chấp nhận được. Nếu screenshot cho thấy page vẫn thô, một màu, quá dài, spacing/font/density xấu hoặc design reference/internal tooling lấn nội dung public, phải tiếp tục sửa layout thật tại shared Base owner trước.
