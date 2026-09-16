import { contentDetailSections } from "@lgo-web/content";
import type { ContentEntry } from "@lgo-web/content";
import { PublishedArticle } from "@lgo-web/ui";

// Existing destinations own discovery; this historical article does not profile readers.
const chapterLinks = [
  [{ href: "/start", label: "Mở trang Bắt đầu", className: "lgo-news-article-action" },
    { href: "/guides/start-here-content-hub-guide", label: "Đọc cẩm nang chọn đường đi", className: "lgo-news-article-action" },
    { href: "/guides", label: "Tìm trong thư viện hướng dẫn", className: "lgo-news-article-action" },
    { href: "/news", label: "Tra cứu bản tin", className: "lgo-news-article-action" }],
  [{ href: "/game", label: "Tìm hiểu thế giới", className: "lgo-news-article-action" },
    { href: "/download", label: "Đọc điều kiện tải game", className: "lgo-news-article-action" },
    { href: "/status", label: "Kiểm tra trạng thái hiện tại", className: "lgo-news-article-action" },
    { href: "/community", label: "Đọc hướng dẫn cộng đồng", className: "lgo-news-article-action" }]
] as const;

export function PublicContentHubArticle({ entry, related }: { entry: ContentEntry; related: readonly ContentEntry[] }) {
  return <PublishedArticle entry={entry} related={related} sections={contentDetailSections.filter(section => section.slug === entry.slug)} chapterLinks={chapterLinks}
    copy={{ breadcrumb: "Tìm đường đọc", kicker: "Đúng câu hỏi · Đúng nơi đọc · Rõ bước tiếp", contentsLabel: "Mục lục bài viết tìm đường đọc",
      introLabel: "Bối cảnh của bản cập nhật web v1.12", coverAlt: "Tranh thế giới Linh Giới minh họa cho các lối đọc trên website",
      coverEyebrow: "MỖI CÂU HỎI · MỘT LỐI ĐỌC", coverTitle: "Biết bắt đầu, biết đi tiếp",
      coverNote: "Tranh minh họa · Không phải gợi ý cá nhân hoặc quyền truy cập game" }}/>;
}
