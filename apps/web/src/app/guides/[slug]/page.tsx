import { FaqHelpfulnessCta } from "../../../components/PublicFaqHelpfulnessSections";
import { ClosedTesterInformationPackCta } from "../../../components/PublicClosedTesterInformationPackSections";
import { localContentRepository } from "@lgo-web/content";
import { GameCard, LinkButton, Stack, StatusBadge } from "@lgo-web/ui";
import { notFound } from "next/navigation";
import { GuideDetailDepth } from "../../../components/PublicDetailSections";
import { PlayerSafetySupportCta } from "../../../components/PublicPlayerSafetySections";
import { PlayerTrustReleaseCta } from "../../../components/PublicPlayerTrustReleaseSections";
import { WebAppShell } from "../../../components/WebAppShell";
import { WorldGameplayLoopCta } from "../../../components/PublicWorldGameplayLoopSections";
import { AccessibilityReadabilityCta } from "../../../components/PublicAccessibilityReadabilitySections";
import { PerformanceBudgetCta } from "../../../components/PublicPerformanceBudgetSections";
import { RouteContinuityCta } from "../../../components/PublicRouteContinuitySections";
import { ReleaseReadinessHubCta } from "../../../components/PublicReleaseReadinessHubSections";

export function generateStaticParams() {
  return localContentRepository.list("guides").map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = localContentRepository.bySlug(slug);
  return { title: entry?.title ?? "Hướng dẫn" };
}

export default async function GuideDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = localContentRepository.bySlug(slug);
  if (!entry || entry.category !== "guides") notFound();

  const isGateEntryGuide = entry.slug === "gate-entry-guide";
  const isBeginnerTrainingLoopGuide = entry.slug === "beginner-training-loop-guide";
  const isDownloadReadinessGuide = entry.slug === "download-readiness-guide";
  const isSupportCommunityGuide = entry.slug === "support-and-community-guide";
  const isReleaseTrustChecksumGuide = entry.slug === "release-trust-and-checksum-guide";
  const isCommunityRoadmapOnboardingGuide = entry.slug === "community-roadmap-onboarding-guide";
  const isStartHereContentHubGuide = entry.slug === "start-here-content-hub-guide";
  const isWorldGameplayLoopGuide = entry.slug === "world-gameplay-loop-guide";
  const isPlayerSafetySupportGuide = entry.slug === "player-safety-support-guide";
  const isAccessibilityReadabilityGuide = entry.slug === "accessibility-readability-guide";
  const isCompactGuideFlow = isGateEntryGuide || isBeginnerTrainingLoopGuide || isDownloadReadinessGuide || isSupportCommunityGuide || isReleaseTrustChecksumGuide || isCommunityRoadmapOnboardingGuide || isStartHereContentHubGuide || isWorldGameplayLoopGuide || isPlayerSafetySupportGuide || isAccessibilityReadabilityGuide;

  return (
    <WebAppShell>
      <Stack className={`lgo-player-facing-stack lgo-service-compact-proof-page lgo-guidedetailpage-stack${isCompactGuideFlow ? " lgo-guideflowpage-stack" : ""}${isGateEntryGuide ? " lgo-gateentrypage-stack" : ""}${isBeginnerTrainingLoopGuide ? " lgo-traininglooppage-stack" : ""}${isDownloadReadinessGuide ? " lgo-downloadreadinesspage-stack" : ""}${isSupportCommunityGuide ? " lgo-supportcommunitypage-stack" : ""}${isReleaseTrustChecksumGuide ? " lgo-releasetrustpage-stack" : ""}${isCommunityRoadmapOnboardingGuide ? " lgo-communityroadmappage-stack" : ""}${isStartHereContentHubGuide ? " lgo-starthubpage-stack" : ""}${isWorldGameplayLoopGuide ? " lgo-worldlooppage-stack" : ""}${isPlayerSafetySupportGuide ? " lgo-playersafetypage-stack" : ""}${isAccessibilityReadabilityGuide ? " lgo-accessibilityreadpage-stack" : ""}`}>
        <GameCard className={`lgo-detail-hero-card lgo-guide-detail-hero-card${isCompactGuideFlow ? " lgo-guide-flow-hero-card" : ""}${isGateEntryGuide ? " lgo-gate-entry-hero-card" : ""}${isBeginnerTrainingLoopGuide ? " lgo-training-loop-hero-card" : ""}${isDownloadReadinessGuide ? " lgo-download-readiness-hero-card" : ""}${isSupportCommunityGuide ? " lgo-support-community-hero-card" : ""}${isReleaseTrustChecksumGuide ? " lgo-release-trust-hero-card" : ""}${isCommunityRoadmapOnboardingGuide ? " lgo-community-roadmap-hero-card" : ""}${isStartHereContentHubGuide ? " lgo-start-hub-hero-card" : ""}${isWorldGameplayLoopGuide ? " lgo-world-loop-guide-hero-card" : ""}${isPlayerSafetySupportGuide ? " lgo-player-safety-guide-hero-card" : ""}${isAccessibilityReadabilityGuide ? " lgo-accessibility-read-guide-hero-card" : ""}`}>
          <StatusBadge tone="jade">{isGateEntryGuide ? "Cổng Linh nhập môn" : isBeginnerTrainingLoopGuide ? "Luyện tập nhập môn" : isDownloadReadinessGuide ? "Tin cậy tải game" : isSupportCommunityGuide ? "Hỗ trợ cộng đồng" : isReleaseTrustChecksumGuide ? "Tin cậy phát hành" : isCommunityRoadmapOnboardingGuide ? "Lộ trình cộng đồng" : isStartHereContentHubGuide ? "Bắt đầu đọc web" : isWorldGameplayLoopGuide ? "Vòng lặp thế giới" : isPlayerSafetySupportGuide ? "An toàn hỗ trợ" : isAccessibilityReadabilityGuide ? "Dễ đọc dễ dùng" : "WEB v1.155 · hướng dẫn gameplay"}</StatusBadge>
          <span className="lgo-card-kicker">{isGateEntryGuide ? "Guide tĩnh · chưa có bản đồ live · chưa có nhiệm vụ tài khoản" : isBeginnerTrainingLoopGuide ? "Guide tĩnh · chưa có combat/reward · chưa có tiến trình tài khoản" : isDownloadReadinessGuide ? "Guide tĩnh · chưa có public build · chưa có entitlement" : isSupportCommunityGuide ? "Guide tĩnh · chưa có ticket/chat live · chưa có moderation" : isReleaseTrustChecksumGuide ? "Guide tĩnh · chưa có gói build/checksum · chưa có phê duyệt" : isCommunityRoadmapOnboardingGuide ? "Guide tĩnh · chưa có diễn đàn/chat live · chưa có lịch test" : isStartHereContentHubGuide ? "Guide tĩnh · chưa có gợi ý backend · chưa có đăng nhập" : isWorldGameplayLoopGuide ? "Guide tĩnh · chưa có combat live · chưa có tiến trình tài khoản" : isPlayerSafetySupportGuide ? "Guide tĩnh · chưa có ticket live · chưa có tra cứu tài khoản" : isAccessibilityReadabilityGuide ? "Guide tĩnh · chưa có audit pháp lý · chưa có chứng nhận WCAG" : "Guide tĩnh · chưa có hệ thống wiki · chưa có tiến trình tài khoản"}</span>
          <h1>{entry.title}</h1>
          <p className="lgo-hero-lead">{entry.summary}</p>
          <p>{entry.body}</p>
          <div className="lgo-product-first-actions">
            <LinkButton href="/game/loop" tone="spirit">Xem vòng lặp</LinkButton>
            <LinkButton href="/status" tone="gold">Trạng thái chơi</LinkButton>
            <LinkButton href="/download/trust" tone="jade">Tin cậy tải game</LinkButton>
          </div>
          <p className="lgo-guide-detail-boundary"><strong>Ranh giới:</strong> guide này là nội dung công khai tĩnh, không phải cơ sở dữ liệu nhiệm vụ, wiki live, ticket support hoặc hợp đồng backend được chấp nhận.</p>
        </GameCard>
        <GuideDetailDepth slug={entry.slug} />
        <WorldGameplayLoopCta />
        <RouteContinuityCta />
        <PlayerTrustReleaseCta />
        <FaqHelpfulnessCta />
        <ReleaseReadinessHubCta />
        <PlayerSafetySupportCta />
        <AccessibilityReadabilityCta />
        <PerformanceBudgetCta />
        <section className="lgo-action-band">
          <div>
            <h2>Tiếp tục đọc theo hướng người chơi</h2>
            <p>Trang hướng dẫn giúp người chơi hiểu trạng thái thật, không thay thế wiki gameplay hoặc backend hỗ trợ.</p>
          </div>
          <div className="lgo-product-first-actions">
            <LinkButton href="/guides" tone="jade">Tất cả hướng dẫn</LinkButton>
            <LinkButton href="/support" tone="gold">FAQ hỗ trợ</LinkButton>
          </div>
        </section>
        <ClosedTesterInformationPackCta />
      </Stack>
    </WebAppShell>
  );
}
