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

export const metadata = { title: "Performance / copy budget" };

export default function PerformanceBudgetPage() {
  return (
    <WebAppShell>
      <Stack>
        <PlayerTrustReleaseCta />
        <GameCard className="lgo-detail-hero-card lgo-performance-hero-card">
          <StatusBadge tone="jade">WEB v1.16 performance / copy / asset budget polish</StatusBadge>
          <span className="lgo-card-kicker">No Core Web Vitals measured PASS · no Lighthouse certification · no image CDN claim</span>
          <h1>Performance, copy và asset budget cho public web</h1>
          <p className="lgo-hero-lead">
            Trang này biến performance thành trải nghiệm người chơi: route nhẹ hơn, copy ngắn hơn, visual fantasy dùng CSS-only,
            và blocker download/support/account nằm gần CTA nhạy cảm.
          </p>
          <p>
            Đây là product web polish. Runtime/browser/e2e chỉ là guardrail; public site không claim production monitoring,
            CDN deployment, formal Core Web Vitals PASS hoặc approved game asset pipeline.
          </p>
          <div className="lgo-product-first-actions">
            <LinkButton href="/journey" tone="spirit">Journey hub</LinkButton>
            <LinkButton href="/start" tone="spirit">Start hub</LinkButton>
            <LinkButton href="/accessibility" tone="jade">Đọc dễ hơn</LinkButton>
            <LinkButton href="/download/trust" tone="gold">Download trust</LinkButton>
          </div>
        </GameCard>
        <SectionHeading eyebrow="Product-first performance" title="Nhanh hơn bằng cách nói ít nhưng đúng hơn">
          v1.16 không mở backend, CMS, image pipeline hoặc tool loop mới. Nó làm web public dễ scan hơn và giảm cảm giác nặng ở hero/cards/routes.
        </SectionHeading>
        <PerformanceCopyBudgetPrincipleBoard />
        <StaticRouteCompositionBoard />
        <PerceivedLoadSignalBoard />
        <MobileDensityBudgetBoard />
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
