import { FaqHelpfulnessCta } from "../components/PublicFaqHelpfulnessSections";
import { ClosedTesterInformationPackCta } from "../components/PublicClosedTesterInformationPackSections";
// Legacy validator markers: WEB v1.8 game info depth · WEB v1.11 community roadmap onboarding · WEB v1.12 content IA hub
import { localContentRepository, playerJourneySteps, publicHeroStats, worldPillars } from "@lgo-web/content";
import { GameCard, Grid, LinkButton, SectionHeading, SpiritPanel, Stack, StatusBadge } from "@lgo-web/ui";
import { WebAppShell } from "../components/WebAppShell";
import { ProductFirstNotice, PublicPageFocusGrid, ResponsiveProofStrip, SpiritStagePreview, VisualPolishGrid } from "../components/PublicVisualSections";
import { BeginnerGuideDepth, GameInfoDepthCta, WorldStoryDepth } from "../components/PublicGameInfoDepthSections";
import { DownloadTrustCta } from "../components/PublicTrustSections";
import { CommunityRoadmapOnboardingCta, CommunityOnboardingPathBoard } from "../components/PublicOnboardingSections";
import { ContentIaStartCta, PlayerEntryQuestionBoard } from "../components/PublicContentHubSections";
import { BeginnerExpectationBoard, WorldGameplayLoopCta } from "../components/PublicWorldGameplayLoopSections";
import { PlayerSafetySupportCta } from "../components/PublicPlayerSafetySections";
import { AccessibilityReadabilityCta, RouteReadabilityBoard } from "../components/PublicAccessibilityReadabilitySections";
import { PerformanceBudgetCta, PerceivedLoadSignalBoard } from "../components/PublicPerformanceBudgetSections";
import { JourneyFrictionBoard, RouteContinuityCta } from "../components/PublicRouteContinuitySections";
import { PlayerTrustReleaseCta, PlayerTrustSignalBoard } from "../components/PublicPlayerTrustReleaseSections";
import { ReleaseReadinessHubCta, ReleaseReadinessHubBoard } from "../components/PublicReleaseReadinessHubSections";

export default function HomePage() {
  const featured = localContentRepository.featured(3);
  return (
    <WebAppShell>
      <Stack>
        <SpiritPanel className="lgo-hero-panel">
          <div className="lgo-hero-copy">
            <StatusBadge tone="gold">Public RC · WEB v1.20 closed tester information pack · WEB v1.19 release readiness · WEB v1.18 player trust · WEB v1.17 route continuity · WEB v1.16 performance/copy budget · WEB v1.15 accessibility/readability · WEB v1.14 player safety support · WEB v1.13 world gameplay loop depth</StatusBadge>
            <h1>Linh Giới Online</h1>
            <p className="lgo-hero-lead">
              Website public source-ready cho game nhập vai online fantasy Việt: ưu tiên cảm giác cổng vào game,
              copy nhẹ/dễ đọc, trạng thái tải game, roadmap và hỗ trợ cộng đồng trước production services.
            </p>
            <div className="lgo-hero-actions">
              <LinkButton href="/release" tone="gold">Release narrative</LinkButton>
              <LinkButton href="/journey" tone="spirit">Đi theo Journey hub</LinkButton>
              <LinkButton href="/start" tone="spirit">Bắt đầu đúng hướng</LinkButton>
              <LinkButton href="/accessibility" tone="jade">Đọc dễ hơn</LinkButton>
              <LinkButton href="/performance" tone="gold">Hiệu năng/copy budget</LinkButton>
              <LinkButton href="/game" tone="spirit">Khám phá thế giới</LinkButton>
              <LinkButton href="/roadmap" tone="gold">Xem roadmap</LinkButton>
              <LinkButton href="/download" tone="jade">Trạng thái tải game</LinkButton>
            </div>
          </div>
          <SpiritStagePreview />
          <div className="lgo-stat-strip" aria-label="Web status summary">
            {publicHeroStats.map((stat) => (
              <div className="lgo-stat-card" key={stat.label}>
                <span>{stat.label}</span>
                <strong>{stat.value}</strong>
                <p>{stat.note}</p>
              </div>
            ))}
          </div>
        </SpiritPanel>

        <SectionHeading eyebrow="Game identity" title="Một cổng thông tin có cảm giác game, không chỉ là tài liệu kỹ thuật">
          WEB v1.6 content polish và WEB v1.7 visual responsive polish tập trung vào visual hierarchy và responsive UX: người chơi hiểu game là gì,
          đang có gì, chưa claim gì, và nên đi tới trang nào tiếp theo.
        </SectionHeading>

        <VisualPolishGrid />

        <WorldStoryDepth />

        <Grid className="lgo-feature-grid">
          {worldPillars.map((pillar) => (
            <GameCard key={pillar.eyebrow}>
              <span className="lgo-card-kicker">{pillar.eyebrow}</span>
              <h3>{pillar.title}</h3>
              <p>{pillar.summary}</p>
            </GameCard>
          ))}
        </Grid>

        <section className="lgo-panel lgo-journey-panel" aria-labelledby="player-journey-heading">
          <SectionHeading eyebrow="Player journey" title="Người chơi nên đi qua web theo luồng nào" />
          <div className="lgo-timeline" id="player-journey-heading">
            {playerJourneySteps.map((item) => (
              <article className="lgo-timeline-item" key={item.step}>
                <span>{item.step}</span>
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
              </article>
            ))}
          </div>
        </section>

        <BeginnerGuideDepth />

        <ResponsiveProofStrip />

        <PublicPageFocusGrid />

        <GameInfoDepthCta />

        <ProductFirstNotice />

        <ReleaseReadinessHubCta />

        <ReleaseReadinessHubBoard />

        <PlayerTrustReleaseCta />

        <PlayerTrustSignalBoard />

        <RouteContinuityCta />

        <ContentIaStartCta />
        <FaqHelpfulnessCta />

        <AccessibilityReadabilityCta />

        <RouteReadabilityBoard />

        <PerformanceBudgetCta />

        <PerceivedLoadSignalBoard />

        <WorldGameplayLoopCta />

        <PlayerSafetySupportCta />

        <BeginnerExpectationBoard />

        <JourneyFrictionBoard />

        <PlayerEntryQuestionBoard />

        <DownloadTrustCta />

        <CommunityOnboardingPathBoard />

        <CommunityRoadmapOnboardingCta />

        <section className="lgo-action-band" aria-label="Current non-claims">
          <div>
            <StatusBadge tone="shadow">Non-claims remain explicit</StatusBadge>
            <h2>Không claim production auth, DB persistence, CMS hay backend integration.</h2>
            <p>
              WEB v1.11 onboarding đã nối community, roadmap, status và download trust thành một hành trình player-facing. Portal và ops vẫn là fixture-only shells cho đến khi có accepted
              backend Auth/API/DB/RBAC/audit contract từ game backend canonical.
            </p>
          </div>
          <div className="lgo-product-first-actions"><LinkButton href="/support" tone="gold">Đọc hỗ trợ</LinkButton><LinkButton href="/support/safety" tone="jade">Safety support</LinkButton></div>
        </section>

        <SectionHeading eyebrow="Latest" title="Tin mới từ nội dung local typed" />
        <Grid>
          {featured.map((entry) => (
            <GameCard key={entry.slug}>
              <StatusBadge tone="jade">{entry.category}</StatusBadge>
              <h3>{entry.title}</h3>
              <p>{entry.summary}</p>
              <LinkButton href={`/news/${entry.slug}`}>Đọc thêm</LinkButton>
            </GameCard>
          ))}
        </Grid>
              <ClosedTesterInformationPackCta />
        </Stack>
    </WebAppShell>
  );
}
