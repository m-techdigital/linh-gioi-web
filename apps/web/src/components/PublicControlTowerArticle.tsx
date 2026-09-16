import { contentDetailSections } from "@lgo-web/content";
import type { ContentEntry } from "@lgo-web/content";
import { ExperienceHero, GuidanceTopicGrid, GuideArticle, GuideChapterBody, LinkButton, ReleaseIcon, SectionHeading, Stack } from "@lgo-web/ui";

const publicationDate = new Intl.DateTimeFormat("vi-VN", { year: "numeric", month: "2-digit", day: "2-digit", timeZone: "UTC" });
// Contextual reading links only. Neither article chapter grants access or starts an operation.
const chapterLinks = [
  [{ href: "/status", label: "Đối chiếu trạng thái hiện tại", className: "lgo-news-article-action" },
    { href: "/release", label: "Hiểu phạm vi phát hành", className: "lgo-news-article-action" }],
  [{ href: "/guides", label: "Mở thư viện hướng dẫn", className: "lgo-news-article-action" },
    { href: "/news", label: "Về thư viện bản tin", className: "lgo-news-article-action" }]
] as const;

/** One selected source article composed from shared reading owners, not an operational dashboard. */
export function PublicControlTowerArticle({ entry, related }: { entry: ContentEntry; related: readonly ContentEntry[] }) {
  const sections = contentDetailSections.filter(section => section.slug === entry.slug);
  const contentsId = `news-${entry.slug}-contents`;
  return <Stack className="lgo-release-layout lgo-guidance-layout lgo-editorial-article lgo-news-article">
    <nav className="lgo-article-breadcrumbs" aria-label="Đường dẫn bài viết">
      <a href="/news">Tin tức</a><span aria-hidden="true">/</span><span aria-current="page">Nền tảng web độc lập</span>
    </nav>
    <ExperienceHero className="lgo-release-hero lgo-release-frame lgo-guide-article-hero" copyClassName="lgo-release-hero-copy"
      badge="Linh Giới Online · Bài viết công khai" badgeTone="gold" kicker="Nền tảng · Phạm vi · Cách đọc thống nhất"
      title={entry.title} lead={entry.summary}
      actions={[{ href: `#news-${entry.slug}-part-01`, label: "Đọc nội dung bài viết", tone: "gold" }, { href: "/news", label: "Về bản tin", tone: "neutral" }]}
      detail={<><p className="lgo-article-hero-boundary"><span>Ngày đăng nội dung</span><time dateTime={entry.publishedAt}>{publicationDate.format(new Date(entry.publishedAt))}</time></p>
        <p className="lgo-article-hero-boundary"><ReleaseIcon name="shield"/>Đây là bài viết lịch sử của web, không phải thông cáo phát hành game. Nội dung được giữ trong phạm vi tại thời điểm đăng.</p></>}
      visual={<figure className="lgo-article-cover">
        <img src="/game-art/world/dong-mon-skyline.webp" width="1360" height="765" alt="Tranh thế giới Linh Giới minh họa cho bài viết về nền tảng web" fetchPriority="high"/>
        <figcaption><span>MỘT THẾ GIỚI · CÙNG MỘT LỐI ĐỌC</span><strong>Nền tảng rõ, trải nghiệm liền mạch</strong><small>Tranh minh họa · Không phải bảng điều hành hoặc trạng thái máy chủ</small></figcaption>
      </figure>}/>
    <GuideArticle contentsId={contentsId} contentsLabel="Mục lục bài viết Control tower"
      intro={<><span className="lgo-article-intro-label">Bài viết giải thích governance web độc lập</span><p>{entry.body}</p></>}
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
