import "@lgo-web/ui/service-layout.css";
import "@lgo-web/ui/release-layout.css";
import "@lgo-web/ui/guide-article.css";
import "@lgo-web/ui/guidance-layout.css";
import { localContentRepository } from "@lgo-web/content";
import { notFound } from "next/navigation";
import { renderNewsArticle } from "../../../components/PublicEditorialRendererRegistry";
import { WebAppShell } from "../../../components/WebAppShell";
import { metadataForRoute } from "../../../lib/public-metadata";

export function generateStaticParams() {
  return localContentRepository.list("news").map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = localContentRepository.bySlug(slug);
  if (!entry || entry.category !== "news") return metadataForRoute("/news");
  return metadataForRoute(`/news/${entry.slug}`);
}

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = localContentRepository.bySlug(slug);
  if (!entry || entry.category !== "news") notFound();
  const related = localContentRepository.list("news").filter((candidate) => candidate.slug !== entry.slug).slice(0, 3);
  return <WebAppShell>{renderNewsArticle(entry, related)}</WebAppShell>;
}
