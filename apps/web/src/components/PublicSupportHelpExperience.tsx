import { faqDiscoveryGroups, faqHelpfulnessPrompts, playerSafetyPrinciples, supportFaqs } from "@lgo-web/content";
import { ExperienceHero, GuidanceStation, GuidanceTopicGrid, LinkButton, QuestionDirectory, QuestionDisclosureList, ReleaseIcon, SectionHeading } from "@lgo-web/ui";
import type { GuidanceQuestion, GuidanceQuestionGroup, GuidanceTopic } from "@lgo-web/ui";

const topics = [
  {id:"faq-download",title:"Tải game",icon:"download",hint:"Bản tải và nguồn gốc",description:"Hiểu điều kiện mở tải và checksum.",href:"#faq-download",action:"Xem câu trả lời"},
  {id:"faq-test",title:"Tham gia test",icon:"users",hint:"Điều kiện và chuẩn bị",description:"Đọc đúng phạm vi thử nghiệm.",href:"#faq-test",action:"Xem câu trả lời"},
  {id:"faq-report",title:"Báo lỗi an toàn",icon:"document",hint:"Ghi nhận đúng cách",description:"Chuẩn bị bước tái hiện rõ ràng.",href:"#faq-report",action:"Xem câu trả lời"},
  {id:"faq-account",title:"Tài khoản",icon:"lock",hint:"Giới hạn hiện tại",description:"Hiểu đăng nhập và quyền truy cập.",href:"#faq-account",action:"Xem câu trả lời"},
  {id:"faq-gameplay",title:"Lối chơi",icon:"signal",hint:"Hiểu mức đang có",description:"Phân biệt mô tả và tính năng thật.",href:"#faq-gameplay",action:"Xem câu trả lời"},
  {id:"faq-privacy",title:"Ranh giới dữ liệu",icon:"shield",hint:"Giữ riêng thông tin",description:"Biết dữ liệu nào không nên gửi.",href:"#faq-privacy",action:"Xem câu trả lời"}
] as const satisfies readonly GuidanceTopic[];

function sourceQuestion(id: string, scope: string): GuidanceQuestion {
  const faq = supportFaqs.find(item => item.scope === scope);
  if (!faq) throw new Error(`Missing source FAQ scope: ${scope}`);
  return {id,question:faq.question,answer:<p>{faq.answer}</p>};
}
function discoveryQuestion(id: string): GuidanceQuestion {
  const group = faqDiscoveryGroups.find(item => item.id === id);
  if (!group) throw new Error(`Missing FAQ discovery group: ${id}`);
  return {id:`help-discovery-${id}`,question:group.playerQuestion,answer:<><p>{group.helpfulnessCue}</p><p className="lgo-question-boundary">{group.nonClaim}</p></>};
}
const privacy = playerSafetyPrinciples.find(item => item.id === "privacy-first-reports");
if (!privacy) throw new Error("Missing privacy guidance source");

const groups: readonly GuidanceQuestionGroup[] = [
  {...topics[0],href:"/download/trust",action:"Đọc điều kiện tải game",questions:[sourceQuestion("help-download-now","static public guidance"),discoveryQuestion("download-readiness")]},
  {...topics[1],href:"/release/tester-pack",action:"Đọc gói tester",questions:[discoveryQuestion("closed-test"),sourceQuestion("help-test-support","hỗ trợ thử nghiệm non-claim")]},
  {...topics[2],href:"/support/safety",action:"Đọc hướng dẫn báo lỗi",questions:[sourceQuestion("help-report-prepare","privacy-safe issue reporting"),discoveryQuestion("safety-support")]},
  {...topics[3],href:"/status",action:"Đọc ranh giới tài khoản",questions:[sourceQuestion("help-account-dev","auth non-claim"),discoveryQuestion("account-backend")]},
  {...topics[4],href:"/game/loop",action:"Đọc vòng lặp game",questions:[sourceQuestion("help-gameplay-now","gameplay non-claim"),discoveryQuestion("world-loop")]},
  {...topics[5],href:"/support",action:"Đọc phạm vi hỗ trợ",questions:[{id:"help-privacy-prepare",question:privacy.title,answer:<><p>{privacy.playerCopy}</p><p className="lgo-question-boundary">{privacy.notClaimed}</p></>},sourceQuestion("help-contract-boundary","governance")]}
];

export function PublicHelpHero() {
  return <ExperienceHero className="lgo-release-hero lgo-release-frame lgo-guidance-hero" copyClassName="lgo-release-hero-copy"
    badge="Linh Giới Online · Thư viện hỗ trợ" badgeTone="gold" kicker="Có thắc mắc? Bắt đầu từ đúng câu hỏi."
    title="FAQ nhanh" lead="Tìm đúng câu trả lời trước khi gửi phản hồi. Chọn một chủ đề trên bản đồ, đọc hướng dẫn và biết bước tiếp theo."
    actions={[{href:"#faq-answers",label:"Xem tất cả câu hỏi",tone:"gold"},{href:"/support/safety",label:"Hướng dẫn an toàn",tone:"neutral"}]}
    detail={<><div className="lgo-guidance-hero-boundary"><ReleaseIcon name="shield"/><p>Câu trả lời từ nội dung đã có trên website.<br/><strong>Chưa có kênh nhận ticket hoặc tra cứu tài khoản.</strong></p></div><p className="lgo-release-art-note">Minh họa thế giới · Không phải ảnh gameplay</p></>}
    visual={<><img className="lgo-release-hero-art" src="/game-art/world/dong-mon-skyline.webp" width="1360" height="765" alt="" fetchPriority="high"/>
      <GuidanceStation variant="map" headingId="help-map-heading" title="Bản đồ câu hỏi" description="Chọn chủ đề bạn quan tâm để đọc câu trả lời ngay bên dưới." topics={topics} note="Hỏi đúng đường · Đi xa hơn"/>
    </>}/>;
}
export function PublicHelpTopics() {
  return <section className="lgo-guidance-topics" aria-labelledby="help-topics-heading">
    <SectionHeading headingId="help-topics-heading" eyebrow="Sáu hướng dẫn để bắt đầu" title="Bạn đang quan tâm điều gì?"/>
    <GuidanceTopicGrid topics={topics}/>
  </section>;
}
export function PublicHelpAnswers() {
  return <section id="faq-answers" tabIndex={-1} aria-labelledby="help-answers-heading">
    <div className="lgo-release-section-heading"><SectionHeading headingId="help-answers-heading" eyebrow="Đọc trước khi đi tiếp" title="Câu trả lời theo chủ đề"/><p>Chỉ lọc câu hỏi có sẵn trên trang.<br/>Không gửi truy vấn hoặc thông tin cá nhân.</p></div>
    <QuestionDirectory groups={groups} anchorId="faq-answers"/>
  </section>;
}
export function PublicHelpBoundary() {
  return <div className="lgo-release-reading-grid lgo-release-reading-grid-even">
    <aside id="help-boundary" className="lgo-release-paper-panel lgo-release-frame" aria-labelledby="help-boundary-heading">
      <ReleaseIcon name="shield"/><SectionHeading headingId="help-boundary-heading" eyebrow="Dữ liệu của bạn, giữ riêng cho bạn" title="Không có hệ thống ticket thật"/>
      <p>Trang này không phải form hỗ trợ, không tra cứu tài khoản và không có tìm kiếm backend. Giữ riêng mật khẩu, token, dữ liệu thanh toán và thông tin cá nhân nhạy cảm.</p>
      <LinkButton href="/support/safety" tone="neutral">Đọc hướng dẫn an toàn <ReleaseIcon name="arrow"/></LinkButton>
    </aside>
    <section className="lgo-release-reading-panel lgo-release-frame" aria-labelledby="help-next-heading">
      <SectionHeading headingId="help-next-heading" eyebrow="Câu hỏi hôm nay · Hiểu rõ hơn ngày mai" title="Vẫn chưa biết nên đọc đâu?"/>
      <QuestionDisclosureList items={[discoveryQuestion("faq-help-hub")]}/>
      <p className="lgo-reading-tools-note">Bắt đầu từ hành trình nhập môn hoặc về trạm hỗ trợ. Chỉ dùng kênh chính thức khi được công bố.</p>
      <div className="lgo-hero-actions"><LinkButton href="/start" tone="gold">Dành cho người mới</LinkButton><LinkButton href="/support" tone="neutral">Trạm hỗ trợ</LinkButton></div>
      <p className="lgo-reading-tools-note">NO_ACCEPTED_BACKEND_CONTRACT</p>
    </section>
  </div>;
}
export function PublicHelpReadingNotes() {
  return <details className="lgo-release-more-evidence"><summary>Đọc hướng dẫn sao cho hữu ích <span aria-hidden="true">+</span></summary>
    <dl className="lgo-guidance-scope-list">{faqHelpfulnessPrompts.map(item=><div key={item.prompt}><dt>{item.prompt}</dt><dd><p>{item.answerStyle}</p><p>{item.usefulNextStep}</p><p>{item.mustAvoid}</p></dd></div>)}</dl>
  </details>;
}
