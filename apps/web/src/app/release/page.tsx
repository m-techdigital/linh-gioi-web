import { FaqHelpfulnessCta } from "../../components/PublicFaqHelpfulnessSections";
import { ClosedTesterInformationPackCta } from "../../components/PublicClosedTesterInformationPackSections";
import { GameCard, LinkButton, SectionHeading, Stack, StatusBadge } from "@lgo-web/ui";
import { AccessibilityReadabilityCta } from "../../components/PublicAccessibilityReadabilitySections";
import { ContentIaStartCta } from "../../components/PublicContentHubSections";
import { PerformanceBudgetCta } from "../../components/PublicPerformanceBudgetSections";
import { PlayerSafetySupportCta } from "../../components/PublicPlayerSafetySections";
import {
  ClosedTestReadinessBoard,
  PlayerTrustReleaseCta,
  PlayerTrustSignalBoard,
  ReleaseNarrativeStageBoard,
  TrustJourneyCheckpointBoard
} from "../../components/PublicPlayerTrustReleaseSections";
import { RouteContinuityCta } from "../../components/PublicRouteContinuitySections";
import { DownloadTrustCta } from "../../components/PublicTrustSections";
import { WorldGameplayLoopCta } from "../../components/PublicWorldGameplayLoopSections";
import { WebAppShell } from "../../components/WebAppShell";
import { ReleaseReadinessHubCta, ReleaseReadinessHubBoard, OwnerReleaseGateBoard } from "../../components/PublicReleaseReadinessHubSections";

export const metadata = { title: "Release narrative / player trust" };

export default function ReleaseNarrativePage() {
  return (
    <WebAppShell>
      <Stack>
        <ContentIaStartCta />
        <FaqHelpfulnessCta />
        <RouteContinuityCta />
        <GameCard className="lgo-detail-hero-card lgo-release-narrative-hero-card">
          <StatusBadge tone="gold">WEB v1.18 player trust / staged release narrative</StatusBadge>
          <span className="lgo-card-kicker">No public build · no open beta · no entitlement funnel</span>
          <h1>Release narrative: từ content-ready tới closed test</h1>
          <p className="lgo-hero-lead">
            Trang này giải thích vì sao public web đã có nhiều nội dung nhưng vẫn chưa đồng nghĩa có bản tải public,
            closed test, account entitlement hoặc production backend.
          </p>
          <p>
            Người chơi cần một câu chuyện release đáng tin: hôm nay có gì, bằng chứng nào còn thiếu, stage kế tiếp là gì,
            và phải đọc Download Trust, Status, Support Safety theo thứ tự nào.
          </p>
          <div className="lgo-product-first-actions">
            <LinkButton href="/download/trust" tone="gold">Download trust</LinkButton>
            <LinkButton href="/status" tone="spirit">Status surfaces</LinkButton>
            <LinkButton href="/support/safety" tone="jade">Safety support</LinkButton>
          </div>
        </GameCard>
        <SectionHeading eyebrow="Player trust first" title="Release wording phải chứng minh trước, rồi mới hứa sau">
          v1.18 tập trung vào product web: player trust, closed-test readiness, staged release messaging và route clarity giữa download/status/support.
        </SectionHeading>
        <ReleaseReadinessHubCta />
        <ReleaseReadinessHubBoard />
        <OwnerReleaseGateBoard />
        <PlayerTrustSignalBoard />
        <ReleaseNarrativeStageBoard />
        <ClosedTestReadinessBoard />
        <TrustJourneyCheckpointBoard />
        <PlayerTrustReleaseCta />
        <DownloadTrustCta />
        <WorldGameplayLoopCta />
        <PlayerSafetySupportCta />
        <AccessibilityReadabilityCta />
        <PerformanceBudgetCta />
              <ClosedTesterInformationPackCta />
        </Stack>
    </WebAppShell>
  );
}
