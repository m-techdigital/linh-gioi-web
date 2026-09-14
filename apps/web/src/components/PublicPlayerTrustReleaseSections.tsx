import {
  closedTestReadinessChecks,
  playerTrustSignals,
  releaseNarrativeStages,
  trustJourneyCheckpoints
} from "@lgo-web/content";
import { GameCard, Grid, LinkButton, SectionHeading, StatusBadge } from "@lgo-web/ui";

function toneForTrust(value: string) {
  if (value === "public" || value === "ready-copy") return "jade" as const;
  if (value === "internal" || value === "planned") return "gold" as const;
  return "shadow" as const;
}

export function PlayerTrustSignalBoard() {
  return (
    <section className="lgo-panel lgo-player-trust-board" aria-labelledby="player-trust-signal-heading">
      <SectionHeading eyebrow="WEB v1.18 niềm tin người chơi" title="Niềm tin của người chơi bắt đầu từ bằng chứng trước claim">
        Niềm tin không phải một banner marketing. Mỗi câu hỏi về tải game, trạng thái, hỗ trợ hoặc closed test cần có câu trả lời thật và bằng chứng trước khi claim.
      </SectionHeading>
      <Grid id="player-trust-signal-heading">
        {playerTrustSignals.map((signal, index) => (
          <GameCard className="lgo-player-trust-card" key={signal.id}>
            <StatusBadge tone={toneForTrust(index === 0 ? "public" : index === 1 ? "internal" : "blocked")}>{signal.title}</StatusBadge>
            <h3>{signal.playerQuestion}</h3>
            <p>{signal.trustAnswer}</p>
            <p><strong>Bằng chứng trước khi claim:</strong> {signal.proofBeforeClaim}</p>
            <small>{signal.forbiddenShortcut}</small>
          </GameCard>
        ))}
      </Grid>
    </section>
  );
}

export function ReleaseNarrativeStageBoard() {
  return (
    <section className="lgo-panel lgo-release-narrative-board lgo-release-narrative-stage-board" aria-labelledby="release-narrative-heading">
      <SectionHeading eyebrow="Bằng chứng trước lời hứa" title="Hành trình phát hành: từ sẵn sàng nội dung tới closed test">
        Website public có thể trông đầy đủ hơn, nhưng hành trình phát hành phải nói rõ stage hiện tại, bằng chứng còn thiếu và route an toàn để đọc tiếp. Không claim open beta khi chưa qua cổng M0 → M1.
      </SectionHeading>
      <div id="release-narrative-heading" className="lgo-release-narrative-list">
        {releaseNarrativeStages.map((stage) => (
          <article className="lgo-release-narrative-item" key={stage.stage}>
            <div>
              <StatusBadge tone={toneForTrust(stage.visibility)}>{stage.visibility}</StatusBadge>
              <h3>{stage.stage}</h3>
              <p>{stage.playerMessage}</p>
              <p><strong>Cần có:</strong> {stage.requiredProof}</p>
              <small>{stage.nonClaim}</small>
            </div>
            <LinkButton href={stage.nextSafeRoute} tone={toneForTrust(stage.visibility)}>Đọc route an toàn</LinkButton>
          </article>
        ))}
      </div>
    </section>
  );
}

export function ClosedTestReadinessBoard() {
  return (
    <section className="lgo-panel lgo-closed-test-readiness-board" aria-labelledby="closed-test-readiness-heading">
      <SectionHeading eyebrow="Readiness closed test" title="Closed test cần đủ điều kiện riêng trước khi mở kỳ vọng tham gia">
        Closed test không đồng nghĩa public launch. Web chỉ được giải thích readiness, không tự mở đăng ký, quyền truy cập hoặc reward/economy claim.
      </SectionHeading>
      <Grid id="closed-test-readiness-heading">
        {closedTestReadinessChecks.map((item) => (
          <GameCard className="lgo-closed-test-readiness-card" key={item.check}>
            <StatusBadge tone={toneForTrust(item.currentState)}>{item.currentState}</StatusBadge>
            <h3>{item.check}</h3>
            <p><strong>Người chơi kỳ vọng:</strong> {item.playerExpectation}</p>
            <p><strong>Owner gate:</strong> {item.ownerGate}</p>
            <small>{item.mustNotPromise}</small>
          </GameCard>
        ))}
      </Grid>
    </section>
  );
}

export function TrustJourneyCheckpointBoard() {
  return (
    <section className="lgo-panel lgo-trust-journey-board" aria-labelledby="trust-journey-heading">
      <SectionHeading eyebrow="Hành trình Download / Status / Support" title="Mỗi route trả lời một câu hỏi niềm tin trước khi dẫn đi tiếp">
        Người chơi không nên phải đoán stage. Release hub nối Download Trust, Status, Support Safety và Community Onboarding bằng boundary rõ ràng.
      </SectionHeading>
      <div id="trust-journey-heading" className="lgo-trust-journey-list">
        {trustJourneyCheckpoints.map((checkpoint) => (
          <article className="lgo-trust-journey-item" key={checkpoint.route}>
            <div>
              <StatusBadge tone="spirit">{checkpoint.route}</StatusBadge>
              <h3>{checkpoint.trustQuestion}</h3>
              <p>{checkpoint.answerOnPage}</p>
              <small>{checkpoint.boundary}</small>
            </div>
            <LinkButton href={checkpoint.nextRoute} tone="jade">Đi bước tiếp</LinkButton>
          </article>
        ))}
      </div>
    </section>
  );
}

export function PlayerTrustReleaseCta() {
  return (
    <section className="lgo-detail-next-steps lgo-player-trust-release-cta" aria-label="Bước tiếp theo hành trình phát hành">
      <div>
        <StatusBadge tone="gold">WEB v1.18 niềm tin / hành trình phát hành</StatusBadge>
        <h2>Trước khi có public build, web phải kể rõ câu chuyện release theo bằng chứng.</h2>
        <p>Release hub giải thích stage hiện tại, readiness closed test và lộ trình đọc Tin cậy tải game → Trạng thái → Hỗ trợ an toàn mà không mở funnel giả.</p>
      </div>
      <div className="lgo-product-first-actions">
        <LinkButton href="/release" tone="gold">Hành trình phát hành</LinkButton>
        <LinkButton href="/download/trust" tone="spirit">Tin cậy tải game</LinkButton>
        <LinkButton href="/support/safety" tone="jade">Hỗ trợ an toàn</LinkButton>
      </div>
    </section>
  );
}
