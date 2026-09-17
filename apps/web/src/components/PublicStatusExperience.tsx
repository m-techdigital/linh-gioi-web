import { localContentRepository, statusTrustSurfaces, statusExplainers } from "@lgo-web/content";
import { ExperienceHero, VisibilitySignal, VisibilityCatalog, ReleaseIcon, SectionHeading } from "@lgo-web/ui";
import type { VisibilityCatalogItem } from "@lgo-web/ui";

const surfaces: readonly VisibilityCatalogItem[] = statusTrustSurfaces.map((item,index) => ({ id:`surface-${index}`,title:item.surface,visibility:item.visibility,summary:item.currentTruth,evidence:item.sourceOfTruth,boundary:item.forbiddenClaim }));

export function PublicStatusHero() {
  return <ExperienceHero className="lgo-release-hero lgo-release-frame lgo-status-hero" copyClassName="lgo-release-hero-copy"
    badge="Linh Giới Online · Minh bạch trạng thái" badgeTone="gold" kicker="Minh bạch hôm nay. Vững bền ngày mai."
    title="Trạng thái công khai"
    lead="Hiểu nội dung nào đang hiển thị, hạng mục nào nội bộ hoặc còn tạm khóa. Màu tín hiệu mô tả phạm vi nội dung, không phải sức khỏe máy chủ game."
    actions={[{href:"#status-surfaces",label:"Xem các hạng mục",tone:"gold"},{href:"/release/readiness",label:"Kiểm tra cổng duyệt",tone:"neutral"}]}
    detail={<>
      <div className="lgo-status-no-live"><ReleaseIcon name="shield"/><div><strong>Không có dữ liệu giám sát trực tiếp</strong><p>Không hiển thị uptime, người chơi online hoặc lịch sự cố live. Chưa thể kết luận tình trạng vận hành từ trang này.</p></div></div>
      <p className="lgo-release-art-note">Nội dung tĩnh trong source · Minh họa thế giới, không phải gameplay</p>
    </>}
    visual={<>
      <img className="lgo-release-hero-art" src="/game-art/world/dong-mon-skyline.webp" width="1360" height="765" alt="" fetchPriority="high"/>
      <img className="lgo-status-traveler" src="/game-art/marketing/hero-traveler.png" width="344" height="348" alt="" fetchPriority="high"/>
      <section className="lgo-visibility-console lgo-release-frame" aria-labelledby="status-signals-heading">
        <div className="lgo-visibility-console-heading"><h2 id="status-signals-heading">Tín hiệu hiển thị</h2><p>Phạm vi nội dung · không phải uptime</p></div>
        <div className="lgo-visibility-signals">
          <VisibilitySignal visibility="public" label="Công khai" description="Nội dung có thể đọc trên website"/>
          <VisibilitySignal visibility="internal" label="Nội bộ" description="Bằng chứng phát triển, không phải dịch vụ live"/>
          <VisibilitySignal visibility="blocked" label="Tạm khóa" description="Chưa đủ điều kiện mở tính năng thật"/>
        </div>
        <small>NO_ACCEPTED_BACKEND_CONTRACT · Không kết nối máy chủ giám sát</small>
      </section>
    </>}/>;
}
export function PublicStatusSurfaces() {
  return <section id="status-surfaces" className="lgo-status-surfaces" aria-labelledby="status-surfaces-heading">
    <div className="lgo-release-section-heading"><SectionHeading headingId="status-surfaces-heading" eyebrow="Nội dung hiện tại trong source" title="Phạm vi từng hạng mục"/><p>Lọc cách hiển thị để đọc đúng giới hạn.<br/>Các hạng mục không phải kết quả kiểm tra máy chủ.</p></div>
    <VisibilityCatalog items={surfaces} label="Lọc phạm vi hiển thị"/>
  </section>;
}
export function PublicStatusTrustAndMaintenance() {
  const entries=localContentRepository.list("maintenance");
  return <div className="lgo-status-trust-grid lgo-release-reading-grid lgo-release-reading-grid-even">
    <section className="lgo-release-reading-panel lgo-release-frame" aria-labelledby="status-trust-heading">
      <SectionHeading headingId="status-trust-heading" eyebrow="Giới hạn tạo nên sự tin cậy" title="Cam kết minh bạch"/>
      <div className="lgo-status-commitments">
        <div><ReleaseIcon name="document"/><div><strong>Nội dung từ source</strong><span>Thông tin được ghi rõ trong kho mã, không tự cập nhật theo máy chủ.</span></div></div>
        <div><ReleaseIcon name="lock"/><div><strong>Không có CMS</strong><span>Không có hệ quản trị nội dung hoặc kênh cập nhật trực tiếp.</span></div></div>
        <div><ReleaseIcon name="shield"/><div><strong>Chưa có backend được duyệt</strong><span>Không cấp quyền tài khoản hoặc mở tải game từ trạng thái này.</span></div></div>
        <div><ReleaseIcon name="signal"/><div><strong>Không giám sát vận hành</strong><span>Kiểm thử giao diện không thay thế dữ liệu sức khỏe dịch vụ.</span></div></div>
      </div>
      <details className="lgo-release-template-tips"><summary>Đọc cách hiểu các bề mặt <span aria-hidden="true">+</span></summary><dl>{statusExplainers.map(item=><div key={item.label}><dt>{item.label}</dt><dd>{item.detail}</dd></div>)}</dl></details>
    </section>
    <section className="lgo-status-maintenance lgo-release-reading-panel lgo-release-frame" aria-labelledby="status-maintenance-heading">
      <SectionHeading headingId="status-maintenance-heading" eyebrow="Ghi chú từ nội dung mẫu" title="Thông tin bảo trì"/>
      <p>Không phải lịch bảo trì hoặc sự cố đang diễn ra. Chưa kết nối nguồn lịch sử vận hành; thiếu dữ liệu không đồng nghĩa không có sự cố.</p>
      {entries.map(entry=><article key={entry.slug}><span>Fixture local · Không phải thông báo live</span><h3>{entry.title}</h3><p>{entry.summary}</p></article>)}
      {entries.length===0?<p>Chưa có ghi chú mẫu để hiển thị.</p>:null}
    </section>
  </div>;
}
export function PublicStatusNextSteps() {
  return <nav className="lgo-release-shortcuts lgo-release-shortcuts-three" aria-label="Đọc tiếp để hiểu mức sẵn sàng">
    <a href="/release/readiness" aria-label="Điều kiện phát hành"><ReleaseIcon name="shield"/><strong>Điều kiện phát hành</strong><span>Các cổng cần có bằng chứng trước khi mở tải.</span><small>Đọc cổng duyệt →</small></a>
    <a href="/release/tester-pack"><ReleaseIcon name="users"/><strong>Gói tester cộng đồng</strong><span>Chuẩn bị phản hồi an toàn, chưa mở intake.</span><small>Xem hướng dẫn →</small></a>
    <a href="/support/safety" aria-label="Hỗ trợ an toàn"><ReleaseIcon name="help"/><strong>Hỗ trợ an toàn</strong><span>Ghi nhận vấn đề mà không lộ dữ liệu riêng tư.</span><small>Đọc hướng dẫn →</small></a>
  </nav>;
}
