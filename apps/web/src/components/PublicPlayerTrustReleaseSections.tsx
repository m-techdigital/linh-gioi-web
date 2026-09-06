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
      <SectionHeading eyebrow="WEB v1.18 player trust" title="Niềm tin của người chơi bắt đầu từ proof-before-claim">
        Player trust không phải một banner marketing. Mỗi câu hỏi về download, status, support hoặc closed test cần có câu trả lời thật và bằng chứng cần có trước khi claim.
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
    <section className="lgo-panel lgo-release-narrative-board" aria-labelledby="release-narrative-heading">
      <SectionHeading eyebrow="Staged release narrative" title="Từ content-ready tới closed test phải đi qua từng stage rõ ràng">
        Website public có thể trông đầy đủ hơn, nhưng release narrative phải nói rõ stage hiện tại, proof còn thiếu và route an toàn để đọc tiếp.
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
      <SectionHeading eyebrow="Closed-test readiness" title="Closed test cần đủ điều kiện riêng trước khi mở kỳ vọng tham gia">
        Closed test không đồng nghĩa public launch. Web chỉ được giải thích readiness, không tự mở registration, entitlement hoặc reward/economy claim.
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
      <SectionHeading eyebrow="Download / status / support journey" title="Mỗi route trả lời một câu hỏi niềm tin trước khi dẫn đi tiếp">
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
    <section className="lgo-detail-next-steps lgo-player-trust-release-cta" aria-label="Player trust release narrative next steps">
      <div>
        <StatusBadge tone="gold">WEB v1.18 player trust / release narrative</StatusBadge>
        <h2>Trước khi có public build, web phải kể rõ câu chuyện release theo bằng chứng.</h2>
        <p>Release hub giải thích stage hiện tại, closed-test readiness và lộ trình đọc Download Trust → Status → Support Safety mà không mở funnel giả.</p>
      </div>
      <div className="lgo-product-first-actions">
        <LinkButton href="/release" tone="gold">Release narrative</LinkButton>
        <LinkButton href="/download/trust" tone="spirit">Download trust</LinkButton>
        <LinkButton href="/support/safety" tone="jade">Safety support</LinkButton>
      </div>
    </section>
  );
}
