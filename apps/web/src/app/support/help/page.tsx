import { ClosedTesterInformationPackCta } from "../../../components/PublicClosedTesterInformationPackSections";
import { AccessibilityReadabilityCta } from "../../../components/PublicAccessibilityReadabilitySections";
import {
  FaqDiscoveryGroupBoard,
  FaqHelpfulnessCta,
  FaqHelpfulnessPromptBoard,
  IssueCategoryRouteBoard,
  NoSearchBackendNoteBoard
} from "../../../components/PublicFaqHelpfulnessSections";
import { PerformanceBudgetCta } from "../../../components/PublicPerformanceBudgetSections";
import { PlayerSafetySupportCta } from "../../../components/PublicPlayerSafetySections";
import { ReleaseReadinessHubCta } from "../../../components/PublicReleaseReadinessHubSections";
import { PlayerTrustReleaseCta } from "../../../components/PublicPlayerTrustReleaseSections";
import { RouteContinuityCta } from "../../../components/PublicRouteContinuitySections";
import { DownloadTrustCta } from "../../../components/PublicTrustSections";
import { GameCard, LinkButton, SectionHeading, Stack, StatusBadge } from "@lgo-web/ui";
import { WebAppShell } from "../../../components/WebAppShell";

export const metadata = { title: "FAQ nhanh" };

const quickRoutes = [
  { label: "Tải game", href: "/download/trust", body: "Kiểm tra trạng thái artifact, checksum và kênh tải chính thức." },
  { label: "Tham gia test", href: "/release/tester-pack", body: "Đọc điều kiện, giới hạn và cách chuẩn bị phản hồi an toàn." },
  { label: "Báo lỗi an toàn", href: "/support/safety", body: "Chuẩn bị route, thiết bị, bước tái hiện và ảnh/log đã che dữ liệu." },
  { label: "Tài khoản", href: "/status", body: "Hiểu rõ phần đăng nhập, nhân vật và portal còn chờ backend thật." },
  { label: "Gameplay", href: "/game/loop", body: "Xem mức gameplay đang được mô tả và phần chưa claim release." },
  { label: "Ranh giới dữ liệu", href: "/support", body: "Biết dữ liệu nào không được gửi khi chưa có kênh bảo mật chính thức." }
];

export default function SupportHelpPage() {
  return (
    <WebAppShell>
      <Stack className="lgo-player-facing-stack lgo-supporthelppage-stack">
        <GameCard className="lgo-detail-hero-card">
          <StatusBadge tone="jade">WEB v1.132 · FAQ tiếng Việt</StatusBadge>
          <span className="lgo-card-kicker">Bản đồ câu hỏi · điều hướng theo vấn đề · chưa có tìm kiếm thật · chưa có ticket thật</span>
          <h1>FAQ nhanh: tìm đúng câu trả lời trước khi gửi phản hồi</h1>
          <p className="lgo-hero-lead">
            Trang này gom câu hỏi theo ý định người chơi: tải game, tham gia test, báo lỗi an toàn,
            tài khoản, gameplay và ranh giới dữ liệu.
          </p>
          <p>
            Mục tiêu là giúp người chơi đi tới route đúng, hiểu bước tiếp theo và không gửi nhầm mật khẩu,
            token, dữ liệu thanh toán hoặc thông tin cá nhân nhạy cảm khi chưa có kênh hỗ trợ chính thức.
          </p>
          <div className="lgo-product-first-actions">
            <LinkButton href="/download/trust" tone="spirit">Độ tin cậy tải game</LinkButton>
            <LinkButton href="/release/tester-pack" tone="gold">Gói tester</LinkButton>
            <LinkButton href="/support/safety" tone="jade">Báo lỗi an toàn</LinkButton>
            <LinkButton href="/status" tone="shadow">Ranh giới trạng thái</LinkButton>
          </div>
        </GameCard>
        <figure className="lgo-support-help-design-board lgo-panel" aria-label="Bảng thiết kế bản đồ câu hỏi hỗ trợ">
          <img
            src="/design-reference/support-help-detailed-design-target-v1132.png"
            alt="Thiết kế tiếng Việt cho FAQ nhanh và bản đồ câu hỏi hỗ trợ"
            loading="eager"
            decoding="async"
          />
          <figcaption>
            <StatusBadge tone="spirit">Design Target First</StatusBadge>
            <strong>Bản đồ câu hỏi giúp người chơi chọn đúng hướng trước khi gửi phản hồi.</strong>
            <span>
              Target này giữ `/support/help` thành hub FAQ tiếng Việt: không có tìm kiếm thật, không có ticket thật,
              không có form tài khoản và không thu dữ liệu nhạy cảm.
            </span>
          </figcaption>
        </figure>
        <SectionHeading eyebrow="FAQ nhanh" title="Chọn nhóm câu hỏi trước khi đi sâu">
          Bản đồ này ưu tiên điều hướng rõ ràng thay vì giả lập tìm kiếm hoặc ticket backend khi hợp đồng backend chưa được chấp nhận.
        </SectionHeading>
        <div className="lgo-support-help-route-grid" aria-label="Bản đồ câu hỏi hỗ trợ">
          {quickRoutes.map((route, index) => (
            <GameCard className="lgo-support-help-route-card" key={route.label}>
              <StatusBadge tone={index % 3 === 0 ? "jade" : index % 3 === 1 ? "gold" : "spirit"}>{route.label}</StatusBadge>
              <h3>{route.label}</h3>
              <p>{route.body}</p>
              <LinkButton href={route.href} tone="jade">Mở hướng dẫn</LinkButton>
            </GameCard>
          ))}
        </div>
        <FaqDiscoveryGroupBoard />
        <IssueCategoryRouteBoard />
        <FaqHelpfulnessCta />
        <FaqHelpfulnessPromptBoard />
        <NoSearchBackendNoteBoard />
        <ReleaseReadinessHubCta />
        <PlayerTrustReleaseCta />
        <ClosedTesterInformationPackCta />
        <DownloadTrustCta />
        <PlayerSafetySupportCta />
        <AccessibilityReadabilityCta />
        <PerformanceBudgetCta />
        <RouteContinuityCta />
      </Stack>
    </WebAppShell>
  );
}
