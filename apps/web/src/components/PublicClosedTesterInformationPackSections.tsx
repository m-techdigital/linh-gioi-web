import { closedTesterChecklist, deviceReportTemplateFields, knownLimitationNotes, safeFeedbackTemplates } from "@lgo-web/content";
import { GameCard, Grid, LinkButton, SectionHeading, StatusBadge } from "@lgo-web/ui";

export function ClosedTesterChecklistBoard() {
  return <section className="lgo-panel lgo-closed-tester-checklist-board" aria-labelledby="closed-tester-checklist-heading"><SectionHeading eyebrow="WEB v1.20 closed tester information pack" title="Tester checklist phải hướng dẫn chuẩn bị, không mở đăng ký giả">Checklist này giúp người chơi hiểu nên đọc gì, chuẩn bị gì và chưa được kỳ vọng gì trước khi có kênh closed-test chính thức.</SectionHeading><Grid id="closed-tester-checklist-heading">{closedTesterChecklist.map((item) => <GameCard className="lgo-closed-tester-card" key={item.id}><StatusBadge tone="gold">{item.title}</StatusBadge><h3>{item.testerQuestion}</h3><p>{item.safePreparation}</p><small>{item.nonClaim}</small><LinkButton href={item.whereToRead} tone="spirit">Đọc trang liên quan</LinkButton></GameCard>)}</Grid></section>;
}

export function SafeFeedbackTemplateBoard() {
  return <section className="lgo-panel lgo-safe-feedback-template-board" aria-labelledby="safe-feedback-template-heading"><SectionHeading eyebrow="Safe feedback" title="Feedback template rõ ràng nhưng không thu dữ liệu nhạy cảm">Mẫu feedback ưu tiên tóm tắt, bước tái hiện và expected/actual; mọi trường đều có privacy boundary đi kèm.</SectionHeading><div id="safe-feedback-template-heading" className="lgo-safe-feedback-list">{safeFeedbackTemplates.map((item) => <article className="lgo-safe-feedback-item" key={item.field}><StatusBadge tone="jade">{item.field}</StatusBadge><h3>{item.guidance}</h3><p><strong>Ví dụ:</strong> {item.example}</p><small>{item.privacyBoundary}</small></article>)}</div></section>;
}

export function KnownLimitationNotesBoard() {
  return <section className="lgo-panel lgo-known-limitation-board" aria-labelledby="known-limitation-heading"><SectionHeading eyebrow="Known limitations" title="Tester pack phải nói rõ giới hạn trước khi ai đó hiểu nhầm là bản test mở">Known limitations là phần product trust: giúp tester tương lai biết điều gì chưa có, proof nào còn thiếu và claim nào bị cấm.</SectionHeading><Grid id="known-limitation-heading">{knownLimitationNotes.map((item) => <GameCard className="lgo-known-limitation-card" key={item.area}><StatusBadge tone="shadow">{item.area}</StatusBadge><h3>{item.playerMessage}</h3><p>{item.ownerNote}</p><small>{item.mustNotClaim}</small></GameCard>)}</Grid></section>;
}

export function DeviceReportTemplateBoard() {
  return <section className="lgo-panel lgo-device-report-template-board" aria-labelledby="device-report-template-heading"><SectionHeading eyebrow="Device/report template" title="Thông tin thiết bị chỉ nên đủ để tái hiện lỗi, không thu định danh">Template này mô tả field an toàn cho closed-test feedback sau này: device class, OS/browser/screen, network context và screenshot/log safety.</SectionHeading><div id="device-report-template-heading" className="lgo-device-report-list">{deviceReportTemplateFields.map((item) => <article className="lgo-device-report-item" key={item.field}><StatusBadge tone="spirit">{item.field}</StatusBadge><h3>{item.whyItMatters}</h3><p><strong>Safe format:</strong> {item.safeFormat}</p><small>{item.doNotCollect}</small></article>)}</div></section>;
}

export function ClosedTesterInformationPackCta() {
  return <section className="lgo-detail-next-steps lgo-closed-tester-info-cta" aria-label="Closed tester information next steps"><div><StatusBadge tone="gold">WEB v1.20 closed tester information pack</StatusBadge><h2>Chuẩn bị tester guidance trước, không mở intake hoặc hứa slot test.</h2><p>Đọc checklist, safe feedback, known limitations và device report template để hiểu closed-test readiness mà không gửi secrets hoặc dữ liệu nhạy cảm.</p></div><div className="lgo-product-first-actions"><LinkButton href="/release/tester-pack" tone="gold">Tester information pack</LinkButton><LinkButton href="/release/readiness" tone="spirit">Release readiness</LinkButton><LinkButton href="/support/safety" tone="jade">Safety support</LinkButton></div></section>;
}
