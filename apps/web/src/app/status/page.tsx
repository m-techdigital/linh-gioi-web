import { NoSearchBackendNoteBoard } from "../../components/PublicFaqHelpfulnessSections";
import { FaqHelpfulnessCta } from "../../components/PublicFaqHelpfulnessSections";
import { ClosedTesterInformationPackCta } from "../../components/PublicClosedTesterInformationPackSections";
import { localContentRepository } from "@lgo-web/content";
import { GameCard, Grid, SectionHeading, Stack, StatusBadge } from "@lgo-web/ui";
import { StatusExplanationDepth } from "../../components/PublicDetailSections";
import { StatusTrustBoard } from "../../components/PublicTrustSections";
import { RoadmapDecisionGateBoard, StagedReleaseMessagingBoard } from "../../components/PublicOnboardingSections";
import { WorldGameplayLoopCta } from "../../components/PublicWorldGameplayLoopSections";
import { PlayerSafetySupportCta } from "../../components/PublicPlayerSafetySections";
import { RouteContinuityCta } from "../../components/PublicRouteContinuitySections";
import { WebAppShell } from "../../components/WebAppShell";
import { ContentIaStartCta } from "../../components/PublicContentHubSections";
import { AccessibilityReadabilityCta } from "../../components/PublicAccessibilityReadabilitySections";
import { PlayerTrustReleaseCta, TrustJourneyCheckpointBoard } from "../../components/PublicPlayerTrustReleaseSections";
import { PerformanceBudgetCta, PerceivedLoadSignalBoard } from "../../components/PublicPerformanceBudgetSections";
import { ReleaseReadinessHubCta, ReleaseSurfaceAlignmentBoard } from "../../components/PublicReleaseReadinessHubSections";

export const metadata = { title: "Trạng thái / Maintenance" };

export default function Page() {
  const entries = localContentRepository.list("maintenance");
  return (
    <WebAppShell>
      <Stack>
        <ReleaseReadinessHubCta />
        <ReleaseSurfaceAlignmentBoard />
        <PlayerTrustReleaseCta />
        <TrustJourneyCheckpointBoard />
        <ContentIaStartCta />
        <FaqHelpfulnessCta />
        <RouteContinuityCta />
        <WorldGameplayLoopCta />
        <PlayerSafetySupportCta />
        <AccessibilityReadabilityCta />
        <PerformanceBudgetCta />
        <PerceivedLoadSignalBoard />
        <SectionHeading eyebrow="WEB v1.11 staged release messaging · WEB v1.10 status trust transparency · WEB v1.9 status transparency" title="Trạng thái / Maintenance">No CMS. No backend. PROVISIONAL_WEB_FIXTURE only. Status separates public, internal and blocked surfaces.</SectionHeading>
        <figure className="lgo-status-design-board lgo-panel" aria-label="Status maintenance signal reference art">
          <img
            src="/game-art/design-boards/status-maintenance-signal-board.svg"
            alt="Status maintenance signal board"
            loading="eager"
          />
          <figcaption>
            <StatusBadge tone="jade">Game reference art</StatusBadge>
            <strong>Status signal là fixture public rõ nghĩa, không phải monitoring backend.</strong>
            <span>
              Board này dùng visual thật từ LinhGioiOnline để phân biệt public status, blocked surfaces và trust notes
              mà không claim CMS, production monitoring, incident backend hoặc live server health.
            </span>
          </figcaption>
        </figure>
        <StatusExplanationDepth />
        <StatusTrustBoard />
        <NoSearchBackendNoteBoard />
        <RoadmapDecisionGateBoard />
        <StagedReleaseMessagingBoard />
        <Grid>
          {entries.map((entry) => (
            <GameCard key={entry.slug}>
              <StatusBadge tone="jade">{entry.category}</StatusBadge>
              <h3>{entry.title}</h3>
              <p>{entry.summary}</p>
            </GameCard>
          ))}
        </Grid>
              <ClosedTesterInformationPackCta />
        </Stack>
    </WebAppShell>
  );
}
