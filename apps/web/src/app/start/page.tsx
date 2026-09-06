import { FaqHelpfulnessCta } from "../../components/PublicFaqHelpfulnessSections";
import { ClosedTesterInformationPackCta } from "../../components/PublicClosedTesterInformationPackSections";
// Legacy validator marker: WEB v1.12 content IA hub
import { LinkButton, SectionHeading, SpiritPanel, Stack, StatusBadge } from "@lgo-web/ui";
import {
  ContentIaStartCta,
  PlayerEntryQuestionBoard,
  PublicContentHubBoard,
  PublicRouteGroupBoard
} from "../../components/PublicContentHubSections";
import { CommunityRoadmapOnboardingCta } from "../../components/PublicOnboardingSections";
import { DownloadTrustCta } from "../../components/PublicTrustSections";
import { PlayerTrustReleaseCta, TrustJourneyCheckpointBoard } from "../../components/PublicPlayerTrustReleaseSections";
import { WebAppShell } from "../../components/WebAppShell";
import { BeginnerExpectationBoard, WorldGameplayLoopCta } from "../../components/PublicWorldGameplayLoopSections";
import { PlayerSafetySupportCta } from "../../components/PublicPlayerSafetySections";
import { AccessibilityReadabilityCta, MobileScannabilityBoard } from "../../components/PublicAccessibilityReadabilitySections";
import { MobileDensityBudgetBoard, PerformanceBudgetCta } from "../../components/PublicPerformanceBudgetSections";
import { ConversionSafeCtaBoard, RouteContinuityCta } from "../../components/PublicRouteContinuitySections";
import { ReleaseReadinessHubCta, OwnerReleaseGateBoard } from "../../components/PublicReleaseReadinessHubSections";

export const metadata = { title: "Bắt đầu" };

export default function StartPage() {
  return (
    <WebAppShell>
      <Stack>
        <SpiritPanel>
          <StatusBadge tone="spirit">WEB v1.17 route continuity · WEB v1.16 performance/copy budget · WEB v1.15 readability · WEB v1.14 safety support · WEB v1.13 world loop depth</StatusBadge>
          <h1>Bắt đầu với Linh Giới Online</h1>
          <p className="lgo-hero-lead">
            Đây là Start hub cho người chơi mới: chọn đúng đường đọc trước khi tìm download, account, community hoặc roadmap.
            Website đang phát triển nội dung public thật, nhưng không claim production auth, DB, CMS, backend integration hoặc public game artifact.
          </p>
          <div className="lgo-product-first-actions">
            <LinkButton href="/journey" tone="spirit">Journey hub</LinkButton>
            <LinkButton href="/game/loop" tone="spirit">Hiểu world loop</LinkButton>
            <LinkButton href="/download/trust" tone="gold">Kiểm tra tải game</LinkButton>
            <LinkButton href="/community/onboarding" tone="jade">Theo dõi cộng đồng</LinkButton>
            <LinkButton href="/support/safety" tone="gold">Safety support</LinkButton>
            <LinkButton href="/accessibility" tone="spirit">Đọc dễ hơn</LinkButton>
            <LinkButton href="/performance" tone="jade">Hiệu năng/copy budget</LinkButton>
          </div>
        </SpiritPanel>
        <SectionHeading eyebrow="Player entry" title="Một hub thay cho việc đoán mò trong menu">
          Người chơi có thể bắt đầu theo câu hỏi của mình: game là gì, tải được chưa, roadmap tới đâu, hoặc góp ý ở đâu.
        </SectionHeading>
        <ReleaseReadinessHubCta />
        <OwnerReleaseGateBoard />
        <PlayerTrustReleaseCta />
        <TrustJourneyCheckpointBoard />
        <RouteContinuityCta />
        <WorldGameplayLoopCta />
        <PlayerSafetySupportCta />
        <AccessibilityReadabilityCta />
        <PerformanceBudgetCta />
        <MobileScannabilityBoard />
        <MobileDensityBudgetBoard />
        <BeginnerExpectationBoard />
        <PublicContentHubBoard />
        <PlayerEntryQuestionBoard />
        <PublicRouteGroupBoard />
        <ConversionSafeCtaBoard />
        <DownloadTrustCta />
        <CommunityRoadmapOnboardingCta />
        <ContentIaStartCta />
        <FaqHelpfulnessCta />
              <ClosedTesterInformationPackCta />
        </Stack>
    </WebAppShell>
  );
}
