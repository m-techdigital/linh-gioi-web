import { ClosedTesterInformationPackCta } from "../../components/PublicClosedTesterInformationPackSections";
// Legacy validator markers: WEB v1.7 public roadmap · WEB v1.11 roadmap decision gates · WEB v1.12 content IA grouping
import { publicRoadmapItems } from "@lgo-web/content";
import { GameCard, Grid, SectionHeading, SpiritPanel, Stack, StatusBadge } from "@lgo-web/ui";
import { RouteContinuityCta } from "../../components/PublicRouteContinuitySections";
import { PlayerTrustReleaseCta, ReleaseNarrativeStageBoard } from "../../components/PublicPlayerTrustReleaseSections";
import { WebAppShell } from "../../components/WebAppShell";
import { RoadmapDecisionGateBoard, StagedReleaseMessagingBoard, CommunityRoadmapOnboardingCta } from "../../components/PublicOnboardingSections";
import { PublicRouteGroupBoard } from "../../components/PublicContentHubSections";
import { GameplayScopeBoundaryBoard } from "../../components/PublicWorldGameplayLoopSections";
import { PlayerSafetySupportCta } from "../../components/PublicPlayerSafetySections";
import { AccessibilityReadabilityCta } from "../../components/PublicAccessibilityReadabilitySections";
import { PerformanceBudgetCta, PerceivedLoadSignalBoard } from "../../components/PublicPerformanceBudgetSections";
import { ReleaseReadinessHubCta, OwnerReleaseGateBoard } from "../../components/PublicReleaseReadinessHubSections";

export const metadata = { title: "Roadmap" };

function toneFor(status: string) {
  if (status === "current") return "spirit" as const;
  if (status === "next") return "gold" as const;
  if (status === "blocked") return "shadow" as const;
  return "neutral" as const;
}

export default function RoadmapPage() {
  return (
    <WebAppShell>
      <Stack>
        <ReleaseReadinessHubCta />
        <OwnerReleaseGateBoard />
        <PlayerTrustReleaseCta />
        <ReleaseNarrativeStageBoard />
        <RouteContinuityCta />
        <SpiritPanel>
          <StatusBadge tone="gold">WEB v1.16 performance/copy budget · WEB v1.15 readability · WEB v1.14 player safety support · WEB v1.13 world gameplay loop depth</StatusBadge>
          <h1>Roadmap phát triển web</h1>
          <p className="lgo-hero-lead">
            Roadmap này giúp người chơi và owner hiểu thứ tự phát triển web: ưu tiên visual/responsive polish, nội dung game, download/support/community, rồi mới tới contract sync. Đây là public web roadmap, không claim production auth, DB persistence, full MMO gameplay, CMS hoặc backend integration. WEB-08 remains blocked until accepted backend contracts exist; no production auth is claimed here. v1.11 adds decision gates so planned roadmap items are not confused with release promises.
          </p>
        </SpiritPanel>
        <figure className="lgo-roadmap-design-board lgo-panel" aria-label="Public roadmap flow design board">
          <img
            src="/game-art/design-boards/public-roadmap-flow.svg"
            alt="Public roadmap flow design board"
            loading="eager"
            decoding="async"
          />
          <figcaption>
            <StatusBadge tone="spirit">Game reference art</StatusBadge>
            <strong>Roadmap flow before release promise</strong>
            <span>Small LinhGioiOnline design-board asset that visualizes planning gates without claiming production auth, download, CMS or backend integration.</span>
          </figcaption>
        </figure>
        <SectionHeading eyebrow="Plan" title="Tập trung sản phẩm trước, tooling chỉ làm guardrail" />
        <Grid>
          {publicRoadmapItems.map((item) => (
            <GameCard key={item.version}>
              <StatusBadge tone={toneFor(item.status)}>{item.status}</StatusBadge>
              <span className="lgo-card-kicker">{item.version}</span>
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
            </GameCard>
          ))}
        </Grid>
        <PublicRouteGroupBoard />
        <GameplayScopeBoundaryBoard />
        <RoadmapDecisionGateBoard />
        <StagedReleaseMessagingBoard />
        <PlayerSafetySupportCta />
        <AccessibilityReadabilityCta />
        <PerformanceBudgetCta />
        <PerceivedLoadSignalBoard />
        <CommunityRoadmapOnboardingCta />
              <ClosedTesterInformationPackCta />
        </Stack>
    </WebAppShell>
  );
}
