import { FaqHelpfulnessCta } from "../../components/PublicFaqHelpfulnessSections";
import { ClosedTesterInformationPackCta } from "../../components/PublicClosedTesterInformationPackSections";
import { localContentRepository } from "@lgo-web/content";
import { GameCard, Grid, LinkButton, SectionHeading, Stack, StatusBadge } from "@lgo-web/ui";
import { PlayerSafetySupportCta } from "../../components/PublicPlayerSafetySections";
import { PlayerTrustReleaseCta } from "../../components/PublicPlayerTrustReleaseSections";
import { WebAppShell } from "../../components/WebAppShell";
import { BeginnerGuideDepth, WorldStoryDepth } from "../../components/PublicGameInfoDepthSections";
import { CommunityRoadmapOnboardingCta } from "../../components/PublicOnboardingSections";
import { ContentIaStartCta } from "../../components/PublicContentHubSections";
import { GuideWorldNavigationBoard, WorldGameplayLoopCta } from "../../components/PublicWorldGameplayLoopSections";
import { AccessibilityReadabilityCta } from "../../components/PublicAccessibilityReadabilitySections";
import { PerformanceBudgetCta } from "../../components/PublicPerformanceBudgetSections";
import { RouteContinuityCta } from "../../components/PublicRouteContinuitySections";
import { ReleaseReadinessHubCta } from "../../components/PublicReleaseReadinessHubSections";

export const metadata = { title: "Hướng dẫn" };

export default function Page() {
  const entries = localContentRepository.list("guides");
  return (
    <WebAppShell>
      <Stack>
        <ReleaseReadinessHubCta />
        <PlayerTrustReleaseCta />
        <SectionHeading eyebrow="WEB v1.13 world gameplay loop depth · WEB v1.12 content IA hub · WEB v1.8 beginner guide · WEB v1.9 guide detail UX" title="Hướng dẫn">Guides now have detail pages with steps, expected results and blocked scope. No CMS. No backend. PROVISIONAL_WEB_FIXTURE only.</SectionHeading>
        <WorldStoryDepth />
        <RouteContinuityCta />
        <WorldGameplayLoopCta />
        <PlayerSafetySupportCta />
        <BeginnerGuideDepth />
        <div className="lgo-product-first-actions"><LinkButton href="/guides/beginner" tone="jade">Mở hướng dẫn người mới</LinkButton><LinkButton href="/guides/community-roadmap-onboarding-guide" tone="gold">Guide community / roadmap</LinkButton><LinkButton href="/guides/start-here-content-hub-guide" tone="spirit">Guide Start hub</LinkButton><LinkButton href="/guides/world-gameplay-loop-guide" tone="jade">Guide world loop</LinkButton><LinkButton href="/guides/accessibility-readability-guide" tone="gold">Guide dễ đọc</LinkButton><LinkButton href="/guides/performance-copy-budget-guide" tone="jade">Guide hiệu năng/copy</LinkButton><LinkButton href="/guides/route-continuity-conversion-guide" tone="spirit">Guide journey/CTA</LinkButton></div>
        <Grid>
          {entries.map((entry) => (
            <GameCard key={entry.slug}>
              <StatusBadge tone="jade">{entry.category}</StatusBadge>
              <h3>{entry.title}</h3>
              <p>{entry.summary}</p>
              <LinkButton href={`/guides/${entry.slug}`} tone="jade">Mở guide</LinkButton>
            </GameCard>
          ))}
        </Grid>
        <GuideWorldNavigationBoard />
        <AccessibilityReadabilityCta />
        <PerformanceBudgetCta />
        <ContentIaStartCta />
        <FaqHelpfulnessCta />
        <CommunityRoadmapOnboardingCta />
              <ClosedTesterInformationPackCta />
        </Stack>
    </WebAppShell>
  );
}
