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

  return (
    <WebAppShell>
      <Stack>
        <ReleaseReadinessHubCta />
        <FaqHelpfulnessCta />
        <PlayerTrustReleaseCta />
        <GameCard className="lgo-detail-hero-card">
          <StatusBadge tone="jade">WEB v1.9 guide detail</StatusBadge>
          <span className="lgo-card-kicker">{entry.publishedAt}</span>
          <h1>{entry.title}</h1>
          <p className="lgo-hero-lead">{entry.summary}</p>
          <p>{entry.body}</p>
          <p><strong>Boundary:</strong> PROVISIONAL_WEB_FIXTURE · NOT_CANONICAL_BACKEND_CONTRACT · no live guide/wiki backend.</p>
        </GameCard>
        <GuideDetailDepth slug={entry.slug} />
        <RouteContinuityCta />
        <WorldGameplayLoopCta />
        <PlayerSafetySupportCta />
        <AccessibilityReadabilityCta />
        <PerformanceBudgetCta />
        <section className="lgo-action-band">
          <div>
            <h2>Tiếp tục đọc theo hướng người chơi</h2>
            <p>Guide detail giúp người chơi hiểu trạng thái thật, không thay thế gameplay wiki hoặc support backend.</p>
          </div>
          <div className="lgo-product-first-actions">
            <LinkButton href="/guides" tone="jade">Tất cả hướng dẫn</LinkButton>
            <LinkButton href="/support" tone="gold">Support FAQ</LinkButton>
          </div>
        </section>
              <ClosedTesterInformationPackCta />
        </Stack>
    </WebAppShell>
  );
}
