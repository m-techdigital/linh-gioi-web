import {
  ownerReleaseGates,
  releaseReadinessHubItems,
  releaseSurfaceAlignment,
  testerExpectationCopy
} from "@lgo-web/content";
import { GameCard, Grid, LinkButton, SectionHeading, StatusBadge, ReleaseGateCard } from "@lgo-web/ui";

import { readinessGatePresentation, readinessState } from "./PublicReleaseReadinessExperience";

function toneForState(value: string) {
  if (value === "ready-copy") return "jade" as const;
  if (value === "planned") return "gold" as const;
  if (value === "/release/readiness") return "spirit" as const;
  return "shadow" as const;
}

function labelForState(value: string) {
  if (value === "ready-copy") return "ĐANG DUYỆT";
  if (value === "planned") return "ĐANG LÊN KẾ HOẠCH";
  if (value === "blocked") return "BỊ CHẶN";
  return value;
}

export function ReleaseReadinessHubBoard() {
  return (
    <section className="lgo-panel lgo-release-readiness-hub-board lgo-service-proof-card-grid" aria-labelledby="release-readiness-hub-heading">
      <SectionHeading headingId="release-readiness-hub-heading" eyebrow="Cổng readiness" title="Đọc gate phát hành trước mọi CTA nhạy cảm">
        Chưa sẵn sàng phát hành. Đây là bản đồ bằng chứng trước lời hứa cho Tải game, Trạng thái, Hỗ trợ và Cộng đồng.
      </SectionHeading>
      <Grid id="release-readiness-hub-heading-items">
        {releaseReadinessHubItems.map((item) => (
          <GameCard className="lgo-release-readiness-card lgo-service-proof-card" key={item.id}>
            <StatusBadge tone="gold">{item.title}</StatusBadge>
            <h3>{item.playerQuestion}</h3>
            <p>{item.readinessAnswer}</p>
            <p><strong>Bằng chứng owner:</strong> {item.ownerEvidence}</p>
            <small>{item.blockedClaim}</small>
            <LinkButton href={item.route} tone="spirit">Đọc bề mặt liên quan</LinkButton>
          </GameCard>
        ))}
      </Grid>
    </section>
  );
}

export function OwnerReleaseGateBoard({ presentation = "standard" }: { presentation?: "standard" | "release" } = {}) {
  if (presentation === "release") return (
    <section id="owner-release-gates" className="lgo-release-owner-section" aria-labelledby="owner-release-gate-heading">
      <div className="lgo-release-section-heading"><SectionHeading headingId="owner-release-gate-heading" eyebrow="Các điều kiện còn phải hoàn tất" title="Cổng owner" />
        <p>Mỗi cổng cần bằng chứng và phê duyệt riêng.<br />Đang duyệt không đồng nghĩa với sẵn sàng.</p></div>
      <div className="lgo-release-owner-grid">{ownerReleaseGates.map((gate,index) => {
        const status = readinessState(gate.currentState);
        return <ReleaseGateCard key={gate.gate} id={`release-gate-${index+1}`} title={gate.gate}
          icon={readinessGatePresentation[index]?.icon ?? "shield"} state={status.state} stateLabel={status.label}
          owner={gate.owner} evidence={gate.proofRequired} rule={gate.playerVisibleRule} boundary={gate.mustNotSkip} />;
      })}</div>
    </section>
  );
  return (
    <section className="lgo-panel lgo-owner-release-gate-board lgo-service-proof-card-grid" aria-labelledby="owner-release-gate-heading">
      <SectionHeading headingId="owner-release-gate-heading" eyebrow="Cổng owner" title="Không chuyển sang wording phát hành nếu owner chưa duyệt">
        Mọi vùng trọng yếu cần owner review trước khi mở kỳ vọng test. Đây là cách giữ website đáng tin trước closed test hoặc gói build công khai.
      </SectionHeading>
      <Grid id="owner-release-gate-heading-items">
        {ownerReleaseGates.map((gate) => (
          <GameCard className="lgo-owner-release-gate-card lgo-service-proof-card" key={gate.gate}>
            <StatusBadge tone={toneForState(gate.currentState)}>{labelForState(gate.currentState)}</StatusBadge>
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
      <SectionHeading headingId="tester-expectation-heading" eyebrow="Kỳ vọng tester" title="Wording closed test phải bảo vệ người chơi trước intake thật">
        Copy tester chỉ nên nói cách chuẩn bị và giới hạn hiện tại, không hứa quyền truy cập, khôi phục tài khoản, reward hoặc SLA.
      </SectionHeading>
      <Grid id="tester-expectation-heading-items">
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
      <SectionHeading headingId="release-surface-alignment-heading" eyebrow="Download / Status / Support" title="Các bề mặt phải cùng nói một sự thật phát hành">
        Người chơi tin website hơn khi Tải game, Trạng thái, Hỗ trợ và Cộng đồng cùng dẫn về cổng readiness và không mâu thuẫn với nhau.
      </SectionHeading>
      <div id="release-surface-alignment-heading-items" className="lgo-release-surface-list">
        {releaseSurfaceAlignment.map((surface) => (
          <article className="lgo-release-surface-item" key={surface.surface}>
            <div>
              <StatusBadge tone="spirit">{surface.surface}</StatusBadge>
              <h3>{surface.route}</h3>
              <p><strong>Phải nói:</strong> {surface.mustSay}</p>
              <small>{surface.contradictionToAvoid}</small>
            </div>
            <LinkButton href={surface.mustLinkTo} tone="gold">Cổng readiness</LinkButton>
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
        <LinkButton href="/release/readiness" tone="gold">Sẵn sàng phát hành</LinkButton>
        <LinkButton href="/release" tone="spirit">Hành trình phát hành</LinkButton>
        <LinkButton href="/download/trust" tone="jade">Tin cậy tải game</LinkButton>
      </div>
    </section>
  );
}
