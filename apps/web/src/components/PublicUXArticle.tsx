import { contentDetailSections } from "@lgo-web/content";
import type { ContentEntry } from "@lgo-web/content";
import { PublishedArticle } from "@lgo-web/ui";

// Reading destinations explain the authored UX scope; they are not game operations.
const chapterLinks = [
  [{ href: "/", label: "Đọc từ trang chủ", className: "lgo-news-article-action" },
    { href: "/game", label: "Tìm hiểu thế giới", className: "lgo-news-article-action" },
    { href: "/roadmap", label: "Xem lộ trình phát triển", className: "lgo-news-article-action" }],
  [{ href: "/download", label: "Đọc điều kiện tải", className: "lgo-news-article-action" },
    { href: "/support/help", label: "Tìm FAQ hỗ trợ", className: "lgo-news-article-action" },
    { href: "/news", label: "Về thư viện bản tin", className: "lgo-news-article-action" }]
] as const;

export function PublicUXArticle({ entry, related }: { entry: ContentEntry; related: readonly ContentEntry[] }) {
  return <PublishedArticle entry={entry} related={related} sections={contentDetailSections.filter(section => section.slug === entry.slug)} chapterLinks={chapterLinks}
    copy={{ breadcrumb: "UX và nội dung public", kicker: "Điểm bắt đầu · Nội dung rõ · Đường đọc tiếp", contentsLabel: "Mục lục bài viết UX public",
      introLabel: "Bối cảnh của bản cập nhật web v1.6", coverAlt: "Tranh thế giới Linh Giới minh họa cho hành trình đọc website",
      coverEyebrow: "MỘT THẾ GIỚI · ĐƯỜNG ĐỌC RÕ RÀNG", coverTitle: "Hiểu điều đang có, chọn bước tiếp theo",
      coverNote: "Tranh minh họa · Không phải ảnh gameplay hoặc bản phát hành" }}/>;
}
