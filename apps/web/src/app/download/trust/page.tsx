import { FaqHelpfulnessCta } from "../../../components/PublicFaqHelpfulnessSections";
import { ClosedTesterInformationPackCta } from "../../../components/PublicClosedTesterInformationPackSections";
import { GameCard, LinkButton, SectionHeading, Stack, StatusBadge } from "@lgo-web/ui";
import { DownloadExplanationDepth } from "../../../components/PublicDetailSections";
import { DownloadStatusDepth } from "../../../components/PublicGameInfoDepthSections";
import {
  DownloadTrustCta,
  DownloadTrustGateBoard,
  ReleaseEvidenceChecklist,
  ReleaseTrustDesignBoard,
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

export const metadata = { title: "Tin cậy tải game" };

export default function DownloadTrustPage() {
  return (
    <WebAppShell>
      <Stack className="lgo-player-facing-stack lgo-downloadtrustpage-stack">
        <GameCard className="lgo-detail-hero-card lgo-download-trust-hero-card">
          <StatusBadge tone="gold">Cổng kiểm tin tải game · Không mở link khi chưa có build thật</StatusBadge>
          <span className="lgo-card-kicker">Không tải giả · không SHA256 giả · không claim quyền truy cập</span>
          <h1>Tin cậy tải game</h1>
          <p className="lgo-hero-lead">
            Trang này giải thích vì sao Linh Giới Online chưa hiển thị link tải công khai, và bằng chứng nào phải có trước khi CTA tải game được mở.
          </p>
          <p>
            Đây là hướng dẫn public tĩnh. Hiện chưa có gói tải game công khai, chưa có xác thực production,
            chưa có DB persistence, chưa có quyền Portal thật và chưa claim triển khai production.
          </p>
          <div className="lgo-product-first-actions">
            <LinkButton href="/download" tone="gold">Trạng thái tải game</LinkButton>
            <LinkButton href="/guides/release-trust-and-checksum-guide" tone="jade">Hướng dẫn tin cậy phát hành</LinkButton>
          </div>
        </GameCard>
        <DownloadTrustGateBoard />
        <SectionHeading eyebrow="Tin cậy trước khi tải" title="Vì sao cần trang này">
          Runtime/browser/e2e chỉ là guardrail nội bộ. Tải công khai cần gói phát hành thật, SHA256, nguồn gốc, giới hạn đã biết và kỳ vọng hỗ trợ.
        </SectionHeading>
        <div className="lgo-download-trust-first-gates">
          <ReleaseReadinessHubCta />
          <OwnerReleaseGateBoard />
        </div>
        <ReleaseEvidenceChecklist />
        <DownloadStatusDepth />
        <DownloadTrustCta />

        <details className="lgo-service-disclosure-stack lgo-download-trust-secondary">
          <summary>
            <span>Bằng chứng phụ và tuyến liên quan</span>
            <small>
              Giữ đủ hướng dẫn, route continuity, performance, roadmap và hỗ trợ tester nhưng không ép toàn bộ proof board vào luồng tin cậy tải game chính.
            </small>
          </summary>
          <div className="lgo-service-disclosure-body">
            <PlayerTrustReleaseCta />
            <ReleaseNarrativeStageBoard />
            <ContentIaStartCta />
            <FaqHelpfulnessCta />
            <RouteContinuityCta />
            <WorldGameplayLoopCta />
            <PlayerSafetySupportCta />
            <ReleaseTrustDesignBoard />
            <PerformanceBudgetCta />
            <DownloadExplanationDepth />
            <StatusTrustBoard />
            <StaticRouteCompositionBoard />
            <RoadmapDecisionGateBoard />
            <StagedReleaseMessagingBoard />
            <ClosedTesterInformationPackCta />
          </div>
        </details>
      </Stack>
    </WebAppShell>
  );
}
