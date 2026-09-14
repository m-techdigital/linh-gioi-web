import { ClosedTesterInformationPackCta } from "../../components/PublicClosedTesterInformationPackSections";
// Legacy validator markers: WEB v1.7 public roadmap · WEB v1.11 roadmap decision gates · WEB v1.12 content IA grouping
import { publicRoadmapItems } from "@lgo-web/content";
import { GameCard, Grid, LinkButton, SectionHeading, Stack, StatusBadge } from "@lgo-web/ui";
import { RouteContinuityCta } from "../../components/PublicRouteContinuitySections";
import { PlayerTrustReleaseCta, ReleaseNarrativeStageBoard } from "../../components/PublicPlayerTrustReleaseSections";
import { WebAppShell } from "../../components/WebAppShell";
import { RoadmapDecisionGateBoard, StagedReleaseMessagingBoard, CommunityRoadmapOnboardingCta } from "../../components/PublicOnboardingSections";
import { PublicRouteGroupBoard } from "../../components/PublicContentHubSections";
import { GameplayScopeBoundaryBoard } from "../../components/PublicWorldGameplayLoopSections";
import { PlayerSafetySupportCta } from "../../components/PublicPlayerSafetySections";
import { AccessibilityReadabilityCta } from "../../components/PublicAccessibilityReadabilitySections";
import { PerformanceBudgetCta, PerceivedLoadSignalBoard } from "../../components/PublicPerformanceBudgetSections";
import { ReleaseReadinessHubCta, OwnerReleaseGateBoard } from "../../components/PublicReleaseReadinessHubSections";

const roadmapSteps = [
  {
    badge: "Gate 1",
    title: "Đọc trạng thái hiện tại",
    text: "Người chơi cần biết web đang mở thông tin public, chưa mở tài khoản, tải game hoặc dịch vụ thật.",
  },
  {
    badge: "Gate 2",
    title: "Tách mốc kế hoạch khỏi lời hứa",
    text: "Mỗi mốc roadmap phải nói rõ đang làm, kế tiếp hay đang bị chặn để tránh hiểu nhầm release.",
  },
  {
    badge: "Gate 3",
    title: "Chờ hợp đồng máy chủ",
    text: "Portal, tài khoản, dữ liệu và vận hành thật chỉ mở sau hợp đồng xác thực, giao tiếp dữ liệu, cơ sở dữ liệu, phân quyền và kiểm toán được chấp nhận.",
  },
];

export const metadata = { title: "Roadmap" };

function toneFor(status: string) {
  if (status === "current") return "spirit" as const;
  if (status === "next") return "gold" as const;
  if (status === "blocked") return "shadow" as const;
  return "neutral" as const;
}

export default function RoadmapPage() {
  return (
    <WebAppShell>
      <Stack className="lgo-player-facing-stack lgo-service-compact-proof-page lgo-roadmappage-stack">
        <GameCard className="lgo-detail-hero-card lgo-roadmap-hero-card">
          <StatusBadge tone="gold">WEB v1.153 · roadmap public</StatusBadge>
          <span className="lgo-card-kicker">Chưa có đăng nhập thật · chưa có dữ liệu tài khoản · chưa có tích hợp máy chủ</span>
          <h1>Roadmap phát triển web</h1>
          <p className="lgo-hero-lead">
            Roadmap này giúp người chơi và owner hiểu mốc đang làm, mốc kế tiếp và mốc đang bị chặn trước khi kỳ vọng tải game, tài khoản hoặc vận hành thật.
          </p>
          <p>
            Đây là lộ trình public của website. WEB-08 vẫn bị chặn tới khi hợp đồng máy chủ được chấp nhận;
            trang này không công bố xác thực vận hành, lưu cơ sở dữ liệu, hệ quản trị nội dung thật hoặc gameplay trực tuyến đầy đủ.
          </p>
          <div className="lgo-product-first-actions">
            <LinkButton href="/status" tone="jade">Xem trạng thái</LinkButton>
            <LinkButton href="/download/trust" tone="gold">Tin cậy tải game</LinkButton>
            <LinkButton href="/community/onboarding" tone="spirit">Hòa nhập cộng đồng</LinkButton>
          </div>
        </GameCard>

        <figure className="lgo-roadmap-design-board lgo-panel" aria-label="Bảng luồng roadmap public Linh Giới">
          <img
            src="/game-art/design-boards/public-roadmap-flow.svg"
            alt="Bảng luồng roadmap public Linh Giới"
            loading="eager"
            decoding="async"
          />
          <figcaption>
            <StatusBadge tone="spirit">Board tham chiếu</StatusBadge>
            <strong>Roadmap là luồng gate trước lời hứa phát hành.</strong>
            <span>
              Board nhỏ từ LinhGioiOnline giúp hình dung mốc kế hoạch mà không công bố đăng nhập vận hành,
              tải game công khai, hệ quản trị nội dung hoặc tích hợp máy chủ thật.
            </span>
          </figcaption>
        </figure>

        <section className="lgo-roadmap-route-board lgo-panel" aria-label="Gate roadmap đầu trang">
          <SectionHeading eyebrow="Gate roadmap" title="Phân biệt rõ đang làm, kế tiếp và đang bị chặn">
            Luồng đầu trang phải giúp người chơi hiểu trạng thái hiện tại trước khi đọc danh sách mốc dài hơn.
          </SectionHeading>
          <div className="lgo-roadmap-step-grid">
            {roadmapSteps.map((step) => (
              <article key={step.title} className="lgo-roadmap-step-card">
                <StatusBadge tone="gold">{step.badge}</StatusBadge>
                <h2>{step.title}</h2>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </section>

        <ReleaseReadinessHubCta />
        <OwnerReleaseGateBoard />
        <RoadmapDecisionGateBoard />
        <PlayerTrustReleaseCta />
        <ReleaseNarrativeStageBoard />
        <RouteContinuityCta />
        <section className="lgo-roadmap-list-board lgo-panel" aria-label="Danh sách mốc roadmap public">
          <SectionHeading eyebrow="Danh sách mốc" title="Các mốc public web hiện tại" />
          <Grid>
            {publicRoadmapItems.map((item) => (
              <GameCard key={item.version}>
                <StatusBadge tone={toneFor(item.status)}>{item.status}</StatusBadge>
                <span className="lgo-card-kicker">{item.version}</span>
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
              </GameCard>
            ))}
          </Grid>
        </section>
        <PublicRouteGroupBoard />
        <GameplayScopeBoundaryBoard />
        <StagedReleaseMessagingBoard />
        <PlayerSafetySupportCta />
        <AccessibilityReadabilityCta />
        <PerformanceBudgetCta />
        <PerceivedLoadSignalBoard />
        <CommunityRoadmapOnboardingCta />
        <ClosedTesterInformationPackCta />
      </Stack>
    </WebAppShell>
  );
}
