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

export const metadata = { title: "Accessibility / readability" };

export default function AccessibilityReadabilityPage() {
  return (
    <WebAppShell>
      <Stack>
        <PlayerTrustReleaseCta />
        <GameCard className="lgo-detail-hero-card lgo-readable-hero-card">
          <StatusBadge tone="spirit">WEB v1.15 accessibility / readability polish</StatusBadge>
          <span className="lgo-card-kicker">No formal WCAG audit · no legal compliance claim · no personal settings backend</span>
          <h1>Accessibility và readability cho người chơi mới</h1>
          <p className="lgo-hero-lead">
            Trang này giúp người chơi đọc web rõ hơn: bắt đầu từ đâu, CTA nào quan trọng, route nào trả lời câu hỏi nào,
            và boundary nào cần nhớ trước khi kỳ vọng download, account, combat hoặc support backend thật.
          </p>
          <p>
            Đây là product web polish. Runtime/browser/e2e chỉ là guardrail nội bộ; nội dung chính là heading clarity,
            mobile scannability, focus order và route-level reading comfort.
          </p>
          <div className="lgo-product-first-actions">
            <LinkButton href="/start" tone="spirit">Start hub</LinkButton>
            <LinkButton href="/download/trust" tone="gold">Download trust</LinkButton>
            <LinkButton href="/support/safety" tone="jade">Safety support</LinkButton>
            <LinkButton href="/performance" tone="gold">Hiệu năng/copy budget</LinkButton>
          </div>
        </GameCard>
        <figure className="lgo-accessibility-design-board lgo-panel" aria-label="Accessibility readability route map reference art">
          <img
            src="/game-art/design-boards/accessibility-readability-route-map.svg"
            alt="Accessibility readability route map board"
            loading="eager"
          />
          <figcaption>
            <StatusBadge tone="spirit">Game reference art</StatusBadge>
            <strong>Readability là route map rõ ràng, không phải claim audit pháp lý.</strong>
            <span>
              Board này dùng visual thật từ LinhGioiOnline để nối heading clarity, focus order, mobile scannability
              và non-claim gần CTA mà không claim formal WCAG audit hoặc personal settings backend.
            </span>
          </figcaption>
        </figure>
        <SectionHeading eyebrow="Readability path" title="Một trang để kiểm tra cách người chơi đọc website">
          Ưu tiên scan nhanh trên mobile, focus order rõ cho keyboard, CTA text cụ thể và non-claim gần các surface dễ hiểu nhầm.
        </SectionHeading>
        <AccessibilityReadabilityPrincipleBoard />
        <RouteReadabilityBoard />
        <MobileScannabilityBoard />
        <FocusOrderBoard />
        <MobileDensityBudgetBoard />
        <PerformanceBudgetCta />
        <AccessibilityReadabilityCta />
        <ContentIaStartCta />
        <RouteContinuityCta />
        <DownloadTrustCta />
        <PlayerSafetySupportCta />
              <ClosedTesterInformationPackCta />
        </Stack>
    </WebAppShell>
  );
}
