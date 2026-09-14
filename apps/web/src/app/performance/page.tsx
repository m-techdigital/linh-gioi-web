import { ClosedTesterInformationPackCta } from "../../components/PublicClosedTesterInformationPackSections";
import { GameCard, LinkButton, SectionHeading, Stack, StatusBadge } from "@lgo-web/ui";
import { AccessibilityReadabilityCta } from "../../components/PublicAccessibilityReadabilitySections";
import { ContentIaStartCta } from "../../components/PublicContentHubSections";
import { PlayerSafetySupportCta } from "../../components/PublicPlayerSafetySections";
import {
  MobileDensityBudgetBoard,
  PerceivedLoadSignalBoard,
  PerformanceBudgetCta,
  PerformanceCopyBudgetPrincipleBoard,
  StaticRouteCompositionBoard
} from "../../components/PublicPerformanceBudgetSections";
import { DownloadTrustCta } from "../../components/PublicTrustSections";
import { RouteContinuityCta } from "../../components/PublicRouteContinuitySections";
import { WorldGameplayLoopCta } from "../../components/PublicWorldGameplayLoopSections";
import { PlayerTrustReleaseCta } from "../../components/PublicPlayerTrustReleaseSections";
import { WebAppShell } from "../../components/WebAppShell";

const performanceSteps = [
  {
    badge: "Ưu tiên 1",
    title: "Nhẹ ở lần đọc đầu",
    text: "Hero và board phải giúp người chơi hiểu trạng thái mà không phải cuộn qua nhiều CTA sâu.",
  },
  {
    badge: "Ưu tiên 2",
    title: "Ít chữ nhưng đúng ranh giới",
    text: "Copy phải nói rõ chưa có giám sát production, chứng nhận Lighthouse hoặc CDN ảnh riêng.",
  },
  {
    badge: "Ưu tiên 3",
    title: "Mobile không bị dày",
    text: "Thẻ, board và CTA phải giữ nhịp đọc ngắn để tránh cảm giác web nặng hoặc rối.",
  },
];

export const metadata = { title: "Hiệu năng và ngân sách nội dung" };

export default function PerformanceBudgetPage() {
  return (
    <WebAppShell>
      <Stack className="lgo-player-facing-stack lgo-service-compact-proof-page lgo-performancepage-stack">
        <GameCard className="lgo-detail-hero-card lgo-performance-hero-card">
          <StatusBadge tone="jade">WEB v1.151 · hiệu năng public</StatusBadge>
          <span className="lgo-card-kicker">Chưa có đo Core Web Vitals · chưa có chứng nhận Lighthouse · chưa có CDN ảnh riêng</span>
          <h1>Hiệu năng và ngân sách nội dung</h1>
          <p className="lgo-hero-lead">
            Trang này biến hiệu năng thành trải nghiệm người chơi: ít chữ hơn, thứ tự rõ hơn, ảnh tham chiếu nhẹ hơn và CTA nhạy cảm không gây hiểu nhầm.
          </p>
          <p>
            Đây là hướng dẫn tĩnh cho public web. Chưa công bố giám sát production, chứng nhận Lighthouse, CDN ảnh riêng,
            pipeline asset được duyệt hoặc chỉ số Core Web Vitals chính thức.
          </p>
          <div className="lgo-product-first-actions">
            <LinkButton href="/accessibility" tone="jade">Đọc dễ hơn</LinkButton>
            <LinkButton href="/download/trust" tone="gold">Tin cậy tải game</LinkButton>
            <LinkButton href="/journey" tone="spirit">Hành trình</LinkButton>
          </div>
        </GameCard>

        <figure className="lgo-performance-design-board lgo-panel" aria-label="Bảng HUD ngân sách hiệu năng public">
          <img
            src="/game-art/design-boards/performance-copy-budget-hud.svg"
            alt="Bảng HUD ngân sách hiệu năng public Linh Giới"
            loading="eager"
          />
          <figcaption>
            <StatusBadge tone="jade">Board tham chiếu</StatusBadge>
            <strong>Nhìn hiệu năng như HUD: ít nhiễu, quyết định rõ, ranh giới gần CTA.</strong>
            <span>
              Board này dùng visual HUD từ LinhGioiOnline để giữ copy, asset và CTA gọn trên public route
              trước khi có chứng nhận đo lường hoặc hạ tầng ảnh production.
            </span>
          </figcaption>
        </figure>

        <section className="lgo-performance-route-board lgo-panel" aria-label="Ngân sách hiệu năng đầu trang">
          <SectionHeading eyebrow="Ngân sách đầu trang" title="Nhanh hơn bằng cách nói ít nhưng đúng hơn">
            Luồng đầu trang phải giúp người chơi hiểu trạng thái tải game, độ tin cậy và ranh giới vận hành trước khi đi vào các bảng chi tiết.
          </SectionHeading>
          <div className="lgo-performance-step-grid">
            {performanceSteps.map((step) => (
              <article key={step.title} className="lgo-performance-step-card">
                <StatusBadge tone="jade">{step.badge}</StatusBadge>
                <h2>{step.title}</h2>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </section>

        <PerformanceCopyBudgetPrincipleBoard />
        <StaticRouteCompositionBoard />
        <PerceivedLoadSignalBoard />
        <MobileDensityBudgetBoard />
        <PlayerTrustReleaseCta />
        <RouteContinuityCta />
        <PerformanceBudgetCta />
        <AccessibilityReadabilityCta />
        <ContentIaStartCta />
        <WorldGameplayLoopCta />
        <DownloadTrustCta />
        <PlayerSafetySupportCta />
        <ClosedTesterInformationPackCta />
      </Stack>
    </WebAppShell>
  );
}
