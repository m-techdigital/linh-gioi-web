import { ClosedTesterInformationPackCta } from "../../../components/PublicClosedTesterInformationPackSections";
import { LinkButton, SectionHeading, SpiritPanel, Stack, StatusBadge } from "@lgo-web/ui";
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

export const metadata = { title: "World gameplay loop" };

export default function WorldGameplayLoopPage() {
  return (
    <WebAppShell>
      <Stack>
        <SpiritPanel className="lgo-hero-panel">
          <StatusBadge tone="spirit">WEB v1.13 world/gameplay loop depth</StatusBadge>
          <h1>World gameplay loop</h1>
          <p className="lgo-hero-lead">
            Trang này giải thích loop public hiện tại của Linh Giới Online: bước qua Spirit Gate, nghe Gate Keeper định hướng,
            hiểu Training Stone như vòng luyện tập an toàn, rồi quay lại Download Trust/Status/Support để biết điều kiện release thật.
          </p>
          <div className="lgo-product-first-actions">
            <LinkButton href="/game" tone="spirit">Thế giới</LinkButton>
            <LinkButton href="/guides/world-gameplay-loop-guide" tone="jade">Guide world loop</LinkButton>
            <LinkButton href="/status" tone="gold">Status</LinkButton>
          </div>
        </SpiritPanel>
        <PlayerTrustReleaseCta />
        <figure className="lgo-game-loop-design-board lgo-panel" aria-label="World gameplay loop reference art">
          <img
            src="/game-art/design-boards/world-gameplay-loop-board.svg"
            alt="World gameplay loop board"
            loading="eager"
          />
          <figcaption>
            <StatusBadge tone="spirit">Game reference art</StatusBadge>
            <strong>Gameplay loop là expectation public, không phải combat backend thật.</strong>
            <span>
              Board này dùng visual thật từ LinhGioiOnline để nối Spirit Gate, Gate Keeper, Training Stone và release trust,
              without claiming live combat, inventory persistence, party flow or account integration.
            </span>
          </figcaption>
        </figure>
        <SectionHeading eyebrow="Product-first content" title="Đây là nội dung game public, không phải tooling page">
          Runtime/browser/e2e chỉ dùng làm guardrail. Nội dung chính là giúp người chơi hiểu gameplay expectation một cách trung thực.
        </SectionHeading>
        <GameplayLoopStageBoard />
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
