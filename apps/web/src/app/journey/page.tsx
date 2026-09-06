import { FaqHelpfulnessCta } from "../../components/PublicFaqHelpfulnessSections";
import { ClosedTesterInformationPackCta } from "../../components/PublicClosedTesterInformationPackSections";
import { GameCard, LinkButton, SectionHeading, Stack, StatusBadge } from "@lgo-web/ui";
import { AccessibilityReadabilityCta } from "../../components/PublicAccessibilityReadabilitySections";
import { ContentIaStartCta } from "../../components/PublicContentHubSections";
import { PerformanceBudgetCta } from "../../components/PublicPerformanceBudgetSections";
import { PlayerSafetySupportCta } from "../../components/PublicPlayerSafetySections";
import {
  ConversionSafeCtaBoard,
  JourneyFrictionBoard,
  PageCohesionCheckpointBoard,
  RouteContinuityBridgeBoard,
  RouteContinuityCta
} from "../../components/PublicRouteContinuitySections";
import { DownloadTrustCta } from "../../components/PublicTrustSections";
import { WorldGameplayLoopCta } from "../../components/PublicWorldGameplayLoopSections";
import { PlayerTrustReleaseCta, TrustJourneyCheckpointBoard } from "../../components/PublicPlayerTrustReleaseSections";
import { WebAppShell } from "../../components/WebAppShell";
import { ReleaseReadinessHubCta } from "../../components/PublicReleaseReadinessHubSections";

export const metadata = { title: "Journey / route continuity" };

export default function JourneyPage() {
  return (
    <WebAppShell>
      <Stack>
        <ReleaseReadinessHubCta />
        <PlayerTrustReleaseCta />
        <TrustJourneyCheckpointBoard />
        <GameCard className="lgo-detail-hero-card lgo-route-continuity-hero-card">
          <StatusBadge tone="spirit">WEB v1.17 route continuity / conversion-safe polish</StatusBadge>
          <span className="lgo-card-kicker">No fake funnel · no public artifact · no ticket/account backend</span>
          <h1>Journey hub: đi tiếp đúng hướng, không bấm nhầm CTA giả</h1>
          <p className="lgo-hero-lead">
            Trang này nối các route public thành hành trình đọc an toàn: Start, World Loop, Download Trust, Status,
            Support Safety, Community Onboarding, Accessibility và Performance.
          </p>
          <p>
            v1.17 tập trung vào trải nghiệm web thật: CTA hierarchy, page-to-page cohesion và conversion-safe wording. Không thêm backend,
            không tạo download/account/support flow giả và không claim production release.
          </p>
          <div className="lgo-product-first-actions">
            <LinkButton href="/start" tone="spirit">Start hub</LinkButton>
            <LinkButton href="/game/loop" tone="jade">World Loop</LinkButton>
            <LinkButton href="/download/trust" tone="gold">Download Trust</LinkButton>
            <LinkButton href="/support/safety" tone="jade">Safety Support</LinkButton>
          </div>
        </GameCard>
        <SectionHeading eyebrow="Player journey" title="Route nào trả lời câu hỏi nào, và đi đâu tiếp">
          Người chơi cần lộ trình rõ hơn là một menu dài. Journey hub đặt câu hỏi, route tiếp theo và boundary cạnh từng CTA nhạy cảm.
        </SectionHeading>
        <RouteContinuityBridgeBoard />
        <ConversionSafeCtaBoard />
        <JourneyFrictionBoard />
        <PageCohesionCheckpointBoard />
        <RouteContinuityCta />
        <WorldGameplayLoopCta />
        <DownloadTrustCta />
        <PlayerSafetySupportCta />
        <AccessibilityReadabilityCta />
        <PerformanceBudgetCta />
        <ContentIaStartCta />
        <FaqHelpfulnessCta />
              <ClosedTesterInformationPackCta />
        </Stack>
    </WebAppShell>
  );
}
