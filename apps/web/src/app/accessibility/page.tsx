import { ClosedTesterInformationPackCta } from "../../components/PublicClosedTesterInformationPackSections";
import { GameCard, LinkButton, SectionHeading, Stack, StatusBadge } from "@lgo-web/ui";
import {
  AccessibilityReadabilityCta,
  AccessibilityReadabilityPrincipleBoard,
  FocusOrderBoard,
  MobileScannabilityBoard,
  RouteReadabilityBoard
} from "../../components/PublicAccessibilityReadabilitySections";
import { ContentIaStartCta } from "../../components/PublicContentHubSections";
import { PlayerSafetySupportCta } from "../../components/PublicPlayerSafetySections";
import { PerformanceBudgetCta, MobileDensityBudgetBoard } from "../../components/PublicPerformanceBudgetSections";
import { DownloadTrustCta } from "../../components/PublicTrustSections";
import { RouteContinuityCta } from "../../components/PublicRouteContinuitySections";
import { PlayerTrustReleaseCta } from "../../components/PublicPlayerTrustReleaseSections";
import { WebAppShell } from "../../components/WebAppShell";

const readabilitySteps = [
  {
    badge: "Bước 1",
    title: "Đọc tiêu đề trước",
    text: "Mỗi route phải nói rõ câu hỏi chính và trạng thái thật trước khi người chơi bấm CTA.",
  },
  {
    badge: "Bước 2",
    title: "Theo thứ tự focus",
    text: "Keyboard và tab order đi từ skip link, hero, hành động chính rồi mới tới các bảng chi tiết.",
  },
  {
    badge: "Bước 3",
    title: "Giữ mobile dễ quét",
    text: "Copy, thẻ và nhịp cuộn cần ngắn để người chơi không nhầm với dashboard vận hành.",
  },
];

export const metadata = { title: "Dễ đọc và dễ thao tác" };

export default function AccessibilityReadabilityPage() {
  return (
    <WebAppShell>
      <Stack className="lgo-player-facing-stack lgo-service-compact-proof-page lgo-accessibilitypage-stack">
        <GameCard className="lgo-detail-hero-card lgo-readable-hero-card">
          <StatusBadge tone="spirit">WEB v1.152 · dễ đọc public</StatusBadge>
          <span className="lgo-card-kicker">Chưa có audit WCAG chính thức · chưa có claim pháp lý · chưa có thiết lập cá nhân</span>
          <h1>Dễ đọc và dễ thao tác</h1>
          <p className="lgo-hero-lead">
            Trang này giúp người chơi mới đọc website rõ hơn: bắt đầu từ đâu, bấm gì trước, ranh giới nào cần nhớ và cách tab qua các hành động chính.
          </p>
          <p>
            Đây là hướng dẫn tĩnh cho public web. Chưa công bố audit WCAG chính thức, chứng nhận pháp lý,
            backend thiết lập cá nhân hoặc tuỳ biến truy cập theo tài khoản.
          </p>
          <div className="lgo-product-first-actions">
            <LinkButton href="/start" tone="spirit">Bắt đầu</LinkButton>
            <LinkButton href="/support/safety" tone="jade">Hỗ trợ an toàn</LinkButton>
            <LinkButton href="/performance" tone="gold">Hiệu năng</LinkButton>
          </div>
        </GameCard>

        <figure className="lgo-accessibility-design-board lgo-panel" aria-label="Bảng lộ trình đọc dễ thao tác">
          <img
            src="/game-art/design-boards/accessibility-readability-route-map.svg"
            alt="Bảng lộ trình đọc dễ thao tác Linh Giới"
            loading="eager"
          />
          <figcaption>
            <StatusBadge tone="spirit">Board tham chiếu</StatusBadge>
            <strong>Dễ đọc là lộ trình rõ ràng: tiêu đề đúng, focus đúng, CTA không gây hiểu nhầm.</strong>
            <span>
              Board này dùng route-map từ LinhGioiOnline để nối tiêu đề, thứ tự focus, mật độ mobile và ranh giới gần CTA
              trước khi có audit truy cập chính thức hoặc thiết lập cá nhân thật.
            </span>
          </figcaption>
        </figure>

        <section className="lgo-accessibility-route-board lgo-panel" aria-label="Lộ trình đọc dễ thao tác đầu trang">
          <SectionHeading eyebrow="Lộ trình đọc" title="Một trang để kiểm tra cách người chơi đọc website">
            Ưu tiên scan nhanh trên mobile, focus order rõ cho keyboard, CTA cụ thể và ranh giới gần các surface dễ hiểu nhầm.
          </SectionHeading>
          <div className="lgo-accessibility-step-grid">
            {readabilitySteps.map((step) => (
              <article key={step.title} className="lgo-accessibility-step-card">
                <StatusBadge tone="spirit">{step.badge}</StatusBadge>
                <h2>{step.title}</h2>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </section>

        <details className="lgo-service-disclosure-stack lgo-accessibility-expanded-evidence">
          <summary>
            <span>Bằng chứng phụ và tuyến liên quan</span>
            <small>
              Giữ đủ readability principle, route readability, mobile scannability, focus order, mobile density,
              trust, performance, content hub, route continuity, download trust, safety và closed tester nhưng không ép toàn bộ proof board vào first-flow dễ đọc.
            </small>
          </summary>
          <div className="lgo-service-disclosure-body">
            <AccessibilityReadabilityPrincipleBoard />
            <RouteReadabilityBoard />
            <MobileScannabilityBoard />
            <FocusOrderBoard />
            <MobileDensityBudgetBoard />
            <PlayerTrustReleaseCta />
            <PerformanceBudgetCta />
            <AccessibilityReadabilityCta />
            <ContentIaStartCta />
            <RouteContinuityCta />
            <DownloadTrustCta />
            <PlayerSafetySupportCta />
            <ClosedTesterInformationPackCta />
          </div>
        </details>
      </Stack>
    </WebAppShell>
  );
}
