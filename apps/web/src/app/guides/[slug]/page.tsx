import "@lgo-web/ui/service-layout.css";
import "@lgo-web/ui/performance-layout.css";
import "@lgo-web/ui/release-layout.css";
import "@lgo-web/ui/guide-article.css";
import { localContentRepository } from "@lgo-web/content";
import { notFound } from "next/navigation";
import { renderGuideArticle } from "../../../components/PublicEditorialRendererRegistry";
import { WebAppShell } from "../../../components/WebAppShell";
import { metadataForRoute } from "../../../lib/public-metadata";

// Guides are published, file-backed entries. Unknown slugs must not stream a 200 fallback.
export const dynamicParams = false;

export function generateStaticParams() {
  return localContentRepository.list("guides").map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = localContentRepository.bySlug(slug);
  if (!entry || entry.category !== "guides") return metadataForRoute("/guides");
  return metadataForRoute(`/guides/${entry.slug}`);
}

export default async function GuideDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = localContentRepository.bySlug(slug);
  if (!entry || entry.category !== "guides") notFound();
  const rendered = renderGuideArticle(entry);
  if (!rendered) notFound();
  return <WebAppShell>{rendered}</WebAppShell>;
}
