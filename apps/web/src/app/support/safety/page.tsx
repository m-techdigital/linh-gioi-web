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

export const metadata = { title: "Báo lỗi an toàn" };

const safetyChecklist = [
  { title: "Che mật khẩu", body: "Không gửi mật khẩu trong ảnh chụp, video, log hoặc mô tả lỗi." },
  { title: "Che token", body: "Ẩn token, mã xác thực, mã OTP, mã 2FA và mọi chuỗi dài nhạy cảm." },
  { title: "Mô tả bước tái hiện", body: "Ghi route, thiết bị, trình duyệt và các bước làm lỗi xuất hiện." },
  { title: "Ảnh/log đã che", body: "Chỉ đính kèm ảnh hoặc log đã xóa thông tin riêng tư." },
  { title: "Chờ kênh chính thức", body: "Chỉ gửi qua kênh được công bố, tránh tin nhắn lạ hoặc link giả." }
];

export default function SafetySupportPage() {
  return (
    <WebAppShell>
      <Stack className="lgo-player-facing-stack lgo-service-compact-proof-page lgo-supportsafetypage-stack">
        <GameCard className="lgo-detail-hero-card">
          <StatusBadge tone="jade">WEB v1.148 · báo lỗi an toàn</StatusBadge>
          <span className="lgo-card-kicker">Chưa có ticket thật · chưa tra cứu tài khoản · chưa có bảng kiểm duyệt</span>
          <h1>Báo lỗi an toàn</h1>
          <p className="lgo-hero-lead">
            Trang này giúp người chơi chuẩn bị phản hồi hữu ích mà không gửi dữ liệu nhạy cảm,
            không nhầm roadmap với kênh hỗ trợ backend thật.
          </p>
          <p>
            Website hiện chỉ cung cấp hướng dẫn public tĩnh. Hãy che mật khẩu, token, thông tin cá nhân
            và chỉ gửi phản hồi khi có kênh chính thức được công bố.
          </p>
          <div className="lgo-product-first-actions">
            <LinkButton href="/support" tone="jade">Trạm hỗ trợ</LinkButton>
            <LinkButton href="/guides/player-safety-support-guide" tone="gold">Hướng dẫn an toàn</LinkButton>
            <LinkButton href="/download/trust" tone="spirit">Độ tin cậy tải game</LinkButton>
            <LinkButton href="/support/help" tone="jade">FAQ nhanh</LinkButton>
          </div>
        </GameCard>
        <figure className="lgo-safety-support-design-board lgo-service-proof-board lgo-panel" aria-label="Bảng thiết kế báo lỗi an toàn">
          <img
            src="/design-reference/support-safety-detailed-design-target-v1133.png"
            alt="Thiết kế tiếng Việt cho báo lỗi an toàn và ranh giới dữ liệu"
            loading="eager"
            decoding="async"
          />
          <figcaption>
            <StatusBadge tone="spirit">Board tham chiếu</StatusBadge>
            <strong>Không gửi dữ liệu nhạy cảm khi báo lỗi hoặc góp ý.</strong>
            <span>
              Đích này giữ `/support/safety` thành hướng dẫn an toàn: chưa có ticket thật, chưa có tra cứu tài khoản,
              chưa có bảng kiểm duyệt và không thu dữ liệu riêng tư qua website.
            </span>
          </figcaption>
        </figure>
        <SectionHeading eyebrow="Báo lỗi an toàn" title="Chuẩn bị phản hồi mà không lộ dữ liệu riêng tư">
          Mục tiêu là giúp người chơi gửi mô tả lỗi đúng phạm vi, biết điều gì có thể gửi và điều gì phải che trước khi có kênh hỗ trợ thật.
        </SectionHeading>
        <div className="lgo-support-safety-checklist lgo-support-safety-checklist-grid" aria-label="Hướng dẫn báo lỗi an toàn">
          {safetyChecklist.map((item, index) => (
            <GameCard className="lgo-service-proof-card lgo-support-safety-card" key={item.title}>
              <StatusBadge tone={index % 3 === 0 ? "jade" : index % 3 === 1 ? "gold" : "spirit"}>{item.title}</StatusBadge>
              <p>{item.body}</p>
            </GameCard>
          ))}
        </div>
        <PlayerSafetyPrinciplesBoard />
        <SupportIssuePathBoard />
        <details className="lgo-service-disclosure-stack lgo-support-safety-expanded-evidence">
          <summary>
            <span>Bằng chứng phụ và tuyến liên quan</span>
            <small>Giữ đủ issue category, template phản hồi, readiness, trust, guide, community, accessibility, performance và route continuity nhưng không ép toàn bộ proof board vào first-flow báo lỗi an toàn.</small>
          </summary>
          <div className="lgo-service-disclosure-body">
            <IssueCategoryRouteBoard />
            <SafeFeedbackTemplateBoard />
            <DeviceReportTemplateBoard />
            <ReleaseReadinessHubCta />
            <TesterExpectationCopyBoard />
            <PlayerTrustReleaseCta />
            <ClosedTestReadinessBoard />
            <ContentIaStartCta />
            <FaqHelpfulnessCta />
            <RouteContinuityCta />
            <WorldGameplayLoopCta />
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
            <ClosedTesterInformationPackCta />
          </div>
        </details>
      </Stack>
    </WebAppShell>
  );
}
