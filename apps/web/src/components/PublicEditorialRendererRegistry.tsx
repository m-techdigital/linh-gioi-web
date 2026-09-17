import type { ComponentType, ReactNode } from "react";
import type { ContentEntry } from "@lgo-web/content";
import { GameCard, Grid, LinkButton, Stack, StatusBadge } from "@lgo-web/ui";
import { ArticleDetailDepth, DetailPageNextSteps } from "./PublicDetailSections";
import { PublicControlTowerArticle } from "./PublicControlTowerArticle";
import { PublicUXArticle } from "./PublicUXArticle";
import { PublicVisualResponsiveArticle } from "./PublicVisualResponsiveArticle";
import { PublicGameInfoArticle } from "./PublicGameInfoArticle";
import { PublicDetailReadingArticle } from "./PublicDetailReadingArticle";
import { PublicStatusTrustArticle } from "./PublicStatusTrustArticle";
import { PublicTesterPreparationArticle } from "./PublicTesterPreparationArticle";
import { PublicCommunityOnboardingArticle } from "./PublicCommunityOnboardingArticle";
import { PublicContentHubArticle } from "./PublicContentHubArticle";
import { PublicWorldLoopArticle } from "./PublicWorldLoopArticle";
import { PublicSafetySupportArticle } from "./PublicSafetySupportArticle";
import { PublicFaqGuide } from "./PublicFaqGuide";
import { PublicClosedTesterGuide } from "./PublicClosedTesterGuide";
import { PublicReleaseReadinessGuide } from "./PublicReleaseReadinessGuide";
import { PublicPlayerTrustGuide } from "./PublicPlayerTrustGuide";
import { PublicRouteContinuityGuide } from "./PublicRouteContinuityGuide";
import { PublicPerformanceGuide } from "./PublicPerformanceGuide";
import { PublicReadabilityGuide } from "./PublicReadabilityGuide";
import { PublicPlayerSafetyGuide } from "./PublicPlayerSafetyGuide";
import { PublicStartHereGuide } from "./PublicStartHereGuide";
import { PublicCommunityRoadmapGuide } from "./PublicCommunityRoadmapGuide";
import { PublicWorldLoopGuide } from "./PublicWorldLoopGuide";
import { PublicGateEntryGuide } from "./PublicGateEntryGuide";
import { PublicTrainingLoopGuide } from "./PublicTrainingLoopGuide";
import { PublicDownloadReadinessGuide } from "./PublicDownloadReadinessGuide";
import { PublicSupportCommunityGuide } from "./PublicSupportCommunityGuide";
import { PublicReleaseTrustGuide } from "./PublicReleaseTrustGuide";

type NewsRendererProps = { entry: ContentEntry; related: readonly ContentEntry[] };
type GuideRendererProps = { entry: ContentEntry };
type NewsRenderer = ComponentType<NewsRendererProps>;
type GuideRenderer = ComponentType<GuideRendererProps>;

export const newsRendererBySlug = {
  "web-program-control-tower": PublicControlTowerArticle,
  "public-ux-content-polish-started": PublicUXArticle,
  "visual-responsive-polish-started": PublicVisualResponsiveArticle,
  "public-game-info-depth-started": PublicGameInfoArticle,
  "news-guide-detail-pages-started": PublicDetailReadingArticle,
  "status-download-trust-polish-started": PublicStatusTrustArticle,
  "closed-tester-information-pack-started": PublicTesterPreparationArticle,
  "community-roadmap-onboarding-started": PublicCommunityOnboardingArticle,
  "content-ia-hub-polish-started": PublicContentHubArticle,
  "world-gameplay-loop-depth-started": PublicWorldLoopArticle,
  "player-safety-support-faq-polish-started": PublicSafetySupportArticle,
} satisfies Record<string, NewsRenderer>;

export const guideRendererBySlug = {
  "faq-search-helpfulness-guide": PublicFaqGuide,
  "closed-tester-information-pack-guide": PublicClosedTesterGuide,
  "release-readiness-hub-guide": PublicReleaseReadinessGuide,
  "player-trust-release-guide": PublicPlayerTrustGuide,
  "route-continuity-conversion-guide": PublicRouteContinuityGuide,
  "performance-copy-budget-guide": PublicPerformanceGuide,
  "accessibility-readability-guide": PublicReadabilityGuide,
  "player-safety-support-guide": PublicPlayerSafetyGuide,
  "start-here-content-hub-guide": PublicStartHereGuide,
  "community-roadmap-onboarding-guide": PublicCommunityRoadmapGuide,
  "world-gameplay-loop-guide": PublicWorldLoopGuide,
  "gate-entry-guide": PublicGateEntryGuide,
  "beginner-training-loop-guide": PublicTrainingLoopGuide,
  "download-readiness-guide": PublicDownloadReadinessGuide,
  "support-and-community-guide": PublicSupportCommunityGuide,
  "release-trust-and-checksum-guide": PublicReleaseTrustGuide,
} satisfies Record<string, GuideRenderer>;

export function PublicGenericNewsArticle({ entry, related }: NewsRendererProps) {
  return <Stack className="lgo-player-facing-stack lgo-service-compact-proof-page lgo-newsdetailpage-stack">
    <GameCard className="lgo-detail-hero-card lgo-newsdetail-hero-card">
      <StatusBadge tone="jade">Bài viết công khai</StatusBadge>
      <span className="lgo-card-kicker">Tin tức · nội dung tĩnh · chưa có CMS/live feed</span>
      <h1>{entry.title}</h1>
      <p className="lgo-hero-lead">{entry.summary}</p>
      <p>{entry.body}</p>
      <div className="lgo-product-first-actions" aria-label="Luồng đọc bài viết tin tức">
        <LinkButton href="/news" tone="jade">Tin tức</LinkButton>
        <LinkButton href="/status" tone="gold">Trạng thái chơi</LinkButton>
        <LinkButton href="/roadmap" tone="spirit">Roadmap</LinkButton>
      </div>
      <p className="lgo-guide-detail-boundary"><strong>Ranh giới:</strong> bài viết là nội dung web public tĩnh, không phải CMS, không phải thông cáo live server và không thay thế hợp đồng backend.</p>
    </GameCard>
    <ArticleDetailDepth slug={entry.slug} />
    <section className="lgo-panel lgo-service-proof-card-grid lgo-newsdetail-related" aria-labelledby="newsdetail-related-heading">
      <h2 id="newsdetail-related-heading">Tin liên quan để đọc tiếp</h2>
      <Grid className="lgo-newsdetail-related-grid">
        {related.map((item) => <GameCard className="lgo-service-proof-card lgo-newsdetail-related-card" key={item.slug}>
          <StatusBadge tone="spirit">tin tức</StatusBadge>
          <h3>{item.title}</h3>
          <p>{item.summary}</p>
          <LinkButton href={`/news/${item.slug}`} tone="jade">Đọc tiếp</LinkButton>
        </GameCard>)}
      </Grid>
    </section>
    <DetailPageNextSteps />
  </Stack>;
}

export function renderNewsArticle(entry: ContentEntry, related: readonly ContentEntry[]): ReactNode {
  const Renderer = newsRendererBySlug[entry.slug as keyof typeof newsRendererBySlug] ?? PublicGenericNewsArticle;
  return <Renderer entry={entry} related={related}/>;
}

export function renderGuideArticle(entry: ContentEntry): ReactNode | null {
  const Renderer = guideRendererBySlug[entry.slug as keyof typeof guideRendererBySlug];
  return Renderer ? <Renderer entry={entry}/> : null;
}
