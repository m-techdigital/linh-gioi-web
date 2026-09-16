import { localContentRepository } from "@lgo-web/content";
import { ArticleFragmentRestoration, ExperienceHero, FeaturedReading, LinkButton, ReadingCatalog, ReleaseIcon, SectionHeading, Stack } from "@lgo-web/ui";
import type { ReadingCatalogCopy } from "@lgo-web/ui";

const publicationDate = new Intl.DateTimeFormat("vi-VN", { year: "numeric", month: "2-digit", day: "2-digit", timeZone: "UTC" });
const catalogCopy: ReadingCatalogCopy = {
  searchLabel: "Tìm trong bản tin", placeholder: "Ví dụ: FAQ, cộng đồng, phát hành…",
  groupLabel: "Chọn nhóm bài viết", itemLabel: "Tin tức", actionLabel: "Đọc bài viết", countLabel: "bài viết",
  emptyTitle: "Chưa có bài tin công khai", emptyDescription: "Bản tin chưa có bài đã công bố. Không tạo tin hoặc ngày đăng mẫu.",
  noMatchDescription: "Thử từ khóa ngắn hơn hoặc xóa bộ lọc để xem lại toàn bộ bản tin."
};

/** Published source order, not recency ranking or personalized recommendations. */
export function PublicNewsDiscovery() {
  const entries = localContentRepository.list("news");
  const featured = entries.find(entry => entry.featured) ?? entries[0];
  return <Stack className="lgo-release-layout lgo-catalog-discovery lgo-news-discovery">
    <ExperienceHero className="lgo-release-hero lgo-release-frame" copyClassName="lgo-release-hero-copy"
      badge="Linh Giới Online · Bản tin" badgeTone="gold" kicker="Đọc mốc phát triển · Hiểu đúng hiện trạng"
      title="Tin tức Linh Giới" lead="Khám phá các bài đã công bố về hành trình phát triển web. Lọc tiêu đề và mô tả để tìm bài cần đọc, rồi mở nội dung đầy đủ tại trang bài viết."
      actions={[{ href: "#news-library", label: "Tìm bài trong bản tin", tone: "gold" }, { href: "/patch-notes", label: "Đọc ghi chú cập nhật", tone: "neutral" }]}
      detail={<p className="lgo-library-boundary"><ReleaseIcon name="shield"/><span>Không phải bản tin trực tiếp.<br/>Ngày đăng và nội dung lịch sử không xác nhận game đã phát hành.</span></p>}
      visual={<><img className="lgo-release-hero-art" src="/game-art/world/dong-mon-skyline.webp" width="1360" height="765" alt="" fetchPriority="high"/>
        {featured ? <FeaturedReading title={featured.title} description={featured.summary} href={`/news/${featured.slug}`} actionLabel="Mở bài viết"
          image={{ src: "/game-art/world/dong-mon-skyline.webp", width: 1360, height: 765, alt: "Tranh minh họa thế giới Linh Giới, không phải ảnh một sự kiện đang diễn ra" }}/> : null}</>}/>
    <section id="news-library" className="lgo-release-reading-panel lgo-release-frame" tabIndex={-1} aria-labelledby="news-library-heading">
      <div className="lgo-release-section-heading"><SectionHeading headingId="news-library-heading" eyebrow="Thư viện bản tin" title="Tìm bài theo điều bạn quan tâm"/>
        <p>Đủ {entries.length} bài đã công bố, theo thứ tự trong nguồn.<br/>Không xếp hạng lượt xem hoặc suy ra tin mới nhất.</p></div>
      <ReadingCatalog entries={entries.map(entry => ({ id: entry.slug, title: entry.title, description: entry.summary, href: `/news/${entry.slug}`, groupId: "news",
        publication: { iso: entry.publishedAt, label: publicationDate.format(new Date(entry.publishedAt)) } }))} groups={[]} label="Kết quả bản tin" copy={catalogCopy}/>
      <ArticleFragmentRestoration targetIds={["news-library"]}/>
    </section>
    <aside className="lgo-release-reading-panel lgo-release-frame" aria-labelledby="news-reading-heading">
      <SectionHeading headingId="news-reading-heading" eyebrow="Đọc bài rồi đối chiếu" title="Bài viết không thay thế trạng thái hiện tại"/>
      <p>Đây là bản tin tĩnh lưu trong source. Page không phải CMS production, feed live, thông cáo vận hành game hoặc hợp đồng backend được chấp nhận.</p>
      <nav className="lgo-announcement-reading-routes lgo-news-reading-routes" aria-label="Luồng đọc tin tức">
        <LinkButton href="/status" tone="gold">Đọc Trạng thái <ReleaseIcon name="arrow"/></LinkButton>
        <LinkButton href="/roadmap" tone="neutral">Xem Roadmap <ReleaseIcon name="arrow"/></LinkButton>
        <LinkButton href="/guides" tone="neutral">Tìm hướng dẫn <ReleaseIcon name="arrow"/></LinkButton>
        <LinkButton href="/support/help" tone="neutral">FAQ hỗ trợ <ReleaseIcon name="arrow"/></LinkButton>
      </nav>
      <small>NO_ACCEPTED_BACKEND_CONTRACT · Không có đăng ký nhận tin, thông báo tài khoản hoặc kênh tin trực tiếp.</small>
    </aside>
  </Stack>;
}
