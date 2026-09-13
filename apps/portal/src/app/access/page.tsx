import { CaseSummary, CaseSummaryItem, DataList, DataListItem, LinkButton, WorkspacePage } from "@lgo-web/ui";
import { NOT_CANONICAL_BACKEND_CONTRACT, PROVISIONAL_WEB_FIXTURE } from "../../lib/portal-fixtures";

export default function AccessPage() {
  return (
    <WorkspacePage mainClassName="lgo-portal-shell" badge={`${PROVISIONAL_WEB_FIXTURE} · ${NOT_CANONICAL_BACKEND_CONTRACT}`}
      title="Trạng thái truy cập" description="Bạn đang khám phá bản mẫu Player Portal. Việc mở trang không đồng nghĩa đã đăng nhập."
      boundaryBadge="Trạng thái bản mẫu"
      boundary="Đăng nhập, đăng ký và khôi phục chưa mở. Không thu thông tin cá nhân, không tạo tài khoản hoặc phiên đăng nhập."
      actions={[{ href: "/", label: "Khám phá Portal mẫu", tone: "spirit" }]}>
      <CaseSummary title="Chưa có quyền truy cập thật" state="Bản mẫu" summary="Khi hệ thống tài khoản chính thức sẵn sàng, hướng dẫn đăng nhập và xác minh sẽ xuất hiện tại đây.">
        <CaseSummaryItem label="Đăng nhập" value="Chưa khả dụng" />
        <CaseSummaryItem label="Tạo tài khoản" value="Chưa khả dụng" />
        <CaseSummaryItem label="Khôi phục" value="Chưa gửi email hoặc mã" />
      </CaseSummary>
      <DataList aria-label="Khám phá sau truy cập">
        <DataListItem title="Tài khoản mẫu" description="Xem cách thông tin tài khoản, bảo mật và thiết bị được trình bày." trailing={<LinkButton href="/account">Xem tài khoản mẫu</LinkButton>} />
        <DataListItem title="Nhân vật mẫu" description="Khám phá danh sách và hồ sơ nhân vật minh họa." trailing={<LinkButton href="/characters">Xem nhân vật mẫu</LinkButton>} />
        <DataListItem title="Cần trợ giúp?" description="Xem hướng dẫn hỗ trợ và khôi phục truy cập." trailing={<LinkButton href="/support">Hướng dẫn hỗ trợ</LinkButton>} />
      </DataList>
    </WorkspacePage>
  );
}
