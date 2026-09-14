# WEB-ACTIVE-GOAL

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
