import {
  closedTestSupportExpectations,
  communityConductRules,
  playerSafetyPrinciples,
  supportIssuePaths
} from "@lgo-web/content";
import { GameCard, Grid, LinkButton, SectionHeading, StatusBadge } from "@lgo-web/ui";

function toneForIndex(index: number) {
  const tones = ["jade", "gold", "spirit", "neutral"] as const;
  return tones[index % tones.length] ?? "jade";
}

export function PlayerSafetyPrinciplesBoard() {
  return (
    <section className="lgo-panel lgo-player-safety-board" aria-labelledby="player-safety-principles-heading">
      <SectionHeading eyebrow="WEB v1.14 player safety" title="An toàn người chơi đứng trước mọi kênh support/test">
        Nội dung này giúp người chơi hiểu cách góp ý và báo lỗi mà không gửi dữ liệu nhạy cảm. Đây là static public guidance, không phải ticket backend.
      </SectionHeading>
      <Grid id="player-safety-principles-heading">
        {playerSafetyPrinciples.map((item, index) => (
          <GameCard className="lgo-player-safety-card" key={item.id}>
            <StatusBadge tone={toneForIndex(index)}>{item.id}</StatusBadge>
            <h3>{item.title}</h3>
            <p><strong>Vì sao quan trọng:</strong> {item.whyItMatters}</p>
            <p><strong>Player copy:</strong> {item.playerCopy}</p>
            <small>{item.notClaimed}</small>
          </GameCard>
        ))}
      </Grid>
    </section>
  );
}

export function SupportIssuePathBoard() {
  return (
    <section className="lgo-panel lgo-support-issue-path-board" aria-labelledby="support-issue-path-heading">
      <SectionHeading eyebrow="Issue reporting" title="Người chơi biết đọc đâu và chuẩn bị gì trước khi báo lỗi">
        Issue path không tạo form hoặc ticket giả. Nó chỉ hướng người chơi tới route đúng và nhắc privacy boundary trước closed testing.
      </SectionHeading>
      <div id="support-issue-path-heading" className="lgo-support-issue-path-list">
        {supportIssuePaths.map((item, index) => (
          <article className="lgo-support-issue-path" key={item.issue}>
            <div>
              <StatusBadge tone={toneForIndex(index)}>{item.whereToRead}</StatusBadge>
              <h3>{item.issue}</h3>
              <p><strong>Chuẩn bị:</strong> {item.whatToPrepare}</p>
              <small>{item.privacyBoundary}</small>
            </div>
            <LinkButton href={item.whereToRead} tone={toneForIndex(index)}>Mở route liên quan</LinkButton>
          </article>
        ))}
      </div>
    </section>
  );
}

export function ClosedTestSupportBoard() {
  return (
    <section className="lgo-panel lgo-closed-test-support-board" aria-labelledby="closed-test-support-heading">
      <SectionHeading eyebrow="Closed-test support" title="Closed testing chỉ mở khi support expectation đủ rõ">
        Mỗi phase phải nói rõ current message, bằng chứng cần có và điều không được hứa để tránh nhầm roadmap với quyền truy cập test.
      </SectionHeading>
      <Grid id="closed-test-support-heading">
        {closedTestSupportExpectations.map((item, index) => (
          <GameCard className="lgo-closed-test-support-card" key={item.phase}>
            <StatusBadge tone={toneForIndex(index)}>{item.phase}</StatusBadge>
            <h3>{item.currentMessage}</h3>
            <p><strong>Cần trước khi mở:</strong> {item.requiredBeforeOpening}</p>
            <small>{item.cannotPromise}</small>
          </GameCard>
        ))}
      </Grid>
    </section>
  );
}

export function CommunityConductBoard() {
  return (
    <section className="lgo-panel lgo-community-conduct-board" aria-labelledby="community-conduct-heading">
      <SectionHeading eyebrow="Community conduct" title="Quy tắc cộng đồng được viết thân thiện và có boundary">
        Conduct copy giúp chuẩn bị cộng đồng cho closed testing sau này, nhưng không claim forum/chat/guild/moderation backend.
      </SectionHeading>
      <div id="community-conduct-heading" className="lgo-community-conduct-list">
        {communityConductRules.map((rule) => (
          <article className="lgo-community-conduct-item" key={rule.rule}>
            <StatusBadge tone="jade">{rule.rule}</StatusBadge>
            <h3>{rule.friendlyVersion}</h3>
            <p>{rule.reason}</p>
            <small>{rule.moderationBoundary}</small>
          </article>
        ))}
      </div>
    </section>
  );
}

export function PlayerSafetySupportCta() {
  return (
    <section className="lgo-detail-next-steps lgo-player-safety-cta" aria-label="Player safety support next steps">
      <div>
        <StatusBadge tone="jade">WEB v1.14 safety/support</StatusBadge>
        <h2>Báo lỗi và tham gia cộng đồng theo hướng an toàn trước khi có backend thật.</h2>
        <p>Người chơi đọc safety/support trước khi gửi bug report, chờ closed test hoặc kỳ vọng live ticket/moderation.</p>
      </div>
      <div className="lgo-product-first-actions">
        <LinkButton href="/support/safety" tone="jade">Safety support</LinkButton>
        <LinkButton href="/guides/player-safety-support-guide" tone="gold">Safety guide</LinkButton>
        <LinkButton href="/community/onboarding" tone="spirit">Community onboarding</LinkButton>
      </div>
    </section>
  );
}
