import {
  ownerReleaseGates,
  releaseReadinessHubItems,
  releaseSurfaceAlignment,
  testerExpectationCopy
} from "@lgo-web/content";
import { GameCard, Grid, LinkButton, SectionHeading, StatusBadge } from "@lgo-web/ui";

function toneForState(value: string) {
  if (value === "ready-copy") return "jade" as const;
  if (value === "planned") return "gold" as const;
  if (value === "/release/readiness") return "spirit" as const;
  return "shadow" as const;
}

export function ReleaseReadinessHubBoard() {
  return (
    <section className="lgo-panel lgo-release-readiness-hub-board" aria-labelledby="release-readiness-hub-heading">
      <SectionHeading eyebrow="WEB v1.19 readiness phát hành" title="Một hub để đọc gate phát hành trước mọi CTA nhạy cảm">
        Readiness phát hành không phải nút tải hay đăng ký test. Đây là bản đồ bằng chứng trước claim cho Download, Status, Support và Community.
      </SectionHeading>
      <Grid id="release-readiness-hub-heading">
        {releaseReadinessHubItems.map((item) => (
          <GameCard className="lgo-release-readiness-card" key={item.id}>
            <StatusBadge tone="gold">{item.title}</StatusBadge>
            <h3>{item.playerQuestion}</h3>
            <p>{item.readinessAnswer}</p>
            <p><strong>Bằng chứng owner:</strong> {item.ownerEvidence}</p>
            <small>{item.blockedClaim}</small>
            <LinkButton href={item.route} tone="spirit">Đọc surface liên quan</LinkButton>
          </GameCard>
        ))}
      </Grid>
    </section>
  );
}

export function OwnerReleaseGateBoard() {
  return (
    <section className="lgo-panel lgo-owner-release-gate-board" aria-labelledby="owner-release-gate-heading">
      <SectionHeading eyebrow="Gate owner" title="Không chuyển wording sang phát hành nếu gate owner chưa có bằng chứng">
        Mỗi gate cần owner, bằng chứng và quy tắc người chơi nhìn thấy. Đây là cách giữ website đáng tin trước closed test hoặc gói build công khai.
      </SectionHeading>
      <Grid id="owner-release-gate-heading">
        {ownerReleaseGates.map((gate) => (
          <GameCard className="lgo-owner-release-gate-card" key={gate.gate}>
            <StatusBadge tone={toneForState(gate.currentState)}>{gate.currentState}</StatusBadge>
            <h3>{gate.gate}</h3>
            <p><strong>Owner:</strong> {gate.owner}</p>
            <p><strong>Bằng chứng:</strong> {gate.proofRequired}</p>
            <p><strong>Quy tắc public:</strong> {gate.playerVisibleRule}</p>
            <small>{gate.mustNotSkip}</small>
          </GameCard>
        ))}
      </Grid>
    </section>
  );
}

export function TesterExpectationCopyBoard() {
  return (
    <section className="lgo-panel lgo-tester-expectation-board" aria-labelledby="tester-expectation-heading">
      <SectionHeading eyebrow="Tester expectation copy" title="Closed-test wording phải bảo vệ người chơi trước khi có intake thật">
        Tester copy chỉ nên nói cách chuẩn bị và giới hạn hiện tại, không hứa entitlement, account recovery, reward hoặc SLA.
      </SectionHeading>
      <Grid id="tester-expectation-heading">
        {testerExpectationCopy.map((item) => (
          <GameCard className="lgo-tester-expectation-card" key={item.topic}>
            <StatusBadge tone="jade">{item.topic}</StatusBadge>
            <h3>{item.playerExpectation}</h3>
            <p>{item.copyOnWeb}</p>
            <small>{item.supportBoundary}</small>
          </GameCard>
        ))}
      </Grid>
    </section>
  );
}

export function ReleaseSurfaceAlignmentBoard() {
  return (
    <section className="lgo-panel lgo-release-surface-alignment-board" aria-labelledby="release-surface-alignment-heading">
      <SectionHeading eyebrow="Download / Status / Support alignment" title="Các surface phải cùng nói một sự thật release">
        Người chơi tin website hơn khi Download, Status, Support và Community cùng dẫn về readiness hub và không mâu thuẫn với nhau.
      </SectionHeading>
      <div id="release-surface-alignment-heading" className="lgo-release-surface-list">
        {releaseSurfaceAlignment.map((surface) => (
          <article className="lgo-release-surface-item" key={surface.surface}>
            <div>
              <StatusBadge tone="spirit">{surface.surface}</StatusBadge>
              <h3>{surface.route}</h3>
              <p><strong>Phải nói:</strong> {surface.mustSay}</p>
              <small>{surface.contradictionToAvoid}</small>
            </div>
            <LinkButton href={surface.mustLinkTo} tone="gold">Hub readiness</LinkButton>
          </article>
        ))}
      </div>
    </section>
  );
}

export function ReleaseReadinessHubCta() {
  return (
    <section className="lgo-detail-next-steps lgo-release-readiness-cta" aria-label="Bước tiếp theo readiness phát hành">
      <div>
        <StatusBadge tone="gold">WEB v1.19 hub readiness phát hành</StatusBadge>
        <h2>Trước khi mời test hoặc mở tải game, hãy đọc gate owner và đồng bộ bề mặt.</h2>
        <p>Hub readiness phát hành gom bằng chứng, kỳ vọng tester và đồng bộ Download/Status/Support mà không mở CTA phát hành giả.</p>
      </div>
      <div className="lgo-product-first-actions">
        <LinkButton href="/release/readiness" tone="gold">Readiness phát hành</LinkButton>
        <LinkButton href="/release" tone="spirit">Release narrative</LinkButton>
        <LinkButton href="/download/trust" tone="jade">Tin cậy tải game</LinkButton>
      </div>
    </section>
  );
}
