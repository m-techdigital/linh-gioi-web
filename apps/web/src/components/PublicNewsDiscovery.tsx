import { archiveNewsEntries, playerNewsEntries } from "@lgo-web/content";
import { ArticleFragmentRestoration, ExperienceHero, FeaturedReading, LinkButton, ReadingCatalog, ReleaseIcon, SectionHeading, Stack } from "@lgo-web/ui";
import type { ReadingCatalogCopy } from "@lgo-web/ui";

const publicationDate = new Intl.DateTimeFormat("vi-VN", { year: "numeric", month: "2-digit", day: "2-digit", timeZone: "UTC" });
const archiveCopy: ReadingCatalogCopy = {
  searchLabel: "Tìm trong nhật ký phát triển", placeholder: "Ví dụ: hỗ trợ, phát hành, cộng đồng…",
  groupLabel: "Chọn nhóm bài viết", itemLabel: "Nhật ký", actionLabel: "Đọc bài lưu trữ", countLabel: "bài lưu trữ",
  emptyTitle: "Chưa có bài lưu trữ", emptyDescription: "Kho phát triển hiện chưa có bài đã công bố.",
  noMatchDescription: "Thử từ khóa ngắn hơn hoặc xóa bộ lọc để xem lại kho phát triển."
};

export function PublicNewsDiscovery() {
  const primary = playerNewsEntries();
  const archive = archiveNewsEntries();
  const featured = primary.find((entry) => entry.featured) ?? primary[0];
  return <Stack className="lgo-release-layout lgo-catalog-discovery lgo-news-discovery">
    <ExperienceHero className="lgo-release-hero lgo-release-frame" copyClassName="lgo-release-hero-copy"
      badge="Linh Giới Online · Bản tin" badgeTone="gold" kicker="Tin dành cho người chơi · Tách khỏi nhật ký kỹ thuật"
      title="Tin tức Linh Giới" lead="Khi có thông tin game, cộng đồng hoặc phát hành thật sự hữu ích cho người chơi, bản tin chính sẽ xuất hiện tại đây. Nhật ký phát triển web được giữ riêng để tham khảo."
      actions={[{ href: "#news-library", label: "Xem bản tin hiện tại", tone: "gold" }, { href: "/status", label: "Trạng thái chơi", tone: "neutral" }]}
      detail={<p className="lgo-library-boundary"><ReleaseIcon name="shield"/><span>Không phải bản tin trực tiếp. Không biến thay đổi kỹ thuật thành tin game.<br/>Ngày đăng lịch sử không xác nhận game đã phát hành.</span></p>}
      visual={<><img className="lgo-release-hero-art" src="/game-art/world/dong-mon-skyline.webp" width="1360" height="765" alt="" fetchPriority="high"/>
        {featured ? <FeaturedReading title={featured.title} description={featured.summary} href={`/news/${featured.slug}`} actionLabel="Mở bản tin"
          image={{ src: "/game-art/world/dong-mon-skyline.webp", width: 1360, height: 765, alt: "Tranh minh họa thế giới Linh Giới, không phải ảnh một sự kiện đang diễn ra" }}/> : null}</>}/>
    <section id="news-library" className="lgo-release-reading-panel lgo-release-frame" tabIndex={-1} aria-labelledby="news-library-heading">
      <div className="lgo-release-section-heading"><SectionHeading headingId="news-library-heading" eyebrow="Bản tin cho người chơi" title={primary.length ? "Tin đang được công bố" : "Chưa có bản tin game mới"}/>
        <p>{primary.length ? `${primary.length} bài dành cho người chơi.` : "Không dùng nhật ký phát triển để lấp chỗ trống."}<br/>Xem Trạng thái hoặc Cẩm nang để biết điều hữu ích hiện tại.</p></div>
      {primary.length ? <ReadingCatalog entries={primary.map((entry) => ({ id: entry.slug, title: entry.title, description: entry.summary, href: `/news/${entry.slug}`, groupId: "news",
        publication: { iso: entry.publishedAt, label: publicationDate.format(new Date(entry.publishedAt)) } }))} groups={[]} label="Kết quả bản tin"/> :
        <nav className="lgo-announcement-reading-routes lgo-news-primary-empty-actions" aria-label="Đường đọc thay cho bản tin chưa có">
          <LinkButton href="/status" tone="gold">Trạng thái chơi <ReleaseIcon name="arrow"/></LinkButton>
          <LinkButton href="/guides" tone="neutral">Cẩm nang người chơi <ReleaseIcon name="arrow"/></LinkButton>
          <LinkButton href="/roadmap" tone="neutral">Lộ trình sản phẩm <ReleaseIcon name="arrow"/></LinkButton>
        </nav>}
      <ArticleFragmentRestoration targetIds={["news-library"]}/>
    </section>
    <details id="news-devlog-archive" className="lgo-catalog-summary lgo-release-reading-panel lgo-release-frame">
      <summary>Nhật ký phát triển web · {archive.length} bài <span aria-hidden="true">+</span></summary>
      <div className="lgo-news-devlog-archive-body">
        <p>Kho này lưu lịch sử xây dựng website để đối chiếu. Nội dung có thể nhắc phiên bản, công cụ hoặc giới hạn kỹ thuật và không phải bản tin game hiện tại.</p>
        <nav className="lgo-announcement-reading-routes" aria-label="Kho thông tin lịch sử"><LinkButton href="/events" tone="neutral">Sự kiện minh họa</LinkButton><LinkButton href="/patch-notes" tone="neutral">Ghi chú cập nhật</LinkButton></nav>
        <ReadingCatalog entries={archive.map((entry) => ({ id: entry.slug, title: entry.title, description: entry.summary, href: `/news/${entry.slug}`, groupId: "archive",
          publication: { iso: entry.publishedAt, label: publicationDate.format(new Date(entry.publishedAt)) } }))} groups={[]} label="Nhật ký phát triển" copy={archiveCopy}/>
      </div>
    </details>
    <aside className="lgo-release-reading-panel lgo-release-frame" aria-labelledby="news-reading-heading">
      <SectionHeading headingId="news-reading-heading" eyebrow="Đọc đúng nguồn" title="Bản tin không thay thế trạng thái hiện tại"/>
      <p>Trạng thái chơi, lộ trình, cẩm nang và hỗ trợ là các điểm đọc chính khi bạn cần biết điều gì đang dùng được hoặc còn bị khóa.</p>
      <nav className="lgo-announcement-reading-routes lgo-news-reading-routes" aria-label="Luồng đọc tin tức">
        <LinkButton href="/status" tone="gold">Đọc Trạng thái <ReleaseIcon name="arrow"/></LinkButton><LinkButton href="/roadmap" tone="neutral">Xem Roadmap <ReleaseIcon name="arrow"/></LinkButton>
        <LinkButton href="/guides" tone="neutral">Tìm hướng dẫn <ReleaseIcon name="arrow"/></LinkButton><LinkButton href="/support/help" tone="neutral">FAQ hỗ trợ <ReleaseIcon name="arrow"/></LinkButton>
      </nav>
      <small>NO_ACCEPTED_BACKEND_CONTRACT · Không có đăng ký nhận tin, thông báo tài khoản hoặc kênh tin trực tiếp.</small>
    </aside>
  </Stack>;
}
