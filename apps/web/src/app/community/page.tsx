import { ClosedTesterInformationPackCta } from "../../components/PublicClosedTesterInformationPackSections";
import { communityPrinciples } from "@lgo-web/content";
import { GameCard, Grid, SectionHeading, Stack, StatusBadge, LinkButton } from "@lgo-web/ui";
import { WorldGameplayLoopCta } from "../../components/PublicWorldGameplayLoopSections";
import { RouteContinuityCta } from "../../components/PublicRouteContinuitySections";
import { PlayerTrustReleaseCta } from "../../components/PublicPlayerTrustReleaseSections";
import { WebAppShell } from "../../components/WebAppShell";
import { CommunityReadinessDepth } from "../../components/PublicGameInfoDepthSections";
import { CommunityFeedbackGuidance, CommunityOnboardingPathBoard, CommunityRoadmapOnboardingCta } from "../../components/PublicOnboardingSections";
import { ContentIaStartCta } from "../../components/PublicContentHubSections";
import { CommunityConductBoard, PlayerSafetySupportCta } from "../../components/PublicPlayerSafetySections";
import { AccessibilityReadabilityCta } from "../../components/PublicAccessibilityReadabilitySections";

export const metadata = { title: "Cộng đồng" };

const communityPlazaScreenshots = [
  {
    src: "/game-art/community/linh-thanh-plaza-npc-preview.png",
    alt: "Ảnh quảng trường Linh Thành với nhân vật hướng dẫn",
    title: "NPC và bảng hướng dẫn ở Linh Thành",
    caption: "Ảnh runtime từ LinhGioiOnline để gợi cảm giác quảng trường cộng đồng; chưa mở trò chuyện, diễn đàn, bang hội hoặc hệ thống phiếu hỗ trợ."
  },
  {
    src: "/game-art/community/linh-thanh-plaza-target-selector.png",
    alt: "Ảnh chọn mục tiêu trong quảng trường Linh Thành",
    title: "Chọn mục tiêu trong khu quảng trường",
    caption: "Khung hình minh họa cách người chơi đọc NPC và tương tác cục bộ; luồng cộng đồng trên web vẫn là hướng dẫn tĩnh."
  }
];

const communityFocusCards = [
  {
    title: "Hòa nhập cộng đồng",
    badge: "Người mới",
    body: "Đọc trạng thái, tải game đáng tin cậy và lộ trình trước khi kỳ vọng tham gia thử nghiệm kín.",
    href: "/community/onboarding",
    cta: "Mở lộ trình"
  },
  {
    title: "Quy tắc ứng xử",
    badge: "Văn minh",
    body: "Tôn trọng, nói rõ lỗi gặp phải và giữ môi trường Linh Giới lành mạnh cho mọi người.",
    href: "/support/safety",
    cta: "Đọc an toàn"
  },
  {
    title: "Phản hồi an toàn",
    badge: "Không gửi nhạy cảm",
    body: "Không gửi mật khẩu, mã xác thực hoặc dữ liệu cá nhân; hiện chưa có hệ thống phiếu hỗ trợ hoặc tra cứu tài khoản.",
    href: "/support/help",
    cta: "Xem FAQ"
  }
];

export default function CommunityPage() {
  return (
    <WebAppShell>
      <Stack className="lgo-player-facing-stack lgo-service-compact-proof-page lgo-communitypage-stack">
        <GameCard className="lgo-detail-hero-card lgo-community-hero-card">
          <StatusBadge tone="jade">WEB v1.149 · cộng đồng</StatusBadge>
          <span className="lgo-card-kicker">Chưa có trò chuyện · chưa có diễn đàn · chưa có bang hội</span>
          <h1>Cộng đồng Linh Giới</h1>
          <p className="lgo-hero-lead">
            Khu vực cộng đồng gom định hướng tham gia, ảnh quảng trường Linh Thành, quy tắc ứng xử và phản hồi an toàn.
          </p>
          <p>
            Website hiện chỉ hướng dẫn tĩnh. Mọi kênh trò chuyện, diễn đàn, bang hội, phiếu hỗ trợ hoặc điều phối thật
            cần hợp đồng tích hợp được chấp nhận trước khi mở.
          </p>
          <div className="lgo-product-first-actions">
            <LinkButton href="/community/onboarding" tone="jade">Hòa nhập cộng đồng</LinkButton>
            <LinkButton href="/support/safety" tone="gold">Phản hồi an toàn</LinkButton>
            <LinkButton href="/status" tone="spirit">Đọc trạng thái</LinkButton>
            <LinkButton href="/release/tester-pack" tone="jade">Chuẩn bị thử nghiệm</LinkButton>
          </div>
        </GameCard>

        <figure className="lgo-community-design-board lgo-service-proof-board lgo-panel" aria-label="Bảng thiết kế cộng đồng Linh Giới">
          <img
            src="/design-reference/community-detailed-design-target-v1149.png"
            alt="Thiết kế tiếng Việt cho trang cộng đồng Linh Giới và quảng trường Linh Thành"
            loading="eager"
            decoding="async"
          />
          <figcaption>
            <StatusBadge tone="spirit">Board tham chiếu</StatusBadge>
            <strong>Quảng trường Linh Thành là đích cảm xúc của trang cộng đồng.</strong>
            <span>
              Đích này giữ `/community` thành trung tâm định hướng: hòa nhập, quy tắc ứng xử, phản hồi an toàn,
              và nhắc rõ chưa có trò chuyện, diễn đàn, bang hội hoặc hệ thống phiếu hỗ trợ thật.
            </span>
          </figcaption>
        </figure>

        <section className="lgo-panel lgo-service-proof-card-grid lgo-community-focus-board" aria-labelledby="community-focus-heading">
          <SectionHeading eyebrow="Quảng trường Linh Thành" title="Cộng đồng bền lâu bắt đầu bằng kỳ vọng rõ ràng">
            Ba cụm đầu trang giúp người chơi biết nên đọc gì, gửi gì và điều gì chưa được mở trên web.
          </SectionHeading>
          <div id="community-focus-heading" className="lgo-community-focus-grid">
            {communityFocusCards.map((card, index) => (
              <GameCard className="lgo-service-proof-card lgo-community-focus-card" key={card.title}>
                <StatusBadge tone={index === 0 ? "jade" : index === 1 ? "gold" : "spirit"}>{card.badge}</StatusBadge>
                <h3>{card.title}</h3>
                <p>{card.body}</p>
                <LinkButton href={card.href} tone={index === 0 ? "jade" : index === 1 ? "gold" : "spirit"}>{card.cta}</LinkButton>
              </GameCard>
            ))}
          </div>
        </section>

        <section className="lgo-community-real-plaza-panel lgo-panel" aria-label="Ảnh thật quảng trường Linh Thành">
          <SectionHeading eyebrow="Ảnh thật Linh Thành" title="Ảnh thật từ quảng trường Linh Thành">
            Hai khung hình từ LinhGioiOnline giúp route cộng đồng có chất liệu game rõ hơn, nhưng chưa mở trò chuyện, diễn đàn, bang hội, danh sách bạn bè, phiếu hỗ trợ hoặc điều phối thật.
          </SectionHeading>
          <div className="lgo-community-real-plaza-grid">
            {communityPlazaScreenshots.map((screenshot) => (
              <figure key={screenshot.src} className="lgo-community-real-plaza-card">
                <img src={screenshot.src} alt={screenshot.alt} loading="lazy" />
                <figcaption>
                  <strong>{screenshot.title}</strong>
                  <span>{screenshot.caption}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <CommunityReadinessDepth />
        <details className="lgo-service-disclosure-stack lgo-community-expanded-evidence">
          <summary>
            <span>Bằng chứng phụ và tuyến liên quan</span>
            <small>Giữ đủ phản hồi, quy tắc ứng xử, trust, content hub, route continuity, world loop, safety, accessibility, onboarding CTA và closed tester nhưng không ép toàn bộ proof board vào first-flow cộng đồng.</small>
          </summary>
          <div className="lgo-service-disclosure-body">
            <CommunityOnboardingPathBoard />
            <CommunityFeedbackGuidance />
            <CommunityConductBoard />
            <PlayerTrustReleaseCta />
            <ContentIaStartCta />
            <RouteContinuityCta />
            <WorldGameplayLoopCta />
            <PlayerSafetySupportCta />
            <AccessibilityReadabilityCta />

            <section className="lgo-action-band lgo-community-onboarding-cta">
              <div>
                <h2>Hòa nhập cộng đồng</h2>
                <p>Người chơi mới nên đọc trạng thái, độ tin cậy tải game và các cổng lộ trình trước khi kỳ vọng thử nghiệm kín hoặc máy chủ thật.</p>
              </div>
              <LinkButton href="/community/onboarding" tone="jade">Mở lộ trình</LinkButton>
            </section>

            <section className="lgo-panel lgo-community-principles-board">
              <SectionHeading eyebrow="Tone" title="Nguyên tắc cộng đồng" />
              <Grid>
                {communityPrinciples.map((item) => (
                  <GameCard key={item.title}>
                    <h3>{item.title}</h3>
                    <p>{item.summary}</p>
                  </GameCard>
                ))}
              </Grid>
            </section>

            <CommunityRoadmapOnboardingCta />
            <ClosedTesterInformationPackCta />
          </div>
        </details>
      </Stack>
    </WebAppShell>
  );
}
