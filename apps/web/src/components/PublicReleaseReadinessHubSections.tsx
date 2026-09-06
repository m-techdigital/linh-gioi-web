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
      <SectionHeading eyebrow="WEB v1.19 release readiness" title="Một hub để đọc release gates trước mọi CTA nhạy cảm">
        Release readiness không phải nút tải hay đăng ký test. Đây là bản đồ proof-before-claim cho Download, Status, Support và Community.
      </SectionHeading>
      <Grid id="release-readiness-hub-heading">
        {releaseReadinessHubItems.map((item) => (
          <GameCard className="lgo-release-readiness-card" key={item.id}>
            <StatusBadge tone="gold">{item.title}</StatusBadge>
            <h3>{item.playerQuestion}</h3>
            <p>{item.readinessAnswer}</p>
            <p><strong>Owner evidence:</strong> {item.ownerEvidence}</p>
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
      <SectionHeading eyebrow="Owner gates" title="Không chuyển wording sang release nếu gate owner chưa có proof">
        Mỗi gate cần owner, proof và player-visible rule. Đây là cách giữ website đáng tin trước closed test hoặc public artifact.
      </SectionHeading>
      <Grid id="owner-release-gate-heading">
        {ownerReleaseGates.map((gate) => (
          <GameCard className="lgo-owner-release-gate-card" key={gate.gate}>
            <StatusBadge tone={toneForState(gate.currentState)}>{gate.currentState}</StatusBadge>
            <h3>{gate.gate}</h3>
            <p><strong>Owner:</strong> {gate.owner}</p>
            <p><strong>Proof:</strong> {gate.proofRequired}</p>
            <p><strong>Public rule:</strong> {gate.playerVisibleRule}</p>
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
            <LinkButton href={surface.mustLinkTo} tone="gold">Readiness hub</LinkButton>
          </article>
        ))}
      </div>
    </section>
  );
}

export function ReleaseReadinessHubCta() {
  return (
    <section className="lgo-detail-next-steps lgo-release-readiness-cta" aria-label="Release readiness next steps">
      <div>
        <StatusBadge tone="gold">WEB v1.19 release readiness hub</StatusBadge>
        <h2>Trước khi mời test hoặc mở download, hãy đọc owner gates và surface alignment.</h2>
        <p>Release readiness hub gom bằng chứng, tester expectation và Download/Status/Support alignment mà không mở CTA release giả.</p>
      </div>
      <div className="lgo-product-first-actions">
        <LinkButton href="/release/readiness" tone="gold">Release readiness</LinkButton>
        <LinkButton href="/release" tone="spirit">Release narrative</LinkButton>
        <LinkButton href="/download/trust" tone="jade">Download trust</LinkButton>
      </div>
    </section>
  );
}
