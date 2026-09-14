import { ClosedTesterInformationPackCta } from "../../../components/PublicClosedTesterInformationPackSections";
import { GameCard, LinkButton, SectionHeading, Stack, StatusBadge } from "@lgo-web/ui";
import {
  CommunityFeedbackGuidance,
  CommunityOnboardingPathBoard,
  RoadmapDecisionGateBoard,
  StagedReleaseMessagingBoard
} from "../../../components/PublicOnboardingSections";
import { RouteContinuityCta } from "../../../components/PublicRouteContinuitySections";
import { PlayerTrustReleaseCta, ReleaseNarrativeStageBoard } from "../../../components/PublicPlayerTrustReleaseSections";
import { WebAppShell } from "../../../components/WebAppShell";
import { ContentIaStartCta } from "../../../components/PublicContentHubSections";
import { ReleaseReadinessHubCta, TesterExpectationCopyBoard } from "../../../components/PublicReleaseReadinessHubSections";

const onboardingSteps = [
  {
    badge: "Bước 1",
    title: "Kiểm tra trạng thái",
    text: "Xem trạng thái website, gói tải và phạm vi thử nghiệm trước khi tham gia cộng đồng.",
    href: "/status",
    action: "Xem trạng thái",
  },
  {
    badge: "Bước 2",
    title: "Đọc mốc mở dần",
    text: "Nắm rõ những phần đang chuẩn bị, những phần chưa mở và cách theo dõi cập nhật.",
    href: "/roadmap",
    action: "Xem lộ trình",
  },
  {
    badge: "Bước 3",
    title: "Quay lại cộng đồng",
    text: "Dùng trang cộng đồng làm điểm gom quy tắc ứng xử, phản hồi an toàn và hướng dẫn tham gia.",
    href: "/community",
    action: "Về cộng đồng",
  },
];

export const metadata = { title: "Hòa nhập cộng đồng" };

export default function CommunityOnboardingPage() {
  return (
    <WebAppShell>
      <Stack className="lgo-player-facing-stack lgo-service-compact-proof-page lgo-community-onboardingpage-stack">
        <GameCard className="lgo-detail-hero-card lgo-community-onboarding-hero-card">
          <StatusBadge tone="jade">WEB v1.150 · hòa nhập cộng đồng</StatusBadge>
          <span className="lgo-card-kicker">Chưa có diễn đàn · chưa có bang hội · chưa có danh sách chờ</span>
          <h1>Hòa nhập cộng đồng Linh Giới</h1>
          <p className="lgo-hero-lead">
            Trang này gom thứ tự đọc cho người chơi mới: kiểm tra trạng thái, hiểu mốc mở dần, rồi quay lại cộng đồng để theo dõi phản hồi an toàn.
          </p>
          <p>
            Đây là hướng dẫn tĩnh cho website. Chưa mở trò chuyện, diễn đàn, bang hội, đăng nhập thật, dữ liệu tài khoản,
            phiếu hỗ trợ hoặc danh sách chờ công khai.
          </p>
          <div className="lgo-product-first-actions">
            <LinkButton href="/community" tone="jade">Về cộng đồng</LinkButton>
            <LinkButton href="/status" tone="gold">Xem trạng thái</LinkButton>
            <LinkButton href="/roadmap" tone="neutral">Xem lộ trình</LinkButton>
          </div>
        </GameCard>

        <figure className="lgo-community-onboarding-design-board lgo-panel" aria-label="Bảng vòng chơi hòa nhập cộng đồng">
          <img
            src="/game-art/design-boards/community-onboarding-gameplay-loop.svg"
            alt="Bảng vòng chơi hòa nhập cộng đồng Linh Giới"
            loading="eager"
          />
          <figcaption>
            <StatusBadge tone="jade">Board tham chiếu</StatusBadge>
            <strong>Hòa nhập bắt đầu từ vòng chơi, trạng thái mở dần và quy tắc an toàn.</strong>
            <span>
              Board này dùng hình vòng chơi từ LinhGioiOnline để nối hướng dẫn, trạng thái, lộ trình và kỳ vọng cộng đồng
              trước khi các kênh tương tác thật được mở.
            </span>
          </figcaption>
        </figure>

        <section className="lgo-community-onboarding-route-board lgo-panel">
          <SectionHeading eyebrow="Luồng đọc đề xuất" title="Đi theo thứ tự để không hiểu nhầm trạng thái mở">
            Người chơi nên kiểm tra trạng thái trước, đọc lộ trình mở dần, rồi quay lại cộng đồng để nắm quy tắc tham gia.
          </SectionHeading>
          <div className="lgo-community-onboarding-step-grid">
            {onboardingSteps.map((step) => (
              <article key={step.href} className="lgo-community-onboarding-step-card">
                <StatusBadge tone="jade">{step.badge}</StatusBadge>
                <h2>{step.title}</h2>
                <p>{step.text}</p>
                <LinkButton href={step.href} tone="neutral">{step.action}</LinkButton>
              </article>
            ))}
          </div>
        </section>

        <details className="lgo-service-disclosure-stack lgo-community-onboarding-expanded-evidence">
          <summary>
            <span>Bằng chứng phụ và tuyến liên quan</span>
            <small>Giữ đủ readiness, tester expectation, trust, release narrative, content hub, route continuity, onboarding path, roadmap gate, feedback và closed tester nhưng không ép toàn bộ proof board vào first-flow hòa nhập.</small>
          </summary>
          <div className="lgo-service-disclosure-body">
            <ReleaseReadinessHubCta />
            <TesterExpectationCopyBoard />
            <PlayerTrustReleaseCta />
            <ReleaseNarrativeStageBoard />
            <ContentIaStartCta />
            <RouteContinuityCta />
            <CommunityOnboardingPathBoard />
            <RoadmapDecisionGateBoard />
            <CommunityFeedbackGuidance />
            <StagedReleaseMessagingBoard />
            <ClosedTesterInformationPackCta />
          </div>
        </details>
      </Stack>
    </WebAppShell>
  );
}
