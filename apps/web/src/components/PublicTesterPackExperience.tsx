import { closedTesterChecklist, deviceReportTemplateFields, knownLimitationNotes, safeFeedbackTemplates } from "@lgo-web/content";
import { ArticleFragmentRestoration, ExperienceHero, FieldManual, LocalChecklist, TemplateTabs, ReleaseIcon, SectionHeading, LinkButton } from "@lgo-web/ui";
import type { ReadingTemplate, ReleaseIconName } from "@lgo-web/ui";

const preparationLabels = ["Đọc điều kiện phát hành", "Chuẩn bị thông tin thiết bị", "Góp ý đúng phạm vi", "Chờ kênh chính thức"];
const preparationItems = closedTesterChecklist.map((item, index) => ({ id: item.id, label: preparationLabels[index] ?? item.title, description: item.safePreparation }));
const feedbackTemplates: readonly ReadingTemplate[] = [
  { id: "bug", label: "Báo lỗi", text: safeFeedbackTemplates.map((item, index) => `${index + 1}. ${item.field}:\n   [...]`).join("\n\n") },
  { id: "loop", label: "Vòng chơi", text: "1. Màn hình hoặc bước trong hướng dẫn:\n   [...]\n\n2. Điều đã quan sát:\n   [...]\n\n3. Điều dễ hiểu / chưa rõ:\n   [...]\n\n4. Gợi ý cải thiện trong phạm vi hiện tại:\n   [...]\n\nKhông kỳ vọng combat, kinh tế hoặc phần thưởng đầy đủ." },
  { id: "suggestion", label: "Góp ý", text: "1. Trang hoặc nội dung muốn góp ý:\n   [...]\n\n2. Vấn đề cụ thể:\n   [...]\n\n3. Đề xuất thay đổi:\n   [...]\n\n4. Thay đổi này giúp ích như thế nào?\n   [...]\n\nKhông ghi tên tài khoản, email, mật khẩu hoặc token." }
];
const shortcuts: ReadonlyArray<{ href: string; icon: ReleaseIconName; title: string; hint: string }> = [
  { href: "/release/readiness", icon: "shield", title: "Điều kiện phát hành", hint: "Đọc trạng thái và cổng duyệt" },
  { href: "#tester-checklist", icon: "document", title: "Checklist chuẩn bị", hint: "Tự kiểm tra trước khi tham gia" },
  { href: "#tester-device", icon: "monitor", title: "Báo cáo thiết bị", hint: "Chỉ ghi bối cảnh cần thiết" },
  { href: "#tester-feedback", icon: "document", title: "Mẫu phản hồi", hint: "Báo lỗi · Vòng chơi · Góp ý" },
  { href: "#tester-limits", icon: "lock", title: "Giới hạn đã biết", hint: "Hiểu điều gì chưa có" }
];

export function TesterPackHero() {
  return <ExperienceHero className="lgo-release-hero lgo-release-frame" copyClassName="lgo-release-hero-copy"
    badge="Linh Giới Online · Cộng đồng" badgeTone="gold" kicker="Cùng quan sát. Cùng cải thiện."
    title="Gói tester cộng đồng" lead="Một thế giới tốt hơn bắt đầu từ những phản hồi rõ ràng. Chuẩn bị checklist, ghi nhận trải nghiệm và hiểu giới hạn trước một lời mời thử nghiệm."
    actions={[{ href: "#tester-feedback", label: "Xem mẫu phản hồi", tone: "gold" }, { href: "/release/readiness", label: "Kiểm tra cổng duyệt", tone: "neutral" }]}
    detail={<>
      <ul className="lgo-release-promises">
        <li><ReleaseIcon name="lock" /><div><strong>Chưa mở intake</strong><span>Đây không phải trang đăng ký thử nghiệm.</span></div></li>
        <li><ReleaseIcon name="users" /><div><strong>Không hứa slot</strong><span>Đọc hướng dẫn không đồng nghĩa có quyền truy cập.</span></div></li>
        <li><ReleaseIcon name="shield" /><div><strong>Phản hồi an toàn</strong><span>Không gửi dữ liệu nhạy cảm, không có backend tiếp nhận.</span></div></li>
      </ul><p className="lgo-release-art-note">Minh họa thế giới và sổ tay · không phải ảnh gameplay</p>
    </>}
    visual={<>
      <img className="lgo-release-hero-art" src="/game-art/world/dong-mon-skyline.webp" width="1360" height="765" alt="" fetchPriority="high" />
      <FieldManual title="Gói tester" quote="Cùng quan sát. Cùng cải thiện. Linh Giới tử tế hơn." steps={["Quan sát", "Ghi nhận", "Tái hiện", "Góp ý"]} />
    </>} />;
}
export function TesterPackShortcuts() {
  return <nav className="lgo-tester-shortcuts lgo-release-shortcuts" aria-label="Nội dung gói tester">
    {shortcuts.map(item => <a href={item.href} key={item.href}><ReleaseIcon name={item.icon} /><strong>{item.title}</strong><span>{item.hint}</span><small>Đọc hướng dẫn <span aria-hidden="true">→</span></small></a>)}
  </nav>;
}
export function TesterPackFeedback() {
  return <div className="lgo-release-reading-grid">
    <section className="lgo-release-paper-panel lgo-release-frame" aria-labelledby="tester-safety-heading">
      <ReleaseIcon name="shield" />
      <SectionHeading headingId="tester-safety-heading" eyebrow="Chia sẻ trải nghiệm, giữ riêng dữ liệu" title="Phản hồi an toàn" />
      <p>Điều hữu ích nhất là mô tả rõ vấn đề, bước tái hiện và kết quả mong đợi. Không cần cung cấp danh tính hay bằng chứng tài khoản.</p>
      <div className="lgo-release-paper-notice"><ReleaseIcon name="lock" /><div><strong>Không gửi thông tin nhạy cảm</strong><p>Giữ kín mật khẩu, token, email riêng tư, dữ liệu thanh toán và hội thoại cá nhân. Che các thông tin này trong ảnh hoặc log.</p></div></div>
      <p className="lgo-release-paper-quote">“Cùng quan sát. Cùng cải thiện.<br />Linh Giới tử tế hơn.”</p>
      <LinkButton href="/support/safety" tone="neutral">Đọc hướng dẫn an toàn <ReleaseIcon name="arrow" /></LinkButton>
    </section>
    <section id="tester-feedback" tabIndex={-1} className="lgo-release-reading-panel lgo-release-frame" aria-labelledby="tester-feedback-heading">
      <ArticleFragmentRestoration targetIds={["tester-feedback"]} />
      <SectionHeading headingId="tester-feedback-heading" eyebrow="Rõ ràng · Cụ thể · Tôn trọng" title="Mẫu phản hồi" />
      <p>Chọn mẫu để tự ghi nhận sau này. Nút sao chép chỉ chép mẫu văn bản, không gửi phản hồi.</p>
      <TemplateTabs label="Mẫu phản hồi" templates={feedbackTemplates} />
      <details className="lgo-release-template-tips">
        <summary>Cách ghi phản hồi rõ ràng <span aria-hidden="true">+</span></summary>
        <dl>{safeFeedbackTemplates.map(item => <div key={item.field}><dt>{item.field}</dt><dd>{item.guidance}</dd></div>)}</dl>
      </details>
      <p className="lgo-reading-tools-note">Chỉ gửi khi có kênh chính thức. Mẫu “Vòng chơi” và “Góp ý” là hướng dẫn biên soạn, không bổ sung tính năng game.</p>
    </section>
  </div>;
}
export function TesterPackPreparation() {
  return <div className="lgo-release-reading-grid lgo-release-reading-grid-even">
    <section id="tester-checklist" tabIndex={-1} className="lgo-release-reading-panel lgo-release-frame" aria-labelledby="tester-checklist-heading">
      <SectionHeading headingId="tester-checklist-heading" eyebrow="Chuẩn bị từ những điều nhỏ" title="Checklist chuẩn bị" />
      <LocalChecklist items={preparationItems} label="Tự kiểm tra chuẩn bị tester" />
      <ArticleFragmentRestoration targetIds={["tester-checklist"]} />
    </section>
    <section id="tester-device" tabIndex={-1} className="lgo-release-reading-panel lgo-release-frame" aria-labelledby="tester-device-heading">
      <ArticleFragmentRestoration targetIds={["tester-device"]} />
      <SectionHeading headingId="tester-device-heading" eyebrow="Đủ để tái hiện, không để định danh" title="Báo cáo thiết bị" />
      <p>Ghi thông tin tổng quát, không tự động quét thiết bị và không thu thập dữ liệu cá nhân.</p>
      <dl className="lgo-release-device-guide">{deviceReportTemplateFields.map(item => <div key={item.field}>
        <dt><ReleaseIcon name={item.field === "Loại thiết bị" ? "monitor" : "shield"} />{item.field}</dt>
        <dd><p>{item.safeFormat}</p><details><summary>Thông tin không nên gửi <span aria-hidden="true">+</span></summary><p>{item.doNotCollect}</p></details></dd>
      </div>)}</dl>
    </section>
  </div>;
}
export function TesterPackLimitations() {
  return <section id="tester-limits" tabIndex={-1} className="lgo-tester-limitations" aria-labelledby="tester-limits-heading">
      <ArticleFragmentRestoration targetIds={["tester-limits"]} />
    <div className="lgo-release-section-heading"><SectionHeading headingId="tester-limits-heading" eyebrow="Đọc trước một lời mời" title="Giới hạn đã biết" /><p>Hướng dẫn có thể sẵn sàng trước khi bản test được mở.</p></div>
    <div className="lgo-release-limits-grid">{knownLimitationNotes.map(item => <details className="lgo-release-limit" key={item.area}>
      <summary><ReleaseIcon name="lock" /><strong>{item.area}</strong><span aria-hidden="true">+</span></summary>
      <div><p>{item.playerMessage}</p><p>{item.ownerNote}</p><small>{item.mustNotClaim}</small></div>
    </details>)}</div>
    <p className="lgo-reading-tools-note">NO_ACCEPTED_BACKEND_CONTRACT · Không có form đăng ký hoặc tự động cấp quyền tester.</p>
  </section>;
}
