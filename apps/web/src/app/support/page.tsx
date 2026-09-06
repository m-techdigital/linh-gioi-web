import { FaqDiscoveryGroupBoard, FaqHelpfulnessPromptBoard, IssueCategoryRouteBoard, NoSearchBackendNoteBoard } from "../../components/PublicFaqHelpfulnessSections";
import { FaqHelpfulnessCta } from "../../components/PublicFaqHelpfulnessSections";
import { ClosedTesterInformationPackCta } from "../../components/PublicClosedTesterInformationPackSections";
import { communityPrinciples, supportTopics } from "@lgo-web/content";
import { EmptyState, GameCard, Grid, SectionHeading, Stack, StatusBadge } from "@lgo-web/ui";
import { WorldGameplayLoopCta } from "../../components/PublicWorldGameplayLoopSections";
import { RouteContinuityCta } from "../../components/PublicRouteContinuitySections";
import { PlayerTrustReleaseCta } from "../../components/PublicPlayerTrustReleaseSections";
import { WebAppShell } from "../../components/WebAppShell";
import { ContentIaStartCta } from "../../components/PublicContentHubSections";
import { SupportFaqDepth } from "../../components/PublicGameInfoDepthSections";
import { PlayerSupportExpectationBoard } from "../../components/PublicTrustSections";
import { CommunityFeedbackGuidance } from "../../components/PublicOnboardingSections";
import { CommunityConductBoard, PlayerSafetyPrinciplesBoard, PlayerSafetySupportCta, SupportIssuePathBoard } from "../../components/PublicPlayerSafetySections";
import { AccessibilityReadabilityCta, FocusOrderBoard } from "../../components/PublicAccessibilityReadabilitySections";

export const metadata = { title: "Hỗ trợ" };

export default function SupportPage() {
  return (
    <WebAppShell>
      <Stack>
        <PlayerTrustReleaseCta />
        <ContentIaStartCta />
        <FaqHelpfulnessCta />
        <RouteContinuityCta />
        <WorldGameplayLoopCta />
        <section className="lgo-panel lgo-support-hero">
          <StatusBadge tone="jade">WEB v1.14 player safety support · WEB v1.11 community feedback guidance · WEB v1.10 support expectation trust · WEB v1.8 support FAQ depth</StatusBadge>
          <h1>Hỗ trợ cộng đồng</h1>
          <p className="lgo-hero-lead">Static support guidance được trình bày rõ hơn cho người chơi: tải game, tài khoản, lỗi vào game, an toàn dữ liệu và giới hạn backend hiện tại.</p>
        </section>

        <SectionHeading eyebrow="Support" title="Các nhóm hỗ trợ hiện có">
          Support guidance is static. No real ticket backend, account lookup or ops/admin mutation exists in this web repo.
        </SectionHeading>
        <Grid>
          {supportTopics.map((topic) => (
            <GameCard key={topic.title}>
              <StatusBadge tone="jade">PROVISIONAL_WEB_FIXTURE</StatusBadge>
              <h3>{topic.title}</h3>
              <p>{topic.summary}</p>
              <p><strong>{topic.action}</strong></p>
            </GameCard>
          ))}
        </Grid>
        <PlayerSafetySupportCta />
        <AccessibilityReadabilityCta />
        <SupportFaqDepth />
        <FaqDiscoveryGroupBoard />
        <FaqHelpfulnessPromptBoard />
        <IssueCategoryRouteBoard />
        <NoSearchBackendNoteBoard />
        <PlayerSafetyPrinciplesBoard />
        <SupportIssuePathBoard />
        <PlayerSupportExpectationBoard />
        <CommunityFeedbackGuidance />
        <CommunityConductBoard />
        <FocusOrderBoard />

        <section className="lgo-panel">
          <SectionHeading eyebrow="Community tone" title="Nguyên tắc hỗ trợ người chơi" />
          <Grid>
            {communityPrinciples.map((item) => (
              <GameCard key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
              </GameCard>
            ))}
          </Grid>
        </section>

        <EmptyState title="Ticket backend blocked">
          Support ticket workflow requires accepted backend/API/RBAC/audit contracts. No real account portal integration is claimed.
        </EmptyState>
              <ClosedTesterInformationPackCta />
        </Stack>
    </WebAppShell>
  );
}
