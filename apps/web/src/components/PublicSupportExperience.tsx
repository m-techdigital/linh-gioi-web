import { playerSupportExpectations, supportFaqs } from "@lgo-web/content";
import { ExperienceHero, GuidanceStation, GuidanceTopicGrid, LinkButton, QuestionDisclosureList, ReleaseIcon, SectionHeading } from "@lgo-web/ui";
import type { GuidanceTopic } from "@lgo-web/ui";

// Route content stays in the app; reusable presentation belongs to packages/ui.
const topics: readonly GuidanceTopic[] = [
  { id:"download",title:"Tải game",icon:"download",hint:"Điều kiện mở tải",description:"Kiểm tra bản tải, nguồn gốc và checksum. Hiện chưa có gói tải công khai được duyệt.",href:"/download/trust",action:"Kiểm tra bản tải" },
  { id:"account",title:"Tài khoản",icon:"users",hint:"Hiểu đúng giới hạn",description:"Tài khoản và nhân vật thật còn chờ backend. Website chưa tra cứu hay khôi phục tài khoản.",href:"/support/help",action:"Đọc hướng dẫn" },
  { id:"report",title:"Báo lỗi an toàn",icon:"document",hint:"Chuẩn bị phản hồi",description:"Ghi thiết bị, bước tái hiện và điều đã xảy ra. Chỉ chuẩn bị nội dung, chưa gửi ticket.",href:"/release/tester-pack#tester-feedback",action:"Xem mẫu báo lỗi" },
  { id:"privacy",title:"An toàn dữ liệu",icon:"shield",hint:"Giữ riêng thông tin",description:"Bảo vệ mật khẩu, token và dữ liệu cá nhân. Che thông tin riêng tư trong ảnh hoặc log.",href:"/support/safety",action:"Đọc cách bảo vệ" }
];

export function PublicSupportHero() {
  return <ExperienceHero className="lgo-release-hero lgo-release-frame lgo-guidance-hero" copyClassName="lgo-release-hero-copy"
    badge="Linh Giới Online · Đồng hành cùng bạn" badgeTone="gold" kicker="Gặp nhau. Giúp nhau. Cùng mạnh hơn."
    title="Hỗ trợ cộng đồng" lead="Mỗi thắc mắc, sự cố và góp ý đều quan trọng. Chọn đúng hướng dẫn để hiểu trạng thái hiện tại và chuẩn bị phản hồi an toàn."
    actions={[{href:"#support-faq",label:"FAQ nhanh",tone:"gold"},{href:"/support/safety",label:"Hướng dẫn an toàn",tone:"neutral"}]}
    detail={<><div className="lgo-guidance-hero-boundary"><ReleaseIcon name="shield"/><p>Hướng dẫn trước, dữ liệu riêng tư giữ lại.<br/><strong>Chưa có ticket hoặc hỗ trợ tài khoản trực tiếp.</strong></p></div><p className="lgo-release-art-note">Minh họa thế giới · Không phải ảnh gameplay</p></>}
    visual={<><img className="lgo-release-hero-art" src="/game-art/world/dong-mon-skyline.webp" width="1360" height="765" alt="" fetchPriority="high"/>
      <GuidanceStation headingId="support-station-heading" title="Trạm hỗ trợ người chơi" description="Bạn đang cần tìm hướng dẫn nào?" topics={topics} note="Cộng đồng vững mạnh · Linh Giới trường tồn"/>
    </>}/>;
}

export function PublicSupportTopics() {
  return <section aria-labelledby="support-topics-heading" className="lgo-guidance-topics">
    <SectionHeading headingId="support-topics-heading" eyebrow="Chọn đúng nơi để bắt đầu" title="Bạn cần hỗ trợ gì?"/>
    <GuidanceTopicGrid topics={topics}/>
  </section>;
}

export function PublicSupportAnswers() {
  return <div className="lgo-release-reading-grid lgo-release-reading-grid-even lgo-guidance-reading-grid">
    <section id="support-faq" className="lgo-release-reading-panel lgo-release-frame" aria-labelledby="support-faq-heading">
      <div className="lgo-guidance-faq-heading"><ReleaseIcon name="help"/><SectionHeading headingId="support-faq-heading" eyebrow="Giải đáp trước khi đi tiếp" title="Câu hỏi thường gặp"/></div>
      <QuestionDisclosureList items={supportFaqs.map((faq,index)=>({id:`support-faq-${index+1}`,question:faq.question,answer:<p>{faq.answer}</p>}))}/>
      <LinkButton href="/support/help" tone="neutral">Xem trung tâm trợ giúp <ReleaseIcon name="arrow"/></LinkButton>
    </section>
    <aside id="support-boundary" className="lgo-guidance-boundary-stack" aria-labelledby="support-boundary-heading">
      <div className="lgo-release-paper-panel lgo-release-frame">
        <ReleaseIcon name="document"/><SectionHeading headingId="support-boundary-heading" eyebrow="Minh bạch để tin cậy" title="Không có hệ thống ticket thật"/>
        <p>Trang này chỉ cung cấp thông tin và hướng dẫn. Chưa có kênh tiếp nhận trực tuyến, tra cứu hoặc khôi phục tài khoản.</p>
        <div className="lgo-release-paper-notice"><ReleaseIcon name="lock"/><div><strong>Không gửi thông tin nhạy cảm</strong><p>Giữ riêng mật khẩu, token và dữ liệu cá nhân. Không gửi log thô hoặc ảnh chưa che thông tin.</p></div></div>
      </div>
      <div className="lgo-release-reading-panel lgo-release-frame">
        <SectionHeading headingId="support-scope-heading" eyebrow="Hướng dẫn đúng phạm vi" title="Điều bạn có thể làm hôm nay"/>
        <ul className="lgo-release-checklist lgo-guidance-boundaries">
          <li><ReleaseIcon name="download"/><span>Kiểm tra điều kiện tải game và bản phát hành.</span></li>
          <li><ReleaseIcon name="document"/><span>Chuẩn bị phản hồi, chưa gửi yêu cầu hỗ trợ.</span></li>
          <li><ReleaseIcon name="shield"/><span>Chỉ dùng kênh chính thức khi được công bố.</span></li>
        </ul>
        <LinkButton href="/status" tone="neutral">Đọc trạng thái hiện tại <ReleaseIcon name="arrow"/></LinkButton>
        <p className="lgo-reading-tools-note">NO_ACCEPTED_BACKEND_CONTRACT</p>
      </div>
    </aside>
  </div>;
}

export function PublicSupportScope() {
  return <details className="lgo-release-more-evidence">
    <summary>Phạm vi hỗ trợ theo từng nhóm <span aria-hidden="true">+</span></summary>
    <dl className="lgo-guidance-scope-list">{playerSupportExpectations.map(item=><div key={item.topic}><dt>{item.topic}</dt><dd><p><strong>Hiện tại:</strong> {item.expectedNow}</p><p><strong>Chưa có:</strong> {item.notAvailable}</p><p>{item.safeNextStep}</p></dd></div>)}</dl>
  </details>;
}
