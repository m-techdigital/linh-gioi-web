import { FaqDiscoveryGroupBoard, IssueCategoryRouteBoard } from "../../../components/PublicFaqHelpfulnessSections";
import { FaqHelpfulnessCta } from "../../../components/PublicFaqHelpfulnessSections";
import { GameCard, LinkButton, SectionHeading, Stack, StatusBadge } from "@lgo-web/ui";
import { AccessibilityReadabilityCta } from "../../../components/PublicAccessibilityReadabilitySections";
import { ContentIaStartCta } from "../../../components/PublicContentHubSections";
import { ClosedTesterChecklistBoard, ClosedTesterInformationPackCta, DeviceReportTemplateBoard, KnownLimitationNotesBoard, SafeFeedbackTemplateBoard } from "../../../components/PublicClosedTesterInformationPackSections";
import { PerformanceBudgetCta } from "../../../components/PublicPerformanceBudgetSections";
import { PlayerSafetySupportCta } from "../../../components/PublicPlayerSafetySections";
import { PlayerTrustReleaseCta } from "../../../components/PublicPlayerTrustReleaseSections";
import { ReleaseReadinessHubCta, TesterExpectationCopyBoard } from "../../../components/PublicReleaseReadinessHubSections";
import { RouteContinuityCta } from "../../../components/PublicRouteContinuitySections";
import { WebAppShell } from "../../../components/WebAppShell";

export const metadata = { title: "Gói tester cộng đồng" };

export default function ClosedTesterInformationPackPage() {
  return (
    <WebAppShell>
      <Stack className="lgo-player-facing-stack lgo-service-compact-proof-page lgo-testerpackpage-stack">
        <GameCard className="lgo-detail-hero-card lgo-closed-tester-hero-card">
          <StatusBadge tone="gold">WEB v1.144 gói tester cộng đồng</StatusBadge>
          <span className="lgo-card-kicker">Checklist · feedback an toàn · giới hạn rõ ràng · chưa mở intake</span>
          <h1>Gói tester cộng đồng</h1>
          <p className="lgo-hero-lead">Trang này giúp người chơi chuẩn bị cho closed test sau này: đọc checklist, biết cách ghi feedback an toàn, nắm giới hạn hiện tại và không gửi nhầm dữ liệu nhạy cảm.</p>
          <p>Hiện chưa có form đăng ký, chưa bảo đảm slot tester và chưa có backend thu nhận feedback. Khi owner mở kênh chính thức, page này là bộ hướng dẫn để gửi đúng phạm vi.</p>
          <div className="lgo-product-first-actions lgo-service-status-actions" aria-label="Trạng thái gói tester">
            <span className="lgo-service-status-seal">Chưa mở intake<small>Không có form đăng ký</small></span>
            <span className="lgo-service-status-seal">Không hứa slot<small>Không tự động cấp quyền</small></span>
            <span className="lgo-service-status-seal">Feedback an toàn<small>Không gửi dữ liệu nhạy cảm</small></span>
          </div>
        </GameCard>
        <figure className="lgo-closed-tester-design-board lgo-service-proof-board lgo-panel" aria-label="Board gói tester cộng đồng">
          <img src="/game-art/design-boards/closed-tester-production-board.svg" alt="Board gói tester cộng đồng" loading="eager" />
          <figcaption>
            <StatusBadge tone="gold">Board tham chiếu</StatusBadge>
            <strong>Tester pack là checklist an toàn trước intake, không phải form đăng ký.</strong>
            <span>Board này nối báo cáo thiết bị, giới hạn đã biết và feedback an toàn mà không claim intake thật, slot tester hoặc backend thu thập dữ liệu.</span>
          </figcaption>
        </figure>
        <SectionHeading eyebrow="Hướng dẫn tester trước intake" title="Chuẩn bị static trước, kênh chính thức sau">v1.144 biến tester pack thành luồng đọc gọn: checklist chuẩn bị, mẫu feedback an toàn, giới hạn đã biết và mẫu báo cáo thiết bị.</SectionHeading>
        <ClosedTesterChecklistBoard />
        <SafeFeedbackTemplateBoard />
        <KnownLimitationNotesBoard />
        <DeviceReportTemplateBoard />
        <ContentIaStartCta />
        <FaqHelpfulnessCta />
        <RouteContinuityCta />
        <FaqDiscoveryGroupBoard />
        <IssueCategoryRouteBoard />
        <TesterExpectationCopyBoard />
        <ClosedTesterInformationPackCta />
        <ReleaseReadinessHubCta />
        <PlayerTrustReleaseCta />
        <PlayerSafetySupportCta />
        <AccessibilityReadabilityCta />
        <PerformanceBudgetCta />
      </Stack>
    </WebAppShell>
  );
}
