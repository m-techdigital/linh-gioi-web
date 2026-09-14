import {
  beginnerGuideSections,
  communityReadinessSteps,
  downloadStatusNotes,
  supportFaqs,
  worldStoryChapters
} from "@lgo-web/content";
import { GameCard, Grid, LinkButton, SectionHeading, StatusBadge } from "@lgo-web/ui";

function supportScopeLabel(scope: string) {
  if (scope === "static public guidance") return "hướng dẫn tĩnh";
  if (scope === "auth non-claim") return "chưa claim tài khoản thật";
  if (scope === "gameplay non-claim") return "chưa claim gameplay live";
  if (scope === "governance") return "ranh giới backend";
  if (scope === "privacy-safe issue reporting") return "báo lỗi an toàn";
  if (scope === "closed-test support non-claim") return "chưa claim hỗ trợ live";
  return scope;
}

export function WorldStoryDepth() {
  return (
    <section className="lgo-panel lgo-depth-panel" aria-labelledby="world-story-depth-heading">
      <SectionHeading eyebrow="WEB v1.8 game info depth" title="Câu chuyện thế giới được giải thích theo nhịp người chơi" />
      <div id="world-story-depth-heading" className="lgo-story-chapters">
        {worldStoryChapters.map((chapter) => (
          <article className="lgo-story-chapter" key={chapter.id}>
            <span className="lgo-card-kicker">{chapter.subtitle}</span>
            <h3>{chapter.title}</h3>
            <p>{chapter.summary}</p>
            <p><strong>Người chơi hiểu:</strong> {chapter.playerTakeaway}</p>
            <small>{chapter.nonClaim}</small>
          </article>
        ))}
      </div>
    </section>
  );
}

export function BeginnerGuideDepth() {
  return (
    <section className="lgo-panel lgo-guide-panel" aria-labelledby="beginner-guide-depth-heading">
      <SectionHeading eyebrow="Beginner guide" title="Hướng dẫn người chơi mới theo 4 bước rõ ràng">
        Đây là guide public tĩnh để người chơi hiểu trạng thái hiện tại; không phải quest/wiki/backend production.
      </SectionHeading>
      <div id="beginner-guide-depth-heading" className="lgo-guide-steps">
        {beginnerGuideSections.map((item) => (
          <article className="lgo-guide-step" key={item.step}>
            <span>{item.step}</span>
            <div>
              <h3>{item.title}</h3>
              <p>{item.action}</p>
              <p><strong>Mẹo:</strong> {item.playerTip}</p>
              <small>{item.blockedScope}</small>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function DownloadStatusDepth() {
  return (
    <section className="lgo-panel lgo-download-depth" aria-labelledby="download-status-depth-heading">
      <SectionHeading eyebrow="Download status depth" title="Trạng thái tải game cần nói thật, không tạo cảm giác có build giả" />
      <Grid id="download-status-depth-heading">
        {downloadStatusNotes.map((note) => (
          <GameCard key={note.label}>
            <StatusBadge tone="gold">{note.owner}</StatusBadge>
            <h3>{note.label}</h3>
            <p>{note.condition}</p>
            <p><strong>{note.playerMessage}</strong></p>
          </GameCard>
        ))}
      </Grid>
    </section>
  );
}

export function SupportFaqDepth() {
  return (
    <section className="lgo-panel lgo-faq-panel" aria-labelledby="support-faq-depth-heading">
      <SectionHeading eyebrow="FAQ nhanh" title="FAQ nói thẳng về tải game, tài khoản, chiến đấu và hợp đồng backend" />
      <div id="support-faq-depth-heading" className="lgo-faq-list">
        {supportFaqs.map((faq) => (
          <article className="lgo-faq-item" key={faq.question}>
            <StatusBadge tone="jade">{supportScopeLabel(faq.scope)}</StatusBadge>
            <h3>{faq.question}</h3>
            <p>{faq.answer}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function CommunityReadinessDepth() {
  return (
    <section className="lgo-panel" aria-labelledby="community-readiness-depth-heading">
      <SectionHeading eyebrow="Community readiness" title="Chuẩn bị cộng đồng mà không hứa chat/forum/guild backend" />
      <Grid id="community-readiness-depth-heading">
        {communityReadinessSteps.map((step) => (
          <GameCard key={step.title}>
            <h3>{step.title}</h3>
            <p>{step.purpose}</p>
            <p><strong>Hiện tại:</strong> {step.currentState}</p>
            <p><strong>Gate sau:</strong> {step.futureGate}</p>
          </GameCard>
        ))}
      </Grid>
    </section>
  );
}

export function GameInfoDepthCta() {
  return (
    <section className="lgo-depth-cta" aria-label="Game information depth next paths">
      <div>
        <StatusBadge tone="spirit">Game info depth</StatusBadge>
        <h2>WEB v1.8 ưu tiên nội dung game public: lore, beginner guide, download status, FAQ và community readiness.</h2>
        <p>Runtime/browser/e2e vẫn là guardrail, không phải trọng tâm phát triển web.</p>
      </div>
      <div className="lgo-product-first-actions">
        <LinkButton href="/guides" tone="jade">Đọc hướng dẫn</LinkButton>
        <LinkButton href="/support" tone="gold">Xem FAQ</LinkButton>
      </div>
    </section>
  );
}
