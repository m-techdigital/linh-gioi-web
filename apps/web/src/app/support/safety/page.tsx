import { IssueCategoryRouteBoard, NoSearchBackendNoteBoard } from "../../../components/PublicFaqHelpfulnessSections";
import { FaqHelpfulnessCta } from "../../../components/PublicFaqHelpfulnessSections";
import { ClosedTesterInformationPackCta, DeviceReportTemplateBoard, SafeFeedbackTemplateBoard } from "../../../components/PublicClosedTesterInformationPackSections";
import { GameCard, LinkButton, SectionHeading, Stack, StatusBadge } from "@lgo-web/ui";
import { ContentIaStartCta } from "../../../components/PublicContentHubSections";
import { CommunityFeedbackGuidance } from "../../../components/PublicOnboardingSections";
import {
  ClosedTestSupportBoard,
  CommunityConductBoard,
  PlayerSafetyPrinciplesBoard,
  PlayerSafetySupportCta,
  SupportIssuePathBoard
} from "../../../components/PublicPlayerSafetySections";
import { DownloadTrustCta } from "../../../components/PublicTrustSections";
import { WorldGameplayLoopCta } from "../../../components/PublicWorldGameplayLoopSections";
import { RouteContinuityCta } from "../../../components/PublicRouteContinuitySections";
import { PlayerTrustReleaseCta, ClosedTestReadinessBoard } from "../../../components/PublicPlayerTrustReleaseSections";
import { WebAppShell } from "../../../components/WebAppShell";
import { AccessibilityReadabilityCta, FocusOrderBoard } from "../../../components/PublicAccessibilityReadabilitySections";
import { PerformanceBudgetCta, MobileDensityBudgetBoard } from "../../../components/PublicPerformanceBudgetSections";
import { ReleaseReadinessHubCta, TesterExpectationCopyBoard } from "../../../components/PublicReleaseReadinessHubSections";

export const metadata = { title: "Safety support" };

export default function SafetySupportPage() {
  return (
    <WebAppShell>
      <Stack>
        <ReleaseReadinessHubCta />
        <TesterExpectationCopyBoard />
        <PlayerTrustReleaseCta />
        <ClosedTestReadinessBoard />
        <ContentIaStartCta />
        <FaqHelpfulnessCta />
        <RouteContinuityCta />
        <WorldGameplayLoopCta />
        <GameCard className="lgo-detail-hero-card">
          <StatusBadge tone="jade">WEB v1.14 player safety / support FAQ polish</StatusBadge>
          <span className="lgo-card-kicker">No live ticket · no account lookup · no moderation backend</span>
          <h1>Safety support cho người chơi mới</h1>
          <p className="lgo-hero-lead">
            Trang này giải thích cách báo lỗi, góp ý và chuẩn bị closed-test support theo hướng an toàn dữ liệu.
          </p>
          <p>
            Đây là static public guidance. Không có support ticket backend, account recovery, moderation dashboard,
            forum/chat/guild live system hoặc production support SLA trong web repo hiện tại.
          </p>
          <div className="lgo-product-first-actions">
            <LinkButton href="/support" tone="jade">Support FAQ</LinkButton>
            <LinkButton href="/guides/player-safety-support-guide" tone="gold">Safety guide</LinkButton>
            <LinkButton href="/download/trust" tone="spirit">Download trust</LinkButton>
            <LinkButton href="/accessibility" tone="jade">Đọc dễ hơn</LinkButton>
            <LinkButton href="/performance" tone="spirit">Hiệu năng/copy budget</LinkButton>
          </div>
        </GameCard>
        <SectionHeading eyebrow="Product-first support" title="Hỗ trợ phải rõ, thân thiện và không hứa backend giả">
          Runtime/browser/e2e chỉ là guardrail nội bộ. Nội dung chính là player-facing safety/support expectation cho closed testing sau này.
        </SectionHeading>
        <PlayerSafetyPrinciplesBoard />
        <SupportIssuePathBoard />
        <IssueCategoryRouteBoard />
        <NoSearchBackendNoteBoard />
        <ClosedTestSupportBoard />
        <CommunityConductBoard />
        <CommunityFeedbackGuidance />
        <AccessibilityReadabilityCta />
        <FocusOrderBoard />
        <MobileDensityBudgetBoard />
        <PerformanceBudgetCta />
        <DownloadTrustCta />
        <PlayerSafetySupportCta />
              <SafeFeedbackTemplateBoard />
        <DeviceReportTemplateBoard />
        <ClosedTesterInformationPackCta />
        </Stack>
    </WebAppShell>
  );
}
