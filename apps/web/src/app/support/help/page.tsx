import { ClosedTesterInformationPackCta } from "../../../components/PublicClosedTesterInformationPackSections";
import { AccessibilityReadabilityCta } from "../../../components/PublicAccessibilityReadabilitySections";
import {
  FaqDiscoveryGroupBoard,
  FaqHelpfulnessCta,
  FaqHelpfulnessPromptBoard,
  IssueCategoryRouteBoard,
  NoSearchBackendNoteBoard
} from "../../../components/PublicFaqHelpfulnessSections";
import { PerformanceBudgetCta } from "../../../components/PublicPerformanceBudgetSections";
import { PlayerSafetySupportCta } from "../../../components/PublicPlayerSafetySections";
import { ReleaseReadinessHubCta } from "../../../components/PublicReleaseReadinessHubSections";
import { PlayerTrustReleaseCta } from "../../../components/PublicPlayerTrustReleaseSections";
import { RouteContinuityCta } from "../../../components/PublicRouteContinuitySections";
import { DownloadTrustCta } from "../../../components/PublicTrustSections";
import { GameCard, LinkButton, SectionHeading, Stack, StatusBadge } from "@lgo-web/ui";
import { WebAppShell } from "../../../components/WebAppShell";

export const metadata = { title: "FAQ Help" };

export default function SupportHelpPage() {
  return (
    <WebAppShell>
      <Stack>
        <FaqHelpfulnessCta />
        <GameCard className="lgo-detail-hero-card">
          <StatusBadge tone="jade">WEB v1.21 FAQ search/helpfulness polish</StatusBadge>
          <span className="lgo-card-kicker">FAQ discoverability · issue-category routing · no search backend · no live ticket</span>
          <h1>FAQ Help: tìm đúng câu trả lời trước khi gửi feedback</h1>
          <p className="lgo-hero-lead">
            Trang này gom câu hỏi theo ý định người chơi: tải game, closed test, safety, account/backend boundaries,
            world loop và release readiness. Đây là static help hub, không phải live search hoặc ticket system.
          </p>
          <p>
            Mục tiêu là giúp người chơi tự đi tới route đúng, hiểu next step rõ ràng và không gửi nhầm password,
            token, payment data hoặc dữ liệu cá nhân nhạy cảm khi chưa có kênh support chính thức.
          </p>
          <div className="lgo-product-first-actions">
            <LinkButton href="/download/trust" tone="spirit">Download trust</LinkButton>
            <LinkButton href="/release/tester-pack" tone="gold">Tester pack</LinkButton>
            <LinkButton href="/support/safety" tone="jade">Safety support</LinkButton>
            <LinkButton href="/status" tone="shadow">Status boundaries</LinkButton>
          </div>
        </GameCard>
        <SectionHeading eyebrow="Helpful support IA" title="FAQ không cần search backend giả để hữu ích">
          v1.21 tiếp tục xây web thật bằng cách biến FAQ thành bản đồ route rõ ràng, có helpful next step và privacy boundary.
        </SectionHeading>
        <FaqDiscoveryGroupBoard />
        <FaqHelpfulnessPromptBoard />
        <IssueCategoryRouteBoard />
        <NoSearchBackendNoteBoard />
        <ReleaseReadinessHubCta />
        <PlayerTrustReleaseCta />
        <ClosedTesterInformationPackCta />
        <DownloadTrustCta />
        <PlayerSafetySupportCta />
        <AccessibilityReadabilityCta />
        <PerformanceBudgetCta />
        <RouteContinuityCta />
      </Stack>
    </WebAppShell>
  );
}
