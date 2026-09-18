import { communityFeedbackChannels, communityOnboardingPaths, roadmapDecisionGates, stagedReleaseMessages } from "@lgo-web/content";
import { ExperienceHero, FieldManual, LinkButton, QuestionDisclosureList, ReadingJourney, ReleaseIcon, SectionHeading } from "@lgo-web/ui";
import type { ReadingJourneyStep } from "@lgo-web/ui";

const readingSteps: readonly ReadingJourneyStep[] = [
  { id:"start", title:"Bắt đầu hành trình", summary:"Biết nên xem gì trước khi tìm bản tải hay quyền thử nghiệm.", detail:"Mở hướng dẫn bắt đầu để xem lộ trình dành cho người chơi mới và những phần có thể khám phá ngay trên website. Đây là hướng dẫn đọc, không phải tài khoản hay phiên chơi trực tuyến.", href:"/start", action:"Mở hướng dẫn bắt đầu" },
  { id:"game", title:"Khám phá cách chơi", summary:"Hiểu thế giới, nhịp khám phá và vòng lặp đang được giới thiệu.", detail:"Đọc phần Thế giới để hiểu bối cảnh, lớp nhân vật và nhịp chơi đang được mô tả công khai. Nội dung hiện là hướng dẫn sản phẩm, không phải gameplay live hay máy chủ đang mở.", href:"/game", action:"Khám phá cách chơi" },
  { id:"community", title:"Về quảng trường", summary:"Đọc nguyên tắc chung và chuẩn bị phản hồi an toàn.", detail:"Dùng trang cộng đồng làm điểm gom quy tắc ứng xử, phản hồi an toàn và hướng dẫn tham gia. Hiện chưa có trò chuyện, diễn đàn, bang hội hoặc danh sách chờ công khai.", href:"/community", action:"Về cộng đồng" }
];

export function PublicOnboardingHero() {
  return <ExperienceHero className="lgo-release-hero lgo-release-frame" copyClassName="lgo-release-hero-copy"
    badge="Linh Giới Online · Chào người bạn mới" badgeTone="gold" kicker="Khám phá thế giới · Hiểu cách chơi · Gặp cộng đồng"
    title="Hòa nhập cộng đồng Linh Giới"
    lead="Đi qua ba điểm dành cho người mới: bắt đầu hành trình, khám phá cách chơi rồi ghé quảng trường cộng đồng. Không cần nhập tài khoản hay thông tin riêng tư."
    actions={[{href:"#onboarding-reading",label:"Bắt đầu ba bước",tone:"gold"},{href:"/community",label:"Về cộng đồng",tone:"neutral"}]}
    detail={<p className="lgo-release-art-note">Minh họa thế giới · Không phải gameplay trực tuyến</p>}
    visual={<><img className="lgo-release-hero-art" src="/game-art/world/dong-mon-skyline.webp" width="1360" height="765" alt="" fetchPriority="high"/>
      <FieldManual title="Cùng hòa nhập" quote="Hiểu nhau từ những bước đầu" steps={["Bắt đầu hành trình","Khám phá cách chơi","Cùng xây dựng"]}/>
    </>}/>;
}
export function PublicOnboardingReading() {
  return <section id="onboarding-reading" aria-labelledby="onboarding-reading-heading">
    <div className="lgo-release-section-heading"><SectionHeading headingId="onboarding-reading-heading" eyebrow="Ba bước dành cho người mới" title="Từ thế giới đến cộng đồng"/><p>Chọn bước bất kỳ hoặc dùng Bước trước / Bước tiếp.<br/>Đây là vị trí đang đọc, không phải tiến trình xét duyệt.</p></div>
    <ReadingJourney steps={readingSteps} label="Ba bước hòa nhập cộng đồng"
      boundary="Vị trí đang đọc chỉ tồn tại trên trang này. Không đăng ký, không cấp quyền thử nghiệm và không gửi dữ liệu."/>
  </section>;
}
export function PublicOnboardingAudiences() {
  return <div className="lgo-release-reading-grid lgo-release-reading-grid-even">
    <section id="onboarding-audiences" className="lgo-release-reading-panel lgo-release-frame" aria-labelledby="onboarding-audiences-heading">
      <SectionHeading headingId="onboarding-audiences-heading" eyebrow="Chọn đường phù hợp với bạn" title="Bạn đến Linh Giới để..."/>
      <QuestionDisclosureList items={communityOnboardingPaths.map(item=>({id:`onboarding-${item.id}`,question:item.title,answer:<><p><strong>Dành cho:</strong> {item.audience}</p><p>{item.firstAction}</p><p>{item.expectedUnderstanding}</p><small>{item.blockedExpectation}</small></>}))}/>
    </section>
    <aside id="onboarding-boundary" className="lgo-release-paper-panel lgo-release-frame" aria-labelledby="onboarding-boundary-heading">
      <ReleaseIcon name="lock"/><SectionHeading headingId="onboarding-boundary-heading" eyebrow="Kỳ vọng rõ để cùng tin tưởng" title="Chưa có danh sách chờ"/>
      <p>Chưa mở đăng nhập thật, phiếu hỗ trợ hoặc đăng ký thử nghiệm trên trang này. Xem đủ ba bước không tạo tài khoản, không giữ chỗ và không xác nhận quyền chơi.</p>
      <div className="lgo-release-paper-notice"><ReleaseIcon name="shield"/><div><strong>Giữ riêng thông tin cá nhân</strong><p>Không gửi mật khẩu, token, dữ liệu thanh toán hoặc ảnh/log chưa che thông tin.</p></div></div>
      <div className="lgo-hero-actions"><LinkButton href="/release/tester-pack" tone="neutral">Đọc gói chuẩn bị tester</LinkButton><LinkButton href="/support/safety" tone="neutral">Phản hồi an toàn</LinkButton></div>
      <p className="lgo-onboarding-contract-note">NO_ACCEPTED_BACKEND_CONTRACT</p>
    </aside>
  </div>;
}
export function PublicOnboardingScopeNotes() {
  const notes = communityFeedbackChannels.map((item,index)=>({id:`onboarding-channel-${index}`,question:item.channel,answer:<><p>{item.whatToShare}</p><p>{item.whatNotToShare}</p><p>{item.nextGate}</p></>}));
  return <details className="lgo-release-more-evidence"><summary>Phạm vi phản hồi và điều kiện mở dần <span aria-hidden="true">+</span></summary>
    <QuestionDisclosureList items={notes}/>
    <p className="lgo-reading-journey-boundary">Cổng lộ trình và thông điệp phát hành vẫn nằm trong source; đọc chi tiết tại trang lộ trình. Có {roadmapDecisionGates.length} cổng đối chiếu và {stagedReleaseMessages.length} thông điệp theo giai đoạn, không phải số tính năng đã mở.</p>
    <LinkButton href="/roadmap" tone="neutral">Đọc điều kiện trong lộ trình</LinkButton>
  </details>;
}
