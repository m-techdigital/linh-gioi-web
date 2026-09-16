import { ExperienceHero, LinkButton, Stack } from "./primitives";
import { ReleaseIcon } from "./release";
import { SectionHeading } from "./primitives";
import { GuidanceTopicGrid } from "./guidance";
import { GuideArticle, GuideChapterBody } from "./guide-article";

export type PublishedArticleCopy = {
  breadcrumb: string; kicker: string; contentsLabel: string; introLabel: string;
  coverAlt: string; coverEyebrow: string; coverTitle: string; coverNote: string;
};
export type PublishedArticleEntry = {
  slug: string; title: string; summary: string; body: string; publishedAt: string;
};
export type PublishedArticleSection = {
  heading: string; body: string; playerImpact: string; nonClaim: string;
};
export type PublishedArticleLink = { href: string; label: string; className?: string };
const publicationDate = new Intl.DateTimeFormat("vi-VN", { year: "numeric", month: "2-digit", day: "2-digit", timeZone: "UTC" });

/** One shared publication frame. Content selection and editorial labels remain with the calling app. */
export function PublishedArticle({ entry, sections, related, copy, chapterLinks }: {
  entry: PublishedArticleEntry;
  sections: readonly PublishedArticleSection[];
  related: readonly Pick<PublishedArticleEntry, "slug" | "title" | "summary">[];
  copy: PublishedArticleCopy;
  chapterLinks: readonly (readonly PublishedArticleLink[])[];
}) {
  const contentsId = `news-${entry.slug}-contents`;
  return <Stack className="lgo-release-layout lgo-guidance-layout lgo-editorial-article lgo-news-article">
    <nav className="lgo-article-breadcrumbs" aria-label="Đường dẫn bài viết">
      <a href="/news">Tin tức</a><span aria-hidden="true">/</span><span aria-current="page">{copy.breadcrumb}</span>
    </nav>
    <ExperienceHero className="lgo-release-hero lgo-release-frame lgo-guide-article-hero" copyClassName="lgo-release-hero-copy"
      badge="Linh Giới Online · Bài viết công khai" badgeTone="gold" kicker={copy.kicker}
      title={entry.title} lead={entry.summary}
      actions={[{ href: `#news-${entry.slug}-part-01`, label: "Đọc nội dung bài viết", tone: "gold" }, { href: "/news", label: "Về bản tin", tone: "neutral" }]}
      detail={<><p className="lgo-article-hero-boundary"><span>Ngày đăng nội dung</span><time dateTime={entry.publishedAt}>{publicationDate.format(new Date(entry.publishedAt))}</time></p>
        <p className="lgo-article-hero-boundary"><ReleaseIcon name="shield"/>Đây là bài viết lịch sử của web, không phải thông cáo phát hành game. Nội dung được giữ trong phạm vi tại thời điểm đăng.</p></>}
      visual={<figure className="lgo-article-cover">
        <img src="/game-art/world/dong-mon-skyline.webp" width="1360" height="765" alt={copy.coverAlt} fetchPriority="high"/>
        <figcaption><span>{copy.coverEyebrow}</span><strong>{copy.coverTitle}</strong><small>{copy.coverNote}</small></figcaption>
      </figure>}/>
    <GuideArticle contentsId={contentsId} contentsLabel={copy.contentsLabel}
      intro={<><span className="lgo-article-intro-label">{copy.introLabel}</span><p>{entry.body}</p></>}
      sections={sections.map((section, index) => ({ id: `news-${entry.slug}-part-${String(index + 1).padStart(2, "0")}`,
        marker: String(index + 1).padStart(2, "0"), title: section.heading,
        body: <GuideChapterBody instruction={section.body} outcome={section.playerImpact} boundary={section.nonClaim}
          outcomeLabel="Ý nghĩa cho người chơi" boundaryLabel="Phạm vi bài viết"
          {...(chapterLinks[index] ? { actionGroup: { label: `Đọc tiếp từ phần ${index + 1}`, links: chapterLinks[index] } } : {})}/>
      }))}/>
    {related.length > 0 ? <section className="lgo-guidance-topics lgo-news-article-related" aria-labelledby="news-related-heading">
      <SectionHeading headingId="news-related-heading" eyebrow="Tiếp tục từ bản tin" title="Tin liên quan để đọc tiếp">Các bài viết nguồn đã công bố; không xếp hạng lượt xem hoặc đề xuất cá nhân.</SectionHeading>
      <GuidanceTopicGrid variant="articles" topics={related.map(item => ({ id: item.slug, title: item.title, description: item.summary,
        href: `/news/${item.slug}`, hint: "Bài viết nguồn", action: "Đọc bài viết", icon: "document" }))}/>
    </section> : null}
    <section className="lgo-article-related lgo-release-frame" aria-labelledby="news-context-heading">
      <div><SectionHeading headingId="news-context-heading" eyebrow="Đọc bài rồi đối chiếu" title="Thông tin web không thay thế vận hành game"/>
        <p>Kiểm tra trình duyệt/e2e là bằng chứng layout; nội dung vẫn là web public rõ ràng, không tuyên bố backend vận hành chính thức.</p>
        <small>NO_ACCEPTED_BACKEND_CONTRACT</small></div>
      <div className="lgo-article-related-actions"><LinkButton href="/status" tone="gold">Đọc trạng thái hiện tại</LinkButton><LinkButton href="/roadmap" tone="neutral">Xem Roadmap</LinkButton><LinkButton href="/news" tone="neutral">Tìm bài viết khác</LinkButton></div>
    </section>
  </Stack>;
}
