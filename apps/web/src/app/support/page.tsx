import { FaqDiscoveryGroupBoard, FaqHelpfulnessPromptBoard, IssueCategoryRouteBoard, NoSearchBackendNoteBoard } from "../../components/PublicFaqHelpfulnessSections";
import { FaqHelpfulnessCta } from "../../components/PublicFaqHelpfulnessSections";
import { ClosedTesterInformationPackCta } from "../../components/PublicClosedTesterInformationPackSections";
import { communityPrinciples } from "@lgo-web/content";
import { EmptyState, GameCard, Grid, LinkButton, SectionHeading, Stack, StatusBadge } from "@lgo-web/ui";
import { WorldGameplayLoopCta } from "../../components/PublicWorldGameplayLoopSections";
import { RouteContinuityCta } from "../../components/PublicRouteContinuitySections";
import { PlayerTrustReleaseCta } from "../../components/PublicPlayerTrustReleaseSections";
import { WebAppShell } from "../../components/WebAppShell";
import { ContentIaStartCta } from "../../components/PublicContentHubSections";
import { SupportFaqDepth } from "../../components/PublicGameInfoDepthSections";
import { PlayerSupportExpectationBoard } from "../../components/PublicTrustSections";
import { CommunityFeedbackGuidance } from "../../components/PublicOnboardingSections";
import { CommunityConductBoard, PlayerSafetyPrinciplesBoard, PlayerSafetySupportCta, SupportIssuePathBoard } from "../../components/PublicPlayerSafetySections";
import { AccessibilityReadabilityCta, FocusOrderBoard } from "../../components/PublicAccessibilityReadabilitySections";

export const metadata = { title: "Hỗ trợ" };

const supportTopicCards = [
  {
    title: "Tải game / bản thử nghiệm",
    summary: "Hiện chưa có bản tải public. Trang tải game chỉ giải thích trạng thái artifact, checksum và cổng duyệt chính thức.",
    action: "Theo dõi trạng thái tải game"
  },
  {
    title: "Tài khoản và nhân vật",
    summary: "Đăng nhập, nhân vật và dữ liệu tài khoản thật vẫn chờ hợp đồng backend/API được chấp nhận.",
    action: "Đọc ghi chú tài khoản"
  },
  {
    title: "Lỗi vào game",
    summary: "Hướng dẫn hiện là FAQ tĩnh. Website chưa có hệ thống ticket thật hoặc kênh nhận dữ liệu nhạy cảm.",
    action: "Xem FAQ hỗ trợ"
  },
  {
    title: "An toàn người chơi",
    summary: "Người chơi được nhắc không gửi mật khẩu, token, dữ liệu cá nhân hoặc log chưa che thông tin riêng tư.",
    action: "Đọc hỗ trợ an toàn"
  }
];

export default function SupportPage() {
  return (
    <WebAppShell>
      <Stack className="lgo-player-facing-stack lgo-service-compact-proof-page lgo-supportpage-stack">
        <section className="lgo-panel lgo-detail-hero-card lgo-support-hero">
          <div>
            <StatusBadge tone="jade">WEB v1.146 · trạm hỗ trợ cộng đồng</StatusBadge>
            <h1>Hỗ trợ cộng đồng</h1>
            <p className="lgo-hero-lead">
              Đồng hành cùng người chơi bằng hướng dẫn tĩnh, rõ ranh giới: tải game, tài khoản,
              lỗi vào game, an toàn dữ liệu và những phần đang chờ backend chính thức.
            </p>
          </div>
          <div className="lgo-support-hero-note" aria-label="Ranh giới hỗ trợ hiện tại">
            <StatusBadge tone="gold">Ranh giới hiện tại</StatusBadge>
            <p>Không có hệ thống ticket thật, không tra cứu tài khoản và không xử lý dữ liệu nhạy cảm trên website.</p>
            <div className="lgo-product-first-actions">
              <LinkButton href="/support/help" tone="jade">FAQ nhanh</LinkButton>
              <LinkButton href="/support/safety" tone="gold">Báo lỗi an toàn</LinkButton>
            </div>
          </div>
        </section>

        <figure className="lgo-support-design-board lgo-service-proof-board lgo-panel" aria-label="Bảng thiết kế trạm hỗ trợ người chơi">
          <img
            src="/design-reference/support-detailed-design-target-v1131.png"
            alt="Thiết kế tiếng Việt cho trạm hỗ trợ người chơi Linh Giới Online"
            loading="eager"
            decoding="async"
          />
          <figcaption>
            <StatusBadge tone="spirit">Board tham chiếu</StatusBadge>
            <strong>Trạm hỗ trợ người chơi phải đọc được ngay bằng tiếng Việt.</strong>
            <span>
              Bảng này là đích đối chiếu cho `/support`: người chơi thấy nhóm hỗ trợ, FAQ nhanh, an toàn dữ liệu
              và ranh giới chưa có ticket thật trước khi đi sâu vào các route con.
            </span>
          </figcaption>
        </figure>

        <section className="lgo-panel lgo-service-proof-card-grid lgo-support-topic-board" aria-labelledby="support-topic-heading">
          <SectionHeading eyebrow="Trạm hỗ trợ" title="Các nhóm hỗ trợ hiện có">
            Hướng dẫn hỗ trợ là nội dung tĩnh. Website chưa có ticket thật, chưa tra cứu tài khoản và chưa có thao tác vận hành/admin.
          </SectionHeading>
          <Grid id="support-topic-heading" className="lgo-support-topic-grid">
            {supportTopicCards.map((topic) => (
              <GameCard className="lgo-service-proof-card" key={topic.title}>
                <StatusBadge tone="jade">Hướng dẫn tạm thời</StatusBadge>
                <h3>{topic.title}</h3>
                <p>{topic.summary}</p>
                <p><strong>{topic.action}</strong></p>
              </GameCard>
            ))}
          </Grid>
        </section>

        <SupportFaqDepth />
        <PlayerSafetySupportCta />
        <PlayerSupportExpectationBoard />
        <details className="lgo-service-disclosure-stack lgo-support-expanded-evidence">
          <summary>
            <span>Bằng chứng phụ và tuyến liên quan</span>
            <small>Giữ đủ helpfulness, trust, content IA, route continuity, safety, community và closed tester nhưng không ép toàn bộ proof board vào first-flow hỗ trợ.</small>
          </summary>
          <div className="lgo-service-disclosure-body">
            <FaqHelpfulnessCta />
            <PlayerTrustReleaseCta />
            <ContentIaStartCta />
            <RouteContinuityCta />
            <WorldGameplayLoopCta />
            <AccessibilityReadabilityCta />
            <FaqDiscoveryGroupBoard />
            <FaqHelpfulnessPromptBoard />
            <IssueCategoryRouteBoard />
            <NoSearchBackendNoteBoard />
            <PlayerSafetyPrinciplesBoard />
            <SupportIssuePathBoard />
            <CommunityFeedbackGuidance />
            <CommunityConductBoard />
            <FocusOrderBoard />
            <section className="lgo-panel lgo-support-community-principles">
              <SectionHeading eyebrow="Cộng đồng" title="Nguyên tắc hỗ trợ người chơi" />
              <Grid>
                {communityPrinciples.map((item) => (
                  <GameCard key={item.title}>
                    <h3>{item.title}</h3>
                    <p>{item.summary}</p>
                  </GameCard>
                ))}
              </Grid>
            </section>
            <EmptyState title="Chưa có hệ thống ticket thật">
              Quy trình ticket, khôi phục tài khoản, phân quyền vận hành và audit log chỉ mở khi có hợp đồng backend/API/RBAC được chấp nhận.
            </EmptyState>
            <ClosedTesterInformationPackCta />
          </div>
        </details>
      </Stack>
    </WebAppShell>
  );
}
