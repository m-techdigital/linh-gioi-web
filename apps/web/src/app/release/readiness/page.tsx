import { FaqDiscoveryGroupBoard } from "../../../components/PublicFaqHelpfulnessSections";
import { FaqHelpfulnessCta } from "../../../components/PublicFaqHelpfulnessSections";
import { ClosedTesterChecklistBoard, ClosedTesterInformationPackCta } from "../../../components/PublicClosedTesterInformationPackSections";
import { GameCard, LinkButton, SectionHeading, Stack, StatusBadge } from "@lgo-web/ui";
import { ContentIaStartCta } from "../../../components/PublicContentHubSections";
import { PlayerTrustReleaseCta, ReleaseNarrativeStageBoard, TrustJourneyCheckpointBoard } from "../../../components/PublicPlayerTrustReleaseSections";
import { PlayerSafetySupportCta } from "../../../components/PublicPlayerSafetySections";
import { RouteContinuityCta } from "../../../components/PublicRouteContinuitySections";
import { DownloadTrustCta } from "../../../components/PublicTrustSections";
import {
  OwnerReleaseGateBoard,
  ReleaseReadinessHubBoard,
  ReleaseReadinessHubCta,
  ReleaseSurfaceAlignmentBoard,
  TesterExpectationCopyBoard
} from "../../../components/PublicReleaseReadinessHubSections";
import { WebAppShell } from "../../../components/WebAppShell";

export const metadata = { title: "Sẵn sàng phát hành" };

export default function ReleaseReadinessPage() {
  return (
    <WebAppShell>
      <Stack className="lgo-player-facing-stack lgo-releasereadinesspage-stack lgo-service-compact-proof-page">
        <GameCard className="lgo-detail-hero-card lgo-release-readiness-hero-card">
          <StatusBadge tone="gold">WEB v1.19 sẵn sàng phát hành</StatusBadge>
          <span className="lgo-card-kicker">Cổng owner · kỳ vọng tester · Download/Status/Support · chưa có public build</span>
          <h1>Sẵn sàng phát hành</h1>
          <p className="lgo-hero-lead">
            Trước kỳ vọng test phải có đủ bằng chứng. Linh Giới Online chưa mở bản tải công khai,
            chưa cấp quyền tài khoản và chưa có backend production được duyệt.
          </p>
          <p>
            Page này gom các gate cần đóng trước khi website được phép nói về tải game, closed test,
            tester intake hoặc hỗ trợ thật: bằng chứng trước lời hứa, cùng một sự thật trên mọi bề mặt.
          </p>
          <div className="lgo-product-first-actions lgo-service-status-actions">
            <span className="lgo-service-status-seal">Chưa sẵn sàng phát hành<br /><small>NO_ACCEPTED_BACKEND_CONTRACT</small></span>
            <LinkButton href="/download/trust" tone="gold">Tin cậy tải game</LinkButton>
            <LinkButton href="/status" tone="spirit">Trạng thái</LinkButton>
            <LinkButton href="/support/safety" tone="jade">Hỗ trợ an toàn</LinkButton>
          </div>
        </GameCard>
        <figure className="lgo-release-readiness-design-board lgo-service-proof-board lgo-panel" aria-label="Bảng cổng readiness phát hành">
          <img
            src="/game-art/design-boards/release-readiness-production-board.svg"
            alt="Bảng cổng readiness phát hành"
            loading="eager"
            decoding="async"
          />
          <figcaption>
            <StatusBadge tone="spirit">Ảnh tham chiếu game</StatusBadge>
            <strong>Cổng readiness trước kỳ vọng tester</strong>
            <span>Board LinhGioiOnline mô tả cổng owner, NO_ACCEPTED_BACKEND_CONTRACT và nguyên tắc Không mở funnel giả trước khi có bằng chứng phát hành.</span>
          </figcaption>
        </figure>
        <ReleaseReadinessHubBoard />
        <OwnerReleaseGateBoard />
        <details className="lgo-service-disclosure-stack lgo-release-readiness-expanded-evidence">
          <summary>
            <span>Bằng chứng phụ và tuyến liên quan</span>
            <small>Giữ đủ Content IA, FAQ, closed tester, trust journey và support nhưng không ép toàn bộ proof board vào first-flow readiness.</small>
          </summary>
          <div className="lgo-service-disclosure-body">
            <ContentIaStartCta />
            <FaqHelpfulnessCta />
            <RouteContinuityCta />
            <TesterExpectationCopyBoard />
            <FaqDiscoveryGroupBoard />
            <ClosedTesterChecklistBoard />
            <ReleaseSurfaceAlignmentBoard />
            <ReleaseNarrativeStageBoard />
            <TrustJourneyCheckpointBoard />
            <ReleaseReadinessHubCta />
            <PlayerTrustReleaseCta />
            <DownloadTrustCta />
            <PlayerSafetySupportCta />
            <ClosedTesterInformationPackCta />
          </div>
        </details>
      </Stack>
    </WebAppShell>
  );
}
