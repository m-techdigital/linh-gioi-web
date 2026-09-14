import { FaqHelpfulnessCta } from "../../components/PublicFaqHelpfulnessSections";
import { ClosedTesterInformationPackCta } from "../../components/PublicClosedTesterInformationPackSections";
import { GameCard, LinkButton, SectionHeading, Stack, StatusBadge } from "@lgo-web/ui";
import { AccessibilityReadabilityCta } from "../../components/PublicAccessibilityReadabilitySections";
import { ContentIaStartCta } from "../../components/PublicContentHubSections";
import { PerformanceBudgetCta } from "../../components/PublicPerformanceBudgetSections";
import { PlayerSafetySupportCta } from "../../components/PublicPlayerSafetySections";
import {
  ClosedTestReadinessBoard,
  PlayerTrustReleaseCta,
  PlayerTrustSignalBoard,
  ReleaseNarrativeStageBoard,
  TrustJourneyCheckpointBoard
} from "../../components/PublicPlayerTrustReleaseSections";
import { RouteContinuityCta } from "../../components/PublicRouteContinuitySections";
import { DownloadTrustCta } from "../../components/PublicTrustSections";
import { WorldGameplayLoopCta } from "../../components/PublicWorldGameplayLoopSections";
import { WebAppShell } from "../../components/WebAppShell";
import { ReleaseReadinessHubCta, ReleaseReadinessHubBoard, OwnerReleaseGateBoard } from "../../components/PublicReleaseReadinessHubSections";

export const metadata = { title: "Release narrative / player trust" };

export default function ReleaseNarrativePage() {
  return (
    <WebAppShell>
      <Stack className="lgo-player-facing-stack lgo-releasepage-stack">
        <GameCard className="lgo-detail-hero-card lgo-release-narrative-hero-card">
          <StatusBadge tone="gold">WEB v1.18 player trust / staged release narrative</StatusBadge>
          <span className="lgo-card-kicker">No public build · no open beta · no entitlement funnel</span>
          <h1>Release narrative: từ content-ready tới closed test</h1>
          <p className="lgo-hero-lead">
            Trang này giải thích vì sao public web đã có nhiều nội dung nhưng vẫn chưa đồng nghĩa có bản tải public,
            closed test, account entitlement hoặc production backend.
          </p>
          <p>
            Người chơi cần một câu chuyện release đáng tin: hôm nay có gì, bằng chứng nào còn thiếu, stage kế tiếp là gì,
            và phải đọc Download Trust, Status, Support Safety theo thứ tự nào.
          </p>
          <div className="lgo-product-first-actions">
            <LinkButton href="/download/trust" tone="gold">Download trust</LinkButton>
            <LinkButton href="/status" tone="spirit">Status surfaces</LinkButton>
            <LinkButton href="/support/safety" tone="jade">Safety support</LinkButton>
          </div>
        </GameCard>
        <figure className="lgo-release-narrative-design-board lgo-panel" aria-label="Release narrative M0 to M1 gate reference art">
          <img
            src="/game-art/design-boards/release-narrative-m0-to-m1-gate.svg"
            alt="Release narrative M0 to M1 gate board"
            loading="eager"
          />
          <figcaption>
            <StatusBadge tone="gold">Game reference art</StatusBadge>
            <strong>M0 → M1 là gate có bằng chứng, không phải nút mở beta.</strong>
            <span>
              Board này dùng visual thật từ LinhGioiOnline để giải thích staging: content-ready, trust checks,
              closed-test prerequisites và các non-claim còn giữ trước khi có accepted backend/build entitlement.
            </span>
          </figcaption>
        </figure>
        <SectionHeading eyebrow="Player trust first" title="Release wording phải chứng minh trước, rồi mới hứa sau">
          v1.18 tập trung vào product web: player trust, closed-test readiness, staged release messaging và route clarity giữa download/status/support.
        </SectionHeading>
        <ReleaseReadinessHubCta />
        <ContentIaStartCta />
        <FaqHelpfulnessCta />
        <RouteContinuityCta />
        <ReleaseReadinessHubBoard />
        <OwnerReleaseGateBoard />
        <PlayerTrustSignalBoard />
        <ReleaseNarrativeStageBoard />
        <ClosedTestReadinessBoard />
        <TrustJourneyCheckpointBoard />
        <PlayerTrustReleaseCta />
        <DownloadTrustCta />
        <WorldGameplayLoopCta />
        <PlayerSafetySupportCta />
        <AccessibilityReadabilityCta />
        <PerformanceBudgetCta />
        <ClosedTesterInformationPackCta />
      </Stack>
    </WebAppShell>
  );
}
