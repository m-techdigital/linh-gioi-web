import { closedTestSupportExpectations, communityConductRules, deviceReportTemplateFields, playerSafetyPrinciples, supportIssuePaths } from "@lgo-web/content";
import { DataBoundaryColumns, ExperienceHero, LinkButton, LocalChecklist, PrivacyNotice, QuestionDisclosureList, ReleaseIcon, SectionHeading } from "@lgo-web/ui";
import type { LocalChecklistItem, PrivacyNoticeItem } from "@lgo-web/ui";

// Preserve the existing page's five preparation steps; no upload or redaction service is implied.
const checklist: readonly LocalChecklistItem[] = [
  {id:"hide-password",label:"Che mật khẩu",description:"Không gửi mật khẩu trong ảnh chụp, video, log hoặc mô tả lỗi."},
  {id:"hide-token",label:"Che token",description:"Ẩn token, mã xác thực, mã OTP, mã 2FA và mọi chuỗi dài nhạy cảm."},
  {id:"reproduce",label:"Mô tả bước tái hiện",description:"Ghi route, thiết bị, trình duyệt và các bước làm lỗi xuất hiện."},
  {id:"safe-capture",label:"Ảnh/log đã che",description:"Chỉ đính kèm ảnh hoặc log đã xóa thông tin riêng tư."},
  {id:"official-channel",label:"Chờ kênh chính thức",description:"Chỉ gửi qua kênh được công bố, tránh tin nhắn lạ hoặc link giả."}
];
const privacyItems: readonly PrivacyNoticeItem[] = [
  {title:"Che mật khẩu",icon:"lock",description:"Không đưa mật khẩu vào ảnh, video, log hoặc mô tả."},
  {title:"Che token",icon:"shield",description:"Giữ riêng token, mã xác thực, OTP và mã 2FA."},
  {title:"Che thông tin cá nhân",icon:"users",description:"Không gửi định danh, dữ liệu thanh toán hoặc chat riêng."}
];
const allowed = ["Mô tả vấn đề và bước tái hiện lỗi.","Loại thiết bị, hệ điều hành và trình duyệt.","Route/màn hình, kỳ vọng và kết quả thực tế.","Ảnh hoặc log liên quan đã che thông tin riêng tư."];

export function PublicSafetyHero() {
  return <ExperienceHero className="lgo-release-hero lgo-release-frame lgo-guidance-hero" copyClassName="lgo-release-hero-copy"
    badge="Linh Giới Online · An toàn người chơi" badgeTone="gold" kicker="An toàn hôm nay · Trải nghiệm trọn vẹn hơn"
    title="Báo lỗi an toàn" lead="Chuẩn bị phản hồi rõ ràng mà không để lộ dữ liệu riêng tư. Mỗi mô tả đúng cách giúp người đọc hiểu vấn đề và bước tái hiện."
    actions={[{href:"#safety-checklist",label:"Tự kiểm tra trước",tone:"gold"},{href:"/release/tester-pack#tester-feedback",label:"Xem mẫu phản hồi",tone:"neutral"}]}
    detail={<><div className="lgo-guidance-hero-boundary"><ReleaseIcon name="shield"/><p>Hướng dẫn công khai, không phải kênh nhận dữ liệu.<br/><strong>Chưa có ticket, tra cứu tài khoản hoặc bảng kiểm duyệt.</strong></p></div><p className="lgo-release-art-note">Minh họa thế giới · Không phải ảnh gameplay</p></>}
    visual={<><img className="lgo-release-hero-art" src="/game-art/world/dong-mon-skyline.webp" width="1360" height="765" alt="" fetchPriority="high"/>
      <PrivacyNotice headingId="safety-privacy-heading" title="Không gửi dữ liệu nhạy cảm" items={privacyItems} note="Giữ riêng thông tin · Chỉ gửi qua kênh chính thức khi được công bố"/>
    </>}/>;
}
export function PublicSafetyChecklist() {
  return <section id="safety-checklist" aria-labelledby="safety-checklist-heading">
    <div className="lgo-release-section-heading"><SectionHeading headingId="safety-checklist-heading" eyebrow="Năm bước chuẩn bị" title="Hướng dẫn báo lỗi an toàn"/><p>Tự kiểm tra trước khi dùng kênh chính thức.<br/>Đánh dấu không đồng nghĩa đã gửi báo cáo.</p></div>
    <LocalChecklist layout="cards" items={checklist} label="Tự kiểm tra báo lỗi an toàn"/>
    <p className="lgo-safety-self-check-note"><ReleaseIcon name="shield"/>Tự đánh dấu không kiểm tra nội dung và không tự che ảnh/log. Bạn cần xem lại thông tin trước khi chia sẻ.</p>
  </section>;
}
export function PublicSafetyDataBoundary() {
  return <section id="safety-data-boundary" aria-labelledby="safety-data-heading">
    <div className="lgo-release-section-heading"><SectionHeading headingId="safety-data-heading" eyebrow="Chia sẻ vấn đề, giữ riêng dữ liệu" title="Ranh giới dữ liệu"/><p>Hiện chỉ chuẩn bị thông tin, chưa gửi trên website.</p></div>
    <DataBoundaryColumns allowed={allowed} withheld={deviceReportTemplateFields.map(item=>item.doNotCollect
      .replaceAll("password", "mật khẩu").replaceAll("phone number", "số điện thoại")
      .replaceAll("account ID", "ID tài khoản").replaceAll("browser profile", "hồ sơ trình duyệt")
      .replaceAll("extension list", "danh sách tiện ích mở rộng").replaceAll("IP public", "IP công khai")
      .replaceAll("private chat", "trò chuyện riêng"))}/>
  </section>;
}
export function PublicSafetyIssuePaths() {
  return <div className="lgo-release-reading-grid lgo-release-reading-grid-even">
    <section id="safety-issue-paths" className="lgo-release-reading-panel lgo-release-frame" aria-labelledby="safety-issue-heading">
      <SectionHeading headingId="safety-issue-heading" eyebrow="Đi đúng hướng, không gửi nhầm" title="Bạn đang gặp vấn đề gì?"/>
      <QuestionDisclosureList items={supportIssuePaths.map((item,index)=>({id:`safe-issue-${index}`,question:item.issue,answer:<><p>{item.whatToPrepare}</p><p className="lgo-safety-answer-boundary">{item.privacyBoundary}</p><LinkButton href={item.whereToRead} tone="neutral">Đọc hướng dẫn liên quan <ReleaseIcon name="arrow"/></LinkButton></>}))}/>
    </section>
    <aside id="safety-no-intake" className="lgo-release-paper-panel lgo-release-frame" aria-labelledby="safety-intake-heading">
      <ReleaseIcon name="lock"/><SectionHeading headingId="safety-intake-heading" eyebrow="Hiểu đúng giới hạn hiện tại" title="Chưa có ticket thật"/>
      <p>Website chỉ cung cấp hướng dẫn. Chưa có hộp thư nhận phản hồi bảo mật, chưa tra cứu tài khoản và chưa có bảng kiểm duyệt.</p>
      <p>Không tải ảnh/log hoặc nhập thông tin cá nhân trên trang này. Hướng dẫn chuẩn bị không phải quyền truy cập thử nghiệm hay cam kết thời gian phản hồi.</p>
      <div className="lgo-hero-actions"><LinkButton href="/support/help" tone="neutral">Đọc FAQ nhanh</LinkButton><LinkButton href="/support" tone="neutral">Trạm hỗ trợ</LinkButton></div>
      <p className="lgo-safety-contract-note">NO_ACCEPTED_BACKEND_CONTRACT</p>
    </aside>
  </div>;
}
export function PublicSafetyCommunityNotes() {
  const notes = [
    ...playerSafetyPrinciples.map(item=>({id:item.id,question:item.title,answer:<><p>{item.playerCopy}</p><p>{item.notClaimed}</p></>})),
    ...communityConductRules.map((item,index)=>({id:`safe-conduct-${index}`,question:item.rule,answer:<><p>{item.friendlyVersion}</p><p>{item.reason}</p><p>{item.moderationBoundary}</p></>})),
    ...closedTestSupportExpectations.map((item,index)=>({id:`safe-test-${index}`,question:item.phase,answer:<><p>{item.currentMessage}</p><p>{item.requiredBeforeOpening}</p><p>{item.cannotPromise}</p></>}))
  ];
  return <details className="lgo-release-more-evidence"><summary>An toàn cộng đồng và kỳ vọng thử nghiệm <span aria-hidden="true">+</span></summary>
    <QuestionDisclosureList items={notes}/>
  </details>;
}
