import {
  faqDiscoveryGroups,
  faqHelpfulnessPrompts,
  issueCategoryRoutes,
  noSearchBackendNotes
} from "@lgo-web/content";
import { GameCard, Grid, LinkButton, SectionHeading, StatusBadge } from "@lgo-web/ui";

export function FaqDiscoveryGroupBoard() {
  return (
    <section className="lgo-panel lgo-faq-discovery-board" aria-labelledby="faq-discovery-heading">
      <SectionHeading eyebrow="WEB v1.21 FAQ discoverability" title="FAQ được nhóm theo câu hỏi thật của người chơi">
        Không cần search backend giả: mỗi nhóm câu hỏi dẫn tới route đang có nội dung rõ nhất và kèm non-claim để tránh hiểu nhầm.
      </SectionHeading>
      <Grid id="faq-discovery-heading">
        {faqDiscoveryGroups.map((group) => (
          <GameCard className="lgo-faq-discovery-card" key={group.id}>
            <StatusBadge tone="jade">{group.title}</StatusBadge>
            <h3>{group.playerQuestion}</h3>
            <p>{group.helpfulnessCue}</p>
            <small>{group.nonClaim}</small>
            <LinkButton href={group.route} tone="spirit">Đọc nhóm này</LinkButton>
          </GameCard>
        ))}
      </Grid>
    </section>
  );
}

export function FaqHelpfulnessPromptBoard() {
  return (
    <section className="lgo-panel lgo-faq-helpfulness-board" aria-labelledby="faq-helpfulness-heading">
      <SectionHeading eyebrow="Helpful answer shape" title="Câu trả lời phải giúp người chơi biết bước tiếp theo">
        Mỗi câu hỏi thường gặp nên có style trả lời, next step và điều phải tránh để không biến FAQ thành lời hứa release giả.
      </SectionHeading>
      <Grid id="faq-helpfulness-heading">
        {faqHelpfulnessPrompts.map((item) => (
          <GameCard className="lgo-faq-helpfulness-card" key={item.prompt}>
            <StatusBadge tone="gold">{item.prompt}</StatusBadge>
            <h3>{item.answerStyle}</h3>
            <p><strong>Bước tiếp theo:</strong> {item.usefulNextStep}</p>
            <small>{item.mustAvoid}</small>
          </GameCard>
        ))}
      </Grid>
    </section>
  );
}

export function IssueCategoryRouteBoard() {
  return (
    <section className="lgo-panel lgo-issue-category-board" aria-labelledby="issue-category-heading">
      <SectionHeading eyebrow="Issue-category routing" title="Báo lỗi theo nhóm vấn đề thay vì gửi nhầm dữ liệu">
        Route gợi ý giúp người chơi chuẩn bị thông tin đúng phạm vi mà không gửi password, token, payment data hoặc dữ liệu nhạy cảm.
      </SectionHeading>
      <div id="issue-category-heading" className="lgo-issue-category-list">
        {issueCategoryRoutes.map((item) => (
          <article className="lgo-issue-category-item" key={item.category}>
            <div>
              <StatusBadge tone="spirit">{item.category}</StatusBadge>
              <h3>{item.whenPlayerSays}</h3>
              <p><strong>Cần chuẩn bị:</strong> {item.whatToPrepare}</p>
              <small>{item.privacyBoundary}</small>
            </div>
            <LinkButton href={item.recommendedRoute} tone="jade">Route phù hợp</LinkButton>
          </article>
        ))}
      </div>
    </section>
  );
}

export function NoSearchBackendNoteBoard() {
  return (
    <section className="lgo-panel lgo-no-search-backend-board" aria-labelledby="no-search-backend-heading">
      <SectionHeading eyebrow="No search backend" title="Hữu ích bằng IA rõ ràng, không giả vờ có search/ticket system">
        v1.21 cải thiện khả năng tìm câu trả lời bằng route grouping và helpful fallback, không thêm API search hoặc chatbot support.
      </SectionHeading>
      <Grid id="no-search-backend-heading">
        {noSearchBackendNotes.map((note) => (
          <GameCard className="lgo-no-search-backend-card" key={note.surface}>
            <StatusBadge tone="shadow">{note.surface}</StatusBadge>
            <h3>{note.currentBehavior}</h3>
            <p>{note.helpfulFallback}</p>
            <small>{note.notClaimed}</small>
          </GameCard>
        ))}
      </Grid>
    </section>
  );
}

export function FaqHelpfulnessCta() {
  return (
    <section className="lgo-detail-next-steps lgo-faq-helpfulness-cta" aria-label="FAQ helpfulness next steps">
      <div>
        <StatusBadge tone="jade">WEB v1.21 FAQ/helpfulness polish</StatusBadge>
        <h2>Không biết nên đọc trang nào? Bắt đầu từ FAQ Help để chọn đúng nhóm vấn đề.</h2>
        <p>FAQ Help gom download, release, tester pack, safety, account/backend boundaries và gameplay expectation mà không claim search backend.</p>
      </div>
      <div className="lgo-product-first-actions">
        <LinkButton href="/support/help" tone="jade">FAQ Help</LinkButton>
        <LinkButton href="/support/safety" tone="gold">Safety support</LinkButton>
        <LinkButton href="/download/trust" tone="spirit">Download trust</LinkButton>
      </div>
    </section>
  );
}
