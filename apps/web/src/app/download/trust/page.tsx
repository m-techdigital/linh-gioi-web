import { FaqHelpfulnessCta } from "../../../components/PublicFaqHelpfulnessSections";
import { ClosedTesterInformationPackCta } from "../../../components/PublicClosedTesterInformationPackSections";
import { GameCard, LinkButton, SectionHeading, Stack, StatusBadge } from "@lgo-web/ui";
import { DownloadExplanationDepth } from "../../../components/PublicDetailSections";
import { DownloadStatusDepth } from "../../../components/PublicGameInfoDepthSections";
import {
  DownloadTrustCta,
  DownloadTrustGateBoard,
  ReleaseEvidenceChecklist,
  StatusTrustBoard
} from "../../../components/PublicTrustSections";
import { WorldGameplayLoopCta } from "../../../components/PublicWorldGameplayLoopSections";
import { PlayerSafetySupportCta } from "../../../components/PublicPlayerSafetySections";
import { RouteContinuityCta } from "../../../components/PublicRouteContinuitySections";
import { WebAppShell } from "../../../components/WebAppShell";
import { ContentIaStartCta } from "../../../components/PublicContentHubSections";
import { StagedReleaseMessagingBoard, RoadmapDecisionGateBoard } from "../../../components/PublicOnboardingSections";
import { PlayerTrustReleaseCta, ReleaseNarrativeStageBoard } from "../../../components/PublicPlayerTrustReleaseSections";
import { PerformanceBudgetCta, StaticRouteCompositionBoard } from "../../../components/PublicPerformanceBudgetSections";
import { ReleaseReadinessHubCta, OwnerReleaseGateBoard } from "../../../components/PublicReleaseReadinessHubSections";

export const metadata = { title: "Download trust" };

export default function DownloadTrustPage() {
  return (
    <WebAppShell>
      <Stack>
        <ReleaseReadinessHubCta />
        <OwnerReleaseGateBoard />
        <PlayerTrustReleaseCta />
        <ReleaseNarrativeStageBoard />
        <ContentIaStartCta />
        <FaqHelpfulnessCta />
        <RouteContinuityCta />
        <WorldGameplayLoopCta />
        <PlayerSafetySupportCta />
        <GameCard className="lgo-detail-hero-card">
          <StatusBadge tone="gold">WEB v1.11 staged release messaging · WEB v1.10 download trust</StatusBadge>
          <span className="lgo-card-kicker">No fake download · no placeholder checksum · no entitlement claim</span>
          <h1>Download trust / checksum / provenance</h1>
          <p className="lgo-hero-lead">
            Trang này giải thích vì sao Linh Giới Online chưa hiển thị link tải public, và bằng chứng nào phải có trước khi download CTA được mở.
          </p>
          <p>
            Đây là static public guidance. No public game download artifact, no production auth, no DB persistence,
            no real portal entitlement and no production deployment are claimed.
          </p>
          <div className="lgo-product-first-actions">
            <LinkButton href="/download" tone="gold">Trạng thái tải game</LinkButton>
            <LinkButton href="/guides/release-trust-and-checksum-guide" tone="jade">Release trust guide</LinkButton>
          </div>
        </GameCard>
        <SectionHeading eyebrow="Trust-first download" title="Người chơi cần bằng chứng trước khi tải">
          Runtime/browser/e2e chỉ là guardrail nội bộ. Public download cần artifact thật, SHA256, provenance, known limitations và support expectation.
        </SectionHeading>
        <PerformanceBudgetCta />
        <DownloadTrustGateBoard />
        <ReleaseEvidenceChecklist />
        <DownloadStatusDepth />
        <DownloadExplanationDepth />
        <StatusTrustBoard />
        <StaticRouteCompositionBoard />
        <RoadmapDecisionGateBoard />
        <StagedReleaseMessagingBoard />
        <DownloadTrustCta />
              <ClosedTesterInformationPackCta />
        </Stack>
    </WebAppShell>
  );
}
