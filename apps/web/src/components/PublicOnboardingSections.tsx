import {
  communityFeedbackChannels,
  communityOnboardingPaths,
  roadmapDecisionGates,
  stagedReleaseMessages
} from "@lgo-web/content";
import { GameCard, Grid, LinkButton, SectionHeading, StatusBadge } from "@lgo-web/ui";

function toneForStatus(status: string) {
  if (status === "ready" || status === "public" || status === "công khai" || status === "static-guidance") return "jade" as const;
  if (status === "planned" || status === "internal" || status === "nội bộ") return "gold" as const;
  return "shadow" as const;
}

export function CommunityOnboardingPathBoard() {
  return (
    <section className="lgo-panel lgo-onboarding-paths" aria-labelledby="community-onboarding-paths-heading">
      <SectionHeading eyebrow="WEB v1.11 onboarding" title="Người chơi nên đi theo lộ trình nào trên web">
        Onboarding không phải account flow. Đây là public reading path để người chơi hiểu trạng thái thật trước khi chờ download, test hoặc community backend.
      </SectionHeading>
      <Grid id="community-onboarding-paths-heading">
        {communityOnboardingPaths.map((path) => (
          <GameCard key={path.id} className="lgo-onboarding-card">
            <StatusBadge tone="spirit">{path.audience}</StatusBadge>
            <h3>{path.title}</h3>
            <p><strong>Bước đầu:</strong> {path.firstAction}</p>
            <p><strong>Hiểu đúng:</strong> {path.expectedUnderstanding}</p>
            <small>{path.blockedExpectation}</small>
          </GameCard>
        ))}
      </Grid>
    </section>
  );
}

export function CommunityFeedbackGuidance() {
  return (
    <section className="lgo-panel lgo-feedback-guidance" aria-labelledby="community-feedback-guidance-heading">
      <SectionHeading eyebrow="Community expectation" title="Phản hồi cộng đồng cần có phạm vi an toàn">
        Web hiện chỉ có static guidance. Không có ticket backend, live forum, chat, guild, moderation dashboard hoặc account lookup.
      </SectionHeading>
      <div id="community-feedback-guidance-heading" className="lgo-feedback-channel-list">
        {communityFeedbackChannels.map((channel) => (
          <article className="lgo-feedback-channel" key={channel.channel}>
            <StatusBadge tone={toneForStatus(channel.currentMode)}>{channel.currentMode}</StatusBadge>
            <h3>{channel.channel}</h3>
            <p><strong>Nên chia sẻ:</strong> {channel.whatToShare}</p>
            <p><strong>Không chia sẻ:</strong> {channel.whatNotToShare}</p>
            <small>{channel.nextGate}</small>
          </article>
        ))}
      </div>
    </section>
  );
}

export function RoadmapDecisionGateBoard() {
  return (
    <section className="lgo-panel lgo-roadmap-gates" aria-labelledby="roadmap-decision-gates-heading">
      <SectionHeading eyebrow="Roadmap decision gates" title="Roadmap phải nói rõ ready / planned / blocked">
        Người chơi và owner cần biết gate nào đã sẵn sàng về nội dung, gate nào chỉ planned, và gate nào blocked bởi artifact/backend contract.
      </SectionHeading>
      <div id="roadmap-decision-gates-heading" className="lgo-roadmap-gate-list">
        {roadmapDecisionGates.map((gate) => (
          <article className="lgo-roadmap-gate" key={gate.gate}>
            <StatusBadge tone={toneForStatus(gate.status)}>{gate.status}</StatusBadge>
            <h3>{gate.gate}</h3>
            <p><strong>Owner:</strong> {gate.decisionOwner}</p>
            <p>{gate.publicMessage}</p>
            <p><strong>Ảnh hưởng release:</strong> {gate.releaseImpact}</p>
            <small>{gate.mustNotClaim}</small>
          </article>
        ))}
      </div>
    </section>
  );
}

export function StagedReleaseMessagingBoard() {
  return (
    <section className="lgo-panel lgo-staged-release" aria-labelledby="staged-release-messaging-heading">
      <SectionHeading eyebrow="Staged release messaging" title="Thông điệp public phải đi theo từng stage">
        Không nhảy từ web content-ready sang sẵn sàng phát hành. Mỗi stage giữ public copy, owner checklist và non-claim riêng.
      </SectionHeading>
      <Grid id="staged-release-messaging-heading">
        {stagedReleaseMessages.map((message) => (
          <GameCard key={message.stage} className="lgo-release-stage-card">
            <StatusBadge tone={toneForStatus(message.visibility)}>{message.visibility}</StatusBadge>
            <h3>{message.stage}</h3>
            <p>{message.playerCopy}</p>
            <p><strong>Owner checklist:</strong> {message.ownerChecklist}</p>
            <small>{message.nonClaim}</small>
          </GameCard>
        ))}
      </Grid>
    </section>
  );
}

export function CommunityRoadmapOnboardingCta() {
  return (
    <section className="lgo-onboarding-cta" aria-label="Community roadmap onboarding next actions">
      <div>
        <StatusBadge tone="jade">WEB v1.11 product onboarding</StatusBadge>
        <h2>Community, roadmap, status và download trust giờ được nối thành một hành trình đọc rõ ràng.</h2>
        <p>Runtime/browser/e2e chỉ là guardrail; nội dung chính là giúp người chơi hiểu kỳ vọng đúng trước khi có build hoặc backend thật.</p>
      </div>
      <div className="lgo-product-first-actions">
        <LinkButton href="/community/onboarding" tone="jade">Onboarding cộng đồng</LinkButton>
        <LinkButton href="/roadmap" tone="gold">Roadmap gates</LinkButton>
      </div>
    </section>
  );
}
