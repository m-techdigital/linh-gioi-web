import { PublicVisualResponsiveArticle } from "../../../components/PublicVisualResponsiveArticle";
import { PublicUXArticle } from "../../../components/PublicUXArticle";
import "@lgo-web/ui/release-layout.css";
import "@lgo-web/ui/guide-article.css";
import "@lgo-web/ui/guidance-layout.css";
import { PublicControlTowerArticle } from "../../../components/PublicControlTowerArticle";
import { localContentRepository } from "@lgo-web/content";
import { notFound } from "next/navigation";
import { GameCard, Grid, LinkButton, Stack, StatusBadge } from "@lgo-web/ui";
import { ArticleDetailDepth, DetailPageNextSteps } from "../../../components/PublicDetailSections";
import { WebAppShell } from "../../../components/WebAppShell";

export function generateStaticParams() {
  return localContentRepository.list("news").map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = localContentRepository.bySlug(slug);
  return { title: entry?.title ?? "Tin tức" };
}

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = localContentRepository.bySlug(slug);
  if (!entry || entry.category !== "news") notFound();
  const related = localContentRepository
    .list("news")
    .filter((candidate) => candidate.slug !== entry.slug)
    .slice(0, 3);

  if (entry.slug === "web-program-control-tower") {
    return <WebAppShell><PublicControlTowerArticle entry={entry} related={related}/></WebAppShell>;
  }

  if (entry.slug === "public-ux-content-polish-started") {
    return <WebAppShell><PublicUXArticle entry={entry} related={related}/></WebAppShell>;
  }

  if (entry.slug === "visual-responsive-polish-started") {
    return <WebAppShell><PublicVisualResponsiveArticle entry={entry} related={related}/></WebAppShell>;
  }

  return (
    <WebAppShell>
      <Stack className="lgo-player-facing-stack lgo-service-compact-proof-page lgo-newsdetailpage-stack">
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
            {related.map((item) => (
              <GameCard className="lgo-service-proof-card lgo-newsdetail-related-card" key={item.slug}>
                <StatusBadge tone="spirit">tin tức</StatusBadge>
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
                <LinkButton href={`/news/${item.slug}`} tone="jade">Đọc tiếp</LinkButton>
              </GameCard>
            ))}
          </Grid>
        </section>
        <DetailPageNextSteps />
      </Stack>
    </WebAppShell>
  );
}
