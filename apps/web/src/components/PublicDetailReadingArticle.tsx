import { contentDetailSections } from "@lgo-web/content";
import type { ContentEntry } from "@lgo-web/content";
import { PublishedArticle } from "@lgo-web/ui";

// Existing reading destinations, not editorial tools, support intake or download permission.
const chapterLinks = [
  [{ href: "/news", label: "Tìm bài trong bản tin", className: "lgo-news-article-action" },
    { href: "/guides", label: "Mở thư viện hướng dẫn", className: "lgo-news-article-action" },
    { href: "/guides/beginner", label: "Đọc hướng dẫn nhập môn", className: "lgo-news-article-action" }],
  [{ href: "/status", label: "Đối chiếu trạng thái hiện tại", className: "lgo-news-article-action" },
    { href: "/download", label: "Đọc điều kiện tải", className: "lgo-news-article-action" },
    { href: "/download/trust", label: "Đọc cách đối chiếu bản tải", className: "lgo-news-article-action" },
    { href: "/support/help", label: "Tìm FAQ hỗ trợ", className: "lgo-news-article-action" }]
] as const;

export function PublicDetailReadingArticle({ entry, related }: { entry: ContentEntry; related: readonly ContentEntry[] }) {
  return <PublishedArticle entry={entry} related={related} sections={contentDetailSections.filter(section => section.slug === entry.slug)} chapterLinks={chapterLinks}
    copy={{ breadcrumb: "Tin tức và hướng dẫn", kicker: "Đủ ngữ cảnh · Rõ phạm vi · Biết bước tiếp theo", contentsLabel: "Mục lục bài viết tin và hướng dẫn",
      introLabel: "Bối cảnh của bản cập nhật web v1.9", coverAlt: "Tranh thế giới Linh Giới minh họa cho hành trình đọc tin và hướng dẫn",
      coverEyebrow: "CÙNG MỘT THẾ GIỚI · CÙNG NHỊP ĐỌC", coverTitle: "Từ bản tin đến phần cần đọc",
      coverNote: "Tranh minh họa · Không phải dữ liệu game hoặc thông báo trực tiếp" }}/>;
}
