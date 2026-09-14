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

export const metadata = { title: "Hành trình phát hành" };

export default function ReleaseNarrativePage() {
  return (
    <WebAppShell>
      <Stack className="lgo-player-facing-stack lgo-releasepage-stack">
        <GameCard className="lgo-detail-hero-card lgo-release-narrative-hero-card">
          <StatusBadge tone="gold">WEB v1.18 hành trình phát hành</StatusBadge>
          <span className="lgo-card-kicker">Không build public · không open beta · không funnel quyền truy cập</span>
          <h1>Hành trình phát hành</h1>
          <p className="lgo-hero-lead">
            Từ sẵn sàng nội dung tới closed test, mọi bước đều cần bằng chứng. Public web có thể đã rõ hơn,
            nhưng chưa đồng nghĩa có bản tải công khai, quyền tài khoản hoặc backend production.
          </p>
          <p>
            Người chơi cần một hành trình phát hành đáng tin: hôm nay có gì, bằng chứng nào còn thiếu, stage kế tiếp là gì,
            và phải đọc Tin cậy tải game, Trạng thái, Hỗ trợ an toàn theo thứ tự nào.
          </p>
          <div className="lgo-product-first-actions">
            <LinkButton href="/download/trust" tone="gold">Tin cậy tải game</LinkButton>
            <LinkButton href="/status" tone="spirit">Bề mặt trạng thái</LinkButton>
            <LinkButton href="/support/safety" tone="jade">Hỗ trợ an toàn</LinkButton>
          </div>
        </GameCard>
        <figure className="lgo-release-narrative-design-board lgo-panel" aria-label="Bảng thiết kế cổng M0 tới M1">
          <img
            src="/game-art/design-boards/release-narrative-m0-to-m1-gate.svg"
            alt="Bảng thiết kế cổng M0 tới M1"
            loading="eager"
          />
          <figcaption>
            <StatusBadge tone="gold">Ảnh tham chiếu game</StatusBadge>
            <strong>M0 → M1 là cổng giai đoạn có bằng chứng, không phải nút mở beta.</strong>
            <span>
              Board này dùng visual thật từ LinhGioiOnline để giải thích staging: sẵn sàng nội dung, kiểm tra tin cậy,
              điều kiện closed test và các non-claim còn giữ trước khi có backend/build được duyệt.
            </span>
          </figcaption>
        </figure>
        <ReleaseNarrativeStageBoard />
        <ReleaseReadinessHubCta />
        <ContentIaStartCta />
        <FaqHelpfulnessCta />
        <RouteContinuityCta />
        <ReleaseReadinessHubBoard />
        <OwnerReleaseGateBoard />
        <PlayerTrustSignalBoard />
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
