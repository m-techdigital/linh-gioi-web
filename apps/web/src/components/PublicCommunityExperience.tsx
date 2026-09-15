import { communityConductRules, communityFeedbackChannels, communityPrinciples, communityReadinessSteps } from "@lgo-web/content";
import { ExperienceHero, LinkButton, MediaFrame, PrincipleMedallions, QuestionDisclosureList, ReleaseIcon, SectionHeading } from "@lgo-web/ui";

const plazaScreenshots = [
  {src:"/game-art/community/linh-thanh-plaza-npc-preview.png",alt:"Ảnh quảng trường Linh Thành với nhân vật hướng dẫn",title:"NPC và bảng hướng dẫn ở Linh Thành",caption:"Khung hình prototype với NPC và tương tác cục bộ. Đây không phải máy chủ cộng đồng đang hoạt động."},
  {src:"/game-art/community/linh-thanh-plaza-target-selector.png",alt:"Ảnh chọn mục tiêu trong quảng trường Linh Thành",title:"Chọn mục tiêu trong khu quảng trường",caption:"Ảnh runtime minh họa chọn mục tiêu trong bản dựng. Chưa mở chat, diễn đàn, bang hội hoặc danh sách bạn bè."}
] as const;

export function PublicCommunityHero() {
  return <ExperienceHero className="lgo-release-hero lgo-release-frame lgo-community-hero" copyClassName="lgo-release-hero-copy"
    badge="Linh Giới Online · Cộng đồng" badgeTone="gold" kicker="Cộng đồng bền lâu · Cùng trưởng thành"
    title="Cộng đồng Linh Giới" lead="Một nơi để hiểu nhau, giúp người mới và chuẩn bị những phản hồi có ích. Cùng xây dựng không gian Linh Giới bằng sự tôn trọng và kỳ vọng rõ ràng."
    actions={[{href:"/community/onboarding",label:"Hòa nhập cộng đồng",tone:"gold"},{href:"#community-runtime-gallery",label:"Xem khung hình prototype",tone:"neutral"}]}
    detail={<><p className="lgo-community-hero-boundary"><ReleaseIcon name="users"/><span>Chưa có trò chuyện, diễn đàn hoặc bang hội.<br/>Website hiện là hướng dẫn, không phải mạng cộng đồng live.</span></p><p className="lgo-release-art-note">Minh họa định hướng thế giới · Không phải gameplay trực tuyến</p></>}
    visual={<><img className="lgo-release-hero-art" src="/game-art/world/dong-mon-skyline.webp" width="1360" height="765" alt="" fetchPriority="high"/>
      <figure className="lgo-community-vista lgo-release-frame">
        <h2>Quảng trường Linh Thành</h2>
        <img src="/game-art/world/dong-mon-skyline.webp" width="1360" height="765" alt="Minh họa kiến trúc và cảnh quan Linh Giới"/>
        <figcaption><span>Gặp gỡ · Kết nối · Cùng trưởng thành</span><small>Hình định hướng, không phải bằng chứng dịch vụ live.</small><LinkButton href="/status" tone="neutral">Đọc trạng thái <ReleaseIcon name="arrow"/></LinkButton></figcaption>
      </figure></>}/>;
}
export function PublicCommunityPanels() {
  return <div className="lgo-community-columns">
    <section className="lgo-release-paper-panel lgo-release-frame" aria-labelledby="community-start-heading">
      <ReleaseIcon name="users"/><SectionHeading headingId="community-start-heading" eyebrow="Bắt đầu từ kỳ vọng đúng" title="Hòa nhập cộng đồng"/>
      <p>Đọc trạng thái trước lời mời. Chuẩn bị thông tin trước khi có kênh thử nghiệm được duyệt.</p>
      <nav className="lgo-community-start-routes" aria-label="Bắt đầu cùng cộng đồng">
        <a href="/release/readiness"><span aria-hidden="true">01</span><strong>Hiểu trạng thái hiện tại</strong><ReleaseIcon name="arrow"/></a>
        <a href="/community/onboarding"><span aria-hidden="true">02</span><strong>Hòa nhập cộng đồng</strong><ReleaseIcon name="arrow"/></a>
        <a href="/release/tester-pack"><span aria-hidden="true">03</span><strong>Chuẩn bị thử nghiệm</strong><ReleaseIcon name="arrow"/></a>
      </nav>
    </section>
    <section className="lgo-release-paper-panel lgo-release-frame" aria-labelledby="community-values-heading">
      <ReleaseIcon name="document"/><SectionHeading headingId="community-values-heading" eyebrow="Vì không gian chung" title="Quy tắc ứng xử"/>
      <p>Vì một cộng đồng văn minh và lành mạnh. Chọn một nguyên tắc để đọc hướng dẫn cụ thể.</p>
      <PrincipleMedallions label="Đọc nguyên tắc ứng xử" items={[
        {id:"respect",title:"Tôn trọng",icon:"users",href:"#community-rule-0"},
        {id:"safety",title:"Giữ riêng tư",icon:"shield",href:"#community-rule-1"},
        {id:"feedback",title:"Góp ý rõ",icon:"document",href:"#community-rule-2"}
      ]}/>
      <p className="lgo-community-value-quote">Cùng giữ gìn không gian chung<br/>để Linh Giới ngày càng tốt đẹp hơn.</p>
    </section>
    <section className="lgo-release-paper-panel lgo-release-frame" aria-labelledby="community-feedback-heading">
      <ReleaseIcon name="shield"/><SectionHeading headingId="community-feedback-heading" eyebrow="Lắng nghe và cải thiện" title="Phản hồi an toàn"/>
      <div className="lgo-community-paper-boundary"><ReleaseIcon name="lock"/><p>Chưa có trò chuyện, diễn đàn hoặc bang hội.</p></div>
      <div className="lgo-community-paper-boundary"><ReleaseIcon name="document"/><p>Chưa có hệ thống phiếu hỗ trợ hoặc kênh nhận dữ liệu riêng tư.</p></div>
      <LinkButton href="/support/safety" tone="neutral">Đọc hướng dẫn an toàn <ReleaseIcon name="arrow"/></LinkButton>
    </section>
  </div>;
}
export function PublicCommunityGallery() {
  return <section id="community-runtime-gallery" aria-labelledby="community-runtime-heading">
    <div className="lgo-release-section-heading"><SectionHeading headingId="community-runtime-heading" eyebrow="Từ bản dựng, không phải quảng cáo tính năng" title="Khung hình prototype Linh Thành"/><p>Hai ảnh runtime đã có trong repo.<br/>Không đồng nghĩa đã mở dịch vụ cộng đồng.</p></div>
    <div className="lgo-runtime-gallery">
      {plazaScreenshots.map(item=><MediaFrame key={item.src} eyebrow="Ảnh runtime · Prototype" title={item.title} description={item.caption}
        media={<a href={item.src} target="_blank" rel="noopener noreferrer" aria-label={`Mở ảnh gốc: ${item.title} (tab mới)`}><img src={item.src} alt={item.alt} width="640" height="480" loading="lazy"/><span>Mở ảnh gốc ↗</span></a>}/>) }
    </div>
  </section>;
}
export function PublicCommunityConduct() {
  return <section id="community-conduct" className="lgo-release-reading-panel lgo-release-frame" aria-labelledby="community-conduct-heading">
    <SectionHeading headingId="community-conduct-heading" eyebrow="Đọc để cùng giữ gìn" title="Cùng giữ không gian chung"/>
    <QuestionDisclosureList items={communityConductRules.map((rule,index)=>({id:`community-rule-${index}`,question:rule.rule,answer:<><p>{rule.friendlyVersion}</p><p>{rule.reason}</p><small>{rule.moderationBoundary}</small></>}))}/>
    <p className="lgo-community-contract-note">Hướng dẫn tĩnh, không có kiểm duyệt trực tiếp. NO_ACCEPTED_BACKEND_CONTRACT.</p>
  </section>;
}
export function PublicCommunityScopeNotes() {
  const notes=[
    ...communityPrinciples.map((item,index)=>({id:`community-principle-${index}`,question:item.title,answer:<p>{item.summary}</p>})),
    ...communityReadinessSteps.map((item,index)=>({id:`community-readiness-${index}`,question:item.title,answer:<><p>{item.purpose}</p><p><strong>Hiện tại:</strong> {item.currentState}</p><p><strong>Điều kiện tiếp theo:</strong> {item.futureGate}</p></>})),
    ...communityFeedbackChannels.map((item,index)=>({id:`community-channel-${index}`,question:item.channel,answer:<><p>{item.whatToShare}</p><p>{item.whatNotToShare}</p><p>{item.nextGate}</p><small>Phạm vi trong source: {item.currentMode}</small></>}))
  ];
  return <details className="lgo-release-more-evidence"><summary>Nguyên tắc, phạm vi và các điều kiện còn chờ <span aria-hidden="true">+</span></summary>
    <QuestionDisclosureList items={notes}/>
  </details>;
}
