import { ClosedTesterInformationPackCta } from "../../../components/PublicClosedTesterInformationPackSections";
import { GameCard, LinkButton, SectionHeading, Stack, StatusBadge } from "@lgo-web/ui";
import { ContentIaStartCta } from "../../../components/PublicContentHubSections";
import {
  BeginnerExpectationBoard,
  GameplayLoopStageBoard,
  GameplayScopeBoundaryBoard,
  GuideWorldNavigationBoard,
  WorldGameplayLoopCta
} from "../../../components/PublicWorldGameplayLoopSections";
import { DownloadTrustCta } from "../../../components/PublicTrustSections";
import { PlayerSafetySupportCta } from "../../../components/PublicPlayerSafetySections";
import { RouteContinuityCta } from "../../../components/PublicRouteContinuitySections";
import { PlayerTrustReleaseCta } from "../../../components/PublicPlayerTrustReleaseSections";
import { WebAppShell } from "../../../components/WebAppShell";
import { AccessibilityReadabilityCta } from "../../../components/PublicAccessibilityReadabilitySections";
import { PerformanceBudgetCta, StaticRouteCompositionBoard } from "../../../components/PublicPerformanceBudgetSections";

export const metadata = { title: "Vòng lặp gameplay thế giới" };

const loopGates = [
  {
    badge: "Bước 1",
    title: "Vào cổng",
    text: "Spirit Gate chỉ là điểm đọc public để hiểu tông thế giới, chưa phải login hay máy chủ chơi thật.",
  },
  {
    badge: "Bước 2",
    title: "Nhận hướng dẫn",
    text: "Gate Keeper giải thích hướng đi đầu tiên để người chơi không hiểu nhầm roadmap thành lời hứa release.",
  },
  {
    badge: "Bước 3",
    title: "Luyện tập an toàn",
    text: "Training Stone mô tả vòng luyện tập dự kiến, không công bố combat, túi đồ, tổ đội hoặc tài khoản thật.",
  },
];

export default function WorldGameplayLoopPage() {
  return (
    <WebAppShell>
      <Stack className="lgo-player-facing-stack lgo-service-compact-proof-page lgo-gamelooppage-stack">
        <GameCard className="lgo-detail-hero-card lgo-game-loop-hero-card">
          <StatusBadge tone="spirit">WEB v1.154 · vòng lặp gameplay</StatusBadge>
          <span className="lgo-card-kicker">Chưa có combat thật · chưa có túi đồ · chưa có tổ đội · chưa có tài khoản tích hợp</span>
          <h1>Vòng lặp gameplay thế giới</h1>
          <p className="lgo-hero-lead">
            Trang này đặt kỳ vọng public cho người chơi mới: bước qua Spirit Gate, nghe Gate Keeper định hướng,
            hiểu Training Stone như vòng luyện tập an toàn, rồi quay lại trạng thái release trước khi kỳ vọng tải game thật.
          </p>
          <div className="lgo-product-first-actions">
            <LinkButton href="/game" tone="spirit">Thế giới</LinkButton>
            <LinkButton href="/guides/world-gameplay-loop-guide" tone="jade">Đọc guide loop</LinkButton>
            <LinkButton href="/status" tone="gold">Trạng thái chơi</LinkButton>
          </div>
        </GameCard>

        <figure className="lgo-game-loop-design-board lgo-panel" aria-label="Board vòng lặp gameplay thế giới Linh Giới">
          <img
            src="/game-art/design-boards/world-gameplay-loop-board.svg"
            alt="Board vòng lặp gameplay thế giới Linh Giới"
            loading="eager"
          />
          <figcaption>
            <StatusBadge tone="spirit">Board tham chiếu</StatusBadge>
            <strong>Gameplay loop là kỳ vọng public, không phải combat vận hành thật.</strong>
            <span>
              Board từ LinhGioiOnline nối Spirit Gate, Gate Keeper, Training Stone và mốc tin cậy release mà không công bố
              combat trực tiếp, lưu túi đồ, luồng tổ đội hoặc tích hợp tài khoản thật.
            </span>
          </figcaption>
        </figure>

        <section className="lgo-game-loop-gate-board lgo-panel" aria-label="Ba bước đọc gameplay loop">
          <SectionHeading eyebrow="Luồng gameplay public" title="Đọc loop như hành trình kỳ vọng, chưa phải tính năng online">
            Luồng đầu trang phải giúp người chơi hiểu điều đang được mô tả trong web trước khi đi vào guide, trust và support.
          </SectionHeading>
          <div className="lgo-game-loop-gate-grid">
            {loopGates.map((gate) => (
              <article key={gate.title} className="lgo-game-loop-gate-card">
                <StatusBadge tone="gold">{gate.badge}</StatusBadge>
                <h2>{gate.title}</h2>
                <p>{gate.text}</p>
              </article>
            ))}
          </div>
        </section>

        <GameplayLoopStageBoard />
        <PlayerTrustReleaseCta />
        <BeginnerExpectationBoard />
        <GuideWorldNavigationBoard />
        <GameplayScopeBoundaryBoard />
        <DownloadTrustCta />
        <ContentIaStartCta />
        <RouteContinuityCta />
        <AccessibilityReadabilityCta />
        <PerformanceBudgetCta />
        <StaticRouteCompositionBoard />
        <WorldGameplayLoopCta />
        <PlayerSafetySupportCta />
        <ClosedTesterInformationPackCta />
      </Stack>
    </WebAppShell>
  );
}
