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

  return (
    <WebAppShell>
      <Stack>
        <GameCard className="lgo-detail-hero-card">
          <StatusBadge tone="jade">WEB v1.9 article detail</StatusBadge>
          <span className="lgo-card-kicker">{entry.category} · {entry.publishedAt}</span>
          <h1>{entry.title}</h1>
          <p className="lgo-hero-lead">{entry.summary}</p>
          <p>{entry.body}</p>
          <p><strong>Boundary:</strong> PROVISIONAL_WEB_FIXTURE · NOT_CANONICAL_BACKEND_CONTRACT · no CMS/live announcement backend.</p>
        </GameCard>
        <ArticleDetailDepth slug={entry.slug} />
        <section className="lgo-panel">
          <h2>Tin liên quan</h2>
          <Grid>
            {related.map((item) => (
              <GameCard key={item.slug}>
                <StatusBadge tone="spirit">{item.category}</StatusBadge>
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
                <LinkButton href={`/news/${item.slug}`}>Đọc tiếp</LinkButton>
              </GameCard>
            ))}
          </Grid>
        </section>
        <DetailPageNextSteps />
      </Stack>
    </WebAppShell>
  );
}
