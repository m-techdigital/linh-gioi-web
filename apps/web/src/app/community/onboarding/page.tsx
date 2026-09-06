import { ClosedTesterInformationPackCta } from "../../../components/PublicClosedTesterInformationPackSections";
import { GameCard, LinkButton, SectionHeading, Stack, StatusBadge } from "@lgo-web/ui";
import {
  CommunityFeedbackGuidance,
  CommunityOnboardingPathBoard,
  RoadmapDecisionGateBoard,
  StagedReleaseMessagingBoard
} from "../../../components/PublicOnboardingSections";
import { RouteContinuityCta } from "../../../components/PublicRouteContinuitySections";
import { PlayerTrustReleaseCta, ReleaseNarrativeStageBoard } from "../../../components/PublicPlayerTrustReleaseSections";
import { WebAppShell } from "../../../components/WebAppShell";
import { ContentIaStartCta } from "../../../components/PublicContentHubSections";
import { ReleaseReadinessHubCta, TesterExpectationCopyBoard } from "../../../components/PublicReleaseReadinessHubSections";

export const metadata = { title: "Community onboarding" };

export default function CommunityOnboardingPage() {
  return (
    <WebAppShell>
      <Stack>
        <ReleaseReadinessHubCta />
        <TesterExpectationCopyBoard />
        <PlayerTrustReleaseCta />
        <ReleaseNarrativeStageBoard />
        <ContentIaStartCta />
        <RouteContinuityCta />
        <GameCard className="lgo-detail-hero-card">
          <StatusBadge tone="jade">WEB v1.11 community onboarding</StatusBadge>
          <span className="lgo-card-kicker">No live forum · no ticket backend · no fake waitlist</span>
          <h1>Community / roadmap onboarding</h1>
          <p className="lgo-hero-lead">
            Trang này nối community, roadmap, status và download trust thành một hành trình đọc rõ ràng cho người chơi mới và reviewer.
          </p>
          <p>
            Đây là static public guidance. No live community/chat/forum/guild backend, no production auth,
            no DB persistence, no ticket backend, no public download artifact and no CMS are claimed.
          </p>
          <div className="lgo-product-first-actions">
            <LinkButton href="/community" tone="jade">Cộng đồng</LinkButton>
            <LinkButton href="/download/trust" tone="gold">Download trust</LinkButton>
          </div>
        </GameCard>
        <SectionHeading eyebrow="Player reading path" title="Đi theo thứ tự để không hiểu nhầm trạng thái release">
          Người chơi nên đọc status/download trust trước, rồi roadmap gates, support/community expectation và guide onboarding.
        </SectionHeading>
        <CommunityOnboardingPathBoard />
        <RoadmapDecisionGateBoard />
        <CommunityFeedbackGuidance />
        <StagedReleaseMessagingBoard />
              <ClosedTesterInformationPackCta />
        </Stack>
    </WebAppShell>
  );
}
